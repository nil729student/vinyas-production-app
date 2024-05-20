"use server"
import sql from 'mssql';
import { connKais } from '@/lib/connDBKais';

export async function fetchDespieceAuto() {
        try {
                await connKais();
                let sinceDate = new Date(2024, 4, 1); // Months are 0-based in JavaScript
                let toDate = new Date(2024, 4, 31);

                const result = await sql.query`
        DECLARE @SINCEDATE AS DATETIME;

        SET @SINCEDATE = ${sinceDate};

        DECLARE @TODATE AS DATETIME;
        SET @TODATE = ${toDate};
        
        SELECT   PECES.SSCC,
                PECES.DIB_ID,
                PECES.LOT_CODIGO,
                PECES.ART_CODI,
                PECES.ART_DESCRIP,
                PECES.PESO_ART,
                ANIMAL_ESCORXA.LPA_PES, -- Peso animal
                ANIMAL_ESCORXA.LPA_QUALITATABR,
                ANIMAL_ESCORXA.LPA_SEXE,
                ANIMAL_ESCORXA.LPA_FECHAMATANZA
        FROM     (SELECT   HISTORICO_HU.HUC_SSCC AS SSCC,
                        LOT_CODIGO AS DIB_ID,
                        LOT_CODIGO AS LOT_CODIGO,
                        ART_CODI AS ART_CODI,
                        HISTORICO_HU_CONTENIDOS.HUC_DESCRIPCION AS ART_DESCRIP,
                        HUC_PESO AS PESO_ART
                FROM     GWSV.DBO.HISTORICO_HU
                        INNER JOIN
                        GWSV.DBO.HISTORICO_HU_CONTENIDOS
                        ON GWSV.DBO.HISTORICO_HU_CONTENIDOS.HUC_ID = GWSV.DBO.HISTORICO_HU.HUC_ID
                WHERE    GWSV.DBO.HISTORICO_HU.HUC_SSCC LIKE '2%'
                UNION ALL
                SELECT   APMSSCC.HUC_SSCC,
                        DIB_ID,
                        LOT_CODIGO,
                        APMSSCC.ART_CODI,
                        ARTICLES.ART_DESCRIP,
                        APMSSCC.HUC_PESO_NETO AS PESO_ART
                FROM     GWSV.DBO.APMSSCC
                        INNER JOIN
                        GWSV.DBO.APMSSCC_DESPIECE
                        ON GWSV.DBO.APMSSCC_DESPIECE.APS_ID = GWSV.DBO.APMSSCC.APS_ID
                        INNER JOIN
                        GWSV.DBO.ARTICLES
                        ON GWSV.DBO.ARTICLES.ART_CODI = GWSV.DBO.APMSSCC.ART_CODI
                GROUP BY DIB_ID, APMSSCC.ART_CODI, APMSSCC.HUC_PESO_NETO, LOT_CODIGO, APMSSCC.HUC_SSCC, ARTICLES.ART_DESCRIP
                UNION ALL
                SELECT   APMD.HUC_SSCC,
                        DIB_ID,
                        PROCAP.LOT_CODIGO,
                        PROCAP.ART_CODI,
                        ARTICLES.ART_DESCRIP,
                        PROCAP.OFC_CANTIDAD AS PESO_ART
                FROM     GWSV.DBO.APMSSCC AS APM
                        INNER JOIN
                        GWSV.DBO.APMSSCC_DESPIECE AS APMD
                        ON APM.APS_ID = APMD.APS_ID
                        RIGHT OUTER JOIN
                        GWSV.DBO.PRORDFAB_CAPTURAS_34 AS PROCAP
                        ON APMD.HUC_ID = PROCAP.HUC_ID
                        INNER JOIN
                        GWSV.DBO.ARTICLES
                        ON ARTICLES.ART_CODI = PROCAP.ART_CODI
                UNION ALL
                SELECT   APMD.HUC_SSCC,
                        DIB_ID,
                        PROCAP.LOT_CODIGO,
                        PROCAP.ART_CODI,
                        ARTICLES.ART_DESCRIP,
                        PROCAP.OFC_CANTIDAD AS PESO_ART
                FROM     GWSV.DBO.APMSSCC AS APM
                        INNER JOIN
                        GWSV.DBO.APMSSCC_DESPIECE AS APMD
                        ON APM.APS_ID = APMD.APS_ID
                        RIGHT OUTER JOIN
                        GWSV.DBO.PRORDFAB_CAPTURAS_HISTORICO_34 AS PROCAP
                        ON APMD.HUC_ID = PROCAP.HUC_ID
                        INNER JOIN
                        GWSV.DBO.ARTICLES
                        ON ARTICLES.ART_CODI = PROCAP.ART_CODI) AS PECES
                LEFT OUTER JOIN
                (SELECT SUBSTRING(DIB_ID, 1, 12) AS DIB_ID,
                        LPA_PES,
                        LPA_QUALITATABR,
                        LPA_SEXE,
                        LPA_FECHAMATANZA
                FROM   ESCORXA_CARNISSERS.DBO.LPAPESOS) AS ANIMAL_ESCORXA
                ON PECES.DIB_ID = ANIMAL_ESCORXA.DIB_ID
        WHERE    ANIMAL_ESCORXA.LPA_FECHAMATANZA BETWEEN @SINCEdATE AND @TODATE
        ORDER BY PESO_ART DESC`

                sql.close();

                // group by ART_CODIGO
                const resultGroup = result.recordset.reduce((acc, item) => {
                        const { ART_CODI, ART_DESCRIP, PESO_ART, LPA_PES } = item;
                        if (!acc[ART_CODI]) { // mira si el ART_CODI ya existe en el objeto acc
                                acc[ART_CODI] = {
                                        ART_DESCRIP,
                                        PESO_ART,
                                        LPA_PES,
                                        count: 1
                                };
                        } else {
                                acc[ART_CODI].PESO_ART += PESO_ART;
                                acc[ART_CODI].count += 1;
                        }
                        return acc;
                }, {});

                console.log(result.recordset);

                console.log(resultGroup);

                //return result.recordset;

        } catch (error) {
                console.error(error);
                return error;
        }
}