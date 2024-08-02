"use client";
import { useState, useEffect, useMemo, useRef } from 'react';
import { animalRelationWeight } from "@/lib/animalDataLoader";
import { getMaxMinWeightArticles } from "@/lib/articleActions";
import SelectedAnimalxArt from "./SelectedAnimalxArt";
import dataArticles from "./dataArticles.json";
import { getArticlesByAnimalWeightRange } from "@/lib/animalActions";

export default function ArticleWeighing() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedArticles, setSelectedArticles] = useState({});
    const [animalsData, setAnimalsData] = useState([]);
    const [filteredAnimalsData, setFilteredAnimalsData] = useState([]);
    const [date, setDate] = useState('');
    const dateInputRef = useRef(null);

    // Cargar datos automáticamente al inicio
    useEffect(() => {
        // Obtenir la data de hayer format 2024-06-18
        const ahir = new Date();
        ahir.setDate(ahir.getDate() - 1);
        const ahirFormat = ahir.toISOString().split('T')[0];
        setDate(ahirFormat);
        loadData(ahirFormat);
    }, []);

    // Handle date change
    const handleDateChange = (event) => {
        setDate(event.target.value);
    };
    

    const handleLoadData = () => {
        const selectedDate = dateInputRef.current.querySelector('#date').value;

        if (selectedDate) {
            loadData(selectedDate);
        }
        else {
            alert('Selecciona una data');
        }
    };

    const loadData = async (fecha) => {
        const data = await animalRelationWeight(fecha);
        setAnimalsData(data);
        setFilteredAnimalsData(data); // Cargar datos sin filtros al inicio
    };

    const filteredArticles = useMemo(() => {
        return dataArticles.filter((art) =>
            art.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const handleSelect = async (art) => {
        if (selectedArticles[art.id]) {
            // Article is being deselected
            setSelectedArticles(prevState => {
                const newState = { ...prevState };
                delete newState[art.id];
                return newState;
            });
            // Call setFilteredAnimalsData with appropriate data when deselected
            setFilteredAnimalsData(animalsData); // or any other data you want to display when deselected
        } else {
            const weightMaxMin = await getMaxMinWeightArticles(art.id);
            const animals = await getArticlesByAnimalWeightRange(art.id); // Obtener animales asociados al artículo
            const animalWeights = animals.map(item => item.animal.animaWeightKg);
            const animalAge = animals.map(item => item.animal.age);
            const maxWeight = Math.max(...animalWeights) + 2;
            const minWeight = Math.min(...animalWeights) - 2;
            const maxAge = Math.max(...animalAge);
            const minAge = Math.min(...animalAge);
            art.counterArts = weightMaxMin._count._all;
            art.weightMax = maxWeight;
            art.weightMin = minWeight;
            art.ageMax = maxAge;
            art.ageMin = minAge;
            art.animals = animals;
            art.classifciacions = [...new Set(animals.map(item => item.animal.classification.name))];

            setSelectedArticles(prevState => ({
                ...prevState,
                [art.id]: prevState[art.id] ? undefined : art,
            }));

            const filterClass = (animal) => {
                return art.classifciacions.some((classification) => {
                    const cleanedAnimalClass = animal.hip_clasabr.replace(/\s/g, '');
                    const cleanedArticleClass = classification.replace(/\s/g, '');
                    //console.log('Clasificación', animal.id, '-', cleanedAnimalClass, '-', cleanedArticleClass);
                    if (cleanedAnimalClass === cleanedArticleClass) {
                        return true;
                    }
                    return false;
                });
            };

            const filterWeightRange = (animal) => animal.hip_pes >= minWeight && animal.hip_pes <= maxWeight;
            const filterAgeRange = (animal) => animal.hip_edat >= minAge && animal.hip_edat <= maxAge;

            // Aplicar filtres y ordena els resultats
            function aplicarFiltrosYOrdenar() {
                const resultados = animalsData.map(animal => {
                    const coincidencias = [
                        filterClass(animal),
                        filterWeightRange(animal),
                        filterAgeRange(animal)
                    ].reduce((acc, compleixFiltre) => acc + (compleixFiltre ? 1 : 0), 0);

                    return { ...animal, coincidencias };
                });

                resultados.sort((a, b) => b.coincidencias - a.coincidencias);


                setFilteredAnimalsData(resultados);
            }

            aplicarFiltrosYOrdenar();
        }
    }

    const getRowClass = (coincidencias) => {
        switch (coincidencias) {
            case 3:
                return 'bg-green-100';
            case 2:
                return 'bg-yellow-100';
            case 1:
                return 'bg-red-100';
            default:
                return 'bg-greay-100';
        }
    };

    return (
        <>
            <div className="flex justify-between items-start h-screen p-10 overflow-auto">
                <div className="w-1/6 bg-gray-200 p-4 rounded-lg shadow-lg">
                    <input
                        type="text"
                        placeholder="Buscar artículo"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-4 p-2 border border-gray-300 w-full rounded"
                    />
                    <div className="overflow-auto h-screen ">
                        <ul className="space-y-4 p-4 ">
                            {filteredArticles.map((art, index) => (
                                <li key={index} className="bg-white p-4 rounded-lg shadow">
                                    <button
                                        onClick={() => handleSelect(art)}
                                        className={`flex items-center space-x-2 ${selectedArticles[art.id] ? 'bg-gray-200' : 'bg-white-300 text-black'} hover:bg-gray-200 rounded p-2 w-full`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={!!selectedArticles[art.id]}
                                            onChange={() => { }}
                                        />
                                        <span>{art.id} - {art.name}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold mb-10 text-center">Relación de pesos</h1>
                    <div className="flex justify-center mb-10" ref={dateInputRef}>
                        <input id='date' className="p-3 border rounded-lg" type="date" value={date} onChange={handleDateChange} />
                        <button className="ml-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={handleLoadData}>
                            Cargar datos
                        </button>
                    </div>
                    <SelectedAnimalxArt selectedArticles={selectedArticles} onDataArtsParent={(data) => setDataArtsParent(data)} />
                    <div className='flex flex-wrap justify-between'>
                        <div className="overflow-auto max-h-[600px] mb-10 w-full ">
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="py-2 px-4 border-b">Número Canal</th>
                                        <th className="py-2 px-4 border-b">Edad</th>
                                        <th className="py-2 px-4 border-b">Peso</th>
                                        <th className="py-2 px-4 border-b">Clasificación</th>
                                        <th className="py-2 px-4 border-b">DIB</th>
                                        <th className="py-2 px-4 border-b">Hallal</th>
                                        <th className="py-2 px-4 border-b">Certi1</th>
                                        <th className="py-2 px-4 border-b">Certi2</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAnimalsData.map((animal, index) => (
                                        <tr key={index} className={`hover:bg-gray-100 ${getRowClass(animal.coincidencias)}`}>
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
