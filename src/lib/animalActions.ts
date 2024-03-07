"use server";
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function getAllAnimals() {
  try {
    // group by dib but show all columns
    const animals = await prisma.animal.findMany();

    //const animals = await prisma.animal.findMany()
    console.log(animals);
    return animals;
  } finally {
    await prisma.$disconnect();
  }
}