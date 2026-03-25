import React, { useState } from 'react';
import { Home } from 'lucide-react';
import logoUrl from './assets/logo.png';
import Navigation from './components/Navigation';
import TeamView from './views/TeamView';
import TrainingView from './views/TrainingView';
import GameLabView from './views/GameLabView';
import NewsView from './views/NewsView';

function App() {
  const [activeTab, setActiveTab] = useState('team'); // 'team', 'training', 'lab', 'news'
  
  const renderHeader = () => (
    <header className="flex justify-between items-center mb-6 pb-4" style={{borderBottom: '2px solid var(--color-border)'}}>
      <div className="flex items-center gap-4">
        <img src={logoUrl} alt="Logo Fondation APRIL" style={{ height: '40px', objectFit: 'contain' }} />
        <div>
          <h1 style={{fontSize: '1.25rem', color: 'var(--color-dark)', margin: 0}}>Fondation APRIL</h1>
          <p style={{fontSize: '0.8rem', color: 'var(--color-orange)', margin: 0, fontWeight: 'bold'}}>Tableau de bord : Cellule d'Impact</p>
        </div>
      </div>
    </header>
  );

  return (
    <div className="w-full flex-col h-full min-h-screen">
      {renderHeader()}
      
      <main className="w-full flex-1 flex flex-col items-center">
        <Navigation activeTab={activeTab} onTabSelect={setActiveTab} />
        
        <div className="w-full max-w-5xl mt-4 px-2">
          {activeTab === 'team' && <TeamView />}
          {activeTab === 'training' && <TrainingView />}
          {activeTab === 'lab' && <GameLabView />}
          {activeTab === 'news' && <NewsView />}
        </div>
      </main>
    </div>
  );
}

export default App;
