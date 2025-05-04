export const lightTheme = {
  bg: "#FFFFFF",
  bgLight: "#FFFFFF",
  primary: "#131118",
  secondary: "#5B86E5",
  disabled: "#b1b2b3",
  menubar: "#191c29",
  navbar: "#242B3F",
  arrow: "#AFAFB5",
  menu_primary_text: "#F2F3F4",
  menu_secondary_text: "#b1b2b3",
  table_header: "#242445",
  text_primary: "#404040",
  text_secondary: "#4d4c4c",
  card: "#FFFFFF",
  black: "#000000",
  white: "#FFFFFF",
  shadow: "#00000020",
  green: "#00ff6a",
  yellow: "#e8ba00",
  red: "#ef5350",
  orange: "#F7AD63",
  popup: "#242B3F",
  popup_text_primary: "#F2F3F4",
  popup_text_secondary: "#b1b2b3",
  output_node: "#49516b",
  contactUs:"#f0e8f3"
};

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        "theme-bg": lightTheme.bg,
        "theme-bg-light": lightTheme.bgLight,
        "theme-primary": lightTheme.primary,
        "theme-secondary": lightTheme.secondary,
        "theme-disabled": lightTheme.disabled,
        "theme-menubar": lightTheme.menubar,
        "theme-navbar": lightTheme.navbar,
        "theme-arrow": lightTheme.arrow,
        "theme-menu-primary-text": lightTheme.menu_primary_text,
        "theme-menu-secondary-text": lightTheme.menu_secondary_text,
        "theme-table-header": lightTheme.table_header,
        "theme-text-primary": lightTheme.text_primary,
        "theme-text-secondary": lightTheme.text_secondary,
        "theme-card": lightTheme.card,
        "theme-black": lightTheme.black,
        "theme-white": lightTheme.white,
        "theme-shadow": lightTheme.shadow,
        "theme-green": lightTheme.green,
        "theme-yellow": lightTheme.yellow,
        "theme-red": lightTheme.red,
        "theme-orange": lightTheme.orange,
        "theme-popup": lightTheme.popup,
        "theme-popup-text-primary": lightTheme.popup_text_primary,
        "theme-popup-text-secondary": lightTheme.popup_text_secondary,
        "theme-output-node": lightTheme.output_node,
        "theme-contactUs": lightTheme.contactUs,
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none', /* For IE and Edge */
          'scrollbar-width': 'none',   /* For Firefox */
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          display: 'none', /* For Chrome, Safari, and Edge */
        },
      });
    },
  ],
};
