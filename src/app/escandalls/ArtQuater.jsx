import React, { useState } from "react";
import ArtList from "./ArtList";

const ArtQuarter = (quarts) => {
    const [showArticles, setShowArticles] = useState(false);

    const pesQuart = quarts.quart.weightKg;

    const sumaArts = quarts.quart.children.reduce((acc, art) => acc + art.weightKg, 0);

    const percentatgeCalulArts = quarts.quart.children.map((art) => {
        const percent = (art.weightKg * 100) / pesQuart;
        return { ...art, percent };
    });

    const sumaPercentatge = percentatgeCalulArts.reduce((acc, art) => acc + art.percent, 0);

    return (
        <div>
            <div className="bg-slate-400">
                <h3>Article fill del para (QUATER)</h3>
                <ul>
                    <li>Article: <b>{quarts.quart.name}</b></li>
                    <li>Codi: <b>{quarts.quart.art_codi}</b></li>
                    <li>Lot: <b>{quarts.quart.lot}</b></li>
                    <li>Preu: <b>{quarts.quart.price}</b></li>
                    <li>Pes: <b>{quarts.quart.weightKg} kg</b></li>
                    <li>Total Articles: <b>{sumaArts}</b></li>
                    <li> Persentatge <b>{sumaPercentatge}</b>  %</li>


                </ul>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setShowArticles(!showArticles)}
                >
                    {showArticles ? 'Mostrar oculta' : 'Mostrar articles'}
                </button>
            </div>



            {showArticles &&

                <ArtList article={percentatgeCalulArts} />
            }


        </div>
    );
}

export default ArtQuarter;