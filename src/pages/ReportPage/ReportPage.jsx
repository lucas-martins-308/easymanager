import { useState, useEffect } from "react";
import "./ReportPage.css";

const ReportPage = () => {
  const [month, setMonth] = useState("10"); // mês padrão
  const [year, setYear] = useState(new Date().getFullYear());
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const meses = [
    { value: "1", label: "Janeiro" },
    { value: "2", label: "Fevereiro" },
    { value: "3", label: "Março" },
    { value: "4", label: "Abril" },
    { value: "5", label: "Maio" },
    { value: "6", label: "Junho" },
    { value: "7", label: "Julho" },
    { value: "8", label: "Agosto" },
    { value: "9", label: "Setembro" },
    { value: "10", label: "Outubro" },
    { value: "11", label: "Novembro" },
    { value: "12", label: "Dezembro" },
  ];

  const handleFetchReport = async () => {
    try {
      setLoading(true);
      setError("");
      setReport(null);

      const response = await fetch(
        `http://localhost:3000/api/reports/month?month=${month}&year=${year}`
      );

      if (!response.ok) throw new Error("Erro ao buscar o relatório");

      const data = await response.json();

      // Ordena reservas por ID
      if (data.detalhes) {
        data.detalhes.sort((a, b) => a.idReserva - b.idReserva);
      }

      setReport(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container report-page">
      <h2>Relatório Mensal</h2>

      <div className="filters">
        <label>
          Mês:
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            {meses.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Ano:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            min="2000"
            max="2100"
          />
        </label>

        <button onClick={handleFetchReport} disabled={loading}>
          {loading ? "Gerando..." : "Gerar Relatório"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {report && (
        <div className="report-result">
          <h3>Resumo:</h3>
          <p>Total de Reservas: <strong>{report.totalReservas}</strong></p>
          <p>
            Valor Total:{" "}
            <strong>
              {Number(report.totalValor).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
          </p>

          <h3>Detalhes das Reservas:</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "50px" }}>ID</th>
                  <th style={{ width: "300px" }}>Hóspede</th>
                  <th style={{ width: "120px" }}>Check-in</th>
                  <th style={{ width: "120px" }}>Check-out</th>
                  <th style={{ width: "120px" }}>Valor (R$)</th>
                </tr>
              </thead>
              <tbody>
                {report.detalhes.map((reserva) => (
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
        </div>
      )}
    </div>
  );
};

export default ReportPage;
