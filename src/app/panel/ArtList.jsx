"use client";

import React, { useState } from "react";
import SelectedArticles from "./SelectedArticlesList";

export default function ArtList( { dataArticles } ) {
    const [selectedArticles, setselectedArticles] = useState({});

    const handleSelect = (art) => {
        setselectedArticles(prevState => ({
            ...prevState,
            [art.id]: prevState[art.id] ? undefined : art
        }));
    }

    return (
        <div className="flex">
            <div className="w-1/6 justify-center bg-gray-200 p-4 h-screen">
                <input type="text" placeholder="Buscar animal" onChange={(e) => setSearchTerm(e.target.value)} className="mb-4 p-2 border border-gray-300 w-full rounded" />
                <ul>
                    {dataArticles.map((art) => (
                        <li key={art.id} className="mb-2">
                            <button onClick={() => handleSelect(art)} className={`p-2 bg-slate-300 hover:bg-slate-400 text-black rounded mx-auto flex items-center justify-center w-full ${selectedArticles[art.id] ? 'bg-slate-400' : ''}`}>
                                <input type="checkbox" checked={!!selectedArticles[art.id]} onChange={() => {}} /> {/* amb el operador !!: podem obtenir el seguent ! amb el primer obtenim si es true o false amb el segon si es  */}
                                {art.id} - {art.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <SelectedArticles selectedArticles={selectedArticles} />

        </div>
    )
}