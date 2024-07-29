import { Metadata } from "next";
import LoginForm from "./loginForm";
import Link from "next/link";
import Image from "next/image";
export const metadata: Metadata = {
  title: "Se connecter",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] shadow-2xl w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <h1 className="text-center text-3xl font-bold">Se connecter</h1>
          <div className="space-y-5">
            <LoginForm />
            <Link href="/signup" className="block text-center hover:underline">
              Vous n&apos;avez pas de compte ? Inscrivez-vous
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Image
            src="/images/illustration.png"
            alt="Illustration"
            width={400}
            height={400}
            className="md:block hidden object-cover"
          />
        </div>
      </div>
    </main>
  );
}
