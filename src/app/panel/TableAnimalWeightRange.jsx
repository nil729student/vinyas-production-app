import React, { useState } from "react";

export default function TableAnimalWeightRange({ weights }) {
    const { mitjanaPerArticle, minWeightPerArticle, maxWeightPerArticle } = weights;

    console.log(weights);

    return (
        <div>
            <h1>TableAnimalWeightRange</h1>
            <table>
                <thead>
                    <tr>
                        <th>Article</th>
                        <th>Pes mitj</th>
                        <th>Pes Maxim</th>
                        <th>Pes Minim</th>
                        <th>Classification</th>
                        <th>Unit</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(mitjanaPerArticle).map(([article, weight]) => (
                        <tr key={article}>
                            <td>{article}</td>
                            <td>{weight}</td>
                            <td>{maxWeightPerArticle[article]}</td>
                            <td>{minWeightPerArticle[article]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}