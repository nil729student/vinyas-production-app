"use client"

import React, { useState } from "react";
import SwitchAnimalToArticle from "./SwitchAnimalToArticle";
import AnimalWeightRange from "./AnimalWeightRange";
import CanalByArticle from "./CanalByArticle"
import { motion, AnimatePresence } from "framer-motion";


export default function panel() {
    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleSelect = (component) => {
        setSelectedComponent(component);
    }

    const handleClose = () => {
        setSelectedComponent(null);
    }

    return (
        <div>
            <div className="flex justify-center items-center h-screen space-x-4">
                <div
                    onClick={() => handleSelect('AnimalWeightRange')}
                    className="cursor-pointer bg-indigo-500 text-white px-8 py-4 rounded-lg hover:bg-indigo-600"
                >
                    Animal a Peça
                </div>
                <div
                    onClick={() => handleSelect('CanalByArticle')}
                    className="cursor-pointer bg-pink-500 text-white px-8 py-4 rounded-lg hover:bg-pink-600"
                >
                    Comanda a Canal
                </div>
            </div>
            <AnimatePresence>
                {selectedComponent && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed top-16 left-0 w-full h-full bg-white flex flex-col items-center justify-center"
                    >
                        <button onClick={handleClose} className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 px-4 hover:bg-red-600">X</button>
                        {selectedComponent === 'AnimalWeightRange' && <AnimalWeightRange />}
                        {selectedComponent === 'CanalByArticle' && <CanalByArticle />}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}