"use client";
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ProviderWeightChart({ data = [] }) {
    const [chartDataProv, setChartDataProv] = useState({});

    useEffect(() => {
        if (!data || data.length === 0) return;

        // Chart for weight per provider
        const provData = data.reduce((acc, animal) => {
            const prov = animal.hip_nomproveidor?.trim();
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
    }, [data]);

    return (
        <div className="w-full max-w-5xl mx-auto">
            {chartDataProv.labels && chartDataProv.labels.length > 0 ? (
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
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
}
