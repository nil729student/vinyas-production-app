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

        const data = animal.recordset;
        sql.close();
        return data;
    }
    catch (error) {
        console.error(error);
        return error;
    }
}


export async function fechDespiecePerDib() {
    try {
        // make a request to the database kais
        //await connKaisEscorxa();
        await connKais();
        const result = await sql.query`
            SELECT dib_id, procap.lot_codigo, huc_peso_neto as peso_cuartero, procap.art_codi, ARTICLES.art_descrip, procap.ofc_cantidad as peso_art FROM ApmSSCC AS APM 
                INNER JOIN ApmSSCC_Despiece AS APMD ON APM.aps_id = APMD.aps_id 
                RIGHT JOIN prordfab_capturas_34 as procap ON APMD.huc_id = procap.huc_id
                inner join ARTICLES on ARTICLES.art_codi = procap.art_codi
            WHERE APM.dib_id = 'CZ830760081' --and procap.lot_codigo = '2024011074' --'2024011275'
            order by procap.art_codi asc;
        `;

        /*
         SELECT
        aprodmas.apm_numeroserie AS lot, 
        APM.apm_id as id, -- id del ordre de fabricació (quan ha llegit la yoya)
        APM.art_codi AS art_quarter,
        APM.huc_sscc AS sscc_quarter,
        APMD.art_codi AS art_despiece,
        APMD.huc_sscc AS sscc_despiece,
        HU_CONTENIDOS.ART_CODI AS art_stock,
        HU_CABECERA.HUC_PESO_NETO AS Art_peso,
        PACKING_HU_CONTENIDOS.ART_CODI AS art_venta,
        PACKING_HU.HUC_PESO_NETO
    FROM ApmSSCC AS APM
        INNER JOIN ApmSSCC_Despiece AS APMD 
        ON APM.aps_id = APMD.aps_id

        INNER JOIN aprodmas 
        ON APM.apm_id = aprodmas.apm_id

        INNER JOIN HISTORICO_HU 
        ON HISTORICO_HU.HUC_SSCC = APM.huc_sscc

        INNER JOIN HISTORICO_HU_CONTENIDOS 
        ON HISTORICO_HU_CONTENIDOS.HUC_ID = HISTORICO_HU.HUC_ID

        INNER JOIN HU_CABECERA 
        ON APMD.huc_sscc = HU_CABECERA.HUC_SSCC

        INNER JOIN HU_CONTENIDOS 
        ON HU_CABECERA.huc_id = HU_CONTENIDOS.HUC_ID

        LEFT JOIN PACKING_HU 
        ON APMD.huc_sscc = PACKING_HU.huc_SSCC

        LEFT JOIN PACKING_HU_CONTENIDOS 
        ON PACKING_HU.PKLL_ID = PACKING_HU_CONTENIDOS.PKLL_ID

    WHERE APM.dib_id = 'FR3222629662'
    AND (HU_CONTENIDOS.ART_CODI IS NOT NULL OR PACKING_HU_CONTENIDOS.ART_CODI IS NOT NULL)  AND (HU_CABECERA.HUC_PESO_NETO<>'0')
    ORDER BY art_quarter;

    -----------------------------------------------------------------------------------

        const result = await sql.query`
        SELECT 
            aprodmas.apm_numeroserie AS lot,
            APM.art_codi AS art_quarter,
            APM.huc_sscc AS sscc_quarter,
            APMD.art_codi AS art_despiece,
            APMD.huc_sscc AS sscc_despiece,
            HU_CONTENIDOS.ART_CODI AS art_stock,
            HU_CABECERA.HUC_PESO_NETO AS Art_peso,
            PACKING_HU_CONTENIDOS.ART_CODI AS art_venta,
            PACKING_HU.HUC_PESO_NETO
        FROM ApmSSCC AS APM
            INNER JOIN ApmSSCC_Despiece AS APMD 
            ON APM.aps_id = APMD.aps_id

            INNER JOIN aprodmas 
            ON APM.apm_id = aprodmas.apm_id

            INNER JOIN HISTORICO_HU 
            ON HISTORICO_HU.HUC_SSCC = APM.huc_sscc

            INNER JOIN HISTORICO_HU_CONTENIDOS 
            ON HISTORICO_HU_CONTENIDOS.HUC_ID = HISTORICO_HU.HUC_ID

            INNER JOIN HU_CABECERA 
            ON APMD.huc_sscc = HU_CABECERA.HUC_SSCC

            INNER JOIN HU_CONTENIDOS 
            ON HU_CABECERA.huc_id = HU_CONTENIDOS.HUC_ID

            LEFT JOIN PACKING_HU 
            ON APMD.huc_sscc = PACKING_HU.huc_SSCC

            LEFT JOIN PACKING_HU_CONTENIDOS 
            ON PACKING_HU.PKLL_ID = PACKING_HU_CONTENIDOS.PKLL_ID

        WHERE APM.dib_id = 'CZ677862072'
        AND (HU_CONTENIDOS.ART_CODI IS NOT NULL OR PACKING_HU_CONTENIDOS.ART_CODI IS NOT NULL) -- AND (HU_CABECERA.HUC_PESO_NETO<>'0')
        ORDER BY art_quarter;
        `;
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
        await createMainArticleByAnimal(animalId, dataEscandall);
        await createArticles(dataEscandall, animalId);

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
        await prisma.article.create({
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
        });




    }catch (error) {
        return { message: 'Database Error: Failed to Create Article' };
    }
}


const createArticles = async (articles, animalId) => {

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

        console.log(articles);

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