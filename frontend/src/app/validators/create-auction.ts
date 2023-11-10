import { z } from 'zod'

export const schema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(10).max(255),
  winnersNumber: z.string().min(1),
  auctionEnd: z.date(),
  bidValue: z.string().min(1).optional(),
  collectionEnd: z.date().optional(),
})
