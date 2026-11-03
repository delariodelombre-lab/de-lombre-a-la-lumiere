// Catalogue officiel — De L’Ombre à La Lumière
// Les deux premiers guides réels sont présentés dans la boutique.
// Le paiement et la livraison des PDF restent manuels.

const PRODUCTS = [
  {
    id: "guide-transformation",
    slug: "de-lombre-a-la-lumiere-guide-1",
    title: "De L’Ombre à La Lumière — La prise de conscience",
    shortTitle: "Guide 1 — La prise de conscience",

    description: "Un parcours de connaissance de soi pour reconnaître ses habitudes, examiner ses peurs, comprendre son histoire et commencer une transformation intérieure plus consciente.",

    longDescription: `GUIDE 1 — LA PRISE DE CONSCIENCE

Le premier pas pour mieux comprendre sa vie et retrouver sa direction.

Avez-vous parfois l'impression de répéter les mêmes erreurs, de rencontrer les mêmes difficultés ou de fournir des efforts sans savoir clairement ce qui vous empêche d'avancer ?

Avant de chercher à transformer sa vie, il est important d'apprendre à mieux la comprendre.

Le guide « La prise de conscience » vous invite à prendre du recul, à observer votre monde intérieur et à examiner les habitudes, les pensées, les peurs et les croyances qui peuvent influencer vos décisions.

Ce premier volume constitue une base de réflexion pour commencer un travail personnel progressif, lucide et responsable.

CE QUE VOUS ALLEZ EXPLORER

• Comprendre vos pensées et vos émotions.
• Identifier certaines habitudes qui freinent votre progression.
• Distinguer les faits de vos interprétations.
• Examiner vos peurs et les croyances qui influencent vos choix.
• Apprendre à prendre vos responsabilités sans vous condamner.
• Clarifier vos valeurs et vos priorités.
• Découvrir une approche spirituelle fondée sur le discernement.
• Transformer progressivement vos prises de conscience en actions concrètes.

UN PARCOURS STRUCTURÉ EN 4 PARTIES

PARTIE 1 — LE RÉVEIL PSYCHOLOGIQUE

Apprenez à regarder votre situation avec honnêteté et à examiner les pensées qui orientent vos décisions.

PARTIE 2 — LA RENCONTRE AVEC SOI-MÊME

Explorez vos peurs, vos contradictions, votre passé et les valeurs qui donnent une direction à votre vie.

PARTIE 3 — L'OUVERTURE SPIRITUELLE

Approfondissez votre réflexion sur le silence, la conscience, les racines et le sens de votre vie intérieure.

PARTIE 4 — LA DISCIPLINE DE TRANSFORMATION

Découvrez comment passer de la réflexion à l'action et construire des habitudes plus cohérentes avec vos objectifs.

DES EXERCICES POUR PASSER À LA PRATIQUE

Ce guide ne se limite pas à des explications. Il vous propose des exercices de réflexion écrite et un programme progressif de 14 jours pour observer votre évolution.

Vous disposerez notamment :
• D'exercices pour mieux vous connaître.
• De questions pour examiner vos pensées et vos peurs.
• D'un carnet de transformation.
• D'un bilan personnel pour faire le point sur votre parcours.

À QUI S'ADRESSE CE GUIDE ?

À toute personne qui souhaite mieux se comprendre, prendre du recul sur sa situation, examiner ses habitudes et commencer une démarche personnelle de changement.

Aucune connaissance particulière en psychologie ou en spiritualité n'est nécessaire.

FORMAT ET PRIX

Format : guide numérique PDF.
Prix : 4 000 FCFA.

Après votre demande de commande, les instructions de paiement vous seront communiquées par e-mail. Le guide sera envoyé à votre adresse e-mail après vérification effective du paiement.

VOTRE CHEMIN COMMENCE PAR LA CONSCIENCE

Vous n'avez pas besoin de tout changer en un jour. Vous pouvez commencer par observer, comprendre et choisir un premier pas réaliste.

La prise de conscience ne transforme pas tout instantanément. Elle vous donne une meilleure compréhension de votre point de départ et vous aide à choisir la suite de votre chemin.

De L’Ombre à La Lumière — Une collection pour apprendre à se connaître, cultiver sa conscience et transformer progressivement sa vie intérieure.`,

    price: 4000,
    category: "transformation",
    coverEmoji: "🌅",
    featured: true,
    active: true
  },

  {
    id: "guide-preparation-mentale-spirituelle",
    slug: "preparation-mentale-et-spirituelle-guide-2",
    title: "La Préparation mentale et spirituelle",
    shortTitle: "Guide 2 — La préparation mentale et spirituelle",

    description: "Un guide pour mieux comprendre ses pensées et ses émotions, développer des habitudes utiles, renforcer sa discipline et nourrir une démarche spirituelle cohérente avec ses valeurs.",

    longDescription: `Le deuxième guide accompagne la suite du parcours : préparer son esprit, clarifier ses intentions et avancer avec plus de constance.

Tu y trouveras notamment :
• L’état d’esprit et le dialogue intérieur
• La maîtrise des pensées et la protection de l’attention
• La discipline, les habitudes et la persévérance
• Les peurs, les émotions et les blocages intérieurs
• L’équilibre du corps, de l’esprit et de la dimension spirituelle
• Des exercices et un plan personnel pour les sept prochains jours

Format prévu : livre numérique PDF.
Guide 2 de la collection De L’Ombre à La Lumière.`,

    price: 4000,
    category: "spiritualite",
    coverEmoji: "✨",
    featured: true,
    active: true
  }
];

const CATEGORIES = [
  { id: "all", label: "Les deux guides" },
  { id: "transformation", label: "Prise de conscience" },
  { id: "spiritualite", label: "Préparation mentale et spirituelle" }
];

function formatPrice(price) {
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
}

function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug);
}