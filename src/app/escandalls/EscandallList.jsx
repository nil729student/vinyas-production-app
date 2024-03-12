import React, { useContext, useState } from "react";
import ArtAnimal from "./ArtAnimal";
import ArtQuater from "./ArtQuater";
import { EscandallContext } from "./page";



const EscandallList = () => {
    const { escandall } = useContext(EscandallContext);
    const [viewQuarters, setviewQuarters] = useState(false);

    return (
        <div>
            <h2 className="text-2xl mb-4">Escandall</h2>

            <div>
                <ArtAnimal />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setviewQuarters(!viewQuarters)}
                >
                    {viewQuarters ? 'Oculta quarters' : 'Mostrar quarters'}
                </button>
                { viewQuarters && escandall[0].children.map((quart) => ( 
                    <ArtQuater key={quart.id} quart={quart} />
                ))}

            </div>

        </div>
    );
}

export default EscandallList;



