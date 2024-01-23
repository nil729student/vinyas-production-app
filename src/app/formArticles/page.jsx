"use client"

// pages/index.js
import React, { useState, useRef, useEffect } from 'react';
import SelectSection from './SelectSection';
import ArticleRow from './ArticleRow';
import FormInput from './FormInput';
import DataAnimal from './DataAnimal';
import { createArticles, getArticlesByParentId, getArticlesByAnimalId } from '@/lib/actions';
import { getAllAnimals } from '@/lib/animalActions';

const formArticles = () => {

    const [animalDib, setAnimalDib] = useState('');

    const initialFormState = {
        animalDib: '',
        section: '',
        articles: [],
    };

    const [articlesData, setArticlesData] = useState([]);
    const [section, setSection] = useState('DEVANT');
    const [formArticles, setFormArticles] = useState(initialFormState);
    const [editMode, setEditMode] = useState(false);

    const ref = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedAnimals = await getAllAnimals();
                setArticlesData(fetchedAnimals);
            } catch (error) {
                console.error('Error fetching animals:', error);
            }
        };

        fetchData();
    }, []);

    const handleAnimalDibChange = (e) => {
        setFormArticles((prevForm) => ({
            ...prevForm,
            animalDib: e.target.value,
        }));
    };

    const handleSectionChange = (e) => {
        const { name, value } = e.target;
        setFormArticles((prevForm) => ({
            ...prevForm,
            section: section,
            [name]: value, // name: e.target.value
        }));

        if (editMode) {
            
        }


    };

    const handleInputChange = (e, articleType) => {
        const { name, value } = e.target;
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

    };

    const getSection = (sections, sectionName) => {
        return sections.find(element => element.name === sectionName);
    };

    const handleSelectClick = async (animalDib) => {
        try {
            const resAnimalSections = await getArticlesByAnimalId(animalDib);
            //const filteredSection = getSection(resAnimalSections, section);  
            const filteredSection = resAnimalSections.find(element => element.name === section)

            console.log(filteredSection);

            //console.log(resAnimalSections.find(element => element.name === section));
            //console.log(filteredSection.weightKg);
            
            setFormArticles((prevForm) => ({
                ...prevForm,
                animalDib: animalDib,
                section: section, // Update the section value with the filtered section's name
                //weightKgSection: filteredSection.weightKg,
            }));

            setEditMode(true);

        } catch (error) {
            console.error(error);
        }
    };



    // if the edit mode is true, when the section is changed, the articles of the section are loaded
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (editMode) {
                    const resAnimalSections = await getArticlesByAnimalId(formArticles.animalDib);
                    const filteredSection = getSection(resAnimalSections, section);
                    const resArticles = await getArticlesByParentId(filteredSection);
                    console.log(resArticles);

                    setFormArticles((prevForm) => ({
                        ...prevForm,
                        articles: resArticles,
                    }));

                }
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchData();
    }, [section]);



    const getArticlesBySection = (section) => {
        switch (section) {
            case 'BOLA':
                return ['retall', 'magre', 'nervis aquiles', 'ossos', 'greix', 'aponebrosi'];
            case 'BLOC':
                return ['retall', 'magre', 'nervis', 'ossos', 'greix'];
            case 'FALDA':
                return ['retall', 'magre', 'nervi vacio', 'nervi pla', 'ossos', 'greix', 'aponebrosi'];
            case 'DEVANT':
                return ['retall', 'magre', 'nervis', 'ossos', 'greix', 'T5', 'aponebrosi'];
            default:
                return ['retall', 'magre', 'nervis', 'ossos', 'greix', 'altres'];
        }
    };
    
    // Usage
    const articles = getArticlesBySection(section);

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <form ref={ref} action={async fetchData => {
                ref.current.reset();
                const res = await createArticles(formArticles);
                console.log(res);
            }} className="m-10 shadow-md rounded bg-white px-8 pt-6 pb-8 mb-4 w-full md:w-1/2 lg:w-1/3">

                <FormInput
                    label="Identificador d'animal (DIB)"
                    name="animalDib"
                    type="text"
                    value={formArticles.animalDib}
                    onChange={handleAnimalDibChange}
                    placeholder="DIB"
                />

                <SelectSection name="section" section={section} onChange={handleSectionChange} setFormSection={setSection} />

                {/*pes de la secció*/}
                <FormInput
                    label="Pes de la secció (kg)"
                    name="weightKgSection"
                    type="number"
                    value={formArticles.weightKgSection}// {formArticles.pes}
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
                        
                    {editMode ? (
                        <>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Actualitza formulari
                            </button>
                            
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Cancel·la
                            </button>
                        </>

                    ) : (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Envia formulari
                        </button>
                    )
                    }
                </div>
            </form>

            <div className="">
                {articlesData.map((animal) => (
                    <DataAnimal
                        key={animal.dib}
                        dib={animal.dib}
                        onSelectClick={() => handleSelectClick(animal.dib)}
                    // TODO: handleBolaClick, handleBlocClick, handleFaldaClick, handleDevantClick
                    /*
                    onBolaClick={handleBolaClick}
                    onBlocClick={handleBlocClick}
                    onFaldaClick={handleFaldaClick}
                    onDevantClick={handleDevantClick}
                    */
                    />
                ))}
            </div>
        </div>
    );
};

export default formArticles;
