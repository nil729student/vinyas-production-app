import React, { useContext } from "react";
import { EscandallContext } from "./page";



const ArtAnimal = () => {
    const { selectAnimal } = useContext(EscandallContext);
    const { escandall } = useContext(EscandallContext);

    return (
        <div className="p-4 rounded-lg  bg-bg-secondary">
            <h3 className="text-xl font-bold mb-2 text-gray-800">Dades animal</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="font-semibold text-gray-700">DIB: {selectAnimal.dib}</p>
                    <p className="font-semibold text-gray-700">Clasificació: {selectAnimal.classificationId}</p>
                    <p className="font-semibold text-gray-700">Edat: {selectAnimal.age}</p>
                    <p className="font-semibold text-gray-700">Sexe: {selectAnimal.sexe}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Codi article: {escandall[0].art_codi}</p>
                    <p className="font-semibold text-gray-700">Pes: {escandall[0].weightKg} kg</p>
                    <p className="font-semibold text-gray-700">Article consumit: {escandall[0].art_codi} - {escandall[0].name}</p>
                    <p className="font-semibold text-gray-700">Unitats: {escandall[0].units}</p>
                    <p className="font-semibold text-gray-700">Preu: ?</p>
                </div>
            </div>
        </div>
    );
};

export default ArtAnimal;