export default defineEventHandler(async (event) => {
  const { adminAuthKey } = useRuntimeConfig()

  const body = await readBody(event)

  if (body.authKey !== adminAuthKey) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  setCookie(event, 'auth_key', adminAuthKey, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60,
  })

  return { message: 'Login successful' }
})