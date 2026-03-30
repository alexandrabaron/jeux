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
*   **Zéro Friction :** Une architecture SPA (Single Page Application) en React. La fluidité est totale, sans aucun rechargement entre les différents écrans.
*   **Lisibilité Executive :** Conçu pour des directeurs ayant peu de temps, le design bannit les blocs de textes gigantesques. Il privilégie les composants aérés (`Cards`), les compteurs visuels et de grandes marges de respiration.
*   **Design System :** Des composants natifs épurés, de légères ombres portées, des bordures colorées contextuelles et des icônes (`lucide-react`) pour guider le clic. Responsive web design pensé pour les navigateurs de bureau tout comme pour un affichage sur tablette ou mobile en déplacement.

---

## ⚙️ 3. Fonctionnement de l'Application (Architecture)

L'application est une Single Page Application (SPA) développée en **React** et compilée par l'outil ultra-rapide **Vite**. La gestion globale repose sur un état local (`activeTab` dans `App.jsx`) qui permet d'alterner dynamiquement l'affichage entre les 4 vues (Composants) du Dashboard.

Il n'y a **ni back-end complexe ni base de données**. Pour faciliter les mises à jour et la maintenance, l'entièreté de l'information (cours et jeux) est extraite de fichiers statiques au format `.json`, logés dans `src/data/`. L'interface lit ("parse") automatiquement ces fichiers et génère à la volée le contenu interactif.

L’application est divisée en 4 écrans principaux (`src/views`) :

1.  **Mon Équipe (`TeamView.jsx`) :** Affichage de la "Cellule d'Impact". Cette vue met en avant la figure d'autorité (le Mentor Scientifique) pour rassurer le directeur (statut d'expertise) tout en lui listant l'agenda d'engagements temporels (ex: Flash Visio d'équipe).
2.  **Formation Interactive (`TrainingView.jsx`) :** Le socle de connaissance. L'interface affiche l'ensemble des thèmes contenus dans les éléments JSON. Les membres peuvent consulter la théorie, parcourir les rapports, puis valider un "Livrable officiel de groupe" en seulement quelques clics pour laisser une trace concrète.
3.  **Laboratoire de Jeux (`GameLabView.jsx`) :** C'est ici que l'experiencial entre en jeu. La vue liste une Quête Interactive par thème (générée depuis les mêmes fichiers JSON). Dès le lancement, un minuteur strict d'environ **7 minutes** s'active afin de respecter "un engagement de temps cadré".
4.  **Actualités Projets (`NewsView.jsx`) :** Un réseau social interne orienté "Solutions" avec la possibilité de cliquer pour *"S'inscrire à une action terrain"*, clôturant ainsi le cycle de l'engagement (du digital vers le réel).

---

## 🕹️ 4. Les Mini-Jeux du Laboratoire

Pour capter le "Système 1" (l'attention émotionnelle rapide), 3 modes de jeu successifs s’articulent autour de chaque thème JSON :

*   **Le Linker (Matching) :** Associer des concepts clés à leurs définitions d'un simple clic pour activer la mémoire intuitive.
*   **Vrai/Faux Express :** Un système asynchrone type "swipe/tinder" avec apport d'une explication immédiate après la sélection. Permet d'apprendre par l'erreur dédramatisée.
*   **Dilemme Décisionnel :** Une situation de type "Choix A ou Choix B". Pour débloquer la bonne réponse, l'utilisateur **doit collaborer** en sollicitant l'"Insight" de l'Expert Scientifique. Valorisant ainsi le "Bonus de Collaboration" d'équipe.

En fin de partie, l'utilisateur gagne des points d'Impact, consulte son chrono final, et découvre son "Titre honorifique" selon sa performance.

---

## 💾 5. Importer de Nouvelles Données (Format JSON)

C'est la force du projet : l'ajout de contenu ne demande **aucune notion de code complexe**. Tout passe par les fichiers de configuration JSON situés dans `src/data/`.

**Format standard attendu pour un fichier JSON (ex: `nouveau_sujet.json`) :**
```json
{
  "theme": "Nom du thème ou de la mission",
  "source": "Titre du rapport ou de l'étude affiché en source",
  "matching_game": [
    {
      "term": "Concept 1",
      "definition": "Définition associée au concept 1"
    },
    {
      "term": "Concept 2",
      "definition": "Définition associée au concept 2"
    }
  ],
  "true_false_game": [
    {
      "statement": "Une affirmation sur le sujet.",
      "is_true": false,
      "explanation": "L'explication révélée au joueur avec la correction (Vrai / Faux)."
    }
  ],
  "decision_game": {
    "scenario": "Mise en contexte d'un problème métier (court scénario).",
    "options": [
      "Première piste d'action",
      "Deuxième piste d'action"
    ],
    "expert_insight": "Avis de l'expert déclenché via le bouton d'aide, donnant la clé de la réponse attendue."
  }
}
```

*Note: Vous pouvez générer rapidement ces JSONs en confiant un rapport PDF à une Intelligence Artificielle (ChatGPT, Claude...) en lui transmettant ce schéma "matching/true_false/decision".*

**Comment ajouter ce nouveau fichier au Dashboard ?**
1. Copiez/collez ou créez votre ficher JSON dans le dossier `src/data/` (ex: `nouveau_sujet.json`).
2. Ouvrez le fichier indexeur : `src/data/registry.js`.
3. Importez-le en haut du fichier :
   ```javascript
   import nouveauSujet from './nouveau_sujet.json';
   ```
4. Intégrez-le au registre d'export défini dans le reste du fichier :
   ```javascript
   export const questRegistry = [
     santeSoins,
     santeDigital,
     sciencesCompo,
     nouveauSujet // <-- Ce que vous venez d'ajouter
   ];
   ```
5. 💥 C'est terminé ! L'application créera d'elle-même la section de révision, les cartes d'apprentissage, et ses trois niveaux de jeux respectifs.

---

## 🚀 6. Déploiement et Code source

L'application a été structurée via **Vite + React**. 
Elle utilise `lucide-react` pour sa bibliothèque d'icônes, et implémente les styles via le fichier principal `src/index.css`.

### Lancer l'Application en Local
Idéal pour tester ou effectuer des modifications sur l'interface :
```bash
# 1. Ouvrez un terminal dans le dossier '/quete-app' :
npm install

# 2. Lancez le serveur local de développement :
npm run dev
```

### Déploiement Public Gratuit via GitHub Pages
Si vous souhaitez offrir un lien public, l'application est configurée pour le domaine `/jeux/` (voir `vite.config.js`). 

**Étapes pour automatiser la publication sur GitHub Pages :**
1. Dans votre terminal de projet, installez l'utilitaire `gh-pages` :
   ```bash
   npm install gh-pages --save-dev
   ```
2. Ouvrez le fichier `package.json` à la racine de votre application.
3. Dans la section `"scripts"`, ajoutez les commandes `"predeploy"` et `"deploy"` pour obtenir ceci :
   ```json
   "scripts": {
     "dev": "vite",
     "build": "tsc && vite build",
     "preview": "vite preview",
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Exécutez le déploiement manuel :
   ```bash
   npm run deploy
   ```

Cette simple commande créera le dossier de production (optimisé et rapide `dist/`) et l'ajoutera sur la branche `gh-pages` de votre dépôt public ! Votre nouvelle version sera en ligne sous quelques minutes.

### 📱 Générer un QR Code pour partager l'Application
Une fois votre application en ligne (par exemple sur `https://votre-compte.github.io/jeux/`), vous pouvez la diffuser facilement aux membres via un QR Code (à placer sur une présentation, une carte, une affiche).

**Comment créer votre QR Code ?**
1. **Option rapide (Google Chrome / Edge) :**
   - Ouvrez l'URL de votre application déployée dans votre navigateur.
   - Cliquez sur l'icône **"Partager cette page"** (généralement à droite de la barre d'adresse) ou faites un clic droit n'importe où sur la page.
   - Sélectionnez **"Créer un code QR pour cette page"**.
   - Cliquez sur **Télécharger**. Vous obtenez une image prête à l'emploi.

2. **Option esthétique et personnalisée (Recommandé) :**
   - Copiez l'URL de votre application en ligne.
   - Rendez-vous sur un générateur web gratuit comme [QRCode Monkey](https://www.qrcode-monkey.com/fr/).
   - Collez l'URL dans le champ correspondant.
   - **L'avantage** : Vous pouvez modifier les couleurs pour utiliser le Bleu ou le Orange APRIL (`#f6aa37`), et même **ajouter le logo de la Fondation APRIL au centre du QR Code** avant de le télécharger en haute qualité.
