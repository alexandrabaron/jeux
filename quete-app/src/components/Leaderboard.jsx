import React from 'react';
import { Trophy, ArrowRight } from 'lucide-react';

export default function Leaderboard({ playerScore, onRestart }) {
  const teams = [
    { id: 't1', name: 'Les Sprinteurs', score: playerScore + 20, isPlayer: false },
    { id: 'player', name: 'Votre Équipe', score: playerScore, isPlayer: true },
    { id: 't2', name: 'Les Explorateurs', score: Math.max(0, playerScore - 40), isPlayer: false },
    { id: 't3', name: 'Les Analystes', score: Math.max(0, playerScore - 90), isPlayer: false }
  ];

  // Sort by score descending
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  return (
    <div className="card animate-fade-in w-full max-w-2xl text-center flex-col items-center mx-auto">
      <Trophy size={64} style={{color: '#eab308', marginBottom: '1rem'}} />
      <h2 style={{color: 'var(--color-dark)', fontSize: '2.5rem', marginBottom: '0.5rem'}}>Classement Général</h2>
      <p style={{fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '2rem'}}>
        Comparaison des 4 équipes
      </p>

      <div className="w-full flex-col gap-4 mb-8 text-left">
        {sortedTeams.map((team, index) => (
          <div 
            key={team.id}
            className="flex justify-between items-center p-4 rounded-lg border-2"
            style={{
              backgroundColor: team.isPlayer ? '#f0fdf4' : 'var(--color-surface)',
              borderColor: team.isPlayer ? '#22c55e' : 'var(--color-border)',
              transform: team.isPlayer ? 'scale(1.02)' : 'none',
              transition: 'all 0.3s'
            }}
          >
            <div className="flex items-center gap-4">
              <span className="font-bold text-2xl" style={{color: index === 0 ? '#eab308' : (index === 1 ? '#94a3b8' : (index === 2 ? '#b45309' : 'var(--color-text-muted)'))}}>
                #{index + 1}
              </span>
              <span className="font-bold text-xl" style={{color: team.isPlayer ? '#166534' : 'var(--color-dark)'}}>{team.name}</span>
            </div>
            <span className="font-bold text-xl" style={{color: team.isPlayer ? '#15803d' : 'var(--color-azur)'}}>{team.score} Pts</span>
          </div>
        ))}
      </div>

      <button className="btn-primary flex items-center justify-center gap-2 mx-auto" onClick={onRestart}>
        Retourner à l'accueil <ArrowRight size={20} />
      </button>
    </div>
  );
}
