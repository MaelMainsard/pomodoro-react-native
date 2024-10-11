const tintColorLight = '#007FA8'; // Bleu vif
const tintColorDark = '#FFD700'; // Jaune vif pour un bon contraste

export const Colors = {
  light: {
    text: '#1A1A1A', // Texte sombre pour une bonne lisibilité
    background: '#F9FAFB', // Blanc cassé doux pour éviter la fatigue visuelle
    tint: tintColorLight,
    icon: '#5A6A73', // Gris plus visible pour les icônes
    tabIconDefault: '#5A6A73',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#FFFFFF', // Texte blanc pur pour un contraste maximal
    background: '#000000', // Fond noir pur pour améliorer la lisibilité
    tint: tintColorDark,
    icon: '#FFD700', // Icônes jaune vif pour une meilleure visibilité
    tabIconDefault: '#FFD700',
    tabIconSelected: tintColorDark,
  },
};