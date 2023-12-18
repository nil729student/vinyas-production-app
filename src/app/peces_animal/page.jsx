
import { fechDespiecePerDib } from "@/lib/data";

export default async function Page() {
    const resultat = await fechDespiecePerDib();
    const data = resultat[0];
    // [{
    //     lot: '2023101715',
    //     art_quarter: '001327',
    //     sscc_quarter: '984338220002494529',
    //     art_despiece: '500013          ',
    //     sscc_despiece: '384338220051994351',
    //     art_stock: '500013          ',
    //     Art_peso: 0,
    //     art_venta: null,
    //     HUC_PESO_NETO: null
    //   }]

    const {

        lot,
        art_quarter,
        sscc_quarter,
        art_despiece,
        sscc_despiece,
        art_stock,
        Art_peso,
        art_venta,
        HUC_PESO_NETO

    } = data;

    return (
        <>
            <h1>Resultat</h1>
            <div>
                {JSON.stringify(lot, art_quarter,
                    sscc_quarter,
                    art_despiece,
                    sscc_despiece,
                    art_stock,
                    Art_peso,
                    art_venta,
                    HUC_PESO_NETO
                )}
            </div>
        </>
    );
}
