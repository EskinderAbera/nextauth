"use server";

import * as z from "zod";
import bcrypt from "bcrypt";

import { RegisterSchema } from "@/schema";
import { db } from "@/lib/db";
import { error } from "console";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFiels = RegisterSchema.safeParse(values);
  if (!validatedFiels.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, name } = validatedFiels.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email is already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // TODO: send verification token email

  return {
    success: "Email sent!",
  };
};
