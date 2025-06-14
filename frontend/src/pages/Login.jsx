import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import bgLogin from '../assets/bglogin3.png';
import logo from '../assets/Logoinvex.png';
import { faFacebook, faInstagram, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  

  useEffect(() => {
    resetForm();
  }, [location.pathname, isRegistering]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('formData');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = isRegistering ? '/register' : '/login';
      const apiUrl = `http://localhost:5002/api${endpoint}`;
      
      console.log(`Tentative de ${isRegistering ? 'inscription' : 'connexion'}...`);
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email.trim(),
          password: password.trim()
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur lors de ${isRegistering ? 'l\'inscription' : 'la connexion'}`);
      }
  
      const data = await response.json();
      console.log(`${isRegistering ? 'Inscription' : 'Connexion'} réussie:`, data);
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
      
    } catch (err) {
      console.error('Erreur complète:', err);
      setError(err.message || `Échec de ${isRegistering ? 'l\'inscription' : 'la connexion'}`);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
  };

  const getBorderClass = (fieldValue) => {
    if (error) return 'border-red-500';
    if (fieldValue) return 'border-green-300';
    return 'border-gray-300';
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${bgLogin})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute top-6">
        <img 
          src={logo} 
          alt="Logo INVEX" 
          className="h-40 w-auto"
        />
      </div>
      
      <div className="w-full max-w-md rounded-xl shadow-lg p-6 bg-white bg-opacity-30 backdrop-blur-sm relative overflow-hidden mt-20">
        <div className="bubble bubble1"></div>
        <div className="bubble bubble2"></div>
        <div className="bubble bubble3"></div>
        <div className="bubble bubble4"></div>

        <nav className="bg-green-700 bg-opacity-70 p-4 rounded-t-xl -mx-6 -mt-6 mb-6 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white text-center">
            {isRegistering ? 'Inscription' : 'Connexion'}
          </h2>
        </nav>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${getBorderClass(email)} rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 bg-white bg-opacity-90 text-green-900 placeholder-green-500 transition transform focus:scale-105 duration-300`}
              required
            />
            {error && (
              <span className="absolute top-9 right-3 bg-red-100 text-red-600 border border-red-500 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold">!</span>
            )}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${getBorderClass(password)} rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 bg-white bg-opacity-90 text-green-900 placeholder-green-500 transition transform focus:scale-105 duration-300`}
              required
            />
            {error && (
              <span className="absolute top-9 right-3 bg-red-100 text-red-600 border border-red-500 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold">!</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md shadow-md text-white font-medium bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition duration-300 animate-pulse-slow"
          >
            {isRegistering ? "S'inscrire" : "Se connecter"}
          </button>

          <button
            type="button"
            onClick={toggleMode}
            className="w-full text-white hover:text-blue-200 hover:underline transition duration-300"
          >
            {isRegistering ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? Créer un compte'}
          </button>
        </form>

        {error && (
          <div className="mt-5 p-4 flex items-center gap-2 rounded-md text-sm font-semibold transition-opacity duration-500 animate-slide-left bg-white bg-opacity-30 bg-gradient-to-r from-red-600 to-red-400 text-white border border-red-500 shadow-sm relative z-10">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="h-5 w-5 text-red-500"
            />
            {error}
          </div>
        )}
      </div>

      <div className="flex justify-center space-x-8 mt-10">
        <a 
          href="https://facebook.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-blue-500 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-pink-500 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a 
          href="https://youtube.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-red-500 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faYoutube} size="2x" />
        </a>
        <a 
          href="https://x.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-gray-800 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faXTwitter} size="2x" />
        </a>
      </div>

      <style>
        {`
          .bubble {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            animation: float 6s infinite ease-in-out;
            pointer-events: none;
            z-index: 1;
          }
          .bubble1 { width: 20px; height: 20px; bottom: 10%; left: 10%; animation-duration: 5s; }
          .bubble2 { width: 30px; height: 30px; top: 20%; left: 30%; animation-duration: 7s; animation-delay: 1s; }
          .bubble3 { width: 15px; height: 15px; bottom: 30%; right: 20%; animation-duration: 4s; animation-delay: 2s; }
          .bubble4 { width: 25px; height: 25px; top: 40%; right: 10%; animation-duration: 6s; animation-delay: 3s; }

          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
            50% { opacity: 0.4; transform: translateY(-20px) rotate(180deg); }
            100% { transform: translateY(-40px) rotate(360deg); opacity: 0; }
          }

          .animate-pulse-slow {
            animation: pulse-slow 3s infinite ease-in-out;
          }

          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.02); opacity: 0.95; }
          }

          .animate-slide-left {
            animation: slide-left 0.5s ease-out forwards;
          }

          @keyframes slide-left {
            0% { opacity: 0; transform: translateX(20px); }
            100% { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
}