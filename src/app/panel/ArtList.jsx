"use client";

import React, { useState } from "react";
import SelectedArticles from "./SelectedArticlesList";

export default function ArtList({ dataArticles }) {

    const [selectedArticles, setselectedArticles] = useState({});
    const [dataArtsParent, setDataArtsParent] = useState(null);

    const handleSelect = (art) => {
        setselectedArticles(prevState => ({
            ...prevState,
            [art.id]: prevState[art.id] ? undefined : art
        }));
    }

    // revem les dades del component fill
    const handleDataArtsParent = (data) => {
        setDataArtsParent(data);
    };


    return (

        <div className="flex justify-between items-start h-screen">
            <div className="w-1/6 bg-gray-200 p-4 rounded-lg shadow-lg">
                <input type="text" placeholder="Buscar animal" onChange={(e) => setSearchTerm(e.target.value)} className="mb-4 p-2 border border-gray-300 w-full rounded" />
                <ul className="space-y-4">
                    {dataArticles.map((art) => (
                        <li key={art.id} className="bg-white p-4 rounded-lg shadow">
                            <button onClick={() => handleSelect(art)} className={`flex items-center space-x-2 ${selectedArticles[art.id] ? 'bg-gray-200' : 'bg-white-300 text-black'} hover:bg-gray-200 rounded p-2 w-full`}>
                                <input type="checkbox" checked={!!selectedArticles[art.id]} onChange={() => { }} />
                                <span>{art.id} - {art.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center">
                <SelectedArticles selectedArticles={selectedArticles} onDataArtsParent={handleDataArtsParent} />

                <div className="mt-4">
                    <h2 className="text-2xl font-bold mb-4 text-center">Dades dels articles seleccionats:</h2>
                    <ul className="space-y-4">
                        {dataArtsParent && Object.entries(dataArtsParent).map(([artId, artData]) => (
                            artData.map((artData) => (
                                console.log(artData),
                                <li key={artId} className="flex flex-col space-y-2 p-4 rounded-lg shadow">
                                    <span className="text-lg font-semibold"> {artId} - {artData.parent.parent.name}</span>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium">Unitats: {artData.units}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium">Pes Quarter: {artData.parent.parent.weightKg}kg</span>
                                    </div>
                                    <span className=" font-semibold"> {artId} - {artData.parent.name}</span>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium">Unitats: {artData.units}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium">Pes Quarter: {artData.parent.weightKg}kg</span>
                                    </div>
                                </li>
                            ))
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}