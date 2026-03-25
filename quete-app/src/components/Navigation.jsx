import React from 'react';
import { Users, BookOpen, Gamepad2, Megaphone } from 'lucide-react';

export default function Navigation({ activeTab, onTabSelect }) {
  const tabs = [
    { id: 'team', label: 'Mon Équipe', icon: Users },
    { id: 'training', label: 'Formation', icon: BookOpen },
    { id: 'lab', label: 'Laboratoire de Jeux', icon: Gamepad2 },
    { id: 'news', label: 'Actualités Projets', icon: Megaphone }
  ];

  return (
    <nav className="flex items-center justify-between p-2 mb-6 rounded-xl" style={{ backgroundColor: 'white', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)' }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabSelect(tab.id)}
            className={`flex-1 flex flex-col items-center justify-center py-3 px-2 rounded-lg transition-all ${isActive ? 'animate-fade-in' : ''}`}
            style={{
              backgroundColor: isActive ? '#eff6ff' : 'transparent',
              color: isActive ? 'var(--color-azur)' : 'var(--color-text-muted)',
              border: isActive ? '1px solid #bfdbfe' : '1px solid transparent',
              boxShadow: isActive ? 'var(--shadow-sm)' : 'none'
            }}
          >
            <Icon size={24} className="mb-1" />
            <span style={{ fontSize: '0.8rem', fontWeight: isActive ? '700' : '600' }}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
