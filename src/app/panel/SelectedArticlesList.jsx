import React, { useState } from "react";
import ArticleUnitWeightRange from "@/lib/filterActions/ArticleUnitWeightRange";

export default function SelectedArticlesList({ selectedArticles, onDataArtsParent }) {

    const [viewInFormat, setViewInFormat] = useState(false);
    const [selectedArticlesParmas, setSelectedArticlesParams] = useState({});
    
    const handleCanalByArticle = async () => {
        console.log(selectedArticlesParmas);
        const resArtsParent = await ArticleUnitWeightRange(selectedArticlesParmas);
        console.log(resArtsParent);
        // Enviem les dades al component para a traves de la funcio onData
        onDataArtsParent(resArtsParent);
    }

    const handleWeightChange = (e, artId) => {
        const updatedArticlesParams = {
            ...selectedArticlesParmas,
            [artId]: { ...selectedArticlesParmas[artId], weight: e.target.value }
        };
        setSelectedArticlesParams(updatedArticlesParams);
        console.log(updatedArticlesParams);
    };

    const handleUnitsChange = (e, artId) => {
        const updatedArticlesParams = {
            ...selectedArticlesParmas,
            [artId]: { ...selectedArticlesParmas[artId], units: e.target.value }
        };
        setSelectedArticlesParams(updatedArticlesParams);
        console.log(updatedArticlesParams);
    };

    return (
        <div className="p-4 rounded-lg">

            <button onClick={() => setViewInFormat(!viewInFormat)} className="mt-4 bg-blue-500 text-white rounded-lg p-2 hover:bg-belue-600"> Canvia format </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Articles Comanda</h2>
            {
                viewInFormat ? (
                    <>
                        <div className="">
                            <ul className="space-y-4">
                                {Object.values(selectedArticles).filter(Boolean).map((art, index) => (
                                    <li key={index} className="flex flex-col space-y-2 p-4 rounded-lg shadow">
                                        <span className="text-lg font-semibold">  {art.id} - {art.name}</span>
                                        <div className="flex items-center space-x-2">
                                            <label htmlFor="units" className="font-medium">Unitats</label>
                                            <input name="units" type="number" placeholder="unitats" onChange={(e) => handleUnitsChange(e, art.id)} className="border-2 rounded-lg p-2 w-full" />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <label htmlFor="weight" className="font-medium">Pes peça 0.5</label>
                                            <input name="weight" type="number" placeholder="pes" onChange={(e) => handleWeightChange(e, art.id)} className="border-2 rounded-lg p-2 w-full" />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                ) : (
                    <div className="flex justify-center space-x-4 ">
                        <table className=" w-1/2 text-left border-collapse table-fixed">
                            <thead>
                                <tr>
                                    <th className="w-1/3 py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Contador </th>
                                    <th className="w-1/3 py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Codi Nom</th>
                                    <th className="w-1/3 py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Unitats</th>
                                    <th className="w-1/3 py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Pes peça +0.5 -0.5</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.values(selectedArticles).filter(Boolean).map((art, index) => (
                                        <tr className="hover:bg-grey-lighter" key={index}>
                                        <td className="py-4 px-6 border-b border-grey-light">{art.counterArts}</td>
                                        <td className="py-4 px-6 border-b border-grey-light"> {art.name} - {art.id}</td>
                                        <td className="py-4 pt-11 px-6 border-b border-grey-light">

                                            <input name="units" type="number" placeholder="unitats" onChange={(e) => handleUnitsChange(e, art.id)} className="border-2 border-gray-200 rounded-lg p-2 w-full" />
                                        </td>
                                        <td className="py-4 px-6 border-b border-grey-light">
                                            <label htmlFor="weight"> <b> Weight range </b> <br /> {art.weightMax} - {art.weightMin} </label>
                                            <input name="weight" type="number" placeholder="pes" onChange={(e) => handleWeightChange(e, art.id)} className="border-2 border-gray-200 rounded-lg p-2 w-full" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            
                            <button onClick={handleCanalByArticle} className="mt-4 bg-blue-500 text-white rounded-lg p-2 hover:bg-belue-600"> Calcula </button>
                        
                        </table>

                    </div>
                    
                )
            }

            
        </div>
    );
}