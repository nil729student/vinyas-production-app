"use client"

import React, { useState, useEffect } from "react";
import { fechDespiecePerDib, createEscandall } from "@/lib/data";

export default function LoadData() {
    const [dataEscandall, setDataEscandall] = useState([])

    const fetchData = async () => {
        const resultat = await fechDespiecePerDib()
        // Convert the data to a plain object
        const plainObject = JSON.parse(JSON.stringify(resultat))
        setDataEscandall(plainObject);
    }

    const handleCreateEscandall = async () => {
        await createEscandall(dataEscandall)
    }

    const handleCancel = () => {
        setDataEscandall([])
    }

    return (
        <>
            <div>
                {/* button to load data */}
                <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold m-10 py-2 px-4 rounded"
                    onClick={fetchData} >Carregar dades</button>
                {
                    dataEscandall.length > 0 &&
                    <>
                        <p>{JSON.stringify(dataEscandall)}</p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-10 py-2 px-4 rounded"
                            onClick={handleCreateEscandall} >Crear escandall</button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-10 py-2 px-4 rounded" onClick={handleCancel} >Cancel·la</button>
                    </>
                }
            </div>
        </>

    );
}