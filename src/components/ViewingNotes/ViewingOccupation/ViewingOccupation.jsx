import './ViewingOccupation.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ViewingCheckIn() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const data = {
    labels: days, 
    datasets: [
      {
        label: 'Airbnb',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)), 
        backgroundColor: 'rgba(255, 99, 132, 0.5)', 
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Booking',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)), 
        backgroundColor: 'rgba(54, 162, 235, 0.5)', 
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'HostelWorld',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)), 
        backgroundColor: 'rgba(255, 206, 86, 0.5)', 
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
      {
        label: 'WhatsApp',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)), 
        backgroundColor: 'rgba(75, 192, 192, 0.5)', 
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  
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
          max: 100, 
        },
      },
    },
  };

  return (
    <div className="viewing" id="viewing-occupation">
      <h1>Taxa de Ocupação Diária</h1>
      <div style={{ width: '100%',}}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
