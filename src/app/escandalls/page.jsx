"use client";
import React, { useMemo, useState, useEffect } from 'react';
import { getAllAnimals } from '@/lib/animalActions';

const AnimalList = () => {
    const [animals, setAnimals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <input type="text" placeholder="Buscar animal" onChange={handleSearch} />
            <ul>
                {filteredAnimals.map((animal) => (
                    <li key={animal.id}>
                        {animal.dib} - <button>mostra detall</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AnimalList;