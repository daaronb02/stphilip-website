export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  textOnPrimary: string;
  heroOverlay: string;
}

export interface LiturgicalTheme {
  slug: string;
  displayName: string;
  colors: ThemeColors;
}

export const themes: Record<string, LiturgicalTheme> = {
  penitential: {
    slug: 'penitential',
    displayName: 'Penitential Season',
    colors: {
      primary: '#6b1d2a',
      primaryLight: '#8a3040',
      primaryDark: '#4a1019',
      accent: '#c4454d',
      textOnPrimary: '#ffffff',
      heroOverlay: 'rgba(107, 29, 42, 0.73)',
    },
  },
  pascha: {
    slug: 'pascha',
    displayName: 'Pascha',
    colors: {
      primary: '#c8a84e',
      primaryLight: '#dbc272',
      primaryDark: '#a88a30',
      accent: '#ffffff',
      textOnPrimary: '#1a1a1a',
      heroOverlay: 'rgba(200, 168, 78, 0.45)',
    },
  },
  christmas: {
    slug: 'christmas',
    displayName: 'Christmas',
    colors: {
      primary: '#c8a84e',
      primaryLight: '#dbc272',
      primaryDark: '#a88a30',
      accent: '#1e3a5f',
      textOnPrimary: '#1e3a5f',
      heroOverlay: 'rgba(30, 58, 95, 0.50)',
    },
  },
  theophany: {
    slug: 'theophany',
    displayName: 'Theophany',
    colors: {
      primary: '#8b9da8',
      primaryLight: '#a8b8c2',
      primaryDark: '#6b808d',
      accent: '#e8e4df',
      textOnPrimary: '#1a1a1a',
      heroOverlay: 'rgba(139, 157, 168, 0.45)',
    },
  },
  pentecost: {
    slug: 'pentecost',
    displayName: 'Pentecost',
    colors: {
      primary: '#2d5a3a',
      primaryLight: '#3d7a4f',
      primaryDark: '#1e3d27',
      accent: '#7ab88a',
      textOnPrimary: '#ffffff',
      heroOverlay: 'rgba(45, 90, 58, 0.50)',
    },
  },
  marian: {
    slug: 'marian',
    displayName: 'Feast of the Theotokos',
    colors: {
      primary: '#1a1cb0',
      primaryLight: '#4f51ed',
      primaryDark:  '#1e3a5f',
      accent: '#e8e4df',
      textOnPrimary: '#ffffff',
      heroOverlay: 'rgba(37, 39, 232, 0.45)',
    },
  },
  default: {
    slug: 'default',
    displayName: 'Ordinary Time',
    colors: {
      primary: '#c8a84e',
      primaryLight: '#dbc272',
      primaryDark: '#a88a30',
      accent: '#ffffff',
      textOnPrimary: '#1a1a1a',
      heroOverlay: 'rgba(107, 29, 42, 0.73)',
    },
  },
};

export function getTheme(slug: string): LiturgicalTheme {
  return themes[slug] ?? themes.default;
}
