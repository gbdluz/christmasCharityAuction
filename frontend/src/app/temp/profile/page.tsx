"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Profile() {
  const { data: session, status } = useSession({ required: true });
  const [response, setResponse] = useState("{}");

  const getUserDetails = async (useToken: boolean) => {
    try {
      const response = await axios({
        method: "get",
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "api/auth/user/",
        headers: useToken
          ? { Authorization: "Bearer " + session?.access_token }
          : {},
      });
      setResponse(JSON.stringify(response.data));
    } catch (error) {
      const err = error as { message: string };
      setResponse(err.message);
    }
  };

  const newGetFunc = async () => {
    try {
      const response = await axios({
        method: "post",
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "auction/",
        headers: { Authorization: "Bearer " + session?.access_token },
        data: {
          title: "test",
        },
      });
      // const response = await axios({
      //   method: "get",
      //   url: process.env.NEXT_PUBLIC_BACKEND_URL + "auth/new/",
      // });
      setResponse(JSON.stringify(response.data));
    } catch (error) {
      const err = error as { message: string };
      setResponse(err.message);
    }
  };

  if (status == "loading") {
    return <div className="h-4 w-4 animate-spin bg-primary"></div>;
  }

  if (session) {
    return (
      <div>
        <div>
          <span>PK: {session.user.pk}</span>
          <span>Username: {session.user.username}</span>
          <span>Email: {session.user.email || "Not provided"}</span>
          <span className="font-mono">{response}</span>
        </div>
        <span>
          <Button onClick={() => getUserDetails(true)}>
            User details (with token)
          </Button>
          <Button onClick={() => getUserDetails(false)}>
            User details (without token)
          </Button>
          <Button onClick={() => newGetFunc()}>New func</Button>
          <Button onClick={() => signOut({ callbackUrl: "/" })}>
            Sign out
          </Button>
        </span>
      </div>
    );
  }
}
