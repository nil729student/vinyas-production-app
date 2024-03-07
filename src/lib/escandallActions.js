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
                    children: true
                }
            }
        }
    });

    


    return escandall;
}
