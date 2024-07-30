/*
Ce code configure et utilise un système d'authentification 
avec Lucia et Prisma pour gérer les utilisateurs et les sessions dans une application construite avec Next.js.
*/

import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "./prisma";
import { Lucia } from "lucia";
import { Session, User } from "@prisma/client";
import { cache } from "react";
import { cookies } from "next/headers";

/*  Une interface TypeScript décrivant les attributs de l'utilisateur dans la base de données.*/

interface DatabaseUserAttributes {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  email: string | null;
  passwordHash: string | null;
  googleId: string | null;
  bio: string | null;
  createdAt: Date;
}

/* Étend le module lucia pour inclure une interface Register avec la configuration spécifique de votre application. */
declare module "lucia" {
  interface Register {
    Lucia: typeof Lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

/* PrismaAdapter : Initialise l'adaptateur Prisma pour Lucia en utilisant les tables de sessions et utilisateurs de votre base de données Prisma. */
const adapter = new PrismaAdapter(prisma.session, prisma.user);

/* sessionCookie : Configure les cookies de session. Le cookie est sécurisé si l'application est en production.
getUserAttributes : Fonction pour mapper les attributs de l'utilisateur de la base de données aux attributs utilisés dans l'application. */
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes(DatabaseUserAttributes) {
    return {
      id: DatabaseUserAttributes.id,
      username: DatabaseUserAttributes.username,
      displayName: DatabaseUserAttributes.displayName,
      avatarUrl: DatabaseUserAttributes.avatarUrl,
      email: DatabaseUserAttributes.email,
      passwordHash: DatabaseUserAttributes.passwordHash,
      googleId: DatabaseUserAttributes.googleId,
      bio: DatabaseUserAttributes.bio,
      createdAt: DatabaseUserAttributes.createdAt,
    };
  }
});

/* validateRequest : Une fonction asynchrone pour valider les sessions utilisateurs.
cache : Utilise cache pour mémoriser les résultats et améliorer les performances.
sessionId : Récupère l'ID de session à partir des cookies.
lucia.validateSession(sessionId) : Valide la session en utilisant l'ID de session. Retourne les informations de session et d'utilisateur.
sessionCookie : Si la session est fraîche, elle crée un cookie de session et le met à jour.
createBlankSessionCookie() : Crée un cookie de session vide si aucune session valide n'existe. */

export const validateRequest = cache(
  async (): Promise<
  { user: User; session: Session; } | { user: null; session: null; }
> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);

    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch (error) {}

    return result as
      | {
          user: DatabaseUserAttributes;
          session: Session;
        }
      | { user: null; session: null };
  }
);
