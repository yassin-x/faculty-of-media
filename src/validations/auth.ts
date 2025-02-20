import * as z from "zod";

export const signinSchema = () => {
  return z.object({
    email: z.string().trim().email({
      message: "Please enter a valid email address",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(40, { message: "Password must be at most 40 characters" }),
  });
};

export type ValidationErrors =
  | {
      [key: string]: string[];
    }
  | undefined;
