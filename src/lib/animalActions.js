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


export async function getArticlesByAnimalWeightRange(art_codi) {
  try {
    // obtenir tots els animals que tinguin associat el codi de l'article
    const animals = await prisma.article.findMany({
      include: {
        animal: true
      },
      where: {
        art_codi: art_codi
      }
    });
    console.log(animals);
    return animals;
  } finally {
    await prisma.$disconnect();
  }
}