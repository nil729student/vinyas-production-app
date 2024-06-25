"use client";
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ClassificationWeightChart({ data = [] }) {  // Usar un valor por defecto para data
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        if (data.length === 0) return;  // Verificar si data está vacío

        // Agrupar los datos por clasificación y sumar los pesos
        const groupedData = data.reduce((acc, animal) => {
            if (!acc[animal.hip_clasabr]) {
                acc[animal.hip_clasabr] = 0;
            }
            acc[animal.hip_clasabr] += animal.hip_pes;
            return acc;
        }, {});

        const labels = Object.keys(groupedData);
        const weights = Object.values(groupedData);

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
    }, [data]);

    return (
        <div className="w-full max-w-5xl mx-auto">
            {chartData.labels && chartData.labels.length > 0 ? (
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
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
}
 