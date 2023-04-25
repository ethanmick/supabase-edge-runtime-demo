import { Application, Router } from 'https://deno.land/x/oak/mod.ts'

const app = new Application()
const router = new Router()

router.post('/upload', async (context) => {
  const result = context.request.body({ type: 'json' })
  const { script, uuid } = await result.value

  const path = `/tmp/functions/${uuid}/index.ts`

  // Ensure directory exists
  await Deno.mkdir(`/tmp/functions/${uuid}`, { recursive: true })

  // Save script to disk
  await Deno.writeTextFile(path, script)

  context.response.status = 200
  context.response.body = {
    success: true,
    message: 'Script saved successfully',
    path
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

console.log('Listening on http://localhost:8000')
await app.listen({ port: 8000 })
