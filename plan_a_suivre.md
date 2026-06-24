Spécifications : Tuteur d'Architecture Logicielle (Pédagogie Inversée)
1. Objectif
Développer une application web monopage (SPA) interactive fonctionnant localement sur navigateur
. Le but est d'enseigner l'architecture logicielle (du code aux systèmes distribués) via la pédagogie inversée : l'utilisateur doit obligatoirement tester ses connaissances par un quiz avant d'accéder au contenu théorique
.
2. Besoins
Structure et Pédagogie (Basé sur "Texte collé")
Parcours en 10 Modules : Commencer par afficher une "Carte des modules" et lancer automatiquement le Module 0
.
Séquence d'apprentissage stricte :
Quiz initial : 3 à 5 questions (mélange de QCM, Vrai/Faux et 1 question ouverte courte)
.
Verrouillage : L'accès aux explications est bloqué tant que l'utilisateur n'a pas soumis ses réponses
.
Correction et Cours : Après soumission, afficher la correction détaillée (Juste/Faux + pourquoi) puis les points de connaissance
.
Format du contenu : Chaque module doit lister 4 à 7 points clés incluant le concept, son utilité, un exemple concret et impérativement le trade-off (compromis architectural)
.
Score : Maintenir un compteur de score informel par module (ex: "Module 3 : 4/5")
.
Technique et Interface (Standards 2026)
Technologies : HTML5 sémantique, CSS3 moderne (Flexbox/Grid) et JavaScript ES6+
.
Architecture de fichiers : Dissocier clairement la structure (index.html), le style (style.css) et la logique (script.js)
.
Accessibilité : Respecter les principes WCAG (perceptible, utilisable, compréhensible, robuste) en utilisant des balises sémantiques (<header>, <nav>, <section>, <article>, <footer>) et des liens <label> pour chaque <input>
.
Responsive Design : Utiliser la balise meta viewport et les Media Queries pour un affichage adapté sur mobile et desktop
.
3. Critères d'acceptation
Le site se lance localement en ouvrant simplement index.html dans un navigateur moderne (Chrome, Firefox, etc.)
.
La logique "Quiz d'abord, cours après" est fonctionnelle et verrouillée techniquement.
Le ton est direct, concret et complice, utilisant les termes techniques anglais consacrés (load balancing, statelessness, etc.)
.
Chaque module se termine par une "idée à retenir" synthétique en une phrase
.
Le code JavaScript doit utiliser le mode strict ("use strict")
.
4. Hors Scoop
Backend / Base de données : Pas de serveur PHP ou Node.js ; les données des modules sont stockées dans une constante JavaScript (const modulesData)
.
Déploiement : Pas de configuration de serveur distant ou de client FTP type FileZilla
.
Authentification : Pas de système de login/mot de passe complexe
.
5. Check-list de réalisation
[ ] Créer index.html avec le boilerplate HTML5 et la balise viewport
.
[ ] Créer style.css avec une mise en page Flexbox pour centrer le contenu
.
[ ] Créer script.js pour gérer l'état de l'application (affichage du quiz vs affichage du cours)
.
[ ] Intégrer les données du Module 0 au Module 9 dans le script JS.
[ ] Implémenter le système de correction dynamique et le calcul du score
.
[ ] Vérifier la sémantique des formulaires de quiz (balises <form>, <input>, <label>)
.
[ ] Tester la lisibilité sur différentes tailles d'écran
.
