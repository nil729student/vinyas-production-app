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

    canals[0].peso_art = pesArtCanal;


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
            // Añadir el quarter al canal
            canal.quarter.davants.push(quarter);
        }
        if ( item.art_codi.trim() == '001307' ){
            // Añadir el quarter al canal
            canal.quarter.derreres.push(quarter);
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

        /*

                canal: [{
                    lot_codigo: '20240130',
                    art_descrip: 'CANAL',
                    peso_art: 0
                    quarter: [{
                        davant : [{
                            lot_codigo: '20240130',
                            art_descrip: 'peça 1',
                            peso_art: 0
                            despice: [{
                                lot_codigo: '20240130',
                                art_descrip: 'peça 1',
                                peso_art: 0
                            }]
                        }],
                        darrera: [{
                            lot_codigo: '20240130',
                            art_descrip: 'peça 1',
                            peso_art: 0
                            despice: [{
                                lot_codigo: '20240130',
                                art_descrip: 'peça 1',
                                peso_art: 0
                            }]
                        }],
                    }]
                }],
+               canal: [{ 
+                   lot_codigo: '20240130',
                    art_descrip: 'CANAL',
                    peso_art: 0
                    quarter: [{
                        davant[{
                            lot_codigo: '20240130',
                            art_descrip: 'peça 1',
                            peso_art: 0
                            despice: [{
                                lot_codigo: '20240130',
                                art_descrip: 'peça 1',
                                peso_art: 0
                            }]
                        }],
                        darrera: [{
                            lot_codigo: '20240130',
                            art_descrip: 'peça 1',
                            peso_art: 0
                            despice: [{
                                lot_codigo: '20240130',
                                art_descrip: 'peça 1',
                                peso_art: 0
                            }]
                        }],
                    }]
               }],
            },
        */
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
        await createArticles(dataEscandall, articleAnimalId, animalId);

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
        //await createMainArticleByAnimal(newAnimal, item);
        return newAnimal;
    }
    catch (error) {
        return { message: 'Database Error: Failed to Create Animal' };
    }
}

const createMainArticleByAnimal = async (newAnimal, item) => {

    try {
        const animalArticle = await prisma.article.create({
            data: {
                name: item.name,
                lot: "", // articles[article]['Lot'] as string ?? "",
                description: '',
                price: 0,
                image: '',
                weightKg: item.lpa_pes,
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
        return animalArticle


    } catch (error) {
        return { message: 'Database Error: Failed to Create Article' };
    }
}


const createArticles = async (articles, parentArticle, animalId) => {

    try {
        // function createMainArticle(item);
        // function createDerivedArticles(item);
        /*const data = item.despiece.map((item) => ({
            name: item.art_descrip.trim(),
            lot: "20240130",
            description: "",     
            price: 0,
            image: "",
            weightKg: 4.00,
            classification: { connect: { id: 1 }},
            units: 1,
            unitsConsum: 1,       
            animal: { connect: 31 },
            art_codi: 1,
        }));
        */

        const dataArticles = articles.despiece.map((article) => ({
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
        //console.log(dataArticles);

        dataArticles.forEach(async (item) => {
            await prisma.article.create({
                data: item,
            });
        });
    }
    catch (error) {
        return { message: 'Database Error: Failed to Create Article' };
    }
}

/*
escandalls 

aponeurosi  s'ha de agafar amb el (PAD) si no s'ha de agafar la aponeurosi del (PAD)

Atributs compostos:
- APONEBROSI esta compost per: PAD
*/