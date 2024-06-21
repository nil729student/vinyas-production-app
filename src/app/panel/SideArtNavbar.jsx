import React, { useState, useMemo } from 'react';
import { getMaxMinWeightArticles } from "@/lib/articleActions";
import SelectedArticlesListForm from './SelectedArticlesListForm';

const SideArtNavbar = ({ dataArticles, onDataArtsParent }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [dataArtsParent, setDataArtsParent] = useState(null);
    const [selectedArticles, setSelectedArticles] = useState({});

    const filteredAnimals = useMemo(() => {
        return dataArticles.filter((art) =>
            art.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [dataArticles, searchTerm]);

    const handleSelect = async (art) => {
        const weightMaxMin = await getMaxMinWeightArticles(art.id);
        // add in art the max and min weight of the article
        /*
            {
            _count: { _all: 2 },
            _max: { weightKg: 7.8 },
            _min: { weightKg: 7.75 }
            }
        */
        art.counterArts = weightMaxMin._count._all;
        art.weightMax = weightMaxMin._max.weightKg;
        art.weightMin = weightMaxMin._min.weightKg;
        setSelectedArticles(prevState => ({
            ...prevState,
            [art.id]: prevState[art.id] ? undefined : art,
        }));
    }

    // revem les dades del component fill
    const handleDataArtsParent = (data) => {
        setDataArtsParent(data);
    };


    return (
        <div className="w-1/6 bg-gray-200 p-4 rounded-lg shadow-lg">
            <input type="text" placeholder="Buscar article" onChange={(e) => setSearchTerm(e.target.value)} className="mb-4 p-2 border border-gray-300 w-full rounded" />
            <div className="overflow-auto h-screen ">
                <ul className="space-y-4 p-4 ">
                    {filteredAnimals.map((art, index) => (
                        <li key={index} className="bg-white p-4 rounded-lg shadow">
                            <button onClick={() => handleSelect(art)} className={`flex items-center space-x-2 ${selectedArticles[art.id] ? 'bg-gray-200' : 'bg-white-300 text-black'} hover:bg-gray-200 rounded p-2 w-full`}>
                                <input type="checkbox" checked={!!selectedArticles[art.id]} onChange={() => { }} />
                                <span>{art.id} - {art.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <SelectedArticlesListForm selectedArticles={selectedArticles} onDataArtsParent={handleDataArtsParent} />
        </div>
    );
};

export default SideArtNavbar;