import type { APIRoute } from "astro";
import { db, Link, eq } from "astro:db";

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get('content-type') !== 'application/json') {
    return new Response(null, { status: 400, statusText: 'Bad request' });
  }

  const body = await request.json();

  // Comprobar si viene el id
  if (!body.id) {
    return new Response(null, { status: 400, statusText: 'Bad request' });
  }

  const id = body.id as string;

  try {
    // Eliminar el registro de la base de datos
    const deleteResult = await db
      .delete(Link)
      .where(eq(Link.code, id))
      .returning();

    if (deleteResult.length === 0) {
      return new Response(null, { status: 404, statusText: 'URL not found' });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    const error = e as Error;
    return new Response(null, { status: 500, statusText: error.message });
  }
};
