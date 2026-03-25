import React, { useState, useEffect } from 'react';
import { Video, Calendar as CalendarIcon, Clock } from 'lucide-react';
import sergeUrl from '../assets/serge.jpg';

export default function TeamView() {
  const [isFlashVisioActive, setIsFlashVisioActive] = useState(false);

  // Simule l'activation de la visio
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlashVisioActive(true);
    }, 3000); // S'active après 3 secondes pour la démo
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="animate-fade-in w-full max-w-4xl mx-auto flex gap-6 flex-wrap md:flex-nowrap">
      
      {/* Colonne Mentor */}
      <div className="w-full md:w-1/3 flex-col gap-6">
        <div className="card text-center" style={{ borderTop: '4px solid var(--color-orange)' }}>
          <div className="w-24 h-24 rounded-full bg-slate-200 mx-auto mb-4 overflow-hidden border-4 border-white shadow-md">
            <img src={sergeUrl} alt="Serge Guerin" className="w-full h-full object-cover" />
          </div>
          <h3 className="font-bold text-lg" style={{ color: 'var(--color-dark)' }}>Serge Guérin</h3>
          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--color-orange)' }}>Mentor Scientifique</p>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Sociologue, spécialiste des questions liées au vieillissement et à la solidarité intergénérationnelle.</p>
        </div>

        <div className="card">
          <h4 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-dark)' }}>
            <Users size={18} color="var(--color-azur)" /> Votre Cellule d'Impact
          </h4>
          <ul className="text-sm flex flex-col gap-3" style={{ color: 'var(--color-text-muted)' }}>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22c55e' }}></span>
              <strong>Vous</strong> (Directrice BU)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22c55e' }}></span>
              <strong>Noémie Thévenot</strong> (DRH Pôle Assurance de Personnes)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22c55e' }}></span>
              <strong>Serge Guérin</strong> (Expert CA)
            </li>
          </ul>
        </div>
      </div>

      {/* Colonne Agenda & Actions */}
      <div className="w-full md:w-2/3 flex-col gap-6">
        <div className="card" style={{ flex: 1 }}>
          <h3 className="font-bold text-xl mb-6 flex items-center gap-2" style={{ color: 'var(--color-dark)' }}>
            <CalendarIcon size={24} color="var(--color-orange)" /> Agenda de la Cellule
          </h3>
          
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-start">
              <div>
                <h4 className="font-bold text-azur mb-1" style={{ color: 'var(--color-azur)' }}>Flash Visio : "Bilan Santé Mentale"</h4>
                <p className="text-sm text-slate-500 flex items-center gap-1"><Clock size={14} /> Aujourd'hui • 15min</p>
              </div>
              
              {isFlashVisioActive ? (
                <button className="btn-primary animate-pulse-slow flex items-center gap-2 px-4 py-2 text-sm" onClick={() => alert("Ouverture du lien Teams en cours...")}>
                  <Video size={16} /> Rejoindre
                </button>
              ) : (
                <button className="btn-outline flex items-center gap-2 px-4 py-2 text-sm opacity-50 cursor-not-allowed">
                  <Video size={16} /> En attente
                </button>
              )}
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 opacity-70">
              <h4 className="font-bold text-slate-700 mb-1">Dépôt du Livrable Stratégique</h4>
              <p className="text-sm text-slate-500 flex items-center gap-1"><Clock size={14} /> Vendredi 30 Nov</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// Inline helper because Users isn't imported from lucide-react above
import { Users } from 'lucide-react';
