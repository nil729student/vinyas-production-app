"use client";

import React, { useState } from "react";
import SelectedArticles from "./SelectedArticlesList";

export default function ArtList({ dataArticles }) {

    const [selectedArticles, setSelectedArticles] = useState({});
    const [dataArtsParent, setDataArtsParent] = useState(null);

    const handleSelect = (art) => {
        setSelectedArticles(prevState => ({
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
                        {
                        
                        dataArtsParent && Object.entries(dataArtsParent).map(([artId, artData]) => (
                            console.log(artData.artMitjanaPerArticle), // Axixò no funciona
                            artData.articles.map((artData) => (
                                <table key={artId} className="w-full text-left border-collapse space-y-2 p-4 rounded-lg shadow">
                                    <thead>
                                        <tr>
                                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">ID - Name</th>
                                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Unitats</th>
                                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Pes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="hover:bg-grey-lighter">
                                            <td className="py-4 px-6 border-b border-grey-light">{artId} - {artData.parent.parent.name}</td>
                                            <td className="py-4 px-6 border-b border-grey-light">{artData.units}</td>
                                            <td className="py-4 px-6 border-b border-grey-light">{artData.parent.parent.weightKg}kg</td>
                                        </tr>
                                        <tr className="hover:bg-grey-lighter">
                                            <td className="py-4 px-6 border-b border-grey-light">{artId} - {artData.parent.name}</td>
                                            <td className="py-4 px-6 border-b border-grey-light">{artData.units}</td>
                                            <td className="py-4 px-6 border-b border-grey-light">{artData.parent.weightKg}kg</td>
                                        </tr>
                                        <tr className="hover:bg-grey-lighter">
                                            <td className="py-4 px-6 border-b border-grey-light">{artId} - {artData.name}</td>
                                            <td className="py-4 px-6 border-b border-grey-light">{artData.units}</td>
                                            <td className="py-4 px-6 border-b border-grey-light">{artData.weightKg}kg</td>
                                        </tr>
                                    </tbody>
                                </table>
                            ))
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}