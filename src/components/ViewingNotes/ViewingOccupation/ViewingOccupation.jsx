import './index.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ViewingCheckIn() {
  // Criar dias do mês (1 a 30)
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  // Dados do gráfico (ocupação diária para cada fonte)
  const data = {
    labels: days, // Agora estamos usando os dias de 1 a 30
    datasets: [
      {
        label: 'Airbnb',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)), // Dados de ocupação aleatórios para Airbnb
        backgroundColor: 'rgba(255, 99, 132, 0.5)', // Cor do Airbnb
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Booking',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)), // Dados de ocupação aleatórios para Booking
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Cor do Booking
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'HostelWorld',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)), // Dados de ocupação aleatórios para HostelWorld
        backgroundColor: 'rgba(255, 206, 86, 0.5)', // Cor do HostelWorld
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
      {
        label: 'WhatsApp',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)), // Dados de ocupação aleatórios para WhatsApp
        backgroundColor: 'rgba(75, 192, 192, 0.5)', // Cor do WhatsApp
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Configurações do gráfico
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Taxa de Ocupação Diária',
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          max: 100, // A taxa de ocupação não pode ultrapassar 100%
        },
      },
    },
  };

  return (
    <div id="viewing-checkin">
      <h1>Taxa de Ocupação Diária</h1>
      <div style={{ width: '100%', height: '500px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
