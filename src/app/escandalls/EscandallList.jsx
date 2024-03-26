import React, { useContext, useState } from "react";
import { handlerPercentatgeArticle } from "@/lib/escandallActions";
import ArtAnimal from "./ArtAnimal";
import ArtQuater from "./ArtQuater";
import { EscandallContext } from "./page";



const EscandallList = () => {
    const { escandall } = useContext(EscandallContext);
    const [viewQuarters, setViewQuarters] = useState(false); 


    return (
        <>
        <h2 className="text-2xl mb-4">Escandall</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden " >
            
            <div className=" justify-center items-center">
                <div className=" p-4">
                    <ArtAnimal />
                </div>
                <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 mb-4"
                        onClick={() => setViewQuarters(!viewQuarters)}
                    >
                        {viewQuarters ? 'Oculta' : 'Mostrar'}
                </button>
            </div>

            {viewQuarters && (
                <div className="m-4">
                    {escandall[0].children.map((quart) => (
                        <ArtQuater key={quart.id} quart={quart} />
                    ))}
                </div>
            )}
        </div>
        </>

    );
}

export default EscandallList;



