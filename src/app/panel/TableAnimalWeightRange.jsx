import React, { useState } from "react";

export default function TableAnimalWeightRange({ dataArt, weights }) {

    const { artMitjanaPerArticle, artMinWeightPerArticle, artMaxWeightPerArticle } = weights;

    const uniqueArticles = dataArt.filter((article, index, self) =>
        index === self.findIndex((a) => a.art_codi === article.art_codi)
    );


    return (
        <div className="max-h-[700px] overflow-auto">
            <table className="w-full divide-y divide-gray-200">
                <thead className=" sticky top-0 bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Codi</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pes mitj</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pes Maxim</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pes Minim</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classification</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {uniqueArticles.map((article) => (
                        <tr key={article.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{article.art_codi}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{article.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{artMitjanaPerArticle[article.art_codi]}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{artMinWeightPerArticle[article.art_codi]}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{artMaxWeightPerArticle[article.art_codi]}</td>
                            <td className="px-6 py-4 whitespace-nowrap"> - </td>
                            <td className="px-6 py-4 whitespace-nowrap"> 1 </td>
                        </tr>
                    )) // filtre per articles repetits
                    }
                </tbody>
            </table>
        </div>
    );
}