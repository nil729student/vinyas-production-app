import React, { useState } from "react";
//import updateArticle from "@/lib/updateArticle";

const ArtList = ({ article }) => {
    const [editMode, seteditMode] = useState({});// Definm el objecte que volem editar amb el id i el camp que volem editar exmple: {1: {price: 10}, 2: {price: 20}}
    console.log(editMode);
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
        // Aquí puedes agregar lógica para guardar los cambios en el estado global o enviarlos al servidor
        // Por ahora, solo imprimir el artículo editado en la consola
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
                                                    type="text" 
                                                    value={editMode[art.id].art_codi || art.art_codi} 
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
                                                    type="text" 
                                                    value={editMode[art.id].price || art.price} 
                                                    onChange={(e) => handleEdit(art.id, 'price', e.target.value)} /> 
                                            : art.price
                                        }
                                    </li>
                                    <li><span className="font-semibold">Pes:</span> 
                                        {
                                        editMode[art.id] ? 
                                            <input 
                                                type="number" 
                                                value={ editMode[art.id].weightKg || art.weightKg} 
                                                onChange={(e) => handleEdit(art.id, 'weightKg', e.target.value)} 
                                                /> 
                                        : art.weightKg} kg</li>
                                    <li><span className="font-semibold">Percentatge:</span> <span>{art.percent}%</span></li>
                                </ul>
                                <div className="flex items-center justify-end space-x-2">
                                    {editMode[art.id] ? (
                                        <button onClick={() => handleSave(art.id)} className="bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Guardar</button>
                                    ) : (
                                        <button onClick={() => seteditMode(prevState => ({ ...prevState, [art.id]: {} }))} className="text-blue-500 hover:text-blue-700">Edit</button>
                                    )}
                                    <button onClick={() => updateArticle(art.id)} className="text-gray-400 hover:text-red-700">Cancel</button>
                                    <button onClick={() => updateArticle(art.id)} className="text-red-500 hover:text-red-700">Delete</button>
                                </div>
                            </div>
                            {/* Crea un espai buit si no hi ha un article correspon */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArtList;