import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    numProduit: '',
    design: '',
    prix: '',
    quantite: ''
  });

  const [message, setMessage] = useState({ text: '', type: '' });
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState({
    numProduit: '',
    design: '',
    prix: '',
    quantite: ''
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const designRegex = /^[a-zA-ZÀ-ÿ0-9\s\'-]+$/;

  const formatNumberInput = (value) => {
    const cleaned = value.replace(/[^\d,]/g, '');
    const [intPart, decimalPart] = cleaned.split(',');
    const formattedInt = intPart ? parseInt(intPart, 10).toLocaleString('fr-FR') : '';
    return decimalPart !== undefined ? `${formattedInt},${decimalPart}` : formattedInt;
  };

  const checkProductExists = async (numProduit) => {
    try {
      const response = await fetch(`http://localhost:5002/api/products/check?numProduit=${numProduit}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Erreur lors de la vérification:', error);
      return false;
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
  
    if (!formData.numProduit.trim()) {
      newErrors.numProduit = 'Le numéro est requis';
      isValid = false;
    } else if (!/^[a-zA-Z0-9\s\-]*$/.test(formData.numProduit)) {
      newErrors.numProduit = 'Caractères spéciaux non autorisés';
      isValid = false;
    }
  
    if (!formData.design.trim()) {
      newErrors.design = 'La désignation est requise';
      isValid = false;
    } else if (!designRegex.test(formData.design)) {
      newErrors.design = 'Caractères non autorisés (lettres, chiffres, espaces, \' et - uniquement)';
      isValid = false;
    }
    
    if (!formData.prix) {
      newErrors.prix = 'Le prix est requis';
      isValid = false;
    } else if (isNaN(parseFloat(formData.prix.replace(',', '.')))) {
      newErrors.prix = 'Doit être un nombre';
      isValid = false;
    } else if (parseFloat(formData.prix.replace(',', '.')) <= 0) {
      newErrors.prix = 'Doit être positif';
      isValid = false;
    }
  
    if (!formData.quantite) {
      newErrors.quantite = 'La quantité est requise';
      isValid = false;
    } else if (!Number.isInteger(Number(formData.quantite))) {
      newErrors.quantite = 'Doit être un entier';
      isValid = false;
    } else if (Number(formData.quantite) <= 0) {
      newErrors.quantite = 'Doit être positif';
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  
    // Réinitialiser l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  
    // Validation en temps réel
    const newErrors = { ...errors };
    
    if (name === 'numProduit') {
      if (!value.trim()) {
        newErrors.numProduit = 'Le numéro est requis';
      } else if (!/^[a-zA-Z0-9\s\-]*$/.test(value)) {
        newErrors.numProduit = 'Caractères spéciaux non autorisés';
      }
      
      // Vérification existence produit
      if (value.trim() && !newErrors.numProduit) {
        const exists = await checkProductExists(value);
        if (exists) newErrors.numProduit = 'Ce numéro existe déjà';
      }
    }
  
    if (name === 'design' && value.trim() && !designRegex.test(value)) {
      newErrors.design = 'Caractères non autorisés';
    }
  
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (!validateForm()) {
      return;
    }

    const productExists = await checkProductExists(formData.numProduit);
    if (productExists) {
      setMessage({ 
        text: 'Ce numéro de produit existe déjà! Veuillez en choisir un autre.', 
        type: 'error' 
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5002/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          prix: parseFloat(formData.prix.replace(',', '.')),
          quantite: parseInt(formData.quantite)
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ text: data.message, type: 'success' });
        setFormData({
          numProduit: '',
          design: '',
          prix: '',
          quantite: ''
        });
      } else {
        setMessage({ text: data.message || "Erreur lors de l'ajout", type: 'error' });
      }
    } catch (error) {
      setMessage({ text: "Erreur de connexion au serveur", type: 'error' });
      console.error('Error:', error);
    }
  };

  const getBorderClass = (fieldName) => {
    if (errors[fieldName]) return 'border-red-500';
    if (formData[fieldName]) return 'border-green-300';
    return 'border-gray-300';
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-16 p-4">
      <div className={`w-full max-w-md rounded-xl shadow-lg p-6 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} 
        bg-gradient-to-br from-green-400 to-green-800 bg-opacity-100 backdrop-blur-sm relative overflow-hidden`}>
        
        <div className="bubble bubble1"></div>
        <div className="bubble bubble2"></div>
        <div className="bubble bubble3"></div>
        <div className="bubble bubble4"></div>

        <nav className="bg-green-700 bg-opacity-70 p-4 rounded-t-xl -mx-6 -mt-6 mb-6 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white text-center">Ajouter un nouveau produit</h2>
        </nav>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div className="relative">
            <label htmlFor="numProduit" className="block text-sm font-medium text-white">
              Numéro du produit
            </label>
            <input
              type="text"
              id="numProduit"
              name="numProduit"
              value={formData.numProduit}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${getBorderClass('numProduit')} rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 bg-white bg-opacity-90 text-green-900 placeholder-green-500 transition transform focus:scale-105 duration-300`}
              placeholder="Entrez le numéro"
              required
            />
            {errors.numProduit && (
              <>
                <p className="mt-1 text-sm text-red-500">{errors.numProduit}</p>
                <span className="absolute top-9 right-3 bg-red-100 text-red-600 border border-red-500 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold">!</span>
              </>
            )}
          </div>

          <div className="relative">
            <label htmlFor="design" className="block text-sm font-medium text-white">
              Désignation
            </label>
            <input
              type="text"
              id="design"
              name="design"
              value={formData.design}
              onChange={handleChange}
              onBlur={() => validateForm()}
              className={`mt-1 block w-full px-3 py-2 border ${getBorderClass('design')} rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 bg-white bg-opacity-90 text-green-900 placeholder-green-500 transition transform focus:scale-105 duration-300`}
              placeholder="Entrez la désignation"
              required
            />
            {errors.design && (
              <>
                <p className="mt-1 text-sm text-red-500">{errors.design}</p>
                <span className="absolute top-9 right-3 bg-red-100 text-red-600 border border-red-500 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold">!</span>
              </>
            )}
          </div>

          <div className="relative">
            <label htmlFor="prix" className="block text-sm font-medium text-white">
              Prix
            </label>
            <div className="relative">
              <input
                type="text"
                id="prix"
                name="prix"
                value={formatNumberInput(formData.prix)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\s/g, '').replace(',', '.');
                  setFormData({ ...formData, prix: raw });
                  if (errors.prix) setErrors({ ...errors, prix: '' });
                }}
                className={`mt-1 block w-full px-3 py-2 border ${getBorderClass('prix')} rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 bg-white bg-opacity-90 text-green-900 placeholder-green-500 transition transform focus:scale-105 duration-300`}
                placeholder="Entrez le prix"
                required
              />
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded shadow-sm border border-green-300">
                  AR
                </span>
              </div>
            </div>
            {errors.prix && (
              <>
                <p className="mt-1 text-sm text-red-500">{errors.prix}</p>
                <span className="absolute top-9 right-12 bg-red-100 text-red-600 border border-red-500 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold">!</span>
              </>
            )}
          </div>

          <div className="relative">
            <label htmlFor="quantite" className="block text-sm font-medium text-white">
              Quantité
            </label>
            <input
              type="number"
              id="quantite"
              name="quantite"
              min="0"
              value={formData.quantite}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${getBorderClass('quantite')} rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 bg-white bg-opacity-90 text-green-900 placeholder-green-500 transition transform focus:scale-105 duration-300`}
              placeholder="Entrez la quantité"
              required
            />
            {errors.quantite && (
              <>
                <p className="mt-1 text-sm text-red-500">{errors.quantite}</p>
                <span className="absolute top-9 right-3 bg-red-100 text-red-600 border border-red-500 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold">!</span>
              </>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md shadow-md text-white font-medium bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition duration-300 animate-pulse-slow"
          >
            Ajouter le produit
          </button>
        </form>

        {message.text && (
          <div className={`mt-5 p-4 flex items-center gap-2 rounded-md text-sm font-semibold transition-opacity duration-500 animate-slide-left relative z-10 ${
            message.type === 'success'
              ? 'bg-white bg-opacity-30 bg-gradient-to-r from-green-600 to-blue-500 text-white border border-green-500 shadow-sm'
              : 'bg-white bg-opacity-30 bg-gradient-to-r from-red-600 to-red-400 text-white border border-red-500 shadow-sm'
          }`}>
            <FontAwesomeIcon
              icon={message.type === 'success' ? faCheckCircle : faExclamationCircle}
              className={`h-5 w-5 ${message.type === 'success' ? 'text-green-300' : 'text-red-500'}`}
            />
            {message.text}
          </div>
        )}
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