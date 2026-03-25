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

      <div className="flex gap-6 mt-6 flex-wrap md:flex-nowrap">
        {/* Synthèse Documentaire */}
        <div className="w-full md:w-1/2 card" style={{ backgroundColor: '#fafafa' }}>
          <h3 className="font-bold flex items-center gap-2 mb-4" style={{ color: 'var(--color-dark)' }}>
            <FileText size={20} color="var(--color-azur)" /> Extraits de l'étude
          </h3>
          <div className="flex-col gap-4 max-h-[400px] overflow-y-auto pr-2">
             {selectedTheme.true_false_game.map((item, idx) => (
               <div key={idx} className="p-3 bg-white border border-slate-200 rounded text-sm mb-3 shadow-sm" style={{ borderLeft: '3px solid var(--color-orange)' }}>
                 <strong>Constat :</strong> {item.explanation}
               </div>
             ))}
             {selectedTheme.decision_game?.expert_insight && (
               <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-900 shadow-sm mt-4">
                 <strong>Insight Expert :</strong> {selectedTheme.decision_game.expert_insight}
               </div>
             )}
          </div>
        </div>

        {/* Validation Livrable */}
        <div className="w-full md:w-1/2 card flex-col justify-between">
          <div>
            <h3 className="font-bold flex items-center gap-2 mb-2" style={{ color: 'var(--color-dark)' }}>
              Validation du Livrable Cellule
            </h3>
            <p className="text-sm text-slate-500 mb-6">La validation de cette synthèse par les 3 membres du groupe générera la recommandation officielle.</p>
            
            <div className="flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${progress >= 1 ? 'bg-green-500' : 'bg-slate-300'}`}>
                  {progress >= 1 ? <CheckCircle size={14} /> : '1'}
                </div>
                <span className={progress >= 1 ? 'text-slate-800' : 'text-slate-400'}>Lecture de la synthèse BVA</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${progress >= 2 ? 'bg-green-500' : 'bg-slate-300'}`}>
                  {progress >= 2 ? <CheckCircle size={14} /> : '2'}
                </div>
                <span className={progress >= 2 ? 'text-slate-800' : 'text-slate-400'}>Lien avec les actions de la Fondation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${progress >= 3 ? 'bg-green-500' : 'bg-slate-300'}`}>
                  {progress >= 3 ? <CheckCircle size={14} /> : '3'}
                </div>
                <span className={progress >= 3 ? 'text-slate-800 font-bold' : 'text-slate-400'}>Approbation de la recommandation stratégique</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center bg-slate-50 p-4 border rounded-lg">
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
