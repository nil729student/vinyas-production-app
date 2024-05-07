"use client"

import React, { useState } from "react";
import { getArticlesByCanalWeightRange } from "@/lib/filterActions/AnimalWeightRange.js";
import TableAnimalWeightRange from "./TableAnimalWeightRange";

export default function AnimalWeightRange() {

    const [loadArts, setLoadArts] = useState(false);
    const [minWeight, setMinWeight] = useState(0);
    const [maxWeight, setMaxWeight] = useState(0);
    const [dataArt, setDataArt] = useState({});
    const [weights, setWeights] = useState({});

    const handlerAnimalWeightRange = async () => {
        const response = await getArticlesByCanalWeightRange(maxWeight, minWeight); // 250, 220
        console.log(response);
        const {
            articles: articles,
            artMitjanaPerArticle: artMitjanaPerArticle,
            artMaxWeightPerArticle: artMaxWeightPerArticle,
            artMinWeightPerArticle: artMinWeightPerArticle
        } = response; // estem definint articles i mitjanaPerArticle a les 

        setLoadArts(true);
        setWeights({ artMitjanaPerArticle, artMaxWeightPerArticle, artMinWeightPerArticle }); // Update weights state variable
        setDataArt(articles);
    }

    return (
        <>
            <div className="p-6 mb-10 mx-auto bg-white rounded-xl shadow-md flex items-center">
                <div className="flex-1">
                    <div className=" mx-auto max-w-sm p-6" >
                        <h1 className="text-xl font-bold mb-4">Canal Weight Range</h1>
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
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-color-button hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Search
                        </button>
                    </div>

                    <div>

                        {
                            loadArts && <TableAnimalWeightRange dataArt={dataArt} weights={weights} />
                        }

                    </div>
                </div>
            </div>
        </>
    )
}