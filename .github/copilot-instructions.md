# Copilot instructions

- Project type: Nuxt 4 Website
- Content storage: .storage/ is the editable content store (for example .storage/Seiten/...).
- Markdown components: Markdown rendering uses @nuxtjs/mdc. Components are mapped in nuxt.config.ts (mdc.components) and implemented in app/components/mdc/. Use MDC syntax in content (component tags inside Markdown), similar to MDX-style usage, when editing content.

Read more about MDC here: https://content.nuxt.com/docs/files/markdown

## MktCMS

Our custom Nuxt module `mktcms` provides the following features:

- Simple Admin UI to manage files in `.storage`, mainly .md files with frontmatter, but also images, pdfs or ejs templates for HTML emails. The UI is available at /admin.
- Composables to fetch the content in the frontend, for example `useMdContent<TFrontmatter>` to fetch Markdown files with frontmatter as data.
- Server side utils like `sendMail`

Read more about MktCMS: https://github.com/mktcode/mktcms