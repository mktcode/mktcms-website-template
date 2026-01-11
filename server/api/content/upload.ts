function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9.\-_]/g, '_')
}

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)

  if (!form) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No form data received',
    })
  }

  const file = form.find((item) => item.name === 'file')

  if (!file) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing file',
    })
  }

  if (!file.filename || !file.data) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid file upload',
    })
  }

  // TODO: allow all image types and convert to webp on the fly
  const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png']
  const fileExtension = file.filename.toLowerCase().slice(file.filename.lastIndexOf('.'))
  
  if (!allowedExtensions.includes(fileExtension)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid file type. Only PDF, JPG, JPEG, and PNG files are allowed.',
    })
  }
  
  const filePath = sanitizeFilename(file.filename)
  await useStorage('content').setItemRaw(filePath, Buffer.from(file.data))

  const returnFileName = filePath

  return { success: true, path: returnFileName }
})