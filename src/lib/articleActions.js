"use server"

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
