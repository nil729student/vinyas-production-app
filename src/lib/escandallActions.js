// select * from "Article" WHERE "parentId" IS NULL; -- article para (CANAL)

// select * from "Article" WHERE "parentId" = 419  -- Article fill del para (QUATER)

// select * from "Article" where "parentId" = 385 or "parentId" = 384 -- Article fill del fill (PEÇA)


"use server";
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function handlerEscandallbyAnimal(animalId) {
    const escandall = await prisma.article.findMany({
        where: { 
            animalId: animalId,
            parentId: null
        },
        include: {
            children: {
                include: {
                    children: {
                        orderBy: {
                            art_codi: 'asc',
                        },
                    }
                }
            }
        }
    });
    console.log(escandall);
    
    return escandall;
}


// calcul de els percentatges d'un article respecte el quarter davant i derrere
export async function handlerPercentatgeArticle(articleId) {
    const article = await prisma.article.findUnique({ // obtenim l'article per id
        where: { id: articleId },
        include: {
            parent: {
                include: {
                    parent: true
                }
            }
        }
    });
    console.log(article);
    // calculem el percentatge de l'article respecte el quarter.
    //const total = article.parent.parent.weightKg;
    //const percentatge = (article.weightKg * 100) / total;
    //return percentatge;
}