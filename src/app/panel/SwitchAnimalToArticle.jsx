"use client"

import React, { useState } from "react";

export default function SwitchAnimalToArticle({ switchStatus, setSwitchStatus }) {

    const handleSwitch = (e) => {
        setSwitchStatus(e.target.value);
    }    

    return (
        <div>
            <fieldset>
                <input type="radio" id="animal" name="switch" value="animal" onChange={handleSwitch} />
                <label htmlFor="animal">Animal</label>
                <input type="radio" id="article" name="switch" value="article" onChange={handleSwitch} />
                <label htmlFor="article">Article</label>
            </fieldset>
        </div>
    )
}