import { db, eq, like, Link, User } from "astro:db";

export const getUserByEmail = async (email:string) => {
  try {
    const res = await db.select().from(User).where(
      like(User.email, email)
    )
  
    if (res.length === 0) {
      return {
        success: true,
        data: null
      }
    }

    return {
      success: true,
      data: res[0]
    }
  } catch (e) {
    const error = e as Error
    return {
      success: false,
      error: error.message
    }
  }
}

