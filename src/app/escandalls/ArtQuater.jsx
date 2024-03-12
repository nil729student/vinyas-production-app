import React, {useState} from "react";
import ArtList from "./ArtList";

const ArtQuarter = (quarts) => {
    const [showArticles, setShowArticles] = useState(false);
    console.log(quarts.quart.children);
    return (
        <div>
            <h3>Article fill del para (QUATER)</h3>
            <ul>
                <li>Article: <b>{quarts.quart.name}</b></li>
                <li>Codi: <b>{quarts.quart.art_codi}</b></li>
                <li>Lot: <b>{quarts.quart.lot}</b></li>
                <li>Preu: <b>{quarts.quart.price}</b></li>
                <li>Pes: <b>{quarts.quart.weightKg} kg</b></li>
            </ul>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowArticles(!showArticles)}
            >
                {showArticles ? 'Mostrar oculta' : 'Mostrar articles'}
            </button>
            { showArticles &&
                
            <ArtList article={quarts.quart.children} />
            }


        </div>
    );
}

export default ArtQuarter;