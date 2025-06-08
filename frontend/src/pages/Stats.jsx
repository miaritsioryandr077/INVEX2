import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faArrowUp, faArrowDown, faChartBar, faBox } from '@fortawesome/free-solid-svg-icons';
import { formatNumber } from '../utils/formatters';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Stats() {
  const [stats, setStats] = useState({
    min: 0,
    max: 0,
    total: 0,
    count: 0
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/products/stats');
        const { min, max, total, count, products } = response.data;
        
        setStats({ min, max, total, count });
        setProducts(products);
        
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: ['Minimal', 'Maximal', 'Total'],
    datasets: [{
      data: [stats.min, stats.max, stats.total],
      backgroundColor: [
        'rgb(148, 45 ,223)',
        'rgb(30, 142, 255)', 
        'rgb(0, 215, 144)'  
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Bubble Animations */}
      <div className="bubble bubble1"></div>
      <div className="bubble bubble2"></div>
      <div className="bubble bubble3"></div>
      <div className="bubble bubble4"></div>
      <div className="bubble bubble5"></div>
      <div className="bubble bubble6"></div>

      <h2 className="text-4xl font-extrabold text-white mb-8 tracking-tight transition-all duration-300 hover:text-yellow-300 text-center mx-auto max-w-5xl">
        Bilan des Produits
      </h2>
      
      {/* Cartes Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mx-auto max-w-5xl">
        {/* Carte Montant Minimal */}
        <div className="bg-white bg-opacity-20 bg-gradient-to-r from-green-600 to-blue-500 bg-opacity-50 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-white">Montant Minimal</p>
              <p className="text-2xl font-semibold text-white">
                {formatNumber(stats.min)} AR
              </p>
            </div>
            <div className="p-3 rounded-full bg-yellow-400 bg-opacity-50 text-white">
              <FontAwesomeIcon icon={faArrowDown} className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Carte Montant Maximal */}
        <div className="bg-white bg-opacity-20 bg-gradient-to-r from-green-600 to-blue-500 bg-opacity-50 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-white">Montant Maximal</p>
              <p className="text-2xl font-semibold text-white">
                {formatNumber(stats.max)} AR
              </p>
            </div>
            <div className="p-3 rounded-full bg-yellow-400 bg-opacity-50 text-white">
              <FontAwesomeIcon icon={faArrowUp} className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Carte Montant Total */}
        <div className="bg-white bg-opacity-20 bg-gradient-to-r from-green-600 to-blue-500 bg-opacity-50 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 animate-slide-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-white">Montant Total</p>
              <p className="text-2xl font-semibold text-white">
                {formatNumber(stats.total)} AR
              </p>
            </div>
            <div className="p-3 rounded-full bg-yellow-400 bg-opacity-50 text-white">
              <FontAwesomeIcon icon={faChartBar} className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Carte Nombre de Produits */}
        <div className="bg-white bg-opacity-20 bg-gradient-to-r from-green-600 to-blue-500 bg-opacity-50 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 animate-slide-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-white">Nombre de Produits</p>
              <p className="text-2xl font-semibold text-white">
                {stats.count}
              </p>
            </div>
            <div className="p-3 rounded-full bg-yellow-400 bg-opacity-50 text-white">
              <FontAwesomeIcon icon={faBox} className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Graphique et Tableau */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto max-w-5xl">
        {/* Graphique Camembert */}
        <div className="bg-white bg-opacity-20 p-8 rounded-2xl shadow-lg border-2 border-gradient-to-r from-green-500 to-yellow-300">
          <h3 className="text-lg font-semibold text-white mb-4">Répartition des Montants</h3>
          <div className="h-80">
            <Pie 
              data={chartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: 'white',
                      font: {
                        size: 14
                      }
                    }
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        return `${context.label}: ${formatNumber(context.raw)} AR`;
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Tableau des Produits */}
        <div className="bg-white bg-opacity-20 p-8 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Détails par Produit</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-green-600 to-blue-500 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Produit
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                    Montant
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr 
                    key={product.numProduit}
                    className="text-white hover:bg-green-100 hover:bg-opacity-20 transition duration-300 animate-row-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {product.design}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      {formatNumber(product.montant)} AR
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>
        {`
          .bubble {
            position: absolute;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
            animation: afloat 6s infinite ease-in-out;
            pointer-events: none;
            z-index: 0;
          }
          .bubble1 { width: 15px; height: 15px; bottom: 5%; left: 10%; animation-duration: 4s; }
          .bubble2 { width: 25px; height: 25px; top: 15%; left: 20%; animation-duration: 6s; animation-delay: 1s; }
          .bubble3 { width: 20px; height: 20px; bottom: 25%; right: 15%; animation-duration: 5s; animation-delay: 2s; }
          .bubble4 { width: 30px; height: 30px; top: 30%; right: 10%; animation-duration: 7s; animation-delay: 3s; }
          .bubble5 { width: 18px; height: 18px; bottom: 40%; left: 25%; animation-duration: 5.5s; animation-delay: 0.5s; }
          .bubble6 { width: 22px; height: 22px; top: 50%; right: 20%; animation-duration: 6.5s; animation-delay: 1.5s; }

          @keyframes afloat {
            0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
            50% { opacity: 0.3; transform: translateY(-30px) rotate(180deg); }
            100% { transform: translateY(-60px) rotate(360deg); opacity: 0; }
          }

          .animate-slide-in {
            animation: slide-in 0.5s ease-out forwards;
          }

          @keyframes slide-in {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .animate-row-in {
            animation: row-in 0.6s ease-out forwards;
          }

          @keyframes row-in {
            0% { opacity: 0; transform: translateX(-20px); }
            100% { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
}