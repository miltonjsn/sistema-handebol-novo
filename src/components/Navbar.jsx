import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">Liga Paulista de Handebol</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-yellow-300">Início</Link>
        <Link to="/register" className="hover:text-yellow-300">Cadastrar Jogo</Link>
        <Link to="/statistics" className="hover:text-yellow-300">Estatísticas</Link>
      </div>
    </nav>
  );
}
