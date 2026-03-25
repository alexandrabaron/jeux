# 🎯 Dashboard Gouvernance : Cellule d'Impact (Fondation APRIL)

Une plateforme interactive innovante conçue par et pour la Fondation APRIL.

## 📖 1. Le But de la Plateforme (Gouvernance d'Impact)

L’engagement dans un Conseil d’Administration (CA) ou un rôle d’administrateur est souvent perçu comme un exercice solitaire, rigide et parfois perçu comme une "corvée administrative". L'objectif de ce **Dashboard** est de **ré-enchanter cet engagement** en adoptant une approche asynchrone, ludique et collective.

Le système de gouvernance passe d'individus isolés à des **"Cellules d'Impact" de 3 personnes** (généralement 2 Directeurs de BU + 1 Mentor/Expert du Comité Scientifique). 

**La plateforme propose une expérience fluide pour ces profils pressés avec l'objectif de :**
*   Créer un lien de proximité entre le terrain, les experts et les décideurs.
*   Valoriser les connaissances à travers un contrat temps défini (une pause stimulante de 7 minutes).
*   Aboutir à la validation de livrables et la prise de décisions concrètes pour les actions de la Fondation.

---

## 🎨 2. Choix de Design & Esthétique

*   **Identité Fondation APRIL :** L'interface repose sur la charte officielle avec des teintes Azur (`#42aac4`), Bleu Nuit (`#0b3f63`) et de l'Orange vibrant (`#f6aa37`). 
*   **Zéro Friction :** Une architecture SPA (Single Page Application) en React. La fluidité est totale, sans aucun rechargement entre les 4 onglets majeurs.
*   **Lisibilité Executive :** Conçu pour des directeurs ayant peu de temps, le design bannit les blocs de textes gigantesques. Il privilégie les composants aérés (`Cards`), les compteurs visuels et de grandes marges de respiration.
*   **Design System :** Des composants natifs épurés, de légères ombres portées, des bordures colorées contextuelles et des icônes (`lucide-react`) pour guider le clic visuellement et rapidement. Parfaitement "Responsive" pour un usage de bureau (ordinateur du décideur) comme mobile en déplacement.

---

## ⚙️ 3. Fonctionnement des 4 Piliers

L’application est divisée en 4 écrans principaux (`src/views`) synchronisés au sein d'un même tableau de bord :

1.  **Mon Équipe (`TeamView.jsx`) :** Affichage de sa "Cellule d'Impact". Cette vue met en avant la figure d'autorité (le Mentor Scientifique, ex: Serge Guérin) pour rassurer le directeur (statut d'expertise) tout en lui offrant son *Agenda d'engagements temporels* (Flash Visio de 15min d’équipe).
2.  **Formation Interactive (`TrainingView.jsx`) :** Le grand dossier du mois. La cellule y accède pour parcourir la théorie "terrain" sous une forme synthétique. Les membres y **valident un Livrable** officiel de groupe en seulement 3 clics simples de lecture et validation.
3.  **Laboratoire de Jeux (`GameLabView.jsx`) :** Pour ne jamais s’ennuyer, l'administratrice ou administrateur se lance dans la Quête Interactive de **7 minutes exactement**. C'est ici seulement que l'horloge s'active pour assurer "un engagement de temps cadré".
4.  **Actualités Projets (`NewsView.jsx`) :** Un réseau social interne orienté "Solutions" avec la possibilité de cliquer pour *"S'inscrire à une action physique terrain"*, clôturant ainsi le cycle de l'engagement (du digital vers la réalité).

---

## 🕹️ 4. Les Mini-Jeux du Laboratoire

Pour capter le "Système 1" (l'attention émotionnelle rapide), 3 modes de jeu successifs s’articulent autour du même thème :

*   **Le Linker (Matching) :** Associer des concepts clés à leurs définitions avec un simple clic.
*   **Vrai/Faux Express :** Un modèle "Tinder-like" avec explication immédiate après la sélection pour apprendre par l'erreur sans le ressentir comme une sanction.
*   **Dilemme Décisionnel :** Pour débloquer la réponse, l'utilisateur **doit collaborer** en sollicitant "l'Insight" de l'Expert Scientifique de sa Cellule. Cela engendre le *"Bonus de Collaboration"*, qui valorise les interactions au sein de l'équipe (Nudge et architecture de choix).

En fin de parcours, l'utilisateur récolte tous ses points d'Impact, son chrono final, et découvre son "Titre honorifique" calculé sur le thème (ex: "Visionnaire du Care").

---

## 💾 5. Gestion des Données (Totalement Dynamique)

**C'est la force de l'application :** Tout le contenu formation, jeu et texte **n'est pas hardcodé** mais injecté nativement via de simples fichiers de données `.json`.

**Comment éditer le contenu ?**
1.  Ouvrez ou ajoutez de nouveaux sujets JSON (générés par de l'IA experte depuis de gros rapports d'études) dans `src/data/`.
2.  Importez-les simplement dans le fichier indexeur : `src/data/registry.js`.
3.  💥 C'est tout ! **Le Dashboard intègre automatiquement** ces nouvelles données dans l'écran de Validation `TrainingView` ET crée une nouvelle mission avec les trois jeux respectifs dans l'écran `GameLabView`.

*Exemple de JSON standard :* Il comprend la source de l'étude, les paires de matching, les questions "true_false", et le scénario décisionnel avec son insight expert obligatoire.

---

## 💻 6. Instructions Tekniks / Développement

Ce projet a été packagé via **Vite + React**. 

**Installation Locale :**
```bash
# 1. Ouvrez un terminal dans le dossier '/quete-app' :
npm install

# 2. Lancez le serveur local de test :
npm run dev
```

**Déploiement Internet :**
*   Construisez une production avec `npm run build` : cela génèrera un dossier public `dist/` très rapide à faire héberger n'importe où. (Github Actions est déjà inclus comme paramètre initial).
