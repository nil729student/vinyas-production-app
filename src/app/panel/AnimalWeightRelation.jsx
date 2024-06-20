"use client";
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { animalRelationWeight } from "@/lib/animalDataLoader";
import relaciodepesos from "./relaciodepesos.json";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ArticleWeighing() {
    
    const [chartData, setChartData] = useState({});
    const [chartDataProv, setChartDataProv] = useState({});
    const [animalsData, setAnimalsData] = useState([]);

    const loadData = async () => {
        const data = await animalRelationWeight();
        setAnimalsData(data);

        const labels = data.map(animal => animal.hip_clasabr);
        const weights = data.map(animal => animal.hip_pes);

        setChartData({
            labels,
            datasets: [
                {
                    label: 'Pes per Classificació',
                    data: weights,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }
            ]
        });

        const provData = data.reduce((acc, animal) => {
            const prov = animal.hip_nomproveidor.trim();
            if (!acc[prov]) {
                acc[prov] = 0;
            }
            acc[prov] += animal.hip_pes;
            return acc;
        }, {});

        const labelsProv = Object.keys(provData);
        const weightsProv = Object.values(provData);

        setChartDataProv({
            labels: labelsProv,
            datasets: [
                {
                    label: 'Pes per Proveïdor',
                    data: weightsProv,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                }
            ]
        });
    };

    return (
        <>
            <div>
                <h1>Relació de pesos</h1>
                <input type="date" />
                <button onClick={loadData}>
                    Weighing
                </button>
                <div className="flex justify-center m-10 relative max-h-[600px] overflow-auto">
                    <table>
                        <thead>
                            <tr>
                                <th>Edat</th>
                                <th>Pes</th>
                                <th>Classificació</th>
                                <th>Proveïdor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {animalsData.map((animal, index) => (
                                <tr key={index}>
                                    <td>{animal.hip_edat}</td>
                                    <td>{animal.hip_pes}</td>
                                    <td>{animal.hip_clasabr}</td>
                                    <td>{animal.hip_nomproveidor}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    {chartData.labels && chartData.labels.length > 0 && (
                        <div>
                            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Pes per Classificació' } } }} />
                        </div>
                    )}
                </div>

                <div>
                    {chartDataProv.labels && chartDataProv.labels.length > 0 && (
                        <div>
                            <Bar data={chartDataProv} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Pes per Proveïdor' } } }} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
