"use server";

import * as z from "zod";
import { LoginSchema } from "@/schema";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFiels = LoginSchema.safeParse(values);
  if (!validatedFiels.success) {
    return { error: "Invalid Fields" };
  }
  return {
    success: "Email sent!",
  };
};
