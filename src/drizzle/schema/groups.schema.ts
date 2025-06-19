import {
  index,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';

export const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  name: text('title').notNull(),
});

export const user_to_groups = pgTable(
  'user_to_groups',
  {
    userId: integer('user_id').references(() => users.id),
    groupId: integer('group_id').references(() => groups.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.groupId] }),
    userIdIndex: index('user_id_idx').on(table.userId),
  }),
);
