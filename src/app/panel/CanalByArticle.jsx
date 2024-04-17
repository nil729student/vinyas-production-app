"use client"

import React, { useState } from "react";
import ArtList from "./ArtList";

import dataArticles from "./dataArticles.json";


export default function CanalByArticle() {


    return (
        <>
            <h1>Canal by Article</h1>
            <div>
                <div>
                    <ArtList dataArticles={dataArticles} />
                </div>
            </div>

        </>
    )
}