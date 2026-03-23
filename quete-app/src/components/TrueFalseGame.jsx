import React, { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';

export default function TrueFalseGame({ data, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState(null); // { isCorrect, explanation }
  
  const currentStatement = data[currentIndex];

  const handleAnswer = (userChoice) => {
    const isCorrect = String(userChoice).toLowerCase() === String(currentStatement.is_true).toLowerCase();
    setFeedback({
      isCorrect,
      explanation: currentStatement.explanation
    });
  };

  const nextStatement = () => {
    setFeedback(null);
    if (currentIndex < data.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="card animate-fade-in w-full max-w-2xl text-center flex-col items-center">
      <div className="mb-6 flex justify-between items-center text-sm font-bold w-full" style={{color: 'var(--color-text-muted)'}}>
        <span>Étape 2 / 3 (Question {currentIndex + 1}/{data.length})</span>
        <span style={{color: 'var(--color-orange)'}}>VRAI OU FAUX EXPRESS</span>
      </div>

      {!feedback ? (
        <div className="flex-col items-center w-full animate-fade-in">
          <div className="p-8 mb-8 rounded-lg" style={{backgroundColor: '#f8fafc', border: '1px solid var(--color-border)'}}>
            <h3 style={{fontSize: '1.5rem', color: 'var(--color-dark)', lineHeight: 1.5}}>
              "{currentStatement.statement}"
            </h3>
          </div>
          
          <div className="flex gap-4 w-full justify-center">
            <button 
              className="flex items-center justify-center gap-2 flex-grow max-w-[200px]" 
              style={{backgroundColor: '#22c55e', color: 'white', fontSize: '1.2rem', padding: '1rem'}}
              onClick={() => handleAnswer(true)}
            >
              <Check size={24} /> VRAI
            </button>
            <button 
              className="flex items-center justify-center gap-2 flex-grow max-w-[200px]" 
              style={{backgroundColor: '#ef4444', color: 'white', fontSize: '1.2rem', padding: '1rem'}}
              onClick={() => handleAnswer(false)}
            >
              <X size={24} /> FAUX
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full animate-fade-in">
          <div className="p-6 rounded-lg mb-8 text-left" style={{backgroundColor: feedback.isCorrect ? '#f0fdf4' : '#fef2f2', border: `1px solid ${feedback.isCorrect ? '#bbf7d0' : '#fecaca'}`}}>
            <h4 style={{color: feedback.isCorrect ? '#166534' : '#991b1b', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px'}}>
              {feedback.isCorrect ? <Check size={24}/> : <X size={24}/>} 
              {feedback.isCorrect ? "C'est exact !" : "Faux !"}
            </h4>
            <p style={{color: 'var(--color-dark)', fontSize: '1.1rem', lineHeight: 1.6}}>
              {feedback.explanation}
            </p>
          </div>
          <button className="btn-primary flex items-center justify-center gap-2 mx-auto" onClick={nextStatement}>
            {currentIndex < data.length - 1 ? 'Question Suivante' : 'Terminer cette phase'} <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
