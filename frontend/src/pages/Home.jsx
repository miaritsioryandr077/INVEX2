import { Link } from 'react-router-dom';
import BoxImage from '../assets/Box.png'; 

export default function Home() {
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
      </div>

      {/* Partie Image à droite */}
      <div className="md:w-1/2 flex justify-center">
        <img 
          src={BoxImage} 
          alt="Capture d'écran de l'application INVEX"
          className="ml-40 max-h-[500px]"
        />
      </div>
    </div>
  );
}