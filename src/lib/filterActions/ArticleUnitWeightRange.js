"use server";

import prisma from '@/lib/prisma';

export default async function ArticleUnitWeightRange(selectedArticlesParmas) {

    const results = {};

    try {

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
                                parent: true,
                            },
                        },
                        classification: true,
                    },
                });
                console.log(articles);
                // Mitjana dels pesos dels articles
                const artMitjanaPerArticle = articles.reduce((acc, art) => acc + art.weightKg, 0) / articles.length;
                // Pes maxim de els articles
                const artMaxWeightPerArticle = Math.max(...articles.map(art => art.weightKg));
                // Pes minim de els articles
                const artMinWeightPerArticle = Math.min(...articles.map(art => art.weightKg));

                // Mitjana dels pesos quarter
                const quarterArtMitjanaPerArticle = articles.reduce((acc, art) => acc + art.parent.weightKg, 0) / articles.length;
                // Pes maxim dels pesos quarter
                const quarterArtMaxWeightPerArticle = Math.max(...articles.map(art => art.parent.weightKg));
                // Pes minim dels pesos quarter
                const quarterArtMinWeightPerArticle = Math.min(...articles.map(art => art.parent.weightKg));

                // Mitjana dels pesos canal
                const canalArtMitjanaPerArticle = articles.reduce((acc, art) => acc + art.parent.parent.weightKg, 0) / articles.length;
                // Pes maxim de la canal
                const canalArtMaxWeightPerArticle = Math.max(...articles.map(art => art.parent.parent.weightKg));
                // Pes minim de la canal
                const canalArtMinWeightPerArticle = Math.min(...articles.map(art => art.parent.parent.weightKg));

                results[art_codi] = {
                    articles,
                    artUnitats: params.units,
                    artMitjanaPerArticle,
                    artMaxWeightPerArticle,
                    artMinWeightPerArticle,
                    quarterArtMitjanaPerArticle,
                    quarterArtMaxWeightPerArticle,
                    quarterArtMinWeightPerArticle,
                    canalArtMitjanaPerArticle,
                    canalArtMaxWeightPerArticle,
                    canalArtMinWeightPerArticle
                };

            } catch (err) {
                console.error(`Error fetching articles for art_codi ${art_codi}:`, err);
            }

        }

    } catch (err) {
        console.log("Error articles object: ", err);
    } finally {
        await prisma.$disconnect();
    }


    return results;
}