"use client"

import React, { useState, useEffect } from "react";
import { fechAnimalByDib, fechDespiecePerDib, createEscandall } from "@/lib/animalDataLoader";

export default function LoadData() {
    const [dataEscandall, setDataEscandall] = useState([])
    const [dib, setDib] = useState('')
    const [artCodi, setArtCodi] = useState('')


    const fetchData = async () => {
        try {
            const [animal, resultat] = await Promise.all([fechAnimalByDib(dib), fechDespiecePerDib()]);
            const plainObject = JSON.parse(JSON.stringify(resultat));
            const plainObjectAnimal_Escandall = JSON.parse(JSON.stringify(animal));
            plainObjectAnimal_Escandall[0].despiece = plainObject;
            setDataEscandall(plainObjectAnimal_Escandall);
            return plainObject;
        } catch (error) {
            console.error('Error fetching data:', error);
            return { error: error.message };
        }
    };

    const handleCreateEscandall = async () => {
        await createEscandall(dataEscandall[0])
    }

    const handleCancel = () => {
        setDataEscandall([])
    }

    if (dataEscandall.length > 0){
        console.log(dataEscandall[0].despiece[0].quarter);
        const dataQuarter = dataEscandall[0].despiece[0];



    }




    return (
        <>
            <div>
                <div>
                    <input
                        type="text"
                        placeholder="DIB"
                        value={dib}
                        onChange={(e) => setDib(e.target.value)}
                        className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <input
                        type="text"
                        placeholder="Codi article"
                        value={artCodi}
                        onChange={(e) => setArtCodi(e.target.value)}
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-10 py-2 px-4 rounded"
                        onClick={fetchData}
                    >
                        Carregar dades
                    </button>
                </div>


                {/* show data */}
                {dataEscandall.length > 0 &&
                    <>
                        <p>{JSON.stringify(dataEscandall)}</p>
                        <h1 className="text-2xl font-bold">Dades escandall</h1>
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Codi article</th>
                                    <th className="px-4 py-2">Pes</th>
                                    <th className="px-4 py-2">Classificacio</th>
                                    <th className="px-4 py-2">Sexe</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataEscandall.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2">{item.dib_id}</td>
                                        <td className="border px-4 py-2">{item.lpa_pes} kg</td>
                                        <td className="border px-4 py-2">{item.lpa_qualitatabr}</td>
                                        <td className="border px-4 py-2">{item.lpa_sexe}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h1 className="text-2xl font-bold">Dades despiece</h1>

                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Lot</th>
                                    <th className="px-4 py-2">Codi article</th>
                                    <th className="px-4 py-2">Descripció</th>
                                    <th className="px-4 py-2">Pes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataEscandall[0].despiece.map((item, index) => (
                                        <tr key={index}>
                                            <td className="border px-4 py-2">{item.lot_codigo}</td>
                                            <td className="border px-4 py-2">{item.art_codi} </td>
                                            <td className="border px-4 py-2">{item.art_descrip}</td>
                                            <td className="border px-4 py-2">{item.peso_art} kg</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Lot</th>
                                    <th className="px-4 py-2">Codi article</th>
                                    <th className="px-4 py-2">Descripció</th>
                                    <th className="px-4 py-2">Pes</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>

                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-10 py-2 px-4 rounded"
                            onClick={handleCreateEscandall} >Crear escandall</button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-10 py-2 px-4 rounded" onClick={handleCancel} >Cancel·la</button>
                    </>
                }
            </div>
        </>
    );
}