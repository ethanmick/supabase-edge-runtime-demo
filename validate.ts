import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'

type Customer = {
  id?: string
  name?: string
  accountId?: string
  email?: string
  phone?: string
  mailingStreet?: string
  mailingCity?: string
  mailingState?: string
  mailingPostalCode?: string
  mailingCountry?: string
  createdDate?: string
  lastModifiedDate?: string
}

console.log('validate create started')

serve(
  async (req: Request) => {
    const customer: Customer = await req.json()

    // write whatever custom logic you want to your heart's content

    const validPhone = customer.phone && customer.phone.startsWith('802')
    if (!validPhone) {
      return new Response(JSON.stringify({ error: 'Invalid phone number.' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    return new Response(JSON.stringify(customer), {
      headers: { 'Content-Type': 'application/json', Connection: 'keep-alive' }
    })
  },
  { port: 9005 }
)
