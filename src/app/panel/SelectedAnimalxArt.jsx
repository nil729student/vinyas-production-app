import React, { useState } from "react";
import ArticleUnitWeightRange from "@/lib/filterActions/ArticleUnitWeightRange";

export default function SelectedAnimalxArt({ selectedArticles, onDataArtsParent }) {

    const [viewInFormat, setViewInFormat] = useState(false);
    const [selectedArticlesParmas, setSelectedArticlesParams] = useState({});

    console.log(selectedArticles);
    const handleCanalByArticle = async () => {
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
    };

    const handleUnitsChange = (e, artId) => {
        const updatedArticlesParams = {
            ...selectedArticlesParmas,
            [artId]: { ...selectedArticlesParmas[artId], units: e.target.value }
        };
        setSelectedArticlesParams(updatedArticlesParams);
    };

    return (
        <div className="p-2 rounded-lg">

            {/*<button onClick={() => setViewInFormat(!viewInFormat)} className="mt-4 bg-color-button text-white rounded-lg p-2 hover:bg-belue-600"> Canvia format </button> */}
            <h2 className="text-2xl font-bold mt-20 mb-2 text-center">Articles Comanda</h2>
            {
                viewInFormat ? (
                    <>
                        <div >
                            <ul className="">
                                {Object.values(selectedArticles).filter(Boolean).map((art, index) => (
                                    <li key={index} className="flex flex-col rounded-lg shadow">
                                        <span className="text-lg font-semibold">  {art.id} - {art.name}</span>
                                        <div className="flex items-center ">
                                            <label htmlFor="units" className="font-medium">Unitats</label>
                                            <input name="units" type="number" placeholder="unitats" onChange={(e) => handleUnitsChange(e, art.id)} className="border-2 rounded-lg  w-full" />
                                        </div>
                                        <div className="flex items-center">
                                            <label htmlFor="weight" className="font-medium">Pes peça 0.5</label>
                                            <input name="weight" type="number" placeholder="pes" onChange={(e) => handleWeightChange(e, art.id)} className="border-2 rounded-lg  w-full" />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                ) : (
                    <div className="flex  justify-center space-x-4 ">
                        <table className=" w-1/2  text-left border-collapse table-fixed">
                            <thead>
                                <tr>
                                    <th className="w-1/3 py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Contador </th>
                                    <th className="w-1/3 py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Codi Nom</th>
                                    <th className="w-1/3 py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Edat</th>
                                    <th className="w-1/3 py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Classificació</th>
                                    <th className="w-1/3 py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Pes animal +0.5 -0.5</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.values(selectedArticles).filter(Boolean).map((art, index) => (
                                    console.log(art),
                                        <tr className="hover:bg-grey-lighter" key={index}>
                                        <td className="py-2 px-6 border-b border-grey-light">{art.counterArts}</td>
                                        <td className="py-2 px-6 border-b border-grey-light"> {art.name} - {art.id}</td>
                                        <td className="py-2 px-6 border-b border-grey-light"> <b>{art.ageMax} - {art.ageMin}</b> </td>
                                        <td className=" px-6 border-b border-grey-light">
                                            <b htmlFor="weight"> <b>Rang: </b>  {art.weightMax - 2} - {art.weightMin + 2} </b>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <button onClick={handleCanalByArticle} className="mt-4 bg-color-button text-white rounded-lg p-2 hover:bg-belue-600"> Calcula </button>
                        </table>
                    </div>
                )
            }            
        </div>
    );
}