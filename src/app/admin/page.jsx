"use client"

import React, { useState, useEffect } from "react";
import { fechDespiecePerDib, createEscandall } from "@/lib/data";

export default function LoadData () {
    const [dataEscandall, setDataEscandall] = useState([]);

    const fetchData = async () => {
        const resultat = await fechDespiecePerDib();
        // Convert the data to a plain object
        const plainObject = JSON.parse(JSON.stringify(resultat));
        setDataEscandall(plainObject);
    }

    const handleCreateEscandall = () => {
        createEscandall(JSON.parse(JSON.stringify(dataEscandall)));
    }

    return (
        <>
            <h1>Resultat</h1>
            <div>
                {/* button to load data */}

                <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={fetchData} >Carregar dades</button>
                <br/>
                <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                onClick={handleCreateEscandall} >Carregar dades</button>
                {/* display the data */}
                {JSON.stringify(dataEscandall)}
            </div>
        </>
    );
}