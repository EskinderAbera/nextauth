import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "@/schema";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          // if the user does not have password like registered using Oauth providers, then don't need to check it.
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          return passwordMatch ? user : null;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
