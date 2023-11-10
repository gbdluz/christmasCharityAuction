import { z } from 'zod'

export const schema = z.object({
  title: z.string().min(3, { message: 'tytuł nie powinien być taki krótki' }).max(255),
  description: z.string().min(5, { message: 'opis nie powinien być taki krótki' }).max(255),
  winnersNumber: z.string().min(1, { message: 'liczba wygranych powinna być większa niż 1' }),
  auctionEnd: z.date(),
  bidValue: z.string().min(1).optional(),
  collectionEnd: z.date().optional(),
})
