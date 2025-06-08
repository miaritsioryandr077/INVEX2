import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faFileAlt, faChartBar } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/Logoinvex.png';

export default function Navbar({ logoSize = 8 }) {
  return (
    <nav className="bg-green-500/10 p-2 shadow-lg backdrop-blur-md flex items-center rounded-xl mx-3 mt-2 h-36">
    {/* Logo à gauche */}
      <div className="flex-shrink-0 ml-4">
        <NavLink to="/">
          <img 
            src={logo} 
            alt="Logo de l'application" 
            className={`h-${logoSize} max-h-40 transition-transform duration-200 hover:scale-105`} 
          />
        </NavLink>
      </div>
      
      {/* Menu juste à côté du logo */}
      <ul className="flex space-x-3 text-white items-center ml-8">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center px-4 py-2 rounded-full text-[18px] font-bold transition-all duration-300 ease-in-out hover:shadow-lg hover:text-white ${
                isActive 
                  ? 'bg-gradient-to-r from-yellow-400 to-green-500 border-2 border-white shadow-md' 
                  : 'bg-green-600 bg-opacity-60 hover:bg-gradient-to-r hover:from-blue-500 hover:to-yellow-300'
              }`
            }
          >
            <FontAwesomeIcon icon={faHome} className="mr-2 h-5 w-5 transition-transform duration-200 hover:scale-110" />
            ACCUEIL
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add-product"
            className={({ isActive }) => 
              `flex items-center px-4 py-2 rounded-full text-[18px] font-bold transition-all duration-300 ease-in-out hover:shadow-lg hover:text-white ${
                isActive 
                  ? 'bg-gradient-to-r from-yellow-400 to-green-500 border-2 border-white shadow-md' 
                  : 'bg-green-600 bg-opacity-60 hover:bg-gradient-to-r hover:from-blue-500 hover:to-yellow-300'
              }`
            }
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2 h-5 w-5 transition-transform duration-200 hover:scale-110" />
            AJOUTER UN PRODUIT
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) => 
              `flex items-center px-4 py-2 rounded-full text-[18px] font-bold transition-all duration-300 ease-in-out hover:shadow-lg hover:text-white ${
                isActive 
                  ? 'bg-gradient-to-r from-yellow-400 to-green-500 border-2 border-white shadow-md' 
                  : 'bg-green-600 bg-opacity-60 hover:bg-gradient-to-r hover:from-blue-500 hover:to-yellow-300'
              }`
            }
          >
            <FontAwesomeIcon icon={faFileAlt} className="mr-2 h-5 w-5 transition-transform duration-200 hover:scale-110" />
            LISTE DES PRODUITS
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/stats"
            className={({ isActive }) => 
              `flex items-center px-4 py-2 rounded-full text-[18px] font-bold transition-all duration-300 ease-in-out hover:shadow-lg hover:text-white ${
                isActive 
                  ? 'bg-gradient-to-r from-yellow-400 to-green-500 border-2 border-white shadow-md' 
                  : 'bg-green-600 bg-opacity-60 hover:bg-gradient-to-r hover:from-blue-500 hover:to-yellow-300'
              }`
            }
          >
            <FontAwesomeIcon icon={faChartBar} className="mr-2 h-5 w-5 transition-transform duration-200 hover:scale-110" />
            BILAN
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}