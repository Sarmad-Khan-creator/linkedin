'use server';

import { db } from '@/db/db';
import { CreateUserProps } from '@/lib/types';

export const CreateUser = async (data: CreateUserProps) => {
  try {
    const user = await db.user.create({
      data: data,
    });

    return user;
  } catch (error) {
    throw error;
  }
};
