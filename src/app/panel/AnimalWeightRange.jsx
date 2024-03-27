import React from "react";

export default function AnimalWeightRange() {
    return(
        <>
            <dib>
                <h1>Animal Weight Range</h1>
                <input className="border" type="number" /> - <input className="border" type="number" />
                <label htmlFor="class">Classification</label>
                <input id="class" className="border" type="text" />
                <label htmlFor="class">unitat</label>
                <input className="border" type="number" />
            </dib>
        </>
    )
}