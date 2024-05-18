import type { APIRoute } from "astro";
import { Link, db, eq } from "astro:db";

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get('content-type') !== 'application/json') {
    return new Response(null, { status: 400, statusText: 'Bad request' })
  }

  const body = await request.json()

  // comprobar si viene la url
  if (!body.url) {
    return new Response(null, { status: 400, statusText: 'Bad request' })
  }

  const url = body.url as string

  try {
    let idExists = true
    let id: string = ''
    do {
      // generar un id único
      const auxId = Math.random().toString(36).substring(2, 7)
  
      // comprobar si existe
      const idExistsReq = await db.select().from(Link).where(
        eq(Link.code, auxId)
      )
  
      if (idExistsReq.length === 0) {
        idExists = false
        id = auxId
  
        // guardar en la base de datos
        await db.insert(Link).values({
          userId: body.userId ?? null,
          code: id,
          url: url
        })
      }
    } while (idExists)

    const newUrl = new URL(request.url)

    return new Response(JSON.stringify({
      Link: `${newUrl.origin}/${id}`
    }), {
      status: 201
    })
  } catch (e) {
    const error = e as Error
    return new Response(null, { status: 500, statusText: error.message })
  }
}