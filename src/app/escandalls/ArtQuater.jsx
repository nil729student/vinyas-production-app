import React, { useState, useEffect } from "react";
import ArtList from "./ArtList";

const ArtQuarter = (quarts) => {
    const [showArticles, setShowArticles] = useState(false);
    const { quart } = quarts;
    const pesQuart = quart.weightKg;

    const sumaArts = quart.children.reduce((acc, art) => acc + art.weightKg, 0);

    const percentatgeCalulArts = quart.children.map((art) => {
        const percent = (art.weightKg * 100) / pesQuart;
        return { ...art, percent };
    });

    const sumaPercentatge = percentatgeCalulArts.reduce((acc, art) => acc + art.percent, 0);

    return (
        <div className=" mx-auto mb-6 rounded-lg overflow-hidden border border-gray-200">
            <div className="p-4 bg-gray-100">
                <h3 className="text-xl font-semibold mb-2">{quart.name}</h3>
                <ul className="space-y-2">
                    <li><span className="font-semibold">Article:</span> <span>{quart.name}</span></li>
                    <li><span className="font-semibold">Codi:</span> <span>{quart.art_codi}</span></li>
                    <li><span className="font-semibold">Lot:</span> <span>{quart.lot}</span></li>
                    <li><span className="font-semibold">Preu:</span> <span>{quart.price}</span></li>
                    <li><span className="font-semibold">Pes:</span> <span>{quart.weightKg} kg</span></li>
                    <li><span className="font-semibold">Total Articles:</span> <span>{sumaArts} kg</span></li>
                    <li><span className="font-semibold">Percentatge:</span> <span>{sumaPercentatge}%</span></li>
                </ul>
                <button
                    className="mt-4 bg-color-button hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setShowArticles(!showArticles)}
                >
                    {showArticles ? 'Ocultar articles' : 'Mostrar articles'}
                </button>
            </div>
            {showArticles &&
                <ArtList article={percentatgeCalulArts} quarter={quart} />
            }
        </div>
    );
}

export default ArtQuarter;
