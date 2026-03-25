import React, { useState } from 'react';
import { questRegistry } from '../data/registry';
import { FileText, CheckCircle } from 'lucide-react';

export default function TrainingView() {
  const [progress, setProgress] = useState(0); // 0, 1, 2, 3
  const [selectedTheme, setSelectedTheme] = useState(questRegistry[0]);

  const handleValidate = () => {
    if (progress < 3) {
      setProgress(progress + 1);
    }
  };

  return (
    <div className="animate-fade-in w-full max-w-4xl mx-auto flex-col gap-6">
      <div className="card text-center pb-8 border-b border-slate-200">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-dark)' }}>Dossier Stratégique du Mois</h2>
        <p className="text-slate-500 mb-6">Consultez la synthèse de l'étude et validez la position de votre groupe en 3 étapes.</p>
        
        <select 
          className="p-3 rounded-lg border border-slate-300 w-full max-w-md mx-auto text-center"
          value={questRegistry.indexOf(selectedTheme)}
          onChange={(e) => {
            setSelectedTheme(questRegistry[e.target.value]);
            setProgress(0);
          }}
        >
          {questRegistry.map((quest, idx) => (
            <option key={idx} value={idx}>{quest.theme}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-6 mt-6 flex-wrap md:flex-nowrap" style={{ flexWrap: 'wrap' }}>
        {/* Synthèse Documentaire */}
        <div className="card" style={{ backgroundColor: '#fafafa', flex: '1 1 100%' }}>
          <h3 className="font-bold flex items-center gap-2 mb-4" style={{ color: 'var(--color-dark)' }}>
            <FileText size={20} color="var(--color-azur)" /> Extraits de l'étude
          </h3>
          <div className="flex-col gap-4" style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
             {selectedTheme.true_false_game.map((item, idx) => (
               <div key={idx} style={{ padding: '1rem', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '4px', marginBottom: '1rem', borderLeft: '4px solid var(--color-orange)' }}>
                 <strong>Constat :</strong> {item.explanation.replace(/\[cite:[^\]]*\]/g, '')}
               </div>
             ))}
             {selectedTheme.decision_game?.expert_insight && (
               <div style={{ padding: '1rem', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '4px', color: '#1e3a8a', marginTop: '1rem' }}>
                 <strong>Insight Expert :</strong> {selectedTheme.decision_game.expert_insight.replace(/\[cite:[^\]]*\]/g, '')}
               </div>
             )}
          </div>
        </div>

        {/* Validation Livrable */}
        <div className="card flex-col justify-between" style={{ flex: '1 1 100%' }}>
          <div>
            <h3 className="font-bold flex items-center gap-2 mb-2" style={{ color: 'var(--color-dark)' }}>
              Validation du Livrable Cellule
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>La validation de cette synthèse par les 3 membres du groupe générera la recommandation officielle.</p>
            
            <div className="flex-col" style={{ gap: '1rem' }}>
              
              <div className="flex items-center gap-3">
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 'bold', backgroundColor: progress >= 1 ? '#22c55e' : '#cbd5e1' }}>
                  {progress >= 1 ? <CheckCircle size={14} /> : '1'}
                </div>
                <span style={{ color: progress >= 1 ? 'var(--color-dark)' : 'var(--color-text-muted)' }}>Lecture de la synthèse BVA</span>
              </div>

              <div className="flex items-center gap-3">
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 'bold', backgroundColor: progress >= 2 ? '#22c55e' : '#cbd5e1' }}>
                  {progress >= 2 ? <CheckCircle size={14} /> : '2'}
                </div>
                <span style={{ color: progress >= 2 ? 'var(--color-dark)' : 'var(--color-text-muted)' }}>Lien avec les actions de la Fondation</span>
              </div>

              <div className="flex items-center gap-3">
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 'bold', backgroundColor: progress >= 3 ? '#22c55e' : '#cbd5e1' }}>
                  {progress >= 3 ? <CheckCircle size={14} /> : '3'}
                </div>
                <span style={{ color: progress >= 3 ? 'var(--color-dark)' : 'var(--color-text-muted)', fontWeight: progress >= 3 ? 'bold' : 'normal' }}>Approbation de la reco stratégique</span>
              </div>

            </div>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center', backgroundColor: '#f8fafc', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
             {progress < 3 ? (
               <button className="btn-primary w-full" onClick={handleValidate}>
                 Valider l'Étape {progress + 1}
               </button>
             ) : (
               <div className="text-green-600 font-bold flex items-center justify-center gap-2">
                 <CheckCircle size={24} /> Livrable Transmis au COPIL !
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
