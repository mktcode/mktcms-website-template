export default defineEventHandler(async (event) => {
  const storage = useStorage('content')
  const keys = await storage.getKeys()

  return keys
})