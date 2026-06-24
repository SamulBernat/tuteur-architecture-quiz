# Cours — Architecture logicielle, du code aux systèmes distribués
### Niveau débutant → intermédiaire · Pédagogie inversée · Méthode Feynman

> **Mode d'emploi.** Pour chaque module : tu réponds D'ABORD au quiz (sans regarder plus bas), PUIS tu lis le corrigé et les points de connaissance. Chaque concept technique est nommé, puis expliqué sans jargon avec une image de la vie courante. L'objectif n'est pas de réciter, c'est de pouvoir réexpliquer à quelqu'un d'autre.

---

# Module 0 — Qu'est-ce que l'architecture logicielle ?

### 🧪 Quiz (réponds avant de descendre)
1. Vrai ou faux : l'architecture, c'est surtout choisir le bon langage de programmation.
2. QCM — Qu'est-ce qui coûte le plus cher à changer dans un logiciel une fois construit ?
   a) La couleur d'un bouton  b) Le texte d'un message  c) La façon dont les grosses briques sont découpées et reliées  d) Le nom d'une variable
3. QCM — On appelle « attributs de qualité » des propriétés comme la rapidité, la capacité à grossir, la facilité à maintenir. Peut-on les maximiser toutes en même temps ?
   a) Oui, avec assez de code  b) Non, améliorer l'une dégrade souvent une autre  c) Seulement dans le cloud
4. Question ouverte : avec tes mots, à quoi sert l'architecture d'un logiciel ?

### ✅ Corrigé
1. **Faux.** Le langage est un détail comparé au découpage des grandes briques. On peut réécrire un module dans un autre langage ; on déplace rarement un « mur porteur ».
2. **c.** Le découpage et les liens entre briques = les murs porteurs. Les changer après coup oblige souvent à tout casser autour.
3. **b.** L'architecture est l'art du compromis. Plus de sécurité = souvent moins de rapidité, etc.
4. Réponse attendue dans l'esprit : décider de la structure d'ensemble pour que le logiciel tienne dans le temps et puisse évoluer sans s'effondrer.

### 📚 Points de connaissance

- **Architecture logicielle.** *Image :* le plan d'une maison. La déco, les meubles (le code de tous les jours) se changent en un après-midi. Les murs porteurs, l'emplacement de l'escalier, l'arrivée d'eau (l'architecture) se changent au prix de gros travaux. **L'architecture, ce sont les décisions difficiles à défaire.** *Trade-off :* prendre le temps de bien poser les murs ralentit le démarrage, mais évite de tout casser plus tard.

- **Attributs de qualité** (en anglais *quality attributes* ou *-ilities*). *Image :* acheter une voiture. Tu veux qu'elle soit rapide, économe, sûre, confortable, pas chère. Impossible d'avoir le maximum de tout : une Ferrari n'est pas économe, une citadine n'est pas rapide. Pareil pour un logiciel : rapidité, capacité à grossir (*scalability*), facilité d'entretien (*maintainability*), sécurité, disponibilité. *Trade-off :* choisir une voiture, c'est renoncer ; concevoir une archi, c'est arbitrer entre ces qualités.

- **Trade-off (compromis).** *Image :* une couverture trop courte. Tu te couvres les épaules, tu as froid aux pieds ; tu couvres les pieds, tu as froid aux épaules. En architecture, **chaque choix donne quelque chose et en retire un autre.** Le bon architecte ne cherche pas la solution parfaite, il cherche le compromis adapté au contexte.

- **Exigences non-fonctionnelles.** *Image :* au restaurant, « je veux un steak » est l'exigence fonctionnelle ; « je veux être servi en 15 min, sans tomber malade » sont les non-fonctionnelles. Le logiciel doit faire le job *et* le faire vite, sûr, fiable.

> 💡 **À retenir :** l'architecture, ce sont les décisions structurantes et difficiles à défaire ; elle se juge non pas sur « est-ce que ça marche » mais sur « est-ce que ça tiendra et évoluera ».

---

# Module 1 — Les principes de conception

### 🧪 Quiz
1. QCM — Deux modules sont « fortement couplés » quand…
   a) ils sont rangés dans le même dossier  b) modifier l'un oblige presque toujours à modifier l'autre  c) ils ont le même auteur
2. Vrai ou faux : un module « cohésif » mélange beaucoup de responsabilités différentes pour être polyvalent.
3. QCM — Le principe DRY (*Don't Repeat Yourself*) recommande de…
   a) écrire le moins de commentaires possible  b) éviter de dupliquer la même logique à plusieurs endroits  c) tout écrire deux fois pour vérifier
4. Question ouverte : pourquoi un couplage faible rend un logiciel plus facile à faire évoluer ?

### ✅ Corrigé
1. **b.** Le couplage mesure à quel point une brique dépend d'une autre.
2. **Faux.** Un module cohésif fait **une** chose et la fait bien. Le mélange, c'est le contraire de la cohésion.
3. **b.** Une seule source de vérité pour chaque règle.
4. Esprit attendu : si les briques dépendent peu les unes des autres, on en modifie une sans casser les voisines → changements localisés, moins de risques.

### 📚 Points de connaissance

- **Couplage (coupling).** *Image :* des wagons de train attachés. Si tu freines le premier, tous freinent. **Couplage fort = quand tu touches une brique, les autres bougent.** On cherche un couplage *faible* : des wagons qu'on peut détacher sans dérailler le reste. *Trade-off :* trop découpler ajoute des intermédiaires et de la complexité ; il faut viser « juste assez détaché ».

- **Cohésion (cohesion).** *Image :* une boîte à outils bien rangée — les tournevis ensemble, les clés ensemble. **Une brique cohésive regroupe ce qui va naturellement ensemble.** L'inverse : un tiroir fourre-tout où tu ne retrouves rien. On vise *forte cohésion + faible couplage* : chaque brique fait une chose claire, et dépend peu des autres.

- **Separation of concerns (séparation des préoccupations).** *Image :* dans un restaurant, la cuisine cuisine, la salle sert, la caisse encaisse. Personne ne fait tout. **Chaque partie du code s'occupe d'un seul type de problème.** *Trade-off :* plus de séparation = plus de fichiers à naviguer, mais chacun est simple.

- **SOLID** (5 principes pour du code orienté objet propre). Inutile de les réciter ; l'esprit : **chaque classe a un seul boulot, on étend sans tout réécrire, on ne crée pas de dépendances surprises.** *Image :* des LEGO standardisés — chaque brique a un rôle, et elles s'emboîtent sans colle.

- **DRY** (*Don't Repeat Yourself*). *Image :* une seule recette de gâteau dans un carnet. Si la recette change, tu modifies une page, pas vingt feuilles volantes. **Une règle = un seul endroit.** *Trade-off :* à l'excès, on factorise des choses qui n'avaient rien à voir → couplage artificiel. DRY oui, mais pas au point de relier ce qui est juste « ressemblant ».

- **KISS** (*Keep It Simple*). *Image :* pour planter un clou, un marteau, pas une perceuse à colonne. **La solution la plus simple qui marche est presque toujours la bonne.**

> 💡 **À retenir :** vise *forte cohésion, faible couplage*. Une brique = un rôle clair, le moins de fils possible vers les voisines.

---

# Module 2 — Organiser le code

### 🧪 Quiz
1. QCM — Le pattern MVC sépare une appli en trois rôles. Lesquels ?
   a) Menu, Vitrine, Caisse  b) Modèle (données), Vue (affichage), Contrôleur (chef d'orchestre)  c) Mobile, Web, Cloud
2. Vrai ou faux : dans une architecture en couches, une couche du haut peut parler directement à n'importe quelle autre, dans tous les sens.
3. QCM — L'idée centrale de l'architecture hexagonale (*ports & adapters*) est…
   a) d'avoir six modules  b) d'isoler le cœur métier des outils externes (base de données, interfaces) via des « prises » interchangeables  c) d'utiliser une forme hexagonale dans les schémas
4. Question ouverte : pourquoi vouloir que le cœur métier ne « connaisse » pas la base de données ?

### ✅ Corrigé
1. **b.** Modèle / Vue / Contrôleur.
2. **Faux.** Les couches se parlent dans un ordre, généralement de haut en bas. Le but est justement d'éviter le plat de spaghettis.
3. **b.** Le métier au centre, les outils branchés autour par des adaptateurs.
4. Esprit : si le cœur ignore l'outil, on peut changer d'outil (passer d'une base à une autre) sans toucher au métier.

### 📚 Points de connaissance

- **Architecture en couches (layered).** *Image :* un immeuble. On entre par le rez-de-chaussée (l'interface), on monte aux étages (logique métier, puis accès aux données). **Chaque étage ne parle qu'à l'étage voisin**, pas en sautant par la fenêtre. *Trade-off :* clair et carré, mais parfois lourd (traverser tous les étages pour une demande simple).

- **MVC (Modèle-Vue-Contrôleur).** *Image :* un restaurant. La **Vue** = la salle et le menu (ce que voit le client). Le **Modèle** = la cuisine et le garde-manger (les données et les règles). Le **Contrôleur** = le serveur qui prend la commande et fait la navette entre les deux. **Chacun son rôle ; le client ne voit jamais la cuisine.** *Trade-off :* excellent pour séparer l'affichage du reste ; peut devenir confus quand l'appli grossit beaucoup.

- **Architecture hexagonale (*ports & adapters*).** *Image :* les prises électriques. Ton appareil (le cœur métier) a une fiche standard. Que tu sois en France, au UK ou aux US, tu mets un **adaptateur** ; l'appareil, lui, ne change pas. **Le métier définit des "prises" (ports), et on y branche les outils externes (base de données, e-mail, interface) via des adaptateurs interchangeables.** *Trade-off :* on peut changer un outil sans toucher au métier (et tester le métier seul), mais ça demande plus de structure au départ.

- **Clean architecture.** *Image :* des poupées russes. Au centre, les règles métier les plus stables ; autour, des couches de plus en plus « techniques » et jetables. **Règle d'or : les dépendances pointent vers l'intérieur** — le détail technique dépend du métier, jamais l'inverse. C'est la même idée que l'hexagonal, poussée plus loin.

> 💡 **À retenir :** protège ton cœur métier des outils techniques. Les outils sont jetables, les règles métier sont précieuses.

---

# Module 3 — Découper l'application : monolithe vs microservices

### 🧪 Quiz
1. QCM — Un « monolithe », c'est…
   a) une appli mal codée  b) une appli livrée et déployée en un seul bloc  c) une appli sans base de données
2. Vrai ou faux : passer en microservices simplifie toujours le projet.
3. QCM — Principal avantage des microservices ?
   a) Moins de code total  b) Chaque service évolue, se déploie et grossit indépendamment des autres  c) Plus besoin de tests
4. Question ouverte : cite un inconvénient concret des microservices qu'un monolithe n'a pas.

### ✅ Corrigé
1. **b.** Un seul bloc déployé d'un coup. Ce n'est pas une insulte : beaucoup d'excellents produits sont des monolithes.
2. **Faux.** On échange une complexité (un gros bloc) contre une autre (plein de petits qui doivent communiquer par le réseau).
3. **b.** L'indépendance d'évolution et de mise à l'échelle.
4. Exemples valides : la communication réseau qui peut échouer, la difficulté à suivre un bug à travers plusieurs services, la cohérence des données éclatée.

### 📚 Points de connaissance

- **Monolithe (monolith).** *Image :* une grande maison familiale. Tout le monde sous le même toit, on se parle d'une pièce à l'autre en criant — c'est simple et rapide. Mais si tu refais l'électricité, tu coupes le courant de toute la maison. **Tout le code dans un seul bloc déployé ensemble.** *Trade-off :* simple à démarrer, à tester, à déboguer ; devient lourd quand l'équipe et le code grossissent (tout le monde marche sur les pieds des autres).

- **Microservices.** *Image :* un quartier de petites maisons indépendantes. Chacune a sa cuisine, son compteur. Tu refais l'une sans déranger les autres. Mais pour se parler, les voisins doivent sortir et marcher dans la rue (le réseau) — plus lent et parfois la rue est coupée. **Chaque fonctionnalité est un petit service autonome, déployable seul.** *Trade-off :* équipes indépendantes et montée en charge ciblée, au prix d'une grosse complexité réseau, de surveillance et de coordination.

- **Monolithe modulaire (modular monolith).** *Image :* une colocation. Un seul appartement (un seul déploiement), mais des chambres bien séparées avec des règles claires de qui touche quoi. **Le meilleur des deux mondes pour beaucoup d'équipes :** la simplicité d'un bloc unique, mais un intérieur proprement cloisonné, prêt à être découpé plus tard si besoin.

- **Quand choisir quoi ?** *Image :* on ne construit pas un quartier entier pour loger une famille de quatre. **On démarre presque toujours par un monolithe (idéalement modulaire) et on ne découpe en microservices que quand une vraie douleur l'exige** (équipes nombreuses, parties qui doivent grossir très différemment). Découper trop tôt est une erreur classique et coûteuse.

> 💡 **À retenir :** microservices ≠ « plus moderne donc mieux ». C'est un compromis qui résout des problèmes d'échelle… en en créant d'autres. Commence simple.

---

# Module 4 — Faire communiquer les composants

### 🧪 Quiz
1. QCM — Une communication « synchrone », c'est comme…
   a) envoyer un SMS et passer à autre chose  b) un appel téléphonique : tu attends la réponse en ligne  c) déposer une lettre à la poste
2. QCM — À quoi sert une « file de messages » (*message queue*) ?
   a) à ranger le code  b) à stocker les demandes en attente pour les traiter plus tard, sans bloquer l'émetteur  c) à accélérer la base de données
3. Vrai ou faux : une API REST, c'est un menu standard qui dit comment demander les choses à un service.
4. Question ouverte : donne un cas où l'asynchrone (boîte aux lettres) est préférable au synchrone (téléphone).

### ✅ Corrigé
1. **b.** Synchrone = tu restes en ligne et tu attends.
2. **b.** La file encaisse les demandes et les distribue au rythme possible.
3. **Vrai.** REST = un ensemble de conventions pour demander/envoyer des données via le web.
4. Exemples : envoyer un e-mail de confirmation, générer une facture, traiter une vidéo — des tâches qui peuvent se faire « en différé » sans faire patienter l'utilisateur.

### 📚 Points de connaissance

- **Synchrone vs asynchrone.** *Image :* le **synchrone** est un coup de téléphone — tu restes en ligne jusqu'à la réponse, pratique mais bloquant. L'**asynchrone** est un SMS ou une boîte aux lettres — tu déposes ton message et tu vaques à tes occupations ; la réponse viendra. **Synchrone = j'attends ; asynchrone = je délègue et je continue.** *Trade-off :* synchrone est simple et immédiat mais fragile (si l'autre ne répond pas, tu es bloqué) ; asynchrone est robuste et fluide mais plus complexe à suivre.

- **API (interface de programmation).** *Image :* le menu d'un restaurant. Tu ne vas pas en cuisine ; tu commandes via une liste de plats prédéfinis. **Une API, c'est la liste officielle des demandes qu'un service accepte**, sans que tu saches comment c'est fait à l'intérieur. *Trade-off :* le menu cadre et protège, mais il faut que les deux côtés respectent le contrat.

- **REST / gRPC.** Deux façons de « passer commande » entre services. **REST** = le menu web classique, lisible, universel, parfait pour exposer des données. **gRPC** = un canal interne plus rapide et plus strict, comme un passe-plat direct entre cuisines voisines. *Trade-off :* REST gagne en simplicité et compatibilité ; gRPC gagne en vitesse pour les échanges internes intensifs.

- **File de messages (message queue).** *Image :* la file d'attente à la poste, ou la boîte de réception. Les demandes s'empilent, un guichet les traite une par une à son rythme. **Si un pic arrive, la file absorbe le choc au lieu de tout faire planter.** *Trade-off :* lisse les pics et découple émetteur/récepteur, mais ajoute un intermédiaire à gérer et la réponse n'est plus instantanée.

> 💡 **À retenir :** demande-toi toujours « est-ce que l'utilisateur doit vraiment attendre cette réponse ? ». Si non, l'asynchrone (file/boîte aux lettres) rend le système plus fluide et plus robuste.

---

# Module 5 — Les données : bases, cache et cohérence

### 🧪 Quiz
1. QCM — Une base SQL (relationnelle) ressemble surtout à…
   a) des boîtes à chaussures étiquetées en vrac  b) des tableaux à colonnes fixes, bien définis, qui se relient entre eux  c) un cahier de brouillon
2. QCM — À quoi sert un « cache » ?
   a) à cacher des données secrètes  b) à garder sous la main une copie de ce qu'on consulte souvent, pour éviter d'aller le rechercher loin à chaque fois  c) à sauvegarder en cas de panne
3. Vrai ou faux : le théorème CAP dit qu'on peut avoir en même temps cohérence parfaite, disponibilité totale et résistance aux coupures réseau.
4. Question ouverte : pourquoi un cache peut-il parfois afficher une information périmée ?

### ✅ Corrigé
1. **b.** SQL = des tableaux structurés et reliés (clients, commandes, produits…).
2. **b.** Le cache garde le fréquent à portée de main.
3. **Faux.** CAP dit qu'en cas de coupure réseau, tu dois **choisir** entre cohérence et disponibilité. On ne peut pas tout avoir.
4. Parce que le cache est une *copie* ; si l'original change et que la copie n'est pas rafraîchie, tu vois l'ancienne version.

### 📚 Points de connaissance

- **Base relationnelle (SQL).** *Image :* un classeur Excel rigoureux. Des tableaux à colonnes fixes (un client a un nom, un email, un id), reliés entre eux (une commande pointe vers un client). **Tout est carré, structuré, vérifié.** *Trade-off :* parfait pour des données bien définies et des relations claires ; moins souple quand la forme des données change tout le temps.

- **Base NoSQL.** *Image :* des boîtes à chaussures étiquetées. Tu mets ce que tu veux dans chaque boîte, la forme peut varier d'une boîte à l'autre. **Souple et rapide pour de gros volumes peu structurés.** *Trade-off :* gagne en flexibilité et en passage à l'échelle ; perd les garanties strictes et les relations du SQL. *Règle simple :* données structurées et reliées → SQL ; gros volumes flexibles → NoSQL.

- **Cache.** *Image :* tu poses la bouteille de lait sur le comptoir pendant le petit-déj au lieu d'aller au frigo à chaque gorgée. **Le cache garde une copie du fréquent tout près, pour répondre vite.** *Trade-off :* énorme gain de vitesse, mais risque de servir une info périmée (la copie n'est pas l'original). La grande question du cache : *quand jeter la copie ?*

- **Cohérence (consistency).** *Image :* si tu vires de l'argent, tu veux que ton solde affiche immédiatement le bon montant, partout. **Cohérence = tout le monde voit la même donnée à jour, au même instant.** Coûteux à garantir quand les données sont copiées sur plusieurs machines.

- **Théorème CAP.** *Image :* la couverture trop courte, version réseau. Quand la communication entre tes machines se coupe (ça arrive), tu dois choisir : soit **rester cohérent** (refuser de répondre tant que tu n'es pas sûr d'être à jour), soit **rester disponible** (répondre quand même, quitte à donner une info un peu ancienne). **Tu ne peux pas avoir les deux pendant une coupure.** *Trade-off :* une banque choisira la cohérence ; un fil d'actualité choisira la disponibilité.

> 💡 **À retenir :** une donnée copiée (cache, réplique) est rapide mais peut mentir. Tout l'art consiste à décider quand la fraîcheur compte vraiment.

---

# Module 6 — La scalabilité : tenir la charge

### 🧪 Quiz
1. QCM — « Scaler verticalement », c'est…
   a) ouvrir plus de caisses au supermarché  b) agrandir/muscler la caisse existante (plus de mémoire, plus puissant)  c) baisser les prix
2. QCM — Un « load balancer » fait quoi ?
   a) il répartit les visiteurs entre plusieurs machines pour qu'aucune ne sature  b) il sauvegarde les données  c) il accélère le code
3. Vrai ou faux : un service « stateless » (sans état) a besoin de se souvenir de chaque utilisateur entre deux demandes.
4. Question ouverte : pourquoi le scaling horizontal (plus de machines) est-il plus difficile mais plus durable que le vertical ?

### ✅ Corrigé
1. **b.** Vertical = on muscle une seule machine.
2. **a.** Le load balancer aiguille le trafic.
3. **Faux.** Stateless = il ne se souvient de rien entre deux demandes ; chaque demande se suffit à elle-même. C'est justement ce qui permet d'ajouter des machines facilement.
4. Esprit : une seule machine a une limite physique (on ne peut pas muscler à l'infini) ; ajouter des machines n'a presque pas de plafond, mais oblige à coordonner et à répartir.

### 📚 Points de connaissance

- **Scaling vertical.** *Image :* à la caisse du supermarché bondé, tu rends la caissière plus rapide et tu agrandis le tapis. **Tu muscles la machine unique : plus de mémoire, plus de puissance.** *Trade-off :* simple (rien à réorganiser) mais il y a un plafond physique et ça devient très cher, et si cette machine tombe, tout tombe.

- **Scaling horizontal.** *Image :* tu ouvres **plus de caisses**. Au lieu d'une caisse surpuissante, dix caisses normales. **Tu ajoutes des machines en parallèle.** *Trade-off :* quasiment pas de plafond et plus résistant aux pannes, mais il faut répartir les clients et coordonner — c'est plus complexe. C'est la voie des gros systèmes.

- **Load balancer (répartiteur de charge).** *Image :* l'employé à l'entrée qui dit « caisse 3 est libre, allez-y ». **Il distribue les visiteurs vers les machines disponibles** pour qu'aucune ne sature et que la file avance. *Trade-off :* indispensable pour le scaling horizontal ; devient lui-même un point à surveiller et à doubler.

- **Stateless (sans état).** *Image :* un guichet d'information où, à chaque question, tu redonnes tout le contexte ; l'employé n'a pas besoin de se souvenir de toi. **Comme aucune machine ne "retient" l'utilisateur, n'importe laquelle peut traiter n'importe quelle demande** → on en ajoute/enlève librement. *Trade-off :* il faut stocker la "mémoire" ailleurs (base, cache partagé), mais on gagne une scalabilité énorme.

- **CDN (réseau de distribution de contenu).** *Image :* au lieu d'un seul entrepôt central à l'autre bout du monde, des **mini-entrepôts dans chaque ville**. Le client est livré depuis le plus proche. **On rapproche les contenus (images, vidéos) des utilisateurs.** *Trade-off :* énorme gain de vitesse et de charge soulagée, mais c'est une copie de plus à tenir à jour.

> 💡 **À retenir :** pour grossir durablement, on cherche à pouvoir « ajouter des caisses » (horizontal). Et pour ça, le secret c'est le *stateless* : des machines interchangeables qui ne retiennent rien.

---

# Module 7 — La résilience : survivre aux pannes

### 🧪 Quiz
1. QCM — La « redondance », c'est…
   a) écrire deux fois le même code  b) avoir un double de secours prêt à prendre le relais  c) répéter une explication
2. QCM — Un « circuit breaker » (disjoncteur) dans un logiciel sert à…
   a) couper l'électricité du serveur  b) arrêter d'appeler un service en panne pour éviter d'aggraver la situation, le temps qu'il se rétablisse  c) accélérer les requêtes
3. Vrai ou faux : réessayer (*retry*) sans limite une opération qui échoue est toujours une bonne idée.
4. Question ouverte : qu'est-ce que l'observabilité, et pourquoi en a-t-on besoin ?

### ✅ Corrigé
1. **b.** Redondance = un double prêt à prendre le relais.
2. **b.** Le disjoncteur coupe les appels vers un service défaillant pour ne pas empirer.
3. **Faux.** Réessayer sans limite peut **achever** un service déjà à genoux (effet boule de neige). On réessaie avec modération et délais croissants.
4. Esprit : c'est la capacité à voir ce qui se passe à l'intérieur du système (mesures, journaux, alertes) pour comprendre et réagir — comme le tableau de bord d'une voiture.

### 📚 Points de connaissance

- **Redondance (redundancy).** *Image :* la roue de secours dans le coffre. Tu espères ne jamais t'en servir, mais le jour où un pneu crève, tu continues ta route. **On double les éléments critiques pour qu'une panne n'arrête pas tout.** *Trade-off :* ça coûte (payer un double qui dort), mais c'est le prix de la disponibilité.

- **Failover (bascule automatique).** *Image :* le groupe électrogène d'un hôpital qui démarre tout seul à la coupure de courant. **Quand l'élément principal tombe, le secours prend le relais automatiquement**, sans intervention humaine. *Trade-off :* la bascule doit elle-même être fiable et testée — un secours qu'on n'a jamais essayé est un faux secours.

- **Retry (réessai).** *Image :* la ligne sonne occupé, tu rappelles 30 secondes plus tard. **On retente une opération qui a échoué, car beaucoup de pannes sont passagères.** *Trade-off :* utile, mais **réessayer trop vite et tous en même temps peut achever un service déjà saturé.** On espace les tentatives (délais croissants) et on fixe une limite.

- **Circuit breaker (disjoncteur).** *Image :* le disjoncteur électrique de la maison. En cas de surcharge, il **coupe** pour protéger l'installation, au lieu de laisser tout cramer. **Quand un service répond mal, on arrête de l'appeler un moment** pour le laisser respirer et éviter l'effet domino. *Trade-off :* on rend volontairement une partie indisponible pour sauver l'ensemble.

- **Observabilité (observability).** *Image :* le tableau de bord d'une voiture — vitesse, température, jauge d'essence, voyants. Sans lui, tu roules les yeux fermés. **C'est l'ensemble des mesures, journaux et alertes qui te disent ce qui se passe à l'intérieur du système**, surtout quand ça va mal. *Trade-off :* ça demande de l'effort à mettre en place et à maintenir, mais sans visibilité, un incident devient une enquête à l'aveugle.

> 💡 **À retenir :** en architecture, on ne se demande pas *si* ça va tomber, mais *quand*. La résilience, c'est prévoir la panne et organiser la survie à l'avance.

---

# Module 8 — Sécurité et mise en production

### 🧪 Quiz
1. QCM — Quelle est la différence entre authentification et autorisation ?
   a) aucune, c'est synonyme  b) l'authentification dit *qui tu es*, l'autorisation dit *ce que tu as le droit de faire*  c) l'une est pour le web, l'autre pour le mobile
2. Vrai ou faux : écrire un mot de passe ou une clé secrète directement dans le code est une pratique sûre.
3. QCM — La « CI/CD » sert à…
   a) coder plus vite à la main  b) automatiser les tests et la mise en production du code  c) chiffrer la base de données
4. Question ouverte : avec une image du quotidien, explique ce qu'est l'« infrastructure as code ».

### ✅ Corrigé
1. **b.** Authentification = identité ; autorisation = droits.
2. **Faux.** Un secret dans le code, c'est le code de ta carte bleue écrit sur un post-it collé à l'écran. On range les secrets dans un coffre dédié.
3. **b.** CI/CD = chaîne automatisée de tests et de déploiement.
4. Esprit attendu : décrire son infrastructure (serveurs, réseaux) dans des fichiers reproductibles, comme une notice de montage IKEA qu'on peut rejouer à l'identique.

### 📚 Points de connaissance

- **Authentification (authn).** *Image :* montrer sa carte d'identité à l'entrée. **« Prouve-moi qui tu es. »** Mot de passe, code, empreinte. C'est l'étape « qui es-tu ? ».

- **Autorisation (authz).** *Image :* ton badge d'employé ouvre certaines portes, pas toutes. **« Maintenant que je sais qui tu es, voici ce que tu as le droit de faire. »** Distinguer les deux est fondamental : être identifié ≠ avoir tous les droits. *Trade-off :* des droits fins = plus de sécurité mais plus de règles à gérer.

- **Gestion des secrets.** *Image :* tu ne notes pas ton code de carte bleue sur un post-it sur l'écran. **Les mots de passe, clés et jetons se rangent dans un coffre dédié (gestionnaire de secrets), jamais dans le code.** *Trade-off :* un peu plus de mise en place, mais c'est la base non négociable — un secret dans le code finit toujours par fuiter.

- **CI/CD (intégration et livraison continues).** *Image :* une chaîne de montage automobile. Le code passe sur un tapis roulant : on le teste automatiquement, on l'assemble, on le met en production sans tout faire à la main. **Chaque changement est vérifié par des robots avant d'atteindre les utilisateurs.** *Trade-off :* installer la chaîne demande un investissement initial, mais ensuite on livre vite, souvent, et avec moins d'erreurs humaines.

- **Infrastructure as code (IaC).** *Image :* une notice de montage IKEA. Au lieu de visser les serveurs « à la main » (et d'oublier comment tu avais fait), tu écris la recette dans des fichiers. **On peut reconstruire à l'identique l'infrastructure entière en rejouant la notice.** *Trade-off :* plus de rigueur au départ, mais fini les serveurs « configurés on ne sait plus comment » impossibles à reproduire.

> 💡 **À retenir :** la sécurité de base n'est pas optionnelle (identité ≠ droits, secrets au coffre), et tout ce qui est manuel et non reproductible est une bombe à retardement. Automatise et écris tes recettes.

---

# Module 9 — Décider : arbitrer une architecture

### 🧪 Quiz
1. QCM — La « dette technique », c'est…
   a) de l'argent dû à un fournisseur  b) les raccourcis pris aujourd'hui qu'on devra « rembourser » plus tard avec des intérêts (du temps perdu)  c) du code écrit par un junior
2. Vrai ou faux : il existe une « meilleure architecture » universelle, indépendante du contexte.
3. QCM — Un ADR (*Architecture Decision Record*) sert à…
   a) noter la décision prise, ses raisons et les options écartées  b) lister les bugs  c) écrire la documentation utilisateur
4. Question ouverte : ton équipe doit choisir entre deux solutions. Quels critères concrets utiliserais-tu pour trancher ?

### ✅ Corrigé
1. **b.** Dette technique = raccourcis d'aujourd'hui, intérêts de demain.
2. **Faux.** « Ça dépend » est la vraie réponse de l'architecture. La bonne archi est celle qui colle à *ton* contexte, *tes* contraintes, *ton* équipe.
3. **a.** Un ADR garde la trace du *pourquoi* d'une décision.
4. Critères valides : impact sur le client, coût, délai, risque, réversibilité (peut-on faire marche arrière ?), dette créée, compétences de l'équipe.

### 📚 Points de connaissance

- **« Ça dépend » est une vraie réponse.** *Image :* demander « quelle est la meilleure voiture ? » n'a pas de sens sans savoir si c'est pour déménager, faire du circuit ou se garer en ville. **En architecture, il n'y a pas de gagnant universel, seulement le bon choix pour un contexte donné.** Méfie-toi de quiconque a la même réponse à toutes les questions.

- **Dette technique (technical debt).** *Image :* la carte de crédit. Payer en raccourci aujourd'hui te fait avancer vite, mais tu rembourses plus tard, avec intérêts (du temps et des bugs). **Parfois la dette est un choix malin (livrer vite), à condition de la rembourser.** *Trade-off :* un peu de dette accélère ; trop de dette non remboursée finit par tout paralyser.

- **Réversibilité d'une décision.** *Image :* certaines portes se rouvrent (tu peux revenir en arrière), d'autres claquent dans ton dos. **Une décision facile à défaire mérite peu de débat ; une décision irréversible mérite qu'on y réfléchisse longuement.** *Astuce :* prends vite les décisions réversibles, prends ton temps sur les irréversibles.

- **ADR (carnet de décisions d'architecture).** *Image :* le carnet de bord d'un capitaine. Pour chaque grande décision : le contexte, le choix retenu, et surtout **les options écartées et pourquoi.** **Six mois plus tard, quand quelqu'un demande "pourquoi on a fait comme ça ?", la réponse est écrite.** *Trade-off :* quelques minutes d'écriture qui sauvent des heures de débats répétés et de décisions ré-ouvertes inutilement.

- **Grille d'arbitrage concrète.** Pour trancher entre deux options, pose-toi toujours : **impact client, coût, délai, risque, réversibilité, dette créée, compétences de l'équipe.** *Image :* le comparateur d'assurances — tu ne regardes pas qu'une colonne, tu pèses l'ensemble selon ce qui compte pour toi maintenant.

> 💡 **À retenir :** l'architecte ne cherche pas LA bonne réponse, il rend explicites les compromis et trace le *pourquoi*. La meilleure architecture est celle qui sert ton contexte — et que ton équipe sait faire vivre.

---

## 🎓 Mot de la fin
Si tu retiens une seule chose de tout le cours : **l'architecture est l'art des compromis sous contraintes.** Aucun choix n'est gratuit, chacun donne et reprend quelque chose. Le bon réflexe n'est jamais « quelle est la solution parfaite ? » mais « quel compromis sert le mieux mon contexte, mon équipe et mes utilisateurs, aujourd'hui ? ».
