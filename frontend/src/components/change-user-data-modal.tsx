"use client";

import { User } from "@/lib/types/user";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";

const ChangeUserDataModal = ({
  user,
  onSuccess,
}: {
  user: User;
  onSuccess: () => void;
}) => {
  const { data: session, status } = useSession();

  const handleUserDataChange = async (firstName: string, lastName: string) => {
    await axios({
      method: "post",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "user/change_details",
      headers: { Authorization: "Bearer " + session?.access_token },
      data: { first_name: firstName, last_name: lastName },
    });
    onSuccess();
  };

  // const [bidValue, setBidValue] = useState<number | undefined>(undefined);

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);

  return (
    <DialogContent className="max-h-full overflow-auto sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="[text-wrap:balance]">
          Dane użytkownika
        </DialogTitle>

        <span className="italic">
          {user.first_name}
          {user.last_name ? ` ${user.last_name}` : ""}
        </span>
        <DialogDescription className="whitespace-pre-wrap">
          {/* {auction.description} */}
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col items-center gap-2">
        <Label htmlFor="username">Nick z Discorda:</Label>
        <Input type="text" id="username" value={user.username} disabled />
        <Label htmlFor="first_name">Imię:</Label>
        <Input
          type="text"
          id="first_name"
          value={firstName || ""}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Label htmlFor="last_name">Nazwisko:</Label>
        <Input
          type="text"
          id="last_name"
          value={lastName || ""}
          onChange={(e) => setLastName(e.target.value)}
        />

        <Button
          onClick={() => {
            handleUserDataChange(firstName, lastName);
          }}
          disabled={false}
        >
          Zapisz
        </Button>
      </div>
    </DialogContent>
  );
};

export default ChangeUserDataModal;
