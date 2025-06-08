// src/components/Layout.jsx
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';
import background from '../assets/background/bginvex.jpg';

export default function Layout({ children }) {
  return (
    <div 
    className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat bg-fixed"
    style={{ backgroundImage: `url(${background})` }}
  >
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}