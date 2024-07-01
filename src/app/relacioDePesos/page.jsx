"use client";
import { useState, useEffect, useMemo } from 'react';
import { animalRelationWeight } from "@/lib/animalDataLoader";
import { getMaxMinWeightArticles } from "@/lib/articleActions";
//import SelectedArticlesListForm from "./SelectedArticlesListForm";


export default function ArticleWeighing() {
    const [searchTerm, setSearchTerm] = useState('');
    const [dataArtsParent, setDataArtsParent] = useState(null);
    const [selectedArticles, setSelectedArticles] = useState({});

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
    const [animalsData, setAnimalsData] = useState([]);

    const loadData = async () => {
        const data = await animalRelationWeight();
        setAnimalsData(data);
    };


    const handleSelect = async (art) => {
        console.log(art.id)
        const weightMaxMin = await getMaxMinWeightArticles(art.id);
        // add in art the max and min weight of the article
        /*
            {
            _count: { _all: 2 },
            _max: { weightKg: 7.8 },
            _min: { weightKg: 7.75 }
            }
        */
        art.counterArts = weightMaxMin._count._all;
        art.weightMax = weightMaxMin._max.weightKg;
        art.weightMin = weightMaxMin._min.weightKg;
        setSelectedArticles(prevState => ({
            ...prevState,
            [art.id]: prevState[art.id] ? undefined : art,
        }));
    }

    // revem les dades del component fill
    const handleDataArtsParent = (data) => {
        setDataArtsParent(data);
    };



    return (
        <>
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
                {/*<div className="mb-4">
                            <label htmlFor="unit" className="block text-sm font-medium text-gray-700">Unitat</label>
                            <input id="unit" className="border p-2 rounded w-full" type="number" />
                        </div>*/}
                <button
                    onClick={handlerAnimalWeightRange}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-color-button hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Search
                </button>
            </div>
            <div className="flex justify-between items-start h-screen p-10 ">
                <div className="flex-1 flex flex-col justify-center items-center">

                    <h1 className="text-4xl font-bold mb-10 text-center">Relació de pesos</h1>
                    <div className="flex justify-center mb-10">
                        <input type="date" className="p-3 border rounded-lg" />
                        <button className="ml-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={loadData}>
                            Carregar dades
                        </button>
                    </div>
                    <div className='flex flex-wrap justify-between'>
                        <div className="overflow-auto max-h-[600px] mb-10 w-full ">
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="py-2 px-4 border-b">Numero Canal</th>
                                        <th className="py-2 px-4 border-b">Edat</th>
                                        <th className="py-2 px-4 border-b">Pes</th>
                                        <th className="py-2 px-4 border-b">Classificació</th>
                                        <th className="py-2 px-4 border-b">Dib</th>
                                        <th className="py-2 px-4 border-b">Hallal</th>
                                        <th className="py-2 px-4 border-b">Certi1</th>
                                        <th className="py-2 px-4 border-b">Certi2</th>
                                        <th className="py-2 px-4 border-b">Proveïdor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {animalsData.map((animal, index) => (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="py-2 px-4 border-b">{animal.hip_canalgeneral}</td>
                                            <td className="py-2 px-4 border-b">{animal.hip_edat}</td>
                                            <td className="py-2 px-4 border-b">{animal.hip_pes}</td>
                                            <td className="py-2 px-4 border-b">{animal.hip_clasabr}</td>
                                            <td className="py-2 px-4 border-b">{animal.dib_id}</td>
                                            <td className="py-2 px-4 border-b">{animal.Hallal}</td>
                                            <td className="py-2 px-4 border-b">{animal.certi1}</td>
                                            <td className="py-2 px-4 border-b">{animal.certi2}</td>
                                            <td className="py-2 px-4 border-b">{animal.hip_nomproveidor}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
