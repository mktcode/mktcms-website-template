export default defineEventHandler(async (event) => {
  throw createError({ statusCode: 404, message: 'Not Found' }) // Temporarily disable the endpoint

  const {
    lastname,
    firstname,
    email,
    message,
    acceptPrivacyPolicy,
  } = await readValidatedBody(event, body => formSchema.parse(body))

  const storage = useStorage('content')
  const templateHtml = await storage.getItem<string>('E-Mail Templates:Kontaktformular (HTML).ejs')
  const templateText = await storage.getItem<string>('E-Mail Templates:Kontaktformular (Text).ejs')
  const templateCopyHtml = await storage.getItem<string>('E-Mail Templates:Kontaktformular Kopie (HTML).ejs')
  const templateCopyText = await storage.getItem<string>('E-Mail Templates:Kontaktformular Kopie (Text).ejs')

  const { public: { mktcms: { siteUrl } } } = useRuntimeConfig()
  const logoUrl = `${siteUrl}/api/content/E-Mail Templates:logo.png`

  await sendMail({
    subject: 'Kontaktformular',
    replyTo: email,
    fields: {
      logoUrl,
      lastname,
      firstname,
      email,
      message,
      acceptPrivacyPolicy,
    },
    templateHtml: templateHtml || undefined,
    templateText: templateText || undefined,
  })

  // Kopie an Absender
  await sendMail({
    to: email,
    subject: 'Kopie Ihrer Nachricht',
    fields: {
      logoUrl,
      lastname,
      firstname,
      email,
      message,
      acceptPrivacyPolicy,
    },
    templateHtml: templateCopyHtml || undefined,
    templateText: templateCopyText || undefined,
  })

  return { success: true }
})
