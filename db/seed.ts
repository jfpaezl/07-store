import { db, Role, User } from 'astro:db';
import { v4 as UUID } from 'uuid'
import bcrypt from 'bcryptjs';

// https://astro.build/db/seed
export default async function seed() {
  const roles = [
	{ id: 'admin', name: 'Administrator' },
	{ id: 'user', name: 'User' },
  ]

  const jonDoe = {
	id: UUID(),
	name: 'jon.doe',
	email: 'jon.doe@google.com',
	password: bcrypt.hashSync('123456'),
	role: 'admin',
  }
  const janeDoe = {
	id: UUID(),
	name: 'jane.doe',
	email: 'jane.doe@google.com',
	password: bcrypt.hashSync('123456'),
	role: 'user',
  }

  await db.insert(Role).values(roles);
  await db.insert(User).values([jonDoe, janeDoe]);
}
