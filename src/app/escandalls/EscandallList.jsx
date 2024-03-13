import React, { useContext, useState } from "react";
import { handlerPercentatgeArticle } from "@/lib/escandallActions";
import ArtAnimal from "./ArtAnimal";
import ArtQuater from "./ArtQuater";
import { EscandallContext } from "./page";



const EscandallList = () => {
    const { escandall } = useContext(EscandallContext);
    const [viewQuarters, setviewQuarters] = useState(false); 


    return (
        <div className="  " >
            <h2 className="text-2xl mb-4">Escandall</h2>
            <div className=" justify-center items-center">
                <div className="p-4 bg-white shadow-md rounded-lg overflow-hidden">
                    <ArtAnimal />

                    <button
                        className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setviewQuarters(!viewQuarters)}
                    >
                        {viewQuarters ? 'Oculta' : 'Mostrar'}
                    </button>
                </div>
            </div>

            {viewQuarters && (
                <div className="mt-4">
                    {escandall[0].children.map((quart) => (
                        <ArtQuater key={quart.id} quart={quart} />
                    ))}
                </div>
            )}

        </div>

    );
}

export default EscandallList;



