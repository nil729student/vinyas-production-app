"use client"

import React, { useState } from "react";
import ArtList from "./ArtList";

import dataArticles from "./dataArticles.json";


export default function CanalByArticle() {


    return (
        <>
            <div>
                <div>
                    <ArtList dataArticles={dataArticles} />
                </div>
            </div>

        </>
    )
}