"use client";
import { useState, useEffect } from 'react';
import { animalRelationWeight } from "@/lib/animalDataLoader";
import relaciodepesos from "./relaciodepesos.json";
import ClassificationWeightChart from './RelationshipOfGraphicWeights/ClassificationWeightChart';
import ProviderWeightChart from './RelationshipOfGraphicWeights/ProviderWeightChart';
import ProviderClassificationChart from './RelationshipOfGraphicWeights/ProviderClassificationChart';

export default function ArticleWeighing() {
    const [animalsData, setAnimalsData] = useState([]);

    const loadData = async () => {
        const data = await animalRelationWeight();
        setAnimalsData(data || []);
        console.log(data);
    };

    return (
        <>
            <div className="p-10 overflow-auto">
                <h1 className="text-3xl font-bold mb-5 text-center">Relació de pesos</h1>
                <div className="flex justify-center mb-5">
                    <input type="date" className="p-2 border rounded" />
                    <button className="ml-4 p-2 bg-blue-500 text-white rounded" onClick={loadData}>
                        Weighing
                    </button>
                </div>
                <div className='flex flex-wrap justify-between'>
                    <div className="overflow-auto max-h-[600px] mb-10 w-full md:w-1/4">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-2 px-4 border-b">Edat</th>
                                    <th className="py-2 px-4 border-b">Pes</th>
                                    <th className="py-2 px-4 border-b">Classificació</th>
                                    <th className="py-2 px-4 border-b">Proveïdor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {animalsData.map((animal, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border-b">{animal.hip_edat}</td>
                                        <td className="py-2 px-4 border-b">{animal.hip_pes}</td>
                                        <td className="py-2 px-4 border-b">{animal.hip_clasabr}</td>
                                        <td className="py-2 px-4 border-b">{animal.hip_nomproveidor}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {
                        // asta que no este cargado el json no se renderiza el chart
                        animalsData.length > 0 && (
                            <>
                                <div className="mb-10 w-full md:w-1/2 lg:w-2/3">
                                    <ClassificationWeightChart data={animalsData} />
                                </div>
                                <div className="mb-10 w-full md:w-1/2 lg:w-2/3">
                                    <ProviderWeightChart data={animalsData} />
                                </div>
                                <div className="mb-10 w-full md:w-1/2 lg:w-2/3">
                                    <ProviderClassificationChart data={animalsData} /> 
                                </div>
  
                            </>
                        )
                    }

                </div>
            </div>
        </>
    );
}