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
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden">
        <div className="flex flex-col md:flex-row w-full space-y-10 overflow-y-auto p-10">
          {/* Texte de connexion */}
          <div className="w-full md:w-1/2 space-y-1 text-center flex flex-col justify-center items-center md:items-start">
            <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Inscription</h1>
            <p className="text-base md:text-lg">
              Bienvenue! Veuillez vous connecter pour continuer.
            </p>
            </div>
            <div className="space-y-5">
              <SignUpForm />
              <Link href="/login" className="block text-center hover:underline">
                Avez vous deja un compte ? Se connecter
              </Link>
            </div>
          </div>

          {/* Image */}
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
      </div>
    </main>
  );
}
