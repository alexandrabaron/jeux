import React from 'react';
import { Heart, MessageCircle, Share2, MapPin } from 'lucide-react';

export default function NewsView() {
  const newsItems = [
    {
      id: 1,
      author: "Fondation APRIL",
      role: "Action Terrain",
      time: "Il y a 2h",
      content: "Déploiement de notre kiosque santé #PrendsEnMain sur le campus universitaire de Lyon. Plus de 300 étudiants sensibilisés à la santé mentale et au sommeil aujourd'hui !",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
      likes: 42,
      comments: 5
    },
    {
      id: 2,
      author: "Comité Scientifique",
      role: "Laboratoire d'idées",
      time: "Hier",
      content: "Retour sur l'expérimentation Nudge à l'hôpital de Valence. Les SMS personnalisés ont doublé le taux de vaccination HPV chez les jeunes de moins de 25 ans. Un pas de géant pour la prévention !",
      image: "https://images.unsplash.com/photo-1584982751601-97d8cb0f66fc?auto=format&fit=crop&q=80&w=800",
      likes: 128,
      comments: 31
    }
  ];

  return (
    <div className="animate-fade-in w-full max-w-2xl mx-auto flex-col gap-6">
      
      {/* Header Actus */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--color-dark)' }}>Actualités Projets</h2>
          <p className="text-slate-500">Suivez l'impact de nos actions sur le terrain.</p>
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <MapPin size={18} /> S'inscrire à une visite terrain
        </button>
      </div>

      {/* Feed */}
      <div className="flex-col gap-8">
        {newsItems.map(item => (
          <div key={item.id} className="card p-0 overflow-hidden shadow-md">
            {/* Post Header */}
            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-white" style={{ backgroundColor: 'var(--color-azur)' }}>
                FA
              </div>
              <div>
                <h3 className="font-bold text-sm" style={{ color: 'var(--color-dark)' }}>{item.author}</h3>
                <p className="text-xs text-slate-500">{item.role} • {item.time}</p>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-4">
              <p className="text-sm" style={{ color: 'var(--color-dark)', lineHeight: 1.5 }}>{item.content}</p>
            </div>

            {/* Post Media */}
            <div className="w-full h-64 bg-slate-100">
              <img src={item.image} alt="Illustration projet" className="w-full h-full object-cover" />
            </div>

            {/* Post Actions */}
            <div className="p-4 border-t border-slate-100 flex gap-6 text-slate-500 font-semibold text-sm">
              <button className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                <Heart size={20} /> {item.likes}
              </button>
              <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                <MessageCircle size={20} /> {item.comments}
              </button>
              <button className="flex items-center gap-2 ml-auto hover:text-slate-800 transition-colors">
                <Share2 size={20} /> Partager
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
