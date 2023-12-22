"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// Todes les funcions que s'exporten en a quest archiu pertanyen al servidor
interface ArticleData {
  name: string;
  description?: string;
  units: number;
  unitsConsum: number;
  price?: number;
  imagen?: string;
  weightKg?: number;
  categoryId: number;
  animalId: number;
  parentId?: number;
}

export async function createArticles(formData: FormData) {
  const rowFormData: { [key: string]: string } = {};
  formData.forEach((value, key) => {
    rowFormData[key] = value as string;
  });

  console.log(rowFormData);
  try {
    // 1. Parsear y validar los datos
    const animalDib = formData.get('animalDib');
    const animalRace = formData.get('animalRace');
    const animalAge = formData.get('animalAge');
    const section = formData.get('section');
    const magreUnitats = formData.get('magreUnitats');
    const magreUnitatsConsum = formData.get('magreUnitatsConsum');
    const magrePes = formData.get('magrePes');
    const ossosPes = formData.get('ossosPes');
    const altresUnitats = formData.get('altresUnitats');
    const altresUnitatsConsum = formData.get('altresUnitatsConsum');
        const altresPes = formData.get('altresPes');

    // Crear un nou animal amb Prisma
    const animal = await prisma.animal.create({
      data: {
        dib: animalDib.toString(),


      },
    });

    // Iterar sobre els tipus d'articles (magre, grasa, nervis, ossos, altres)
    interface FormDataWithArticles extends FormData {
      articles: { [key: string]: any };
    }

for (const articleType in (formData as FormDataWithArticles).articles) {
  const articleData = (formData as FormDataWithArticles).articles[articleType];
  
  // Crear un nou article amb Prisma per a cada tipus
  await prisma.article.create({
    data: {
      name: articleType,
      units: parseInt(articleData.unitats),
      unitsConsum: parseInt(articleData.unitatsConsum),
      weightKg: parseInt(articleData.pes),
      animalId: animal.id,


    } as ArticleData,
  });
}

// Tancar la connexió a Prisma
await prisma.$disconnect();

  } catch (error) {
    console.error('Error al insertar los artículos:', error);
  } finally {
    await prisma.$disconnect();
  }
  // insert in DB using Prisma






  /*
  const response = await fetch("/api/articles", {
    method: "POST",
    body: JSON.stringify(rowFormData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  */

}
