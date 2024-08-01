import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import SessionProvider from "./sessionProvider";
import NavBar from "./navBar";
import MenuBar from "@/components/menuBar";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await validateRequest();

  if (!session.user) redirect("/login");

  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <NavBar />
        <div className="max-w-7xl mx-auto p-5 flex w-full grow gap-5">
          <MenuBar className="sticky top-[5.25rem] hidden h-fit  sm:block flex-none space-y-3 rounded-2xl bg-card px-3 py-5 lg:px-5 shadow-sm xl:w-80" />
          {children}
        </div>
        <MenuBar className="sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden lg:hidden" />
      </div>
    </SessionProvider>
  );
}
