"use server";
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function getAllAnimals() {
  try {
    // group by dib
    const animals = await prisma.animal.groupBy({
      by: ['dib'],
    });

    //const animals = await prisma.animal.findMany()
    console.log(animals);
    return animals;
  } finally {
    await prisma.$disconnect();
  }
}