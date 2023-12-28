"use client"

// pages/index.js
import React, { useState, useRef } from 'react';
import SelectSection from './SelectSection';
import ArticleRow from './ArticleRow';
import FormInput from './FormInput';
import { createArticles } from '@/lib/actions';

const formArticles = () => {

    const initialArticle = {
        nom: 'a',
        unitats: '',
        unitatsConsum: '',
        pes: '',
    };

    const initialFormState = {
        animalDib: '',
        section: '',
        articles: [initialArticle],
    };


    const [section, setSection] = useState('BOLA');
    const [formArticles, setFormArticles] = useState(initialFormState);
    const ref = useRef(null);

    const handleAnimalDibChange = (e) => {
        setFormArticles((prevForm) => ({
            ...prevForm,
            animalDib: e.target.value,
        }));
    };

    const handleSectionChange = (e) => {
        setFormArticles((prevForm) => ({
            ...prevForm,
            section: section,
            weightKgSection: e.target.value,

        }));
    };

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



    const articles = ['magre', 'grasa', 'nervis', 'ossos', 'altres'];

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form ref={ref} action={ async fetchData =>{
                ref.current.reset();
                const res = await createArticles(formArticles);
                console.log(res);
            }} className=" shadow-md rounded bg-wite px-8 pt-6 pb-8 mb-4 w-full md:w-1/2 lg:w-1/3">

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
                    name="weightKgSection"
                    type="number"
                    value={formArticles.pes}
                    onChange={handleSectionChange}
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
