import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
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
import { color } from "chart.js/helpers";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
registerLocale("pt-BR", ptBR);

const Financial = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [report, setReport] = useState(null);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [labels, setLabels] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const fetchReportAndGraph = async (year, month) => {
    try {
      setLoading(true);
      setError("");
      setReport(null);
      setDailyRevenue([]);
      setLabels([]);

      const response = await fetch(
        `http://localhost:3000/api/reports/month?month=${month}&year=${year}`
      );
      if (!response.ok) throw new Error("Erro ao buscar o relatório");

      const data = await response.json();
      if (data.detalhes) data.detalhes.sort((a, b) => a.idReserva - b.idReserva);
      setReport(data);

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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    fetchReportAndGraph(year, month);
  }, [selectedDate]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Faturamento (R$)",
        data: dailyRevenue,
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: `Faturamento Total: R$ ${totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
        font: {
        size: 20, 
        weight: 'bold', 
      },
      color: '#000',
      },
    },
    scales: {
      x: { title: { display: true, text: "Dias do Mês" } },
      y: { title: { display: true, text: "Faturamento (R$)" } },
    },
  };

  const meses = [
    { value: "1", label: "Janeiro" }, { value: "2", label: "Fevereiro" }, { value: "3", label: "Março" },
    { value: "4", label: "Abril" }, { value: "5", label: "Maio" }, { value: "6", label: "Junho" },
    { value: "7", label: "Julho" }, { value: "8", label: "Agosto" }, { value: "9", label: "Setembro" },
    { value: "10", label: "Outubro" }, { value: "11", label: "Novembro" }, { value: "12", label: "Dezembro" },
  ];

  // Paginacao
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = report?.detalhes?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = report ? Math.ceil(report.detalhes.length / itemsPerPage) : 1;

  return (
    <div className="page-container">
      <h2>Relatório e Faturamento Mensal</h2>

      <div className="filters" style={{ marginBottom: "20px" }}>
        <label>
          Mês:
          <select
            value={selectedDate.getMonth() + 1}
            onChange={(e) =>
              setSelectedDate(new Date(selectedDate.getFullYear(), e.target.value - 1))
            }
          >
            {meses.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: "20px" }}>
          Ano:
          <input
            type="number"
            value={selectedDate.getFullYear()}
            onChange={(e) =>
              setSelectedDate(new Date(Number(e.target.value), selectedDate.getMonth()))
            }
            min="2000"
            max="2100"
          />
        </label>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {report && (
        <div className="report-result">
          <h3>Resumo:</h3>
          <p>Total de Reservas: <strong>{report.totalReservas}</strong></p>

          <div className="table-container" style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table>
              <thead>
                <tr className="tabela-reservas">
                  <th>ID</th>
                  <th>Reserva</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Valor (R$)</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((reserva) => (
                  <tr key={reserva.idReserva}>
                    <td>{reserva.idReserva}</td>
                    <td>{reserva.hospede}</td>
                    <td>{new Date(reserva.checkin).toLocaleDateString()}</td>
                    <td>{new Date(reserva.checkout).toLocaleDateString()}</td>
                    <td>{Number(reserva.valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="pagination" style={{ marginTop: "10px", textAlign: "center" }}>
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                &lt; Anterior
              </button>
              <span style={{ margin: "0 10px" }}>{currentPage} / {totalPages}</span>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                Próximo &gt;
              </button>
            </div>
          )}

          {/* Gráfico */}
          <div style={{ height: "400px", marginTop: "30px" }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Financial;
