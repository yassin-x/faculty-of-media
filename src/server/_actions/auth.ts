/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/lib/prisma";
import { signinSchema } from "@/validations/auth";
import bcrypt from "bcrypt";

export const signin = async (
  credentials: Record<"email" | "password", string> | undefined
) => {
  const result = signinSchema().safeParse(credentials);
  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
    };
  }

  try {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    if (!user) {
      return {
        message: "User not found",
        status: 404,
      };
    }
    const hashedPassword = user.password;
    const isValidPassword = await bcrypt.compare(
      result.data.password,
      hashedPassword
    );
    if (!isValidPassword) {
      return {
        message: "Incorected password",
        status: 401,
      };
    }

    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      status: 200,
      message: "Signin successful",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Unexpected error",
    };
  }
};
