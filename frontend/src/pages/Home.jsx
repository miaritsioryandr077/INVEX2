import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BoxImage from '../assets/Box.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login', {
      state: { fromLogout: true },
      replace: true
    });
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="min-h-[70vh] flex flex-col md:flex-row items-center justify-center p-8 gap-8 max-w-6xl mx-auto">
      {/* Partie Texte à gauche */}
      <div className="md:w-1/2 text-left -ml-40">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Bienvenue sur Invex!
        </h1>
        
        <div className="space-y-4 text-white">
          <p className="text-base">
            INVEX est une solution complète pour gérer efficacement votre inventaire de produits. 
            Simplifiez le suivi de vos stocks, des prix et des quantités disponibles.
          </p>
          
          <p className="text-base">
            Notre application vous permet d'ajouter, modifier et supprimer des produits en temps réel, 
            avec un calcul automatique des valeurs totales et des statistiques détaillées.
          </p>
          
          <p className="text-base">
            Visualisez vos données sous forme de graphiques clairs pour une meilleure prise de décision.
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <Link
            to="/add-product"
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:to-yellow-300 hover:shadow-lg hover:scale-105"
          >
            Commencer
          </Link>
          <Link
            to="/products"
            className="border-2 border-white text-white bg-opacity-20 bg-green-600 px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-yellow-300 hover:to-green-400 hover:shadow-lg hover:scale-105"
          >
            Voir la liste
          </Link>
        </div>

        <span
          onClick={handleLogoutClick}
          className="mt-20 block text-gray-300 underline cursor-pointer text-lg hover:text-yellow-300 transition-all duration-300"
        >
          <FontAwesomeIcon 
            icon={faSignOutAlt}
            className="mr-2 rotate-180" 
          />
          Se déconnecter
        </span>
      </div>

      {/* Partie Image à droite */}
      <div className="md:w-1/2 flex justify-center">
        <img 
          src={BoxImage} 
          alt="Capture d'écran de l'application INVEX"
          className="ml-40 max-h-[500px]"
        />
      </div>

      {/* Modal de confirmation de déconnexion */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-90 rounded-xl p-6 w-full max-w-sm transform transition-all duration-300 scale-95 opacity-0 animate-modal-in">
            <h3 className="text-xl font-bold text-green-900 mb-4">Confirmer la déconnexion</h3>
            <p className="text-green-900 mb-4">Voulez-vous vraiment vous déconnecter ?</p>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCancelLogout}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-full hover:from-gray-600 hover:to-gray-700 transition duration-300"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full hover:from-red-600 hover:to-pink-600 transition duration-300 animate-pulse-slow"
              >
                <FontAwesomeIcon icon={faCheck} className="mr-2" />
                Oui, se déconnecter
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          .animate-modal-in {
            animation: modal-in 0.3s ease-out forwards;
          }

          @keyframes modal-in {
            to { transform: scale(1); opacity: 1; }
          }

          .animate-pulse-slow {
            animation: pulse-slow 3s infinite ease-in-out;
          }

          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.02); opacity: 0.95; }
          }
        `}
      </style>
    </div>
  );
}