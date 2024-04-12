"use server";

import prisma from '@/lib/prisma';

export default async function ArticleUnitWeightRange(selectedArticlesParmas) {

    const results = {};
    
    try{

        for (const [art_codi, params] of Object.entries(selectedArticlesParmas)) {

            try {
            
                const articles = await prisma.article.findMany({
                    where: {
                        art_codi: parseInt(art_codi, 10),
                        weightKg: {
                            gte: parseFloat(params.weight) - 0.5,
                            lte: parseFloat(params.weight) + 0.5,
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

                results[art_codi] = articles;

            }catch(err){
                console.error(`Error fetching articles for art_codi ${art_codi}:`, err);

            }

        }


    } catch (err){
        console.log("Error articles object: ", err);
    } finally {
        await prisma.$disconnect();
    }


    return results;
}