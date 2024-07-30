import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import SessionProvider from "./sessionProvider";
import NavBar from "./navBar";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await validateRequest();

  if (!session.user) redirect("/login");


  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <NavBar />
        <div className="max-w-7xl mx-auto p-5">{children}</div>
      </div>
    </SessionProvider>
  );
}
