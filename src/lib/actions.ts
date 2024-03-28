"use server";

import { Prisma } from '@prisma/client';
import prisma from './prisma';

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
/*
export async function createArticles (formData: FormData) {
  try {
    // obtenri el dib
    console.log(formData);
    // si weightKgSection es null, no es pot fer el insert
    if (formData['weightKgSection'] == null) {
      throw new Error("No s'ha introduit el pes del animal");
    }
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
*/

export async function createArticles(formData: FormData) {
  if (!formData['weightKgSection']) {
    console.log("No s'ha introduit el pes del animal");
  }

  const articles = filterArticles(formData['articles']);

  try {

    const insertedAnimal = await createAnimal(formData['animalDib']);

    const parentArticle = await createMainArticleByForm(formData, insertedAnimal);

    await createDerivedArticlesByForm(articles, parentArticle, insertedAnimal);

  } catch (error) {
    console.error("Error al insertar en la base de datos:", error);
  } finally {
    await prisma.$disconnect();
  }
}

function filterArticles(articles: any) {
  return Object.fromEntries(
    Object.entries(articles).filter(([key]) => key !== '0')
  );
}

async function createAnimal(dib: string) {
  const newAnimal = await prisma.animal.create({
    data: {
      dib: dib as string,
      classification: { connect: { id: 1 } },
      sexe: 'M',
    },
    select: {
      id: true,
    }
  });

  return newAnimal.id as number;
}

async function createMainArticleByForm(formData: FormData, insertedAnimal: number) {
  const weightKgValue: string | null = formData['weightKgSection'] as string | null;
  const mainArticleData: Prisma.ArticleCreateInput = {
    name: formData['section'] as string,
    lot:  "", // articles[article]['Lot'] as string ?? "",
    description: '',
    price: 0,
    image: '',
    weightKg: weightKgValue ? parseFloat(weightKgValue) : null,
    classification: { connect: { id: 1 }},// formData['classification'] as number } },
    units: 1,
    unitsConsum: 1,
    animal: { connect: { id: insertedAnimal } },
    art_codi: 1,
  };

  const parentArticle = await prisma.article.create({
    data: mainArticleData,
    select: {
      id: true, // 
    }
  });

  return parentArticle;
}

async function createDerivedArticlesByForm(articles: any, parentArticle: any, insertedAnimal: number) {
  for (const article in articles) {
    await prisma.article.create({
      data: {
        name: article as string,
        lot:  "", // articles[article]['Lot'] as string ?? "",
        description: "",
        price: 0,
        image: "",
        units: parseInt(articles[article]['Unitats']) as number,
        unitsConsum: parseInt(articles[article]['UnitatsConsum']) as number,
        weightKg: parseFloat(articles[article]['Pes']) as number,
        classification: { connect: { id: 1 }}, //articles[article]['classification'] as number } },
        parent: { connect: { id: parentArticle.id as number } },
        animal: { connect: { id: insertedAnimal } },
        art_codi: 2,
      },
    });
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
    
    console.log(articles);
    return articles;
  } catch (error) {
    console.error("Error al obtener los artículos:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// obtenir els articles para de un animal(que no sean derivados) AND DIB
export async function getArticlesByAnimalId(animalId: number, dib: string) {
  try {
    const articles = await prisma.article.findMany({
      where: {
        animal: {
          dib: dib,
        },
        parent: null,
      },
    });
    console.log(articles);
    return articles;
  } catch (error) {
    console.error("Error al obtener los artículos:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// obtenir tots els articles d'un article pare AND DIB
export async function getArticlesByParentId(parentId: number, dib: string) {
  try {
    const articles = await prisma.article.findMany({
      where: {
        animal: {
          dib: dib,
        }
      },
    });
    console.log(articles);
    return articles;
  } catch (error) {
    console.error("Error al obtener los artículos:", error);
  } finally {
    await prisma.$disconnect();
  }
}