import { DefalUser, DefaultSession } from '@auth/core/tipes';

declare module '@auth/core/types' {
    interface User extends DefalUser {
        role?: string;
    }

    interface Session extends DefaultSession {
        user: User;
    }
}