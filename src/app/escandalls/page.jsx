"use client";
import React, { useMemo, useState, useEffect } from 'react';
import { getAllAnimals } from '@/lib/animalActions';
import { handlerEscandallbyAnimal } from '@/lib/escandallActions';
import EscandallList from './EscandallList';

const AnimalList = () => {
    const [animals, setAnimals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDetall, setShowDetall] = useState(false);
    const [escandall, setEscandall] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedAnimals = await getAllAnimals();
                setAnimals(fetchedAnimals);
            } catch (error) {
                console.error('Error fetching animals:', error);
            }
        };

        fetchData();

    }, []);

    const filteredAnimals = useMemo(() => {
        return animals.filter((animal) =>
            animal.dib.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [animals, searchTerm]);

    // on set detall true, fetch escandall by animalId


    const handleDetall = async (animalId) => {
        try {
            const fetchedEscandall = await handlerEscandallbyAnimal(animalId);
            setEscandall(fetchedEscandall);
            setShowDetall(!showDetall);
        } catch (error) {
            console.error('Error fetching escandall:', error);
        }
    };



    return (
        <div className="flex">
            <div className="w-1/6 justify-center bg-gray-200 p-4 ">
                <input type="text" placeholder="Buscar animal" onChange={(e) => setSearchTerm(e.target.value)} className="mb-4 p-2 border border-gray-300 w-full rounded" />
                <ul>
                    {filteredAnimals.map((animal) => (
                        <li key={animal.id} className="mb-2">
                            <button onClick={() => handleDetall(animal.id)} className="p-2 bg-slate-300 hover:bg-slate-400 text-black rounded mx-auto flex items-center justify-center w-full ">{animal.dib}</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-3/4 p-4">
                {showDetall && <EscandallList escandall={escandall} />}
            </div>
        </div>
    );
};

export default AnimalList;