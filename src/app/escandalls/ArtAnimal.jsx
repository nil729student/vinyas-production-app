import React, { useContext } from "react";
import { EscandallContext } from "./page";



const ArtAnimal = () => {
    const { selectAnimal } = useContext(EscandallContext);
    const { escandall } = useContext(EscandallContext);

    return (
    <> 

        <h3>Dades animal</h3>
        <div>
            <h3>{selectAnimal.dib}</h3>
            <ul>
                <li>Clasifiacio: <b>{selectAnimal.classificationId}</b></li>
                <li>Edat: <b>{selectAnimal.age}</b> y</li>
                <li>Sexe: <b>{selectAnimal.sexe}</b></li>
                <li>Codi article: <b>{escandall[0].art_codi}</b></li>
                <li>Pes: <b>{escandall[0].weightKg}</b> kg</li>
                <li>Article consumits: <b>{escandall[0].art_codi}</b> - <b>{escandall[0].name}</b>  Unitats : <b>{escandall[0].units}</b></li>
                <li>Preu: <b>?</b></li>
            </ul>

        </div>

    </>
)};

export default ArtAnimal;