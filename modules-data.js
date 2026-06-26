"use strict";

const modulesData = [
  {
    id: 0,
    title: "Qu'est-ce que l'architecture logicielle ?",
    questions: [
      {
        type: "truefalse",
        text: "L'architecture, c'est surtout choisir le bon langage de programmation.",
        correct: false,
        explanation: "Faux. Le langage est un détail comparé au découpage des grandes briques. On peut réécrire un module dans un autre langage ; on déplace rarement un « mur porteur »."
      },
      {
        type: "qcm",
        text: "Qu'est-ce qui coûte le plus cher à changer dans un logiciel une fois construit ?",
        options: [
          "La couleur d'un bouton",
          "Le texte d'un message",
          "La façon dont les grosses briques sont découpées et reliées",
          "Le nom d'une variable"
        ],
        correct: 2,
        explanation: "Le découpage et les liens entre briques = les murs porteurs. Les changer après coup oblige souvent à tout casser autour."
      },
      {
        type: "qcm",
        text: "On appelle « attributs de qualité » des propriétés comme la rapidité, la capacité à grossir, la facilité à maintenir. Peut-on les maximiser toutes en même temps ?",
        options: [
          "Oui, avec assez de code",
          "Non, améliorer l'une dégrade souvent une autre",
          "Seulement dans le cloud"
        ],
        correct: 1,
        explanation: "L'architecture est l'art du compromis. Plus de sécurité = souvent moins de rapidité, etc."
      },
      {
        type: "open",
        text: "Avec tes mots, à quoi sert l'architecture d'un logiciel ?",
        keywords: ["structure", "évolu", "temps", "tenir", "organis", "décision", "global", "évoluer"],
        sampleAnswer: "Décider de la structure d'ensemble pour que le logiciel tienne dans le temps et puisse évoluer sans s'effondrer.",
        explanation: "Réponse attendue dans l'esprit : décider de la structure d'ensemble pour que le logiciel tienne dans le temps et puisse évoluer sans s'effondrer."
      }
    ],
    knowledgePoints: [
      {
        concept: "Architecture logicielle",
        definition: "Ensemble des décisions structurantes sur la forme du système : quels composants existent, comment ils communiquent, et quelles contraintes de qualité on vise.",
        example: "Séparer le panier e-commerce du catalogue produits en deux modules avec une API entre les deux, plutôt que tout mélanger dans un seul gros fichier.",
        tradeOff: "Structurer tôt prend du temps au démarrage, mais évite de refactorer toute l'application quand le trafic ou l'équipe grossit."
      },
      {
        concept: "Attributs de qualité (quality attributes)",
        definition: "Propriétés mesurables du système : performance, disponibilité, sécurité, maintenabilité, scalabilité, etc.",
        example: "« Le checkout doit répondre en moins de 200 ms pour 99 % des requêtes » ou « 99,9 % de disponibilité mensuelle ».",
        tradeOff: "Renforcer la sécurité (chiffrement, audits) ajoute souvent de la latence et du coût d'exploitation."
      },
      {
        concept: "Trade-off (compromis)",
        definition: "Fait qu'améliorer un objectif en degrade un autre : on ne peut pas tout maximiser en même temps.",
        example: "Répliquer les données sur 3 zones géographiques améliore la disponibilité, mais complique la cohérence et augmente la facture cloud.",
        tradeOff: "Ignorer les compromis mène à des promesses impossibles (« rapide, gratuit, ultra-sécurisé, sans dette »)."
      },
      {
        concept: "Exigences non-fonctionnelles",
        definition: "Contraintes sur la façon dont le système doit se comporter, en dehors des fonctionnalités métier.",
        example: "« L'appli doit supporter 10 000 utilisateurs simultanés » ou « les données personnelles doivent être chiffrées au repos ».",
        tradeOff: "Sans exigences non-fonctionnelles écrites, l'équipe optimise le « ça marche » au détriment de la tenue en charge."
      }
    ],
    takeaway: "L'architecture, ce sont les décisions structurantes et difficiles à défaire ; elle se juge non pas sur « est-ce que ça marche » mais sur « est-ce que ça tiendra et évoluera »."
  },
  {
    id: 1,
    title: "Les principes de conception",
    questions: [
      {
        type: "qcm",
        text: "Deux modules sont « fortement couplés » quand…",
        options: [
          "Ils sont rangés dans le même dossier",
          "Modifier l'un oblige presque toujours à modifier l'autre",
          "Ils ont le même auteur"
        ],
        correct: 1,
        explanation: "Le couplage mesure à quel point une brique dépend d'une autre."
      },
      {
        type: "truefalse",
        text: "Un module « cohésif » mélange beaucoup de responsabilités différentes pour être polyvalent.",
        correct: false,
        explanation: "Faux. Un module cohésif fait une chose et la fait bien. Le mélange, c'est le contraire de la cohésion."
      },
      {
        type: "qcm",
        text: "Le principe DRY (Don't Repeat Yourself) recommande de…",
        options: [
          "Écrire le moins de commentaires possible",
          "Éviter de dupliquer la même logique à plusieurs endroits",
          "Tout écrire deux fois pour vérifier"
        ],
        correct: 1,
        explanation: "Une seule source de vérité pour chaque règle."
      },
      {
        type: "open",
        text: "Pourquoi un couplage faible rend un logiciel plus facile à faire évoluer ?",
        keywords: ["dépend", "modifier", "cass", "localis", "brique", "changement", "risque", "isol"],
        sampleAnswer: "Si les briques dépendent peu les unes des autres, on en modifie une sans casser les voisines → changements localisés, moins de risques.",
        explanation: "Esprit attendu : si les briques dépendent peu les unes des autres, on en modifie une sans casser les voisines → changements localisés, moins de risques."
      }
    ],
    knowledgePoints: [
      {
        concept: "Couplage (coupling)",
        definition: "Degré de dépendance entre deux modules : plus le couplage est fort, plus modifier l'un force à modifier l'autre.",
        example: "Si `OrderController` appelle directement des requêtes SQL PostgreSQL, changer de base oblige à toucher le controller.",
        tradeOff: "Découpler via des interfaces ajoute du code, mais limite l'impact des changements."
      },
      {
        concept: "Cohésion (cohesion)",
        definition: "Degré auquel les éléments d'un module travaillent vers un même objectif.",
        example: "Un module `Billing` qui ne gère que facturation et paiements = haute cohésion. Le même module qui envoie aussi des emails marketing = faible cohésion.",
        tradeOff: "Trop découper en micro-modules crée de la fragmentation ; l'objectif est un module focalisé, pas minuscule."
      },
      {
        concept: "Separation of concerns (SoC)",
        definition: "Principe qui isole chaque type de responsabilité (UI, logique métier, accès données…) dans une partie distincte.",
        example: "Le template HTML affiche les données ; un service `OrderService` contient la règle métier ; un repository accède à la BDD.",
        tradeOff: "Plus de fichiers et de couches, mais chaque fichier a un rôle identifiable."
      },
      {
        concept: "SOLID",
        definition: "Cinq principes OO (Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion) pour limiter couplage et rigidity.",
        example: "Open/Closed : ajouter un mode de paiement PayPal via une interface `PaymentProvider` sans modifier le code existant.",
        tradeOff: "Sur un script de 50 lignes, appliquer SOLID partout alourdit inutilement le code."
      },
      {
        concept: "DRY (Don't Repeat Yourself)",
        definition: "Une règle métier ne doit exister qu'à un seul endroit dans le code.",
        example: "Le calcul de TVA vit dans `TaxCalculator.calculate()` — pas recopié dans 5 controllers.",
        tradeOff: "Factoriser deux morceaux « qui se ressemblent » mais qui évoluent différemment crée un couplage artificiel."
      },
      {
        concept: "KISS (Keep It Simple)",
        definition: "Préférer la solution la plus simple qui répond au besoin actuel.",
        example: "Stocker la config dans un fichier JSON avant d'installer Redis pour 3 clés de configuration.",
        tradeOff: "Une solution trop minimaliste peut devenir un goulot quand les besoins augmentent."
      }
    ],
    takeaway: "Vise forte cohésion, faible couplage. Une brique = un rôle clair, le moins de fils possible vers les voisines."
  },
  {
    id: 2,
    title: "Organiser le code",
    questions: [
      {
        type: "qcm",
        text: "Le pattern MVC sépare une appli en trois rôles. Lesquels ?",
        options: [
          "Menu, Vitrine, Caisse",
          "Modèle (données), Vue (affichage), Contrôleur (chef d'orchestre)",
          "Mobile, Web, Cloud"
        ],
        correct: 1,
        explanation: "Modèle / Vue / Contrôleur."
      },
      {
        type: "truefalse",
        text: "Dans une architecture en couches, une couche du haut peut parler directement à n'importe quelle autre, dans tous les sens.",
        correct: false,
        explanation: "Faux. Les couches se parlent dans un ordre, généralement de haut en bas. Le but est justement d'éviter le plat de spaghettis."
      },
      {
        type: "qcm",
        text: "L'idée centrale de l'architecture hexagonale (ports & adapters) est…",
        options: [
          "D'avoir six modules",
          "D'isoler le cœur métier des outils externes (base de données, interfaces) via des « prises » interchangeables",
          "D'utiliser une forme hexagonale dans les schémas"
        ],
        correct: 1,
        explanation: "Le métier au centre, les outils branchés autour par des adaptateurs."
      },
      {
        type: "open",
        text: "Pourquoi vouloir que le cœur métier ne « connaisse » pas la base de données ?",
        keywords: ["changer", "outil", "test", "isol", "dépend", "métier", "adapter", "base"],
        sampleAnswer: "Si le cœur ignore l'outil, on peut changer d'outil (passer d'une base à une autre) sans toucher au métier.",
        explanation: "Esprit : si le cœur ignore l'outil, on peut changer d'outil (passer d'une base à une autre) sans toucher au métier."
      }
    ],
    knowledgePoints: [
      {
        concept: "Architecture en couches (layered)",
        definition: "Organisation du code en niveaux (présentation, métier, données…) où chaque couche ne parle qu'à la couche voisine.",
        example: "Controller → Service → Repository → PostgreSQL. Le controller ne fait jamais de `SELECT` direct.",
        tradeOff: "Une requête simple peut traverser 3 couches ; utile pour la clarté, parfois lourd pour un CRUD basique."
      },
      {
        concept: "MVC (Modèle-Vue-Contrôleur)",
        definition: "Pattern qui sépare les données et règles (Model), l'affichage (View) et la coordination des requêtes (Controller).",
        example: "Route `/orders/42` → `OrderController.show()` lit le Model → la View affiche le template HTML.",
        tradeOff: "Les controllers grossissent vite si toute la logique métier y est déplacée (« fat controllers »)."
      },
      {
        concept: "Architecture hexagonale (ports & adapters)",
        definition: "Le domaine métier au centre expose des interfaces (ports) ; les détails techniques (BDD, API, UI) sont des adapters interchangeables.",
        example: "Interface `OrderRepository` implémentée par `PostgresOrderRepository` en prod et `InMemoryOrderRepository` en test.",
        tradeOff: "Plus de fichiers et d'interfaces, mais le métier se teste sans base ni framework web."
      },
      {
        concept: "Clean architecture",
        definition: "Variante concentrique : entités et use cases au centre, infrastructure à la périphérie. Toutes les dépendances pointent vers l'intérieur.",
        example: "Le use case `PlaceOrder` ne importe ni Express ni Mongoose — seulement des interfaces du domaine.",
        tradeOff: "Structure stricte, souvent excessive pour une petite appli CRUD."
      }
    ],
    takeaway: "Protège ton cœur métier des outils techniques. Les outils sont jetables, les règles métier sont précieuses."
  },
  {
    id: 3,
    title: "Découper l'application : monolithe vs microservices",
    questions: [
      {
        type: "qcm",
        text: "Un « monolithe », c'est…",
        options: [
          "Une appli mal codée",
          "Une appli livrée et déployée en un seul bloc",
          "Une appli sans base de données"
        ],
        correct: 1,
        explanation: "Un seul bloc déployé d'un coup. Ce n'est pas une insulte : beaucoup d'excellents produits sont des monolithes."
      },
      {
        type: "truefalse",
        text: "Passer en microservices simplifie toujours le projet.",
        correct: false,
        explanation: "Faux. On échange une complexité (un gros bloc) contre une autre (plein de petits qui doivent communiquer par le réseau)."
      },
      {
        type: "qcm",
        text: "Principal avantage des microservices ?",
        options: [
          "Moins de code total",
          "Chaque service évolue, se déploie et grossit indépendamment des autres",
          "Plus besoin de tests"
        ],
        correct: 1,
        explanation: "L'indépendance d'évolution et de mise à l'échelle."
      },
      {
        type: "open",
        text: "Cite un inconvénient concret des microservices qu'un monolithe n'a pas.",
        keywords: ["réseau", "bug", "communication", "cohérence", "donnée", "complexité", "latence", "ops"],
        sampleAnswer: "La communication réseau qui peut échouer, la difficulté à suivre un bug à travers plusieurs services, la cohérence des données éclatée.",
        explanation: "Exemples valides : la communication réseau qui peut échouer, la difficulté à suivre un bug à travers plusieurs services, la cohérence des données éclatée."
      }
    ],
    knowledgePoints: [
      {
        concept: "Monolithe (monolith)",
        definition: "Application livrée et déployée comme une seule unité (un binaire, un container, un artefact).",
        example: "Une appli Rails complète : routes, jobs, admin et API dans le même repo, un seul `docker compose up`.",
        tradeOff: "Simple à développer et déboguer ; tout le monde déploie et scale le même bloc."
      },
      {
        concept: "Microservices",
        definition: "Application découpée en services autonomes, chacun avec son code, sa base (souvent) et son déploiement indépendant.",
        example: "Service `orders`, service `inventory`, service `notifications` — chacun a son repo et son pipeline CI.",
        tradeOff: "Autonomie d'équipe et scaling ciblé, mais latence réseau, transactions distribuées et observabilité à gérer."
      },
      {
        concept: "Monolithe modulaire (modular monolith)",
        definition: "Un seul déploiement, mais avec des modules/domaines clairement séparés à l'intérieur du code.",
        example: "Packages `billing/`, `catalog/`, `shipping/` dans le même repo, avec des imports interdits entre certains modules.",
        tradeOff: "Bon compromis de départ : simplicité du monolithe + frontières prêtes pour une extraction future."
      },
      {
        concept: "Quand choisir quoi ?",
        definition: "Le découpage dépend de la maturité du domaine, de la taille de l'équipe et des besoins réels de scaling/release.",
        example: "MVP à 3 devs → monolithe modulaire. Équipes de 50 personnes sur 8 domaines avec releases indépendantes → microservices peuvent se justifier.",
        tradeOff: "Microservices trop tôt = complexité distribuée sans bénéfice ; monolithe trop longtemps = couplage d'équipe."
      }
    ],
    takeaway: "Microservices ≠ « plus moderne donc mieux ». C'est un compromis qui résout des problèmes d'échelle… en en créant d'autres. Commence simple."
  },
  {
    id: 4,
    title: "Faire communiquer les composants",
    questions: [
      {
        type: "qcm",
        text: "Une communication « synchrone », c'est comme…",
        options: [
          "Envoyer un SMS et passer à autre chose",
          "Un appel téléphonique : tu attends la réponse en ligne",
          "Déposer une lettre à la poste"
        ],
        correct: 1,
        explanation: "Synchrone = tu restes en ligne et tu attends."
      },
      {
        type: "qcm",
        text: "À quoi sert une « file de messages » (message queue) ?",
        options: [
          "À ranger le code",
          "À stocker les demandes en attente pour les traiter plus tard, sans bloquer l'émetteur",
          "À accélérer la base de données"
        ],
        correct: 1,
        explanation: "La file encaisse les demandes et les distribue au rythme possible."
      },
      {
        type: "truefalse",
        text: "Une API REST, c'est un menu standard qui dit comment demander les choses à un service.",
        correct: true,
        explanation: "Vrai. REST = un ensemble de conventions pour demander/envoyer des données via le web."
      },
      {
        type: "open",
        text: "Donne un cas où l'asynchrone (boîte aux lettres) est préférable au synchrone (téléphone).",
        keywords: ["email", "facture", "vidéo", "notification", "attend", "différé", "pic", "queue"],
        sampleAnswer: "Envoyer un e-mail de confirmation, générer une facture, traiter une vidéo — des tâches qui peuvent se faire « en différé » sans faire patienter l'utilisateur.",
        explanation: "Exemples : envoyer un e-mail de confirmation, générer une facture, traiter une vidéo — des tâches qui peuvent se faire « en différé » sans faire patienter l'utilisateur."
      }
    ],
    knowledgePoints: [
      {
        concept: "Synchrone vs asynchrone",
        definition: "Sync : l'appelant attend la réponse avant de continuer. Async : l'appelant envoie un message et reprend sans attendre le résultat immédiat.",
        example: "Sync : appeler l'API banque et bloquer le checkout jusqu'à la réponse. Async : publier `OrderPlaced` dans une queue, un worker envoie l'email plus tard.",
        tradeOff: "Sync = plus simple à lire ; async = plus résilient aux pics, mais cohérence eventuelle à gérer."
      },
      {
        concept: "API (interface de programmation)",
        definition: "Contrat formalisé qui liste les opérations qu'un service expose, sans révéler son implémentation interne.",
        example: "`POST /api/orders` avec body JSON `{ productId: 42, qty: 1 }` retourne `{ orderId: 'abc' }`.",
        tradeOff: "Le contrat doit être versionné et respecté des deux côtés — une breaking change casse les clients."
      },
      {
        concept: "REST / gRPC",
        definition: "REST : style HTTP ressource-centré (GET/POST/PUT/DELETE + JSON). gRPC : RPC typé sur HTTP/2 avec Protocol Buffers, orienté performance inter-services.",
        example: "REST : `GET /users/12` pour une API publique. gRPC : `InventoryService.GetStock(productId)` entre microservices internes.",
        tradeOff: "REST = universel et debuggable avec curl ; gRPC = plus rapide et typé, moins pratique depuis un navigateur."
      },
      {
        concept: "File de messages (message queue)",
        definition: "Buffer persistant entre un producteur et un ou plusieurs consommateurs qui traitent les messages à leur rythme.",
        example: "Black Friday : 50 000 événements `OrderCreated` dans RabbitMQ, 20 workers consomment progressivement.",
        tradeOff: "Absorbe les pics et découple les services, mais ajoute latence et gestion des dead-letter queues."
      }
    ],
    takeaway: "Demande-toi toujours « est-ce que l'utilisateur doit vraiment attendre cette réponse ? ». Si non, l'asynchrone rend le système plus fluide et plus robuste."
  },
  {
    id: 5,
    title: "Les données : bases, cache et cohérence",
    questions: [
      {
        type: "qcm",
        text: "Une base SQL (relationnelle) ressemble surtout à…",
        options: [
          "Des boîtes à chaussures étiquetées en vrac",
          "Des tableaux à colonnes fixes, bien définis, qui se relient entre eux",
          "Un cahier de brouillon"
        ],
        correct: 1,
        explanation: "SQL = des tableaux structurés et reliés (clients, commandes, produits…)."
      },
      {
        type: "qcm",
        text: "À quoi sert un « cache » ?",
        options: [
          "À cacher des données secrètes",
          "À garder sous la main une copie de ce qu'on consulte souvent, pour éviter d'aller le rechercher loin à chaque fois",
          "À sauvegarder en cas de panne"
        ],
        correct: 1,
        explanation: "Le cache garde le fréquent à portée de main."
      },
      {
        type: "truefalse",
        text: "Le théorème CAP dit qu'on peut avoir en même temps cohérence parfaite, disponibilité totale et résistance aux coupures réseau.",
        correct: false,
        explanation: "Faux. CAP dit qu'en cas de coupure réseau, tu dois choisir entre cohérence et disponibilité. On ne peut pas tout avoir."
      },
      {
        type: "open",
        text: "Pourquoi un cache peut-il parfois afficher une information périmée ?",
        keywords: ["copie", "original", "rafraîch", "périm", "stale", "synchron", "mettre à jour"],
        sampleAnswer: "Parce que le cache est une copie ; si l'original change et que la copie n'est pas rafraîchie, tu vois l'ancienne version.",
        explanation: "Parce que le cache est une copie ; si l'original change et que la copie n'est pas rafraîchie, tu vois l'ancienne version."
      }
    ],
    knowledgePoints: [
      {
        concept: "Base relationnelle (SQL)",
        definition: "Base de données structurée en tables avec colonnes typées, clés et relations (foreign keys), interrogée via SQL.",
        example: "Table `users(id, email)` liée à `orders(user_id, total)` — une commande référence toujours un utilisateur existant.",
        tradeOff: "Schéma strict et transactions ACID ; moins adapté si la structure des documents change souvent."
      },
      {
        concept: "Base NoSQL",
        definition: "Famille de bases non relationnelles (document, clé-valeur, colonne, graphe) avec schéma flexible et scaling horizontal simplifié.",
        example: "MongoDB stocke un document `{ _id, name, tags: [...] }` sans imposer les mêmes champs à tous les documents.",
        tradeOff: "Flexibilité et volume, mais pas les mêmes garanties de cohérence qu'un SQL bien modélisé."
      },
      {
        concept: "Cache",
        definition: "Couche de stockage rapide qui conserve une copie de données lues fréquemment, pour éviter de reinterroger la source lente.",
        example: "Redis garde le profil utilisateur 5 minutes après un `GET /users/12` — les requêtes suivantes ne touchent pas PostgreSQL.",
        tradeOff: "Latence réduite, mais la copie peut être périmée tant qu'elle n'est pas invalidée ou expirée (TTL)."
      },
      {
        concept: "Cohérence (consistency)",
        definition: "Propriété selon laquelle toutes les lectures retournent la dernière écriture (ou une valeur conforme au modèle de cohérence choisi).",
        example: "Après un virement, le solde affiché est identique sur l'app mobile et sur le web — pas de montant intermédiaire visible.",
        tradeOff: "Cohérence forte entre réplicas = plus de latence et de coordination réseau."
      },
      {
        concept: "Théorème CAP",
        definition: "Sur un système distribué, en cas de partition réseau (P), on ne peut garantir simultanément Cohérence (C) et Disponibilité (A) — il faut en sacrifier une.",
        example: "Pendant une coupure entre datacenters : soit on refuse d'écrire (C), soit on accepte des lectures potentiellement obsolètes (A).",
        tradeOff: "Banque → priorité C ; fil d'actualité → priorité A."
      }
    ],
    takeaway: "Une donnée copiée (cache, réplique) est rapide mais peut mentir. Tout l'art consiste à décider quand la fraîcheur compte vraiment."
  },
  {
    id: 6,
    title: "La scalabilité : tenir la charge",
    questions: [
      {
        type: "qcm",
        text: "« Scaler verticalement », c'est…",
        options: [
          "Ouvrir plus de caisses au supermarché",
          "Agrandir/muscler la caisse existante (plus de mémoire, plus puissant)",
          "Baisser les prix"
        ],
        correct: 1,
        explanation: "Vertical = on muscle une seule machine."
      },
      {
        type: "qcm",
        text: "Un « load balancer » fait quoi ?",
        options: [
          "Il répartit les visiteurs entre plusieurs machines pour qu'aucune ne sature",
          "Il sauvegarde les données",
          "Il accélère le code"
        ],
        correct: 0,
        explanation: "Le load balancer aiguille le trafic."
      },
      {
        type: "truefalse",
        text: "Un service « stateless » (sans état) a besoin de se souvenir de chaque utilisateur entre deux demandes.",
        correct: false,
        explanation: "Faux. Stateless = il ne se souvient de rien entre deux demandes ; chaque demande se suffit à elle-même. C'est justement ce qui permet d'ajouter des machines facilement."
      },
      {
        type: "open",
        text: "Pourquoi le scaling horizontal (plus de machines) est-il plus difficile mais plus durable que le vertical ?",
        keywords: ["limite", "plafond", "machine", "coord", "répart", "physique", "caisse"],
        sampleAnswer: "Une seule machine a une limite physique ; ajouter des machines n'a presque pas de plafond, mais oblige à coordonner et à répartir.",
        explanation: "Esprit : une seule machine a une limite physique ; ajouter des machines n'a presque pas de plafond, mais oblige à coordonner et à répartir."
      }
    ],
    knowledgePoints: [
      {
        concept: "Scaling vertical",
        definition: "Augmenter les ressources d'une seule machine (CPU, RAM, disque) pour absorber plus de charge.",
        example: "Passer de 4 Go à 32 Go RAM sur le serveur PostgreSQL quand les requêtes ralentissent.",
        tradeOff: "Simple à mettre en œuvre, mais plafond matériel et point de défaillance unique."
      },
      {
        concept: "Scaling horizontal",
        definition: "Ajouter des instances en parallèle pour répartir la charge au lieu d'agrandir une seule machine.",
        example: "3 replicas de l'API derrière un load balancer au lieu d'un seul serveur surdimensionné.",
        tradeOff: "Scaling quasi illimité et meilleure tolérance aux pannes, mais coordination et répartition à gérer."
      },
      {
        concept: "Load balancer (répartiteur de charge)",
        definition: "Composant réseau qui distribue les requêtes entrantes entre plusieurs backends selon une règle (round-robin, least connections…).",
        example: "NGINX envoie chaque `GET /` vers `app-1`, `app-2` ou `app-3` selon la charge actuelle.",
        tradeOff: "Indispensable en horizontal ; le load balancer lui-même doit être redondé."
      },
      {
        concept: "Stateless (sans état)",
        definition: "Service qui ne conserve pas de session locale entre deux requêtes — chaque requête contient tout le contexte nécessaire.",
        example: "JWT dans le header `Authorization` : n'importe quelle instance API peut traiter la requête sans mémoire partagée.",
        tradeOff: "Permet d'ajouter/retirer des instances librement ; l'état utilisateur doit vivre ailleurs (BDD, Redis)."
      },
      {
        concept: "CDN (réseau de distribution de contenu)",
        definition: "Réseau de serveurs edge qui met en cache les assets statiques (JS, CSS, images, vidéos) près des utilisateurs.",
        example: "Cloudflare sert `logo.png` depuis Paris pour un visiteur français, au lieu du serveur d'origine aux USA.",
        tradeOff: "Latence réduite pour le contenu statique ; invalidation de cache à prévoir lors des mises à jour."
      }
    ],
    takeaway: "Pour grossir durablement, on cherche à pouvoir « ajouter des caisses » (horizontal). Et pour ça, le secret c'est le stateless : des machines interchangeables qui ne retiennent rien."
  },
  {
    id: 7,
    title: "La résilience : survivre aux pannes",
    questions: [
      {
        type: "qcm",
        text: "La « redondance », c'est…",
        options: [
          "Écrire deux fois le même code",
          "Avoir un double de secours prêt à prendre le relais",
          "Répéter une explication"
        ],
        correct: 1,
        explanation: "Redondance = un double prêt à prendre le relais."
      },
      {
        type: "qcm",
        text: "Un « circuit breaker » (disjoncteur) dans un logiciel sert à…",
        options: [
          "Couper l'électricité du serveur",
          "Arrêter d'appeler un service en panne pour éviter d'aggraver la situation, le temps qu'il se rétablisse",
          "Accélérer les requêtes"
        ],
        correct: 1,
        explanation: "Le disjoncteur coupe les appels vers un service défaillant pour ne pas empirer."
      },
      {
        type: "truefalse",
        text: "Réessayer (retry) sans limite une opération qui échoue est toujours une bonne idée.",
        correct: false,
        explanation: "Faux. Réessayer sans limite peut achever un service déjà à genoux (effet boule de neige). On réessaie avec modération et délais croissants."
      },
      {
        type: "open",
        text: "Qu'est-ce que l'observabilité, et pourquoi en a-t-on besoin ?",
        keywords: ["mesure", "journal", "log", "alerte", "tableau de bord", "voir", "diagnost", "incident"],
        sampleAnswer: "C'est la capacité à voir ce qui se passe à l'intérieur du système (mesures, journaux, alertes) pour comprendre et réagir — comme le tableau de bord d'une voiture.",
        explanation: "Esprit : c'est la capacité à voir ce qui se passe à l'intérieur du système (mesures, journaux, alertes) pour comprendre et réagir — comme le tableau de bord d'une voiture."
      }
    ],
    knowledgePoints: [
      {
        concept: "Redondance (redundancy)",
        definition: "Duplication de composants critiques (serveurs, bases, zones) pour qu'une panne d'un élément n'arrête pas le service.",
        example: "Deux replicas PostgreSQL en primary/replica : si le primary tombe, le replica prend le relais.",
        tradeOff: "Coût matériel et opérationnel doublé, mais disponibilité nettement améliorée."
      },
      {
        concept: "Failover (bascule automatique)",
        definition: "Mécanisme qui redirige automatiquement le trafic ou les écritures vers un composant de secours quand le principal échoue.",
        example: "Health check échoue sur `api-1` → le load balancer retire `api-1` et route tout vers `api-2`.",
        tradeOff: "Doit être testé régulièrement (game days) — un failover jamais exercé peut échouer le jour J."
      },
      {
        concept: "Retry (réessai)",
        definition: "Politique qui relance une opération échouée après un délai, en supposant que l'erreur est transitoire (timeout réseau, surcharge temporaire).",
        example: "3 tentatives avec backoff exponentiel (1s, 2s, 4s) avant d'abandonner un appel API externe.",
        tradeOff: "Corrige les pannes passagères, mais retries massifs simultanés peuvent saturer un service déjà en difficulté."
      },
      {
        concept: "Circuit breaker (disjoncteur)",
        definition: "Pattern qui coupe temporairement les appels vers un service défaillant pour éviter la cascade de timeouts et laisser le service se rétablir.",
        example: "Après 5 échecs consécutifs sur `PaymentService`, le breaker passe en OPEN pendant 30s — les appels retournent une erreur immédiate.",
        tradeOff: "Protège le système global au prix d'une fonctionnalité temporairement indisponible."
      },
      {
        concept: "Observabilité (observability)",
        definition: "Capacité à comprendre l'état interne d'un système à partir de ses sorties externes : métriques, logs, traces distribuées et alertes.",
        example: "Grafana affiche le taux d'erreur 5xx ; une alerte Slack part si la latence p95 dépasse 500 ms pendant 5 min.",
        tradeOff: "Investissement initial (instrumentation, stack), mais indispensable pour diagnostiquer les incidents en production."
      }
    ],
    takeaway: "En architecture, on ne se demande pas si ça va tomber, mais quand. La résilience, c'est prévoir la panne et organiser la survie à l'avance."
  },
  {
    id: 8,
    title: "Sécurité et mise en production",
    questions: [
      {
        type: "qcm",
        text: "Quelle est la différence entre authentification et autorisation ?",
        options: [
          "Aucune, c'est synonyme",
          "L'authentification dit qui tu es, l'autorisation dit ce que tu as le droit de faire",
          "L'une est pour le web, l'autre pour le mobile"
        ],
        correct: 1,
        explanation: "Authentification = identité ; autorisation = droits."
      },
      {
        type: "truefalse",
        text: "Écrire un mot de passe ou une clé secrète directement dans le code est une pratique sûre.",
        correct: false,
        explanation: "Faux. Un secret dans le code, c'est le code de ta carte bleue écrit sur un post-it collé à l'écran. On range les secrets dans un coffre dédié."
      },
      {
        type: "qcm",
        text: "La « CI/CD » sert à…",
        options: [
          "Coder plus vite à la main",
          "Automatiser les tests et la mise en production du code",
          "Chiffrer la base de données"
        ],
        correct: 1,
        explanation: "CI/CD = chaîne automatisée de tests et de déploiement."
      },
      {
        type: "open",
        text: "Avec une image du quotidien, explique ce qu'est l'« infrastructure as code ».",
        keywords: ["recette", "fichier", "reproduc", "notice", "montage", "terraform", "serveur", "automatis"],
        sampleAnswer: "Décrire son infrastructure (serveurs, réseaux) dans des fichiers reproductibles, comme une notice de montage IKEA qu'on peut rejouer à l'identique.",
        explanation: "Esprit attendu : décrire son infrastructure (serveurs, réseaux) dans des fichiers reproductibles, comme une notice de montage IKEA qu'on peut rejouer à l'identique."
      }
    ],
    knowledgePoints: [
      {
        concept: "Authentification (authn)",
        definition: "Processus qui vérifie l'identité d'un utilisateur ou d'un service (mot de passe, OAuth, certificat, MFA).",
        example: "Login email/mot de passe → le serveur vérifie le hash bcrypt → émet un JWT signé.",
        tradeOff: "Plus de facteurs = plus de sécurité, mais plus de friction à la connexion."
      },
      {
        concept: "Autorisation (authz)",
        definition: "Contrôle qui détermine quelles actions ou ressources un identité authentifiée peut accéder.",
        example: "Utilisateur authentifié avec rôle `admin` peut `DELETE /users/12` ; un `viewer` ne peut que `GET`.",
        tradeOff: "RBAC/ABAC fin = sécurité renforcée, mais matrice de permissions plus complexe à maintenir."
      },
      {
        concept: "Gestion des secrets",
        definition: "Stockage et rotation centralisés des credentials sensibles (API keys, mots de passe BDD, certificats) hors du code source.",
        example: "Variables injectées depuis Vault ou AWS Secrets Manager au déploiement — jamais de `API_KEY=xxx` dans Git.",
        tradeOff: "Setup initial, mais un secret commité finit presque toujours par être exposé."
      },
      {
        concept: "CI/CD (intégration et livraison continues)",
        definition: "Pipeline automatisé qui build, teste et déploie le code à chaque commit ou merge, sans intervention manuelle.",
        example: "Push sur `main` → GitHub Actions lance les tests → build Docker → déploiement sur Kubernetes si tout est vert.",
        tradeOff: "Investissement pipeline, mais livraisons fréquentes et reproductibles avec moins d'erreurs humaines."
      },
      {
        concept: "Infrastructure as code (IaC)",
        definition: "Description déclarative de l'infrastructure (serveurs, réseau, DNS, IAM) dans des fichiers versionnés, appliqués par un outil.",
        example: "Fichier Terraform qui provisionne 3 instances EC2 + un RDS PostgreSQL — rejouable à l'identique sur staging et prod.",
        tradeOff: "Courbe d'apprentissage, mais fini les serveurs configurés à la main et impossibles à reproduire."
      }
    ],
    takeaway: "La sécurité de base n'est pas optionnelle (identité ≠ droits, secrets au coffre), et tout ce qui est manuel et non reproductible est une bombe à retardement. Automatise et écris tes recettes."
  },
  {
    id: 9,
    title: "Décider : arbitrer une architecture",
    questions: [
      {
        type: "qcm",
        text: "La « dette technique », c'est…",
        options: [
          "De l'argent dû à un fournisseur",
          "Les raccourcis pris aujourd'hui qu'on devra « rembourser » plus tard avec des intérêts (du temps perdu)",
          "Du code écrit par un junior"
        ],
        correct: 1,
        explanation: "Dette technique = raccourcis d'aujourd'hui, intérêts de demain."
      },
      {
        type: "truefalse",
        text: "Il existe une « meilleure architecture » universelle, indépendante du contexte.",
        correct: false,
        explanation: "Faux. « Ça dépend » est la vraie réponse de l'architecture. La bonne archi est celle qui colle à ton contexte, tes contraintes, ton équipe."
      },
      {
        type: "qcm",
        text: "Un ADR (Architecture Decision Record) sert à…",
        options: [
          "Noter la décision prise, ses raisons et les options écartées",
          "Lister les bugs",
          "Écrire la documentation utilisateur"
        ],
        correct: 0,
        explanation: "Un ADR garde la trace du pourquoi d'une décision."
      },
      {
        type: "open",
        text: "Ton équipe doit choisir entre deux solutions. Quels critères concrets utiliserais-tu pour trancher ?",
        keywords: ["coût", "délai", "risque", "client", "équipe", "révers", "dette", "impact", "compétence"],
        sampleAnswer: "Impact sur le client, coût, délai, risque, réversibilité (peut-on faire marche arrière ?), dette créée, compétences de l'équipe.",
        explanation: "Critères valides : impact sur le client, coût, délai, risque, réversibilité, dette créée, compétences de l'équipe."
      }
    ],
    knowledgePoints: [
      {
        concept: "« Ça dépend » est une vraie réponse",
        definition: "Il n'existe pas d'architecture universellement optimale — le bon choix dépend du contexte (équipe, charge, budget, délais, domaine).",
        example: "Event-driven + microservices pour Netflix ; monolithe modulaire pour un MVP à 3 développeurs — les deux sont valides dans leur contexte.",
        tradeOff: "Méfiance envers les solutions « one size fits all » vendues comme standards."
      },
      {
        concept: "Dette technique (technical debt)",
        definition: "Compromis de conception ou raccourcis de code pris pour livrer plus vite, qui augmentent le coût de modification future.",
        example: "Copier-coller la logique de validation au lieu de créer un module partagé — gain immédiat, refactor obligatoire dans 6 mois.",
        tradeOff: "Dette consciente et remboursée = levier ; dette ignorée = ralentissement progressif de toute l'équipe."
      },
      {
        concept: "Réversibilité d'une décision",
        definition: "Facilité avec laquelle une décision architecturale peut être annulée ou modifiée sans coût prohibitif.",
        example: "Choisir Redis comme cache = réversible (on peut migrer). Choisir une base propriétaire verrouillée = difficile à inverser.",
        tradeOff: "Décisions réversibles → trancher vite ; décisions irréversibles → analyser en profondeur avant de committer."
      },
      {
        concept: "ADR (carnet de décisions d'architecture)",
        definition: "Document court qui enregistre une décision architecturale, son contexte, les options écartées et leurs raisons.",
        example: "ADR-007 : « On choisit PostgreSQL plutôt que MongoDB car les relations commande/client sont centrales et transactionnelles. »",
        tradeOff: "Quelques minutes d'écriture qui évitent de re-débattre les mêmes choix six mois plus tard."
      },
      {
        concept: "Grille d'arbitrage concrète",
        definition: "Ensemble de critères pondérés pour comparer objectivement plusieurs options architecturales.",
        example: "Option A vs B : impact client (3/5), coût infra (2/5), délai (4/5), risque (2/5), réversibilité (5/5), dette (3/5).",
        tradeOff: "Aucun critère seul ne décide — c'est la pondération selon le contexte actuel qui tranche."
      }
    ],
    takeaway: "L'architecte ne cherche pas LA bonne réponse, il rend explicites les compromis et trace le pourquoi. La meilleure architecture est celle qui sert ton contexte — et que ton équipe sait faire vivre."
  }
];
