export default defineEventHandler(async (event) => {
  const pathname = getRequestURL(event).pathname

  const isAdminLoginRoute = pathname === '/admin/login' || pathname === '/api/admin/login'
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/')
  const isAdminApiRoute = pathname === '/api/admin' || pathname.startsWith('/api/admin/')
  if (isAdminLoginRoute || (!isAdminRoute && !isAdminApiRoute)) return

  const { adminAuthKey } = useRuntimeConfig()

  const authKeyCookie = getCookie(event, 'admin_auth_key')

  if (!authKeyCookie || authKeyCookie !== adminAuthKey.toString() || adminAuthKey === '') {
    if (isAdminApiRoute) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }
    else {
      return sendRedirect(event, '/admin/login')
    }
  }
})