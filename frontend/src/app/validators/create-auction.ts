import { z } from "zod";

export const schema = z.object({
  title: z
    .string()
    .min(3, { message: "Tytuł jest za krótki" })
    .max(63, { message: "Tytuł jest za długi" }),
  description: z.string().min(0).max(1023, { message: "Opis jest za długi" }),
  winnersNumber: z.coerce
    .number()
    .min(1, { message: "liczba wygranych powinna być większa niż 1" }),
  auctionEnd: z.date(),
  bidValue: z.coerce.number().min(10).optional(),
});
