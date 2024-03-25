"use server"

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function updateArticle(article, idArt) {
    console.log("Article to update:", article, "id:", idArt);
    
    // format data to send to the server
    article = {
        ...article,
        ...(article.weightKg && { weightKg: parseFloat(article.weightKg) }),
        ...(article.price && { price: parseFloat(article.price) }),
        ...(article.art_codi && { art_codi: parseInt(article.art_codi) }),
    };

    console.log("Article to update after formatting:", article);

    const udatedArt = await prisma.article.update({
        where: { id: idArt},
        data: {
            ...article,
        },
    });

    return udatedArt; 
}
