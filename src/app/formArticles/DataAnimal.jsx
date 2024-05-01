import React from 'react';

const DataAnimal = ({ dib, onBolaClick, onBlocClick, onFaldaClick, onDevantClick, onSelectClick }) => {
    // when the buton slecciona is clicked, the dib is set in the formArticles state get data from the animal by dib

    

    return (
        <div className=" m-4 w-full md:w-1/4 lg:w-5/6 p-4 bg-gray-400 rounded">
            <h2 className="text-lg font-semibold mb-4">Data Animal</h2>
            <p>
                <strong>DIB:</strong> {dib}
            </p>
            <div className="mt-4 flex">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={onSelectClick}
                >
                    Selecciona
                </button>

            </div>
        </div>
    );
};

export default DataAnimal;
