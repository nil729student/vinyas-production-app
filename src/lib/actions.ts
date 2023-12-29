"use server";
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function getAllAnimals() {
  try {
    const animals = await prisma.animal.findMany();
    console.log(animals);
    return animals;
  } finally {
    await prisma.$disconnect();
  }
}

export async function createArticles (formData: FormData) {
  try {
    // obtenri el dib
    console.log(formData);
    const articles = Object.fromEntries(
      Object.entries(formData['articles']).filter(([key]) => key !== '0')
    );
    console.log(articles);
    for (const article in articles) {
      console.log(article);
      console.log(articles[article]);
    }
    
    // Insertar el animal
    const newAnimal = await prisma.animal.create({
      data: {
        dib: formData['animalDib'] as string,
        // Afegir mes dades al futur del animal, com la raza el pes etc...
      },
      // Selecionem el id per poder fer el connect
      select: {
        id: true,
      }

    });

    const insertedAnimal = newAnimal.id as number;
    console.log(insertedAnimal);
    // Insertar el artículo principal (la "bola" en este caso)
    const weightKgValue: string | null = formData['weightKgSection'] as string | null;

    const mainArticleData: Prisma.ArticleCreateInput = {
      name: formData['section'] as string,
      description: '',
      price: 0,
      imagen: '',
      weightKg: weightKgValue ? parseFloat(weightKgValue) : null,
      animal: { connect: { id: insertedAnimal } },
      units: 1,
      unitsConsum: 1,

    };
    
    const parentArticle = await prisma.article.create({
      data: mainArticleData,
      select: {
        id: true,
      }
    });
    // Insertem els articles derivats (magre, ossos, etc.)

    for (const article in articles) {
      await prisma.article.create({
        data: {
          name: article as string,
          description: "",
          price: 0,
          imagen: "",
          units: parseInt(articles[article]['Unitats'])  as number,
          unitsConsum: parseInt(articles[article]['UnitatsConsum']) as number,
          weightKg: parseFloat(articles[article]['Pes']) as number,
          parent: { connect: { id: parentArticle.id as number } },
          animal: { connect: { id: insertedAnimal } },
        },
      });
    }

  } catch (error) {
    console.error("Error al insertar en la base de datos:", error);
  } finally {
    await prisma.$disconnect();
  }

}

export async function getArticles() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        parent: true,
        animal: true,
      },
    });
    return articles;
  } catch (error) {
    console.error("Error al obtener los artículos:", error);
  } finally {
    await prisma.$disconnect();
  }
}
