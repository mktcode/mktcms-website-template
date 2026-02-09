import { z } from 'zod'

const querySchema = z.object({
  z: z.string(),
  x: z.string(),
  y: z.string()
})

export default defineEventHandler(async (event) => {
  const { z, x, y } = await getValidatedQuery(event, query => querySchema.parse(query))

  const subdomains = ['a', 'b', 'c']
  const subdomain = subdomains[Math.floor(Math.random() * subdomains.length)]

  const url = `https://${subdomain}.tile.openstreetmap.org/${z}/${x}/${y}.png`
  const response = await fetch(url)

  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: `Failed to fetch tile: ${response.statusText}`
    })
  }

  return new Response(response.body, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
})
