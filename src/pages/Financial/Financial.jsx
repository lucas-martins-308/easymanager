// src/pages/Financial/Financial.jsx
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Financial.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
registerLocale('pt-BR', ptBR);

const Financial = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRevenueData = async (year, month) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:3000/api/reports/month?month=${month}&year=${year}`
      );
      if (!response.ok) throw new Error("Erro ao buscar dados de faturamento");

      const data = await response.json();

      const daysInMonth = new Date(year, month, 0).getDate();
      const dayLabels = Array.from({ length: daysInMonth }, (_, i) => String(i + 1).padStart(2, "0"));
      const daily = Array(daysInMonth).fill(0);

      if (data.detalhes) {
        data.detalhes.forEach((reserva) => {
          const day = new Date(reserva.checkin).getDate();
          daily[day - 1] += Number(reserva.valor);
        });
      }

      setLabels(dayLabels);
      setDailyRevenue(daily);
      setTotalRevenue(Number(data.totalValor) || daily.reduce((a, b) => a + b, 0));
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    fetchRevenueData(year, month);
  }, [selectedDate]);

  const data = {
    labels,
    datasets: [
      {
        label: "Faturamento (R$)",
        data: dailyRevenue,
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: `Faturamento Total: R$ ${totalRevenue.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}`,
      },
    },
    scales: {
      x: { title: { display: true, text: "Dias do Mês" } },
      y: { title: { display: true, text: "Faturamento (R$)" } },
    },
  };

  return (
    <div className="page-container">
      <h2>Faturamento Mensal</h2>

      <div className="month-selector" style={{ marginBottom: "20px", textAlign: "center" }}>
        <label style={{ marginRight: "10px" }}>Escolha o mês:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          locale="pt-BR"
          className="custom-datepicker"
        />
      </div>

      {loading && <p style={{ textAlign: "center" }}>Carregando...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {!loading && !error && (
        <div style={{ height: "500px" }}>
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default Financial;
