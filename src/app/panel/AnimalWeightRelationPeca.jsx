"use client";
import { useState, useEffect, useMemo } from 'react';
import { animalRelationWeight } from "@/lib/animalDataLoader";
import { getMaxMinWeightArticles } from "@/lib/articleActions";
import SelectedAnimalxArt from "./SelectedAnimalxArt";
import dataArticles from "./dataArticles.json";
import {getArticlesByAnimalWeightRange} from "@/lib/animalActions";

export default function ArticleWeighing() {
    const [searchTerm, setSearchTerm] = useState('');
    const [dataArtsParent, setDataArtsParent] = useState(null);
    const [selectedArticles, setSelectedArticles] = useState({});

    const [animalsData, setAnimalsData] = useState([]);

    const loadData = async () => {
        const data = await animalRelationWeight();
        setAnimalsData(data);
    };

    const filteredAnimals = useMemo(() => {
        return dataArticles.filter((art) =>
            art.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [dataArticles, searchTerm]);

    const handleSelect = async (art) => {
        console.log(art.id)
        const weightMaxMin = await getMaxMinWeightArticles(art.id);
        const animals = await getArticlesByAnimalWeightRange(art.id);


        // add in art the max and min weight of the article
        /*
            {
            _count: { _all: 2 },
            _max: { weightKg: 7.8 },
            _min: { weightKg: 7.75 }
            animal: { id: 1, name: 'Corder', weightKg: 7.8 }
            }
        */

        const animalWeights = animals.map(item => item.animal.animaWeightKg);
        const animalAge = animals.map(item => item.animal.age);
        const maxWeight = Math.max(...animalWeights);
        const minWeight = Math.min(...animalWeights);
        const maxAge = Math.max(...animalAge);
        const minAge = Math.min(...animalAge);
        art.counterArts = weightMaxMin._count._all;
        art.weightMax = maxWeight;
        art.weightMin = minWeight;
        art.ageMax = maxAge;
        art.ageMin = minAge;
        art.animals = animals;        
        art.classifciacions = [...new Set(animals.map(item => item.classification.name))];

        console.log(art);
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
            <div className="flex justify-between items-start h-screen p-10 overflow-auto">
                <div className="w-1/6 bg-gray-200 p-4 rounded-lg shadow-lg">
                    <input type="text" placeholder="Buscar article" onChange={(e) => setSearchTerm(e.target.value)} className="mb-4 p-2 border border-gray-300 w-full rounded" />
                    <div class="overflow-auto h-screen ">
                        <ul className="space-y-4 p-4 ">
                            {filteredAnimals.map((art, index) => (
                                <li key={index} className="bg-white p-4 rounded-lg shadow">
                                    <button onClick={() => handleSelect(art)} className={`flex items-center space-x-2 ${selectedArticles[art.id] ? 'bg-gray-200' : 'bg-white-300 text-black'} hover:bg-gray-200 rounded p-2 w-full`}>
                                        <input type="checkbox" checked={!!selectedArticles[art.id]} onChange={() => { }} />
                                        <span>{art.id} - {art.name}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-center items-center">

                    <h1 className="text-4xl font-bold mb-10 text-center">Relació de pesos</h1>
                    <div className="flex justify-center mb-10">
                        <input type="date" className="p-3 border rounded-lg" />
                        <button className="ml-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={loadData}>
                            Carregar dades
                        </button>
                    </div>
                    <SelectedAnimalxArt selectedArticles={selectedArticles} onDataArtsParent={handleDataArtsParent} />
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
