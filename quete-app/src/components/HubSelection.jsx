import React from 'react';
import { questRegistry } from '../data/registry';
import { Play, Trophy } from 'lucide-react';

export default function HubSelection({ onSelectTheme, onViewLeaderboard }) {
  return (
    <div className="animate-fade-in flex-col items-center">
      <h2 style={{color: 'var(--color-azur)', fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center'}}>Plateforme de Formation APRIL</h2>
      <p style={{fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '3rem', textAlign: 'center', maxWidth: 700}}>
        Sélectionnez le module d'apprentissage de votre choix. Vous aurez 7 minutes pour compléter les 3 phases interactives du thème sélectionné.
      </p>

      <button 
        className="btn-primary flex items-center gap-2 mb-8 mx-auto" 
        onClick={onViewLeaderboard}
        style={{backgroundColor: '#fef08a', color: '#854d0e', border: '1px solid #eab308', padding: '0.75rem 1.5rem'}}
      >
        <Trophy size={20} /> Voir le Classement Général
      </button>

      <div className="flex-col gap-6 w-full max-w-2xl">
        {questRegistry.map((quest, index) => (
          <div key={index} className="card flex justify-between items-center transition-all hover:shadow-lg cursor-pointer" style={{borderLeft: '6px solid var(--color-orange)'}} onClick={() => onSelectTheme(quest)}>
            
            <div className="flex-col gap-2">
              <h3 style={{fontSize: '1.4rem', color: 'var(--color-dark)', margin: 0}}>{quest.theme}</h3>
              <p style={{fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0, fontStyle: 'italic'}}>{quest.source}</p>
            </div>
            
            <button className="btn-primary flex items-center gap-2" style={{borderRadius: '50%', width: 50, height: 50, padding: 0, justifyContent: 'center'}}>
              <Play size={20} fill="currentColor" />
            </button>
            
          </div>
        ))}
      </div>
    </div>
  );
}
