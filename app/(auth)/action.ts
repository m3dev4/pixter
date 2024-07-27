"use server";

import { lucia, validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


export async function Logout() {
    const { session } = await validateRequest()

    if(!session) {
        throw new Error("No session found");
    };
    await lucia.invalidateSession(session.id)

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes

    )
    return redirect('/login')
}