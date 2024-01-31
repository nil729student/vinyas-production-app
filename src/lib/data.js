// Fech de dades de la API
"use server";
// Retorna les peçes resultatnts de una un animal (dib_id) -> quarter (art_codi) -> despiece (art_codi)
import { NextResponse } from "next/server";
import { connKais, connKaisEscorxa } from "@/lib/connDBKais.js"; // Make sure to import dbConn with the correct name
import sql from 'mssql';
import prisma from "./prisma";
import { createMainArticleByForm, createDerivedArticles } from "./actions";
import { data } from "autoprefixer";


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

export async function fechQuarterByDib(dib_id) {

}

export async function fechDespiecePerDib() {
    try {
        // make a request to the database kais
        //await connKaisEscorxa();
        await connKais();
        const result = await sql.query`
            SELECT HUC_LOTE AS dib_id, HUC_LOTE as lot_codigo, '' as art_codi, HUC_DESCRIPCION AS art_descrip, HUC_PESO_NETO as peso_art from HISTORICO_HU where HuC_LOTE='CZ830760081'
            UNION ALL
            SELECT dib_id, procap.lot_codigo, procap.art_codi, ARTICLES.art_descrip, procap.ofc_cantidad as peso_art FROM ApmSSCC AS APM 
                INNER JOIN ApmSSCC_Despiece AS APMD ON APM.aps_id = APMD.aps_id 
                RIGHT JOIN prordfab_capturas_34 as procap ON APMD.huc_id = procap.huc_id
                inner join ARTICLES on ARTICLES.art_codi = procap.art_codi
            WHERE APM.dib_id = 'CZ830760081' --and procap.lot_codigo = '2024011074' --'2024011275'
            order by art_descrip asc;
        `;

        /*

                canal: [{
                    lot_codigo: '20240130',
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
+               }],
            },
        */

        const data = result.recordset;
        sql.close();
        return data;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ 'error': 'An error occurred.' }, { status: 500 });
    }
}


export async function createEscandall(dataEscandall) {

    try {

        console.log(dataEscandall);

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
    console.log(item, item.lot_codigo, item.art_descrip);
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
                name: "CANAL",
                lot:  "", // articles[article]['Lot'] as string ?? "",
                description: '',
                price: 0,
                image: '',
                weightKg: item.lpa_pes,
                classification: { connect: { id: 1 }},// formData['classification'] as number } },
                units: 2,
                unitsConsum: 2,
                animal: { connect: newAnimal },
                art_codi: 1,
            },
            select: {
                id: true,
            }
        });
        console.log(animalArticle);
        return animalArticle


    }catch (error) {
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

        console.log(articles, parentArticle, animalId);

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
            animal: { connect: animalId},
            parent: {connect: parentArticle},
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