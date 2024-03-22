'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const client = require('./db/prisma');

const FormSchema = z.object({
  id: z.string(), customerId: z.string(), amount: z.coerce.number(), status: z.enum(['pending', 'paid']), date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'), amount: formData.get('amount'), status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await client.$executeRaw`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (UUID(${customerId}), ${amountInCents}, ${status},
                Date (${date}))
    `;
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'), amount: formData.get('amount'), status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  try {
    await client.$executeRaw`
        UPDATE invoices
        SET customer_id = UUID(${customerId}),
            amount      = ${amountInCents},
            status      = ${status}
        WHERE id = UUID(${id})
    `;

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }
}

export async function deleteInvoice(id: string) {
  throw new Error('Failed to Delete Invoice');
  try {
    await client.$executeRaw`DELETE
                             FROM invoices
                             WHERE id = UUID(${id})`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');

}
