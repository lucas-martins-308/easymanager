import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import "./index.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const generateMonthlyData = (month) => {
    const totalFaturamento = 25987;
    const daysInMonth = new Date(2024, month, 0).getDate();
    const labels = Array.from({ length: daysInMonth }, (_, i) => `Dia ${String(i + 1).padStart(2, "0")}`);
    const dailyRevenue = Array.from({ length: daysInMonth }, () =>
        Math.round(Math.random() * (totalFaturamento / daysInMonth) + 400)
    );
    return { labels, dailyRevenue, totalFaturamento };
};

const Financial = () => {
    const [selectedMonth, setSelectedMonth] = useState("2024-12");
    const [chartData, setChartData] = useState(generateMonthlyData(12));

    const handleMonthChange = (event) => {
        const month = event.target.value.split("-")[1];
        setSelectedMonth(event.target.value);
        setChartData(generateMonthlyData(parseInt(month, 10)));
    };

    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: "Faturamento Total (R$)",
                data: chartData.dailyRevenue,
                backgroundColor: "#36A2EB",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: `Faturamento Total: R$ ${chartData.totalFaturamento.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                })}`,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Dias do Mês",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Faturamento (R$)",
                },
            },
        },
    };

    return (
        <div className="financial-container">
            <div className="month-selector">
                <label htmlFor="month">Escolha o mês:</label>
                <input
                    type="month"
                    id="month"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                />
            </div>
            <Bar data={data} options={options} />
        </div>
    );
};

export default Financial;
