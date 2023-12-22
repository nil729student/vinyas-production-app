"use client"

// pages/index.js
import React, { useState, useRef } from 'react';
import SelectSection from './SelectSection';
import ArticleRow from './ArticleRow';
import FormInput from './FormInput';
import { createArticles } from '@/lib/actions';
//import JsBarcode from 'jsbarcode';

const formArticles = () => {
    const [section, setSection] = useState('BOLA');
    const [formArticles, setFormArticles] = useState({
        animalId: '',
        section: '',
        articles: {
            magre: { unitats: '', unitatsConsum: '', pes: '' },
            grasa: { unitats: '', unitatsConsum: '', pes: '' },
            nervis: { unitats: '', unitatsConsum: '', pes: '' },
            ossos: { unitats: '', unitatsConsum: '', pes: '' },
            altres: { unitats: '', unitatsConsum: '', pes: '' },
        
        },
    });

    const handleInputChange = (e, articleType) => {
        const { name, value } = e.target;
        console.log(name, value);


        setFormArticles((prevForm) => ({
            //magre : {unitats: 1, unitatsConsum: 2, pes: 3} 
            ...prevForm,
            articles: {
                ...prevForm.articles,
                [articleType]: {
                    ...prevForm.articles[articleType],
                    [name]: value,
                },
            },

        }));
        
        console.log(formArticles);

    };

    const handleAnimalIdChange = (e) => {
        const codigoBarras = e.target.value;
        // Expresión regular para encontrar la información después de "251" de este numero: "+C191210807251ES010905303165" el valor que retorna es: "ES010905303165"
        const regex = /251(.+)/;
        const resultado = codigoBarras.match(regex);
        // Obtener la información deseada o dejar el valor original si no hay coincidencia tambíen retornara un error si no hay coincidencia
        const dib = resultado ? resultado[1] : console.error('No se ha encontrado la información deseada');
    
        // Actualizar el estado con la información deseada
        setFormArticles((prevForm) => ({
            ...prevForm,
            animalDib: dib,
        }));
    };

    const handleSectionChange = (e) => {
        setFormArticles((prevForm) => ({
            ...prevForm,
            section: section,
        }));
    };

    const articles = ['magre', 'grasa', 'nervis', 'ossos', 'altres'];

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form action={createArticles} className=" shadow-md rounded bg-white px-8 pt-6 pb-8 mb-4 w-full md:w-1/2 lg:w-1/3">
                <FormInput
                    label="Identificador d'animal (DIB)"
                    name="animalDib"
                    type="text"
                    value={formArticles.animalDib}
                    onChange={handleAnimalDibChange}
                    placeholder="DIB"
                />


                <SelectSection name="section" section={formArticles.section} setFormSection={handleSectionChange} />
                {/*pes de la secció*/}
                <FormInput
                    label="Pes de la secció (kg)"
                    name="pes"
                    type="number"
                    value={formArticles.pes}
                    onChange={handleInputChange}
                    placeholder="Pes"
                />


                <table className="w-full mb-4">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Nom Article</th>
                            <th className="border px-4 py-2">Unitats del article</th>
                            <th className="border px-4 py-2">Unitats Consum de l'article</th>
                            <th className="border px-4 py-2">Pes de l'article (kg)</th>
                        </tr>
                    </thead>

                    <tbody>
                        {articles.map((article) => (
                            <ArticleRow
                                key={article}
                                article={article}
                                formArticles={formArticles.articles}
                                handleInputChange={(e) => handleInputChange(e, article)}
                            />
                        ))}
                    </tbody>
                </table>

                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Envia formulari
                    </button>
                </div>
            </form>
        </div>
    );
};

export default formArticles;
