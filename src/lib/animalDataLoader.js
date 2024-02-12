// Fech de dades de la API
"use server";
// Retorna les peçes resultatnts de una un animal (dib_id) -> quarter (art_codi) -> despiece (art_codi)
import { NextResponse } from "next/server";
import { connKais, connKaisEscorxa } from "@/lib/connDBKais.js"; // Make sure to import dbConn with the correct name
import sql from 'mssql';
import prisma from "./prisma";
import { createMainArticleByForm, createDerivedArticles } from "./actions";


export async function fechAnimalByDib(dib_id) {
    try {
        await connKaisEscorxa();
        const animal = await sql.query`
            SELECT
                SUBSTRING(dib_id, 1, 11) as dib_id,
                lpa_pes, 
                lpa_qualitatabr, 
                lpa_sexe 
            FROM LpaPesos 
                WHERE dib_id 
                LIKE ${dib_id + '%'}`;
        /*
        animal: {
            dib_id: 'CZ830760081',
            lpa_pes: 0,
            lpa_qualitatabr: '',
            lpa_sexe: 'M'
        },
        */
        const data = animal.recordset;
        
        sql.close();
        return data;
    }
    catch (error) {
        console.error(error);
        return error;
    }
}


function formatArticles(data) {
    let canals = [];

    // Paso 1: Crear los canales
    for (let item of data) {
        if (item.art_codi.trim() == '001007') {
            // Crear canal
            const canal = {
                dib_id: item.dib_id.trim(),
                lot_codigo: item.lot_codigo.trim(),
                art_codi: item.art_codi.trim(),
                art_descrip: item.art_descrip.trim(),
                peso_art: [],
                quarter: {
                    davants: [],
                    derreres: []
                }
            };
            // enviali al array canals
            canals.push(canal);
            break;
        }
    }
    const pesArtCanal = data.map((item) => {
        if (item.art_codi.trim() == '001007') {
            return item.peso_art;
        }
    }).filter((value) => value !== undefined); // Filter out undefined values
    const sumArtCanal = pesArtCanal.reduce((total, item) => total + item, 0)
    canals[0].peso_art = sumArtCanal;


    // Paso 2: Organiza els quarts per canal
    for (let item of data) {
        // Buscar el canal
        const canal = canals.find(canal => canal.dib_id == item.dib_id.trim());
        // Crear el quarter
        const quarter = {
            lot_codigo: item.lot_codigo.trim(),
            art_codi: item.art_codi.trim(),
            art_descrip: item.art_descrip.trim(),
            peso_art: [],
            despiece: []
        };
        if ( item.art_codi.trim() == '001107' ){
            // Añadir el quarter al canal amb la suma total del pes de les peçes 
            canal.quarter.davants.push(quarter);
            // suma el pes de les peçes
            const pesArtQuarter = data.map((item) => {
                if (item.art_codi.trim() == '001107') {
                    return item.peso_art;
                }
            }).filter((value) => value !== undefined); // Filter out undefined values
            // suma el pesArtQuarter
            const sumArtQuarter = pesArtQuarter.reduce((total, item) => total + item, 0)
            quarter.peso_art = sumArtQuarter
        }
        if ( item.art_codi.trim() == '001307' ){
            // Añadir el quarter al canal
            canal.quarter.derreres.push(quarter);
            const pesArtQuarter = data.map((item) => {
                if (item.art_codi.trim() == '001307') {
                    return item.peso_art;
                }
            }).filter((value) => value !== undefined); // Filter out undefined values
            const sumArtQuarter = pesArtQuarter.reduce((total, item) => total + item, 0)
            quarter.peso_art = sumArtQuarter;
        }

        // treu els elemnets repetits del array de derreres i davants
        canal.quarter.davants = [...new Map(canal.quarter.davants.map(item => [item['lot_codigo'], item])).values()];
        canal.quarter.derreres = [...new Map(canal.quarter.derreres.map(item => [item['lot_codigo'], item])).values()];
    }
    // Paso 3: Organizar despieces por lote en cada quarter segun el lote del quarter i el lote del despiece
    for (let item of data) {
        // Buscar el canal
        const canal = canals.find(canal => canal.dib_id == item.dib_id.trim());
        let artDavant = canal.quarter.davants[0]
        let artDerrere = canal.quarter.derreres[0]
        // Crear el despiece
        const despiece = {
            lot_codigo: item.lot_codigo.trim(),
            art_codi: item.art_codi.trim(),
            art_descrip: item.art_descrip.trim(),
            peso_art: item.peso_art
        };
        // carregem les dades diferents a la canal i els quartes: davants i derreres
        if (item.art_codi.trim() !== '001107' && item.art_codi.trim() !== '001307' && item.art_codi.trim() !== '001007' ) {

            if (item.lot_codigo.trim() == artDavant.lot_codigo) {
                // Añadir el despiece al quarter
                artDavant.despiece.push(despiece);
            }
            if (item.lot_codigo.trim() == artDerrere.lot_codigo) {
                // Añadir el despiece al quarter
                artDerrere.despiece.push(despiece);
            }

        }
    }
    return canals;
}


export async function fechDespiecePerDib() {
    try {
        // make a request to the database kais
        //await connKaisEscorxa();
        await connKais();
        const result = await sql.query`
        -- Treiem les canals
        SELECT 
            LOT_CODIGO AS dib_id, 
            LOT_CODIGO AS lot_codigo, 
            ART_CODI AS art_codi, 
            HISTORICO_HU_CONTENIDOS.HUC_DESCRIPCION AS art_descrip, 
            HUC_PESO AS peso_art  
            FROM
            HISTORICO_HU 
            JOIN 
            HISTORICO_HU_CONTENIDOS ON HISTORICO_HU_CONTENIDOS.HUC_ID = HISTORICO_HU.HUC_ID
        WHERE LOT_CODIGO = 'CZ830760081' AND HISTORICO_HU.HUC_SSCC LIKE '2%'
        
        UNION ALL
        
        -- Treiem els quarts
        SELECT 
            dib_id,
            lot_codigo,
            ApmSSCC.art_codi,
            ARTICLES.art_descrip,
            ApmSSCC.huc_peso_neto AS peso_art
        FROM 
            ApmSSCC 
        JOIN 
            ApmSSCC_Despiece 
        ON 
            ApmSSCC_Despiece.aps_id = ApmSSCC.aps_id
        join 
            ARTICLES
        ON
            ARTICLES.art_codi = ApmSSCC.art_codi
        WHERE 
            ApmSSCC.dib_id = 'CZ830760081'
        GROUP BY 
            dib_id, ApmSSCC.art_codi, ApmSSCC.huc_peso_neto, lot_codigo, ApmSSCC.huc_sscc, ARTICLES.art_descrip
        
        UNION ALL
        --Treiem les peçes que passen per l'etiquetatge automatic
        SELECT dib_id, procap.lot_codigo, procap.art_codi, ARTICLES.art_descrip, procap.ofc_cantidad as peso_art FROM ApmSSCC AS APM 
            INNER JOIN ApmSSCC_Despiece AS APMD ON APM.aps_id = APMD.aps_id 
            RIGHT JOIN prordfab_capturas_34 as procap ON APMD.huc_id = procap.huc_id
            inner join ARTICLES on ARTICLES.art_codi = procap.art_codi
        WHERE APM.dib_id = 'CZ830760081' --and procap.lot_codigo = '2024011074' --'2024011275'
        order by peso_art desc; 
        `;

        const dataArticlesFormat = formatArticles(result.recordset);
        const data = dataArticlesFormat;
        console.log(data);

        sql.close();
        return data;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ 'error': 'An error occurred.' }, { status: 500 });
    }
}


export async function createEscandall(dataEscandall) {

    try {

        // Aixó funciona: await createAnimal(dataEscandall);
        const animalId = await createAnimal(dataEscandall);
        const articleAnimalId = await createMainArticleByAnimal(animalId, dataEscandall);
        const articleQuarter = await createArticleQuarter(dataEscandall, articleAnimalId, animalId);
        // insertem els articles dels quarts
        const article = await createArticle(dataEscandall, articleQuarter, animalId);
        // cridem a la funció article
        article;

        // Promise.all(promises);
        return { message: 'Escandall Created' };
    } catch (error) {
        return { message: 'Database Error: Failed to Create Escandall' };
    }
}


const createAnimal = async (item) => {

    try {
        const newAnimal = await prisma.animal.create({

            data: {
                dib: item.dib_id,
                race: "",
                classificationId: 1,
                age: 10,
                sexe: item.lpa_sexe,
            },
            select: {
                id: true,
            }
        });
        console.log(newAnimal)
        //await createMainArticleByAnimal(newAnimal, item);
        return newAnimal;
    }
    catch (error) {
        return { message: 'Database Error: Failed to Create Animal' };
    }
}


const createMainArticleByAnimal = async (newAnimal, item) => {
    console.log(newAnimal, item)
    try {
        const animalArticle = await prisma.article.create({
            data: {
                name: item.despiece[0].art_descrip,
                lot: "", // articles[article]['Lot'] as string ?? "",
                description: '',
                price: 0,
                image: '',
                weightKg: item.despiece[0].peso_art,
                classification: { connect: { id: 1 } },// formData['classification'] as number } },
                units: 2,
                unitsConsum: 2,
                animal: { connect: newAnimal },
                art_codi: 1,
            },
            select: {
                id: true,
            }
        });
        console.log(animalArticle)
        return animalArticle

    } catch (error) {
        return { message: 'Database Error: Failed to Create Article' };
    }
}


const createArticleQuarter = async (articles, parentArticle, animalId) => {

    try {

        const dataArticlesDavant = articles.despiece[0].quarter.davants.map((article) => ({
            name: article.art_descrip.trim(),
            lot: article.lot_codigo,
            description: "",
            price: 0,
            image: "",
            weightKg: article.peso_art,
            classification: { connect: { id: 1 } },
            units: 1,
            unitsConsum: 1,
            animal: { connect: animalId },
            parent: { connect: parentArticle },
            art_codi: 1,
        }));

        const dataArticlesDerrere = articles.despiece[0].quarter.derreres.map((article) => ({
            name: article.art_descrip.trim(),
            lot: article.lot_codigo,
            description: "",
            price: 0,
            image: "",
            weightKg: article.peso_art,
            classification: { connect: { id: 1 } },
            units: 1,
            unitsConsum: 1,
            animal: { connect: animalId },
            parent: { connect: parentArticle },
            art_codi: 1,
        }));

        const newArticleDavantPromises = dataArticlesDavant.map((item) => {
            return prisma.article.create({
                data: item,
                select: {
                    id: true,
                }
            });
        });
        const newArticleDerrerePromises = dataArticlesDerrere.map((item) => {
            return prisma.article.create({
                data: item,
                select: {
                    id: true,
                }
            });
        });

        const newArticleDavant = await Promise.all(newArticleDavantPromises);
        const newArticleDerrere = await Promise.all(newArticleDerrerePromises);

        return { newArticleDavant, newArticleDerrere }
    }
    catch (error) {
        return { message: 'Database Error: Failed to Create Article' };
    }
}


const createArticle = async (articles, parentArticle, animalId) => {
    console.log(parentArticle) // { newArticleDavant: [ { id: 291 } ], newArticleDerrere: [ { id: 292 } ] }
    console.log(animalId)
    try {
        const dataArticlesDavant = articles.despiece[0].quarter.davants.map((article) => {
            return article.despiece.map((item) => ({
                name: item.art_descrip.trim(),
                lot: item.lot_codigo,
                description: "",
                price: 0,
                image: "",
                weightKg: item.peso_art,
                classification: { connect: { id: 1 } },
                units: 1,
                unitsConsum: 1,
                animal: { connect: animalId },
                parent: { connect: { id: parentArticle.newArticleDavant[0].id } },
                art_codi: 1,
            }));
        }).flat();

        const dataArticlesDerrere = articles.despiece[0].quarter.derreres.map((article) => {
            return article.despiece.map((item) => ({
                name: item.art_descrip.trim(),
                lot: item.lot_codigo,
                description: "",
                price: 0,
                image: "",
                weightKg: item.peso_art,
                classification: { connect: { id: 1 } },
                units: 1,
                unitsConsum: 1,
                animal: { connect: animalId },
                parent: { connect: {id: parentArticle.newArticleDerrere[0].id }},
                art_codi: 1,
            }));
        }).flat();

        dataArticlesDavant.forEach(async (art) => {
            console.log(art);
            await prisma.article.create({
                data: art,
                select: {
                    id: true,
                }
            });
        });
        dataArticlesDerrere.forEach(async (art) => {
            console.log(art);
            await prisma.article.create({
                data: art,
                select: {
                    id: true,
                }
            });
        });

    }
    catch (error) {
        return { message: 'Database Error: Failed to Create Article' };
    }
}