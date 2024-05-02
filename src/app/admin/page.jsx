"use client"

import React, { useState, useEffect } from "react";
import { fechAnimalByDib, fechDespiecePerDib, createEscandall } from "@/lib/animalDataLoader";
// import data.json
//import xdataEscandall from "./data.json";

export default function LoadData() {

    const [dataEscandall, setDataEscandall] = useState([])
    const [dib, setDib] = useState('')
    const [lot, setLot] = useState('')
    const [artCodiCanal, setArtCodiCanal] = useState('')
    const [artCodiQuarter, setArtCodiQuarter] = useState('')

    const [mostrarDetallCanal, setmostrarDetallCanal] = useState(false);
    const [mostrarDetallDavants, setmostrarDetallDavants] = useState(false);
    const [mostrarDetallDerreres, setmostrarDetallDerreres] = useState(false);

    const fetchData = async () => {
        try {
            const [animal, resultat] = await Promise.all([fechAnimalByDib(dib), fechDespiecePerDib(dib)]);
            const plainObject = JSON.parse(JSON.stringify(resultat));
            const plainObjectAnimal_Escandall = JSON.parse(JSON.stringify(animal));
            plainObjectAnimal_Escandall[0].despiece = plainObject;
            console.log(plainObjectAnimal_Escandall);
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

    /*
    if (dataEscandall.length > 0){
        console.log(dataEscandall[0].despiece[0].quarter);
        const dataQuarter = dataEscandall[0].despiece[0];
    }
    */

    return (
        <>
            <div className="flex justify-center items-center w-full">
                <div className="bg-white shadow-md rounded justify-center px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                    <div className="flex flex-col w-full ">
                        <input
                            type="text"
                            placeholder="DIB"
                            value={dib}
                            onChange={(e) => setDib(e.target.value)}
                            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4  "
                        />
                        <input
                            type="text"
                            disabled
                            placeholder="Lot is coming soon..."
                            value={lot}
                            onChange={(e) => setLot(e.target.value)}
                            className=" shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 "
                        />
                        {/*
                        <input
                            type="text"
                            placeholder="Codi article canals"
                            value={artCodiCanal}
                            onChange={(e) => setArtCodiCanal(e.target.value)}
                            class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 w-full"
                        />
                        <input
                            type="text"
                            placeholder="Codi article quarters"
                            value={artCodiQuarter}
                            onChange={(e) => setArtCodiQuarter(e.target.value)}
                            class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 w-full"
                        />
                        */}
                        <button
                            className="bg-color-button hover:bg-gray-700 text-white font-bold py-2 px-4 rounded "
                            onClick={fetchData}
                        >
                            Cerca dades
                        </button>
                    </div>
                    
                    {/* show data */}
                    {dataEscandall.length > 0 &&
                        <>
                            <dib className="m-5 flex flex-col ">
                                <h1 className="text-2xl font-bold">Dades escandall: Animal x Animal</h1>
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

                                <table className="table-auto mb-4">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2">Lot</th>
                                            <th className="px-4 py-2">Codi article</th>
                                            <th className="px-4 py-2">Descripció</th>
                                            <th className="px-4 py-2">Pes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataEscandall[0].despiece.map((item, index) => (
                                            <tr key={index}>
                                                <td className="border px-4 py-2">{item.lot_codigo}</td>
                                                <td className="border px-4 py-2">{item.art_codi}</td>
                                                <td className="border px-4 py-2">{item.art_descrip}</td>
                                                <td className="border px-4 py-2">{item.peso_art} kg</td>
                                                <td className="px-4">
                                                    <button
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                        onClick={() => setmostrarDetallCanal(!mostrarDetallCanal)}
                                                    >
                                                        {mostrarDetallCanal ? ' - ' : '+'}
                                                    </button>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>

                                </table>

                                
                                {mostrarDetallCanal && (
                                    <table className="table-auto mb-4">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2">Lot</th>
                                                <th className="px-4 py-2">Codi article</th>
                                                <th className="px-4 py-2">Descripció</th>
                                                <th className="px-4 py-2">Pes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataEscandall[0].despiece[0].quarter.davants.map((item, index) => (
                                                <tr key={index}>
                                                    <td className=" bg-slate-300 border px-4 py-2">{item.lot_codigo}</td>
                                                    <td className=" bg-slate-300 border px-4 py-2">{item.art_codi}</td>
                                                    <td className=" bg-slate-300 border px-4 py-2">{item.art_descrip}</td>
                                                    <td className=" bg-slate-300 border px-4 py-2">{item.peso_art} kg</td>
                                                    <td className="px-4">
                                                        <button
                                                            className="bg-green-400 hover:bg-green-300 text-white font-bold py-2 px-4 rounded"
                                                            onClick={() => setmostrarDetallDavants(!mostrarDetallDavants)}
                                                        >
                                                            {mostrarDetallDavants ? '-' : '+'}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {mostrarDetallDavants && (

                                                dataEscandall[0].despiece[0].quarter.davants[0].despiece.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className=" border px-4 py-2">{item.lot_codigo}</td>
                                                        <td className="border px-4 py-2">{item.art_codi}</td>
                                                        <td className="border px-4 py-2">{item.art_descrip}</td>
                                                        <td className="border px-4 py-2">{item.peso_art} kg</td>
                                                    </tr>
                                                )))}
                                        </tbody>


                                        <tbody>
                                            {dataEscandall[0].despiece[0].quarter.derreres.map((item, index) => (
                                                <tr key={index} className=" mb-4">
                                                    <td className="bg-slate-300 border px-4 py-2">{item.lot_codigo}</td>
                                                    <td className="bg-slate-300 border px-4 py-2">{item.art_codi}</td>
                                                    <td className="bg-slate-300 border px-4 py-2">{item.art_descrip}</td>
                                                    <td className="bg-slate-300 border px-4 py-2">{item.peso_art} kg</td>
                                                    <td className="px-4">
                                                        <button
                                                            className="bg-green-400 hover:bg-green-300 text-white font-bold py-2 px-4 rounded"
                                                            onClick={() => setmostrarDetallDerreres(!mostrarDetallDerreres)}
                                                        >
                                                            {mostrarDetallDerreres ? '-' : '+'}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {mostrarDetallDerreres && (

                                                dataEscandall[0].despiece[0].quarter.derreres[0].despiece.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="border px-4 py-2">{item.lot_codigo}</td>
                                                        <td className="border px-4 py-2">{item.art_codi}</td>
                                                        <td className="border px-4 py-2">{item.art_descrip}</td>
                                                        <td className="border px-4 py-2">{item.peso_art} kg</td>
                                                    </tr>
                                                )))}
                                        </tbody>
                                    </table>
                                )}

                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-10 py-2 px-4 rounded"
                                    onClick={handleCreateEscandall} >Crear escandall</button>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-10 py-2 px-4 rounded" onClick={handleCancel} >Cancel·la</button>
                            </dib>
                        </>
                    }
                </div>

            </div>
        </>
    );
}