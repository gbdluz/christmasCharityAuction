"use client";

import { schema } from "@/app/validators/create-auction";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Page = () => {
  const { data: session } = useSession({ required: true });
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      winnersNumber: "1",
      title: "",
      description: "",
      auctionEnd: new Date("2023-12-21"),
      bidValue: 10,
    },
  });
  const { handleSubmit, register } = form;

  const onSubmit = async (input: z.infer<typeof schema>) => {
    try {
      const response = await axios({
        method: "post",
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "auction/",
        headers: { Authorization: "Bearer " + session?.access_token },
        data: {
          title: input.title,
          description: input.description,
          num_of_winners: input.winnersNumber,
          deadline: input.auctionEnd?.toISOString().split("T")[0],
          min_bid_value: input.bidValue,
          auction_end_data: input.auctionEnd?.toISOString().split("T")[0],
          is_paid: false,
          is_collected: false,
        },
      });
      toast({
        title: "Utworzono aukcję",
        // action: (
        //   <ToastAction altText="Try again">
        //     Piotrku (i Grzesiu) z przyszłości, dodaj tu przycisk przejścia do
        //     danej aukcji
        //   </ToastAction>
        // ),
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Nie udało się utworzyć aukcji",
        description: <> `${error}` </>,
        variant: "destructive",
      });
      return;
    }
  };
  const isDateDisabled = (date: Date) => {
    const now = new Date();
    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      return false;
    }
    const maxDate = new Date("2023-12-21");

    return date < now || date > maxDate;
  };

  return (
    <div className="container max-w-xl">
      <CardHeader>
        <CardTitle>Dodaj aukcję</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tytuł:</FormLabel>
                  <FormControl>
                    <Input placeholder="Wprowadź tytuł" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opis:</FormLabel>
                  <FormControl>
                    <Input placeholder="Wprowadź opis" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="winnersNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Liczba zwycięzców:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="wprowadź liczbę zwycięzców"
                      type="number"
                      min="1"
                      className="w-16"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="auctionEnd"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Termin zakończenia licytacji:</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-60 pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: pl })
                          ) : (
                            <span>Wybierz datę</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => isDateDisabled(date)}
                        initialFocus
                        locale={pl}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bidValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cena wywoławcza:</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Wprowadź liczbę"
                        type="number"
                        {...register("bidValue", { valueAsNumber: true })}
                        min={10}
                        {...field}
                      />
                      <span>zł</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex">
              <Button type="submit" className="grow">
                Dodaj
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </div>
  );
};

export default Page;
