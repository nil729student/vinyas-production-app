import React from "react";

const ArtList = (article) => {

    return (
        <div>
            <h3>Article fill del para (ARTICLE)</h3>
            {
                article.article.map((art) => (
                    <ul key={art.id}>
                        <li>Article: <b>{art.name}</b></li>
                        <li>Codi: <b>{art.art_codi}</b></li>
                        <li>Lot: <b>{art.lot}</b></li>
                        <li>Preu: <b>{art.price}</b></li>
                        <li>Pes: <b>{art.weightKg} kg</b></li>
                        <li> Persentatge <b>{art.percent}</b>  %</li>
                    </ul>
                ))
            }
        </div>

    );
}

export default ArtList;