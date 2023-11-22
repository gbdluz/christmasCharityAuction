"use client";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export function SignInButton() {
  return (
    <Button
      variant="outline"
      className="flex gap-2"
      onClick={() => console.log("Beep boop")}
    >
      <span>Sign in</span>
      <LogIn className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
}
