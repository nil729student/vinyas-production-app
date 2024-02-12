"use client"

import React, { useState, useEffect } from "react";
import { fechAnimalByDib, fechDespiecePerDib, createEscandall } from "@/lib/animalDataLoader";

export default function LoadData() {
    const [dataEscandall, setDataEscandall] = useState([])

    const fetchData = async () => {
        try {
            const dib = 'CZ830760081';
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