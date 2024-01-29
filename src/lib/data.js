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
        await Promise.all([createAnimal(dataEscandall), createArticles(dataEscandall)]);

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

        await createMainArticleByAnimal(newAnimal, item);
        //return newAnimal.id;

    }
    catch (error) {
        return { message: 'Database Error: Failed to Create Animal' };
    }
}

const createMainArticleByAnimal = async (newAnimal, item) => {
    try {
        console.log(newAnimal.id);
        await prisma.article.create({
            data: {
                name: "canals",
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
            }
        });
    }catch (error) {
        return { message: 'Database Error: Failed to Create Article' };
    }
}


const createArticles = async (item) => {

    try {
        // function createMainArticle(item);
        // function createDerivedArticles(item);
        console.log(item.despiece);
        const data = item.despiece.map((item) => ({
            art_codi: parseInt(item.art_codi),
            lot: parseInt(item.lot_codigo),
            name: item.art_descrip.trim(),
            units: 1,
            unitsConsum: 1,            price: 0,
            image: "",
            weightKg: item.peso_art,
            animalId: item.dib_id,
        }));
        await prisma.article.createMany({
            data,
        });
        return { message: 'Article Created' };
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