"use client";

import { Button } from "@/components/ui/button";
import { Loader2, LogIn, LogOut, User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SignInButton() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status == "loading") {
    return (
      <Button variant="outline" size={"icon"} disabled={true}>
        <Loader2 className="h-5 w-5 animate-spin" />
      </Button>
    );
  }

  return (
    <>
      {session ? (
        <>
          <Button
            variant="outline"
            onClick={() => router.push("/profile")}
            size={"icon"}
            title="Profil"
          >
            <User className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="flex gap-2"
            onClick={() => signOut({ callbackUrl: "/" })}
            title="Wyloguj się"
          >
            <span>Wyloguj się</span>
            <LogOut className="h-5 w-5" />
          </Button>
        </>
      ) : (
        <Button
          variant="default"
          className="flex gap-2"
          onClick={() => signIn("discord", { callbackUrl: "/" })}
          title="Zaloguj się"
        >
          <LogIn className="h-5 w-5" />
          <span>Zaloguj się</span>
        </Button>
      )}
    </>
  );
}
