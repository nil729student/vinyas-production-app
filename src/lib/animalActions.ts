"use server";

import prisma from './prisma';

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