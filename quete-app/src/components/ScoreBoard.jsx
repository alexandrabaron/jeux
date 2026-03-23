import React from 'react';
import { Medal, CheckCircle } from 'lucide-react';

export default function ScoreBoard({ theme, timeLeft, formatTime, onViewLeaderboard }) {
  // Mock points for completion
  const basePoints = 200;
  const collabBonus = 100;
  const totalScore = basePoints + collabBonus;
  
  // Honorary Titles mapping
  const titles = {
    "Rapport à la Santé et Système de Soins (18-25 ans)": "Visionnaire du Care",
    "Santé des Jeunes et Ethnographie Digitale": "Ethnographe Digital",
    "Sciences Comportementales et Prevention Sante": "Architecte des Choix"
  };

  const title = titles[theme] || "Leader de l'Impact";

  // Calculate percentage used of 7 mins for the visual bar 
  const totalSeconds = 7 * 60;
  const percentageTime = Math.round((timeLeft / totalSeconds) * 100);

  return (
    <div className="card animate-fade-in text-center flex-col items-center max-w-2xl mx-auto">
      <Medal size={64} cololor="var(--color-orange)" className="mb-4" />
      <h2 style={{color: 'var(--color-dark)', fontSize: '2.5rem', marginBottom: '0.5rem'}}>Module Terminé !</h2>
      <p style={{fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '2rem'}}>
        Temps restant : <strong>{formatTime(timeLeft)}</strong>
      </p>
      
      <div className="relative w-full rounded-full h-4 mb-8" style={{backgroundColor: '#e2e8f0', overflow: 'hidden'}}>
        <div className="absolute top-0 left-0 h-full" style={{width: `${percentageTime}%`, backgroundColor: 'var(--color-azur)'}}></div>
      </div>
      
      <div className="flex-col gap-2 mb-8 bg-slate-50 p-6 rounded-lg w-full text-left border" style={{borderColor: 'var(--color-border)'}}>
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Titre Honorifique :</span>
          <span style={{color: 'var(--color-orange)'}}>{title}</span>
        </div>
        <hr className="my-2 border-slate-200" />
        <div className="flex justify-between items-center text-sm text-slate-600">
          <span className="flex gap-2 items-center"><CheckCircle size={16}/> Complétion des modes</span>
          <span>{basePoints} Pts</span>
        </div>
        <div className="flex justify-between items-center text-sm text-slate-600">
          <span className="flex gap-2 items-center"><CheckCircle size={16}/> Bonus de Collaboration Expert</span>
          <span className="text-orange-600 font-bold">+{collabBonus} Pts</span>
        </div>
        <hr className="my-2 border-slate-200" />
        <div className="flex justify-between items-center text-2xl font-bold mt-2 text-azur">
          <span style={{color: 'var(--color-dark)'}}>Total Impact</span>
          <span style={{color: 'var(--color-azur)'}}>{totalScore}</span>
        </div>
      </div>

      <button className="btn-primary" onClick={onViewLeaderboard}>
        Voir le classement général
      </button>
    </div>
  );
}
