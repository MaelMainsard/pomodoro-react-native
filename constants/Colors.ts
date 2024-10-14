const tintColorLight = '#007FA8'; // Bleu vif
const tintColorDark = '#FFD700'; // Jaune vif pour un bon contraste

export const Colors = {
  light: {
    text: '#FFFFFF',
    background: '#ffb0c0',
    primary: '#8c4a5b',
    tint: tintColorLight,
    icon: '#5A6A73', // Gris plus visible pour les icônes
    tabIconDefault: '#5A6A73',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#FFFFFF', // Texte blanc pur pour un contraste maximal
    background: '#000000', // Fond noir pur pour améliorer la lisibilité
    tint: tintColorDark,
    primary: '#8c4a5b',
    icon: '#FFD700', // Icônes jaune vif pour une meilleure visibilité
    tabIconDefault: '#FFD700',
    tabIconSelected: tintColorDark,
  },
};