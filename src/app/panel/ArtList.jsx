"use client";

import React, { useState } from "react";
import SelectedArticles from "./SelectedArticlesList";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ArtList({ dataArticles }) {

    const [selectedArticles, setSelectedArticles] = useState({});
    const [dataArtsParent, setDataArtsParent] = useState(null);
    const [detallCalcul, setDetallCalcul] = useState(false);

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
                <div class="overflow-x-auto overflow-y-auto h-screen ">
                    <ul className="space-y-4 p-4 ">
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
            </div>

            <div className="flex-1 flex flex-col justify-center items-center">
                <SelectedArticles selectedArticles={selectedArticles} onDataArtsParent={handleDataArtsParent} />
                <div className="mt-4">
                    <h2 className="text-2xl font-bold mb-4 text-center">Dades dels articles seleccionats:</h2>
                    <ul className="space-y-4">
                        {
                            dataArtsParent &&
                            Object.entries(dataArtsParent).map(([artId, artData]) => (
                                <div key={artId}>
                                    {artData.artMitjanaPerArticle ? (
                                        <TableContainer component={Paper}>
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell><b>Codi Article</b></TableCell>
                                                        <TableCell><b>Unitats</b></TableCell>
                                                        <TableCell><b>Pes Mitj</b></TableCell>
                                                        <TableCell><b>Pes Maxim</b></TableCell>
                                                        <TableCell><b>Pes Minim</b></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>{artData.articles[0].parent.parent.art_codi}</TableCell>
                                                        <TableCell>{artData.articles[0].parent.parent.name}</TableCell>
                                                        <TableCell>{Number(artData.canalArtMitjanaPerArticle.toFixed(2))}kg</TableCell>
                                                        <TableCell>{Number(artData.canalArtMaxWeightPerArticle.toFixed(2))}kg</TableCell>
                                                        <TableCell>{Number(artData.canalArtMinWeightPerArticle.toFixed(2))}kg</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>{artData.articles[0].parent.art_codi}</TableCell>
                                                        <TableCell>{artData.articles[0].parent.name}</TableCell>
                                                        <TableCell>{Number(artData.quarterArtMitjanaPerArticle.toFixed(2))}kg</TableCell>
                                                        <TableCell>{Number(artData.quarterArtMaxWeightPerArticle.toFixed(2))}kg</TableCell>
                                                        <TableCell>{Number(artData.quarterArtMinWeightPerArticle.toFixed(2))}kg</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>{artData.articles[0].art_codi}</TableCell>
                                                        <TableCell>{artData.articles[0].name}</TableCell>
                                                        <TableCell>{Number(artData.artMitjanaPerArticle.toFixed(2))}kg</TableCell>
                                                        <TableCell>{Number(artData.artMaxWeightPerArticle.toFixed(2))}kg</TableCell>
                                                        <TableCell>{Number(artData.artMinWeightPerArticle.toFixed(2))}kg</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    ) : (
                                        <div>
                                            <h2 className="text-2xl font-bold mb-4 text-center">No hi ha dades:</h2>
                                        </div>
                                    )}
                                    <button onClick={() => setDetallCalcul(!detallCalcul)} className="mt-4 mb-4 bg-blue-500 text-white rounded-lg p-2 hover:bg-belue-600"> Detall Calcul  </button>
                                    <div>
                                        Numero de articles obtinguts: <b>{artData.articles.length}</b>
                                    </div>
                                    {
                                        detallCalcul && // si detallCalcul es true
                                        artData.articles.map((artData) => (
                                            <table key={artId} className="w-full text-left border-collapse space-y-2 p-4 rounded-lg shadow-lg bg-blue-100">
                                                <thead>
                                                    <tr>
                                                        <th className="py-4 px-6 uppercase text-sm text-blue-800 border-b border-blue-300">CODI ARTICLE</th>
                                                        <th className="py-4 px-6 uppercase text-sm text-blue-800 border-b border-blue-300">Unitats</th>
                                                        <th className="py-4 px-6 uppercase text-sm text-blue-800 border-b border-blue-300">Pes</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="hover:bg-blue-200">
                                                        <td className="py-4 px-6 border-b border-blue-300">{artId} - {artData.parent.parent.name}</td>
                                                        <td className="py-4 px-6 border-b border-blue-300">{artData.units}</td>
                                                        <td className="py-4 px-6 border-b border-blue-300">{artData.parent.parent.weightKg}kg</td>
                                                    </tr>
                                                    <tr className="hover:bg-blue-200">
                                                        <td className="py-4 px-6 border-b border-blue-300">{artId} - {artData.parent.name}</td>
                                                        <td className="py-4 px-6 border-b border-blue-300">{artData.units}</td>
                                                        <td className="py-4 px-6 border-b border-blue-300">{artData.parent.weightKg}kg</td>
                                                    </tr>
                                                    <tr className="hover:bg-blue-200">
                                                        <td className="py-4 px-6 border-b border-blue-300">{artId} - {artData.name}</td>
                                                        <td className="py-4 px-6 border-b border-blue-300">{artData.units}</td>
                                                        <td className="py-4 px-6 border-b border-blue-300">{artData.weightKg}kg</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        ))
                                    }
                                </div>
                            ))
                        }

                    </ul>
                </div>
            </div>
        </div>
    )
}