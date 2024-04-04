"use server"

import prisma from '@/lib/prisma';

/*
select * from "Article" 
    JOIN "Article" AS "quarter" ON "Article"."parentId" = "quarter"."id" 
    JOIN "Article" AS "Parent" ON "quarter"."parentId" = "Parent"."id" 
    WHERE "Parent"."weightKg" 
    BETWEEN 220 AND 250 and "Article"."classificationArtId" = 1         
    ORDER BY "Parent"."weightKg" ASC;
*/

export async function getArticlesByCanalWeightRange(maxWeight, minWeight) {
    const articles = await prisma.article.findMany({
        where: {
            AND: [
                {
                    parent: {
                        parent: {
                            weightKg: {
                                gte: minWeight,
                                lte: maxWeight
                            }
                        }
                    }
                },
                {
                    classificationArtId: 1
                }
            ]
        },
        orderBy: {
            parent: {
                weightKg: 'asc'
            }
        }
    });

    const artMitjanaPerArticle = calculMitjanaPerArticle(articles);
    const artMaxWeightPerArticle = getMaxWeightPerArticle(articles);
    const artMinWeightPerArticle = getMinWeightPerArticle(articles);

    return {articles, artMitjanaPerArticle , artMaxWeightPerArticle, artMinWeightPerArticle};
}


function calculMitjanaPerArticle(data) {
    const sumasPerArticle = {};
    const conteigPerArticle = {};
  
    data.forEach(item => {
      const { art_codi, weightKg } = item;
      sumasPerArticle[art_codi] = (sumasPerArticle[art_codi] || 0) + weightKg;
      conteigPerArticle[art_codi] = (conteigPerArticle[art_codi] || 0) + 1;
    });
  
    const mitjanaPerArticle = {};
    for (const art_codi in sumasPerArticle) {
      mitjanaPerArticle[art_codi] = sumasPerArticle[art_codi] / conteigPerArticle[art_codi];
    }
  
    return mitjanaPerArticle;
}


// Retorna el pes maxim de cada article
function getMaxWeightPerArticle(data) {
    const maxWeightPerArticle = {};
    data.forEach(item => {
        const { art_codi, weightKg } = item;
        if (maxWeightPerArticle[art_codi] === undefined || weightKg > maxWeightPerArticle[art_codi]) {
            maxWeightPerArticle[art_codi] = weightKg;
        }
    });
    return maxWeightPerArticle;
}

// Retorna el pes minim de cada article
function getMinWeightPerArticle(data) {
    const minWeightPerArticle = {};
    data.forEach(item => {
        const { art_codi, weightKg } = item;
        if (minWeightPerArticle[art_codi] === undefined || weightKg < minWeightPerArticle[art_codi]) {
            minWeightPerArticle[art_codi] = weightKg;
        }
    });
    return minWeightPerArticle;
}
