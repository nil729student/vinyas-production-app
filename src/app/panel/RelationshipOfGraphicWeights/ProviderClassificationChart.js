"use client";
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ProviderClassificationChart({ data = [] }) {
    const [chartDataProvClass, setChartDataProvClass] = useState({});

    useEffect(() => {
        if (!data || data.length === 0) return;

        // Chart for classification by provider
        const provClassData = data.reduce((acc, animal) => {
            const prov = animal.hip_nomproveidor ? animal.hip_nomproveidor.trim() : '';
            const clas = animal.hip_clasabr ? animal.hip_clasabr : '';
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
    }, [data]);

    return (
        <div className="w-full max-w-5xl mx-auto">
            {chartDataProvClass.labels && chartDataProvClass.labels.length > 0 ? (
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
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
}
