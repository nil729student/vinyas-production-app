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
    const [chartDataProvClass, setChartDataProvClass] = useState({});
    const [animalsData, setAnimalsData] = useState([]);

    const loadData = async () => {
        const data = await animalRelationWeight();
        setAnimalsData(data);

        // Chart for weight per classification
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

        // Chart for weight per provider
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

        // Chart for classification by provider
        const provClassData = data.reduce((acc, animal) => {
            const prov = animal.hip_nomproveidor.trim();
            const clas = animal.hip_clasabr;
            if (!acc[prov]) {
                acc[prov] = {};
            }
            if (!acc[prov][clas]) {
                acc[prov][clas] = 0;
            }
            acc[prov][clas] += animal.hip_pes;
            return acc;
        }, {});

        const labelsProvClass = Object.keys(provClassData);
        const classLabels = [...new Set(data.map(animal => animal.hip_clasabr))];
        const datasetsProvClass = classLabels.map(clas => {
            return {
                label: `Pes per Classificació - ${clas}`,
                data: labelsProvClass.map(prov => provClassData[prov][clas] || 0),
                backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
                borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
                borderWidth: 1,
            };
        });

        setChartDataProvClass({
            labels: labelsProvClass,
            datasets: datasetsProvClass,
        });
    };

    return (
        <>
            <div className="p-10 overflow-auto">
                <h1 className="text-4xl font-bold mb-10 text-center">Relació de pesos</h1>
                <div className="flex justify-center mb-10">
                    <input type="date" className="p-3 border rounded-lg" />
                    <button className="ml-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={loadData}>
                        Weighing
                    </button>
                </div>
                <div className='flex flex-wrap justify-between'>
                    <div className="overflow-auto max-h-[600px] mb-10 w-full md:w-1/4">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-2 px-4 border-b">Edat</th>
                                    <th className="py-2 px-4 border-b">Pes</th>
                                    <th className="py-2 px-4 border-b">Classificació</th>
                                    <th className="py-2 px-4 border-b">Proveïdor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {animalsData.map((animal, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border-b">{animal.hip_edat}</td>
                                        <td className="py-2 px-4 border-b">{animal.hip_pes}</td>
                                        <td className="py-2 px-4 border-b">{animal.hip_clasabr}</td>
                                        <td className="py-2 px-4 border-b">{animal.hip_nomproveidor}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mb-10 w-full md:w-1/2 lg:w-2/3">
                        {chartData.labels && chartData.labels.length > 0 && (
                            <div className="w-full max-w-5xl mx-auto">
                                <Bar
                                    data={chartData}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: { position: 'top' },
                                            title: { display: true, text: 'Pes per Classificació' }
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="mb-10 w-full md:w-1/2 lg:w-2/3">
                        {chartDataProv.labels && chartDataProv.labels.length > 0 && (
                            <div className="w-full max-w-5xl mx-auto">
                                <Bar
                                    data={chartDataProv}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: { position: 'top' },
                                            title: { display: true, text: 'Pes per Proveïdor' }
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="mb-10 w-full md:w-1/2 lg:w-2/3">
                        {chartDataProvClass.labels && chartDataProvClass.labels.length > 0 && (
                            <div className="w-full max-w-5xl mx-auto">
                                <Bar
                                    data={chartDataProvClass}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: { position: 'top' },
                                            title: { display: true, text: 'Classificació per Proveïdor' }
                                        },
                                        scales: {
                                            x: { stacked: true },
                                            y: { stacked: true }
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
