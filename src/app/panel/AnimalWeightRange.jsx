"use client"

import React from "react";
import { getArticlesByCanalWeightRange } from "@/lib/filterActions/AnimalWeightRange.js";

export default async function AnimalWeightRange() {

    const handlerAnimalWeightRange = async () => {
        console.log("AnimalWeightRange");
        await getArticlesByCanalWeightRange(250, 220);
    }
    
    return(
        <>
            <dib>
                <h1>Animal Weight Range</h1>
                <input className="border" type="number" /> - <input className="border" type="number" />
                <label htmlFor="class">Classification</label>
                <input id="class" className="border" type="text" />
                <label htmlFor="class">unitat</label>
                <input className="border" type="number" />
                <button onClick={ handlerAnimalWeightRange }>Search</button>
            </dib>
        </>
    )
}