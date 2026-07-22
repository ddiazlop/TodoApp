import type { APIRoute } from 'astro';
import { db } from '../../../db';
import { Todo } from '../../../db/schema';
import { eq, asc } from 'drizzle-orm';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const filter = url.searchParams.get('filter') || 'all';

  let query = db.select().from(Todo);

  if (filter === 'active') {
    query = query.where(eq(Todo.completed, false));
  } else if (filter === 'completed') {
    query = query.where(eq(Todo.completed, true));
  }

  const todos = await query.orderBy(asc(Todo.createdAt));

  return new Response(JSON.stringify(todos), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const text = body.text?.trim();

  if (!text) {
    return new Response(JSON.stringify({ error: 'Text is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const todo = await db
    .insert(Todo)
    .values({ text, createdAt: new Date().toISOString() })
    .returning();

  return new Response(JSON.stringify(todo[0]), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};
