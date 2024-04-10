import React, { useState } from "react";

import ArticleUnitWeightRange from "@/lib/filterActions/ArticleUnitWeightRange";

export default function SelectedArticlesList({ selectedArticles, onData }) {

    //const [selectedArticlesParmas, setselectedArticlesParams] = useState({});

    const handleCanalByArticle = async () => {    
        console.log(selectedArticles);
        const resArtsParent = await ArticleUnitWeightRange();
        console.log(resArtsParent)
        // Cuando quieras enviar datos de vuelta al padre
        onData(resArtsParent);
        
    }

    return (
        <div className="w-1/6 justify-center bg-gray-200 p-4 h-screen">
            <h2>Comanda:</h2>
            <ul>
                {Object.values(selectedArticles).filter(Boolean).map((art) => (
                    <li key={art.id}>{art.name}
                        <input type="number" placeholder="pes" />
                        <input type="number" placeholder="unitats" />
                    </li>
                ))}
            </ul>
            
            <button onClick={handleCanalByArticle}> Calcula </button>
        </div>
    )
}