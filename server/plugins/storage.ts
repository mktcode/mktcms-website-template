import s3Driver from 'unstorage/drivers/s3'

export default defineNitroPlugin(() => {
  const storage = useStorage()

  const driver = s3Driver({
    accessKeyId: useRuntimeConfig().s3AccessKey,
    secretAccessKey: useRuntimeConfig().s3SecretKey,
    endpoint: "https://nbg1.your-objectstorage.com",
    bucket: "mktcode-websites",
    region: "eu-central",
  })

  storage.mount('content', driver)
})