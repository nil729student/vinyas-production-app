import React from 'react';

const DataAnimal = ({ dib, onBolaClick, onBlocClick, onFaldaClick, onDevantClick }) => {
    return (
        <div className=" w-full md:w-1/4 lg:w-2/6 p-4 bg-gray-400 p-4 rounded">
            <h2 className="text-lg font-semibold mb-4">Data Animal</h2>
            <p>
                <strong>DIB:</strong> {dib}
            </p>
            <div className="mt-4 flex">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={onBolaClick}
                >
                    Bola
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={onBlocClick}
                >
                    Bloc
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={onFaldaClick}
                >
                    Falda
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onDevantClick}
                >
                    Devant
                </button>
            </div>
        </div>
    );
};

export default DataAnimal;
