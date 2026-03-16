#!/usr/bin/env python3
"""Recompress JPEG files under a directory to reduce file size.

Example:
  python3 scripts/compress_jpegs.py --root .storage --quality 75 --dry-run
  python3 scripts/compress_jpegs.py --root .storage --quality 75
"""

from __future__ import annotations

import argparse
import io
import sys
from dataclasses import dataclass
from pathlib import Path

try:
    from PIL import Image
except ImportError as exc:  # pragma: no cover
    raise SystemExit(
        "Pillow is required. Install it with: pip install Pillow"
    ) from exc


JPEG_EXTENSIONS = {".jpg", ".jpeg"}


@dataclass
class Result:
    scanned: int = 0
    changed: int = 0
    skipped_not_smaller: int = 0
    errors: int = 0
    bytes_before: int = 0
    bytes_after: int = 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Recompress all JPEG images in a directory tree."
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=Path(".storage"),
        help="Root directory to scan (default: .storage)",
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=75,
        help="JPEG quality (recommended: 65-80, default: 75)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Estimate savings without writing files",
    )
    return parser.parse_args()


def iter_image_paths(root: Path) -> list[Path]:
    paths = [
        p for p in root.rglob("*") if p.is_file() and p.suffix.lower() in JPEG_EXTENSIONS
    ]
    return sorted(paths)


def encode_jpeg_bytes(path: Path, quality: int) -> bytes:
    with Image.open(path) as image:
        exif = image.info.get("exif")
        icc_profile = image.info.get("icc_profile")

        if image.mode in ("RGBA", "LA"):
            background = Image.new("RGB", image.size, (255, 255, 255))
            alpha = image.split()[-1]
            background.paste(image, mask=alpha)
            image = background
        elif image.mode != "RGB":
            image = image.convert("RGB")

        out = io.BytesIO()
        save_kwargs = {
            "format": "JPEG",
            "quality": quality,
            "optimize": True,
            "progressive": True,
        }
        if exif is not None:
            save_kwargs["exif"] = exif
        if icc_profile is not None:
            save_kwargs["icc_profile"] = icc_profile
        image.save(out, **save_kwargs)
        return out.getvalue()


def format_bytes(num_bytes: int) -> str:
    units = ["B", "KB", "MB", "GB"]
    value = float(num_bytes)
    for unit in units:
        if value < 1024 or unit == units[-1]:
            return f"{value:.1f} {unit}" if unit != "B" else f"{int(value)} B"
        value /= 1024
    return f"{num_bytes} B"


def process_file(path: Path, quality: int, dry_run: bool, result: Result) -> None:
    result.scanned += 1
    before = path.stat().st_size
    result.bytes_before += before

    try:
        encoded = encode_jpeg_bytes(path, quality)
    except Exception as exc:  # pragma: no cover
        result.errors += 1
        print(f"ERROR: {path} -> {exc}")
        result.bytes_after += before
        return

    after = len(encoded)
    if after >= before:
        result.skipped_not_smaller += 1
        result.bytes_after += before
        print(f"SKIP:  {path} ({format_bytes(before)} -> {format_bytes(after)})")
        return

    result.changed += 1
    result.bytes_after += after
    print(f"SAVE:  {path} ({format_bytes(before)} -> {format_bytes(after)})")

    if not dry_run:
        path.write_bytes(encoded)


def main() -> int:
    args = parse_args()

    if not 1 <= args.quality <= 100:
        print("Quality must be between 1 and 100.", file=sys.stderr)
        return 2

    root: Path = args.root
    if not root.exists() or not root.is_dir():
        print(f"Root directory not found: {root}", file=sys.stderr)
        return 2

    paths = iter_image_paths(root)
    if not paths:
        print("No matching images found.")
        return 0

    result = Result()
    print(
        f"Scanning {len(paths)} file(s) in {root} "
        f"with quality={args.quality}, dry_run={args.dry_run}"
    )

    for path in paths:
        process_file(path, args.quality, args.dry_run, result)

    saved = result.bytes_before - result.bytes_after
    ratio = (saved / result.bytes_before * 100.0) if result.bytes_before else 0.0
    print("\nSummary")
    print(f"  scanned:            {result.scanned}")
    print(f"  recompressed:       {result.changed}")
    print(f"  skipped_not_smaller:{result.skipped_not_smaller}")
    print(f"  errors:             {result.errors}")
    print(f"  total before:       {format_bytes(result.bytes_before)}")
    print(f"  total after:        {format_bytes(result.bytes_after)}")
    print(f"  total saved:        {format_bytes(saved)} ({ratio:.1f}%)")

    return 0 if result.errors == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
