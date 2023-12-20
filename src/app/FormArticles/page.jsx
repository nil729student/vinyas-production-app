"use client"
// pages/index.js
import React from 'react';
import { useState } from 'react';

const FormArticles = () => {
    const [section, setSection] = useState('BOLA');

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-1/2 lg:w-1/3">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="animalId">
                        Identificador d'animal (DIB)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700   focus:shadow-outline"
                        id="animalId"
                        type="text"
                        placeholder="DIB"
                    />
                </div>

                {/* Apartat Bola */}
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-2">Selecciona l'apartat</h2>

                    {/* Camp de selecció per a l'apartat */}
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                    >
                        <option value="BOLA">BOLA</option>
                        <option value="BLOC">BLOC</option>
                        <option value="FALDA">FALDA</option>
                        <option value="DAVANT">DAVANT</option>
                    </select>
                </div>

                {/* Graella per a l'apartat Bola */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                    {/* Capçalera de la taula */}
                    <div className="font-bold">ARTICLE</div>
                    <div className="font-bold">UNITATS</div>
                    <div className="font-bold">UNITATS CONSUM</div>
                    <div className="font-bold">PES</div>
                    {/* MAGRO */}
                    <div className="font-bold">MAGRO</div>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Unitats"
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Unitats de consum"
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Pes (g)"
                    />

                    {/* GRASA */}
                    <div className="font-bold">GRASA</div>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Unitats"
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Unitats de consum"
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Pes (g)"
                    />

                    {/* NERVIOS */}
                    <div className="font-bold">NERVIS</div>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Unitats"
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Unitats de consum"
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Pes (g)"
                    />

                    {/* OSSO */}
                    <div className="font-bold">OSSO</div>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Unitats"
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Unitats de consum"
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Pes (g)"
                    />

                    {/* ALTRES */}
                    <div className="font-bold">Altres</div>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Unitats"
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Unitats de consum"
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Pes (g)"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        Envia formulari
                    </button>
                </div>
            </form >
        </div >
    );
};

export default FormArticles;
