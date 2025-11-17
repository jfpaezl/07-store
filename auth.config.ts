// import GitHub from '@auth/core/providers/github';
import type { AdapterUser } from '@auth/core/adapters';
import Credentials from '@auth/core/providers/credentials';
import { db, eq, User } from 'astro:db';
import { defineConfig } from 'auth-astro';
import bcrypt from 'bcryptjs';

export default defineConfig({
    providers: [
        //TODO
        // GitHub({
        //     clientId: import.meta.env.GITHUB_ID,
        //     clientSecret: import.meta.env.GITHUB_SECRET,
        // })
        Credentials({
            name: 'Credentials',
            credentials: {
                email : { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async ({email, password}) => {
                const [user] = await db.select().from(User).where(eq(User.email, email as string)).limit(1);

                if (!user) {
                    throw new Error('User not found');
                }

                if(!bcrypt.compareSync(password as string, user.password)) {
                    throw new Error('Invalid password');
                }

                const { password: _, ...userWithoutPassword } = user;
                console.log(userWithoutPassword);
                
                return userWithoutPassword;
            }
        })
    ],

    callbacks: {
        jwt: ({token, user}) => {
            if (user) {
                token.user = user;
            }
            return token;
        },
        session: ({session, token}) => {
            session.user = token.user as AdapterUser;
            return session;
        }
    }
});