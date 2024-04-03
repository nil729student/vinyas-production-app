"use client"

import React, { useState } from "react";
import { getArticlesByCanalWeightRange } from "@/lib/filterActions/AnimalWeightRange.js";
import TableAnimalWeightRange from "./TableAnimalWeightRange";

export default function AnimalWeightRange() {
    
    const [loadArts, setLoadArts] = useState(false); 
    const [minWeight, setMinWeight] = useState(0);
    const [maxWeight, setMaxWeight] = useState(0);
    const [weights, setWeights] = useState([]); // Add weights state variable

    const handlerAnimalWeightRange = async () => {
        console.log("AnimalWeightRange");
        const weights =  await getArticlesByCanalWeightRange(maxWeight, minWeight); // 250, 220
        console.log(weights);
        setLoadArts(true);
        setWeights(weights); // Update weights state variable
    }

    return (
        <>
            <div className="p-6 w-4/5 mx-auto bg-white rounded-xl shadow-md flex items-center">
                <div className="flex-1">
                    <h1 className="text-xl font-bold mb-4">Animal Weight Range</h1>
                    <div className="mb-4">
                        <input className="border p-2 rounded w-full" type="number" placeholder="Minimum weight" 
                            onChange={(e) => {
                                e.preventDefault(); 
                                setMinWeight(parseInt(e.target.value, 10));
                            }}
                        />
                        <span className="mx-2">-</span>
                        <input className="border p-2 rounded w-full" type="number" placeholder="Maximum weight" 
                            onChange={(e) => {
                                e.preventDefault(); 
                                setMaxWeight(parseInt(e.target.value, 10));
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="class" className="block text-sm font-medium text-gray-700">Classification</label>
                        <input id="class" className="border p-2 rounded w-full" type="text" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="unit" className="block text-sm font-medium text-gray-700">Unitat</label>
                        <input id="unit" className="border p-2 rounded w-full" type="number" />
                    </div>
                    <button
                        onClick={handlerAnimalWeightRange}
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Search
                    </button>

                    {
                        loadArts && <TableAnimalWeightRange weights={weights}  />
                    }

                </div>
            </div>


        </>
    )
}