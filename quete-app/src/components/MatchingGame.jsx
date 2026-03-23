import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export default function MatchingGame({ data, onComplete }) {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedDef, setSelectedDef] = useState(null);
  const [matches, setMatches] = useState([]); // Array of matched term indices
  const [error, setError] = useState(false);

  // Shuffle definitions only once on mount
  const shuffledDefs = useMemo(() => {
    return [...data].map((item, index) => ({ ...item, originalIndex: index }))
      .sort(() => Math.random() - 0.5);
  }, [data]);

  const handleTermClick = (index) => {
    if (matches.includes(index)) return;
    setSelectedTerm(index);
    setError(false);
  };

  const handleDefClick = (originalIndex) => {
    if (matches.includes(originalIndex)) return;
    setSelectedDef(originalIndex);
    setError(false);
  };

  useEffect(() => {
    if (selectedTerm !== null && selectedDef !== null) {
      if (selectedTerm === selectedDef) {
        // Match!
        setMatches((prev) => [...prev, selectedTerm]);
        setSelectedTerm(null);
        setSelectedDef(null);
      } else {
        // Error
        setError(true);
        setTimeout(() => {
          setSelectedTerm(null);
          setSelectedDef(null);
          setError(false);
        }, 800);
      }
    }
  }, [selectedTerm, selectedDef]);

  const allMatched = matches.length === data.length;

  return (
    <div className="card animate-fade-in w-full max-w-4xl">
      <div className="mb-6 flex justify-between items-center text-sm font-bold" style={{color: 'var(--color-text-muted)'}}>
        <span>Étape 1 / 3</span>
        <span style={{color: 'var(--color-orange)'}}>LE LINKER (MATCHING)</span>
      </div>
      
      <h3 style={{fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-dark)'}}>Associez les termes à leurs définitions</h3>
      <p style={{color: 'var(--color-text-muted)', marginBottom: '2rem'}}>Cliquez sur un terme à gauche, puis sur sa définition correspondante à droite.</p>

      {!allMatched ? (
        <div className="flex gap-8 justify-between">
          {/* Terms Column */}
          <div className="flex-col gap-4 w-1/3">
            {data.map((item, index) => {
              const isMatched = matches.includes(index);
              const isSelected = selectedTerm === index;
              return (
                <button 
                  key={`term-${index}`}
                  disabled={isMatched}
                  className={`p-4 text-left transition-all ${isMatched ? 'opacity-80' : ''}`}
                  style={{
                    backgroundColor: isSelected ? 'var(--color-azur)' : (isMatched ? '#dcfce7' : 'var(--color-surface)'),
                    color: isSelected ? 'white' : (isMatched ? '#166534' : 'var(--color-dark)'),
                    border: `2px solid ${isSelected ? 'var(--color-azur)' : (error && isSelected ? 'red' : (isMatched ? '#bbf7d0' : 'var(--color-border)'))}`,
                    borderRadius: 'var(--radius-md)'
                  }}
                  onClick={() => handleTermClick(index)}
                >
                  <strong>{item.term}</strong>
                </button>
              );
            })}
          </div>

          {/* Definitions Column */}
          <div className="flex-col gap-4 w-2/3">
            {shuffledDefs.map((defItem, idx) => {
              const isMatched = matches.includes(defItem.originalIndex);
              const isSelected = selectedDef === defItem.originalIndex;
              return (
                <button 
                  key={`def-${idx}`}
                  disabled={isMatched}
                  className={`p-4 text-left transition-all ${isMatched ? 'opacity-80' : ''}`}
                  style={{
                    backgroundColor: isSelected ? 'var(--color-orange)' : (isMatched ? '#dcfce7' : 'var(--color-surface)'),
                    color: isSelected ? 'white' : (isMatched ? '#166534' : 'var(--color-dark)'),
                    border: `2px solid ${isSelected ? 'var(--color-orange)' : (error && isSelected ? 'red' : (isMatched ? '#bbf7d0' : 'var(--color-border)'))}`,
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.95rem'
                  }}
                  onClick={() => handleDefClick(defItem.originalIndex)}
                >
                  {defItem.definition}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="animate-fade-in p-8 text-center rounded-lg" style={{backgroundColor: '#f0fdf4', border: '2px solid #bbf7d0'}}>
          <CheckCircle2 size={48} color="#166534" className="mx-auto mb-4" />
          <h4 style={{color: '#166534', fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 'bold'}}>Excellent ! Tous les concepts sont maîtrisés.</h4>
          <button className="btn-primary mx-auto flex items-center justify-center gap-2" onClick={onComplete}>
            Passer à la suite <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
