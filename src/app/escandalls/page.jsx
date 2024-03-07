"use client";
import React, { useMemo, useState, useEffect } from 'react';
import { getAllAnimals } from '@/lib/animalActions';
import { handlerEscandallbyAnimal } from '@/lib/escandallActions';

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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


    // on set detall true, fetch escandall by animalId
    
    
    const handleDetall = async (animalId) => {
        try {
          const fetchedEscandall = await handlerEscandallbyAnimal(animalId);
          setEscandall(fetchedEscandall);
          setShowDetall(true); // Muestra los detalles
        } catch (error) {
          console.error('Error fetching escandall:', error);
        }
      };
    const toggleDetall = () => {
        setShowDetall(!showDetall); // Cambia el estado de showDetall cada vez que se hace clic en el botón
      };



    return (
        <div>
            <input type="text" placeholder="Buscar animal" onChange={toggleDetall} />
            <ul>
            {showDetall && escandall && (
                <div>
                    <h2>Detall</h2>
                    <ul>
                        {escandall.map((article) => (
                            <li key={article.id}>{escandall}</li>
                        ))}
                    </ul>
                </div>
            )}
                {filteredAnimals.map((animal) => (
                    <li key={animal.id}>
                        <button onClick={() => handleDetall(animal.id)}>{animal.dib}</button>
                    </li>
                )

            )}
            </ul>
        </div>
    );
};

export default AnimalList;