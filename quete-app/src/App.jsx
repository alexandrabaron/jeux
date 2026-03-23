import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import HubSelection from './components/HubSelection';
import MatchingGame from './components/MatchingGame';
import TrueFalseGame from './components/TrueFalseGame';
import DecisionDilemma from './components/DecisionDilemma';
import ScoreBoard from './components/ScoreBoard';
import Leaderboard from './components/Leaderboard';

function App() {
  const [step, setStep] = useState('hub'); // 'hub', 'mode1', 'mode2', 'mode3', 'score', 'leaderboard'
  const [selectedQuest, setSelectedQuest] = useState(null);
  
  // Timer state
  const TOTAL_TIME = 7 * 60; // 7 minutes
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && step !== 'score' && step !== 'hub' && step !== 'leaderboard') {
      endQuest(); // Timer expired
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, step]);

  const startQuestFlow = (questData) => {
    setSelectedQuest(questData);
    setTimeLeft(TOTAL_TIME); // Reset timer just in case
    setIsTimerRunning(true);
    setStep('mode1');
  };

  const endQuest = () => {
    setIsTimerRunning(false);
    setStep('score');
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const renderHeader = () => (
    <header className="flex justify-between items-center mb-8 pb-4" style={{borderBottom: '2px solid var(--color-border)'}}>
      <div className="flex items-center gap-4">
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Fondation APRIL" style={{ height: '40px', objectFit: 'contain' }} />
        <h1 style={{fontSize: '1.25rem', color: 'var(--color-dark)'}}>Fondation APRIL</h1>
      </div>
      
      {step !== 'hub' && step !== 'score' && step !== 'leaderboard' && (
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold ${timeLeft < 60 ? 'animate-pulse' : ''}`} style={{backgroundColor: timeLeft < 60 ? '#fee2e2' : '#f1f5f9', color: timeLeft < 60 ? '#ef4444' : 'var(--color-text-muted)', transition: 'all 0.3s'}}>
          <Clock size={20} />
          {formatTime(timeLeft)}
        </div>
      )}
    </header>
  );

  return (
    <>
      {renderHeader()}
      <main className="w-full h-full flex items-center justify-center flex-col">
        {step === 'hub' && (
          <HubSelection 
            onSelectTheme={startQuestFlow} 
            onViewLeaderboard={() => setStep('leaderboard')}
          />
        )}
        
        {step === 'mode1' && selectedQuest && (
          <MatchingGame 
            data={selectedQuest.matching_game} 
            onComplete={() => setStep('mode2')} 
          />
        )}
        
        {step === 'mode2' && selectedQuest && (
          <TrueFalseGame 
            data={selectedQuest.true_false_game} 
            onComplete={() => setStep('mode3')} 
          />
        )}

        {step === 'mode3' && selectedQuest && (
           <DecisionDilemma 
             data={selectedQuest.decision_game} 
             onComplete={() => endQuest()} 
           />
        )}

        {step === 'score' && selectedQuest && (
          <ScoreBoard 
            theme={selectedQuest.theme}
            timeLeft={timeLeft}
            formatTime={formatTime}
            onViewLeaderboard={() => setStep('leaderboard')}
          />
        )}

        {step === 'leaderboard' && (
          <Leaderboard 
            playerScore={300}
            onRestart={() => window.location.reload()}
          />
        )}
      </main>
    </>
  );
}

export default App;
