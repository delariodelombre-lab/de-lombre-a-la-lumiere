// Catalogue officiel — De L’Ombre à La Lumière
// Les deux premiers guides réels sont présentés dans la boutique.
// Important : le paiement réel et la livraison sécurisée des PDF ne sont pas encore activés.

const PRODUCTS = [
  {
    id: "guide-transformation",
    slug: "de-lombre-a-la-lumiere-guide-1",
    title: "De L’Ombre à La Lumière — La prise de conscience",
    shortTitle: "Guide 1 — La prise de conscience",
    description: "Un parcours de connaissance de soi pour reconnaître ses habitudes, examiner ses peurs, comprendre son histoire et commencer une transformation intérieure plus consciente.",
    longDescription: `Le premier guide de la collection ouvre le chemin de la prise de conscience et de la connaissance de soi.

Tu y trouveras notamment :
• Des réflexions pour regarder sa vie avec honnêteté
• Des pistes pour examiner ses pensées et ses peurs
• Un travail sur le passé, les habitudes et les choix
• Une exploration de la spiritualité comme recherche de sens
• Des exercices pratiques pour passer de la prise de conscience à l’action

Format prévu : livre numérique PDF.
Guide 1 de la collection De L’Ombre à La Lumière.`,
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
