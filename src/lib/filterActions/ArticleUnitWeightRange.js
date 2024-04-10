"use server";

import prisma from '@/lib/prisma';

export default async function ArticleUnitWeightRange() {

    const articles = await prisma.article.findMany({
        where: {
            art_codi: 11243,
            weightKg: {
                gte: 6.50,
                lte: 7
            },
        },
        include: {
            parent: {
                include: {
                    parent: true
                }
            }
        }
    });

    return articles;
}

