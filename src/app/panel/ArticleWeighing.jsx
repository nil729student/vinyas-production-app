"use client"

import {fetchDespieceAuto} from "@/lib/PonderacioActions/articlesAuto";   

export default function ArticleWeighing() {
    const handleFechdata = async () => {
        const res = await fetchDespieceAuto();
        console.log(res);
    }

    return  (
        <>
            <div>
                <h1>Article Weighing</h1>

                <button onClick={handleFechdata}>
                    Weighing
                </button>

            </div>
        </>
    )
}