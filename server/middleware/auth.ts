export default defineEventHandler(async (event) => {
  const pathname = getRequestURL(event).pathname

  const isAdminLoginRoute = pathname === '/admin/login' || pathname === '/api/admin/login'
  if (isAdminLoginRoute) return

  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/')
  const isAdminApiRoute = pathname === '/api/admin' || pathname.startsWith('/api/admin/')
  if (!isAdminRoute && !isAdminApiRoute) return

  const { adminAuthKey } = useRuntimeConfig()

  const authKeyCookie = getCookie(event, 'auth_key')

  if (!authKeyCookie || authKeyCookie !== adminAuthKey || adminAuthKey === '') {
    if (isAdminApiRoute) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }
    else {
      return sendRedirect(event, '/admin/login')
    }
  }
})