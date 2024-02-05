"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schema";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFiels = RegisterSchema.safeParse(values);
  if (!validatedFiels.success) {
    return { error: "Invalid Fields" };
  }
  return {
    success: "Email sent!",
  };
};
