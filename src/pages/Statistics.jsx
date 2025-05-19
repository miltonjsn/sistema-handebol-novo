import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

function Statistics() {
  const [games, setGames] = useState([]);
  const [stats, setStats] = useState({
    totalGames: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    avgGoals: 0,
  });

  useEffect(() => {
    const storedGames = JSON.parse(localStorage.getItem('games')) || [];
    setGames(storedGames);

    const totalGames = storedGames.length;
    let wins = 0, draws = 0, losses = 0;
    let goalsFor = 0, goalsAgainst = 0;

    storedGames.forEach((game) => {
      const our = parseInt(game.ourScore);
      const opponent = parseInt(game.opponentScore);

      goalsFor += our;
      goalsAgainst += opponent;

      if (our > opponent) wins++;
      else if (our === opponent) draws++;
      else losses++;
    });

    const avgGoals = totalGames ? (goalsFor / totalGames).toFixed(2) : 0;

    setStats({
      totalGames,
      wins,
      draws,
      losses,
      goalsFor,
      goalsAgainst,
      avgGoals,
    });
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Estatísticas</h1>

      {/* Estatísticas Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center">
        <div className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 p-4 rounded-xl">
          <p className="text-xl font-semibold">{stats.totalGames}</p>
          <p className="text-sm">Jogos</p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 p-4 rounded-xl">
          <p className="text-xl font-semibold">{stats.wins}</p>
          <p className="text-sm">Vitórias</p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 p-4 rounded-xl">
          <p className="text-xl font-semibold">{stats.draws}</p>
          <p className="text-sm">Empates</p>
        </div>
        <div className="bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 p-4 rounded-xl">
          <p className="text-xl font-semibold">{stats.losses}</p>
          <p className="text-sm">Derrotas</p>
        </div>
        <div className="bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 p-4 rounded-xl col-span-2 md:col-span-1">
          <p className="text-xl font-semibold">{stats.goalsFor}</p>
          <p className="text-sm">Gols marcados</p>
        </div>
        <div className="bg-pink-100 dark:bg-pink-900 text-pink-900 dark:text-pink-100 p-4 rounded-xl col-span-2 md:col-span-1">
          <p className="text-xl font-semibold">{stats.goalsAgainst}</p>
          <p className="text-sm">Gols sofridos</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-xl col-span-2">
          <p className="text-xl font-semibold">{stats.avgGoals}</p>
          <p className="text-sm">Média de gols por jogo</p>
        </div>
      </div>

      {/* Tabela de jogos */}
      {games.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">Nenhum jogo registrado ainda.</p>
      ) : (
        <>
          <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Data</th>
                <th className="p-3 text-left">Adversário</th>
                <th className="p-3 text-center">Placar</th>
                <th className="p-3 text-left">Categoria</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-gray-100 dark:bg-gray-700' : 'bg-gray-50 dark:bg-gray-600'}
                >
                  <td className="p-3">{game.date}</td>
                  <td className="p-3">{game.opponent}</td>
                  <td className="p-3 text-center">
                    {game.ourScore} x {game.opponentScore}
                  </td>
                  <td className="p-3">{game.category}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Gráficos */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gráfico de Barras */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4 text-center">Resultados por Tipo</h2>
              <BarChart width={300} height={250} data={[
                { name: 'Vitórias', valor: stats.wins },
                { name: 'Empates', valor: stats.draws },
                { name: 'Derrotas', valor: stats.losses },
              ]}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="valor" fill="#4F46E5" />
              </BarChart>
            </div>

            {/* Gráfico de Pizza */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4 text-center">Distribuição de Resultados</h2>
              <PieChart width={300} height={250}>
                <Pie
                  data={[
                    { name: 'Vitórias', value: stats.wins },
                    { name: 'Empates', value: stats.draws },
                    { name: 'Derrotas', value: stats.losses },
                  ]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#4F46E5"
                  label
                >
                  <Cell fill="#22c55e" />
                  <Cell fill="#facc15" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Statistics;
