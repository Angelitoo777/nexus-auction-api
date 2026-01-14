import { z } from 'zod';

export const CreateProductSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(1000),
  status: z.enum(['available', 'auctioning', 'sold']).optional(),
});

export type CreateProductDto = z.infer<typeof CreateProductSchema>;
