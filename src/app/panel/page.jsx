"use client"

import React, { useState } from "react";
import SwitchAnimalToArticle from "./SwitchAnimalToArticle";
import AnimalWeightRange from "./AnimalWeightRange";
import CanalByArticle from "./CanalByArticle"


export default function panel() {

    const [switchStatus, setSwitchStatus] = useState('animal');

    return(
        <div>
            <h1>Panel de control</h1>
            <SwitchAnimalToArticle switchStatus={switchStatus} setSwitchStatus={setSwitchStatus} />
            {switchStatus === 'article' ? <CanalByArticle /> : null}
            {switchStatus === 'animal' ? <AnimalWeightRange /> : null}
        </div>
    )
}