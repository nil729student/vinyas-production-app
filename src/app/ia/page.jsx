"use client"
import {fetchDespieceAuto} from '@/lib/PonderacioActions/articlesAuto';
export default function Page() {

    const fetchDespiece = async () => {
        await fetchDespieceAuto();
    }

    return (
        <div>
            <h1>Experimental IA</h1>
            <p> Prediccions sobre les nostres dades</p>
            <button className='bg-color-button hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' onClick={fetchDespiece}>Previsió de pes</button>

        </div>
    )
}