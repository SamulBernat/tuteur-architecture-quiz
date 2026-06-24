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
        image: "Le plan d'une maison. La déco, les meubles (le code de tous les jours) se changent en un après-midi. Les murs porteurs, l'emplacement de l'escalier, l'arrivée d'eau (l'architecture) se changent au prix de gros travaux.",
        insight: "L'architecture, ce sont les décisions difficiles à défaire.",
        tradeOff: "Prendre le temps de bien poser les murs ralentit le démarrage, mais évite de tout casser plus tard."
      },
      {
        concept: "Attributs de qualité (quality attributes / -ilities)",
        image: "Acheter une voiture. Tu veux qu'elle soit rapide, économe, sûre, confortable, pas chère. Impossible d'avoir le maximum de tout : une Ferrari n'est pas économe, une citadine n'est pas rapide. Pareil pour un logiciel : rapidité, scalabilité, maintenabilité, sécurité, disponibilité.",
        insight: "Concevoir une archi, c'est arbitrer entre ces qualités.",
        tradeOff: "Choisir une voiture, c'est renoncer ; concevoir une archi, c'est arbitrer."
      },
      {
        concept: "Trade-off (compromis)",
        image: "Une couverture trop courte. Tu te couvres les épaules, tu as froid aux pieds ; tu couvres les pieds, tu as froid aux épaules.",
        insight: "Chaque choix donne quelque chose et en retire un autre. Le bon architecte ne cherche pas la solution parfaite, il cherche le compromis adapté au contexte.",
        tradeOff: "Ignorer les compromis mène à des choix « magiques » qui coûtent cher plus tard."
      },
      {
        concept: "Exigences non-fonctionnelles",
        image: "Au restaurant, « je veux un steak » est l'exigence fonctionnelle ; « je veux être servi en 15 min, sans tomber malade » sont les non-fonctionnelles.",
        insight: "Le logiciel doit faire le job et le faire vite, sûr, fiable.",
        tradeOff: "Les exigences non-fonctionnelles orientent l'architecture — les négliger, c'est construire une maison sans fondations."
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
        image: "Des wagons de train attachés. Si tu freines le premier, tous freinent. Couplage fort = quand tu touches une brique, les autres bougent.",
        insight: "On cherche un couplage faible : des wagons qu'on peut détacher sans dérailler le reste.",
        tradeOff: "Trop découpler ajoute des intermédiaires et de la complexité ; il faut viser « juste assez détaché »."
      },
      {
        concept: "Cohésion (cohesion)",
        image: "Une boîte à outils bien rangée — les tournevis ensemble, les clés ensemble. L'inverse : un tiroir fourre-tout où tu ne retrouves rien.",
        insight: "Une brique cohésive regroupe ce qui va naturellement ensemble.",
        tradeOff: "On vise forte cohésion + faible couplage : chaque brique fait une chose claire, et dépend peu des autres."
      },
      {
        concept: "Separation of concerns (séparation des préoccupations)",
        image: "Dans un restaurant, la cuisine cuisine, la salle sert, la caisse encaisse. Personne ne fait tout.",
        insight: "Chaque partie du code s'occupe d'un seul type de problème.",
        tradeOff: "Plus de séparation = plus de fichiers à naviguer, mais chacun est simple."
      },
      {
        concept: "SOLID",
        image: "Des LEGO standardisés — chaque brique a un rôle, et elles s'emboîtent sans colle. Cinq principes pour du code orienté objet propre.",
        insight: "Chaque classe a un seul boulot, on étend sans tout réécrire, on ne crée pas de dépendances surprises.",
        tradeOff: "SOLID peut sembler over-engineered sur un petit script — adapte à l'échelle."
      },
      {
        concept: "DRY (Don't Repeat Yourself)",
        image: "Une seule recette de gâteau dans un carnet. Si la recette change, tu modifies une page, pas vingt feuilles volantes.",
        insight: "Une règle = un seul endroit.",
        tradeOff: "À l'excès, on factorise des choses qui n'avaient rien à voir → couplage artificiel. DRY oui, mais pas au point de relier ce qui est juste « ressemblant »."
      },
      {
        concept: "KISS (Keep It Simple)",
        image: "Pour planter un clou, un marteau, pas une perceuse à colonne.",
        insight: "La solution la plus simple qui marche est presque toujours la bonne.",
        tradeOff: "Trop simple aujourd'hui peut devenir un goulot demain — le timing compte."
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
        image: "Un immeuble. On entre par le rez-de-chaussée (l'interface), on monte aux étages (logique métier, puis accès aux données). Chaque étage ne parle qu'à l'étage voisin, pas en sautant par la fenêtre.",
        insight: "Chaque couche communique avec la couche adjacente, pas en raccourci.",
        tradeOff: "Clair et carré, mais parfois lourd (traverser tous les étages pour une demande simple)."
      },
      {
        concept: "MVC (Modèle-Vue-Contrôleur)",
        image: "Un restaurant. La Vue = la salle et le menu (ce que voit le client). Le Modèle = la cuisine et le garde-manger (données et règles). Le Contrôleur = le serveur qui prend la commande et fait la navette.",
        insight: "Chacun son rôle ; le client ne voit jamais la cuisine.",
        tradeOff: "Excellent pour séparer l'affichage du reste ; peut devenir confus quand l'appli grossit beaucoup."
      },
      {
        concept: "Architecture hexagonale (ports & adapters)",
        image: "Les prises électriques. Ton appareil (le cœur métier) a une fiche standard. Que tu sois en France, au UK ou aux US, tu mets un adaptateur ; l'appareil, lui, ne change pas.",
        insight: "Le métier définit des « prises » (ports), et on y branche les outils externes via des adaptateurs interchangeables.",
        tradeOff: "On peut changer un outil sans toucher au métier (et tester le métier seul), mais ça demande plus de structure au départ."
      },
      {
        concept: "Clean architecture",
        image: "Des poupées russes. Au centre, les règles métier les plus stables ; autour, des couches de plus en plus « techniques » et jetables.",
        insight: "Règle d'or : les dépendances pointent vers l'intérieur — le détail technique dépend du métier, jamais l'inverse.",
        tradeOff: "Même idée que l'hexagonal, poussée plus loin — overkill pour un CRUD trivial."
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
        image: "Une grande maison familiale. Tout le monde sous le même toit, on se parle d'une pièce à l'autre en criant — c'est simple et rapide. Mais si tu refais l'électricité, tu coupes le courant de toute la maison.",
        insight: "Tout le code dans un seul bloc déployé ensemble.",
        tradeOff: "Simple à démarrer, à tester, à déboguer ; devient lourd quand l'équipe et le code grossissent."
      },
      {
        concept: "Microservices",
        image: "Un quartier de petites maisons indépendantes. Chacune a sa cuisine, son compteur. Tu refais l'une sans déranger les autres. Mais pour se parler, les voisins doivent sortir et marcher dans la rue (le réseau).",
        insight: "Chaque fonctionnalité est un petit service autonome, déployable seul.",
        tradeOff: "Équipes indépendantes et montée en charge ciblée, au prix d'une grosse complexité réseau, de surveillance et de coordination."
      },
      {
        concept: "Monolithe modulaire (modular monolith)",
        image: "Une colocation. Un seul appartement (un seul déploiement), mais des chambres bien séparées avec des règles claires de qui touche quoi.",
        insight: "Le meilleur des deux mondes pour beaucoup d'équipes : simplicité d'un bloc unique, intérieur proprement cloisonné.",
        tradeOff: "Demande discipline — sans elle, retour au big ball of mud."
      },
      {
        concept: "Quand choisir quoi ?",
        image: "On ne construit pas un quartier entier pour loger une famille de quatre.",
        insight: "On démarre presque toujours par un monolithe (idéalement modulaire) et on ne découpe en microservices que quand une vraie douleur l'exige.",
        tradeOff: "Découper trop tôt est une erreur classique et coûteuse."
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
        image: "Le synchrone est un coup de téléphone — tu restes en ligne jusqu'à la réponse, pratique mais bloquant. L'asynchrone est un SMS ou une boîte aux lettres — tu déposes ton message et tu vaques à tes occupations.",
        insight: "Synchrone = j'attends ; asynchrone = je délègue et je continue.",
        tradeOff: "Synchrone est simple et immédiat mais fragile ; asynchrone est robuste et fluide mais plus complexe à suivre."
      },
      {
        concept: "API (interface de programmation)",
        image: "Le menu d'un restaurant. Tu ne vas pas en cuisine ; tu commandes via une liste de plats prédéfinis.",
        insight: "Une API, c'est la liste officielle des demandes qu'un service accepte, sans que tu saches comment c'est fait à l'intérieur.",
        tradeOff: "Le menu cadre et protège, mais il faut que les deux côtés respectent le contrat."
      },
      {
        concept: "REST / gRPC",
        image: "Deux façons de « passer commande » entre services. REST = le menu web classique, lisible, universel. gRPC = un canal interne plus rapide et plus strict, comme un passe-plat direct entre cuisines voisines.",
        insight: "REST pour exposer des données ; gRPC pour les échanges internes intensifs.",
        tradeOff: "REST gagne en simplicité et compatibilité ; gRPC gagne en vitesse machine-to-machine."
      },
      {
        concept: "File de messages (message queue)",
        image: "La file d'attente à la poste, ou la boîte de réception. Les demandes s'empilent, un guichet les traite une par une à son rythme.",
        insight: "Si un pic arrive, la file absorbe le choc au lieu de tout faire planter.",
        tradeOff: "Lisse les pics et découple émetteur/récepteur, mais ajoute un intermédiaire et la réponse n'est plus instantanée."
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
        image: "Un classeur Excel rigoureux. Des tableaux à colonnes fixes (un client a un nom, un email, un id), reliés entre eux (une commande pointe vers un client).",
        insight: "Tout est carré, structuré, vérifié.",
        tradeOff: "Parfait pour des données bien définies et des relations claires ; moins souple quand la forme des données change tout le temps."
      },
      {
        concept: "Base NoSQL",
        image: "Des boîtes à chaussures étiquetées. Tu mets ce que tu veux dans chaque boîte, la forme peut varier d'une boîte à l'autre.",
        insight: "Souple et rapide pour de gros volumes peu structurés.",
        tradeOff: "Gagne en flexibilité et en passage à l'échelle ; perd les garanties strictes du SQL. Données structurées → SQL ; gros volumes flexibles → NoSQL."
      },
      {
        concept: "Cache",
        image: "Tu poses la bouteille de lait sur le comptoir pendant le petit-déj au lieu d'aller au frigo à chaque gorgée.",
        insight: "Le cache garde une copie du fréquent tout près, pour répondre vite.",
        tradeOff: "Énorme gain de vitesse, mais risque de servir une info périmée. La grande question : quand jeter la copie ?"
      },
      {
        concept: "Cohérence (consistency)",
        image: "Si tu vires de l'argent, tu veux que ton solde affiche immédiatement le bon montant, partout.",
        insight: "Cohérence = tout le monde voit la même donnée à jour, au même instant.",
        tradeOff: "Coûteux à garantir quand les données sont copiées sur plusieurs machines."
      },
      {
        concept: "Théorème CAP",
        image: "La couverture trop courte, version réseau. Quand la communication entre tes machines se coupe, tu dois choisir : rester cohérent (refuser de répondre) ou rester disponible (répondre quitte à donner une info un peu ancienne).",
        insight: "Tu ne peux pas avoir les deux pendant une coupure.",
        tradeOff: "Une banque choisira la cohérence ; un fil d'actualité choisira la disponibilité."
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
        image: "À la caisse du supermarché bondé, tu rends la caissière plus rapide et tu agrandis le tapis.",
        insight: "Tu muscles la machine unique : plus de mémoire, plus de puissance.",
        tradeOff: "Simple (rien à réorganiser) mais plafond physique, coût élevé, et si la machine tombe, tout tombe."
      },
      {
        concept: "Scaling horizontal",
        image: "Tu ouvres plus de caisses. Au lieu d'une caisse surpuissante, dix caisses normales.",
        insight: "Tu ajoutes des machines en parallèle.",
        tradeOff: "Quasiment pas de plafond et plus résistant aux pannes, mais il faut répartir les clients et coordonner."
      },
      {
        concept: "Load balancer (répartiteur de charge)",
        image: "L'employé à l'entrée qui dit « caisse 3 est libre, allez-y ».",
        insight: "Il distribue les visiteurs vers les machines disponibles pour qu'aucune ne sature.",
        tradeOff: "Indispensable pour le scaling horizontal ; devient lui-même un point à surveiller et à doubler."
      },
      {
        concept: "Stateless (sans état)",
        image: "Un guichet d'information où, à chaque question, tu redonnes tout le contexte ; l'employé n'a pas besoin de se souvenir de toi.",
        insight: "Comme aucune machine ne retient l'utilisateur, n'importe laquelle peut traiter n'importe quelle demande.",
        tradeOff: "Il faut stocker la « mémoire » ailleurs (base, cache partagé), mais on gagne une scalabilité énorme."
      },
      {
        concept: "CDN (réseau de distribution de contenu)",
        image: "Au lieu d'un seul entrepôt central à l'autre bout du monde, des mini-entrepôts dans chaque ville.",
        insight: "On rapproche les contenus (images, vidéos) des utilisateurs.",
        tradeOff: "Énorme gain de vitesse, mais c'est une copie de plus à tenir à jour."
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
        image: "La roue de secours dans le coffre. Tu espères ne jamais t'en servir, mais le jour où un pneu crève, tu continues ta route.",
        insight: "On double les éléments critiques pour qu'une panne n'arrête pas tout.",
        tradeOff: "Ça coûte (payer un double qui dort), mais c'est le prix de la disponibilité."
      },
      {
        concept: "Failover (bascule automatique)",
        image: "Le groupe électrogène d'un hôpital qui démarre tout seul à la coupure de courant.",
        insight: "Quand l'élément principal tombe, le secours prend le relais automatiquement.",
        tradeOff: "La bascule doit elle-même être fiable et testée — un secours qu'on n'a jamais essayé est un faux secours."
      },
      {
        concept: "Retry (réessai)",
        image: "La ligne sonne occupé, tu rappelles 30 secondes plus tard.",
        insight: "On retente une opération qui a échoué, car beaucoup de pannes sont passagères.",
        tradeOff: "Réessayer trop vite et tous en même temps peut achever un service déjà saturé. On espace les tentatives et on fixe une limite."
      },
      {
        concept: "Circuit breaker (disjoncteur)",
        image: "Le disjoncteur électrique de la maison. En cas de surcharge, il coupe pour protéger l'installation.",
        insight: "Quand un service répond mal, on arrête de l'appeler un moment pour le laisser respirer et éviter l'effet domino.",
        tradeOff: "On rend volontairement une partie indisponible pour sauver l'ensemble."
      },
      {
        concept: "Observabilité (observability)",
        image: "Le tableau de bord d'une voiture — vitesse, température, jauge d'essence, voyants. Sans lui, tu roules les yeux fermés.",
        insight: "C'est l'ensemble des mesures, journaux et alertes qui te disent ce qui se passe à l'intérieur du système.",
        tradeOff: "Ça demande de l'effort à mettre en place, mais sans visibilité, un incident devient une enquête à l'aveugle."
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
        image: "Montrer sa carte d'identité à l'entrée.",
        insight: "« Prouve-moi qui tu es. » Mot de passe, code, empreinte. C'est l'étape « qui es-tu ? ».",
        tradeOff: "Plus de méthodes d'auth = plus de sécurité, mais aussi plus de friction utilisateur."
      },
      {
        concept: "Autorisation (authz)",
        image: "Ton badge d'employé ouvre certaines portes, pas toutes.",
        insight: "« Maintenant que je sais qui tu es, voici ce que tu as le droit de faire. » Être identifié ≠ avoir tous les droits.",
        tradeOff: "Des droits fins = plus de sécurité mais plus de règles à gérer."
      },
      {
        concept: "Gestion des secrets",
        image: "Tu ne notes pas ton code de carte bleue sur un post-it sur l'écran.",
        insight: "Les mots de passe, clés et jetons se rangent dans un coffre dédié (gestionnaire de secrets), jamais dans le code.",
        tradeOff: "Un peu plus de mise en place, mais c'est la base non négociable — un secret dans le code finit toujours par fuiter."
      },
      {
        concept: "CI/CD (intégration et livraison continues)",
        image: "Une chaîne de montage automobile. Le code passe sur un tapis roulant : on le teste automatiquement, on l'assemble, on le met en production sans tout faire à la main.",
        insight: "Chaque changement est vérifié par des robots avant d'atteindre les utilisateurs.",
        tradeOff: "Installer la chaîne demande un investissement initial, mais ensuite on livre vite, souvent, et avec moins d'erreurs humaines."
      },
      {
        concept: "Infrastructure as code (IaC)",
        image: "Une notice de montage IKEA. Au lieu de visser les serveurs « à la main », tu écris la recette dans des fichiers.",
        insight: "On peut reconstruire à l'identique l'infrastructure entière en rejouant la notice.",
        tradeOff: "Plus de rigueur au départ, mais fini les serveurs « configurés on ne sait plus comment » impossibles à reproduire."
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
        image: "Demander « quelle est la meilleure voiture ? » n'a pas de sens sans savoir si c'est pour déménager, faire du circuit ou se garer en ville.",
        insight: "En architecture, il n'y a pas de gagnant universel, seulement le bon choix pour un contexte donné.",
        tradeOff: "Méfie-toi de quiconque a la même réponse à toutes les questions."
      },
      {
        concept: "Dette technique (technical debt)",
        image: "La carte de crédit. Payer en raccourci aujourd'hui te fait avancer vite, mais tu rembourses plus tard, avec intérêts (du temps et des bugs).",
        insight: "Parfois la dette est un choix malin (livrer vite), à condition de la rembourser.",
        tradeOff: "Un peu de dette accélère ; trop de dette non remboursée finit par tout paralyser."
      },
      {
        concept: "Réversibilité d'une décision",
        image: "Certaines portes se rouvrent (tu peux revenir en arrière), d'autres claquent dans ton dos.",
        insight: "Une décision facile à défaire mérite peu de débat ; une décision irréversible mérite qu'on y réfléchisse longuement.",
        tradeOff: "Prends vite les décisions réversibles, prends ton temps sur les irréversibles."
      },
      {
        concept: "ADR (carnet de décisions d'architecture)",
        image: "Le carnet de bord d'un capitaine. Pour chaque grande décision : le contexte, le choix retenu, et surtout les options écartées et pourquoi.",
        insight: "Six mois plus tard, quand quelqu'un demande « pourquoi on a fait comme ça ? », la réponse est écrite.",
        tradeOff: "Quelques minutes d'écriture qui sauvent des heures de débats répétés."
      },
      {
        concept: "Grille d'arbitrage concrète",
        image: "Le comparateur d'assurances — tu ne regardes pas qu'une colonne, tu pèses l'ensemble selon ce qui compte pour toi maintenant.",
        insight: "Pour trancher : impact client, coût, délai, risque, réversibilité, dette créée, compétences de l'équipe.",
        tradeOff: "Aucun critère seul ne suffit — c'est la pondération qui compte."
      }
    ],
    takeaway: "L'architecte ne cherche pas LA bonne réponse, il rend explicites les compromis et trace le pourquoi. La meilleure architecture est celle qui sert ton contexte — et que ton équipe sait faire vivre."
  }
];
