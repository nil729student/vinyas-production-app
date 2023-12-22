"use server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createArticles (formData: FormData) {
  try {
    // obtenri el dib
    console.log(formData);
    console.log(formData['animalDib']);

    // Insertar el animal
    await prisma.animal.create({
      data: {
        dib: formData['animalDib'] as string,
        // Otras propiedades del animal, como raza y edad, si es necesario
      },
    });
    
    // Insertar el artículo principal (la "bola" en este caso)
    /*
    const mainArticle = await prisma.article.create({
      data: {
        name: rowFormData.section ,
        description: "", // Añade la descripción del artículo principal si es necesario
        price: 0, // Añade el precio del artículo principal si es necesario
        imagen: "", // Añade la imagen del artículo principal si es necesario
        weightKg: 0, // Añade el peso del artículo principal si es necesario
        animalId: animal.id ,
      },
    });

    // Insertar los artículos derivados (magre, ossos, etc.)
    for (const key in rowFormData.articles as any) {
      const articleData = rowFormData.articles[key];
      await prisma.article.create({
        data: {
          name: articleData.nom,
          description: "", // Añade la descripción del artículo derivado si es necesario
          price: 0, // Añade el precio del artículo derivado si es necesario
          imagen: "", // Añade la imagen del artículo derivado si es necesario
          weightKg: 0, // Añade el peso del artículo derivado si es necesario
          parentId: mainArticle.id,
          animalId: animal.id ,
        },
      });
    }
    */
    console.log("Inserción completada con éxito.");
  } catch (error) {
    console.error("Error al insertar en la base de datos:", error);
  } finally {
    await prisma.$disconnect();
  }

}

// Llamada a la función
//createArticles(/* Tu objeto FormData aquí */);
