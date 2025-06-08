import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({ design: '', prix: '', quantite: '' });
  const [deleteId, setDeleteId] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isModalOpen, setIsModalOpen] = useState({ edit: false, delete: false });
  const [isTableVisible, setIsTableVisible] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setIsTableVisible(true);
    }
  }, [products]);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message.text]);

  const formatNumber = (num) => {
    return Number(num).toLocaleString('fr-FR', { maximumFractionDigits: 0 });
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error:', error);
      setMessage({ text: 'Erreur de connexion', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5002/api/products/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        setMessage({ text: data.message, type: 'success' });
        fetchProducts();
        setIsModalOpen({ ...isModalOpen, delete: false });
      } else {
        setMessage({ text: data.error, type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Erreur de connexion', type: 'error' });
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditForm({
      design: product.design,
      prix: parseFloat(product.prix).toString(),
      quantite: product.quantite.toString(),
    });
    setIsModalOpen({ ...isModalOpen, edit: true });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost:5002/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          design: editForm.design,
          prix: parseFloat(editForm.prix),
          quantite: parseInt(editForm.quantite),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ text: data.message, type: 'success' });
        setIsModalOpen({ ...isModalOpen, edit: false });
        fetchProducts();
      } else {
        setMessage({ text: data.error, type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Erreur de connexion', type: 'error' });
    }
  };

  const closeModal = () => {
    setIsModalOpen({ edit: false, delete: false });
    setEditingProduct(null);
    setDeleteId(null);
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Bubble Animations */}
      <div className="bubble bubble1"></div>
      <div className="bubble bubble2"></div>
      <div className="bubble bubble3"></div>
      <div className="bubble bubble4"></div>
      <div className="bubble bubble5"></div>
      <div className="bubble bubble6"></div>

      {/* Internal Title */}
      <h2 className="text-3xl font-extrabold text-white mb-6 tracking-tight transition-all duration-300 hover:text-green-300 text-center mx-auto">
        Liste des Produits
      </h2>

      <div className="overflow-x-auto mx-auto w-full max-w-5xl relative z-10">
        <table className="min-w-full bg-white bg-opacity-30 rounded-xl shadow-md">
          <thead>
            <tr className="bg-gradient-to-r from-green-600 to-blue-500 text-white">
              <th className="py-3 px-6 rounded-tl-xl">Numéro</th>
              <th className="py-3 px-6">Désignation</th>
              <th className="py-3 px-6">Prix</th>
              <th className="py-3 px-6">Quantité</th>
              <th className="py-3 px-6">Montant</th>
              <th className="py-3 px-6 rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.numProduit}
                className={`hover:bg-green-100 hover:bg-opacity-20 transition duration-300 ${
                  isTableVisible ? 'animate-row-in' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <td className="py-3 px-6 border-b border-green-200 text-white font-bold">{product.numProduit}</td>
                <td className="py-3 px-6 border-b border-green-200 text-white font-bold">{product.design}</td>
                <td className="py-3 px-6 border-b border-green-200 text-white font-bold">{formatNumber(product.prix)} AR</td>
                <td className="py-3 px-6 border-b border-green-200 text-white font-bold">{product.quantite}</td>
                <td className="py-3 px-6 border-b border-green-200 text-white font-bold">{formatNumber(product.prix * product.quantite)} AR</td>
                <td className="py-3 px-6 border-b border-green-200">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1.5 rounded-full mr-2 hover:from-yellow-600 hover:to-orange-600 transition duration-300 animate-pulse-slow"
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-2" />
                    Modifier
                  </button>
                  <button
                    onClick={() => {
                      setDeleteId(product.numProduit);
                      setIsModalOpen({ ...isModalOpen, delete: true });
                    }}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-1.5 rounded-full hover:from-red-600 hover:to-pink-600 transition duration-300 animate-pulse-slow"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {message.text && (
        <div
          className={`mt-6 p-4 rounded-xl text-lg font-bold mx-auto w-full max-w-5xl bg-gradient-to-r ${
            message.type === 'success'
              ? 'from-green-500 to-green-700 text-white border border-green-300'
              : 'from-red-500 to-red-700 text-white border border-red-300'
          } shadow-lg transition-opacity duration-1000 opacity-100 animate-fade-out flex items-center`}
        >
          <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-green-300" />
          {message.text}
        </div>
      )}

      {/* Modal pour Modifier */}
      {isModalOpen.edit && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-90 rounded-xl p-6 w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-modal-in">
            <h3 className="text-xl font-bold text-green-900 mb-4">Modifier le produit</h3>
            <form className="space-y-4">
            <div>
              <label htmlFor="numProduit" className="block text-sm font-medium text-green-900">
                Numéro du produit
              </label>
              <input
                type="text"
                id="numProduit"
                value={editingProduct.numProduit}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-600 rounded-md shadow-sm focus:outline-none"
              />
            </div>


              <div>
                <label htmlFor="design" className="block text-sm font-medium text-green-900">
                  Désignation
                </label>
                <input
                  type="text"
                  id="design"
                  value={editForm.design}
                  onChange={(e) => setEditForm({ ...editForm, design: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 bg-white bg-opacity-90 text-green-900 placeholder-green-500 transition transform focus:scale-105 duration-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="prix" className="block text-sm font-medium text-green-900">
                  Prix
                </label>
                <input
                  type="text"
                  id="prix"
                  value={editForm.prix}
                  onChange={(e) => setEditForm({ ...editForm, prix: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 bg-white bg-opacity-90 text-green-900 placeholder-green-500 transition transform focus:scale-105 duration-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="quantite" className="block text-sm font-medium text-green-900">
                  Quantité
                </label>
                <input
                  type="number"
                  id="quantite"
                  min="0"
                  value={editForm.quantite}
                  onChange={(e) => setEditForm({ ...editForm, quantite: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 bg-white bg-opacity-90 text-green-900 placeholder-green-500 transition transform focus:scale-105 duration-300"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-full hover:from-gray-600 hover:to-gray-700 transition duration-300"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdate(editingProduct.numProduit)}
                  className="bg-gradient-to-r from-green-600 to-blue-500 text-white px-4 py-2 rounded-full hover:from-green-700 hover:to-blue-600 transition duration-300 animate-pulse-slow"
                >
                  <FontAwesomeIcon icon={faCheck} className="mr-2" />
                  Valider
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal pour Supprimer */}
      {isModalOpen.delete && deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-90 rounded-xl p-6 w-full max-w-sm transform transition-all duration-300 scale-95 opacity-0 animate-modal-in">
            <h3 className="text-xl font-bold text-green-900 mb-4">Confirmer la suppression</h3>
            <p className="text-green-900 mb-4">Voulez-vous vraiment supprimer ce produit ?</p>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-full hover:from-gray-600 hover:to-gray-700 transition duration-300"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteId)}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full hover:from-red-600 hover:to-pink-600 transition duration-300 animate-pulse-slow"
              >
                <FontAwesomeIcon icon={faCheck} className="mr-2" />
                Oui, supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          .bubble {
            position: absolute;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
            animation: float 6s infinite ease-in-out;
            pointer-events: none;
            z-index: 0;
          }
          .bubble1 { width: 15px; height: 15px; bottom: 5%; left: 10%; animation-duration: 4s; }
          .bubble2 { width: 25px; height: 25px; top: 15%; left: 20%; animation-duration: 6s; animation-delay: 1s; }
          .bubble3 { width: 20px; height: 20px; bottom: 25%; right: 15%; animation-duration: 5s; animation-delay: 2s; }
          .bubble4 { width: 30px; height: 30px; top: 30%; right: 10%; animation-duration: 7s; animation-delay: 3s; }
          .bubble5 { width: 18px; height: 18px; bottom: 40%; left: 25%; animation-duration: 5.5s; animation-delay: 0.5s; }
          .bubble6 { width: 22px; height: 22px; top: 50%; right: 20%; animation-duration: 6.5s; animation-delay: 1.5s; }

          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
            50% { opacity: 0.3; transform: translateY(-30px) rotate(180deg); }
            100% { transform: translateY(-60px) rotate(360deg); opacity: 0; }
          }

          .animate-pulse-slow {
            animation: pulse-slow 3s infinite ease-in-out;
          }

          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.02); opacity: 0.95; }
          }

          .animate-modal-in {
            animation: modal-in 0.3s ease-out forwards;
          }

          @keyframes modal-in {
            to { transform: scale(1); opacity: 1; }
          }

          .animate-fade-out {
            animation: fade-out 5s ease-out forwards;
          }

          @keyframes fade-out {
            0% { opacity: 1; }
            80% { opacity: 1; }
            100% { opacity: 0; }
          }

          .animate-row-in {
            animation: row-in 0.5s ease-out forwards;
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