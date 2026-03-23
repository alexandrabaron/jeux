import React, { useState } from 'react';
import { ArrowRight, Share2, Lightbulb } from 'lucide-react';

export default function DecisionDilemma({ data, onComplete }) {
  const [jokerUsed, setJokerUsed] = useState(false);
  const [showInsight, setShowInsight] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleJokerClick = () => {
    setJokerUsed(true);
    // Simulate async expert call
    setTimeout(() => {
      setShowInsight(true);
    }, 1500);
  };

  const handleOptionSelect = (option) => {
    if (!jokerUsed) {
      alert("Demandez d'abord l'avis à votre binôme Expert !");
      return;
    }
    setSelectedOption(option);
  };

  return (
    <div className="card animate-fade-in w-full max-w-3xl">
      <div className="mb-6 flex justify-between items-center text-sm font-bold w-full" style={{color: 'var(--color-text-muted)'}}>
        <span>Étape 3 / 3</span>
        <span style={{color: 'var(--color-orange)'}}>LE DILEMME DÉCISIONNEL</span>
      </div>

      <h3 style={{fontSize: '1.4rem', marginBottom: '2rem', color: 'var(--color-dark)', lineHeight: 1.5}}>
        {data.scenario}
      </h3>

      {!selectedOption ? (
        <div className="flex-col gap-6">
          <div className="p-6 rounded-lg text-center" style={{backgroundColor: '#eff6ff', border: '1px dashed var(--color-azur)'}}>
            <p className="mb-4 text-sm" style={{color: 'var(--color-text-muted)'}}>
              Pour débloquer les solutions et décrocher un bonus d'impact (+50%), consultez votre binôme scientifique.
            </p>
            {!jokerUsed ? (
              <button className="btn-secondary flex items-center justify-center gap-2 w-full mx-auto max-w-sm" onClick={handleJokerClick}>
                <Share2 size={20} /> Appeler l'Expert à la rescousse
              </button>
            ) : !showInsight ? (
              <div className="animate-pulse flex items-center justify-center gap-2 text-blue-600 font-bold p-3">
                <Share2 className="animate-spin-slow" size={20} /> Consultation en cours...
              </div>
            ) : (
              <div className="animate-fade-in text-left p-4 bg-white rounded shadow-sm">
                <h4 className="flex items-center gap-2 text-orange-600 font-bold mb-2">
                  <Lightbulb size={20} color="var(--color-orange)" /> Conseil de l'Expert
                </h4>
                <p style={{color: 'var(--color-dark)', fontStyle: 'italic'}}>{data.expert_insight}</p>
              </div>
            )}
          </div>

          <div className="flex-col gap-3 mt-4">
            {data.options.map((opt, idx) => (
              <button 
                key={idx} 
                disabled={!showInsight}
                className="btn-outline w-full text-left p-4 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleOptionSelect(opt)}
                style={{fontSize: '1rem', whiteSpace: 'normal'}}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-fade-in text-center p-8 bg-green-50 border border-green-200 rounded-lg">
          <h4 style={{color: '#166534', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 'bold'}}>
            Décision validée !
          </h4>
          <p style={{marginBottom: '2rem', color: 'var(--color-text-muted)'}}>
            Bonus de collaboration (+50%) sécurisé grâce à l'intervention de votre binôme.
          </p>
          <button className="btn-primary mx-auto flex items-center justify-center gap-2" onClick={onComplete}>
            Voir mon Bilan <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
