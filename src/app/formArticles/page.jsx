"use client"

// pages/index.js
import React, { useState } from 'react';
import SelectSection from './SelectSection';
import ArticleRow from './ArticleRow';
import FormInput from './FormInput';
import { createArticles } from '@/lib/actions';

const formArticles = () => {
    const [section, setSection] = useState('BOLA');
    console.log(section);
    const [formArticles, setFormArticles] = useState({
        animalId: '',
        section: '',
        articles: {
            magre: { unitats: '', unitatsConsum: '', pes: '' },
            grasa: { unitats: '', unitatsConsum: '', pes: '' },
            nervis: { unitats: '', unitatsConsum: '', pes: '' },
            ossos: { unitats: '', unitatsConsum: '', pes: '' },
            altres: { unitats: '', unitatsConsum: '', pes: '' },
            // Pots afegir més tipus d'articles aquí si és necessari
        },
    });

    const handleInputChange = (e, articleType) => {
        const { name, value } = e.target;
        setFormArticles((prevForm) => ({
            ...prevForm,
            articles: {
                ...prevForm.articles,
                [articleType]: {
                    ...prevForm.articles[articleType],
                    [name]: value,
                },
            },
        }));
    };

    const handleAnimalIdChange = (e) => {
        setFormArticles((prevForm) => ({
            ...prevForm,
            animalId: e.target.value,
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
                    name="animalId"
                    type="text"
                    value={formArticles.animalId}
                    onChange={handleAnimalIdChange}
                    placeholder="DIB"
                />


                <SelectSection name="section" section={formArticles.section} setFormSection={handleSectionChange} />




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
                                formArticles={formArticles.articles[article]}
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