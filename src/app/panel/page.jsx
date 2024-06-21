"use client"

import React, { useState } from "react";
import SwitchAnimalToArticle from "./SwitchAnimalToArticle";
import AnimalWeightRange from "./AnimalWeightRange";
import CanalByArticle from "./CanalByArticle";
import AnimalWeightRelation from "./AnimalWeightRelation";
import AnimalWeightRelationPeca from "./AnimalWeightRelationPeca.jsx";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function panel() {
    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleSelect = (component) => {
        setSelectedComponent(component);
    }

    const handleClose = () => {
        setSelectedComponent(null);
    }

    return (
        <div >
            <div className="flex justify-center items-center h-screen space-x-8 overflow-auto">
                <div
                    onClick={() => handleSelect('AnimalWeightRange')}
                    className="cursor-pointer  bg-color-nav text-white px-20 py-24 rounded-lg hover:bg-gray-700 border-4 border-color-secondary-vinas"
                >
                    <Image
                        src="/vaca.png"
                        width={150}
                        height={150}
                        alt="Vaca imatge"
                    />
                    <span className="flex justify-center"> Animal a Peça</span>
                </div>
                <div
                    onClick={() => handleSelect('CanalByArticle')}
                    className="cursor-pointer bg-color-nav text-white px-20 py-24 rounded-lg hover:bg-gray-700 border-4 border-color-secondary-vinas"
                >
                    <Image
                        src="/comanda.png"
                        width={150}
                        height={150}
                        alt="comanda imatge"
                    />
                    <span className="flex justify-center">Comanda a Canal</span>
                </div>
                <div
                    onClick={() => handleSelect('AnimalWeightRelation')}
                    className="cursor-pointer bg-color-nav text-white px-20 py-24 rounded-lg hover:bg-gray-700 border-4 border-color-secondary-vinas"
                >
                    <Image
                        src="/comanda.png"
                        width={150}
                        height={150}
                        alt="comanda imatge"
                    />
                    <span className="flex justify-center">Relacio de pesos</span>
                </div>

                <div
                    onClick={() => handleSelect('AnimalWeightRelationPeca')}
                    className="cursor-pointer bg-color-nav text-white px-20 py-24 rounded-lg hover:bg-gray-700 border-4 border-color-secondary-vinas"
                >
                    <Image
                        src="/comanda.png"
                        width={150}
                        height={150}
                        alt="comanda imatge"
                    />
                    <span className="flex justify-center">Relacio de pesos a peça</span>
                </div>


            </div>
            <div className="flex-1 relative bg-gray-100 p-8 ">
                <AnimatePresence>
                    {selectedComponent && (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center"
                        >
                            <button onClick={handleClose} className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 px-4 hover:bg-red-600">X</button>
                            {selectedComponent === 'AnimalWeightRange' && <AnimalWeightRange />}
                            {selectedComponent === 'CanalByArticle' && <CanalByArticle />}
                            {selectedComponent === 'AnimalWeightRelation' && <AnimalWeightRelation />}
                            {selectedComponent === 'AnimalWeightRelationPeca' && <AnimalWeightRelationPeca />}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}