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
import { API_URL } from "../../config/constants";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
registerLocale("pt-BR", ptBR);

const Financial = () => {
  const [startDate, setStartDate] = useState(new Date()); // Data de início do período
  const [endDate, setEndDate] = useState(new Date()); // Data de fim do período
  const [report, setReport] = useState(null);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [labels, setLabels] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // ===================== FUNÇÃO DE BUSCA =====================
  const fetchReportAndGraph = async (year, month) => {
    try {
      setLoading(true);
      setError("");
      setReport(null);
      setDailyRevenue([]);
      setLabels([]);

      const response = await fetch(
        `${API_URL}/api/reports/month?month=${month}&year=${year}`
      );
      if (!response.ok) throw new Error("Erro ao buscar o relatório");

      const data = await response.json();
      if (data.detalhes) data.detalhes.sort((a, b) => a.idReserva - b.idReserva);

      // --- FILTRA APENAS AS RESERVAS DENTRO DO PERÍODO SELECIONADO ---
      let filtered = data.detalhes || [];
      if (startDate && endDate) {
        filtered = filtered.filter((r) => {
          const checkin = new Date(r.checkin);
          return checkin >= startDate && checkin <= endDate;
        });
      }

      // --- CRIA GRÁFICO DO PERÍODO SELECIONADO ---
      const daysRange = [];
      const daily = [];
      if (startDate && endDate) {
        const diffDays =
          Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
        for (let i = 0; i < diffDays; i++) {
          const date = new Date(startDate);
          date.setDate(date.getDate() + i);
          daysRange.push(date.toLocaleDateString("pt-BR"));
          daily.push(0);
        }

        filtered.forEach((r) => {
          const checkin = new Date(r.checkin).toLocaleDateString("pt-BR");
          const index = daysRange.indexOf(checkin);
          if (index !== -1) daily[index] += Number(r.valor);
        });
      }

      const total = filtered.reduce((acc, r) => acc + Number(r.valor), 0);

      // Atualiza estados
      setReport({ ...data, detalhes: filtered });
      setLabels(daysRange);
      setDailyRevenue(daily);
      setTotalRevenue(total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ===================== EFEITO: ATUALIZA QUANDO MUDA O PERÍODO =====================
  useEffect(() => {
    if (startDate && endDate) {
      const year = startDate.getFullYear();
      const month = startDate.getMonth() + 1;
      fetchReportAndGraph(year, month);
    }
  }, [startDate, endDate]);

  // ===================== GRÁFICO =====================
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
        text: `Faturamento Total: R$ ${totalRevenue.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}`,
        font: {
          size: 18,
          weight: "bold",
        },
        color: "#142F0E",
      },
    },
    scales: {
      x: { title: { display: true, text: "Dias do Período" } },
      y: { title: { display: true, text: "Faturamento (R$)" } },
    },
  };

  // ===================== PAGINAÇÃO =====================
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    report?.detalhes?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = report ? Math.ceil(report.detalhes.length / itemsPerPage) : 1;

  // ===================== RENDERIZAÇÃO =====================
  return (
    <div className="page-container">
      <h2>Relatório Financeiro por Período</h2>

      <div className="filters" style={{ marginBottom: "20px" }}>
        <label>
          Selecione o Período:
          <DatePicker
            selected={startDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            monthsShown={2}
            dateFormat="dd/MM/yyyy"
            locale="pt-BR"
            className="airbnb-datepicker-input"
            popperClassName="airbnb-datepicker-popper"
            placeholderText="Clique para selecionar o período"
          />
        </label>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {report && (
        <div className="report-result">
          <h3>Resumo:</h3>
          <p>
            Total de Reservas no Período:{" "}
            <strong>{report.detalhes.length}</strong>
          </p>
          <p>
            Faturamento Total:{" "}
            <strong>
              {totalRevenue.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
          </p>

          {/* ===== TABELA ===== */}
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
                    <td>
                      {Number(reserva.valor).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ===== PAGINAÇÃO ===== */}
          {totalPages > 1 && (
            <div className="pagination" style={{ marginTop: "10px", textAlign: "center" }}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                &lt; Anterior
              </button>
              <span style={{ margin: "0 10px" }}>
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Próximo &gt;
              </button>
            </div>
          )}

          {/* ===== GRÁFICO ===== */}
          <div style={{ height: "400px", marginTop: "30px" }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Financial;
