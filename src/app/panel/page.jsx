"use client"

import React, { useState } from "react";
import SwitchAnimalToArticle from "./SwitchAnimalToArticle";
import AnimalWeightRange from "./AnimalWeightRange";
import CanalByArticle from "./CanalByArticle"


export default function panel() {

    const [switchStatus, setSwitchStatus] = useState('animal');

    return(
        <div>
            <div className="flex  p-4">
                <SwitchAnimalToArticle switchStatus={switchStatus} setSwitchStatus={setSwitchStatus} />
            </div>
            {switchStatus === 'article' ? <CanalByArticle /> : null}
            {switchStatus === 'animal' ? <AnimalWeightRange /> : null}
        </div>
    )
}