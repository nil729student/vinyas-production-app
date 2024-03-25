import React, { useState } from "react";
import { updateArticle } from "@/lib/articleActions";

const ArtList = ({ article }) => {
    const [editMode, seteditMode] = useState({});// Definm el objecte que volem editar amb el id i el camp que volem editar exmple: {1: {price: 10}, 2: {price: 20}}
    const handleEdit = (id, field, value) => {
        // construim l'objecte 
        seteditMode(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                [field]: value,
              
            }
        }));
    };

    const handleSave = (id) => {
        //  Afegir lògica per desar els canvis a l'estat global o enviar-los al servidor
        updateArticle(editMode[id], id);
        console.log("Artículo editado:", editMode[id]);
        seteditMode(prevState => ({
            ...prevState,
            [id]: undefined
        }));
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Article</h3>
            <div className="grid grid-cols-4 gap-4">
                {article.map((art) => (
                    <div key={art.id} className="flex-1">
                        <div className="h-full border p-4 rounded-lg bg-white flex flex-col justify-between">
                            <div>
                                <h4 className="text-lg font-semibold mb-2">{art.name}</h4>
                                <ul className="space-y-2">
                                    <li><span className="font-semibold">Codi:</span>
                                        {
                                            editMode[art.id] ? 
                                                <input 
                                                    className="w-full border rounded p-2"
                                                    type="text" 
                                                    value={editMode[art.id].art_codi ?? art.art_codi} 
                                                    onChange={(e) => handleEdit(art.id, 'art_codi', e.target.value)}
                                                 /> 
                                            : art.art_codi
                                        }
                                    </li>
                                    <li><span className="font-semibold">Lot:</span> <span>{art.lot}</span></li>
                                    <li><span className="font-semibold">Preu:</span> 
                                        {
                                            editMode[art.id] ? 
                                                <input 
                                                    className="w-full border rounded p-2"
                                                    type="text" 
                                                    value={editMode[art.id].price ?? art.price} 
                                                    onChange={(e) => handleEdit(art.id, 'price', e.target.value)} />
                                            : art.price
                                        }
                                    </li>
                                    <li><span className="font-semibold">Pes:</span> 
                                        {
                                        editMode[art.id] ? 
                                            <input 
                                                className="w-full border rounded p-2"
                                                type="number" 
                                                value={ editMode[art.id].weightKg ?? art.weightKg}  
                                                onChange={(e) => handleEdit(art.id, 'weightKg', e.target.value)} 
                                                /> 
                                        : art.weightKg} kg</li>
                                    <li><span className="font-semibold">Percentatge:</span> <span>{art.percent}%</span></li>
                                </ul>
                                <div className="flex items-center justify-end space-x-2">
                                    {editMode[art.id] ? (
                                        <>
                                            <button onClick={() => seteditMode((prevState) =>({ ...prevState, [art.id]: undefined }))} className="text-gray-500 hover:gray-red-700">Cancel</button>
                                            <button onClick={() => handleSave(art.id)} className="text-blue-500 hover:text-blue-700">Guardar</button>
                                        </>
                                    ) : (
                                        <button onClick={() => seteditMode(prevState => ({ ...prevState, [art.id]: {} }))} className="text-blue-500 hover:text-blue-700">Edit</button>
                                    )}
                                    <button onClick={() => updateArticle(art.id)} className="text-red-500 hover:text-red-700">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArtList;