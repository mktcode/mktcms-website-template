export default defineEventHandler(async (event) => {
  const { filesPathPrefix } = useRuntimeConfig()

  const storage = useStorage('content')
  const keys = await storage.getKeys(filesPathPrefix + '/')

  return keys
})