import React from "react";
import { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./signUpForm";

export const metadata: Metadata = {
  title: "Signup",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] shadow-2xl w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <h1 className="text-center text-3xl font-bold">S&apos;inscrire</h1>
          <div className="space-y-5">
            <SignUpForm />
            <Link href="/login" className="block text-center hover:underline">
              Avez vous deja un compte ? Se connecter
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
