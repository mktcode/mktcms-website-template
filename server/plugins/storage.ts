import createS3Driver from 'unstorage/drivers/s3'
import createFsDriver from 'unstorage/drivers/fs'

export default defineNitroPlugin(() => {
  const storage = useStorage()

  const s3Driver = createS3Driver({
    accessKeyId: useRuntimeConfig().s3AccessKey,
    secretAccessKey: useRuntimeConfig().s3SecretKey,
    endpoint: "https://nbg1.your-objectstorage.com",
    bucket: "mktcode-websites",
    region: "eu-central",
  })

  const fsDriver = createFsDriver({
    base: './.storage',
  })

  if (process.env.NODE_ENV === 'production') {
    storage.mount('content', s3Driver)
  } else {
    storage.mount('content', fsDriver)
  }
})