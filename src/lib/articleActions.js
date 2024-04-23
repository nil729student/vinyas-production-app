"use server"

import prisma from './prisma';

export async function createArticle(articleData) {

    console.log ("formatArticle", articleData);

    try{
        const newArt = await prisma.article.create({
            data: {
                ...articleData,
            },
        });
        console.log("Article created:", newArt);
        return newArt;

    }catch(err){
        console.error("Error creating article:", err);
        return null;
    }
}

export async function updateArticle(article, idArt) {
    
    article = {
        ...article,
        ...(article.weightKg && { weightKg: parseFloat(article.weightKg) }),
        ...(article.price && { price: parseFloat(article.price) }),
        ...(article.art_codi && { art_codi: parseInt(article.art_codi) }),
    };

    try{
        const updatedArt = await prisma.article.update({
            where: { id: idArt },
            data: {
                ...article,
            },
        });
        console.log("Article updated:", updatedArt);
        return updatedArt;
    
    }catch(err){
        console.error("Error updating article:", err);
        return null;
    }
}

export async function deleteArticle(idArt) {
    try{
        const deletedArt = await prisma.article.delete({
            where: { id: idArt },
        });
        console.log("Article deleted:", deletedArt);
        return deletedArt;

    }catch(err){
        console.error("Error deleting article:", err);
        return null;
    }
}

export async function getMaxMinWeightArticles(codArt) {
    try{
        console.log('codArt:', codArt);
        const result = await prisma.article.aggregate({
            where: {
                art_codi: codArt
            },
            _count: {
                _all: true
            },
            _max: {
                weightKg: true
            },
            _min: {
                weightKg: true
            }
        });

        if (result._count && result._max && result._min) {
            console.log('Count:', result._count._all);
            console.log('Max weight:', result._max.weightKg);
            console.log('Min weight:', result._min.weightKg);
        } else {
            console.log('No articles found with art_codi:', codArt);
        }
        return result;
    } catch (error) {
        console.error('Error fetching articles by code:', error);
    }
}