import React, { useState, useEffect } from 'react';
import queteData from './data/quete_mensuelle.json';
import { Clock, Play, CheckCircle2, AlertCircle, ArrowRight, Share2, Medal } from 'lucide-react';

function App() {
  const [step, setStep] = useState('intro'); // 'intro', 'quiz', 'score'
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [usedJoker, setUsedJoker] = useState(false);
  
  // Timer state
  const TOTAL_TIME = 7 * 60; // 7 minutes
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Expert Modal State
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [expertTimeLeft, setExpertTimeLeft] = useState(60);
  const [expertResponse, setExpertResponse] = useState('');
  
  // Feedback state
  const [feedback, setFeedback] = useState(null); // { isCorrect: boolean, text: string }

  // Format time (MM:SS)
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    let interval;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && step !== 'score') {
      endQuest();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, step]);

  useEffect(() => {
    let interval;
    if (showExpertModal && expertTimeLeft > 0) {
      interval = setInterval(() => setExpertTimeLeft((prev) => prev - 1), 1000);
    } else if (expertTimeLeft === 0 && showExpertModal) {
      closeExpertModal();
    }
    return () => clearInterval(interval);
  }, [showExpertModal, expertTimeLeft]);

  const startQuest = () => {
    setIsTimerRunning(true);
    setStep('quiz');
  };

  const endQuest = () => {
    setIsTimerRunning(false);
    setStep('score');
  };

  const handleAnswer = (selectedOption) => {
    const currentQ = queteData.quiz_impact[currentQuestionIdx];
    const isCorrect = selectedOption === currentQ.bonne_reponse;
    
    if (isCorrect) {
       setScore(prev => prev + 100);
    }

    setFeedback({
      isCorrect,
      text: isCorrect ? "Excellente analyse !" : "C'est incorrect.",
      explication: currentQ.explication
    });
  };

  const nextQuestion = () => {
    setFeedback(null);
    if (currentQuestionIdx < queteData.quiz_impact.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      endQuest();
    }
  };

  const openExpertModal = () => {
    setShowExpertModal(true);
    setExpertTimeLeft(60);
    setUsedJoker(true);
    setIsTimerRunning(false); // Pause main timer
  };

  const closeExpertModal = () => {
    setShowExpertModal(false);
    setIsTimerRunning(true); // Resume main timer
    setFeedback({
      isCorrect: true,
      text: "L'avis de l'expert a été pris en compte !",
      explication: "L'expert souligne que le biais de préférence pour le présent (le 'Système 1') supplante l'information rationnelle. Modifier l'architecture des choix est donc la clé."
    });
    // The joker is highly valued
    setScore(prev => prev + 200); 
  };

  // --------------------------------------------------------------------------
  // Render Helpers
  // --------------------------------------------------------------------------
  
  const renderHeader = () => (
    <header className="flex justify-between items-center mb-8 pb-4" style={{borderBottom: '2px solid var(--color-border)'}}>
      <div className="flex items-center gap-4">
        <div style={{width: 40, height: 40, backgroundColor: 'var(--color-orange)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold'}}>FA</div>
        <h1 style={{fontSize: '1.25rem', color: 'var(--color-dark)'}}>Fondation APRIL</h1>
      </div>
      <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold ${timeLeft < 60 ? 'animate-pulse' : ''}`} style={{backgroundColor: timeLeft < 60 ? '#fee2e2' : '#f1f5f9', color: timeLeft < 60 ? '#ef4444' : 'var(--color-text-muted)'}}>
        <Clock size={20} />
        {formatTime(timeLeft)}
      </div>
    </header>
  );

  const renderIntro = () => (
    <div className="card animate-fade-in text-center flex-col items-center">
      <h2 style={{color: 'var(--color-azur)', fontSize: '2rem', marginBottom: '1rem'}}>{queteData.titre}</h2>
      <p style={{fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: 600, lineHeight: 1.6}}>
        {queteData.pitch_intro}
      </p>
      <button className="btn-primary flex items-center justify-center gap-2" style={{fontSize: '1.25rem', padding: '1rem 2rem'}} onClick={startQuest}>
        <Play size={24} /> Démarrer la Quête
      </button>
    </div>
  );

  const renderQuiz = () => {
    const q = queteData.quiz_impact[currentQuestionIdx];
    const isExpertQuestion = q.type === 'appel_expert';

    return (
      <div className="card animate-fade-in">
        <div className="mb-6 flex justify-between items-center text-sm font-bold" style={{color: 'var(--color-text-muted)'}}>
          <span>Question {currentQuestionIdx + 1} / {queteData.quiz_impact.length}</span>
          <span style={{color: 'var(--color-orange)'}}>{q.type.toUpperCase()}</span>
        </div>
        
        <h3 style={{fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-dark)'}}>{q.question}</h3>
        
        {feedback ? (
          <div className="animate-fade-in p-6 rounded-lg mb-6" style={{backgroundColor: feedback.isCorrect ? '#f0fdf4' : '#fef2f2', border: `1px solid ${feedback.isCorrect ? '#bbf7d0' : '#fecaca'}`}}>
            <div className="flex items-center gap-3 mb-2" style={{color: feedback.isCorrect ? '#166534' : '#991b1b', fontWeight: 'bold', fontSize: '1.25rem'}}>
              {feedback.isCorrect ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
              {feedback.text}
            </div>
            <p style={{color: 'var(--color-text-muted)'}}>{feedback.explication}</p>
            <button className="btn-primary mt-6 flex items-center gap-2 w-full justify-center" onClick={nextQuestion}>
              Continuer <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div className="flex-col gap-4">
            {isExpertQuestion ? (
              <div className="p-6 rounded-lg text-center" style={{backgroundColor: '#eff6ff', border: '1px dashed var(--color-azur)'}}>
                <p className="mb-6" style={{fontSize: '1.1rem'}}>{q.consigne_binome}</p>
                <button className="btn-secondary flex items-center justify-center gap-2 w-full" onClick={openExpertModal} style={{padding: '1rem'}}>
                  <Share2 size={20} /> Envoyer à mon binôme pour avis
                </button>
              </div>
            ) : (
              q.options.map((opt, i) => (
                <button key={i} className="btn-outline w-full text-left" style={{padding: '1rem', marginBottom: '1rem'}} onClick={() => handleAnswer(opt)}>
                  {opt}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    );
  };

  const renderScore = () => {
    // A perfect score without joker is 200. With joker it's 400.
    const maxScore = 400;
    const percentage = Math.round((score / maxScore) * 100);
    
    return (
      <div className="card animate-fade-in text-center flex-col items-center">
        <Medal size={64} color="var(--color-orange)" className="mb-4" />
        <h2 style={{color: 'var(--color-dark)', fontSize: '2.5rem', marginBottom: '0.5rem'}}>Quête Terminée !</h2>
        <p style={{fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '2rem'}}>
          Temps restant : <strong>{formatTime(timeLeft)}</strong>
        </p>
        
        <div className="relative w-full rounded-full h-4 mb-6" style={{backgroundColor: '#e2e8f0', overflow: 'hidden'}}>
          <div className="absolute top-0 left-0 h-full" style={{width: `${percentage}%`, backgroundColor: 'var(--color-azur)', transition: 'width 1s ease-out'}}></div>
        </div>
        
        <h3 style={{fontSize: '3rem', color: 'var(--color-azur)', fontWeight: 'bold', marginBottom: '1rem'}}>{score} <span style={{fontSize: '1.5rem', color: 'var(--color-text-muted)'}}>Pts Impact</span></h3>
        
        {usedJoker && (
          <div className="px-4 py-2 rounded-full font-bold text-sm mb-6 inline-block" style={{backgroundColor: '#fef3c7', color: '#b45309'}}>
            + Bonus de Collaboration obtenu !
          </div>
        )}

        <div className="mt-8 p-6 text-left rounded-lg shadow-sm" style={{backgroundColor: '#f8fafc', borderLeft: '4px solid var(--color-orange)'}}>
          <h4 className="font-bold mb-2 uppercase" style={{color: 'var(--color-orange)'}}>Takeaway pour dirigeants</h4>
          <p style={{color: 'var(--color-dark)'}}>{queteData.takeaway_dirigeant}</p>
        </div>
      </div>
    );
  };

  const renderExpertModal = () => {
    if (!showExpertModal) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backgroundColor: 'rgba(11, 63, 99, 0.8)'}}>
        <div className="card w-full max-w-md animate-fade-in relative shadow-glow">
          <div className="absolute top-0 right-0 p-4 font-mono font-bold" style={{color: expertTimeLeft < 15 ? 'red' : 'inherit'}}>
            00:{expertTimeLeft.toString().padStart(2, '0')}
          </div>
          <h3 style={{color: 'var(--color-azur)', marginBottom: '1rem'}}>Consultation de l'Expert en cours...</h3>
          <p className="mb-4 text-sm" style={{color: 'var(--color-text-muted)'}}>Votre binôme expert dispose de 60s pour formuler son analyse. Tapez la synthèse de son analyse ci-dessous :</p>
          <textarea 
            className="w-full p-3 border rounded-md mb-4" 
            rows="4" 
            placeholder="Ex: L'expert mentionne que la préférence pour le présent empêche..."
            value={expertResponse}
            onChange={(e) => setExpertResponse(e.target.value)}
            style={{borderColor: 'var(--color-border)', resize: 'none'}}
          ></textarea>
          <button className="btn-primary w-full flex justify-center py-3" onClick={closeExpertModal}>
            Valider la réponse de l'Expert
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderHeader()}
      <main>
        {step === 'intro' && renderIntro()}
        {step === 'quiz' && renderQuiz()}
        {step === 'score' && renderScore()}
      </main>
      {renderExpertModal()}
    </>
  );
}

export default App;
