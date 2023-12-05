// Fech de dades de la API

// Retorna les peçes resultatnts de una un animal (dib_id) -> quarter (art_codi) -> despiece (art_codi)
import { NextResponse } from "next/server";
import { connKais } from "@/lib/connDBKais.js"; // Make sure to import dbConn with the correct name
import sql from 'mssql';

export async function fechDespiecePerDib() {
    try {
        // make a request to the database kais
        await connKais();
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
        const data = result.recordset;
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ 'error': 'An error occurred.' }, { status: 500 });
    }
}


/*


escandalls 

aponeurosi  s'ha de agafar amb el (PAD) si no s'ha de agafar la aponeurosi del (PAD)

Atributs compostos:
- APONEBROSI esta compost per: PAD


*/