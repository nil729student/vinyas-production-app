"use client";

import React, { useState } from "react";
import SelectedArticles from "./SelectedArticlesList";
import { data } from "autoprefixer";

export default function ArtList({ dataArticles }) {

    const [selectedArticles, setselectedArticles] = useState({});
    const [data, setData] = useState(null);

    const handleSelect = (art) => {
        setselectedArticles(prevState => ({
            ...prevState,
            [art.id]: prevState[art.id] ? undefined : art
        }));
    }

    // revem les dades del component fill
    const handleData = (data) => {
        setData(data);
    };


    return (
        
        <div className="flex">

            <div className="w-1/6 bg-gray-200 p-4 h-screen rounded-lg shadow-lg">
                <input type="text" placeholder="Buscar animal" onChange={(e) => setSearchTerm(e.target.value)} className="mb-4 p-2 border border-gray-300 w-full rounded" />
                <ul className="space-y-4">
                    {dataArticles.map((art) => (
                        <li key={art.id} className="bg-white p-4 rounded-lg shadow">
                            <button onClick={() => handleSelect(art)} className={`flex items-center space-x-2 ${selectedArticles[art.id] ? 'bg-gray-600 text-white' : 'bg-white-300 text-black'} hover:bg-gray-600 rounded p-2 w-full`}>
                                <input type="checkbox" checked={!!selectedArticles[art.id]} onChange={() => { }} />
                                <span>{art.id} - {art.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <SelectedArticles selectedArticles={selectedArticles} onData={handleData} />

            {data && <pre>{JSON.stringify(data)}</pre>}

        </div>
    )
}