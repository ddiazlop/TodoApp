import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const Todo = sqliteTable('todo', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  text: text('text').notNull(),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull(),
});
