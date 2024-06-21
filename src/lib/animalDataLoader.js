// Fech de dades de la API
"use server";
// Retorna les peçes resultatnts de una un animal (dib_id) -> quarter (art_codi) -> despiece (art_codi)
import { NextResponse } from "next/server";
import { connKais, connKaisEscorxa } from "@/lib/connDBKais.js"; // Make sure to import dbConn with the correct name
import sql from 'mssql';
import prisma from "./prisma";
import { createMainArticleByForm, createDerivedArticles } from "./actions";


export async function animalRelationWeight() {

    try {
        await connKaisEscorxa();
        const animal = await sql.query`
        SELECT         
                    lpapesos.par_any,
                    lpapesos.par_semana,
                    lpapesos.par_npartida,
                            lpaPesos.dib_id,
                            lpaPesos.INCI_CODI,
                    Isnull((SELECT cp.ccl_descripcion
                            FROM   cuclasificaciones cl
                                    INNER JOIN cuconceptos cp
                                            ON cp.tcl_ambito = cl.tcl_ambito
                                                AND cp.tcl_id = cl.tcl_id
                                                AND cp.ccl_id = cl.ccl_id
                            WHERE  cl.tcl_ambito = 2
                                    AND cl.tcl_id = 1
                                    AND cl.ccl_id <> '00000'
                                    AND cl.cls_clave = Concat(lpapesos.par_any,
                                                        lpapesos.par_semana,
                                                        lpapesos.par_npartida)), '') AS
                    certi1,
                    Isnull((SELECT cp.ccl_descripcion
                            FROM   cuclasificaciones cl
                                    INNER JOIN cuconceptos cp
                                            ON cp.tcl_ambito = cl.tcl_ambito
                                                AND cp.tcl_id = cl.tcl_id
                                                AND cp.ccl_id = cl.ccl_id
                            WHERE  cl.tcl_ambito = 2
                                    AND cl.tcl_id = 2
                                    AND cl.ccl_id <> '00000'
                                    AND cl.cls_clave =
                                        Concat(lpapesos.par_any, lpapesos.par_semana,
                                        lpapesos.par_npartida)), '') AS certi2,
                    CASE WHEN lpapesos.lpa_campo4 = 'H' THEN 'H' ELSE '' END AS Hallal,
                    histpesos.hip_canalintern,
                    histpesos.hip_canalgeneral,
                    histpesos.hip_canalpartida,
                    histpesos.hip_pes,
                    histpesos.hip_clasabr,
                    histpesos.hip_nomproveidor,
                    histpesos.hip_observaciones,
                    histpesos.hip_fecmatanza,
                    histpesos.hip_feclistado,
                    histpesos.hip_edat,
                    histpesos.hip_fecnac,
                    histpesos.gan_ganado,
                        HISTPESOS.hip_observaciones,
                        case when (select top 1 c.cep_valor from CERTI_LDIBS c where lpapesos.dib_id=c.dib_id and ctd_certificacion='WELFARE')=1 then 'W' else '' end as Welfare,
                        case when (select top 1 c.cep_valor from CERTI_PARTIDAS c where lpapesos.par_any=c.par_any and lpapesos.par_semana=c.par_semana and lpapesos.par_npartida=c.par_npartida and ctd_certificacion='CANADÀ')=1 then 'CA' else '' end as Canada,
                        case when (select top 1 c.cep_valor from CERTI_PARTIDAS c where lpapesos.par_any=c.par_any and lpapesos.par_semana=c.par_semana and lpapesos.par_npartida=c.par_npartida and ctd_certificacion='CERTIFICADA')=1 then 'CE' else '' end as Certificada,
                        case when (select top 1 c.cep_valor from CERTI_PARTIDAS c where lpapesos.par_any=c.par_any and lpapesos.par_semana=c.par_semana and lpapesos.par_npartida=c.par_npartida and ctd_certificacion='VED. NOSTRA - NESTLÉ')=1 then 'VN' else '' end as VNostra,
                        case when (select top 1 c.cep_valor from CERTI_PARTIDAS c where lpapesos.par_any=c.par_any and lpapesos.par_semana=c.par_semana and lpapesos.par_npartida=c.par_npartida and ctd_certificacion='NESTLÉ')=1 then 'NE' else '' end as Nestle,
                        case when (select top 1 c.cep_valor from CERTI_PARTIDAS c where lpapesos.par_any=c.par_any and lpapesos.par_semana=c.par_semana and lpapesos.par_npartida=c.par_npartida and ctd_certificacion='FPS HEINZ')=1 then 'M2' else '' end as M2,
                        case when (select top 1 c.cep_valor from CERTI_PARTIDAS c where lpapesos.par_any=c.par_any and lpapesos.par_semana=c.par_semana and lpapesos.par_npartida=c.par_npartida and ctd_certificacion='JAPÓ')=1 then 'JA' else '' end as Japo,
                        case when (select top 1 c.cep_valor from CERTI_LDIBS c where lpapesos.dib_id=c.dib_id and ctd_certificacion='ANGUS')=1 then 'AN' else '' end as Angus,
                        case when (select top 1 c.cep_valor from CERTI_LDIBS c where lpapesos.dib_id=c.dib_id and ctd_certificacion='ECO')=1 then 'EC' else '' end as Eco,
                        --case when (select top 1 c.cep_valor from CERTI_LDIBS c where lpapesos.dib_id=c.dib_id and ctd_certificacion=''S3-S7-S9'')=1 then ''S3S7S9'' else '''' end as S3S7S9,
                        case when (select top 1 c.cep_valor from CERTI_LDIBS c where lpapesos.dib_id=c.dib_id and ctd_certificacion='S3-S7-S9')=1 and LEFT(lpapesos.dib_id,2)<>'FR' then 'S3S7S9' 
                                    when (select top 1 c.cep_valor from CERTI_LDIBS c where lpapesos.dib_id=c.dib_id and ctd_certificacion='S3-S7-S9')=1 and LEFT(lpapesos.dib_id,2)='FR' then 'S7' 
                                    else '' end as S3S7S9,
                        case when (select top 1 c.cep_valor from CERTI_LDIBS c where lpapesos.dib_id=c.dib_id and ctd_certificacion='S5')=1 then 'S5' else '' end as S5,
                        case when (select top 1 c.cep_valor from CERTI_LDIBS c where lpapesos.dib_id=c.dib_id and ctd_certificacion='S8')=1 then 'S8' else '' end as S8,
                        LPAPESOS.LPA_OBSERVA,
                        clasificacion.cla_testdecomi
        FROM   histpesos
            LEFT JOIN lpapesos
                    ON lpa_fechamatanza = hip_fecmatanza
                        AND lpa_canalintern = hip_canalintern
            left join clasificacion on clasificacion.cla_cm=lpapesos.lpa_qualitat
        WHERE  histpesos.hip_fecmatanza = '2024-06-18'
            AND histpesos.gan_ganado = '001'
        ORDER  BY histpesos.hip_canalintern, histpesos.hip_canalgeneral`;

        const data = animal.recordset;
        sql.close();
        return data;

    } catch (error) {
        return {error: error.message};
    }

}



export async function fechAnimalByDib(dib_id) {
    try {
        await connKaisEscorxa();
        const animal = await sql.query`
            SELECT
                SUBSTRING(dib_id, 1, 12) as dib_id,
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

    // Pas 1: Crear les canals
    for (let item of data.slice(0, 1)) {
        //console.log("canal: ", item)
        //if (item.art_codi.trim() == '001007') { // 001007          001027

        // Crear canal
        const canal = {
            dib_id: item.dib_id.trim(),
            lot_codigo: item.lot_codigo.trim(),
            art_codi: item.art_codi.trim(),
            art_descrip: item.art_descrip.trim(),
            peso_art: [],
            quarter: {
                derreres: [],
                davants: []
            }
        };
        // enviali al array canals
        canals.push(canal);
        //break;
        //}
    }

    const pesArtCanal = data.slice(0, 2).map((item) => {
        //if (item.art_codi.trim() == '001007') {
        //console.log(item.peso_art);
        return item.peso_art;
        //}
    }).filter((value) => value !== undefined); // Filter out undefined values

    const sumArtCanal = pesArtCanal.reduce((total, item) => total + item, 0)

    canals[0].peso_art = parseFloat(sumArtCanal.toFixed(2));




    // Pas 2: Organiza els quarts per canal
    for (let item of data.slice(2, 6)) {
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
        // Filtrem les peçes per derreres
        if (item.art_codi.trim() == data.slice(2, 3)[0].art_codi.trim()) {
            // Añadir el quarter al canal amb la suma total del pes de les peçes 
            // suma el pes de les peçes
            const pesArtQuarterDerrere = data.slice(2, 4).map((item) => {
                canal.quarter.derreres.push(quarter);
                return item.peso_art;
            }).filter((value) => value !== undefined); // Filter out undefined values
            // suma el pesArtQuarter
            const sumArtQuarterDerrere = pesArtQuarterDerrere.reduce((total, item) => total + item, 0)
            quarter.peso_art = parseFloat(sumArtQuarterDerrere.toFixed(2))
        }

        // Filtrem les peçes per davants
        if (item.art_codi.trim() == data.slice(4, 5)[0].art_codi.trim()) { // 001107 es el codi de la peça del davant
            // Afagim el quarter al canal
            const pesArtQuarterDavant = data.slice(4, 6).map((item) => {
                canal.quarter.davants.push(quarter);
                //if (item.art_codi.trim() == '001107') {
                return item.peso_art;
                //}
            }).filter((value) => value !== undefined); // Filter out undefined values
            const sumArtQuarterDavant = pesArtQuarterDavant.reduce((total, item) => total + item, 0)

            quarter.peso_art = parseFloat(sumArtQuarterDavant.toFixed(2));
        }

        // treu els elemnets repetits del array de  i davants
        canal.quarter.davants = [...new Map(canal.quarter.davants.map(item => [item['lot_codigo'], item])).values()]
        canal.quarter.derreres = [...new Map(canal.quarter.derreres.map(item => [item['lot_codigo'], item])).values()];

    }
    // Paso 3: Organizar despieces por lote en cada quarter segun el lote del quarter i el lote del despiece
    for (let item of data) {
        // Buscar la canal
        const canal = canals.find(canal => canal.dib_id == item.dib_id.trim());
        let artDavant = canal.quarter.davants[0]
        console.log(artDavant);
        let artDerrere = canal.quarter.derreres[0]
        // Crear el despiece
        const despiece = {
            lot_codigo: item.lot_codigo.trim(),
            art_codi: item.art_codi.trim(),
            art_descrip: item.art_descrip.trim(),
            peso_art: item.peso_art
        };
        // carregem les dades diferents a la canal i els quartes: davants i derreres
        if (item.art_codi.trim() !== data.slice(4, 6) && item.art_codi.trim() !== data.slice(2, 4) && item.art_codi.trim() !== data.slice(0, 1)) {

            if (item.lot_codigo.trim() == artDavant.lot_codigo && despiece.art_codi !== artDavant.art_codi) {

                // Afeguim el despiece 
                artDavant.despiece.push(despiece);
            }
            if (item.lot_codigo.trim() == artDerrere.lot_codigo && despiece.art_codi !== artDerrere.art_codi) {
                // Afeguim el despiece al quarter
                artDerrere.despiece.push(despiece);

            }

        }
    }

    return canals;
}


export async function fechDespiecePerDib(dib_id) {
    try {
        // make a request to the database kais
        //await connKaisEscorxa();
        //const dib_id = 'FR3538980279'; //CZ830760081
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
        WHERE LOT_CODIGO = ${dib_id} AND HISTORICO_HU.HUC_SSCC LIKE '2%'
        
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
            ApmSSCC.dib_id = ${dib_id}
        GROUP BY 
            dib_id, ApmSSCC.art_codi, ApmSSCC.huc_peso_neto, lot_codigo, ApmSSCC.huc_sscc, ARTICLES.art_descrip
        
        UNION ALL
        --Treiem les peçes que passen per l'etiquetatge automatic
        SELECT dib_id, procap.lot_codigo, procap.art_codi, ARTICLES.art_descrip, procap.ofc_cantidad as peso_art FROM ApmSSCC AS APM 
            INNER JOIN ApmSSCC_Despiece AS APMD ON APM.aps_id = APMD.aps_id 
            RIGHT JOIN prordfab_capturas_34 as procap ON APMD.huc_id = procap.huc_id
            inner join ARTICLES on ARTICLES.art_codi = procap.art_codi
        WHERE APM.dib_id = ${dib_id} --and procap.lot_codigo = '2024011074' --'2024011275'

        UNION ALL

		SELECT dib_id, procap.lot_codigo, procap.art_codi, ARTICLES.art_descrip, procap.ofc_cantidad as peso_art FROM ApmSSCC AS APM 
            INNER JOIN ApmSSCC_Despiece AS APMD ON APM.aps_id = APMD.aps_id 
            RIGHT JOIN prordfab_capturas_historico_34 as procap ON APMD.huc_id = procap.huc_id
            inner join ARTICLES on ARTICLES.art_codi = procap.art_codi
        WHERE APM.dib_id = ${dib_id} --and procap.lot_codigo = '2024011074' --'2024011275'
        order by peso_art desc;
        `;

        const dataArticlesFormat = formatArticles(result.recordset);
        const data = dataArticlesFormat;

        sql.close();
        return data;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ 'error': 'An error occurred.' }, { status: 500 });
    }
}


export async function createEscandall(dataEscandall) {

    try {
        // Insertem l'animal
        const animalId = await createAnimal(dataEscandall);
        // insertem l'article principal la canal
        const articleAnimalId = await createMainArticleByAnimal(animalId, dataEscandall);
        // inerterem els articles dels quarts
        const articleQuarter = await createArticleQuarter(dataEscandall, articleAnimalId, animalId);
        // insertem els articles dels quarts
        const article = await createManyArticles(dataEscandall, articleQuarter, animalId);
        article;

        return { message: 'Escandall Created' };
    } catch (error) {
        return { message: 'Database Error: Failed to Create Escandall' };
    }
}


const createAnimal = async (item) => {

    try {
        console.log(item);
        const newAnimal = await prisma.animal.create({
            data: {
                dib: item.dib_id,
                race: "",
                classificationId: 1,
                age: 10,
                sexe: item.lpa_sexe,
                animaWeightKg: item.lpa_pes,
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
                art_codi: item.despiece[0].art_codi,
            },
            select: {
                id: true,
            }
        });
        console.log(animalArticle)
        return animalArticle

    } catch (error) {
        return { message: 'Database Error: Failed to Create MainArticleByAnimal' };
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
            art_codi: article.art_codi,
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
            art_codi: article.art_codi,
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
        return { message: 'Database Error: Failed to Create Quarters' };
    }
}


const createManyArticles = async (articles, parentArticle, animalId) => {
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
                art_codi: item.art_codi,
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
                parent: { connect: { id: parentArticle.newArticleDerrere[0].id } },
                art_codi: item.art_codi,
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