"use server"

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function updateArticle(article) {
    const article = await prisma.article.update({
        where: { id: article.id},
        data: {
            ...article, // actualitzem tots els camps de l'article
        },
    });
}
