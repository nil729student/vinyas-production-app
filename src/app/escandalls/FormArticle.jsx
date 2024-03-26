import React, {useState} from "react";

export default function FormArticle({ handleCreateArticle }) {

    const [article, setArticle] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArticle({ ...article, [name]: value });
    }
    const handleSubmit = () => {
        handleCreateArticle(article);
    };

    return (
        <div className="flex-1">
            <div className="h-full border p-4 rounded-lg bg-white flex flex-col justify-between">
                <div>
                    <h4 className="text-lg font-semibold mb-2">Afegir nou article</h4>
                    <ul className="space-y-2">
                        <li><span className="font-semibold">Nom:</span> <input name="name" className="w-full border rounded p-2" type="text" onChange={handleInputChange} /></li>
                        <li><span className="font-semibold">Codi:</span> <input name="art_codi" className="w-full border rounded p-2" type="text" onChange={handleInputChange} /></li>                        
                        <li><span className="font-semibold">Preu:</span> <input name="price" className="w-full border rounded p-2" type="text" onChange={handleInputChange} /></li>
                        <li><span className="font-semibold">Pes kg:</span> <input name="weightKg" className="w-full border rounded p-2" type="number" onChange={handleInputChange} /> </li>
                    </ul>
                    <div className="flex items-center justify-end">
                        <button onClick={handleSubmit} className="text-blue-500 hover:text-blue-700">Afegir</button>
                    </div>
                </div>
            </div>
        </div>
    )
};