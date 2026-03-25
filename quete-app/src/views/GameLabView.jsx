import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import HubSelection from '../components/HubSelection';
import MatchingGame from '../components/MatchingGame';
import TrueFalseGame from '../components/TrueFalseGame';
import DecisionDilemma from '../components/DecisionDilemma';
import ScoreBoard from '../components/ScoreBoard';
import Leaderboard from '../components/Leaderboard';

export default function GameLabView() {
  const [gameStep, setGameStep] = useState('hub'); // 'hub', 'mode1', 'mode2', 'mode3', 'score'
  const [selectedQuest, setSelectedQuest] = useState(null);

  const TOTAL_TIME = 7 * 60;
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && gameStep !== 'score' && gameStep !== 'hub') {
      endQuest();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, gameStep]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const startQuestFlow = (questData) => {
    setSelectedQuest(questData);
    setTimeLeft(TOTAL_TIME);
    setIsTimerRunning(true);
    setGameStep('mode1');
  };

  const endQuest = () => {
    setIsTimerRunning(false);
    setGameStep('score');
  };

  return (
    <div className="w-full flex-col flex-1 items-center justify-center relative">
      {/* Game Timer Component - Only visible during gameplay */}
      {gameStep !== 'hub' && gameStep !== 'score' && (
        <div className="w-full flex justify-end mb-6 animate-fade-in">
          <div className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold bg-white text-slate-700 border border-slate-200 shadow-sm" style={{transition: 'all 0.3s'}}>
            <Clock size={22} color="var(--color-orange)" />
            <span style={{fontSize: '1.2rem'}}>{formatTime(timeLeft)}</span>
          </div>
        </div>
      )}
      
      {gameStep === 'hub' && (
        <HubSelection onSelectTheme={startQuestFlow} />
      )}
      
      {gameStep === 'mode1' && selectedQuest && (
        <MatchingGame 
          data={selectedQuest.matching_game} 
          onComplete={() => setGameStep('mode2')} 
        />
      )}
      
      {gameStep === 'mode2' && selectedQuest && (
        <TrueFalseGame 
          data={selectedQuest.true_false_game} 
          onComplete={() => setGameStep('mode3')} 
        />
      )}

      {gameStep === 'mode3' && selectedQuest && (
         <DecisionDilemma 
           data={selectedQuest.decision_game} 
           onComplete={endQuest} 
         />
      )}

      {gameStep === 'score' && selectedQuest && (
        <ScoreBoard 
          theme={selectedQuest.theme}
          timeLeft={timeLeft}
          formatTime={formatTime}
          onViewLeaderboard={() => setGameStep('leaderboard')}
        />
      )}

      {gameStep === 'leaderboard' && (
        <Leaderboard 
          playerScore={300}
          onRestart={() => {
            setGameStep('hub');
            setIsTimerRunning(false);
          }} 
        />
      )}
    </div>
  );
}
