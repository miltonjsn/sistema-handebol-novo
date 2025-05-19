import React, { useState } from 'react';

function RegisterGame() {
  const [formData, setFormData] = useState({
    date: '',
    opponent: '',
    ourScore: '',
    opponentScore: '',
    category: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Recupera os jogos salvos anteriormente (ou inicia com array vazio)
    const storedGames = JSON.parse(localStorage.getItem('games')) || [];

    // Adiciona o novo jogo ao array
    const updatedGames = [...storedGames, formData];

    // Salva novamente no localStorage
    localStorage.setItem('games', JSON.stringify(updatedGames));

    // Limpa o formulário
    setFormData({
      date: '',
      opponent: '',
      ourScore: '',
      opponentScore: '',
      category: '',
    });

    alert('Jogo salvo com sucesso!');
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Registrar Jogo</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md dark:bg-gray-800">
        <div>
          <label className="block font-medium mb-1">Data do jogo</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Adversário</label>
          <input
            type="text"
            name="opponent"
            value={formData.opponent}
            onChange={handleChange}
            placeholder="Ex: Sorocaba HC"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">Nosso Placar</label>
            <input
              type="number"
              name="ourScore"
              value={formData.ourScore}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block font-medium mb-1">Placar do Adversário</label>
            <input
              type="number"
              name="opponentScore"
              value={formData.opponentScore}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Categoria</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Selecione</option>
            <option value="Sub-14">Sub-14</option>
            <option value="Sub-16">Sub-16</option>
            <option value="Sub-18">Sub-18</option>
            <option value="Adulto">Adulto</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Salvar Jogo
        </button>
      </form>
    </div>
  );
}

export default RegisterGame;
