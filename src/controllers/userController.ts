import User, { UserSchema } from "../models/user";

/**
 * Sign Up a User
 */

export async function signUp(
  data: UserSchema
): Promise<{ error: true; msg: string } | { error: false; user: UserSchema }> {
  const newUser = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    password: data.password,
    email: data.email,
    isAdmin: data.isAdmin,
    isSuper: data.isSuper,
    deleted: data.deleted
  });

  try {
    const validUser = await User.exists({
      email: data.email
    });
    if (validUser) {
      return {
        error: true,
        msg: "User already exist"
      };
    }
  } catch (error) {}
}
