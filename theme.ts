import { Theme } from "theme-ui"

export const theme: Theme = {
  colors: {
    text: "#15212B",
    textLight: "#FFFFFF",
    textPrimary: "#009ace",
    background: "#ffffff",
    lightBackground: "#FFFFFF",
    grayBackground: "#F2F5F7",
    primary: "#009ace",
    secondary: "#15212B",
    light: "#ffffff",
    dark: "#15212B",
    gray: "rgba(21, 33, 43,.1)",
    lightGrey: "#F7F7F9",
    danger: "#C81929",
  },
  fonts: {
    body: 'Inter, Roboto, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
    heading:
      'Inter, Roboto, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
  },
  space: [0, 4, 8, 16, 32, 48, 64, 96, 128, 148, 192, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96, 128, 148, 164, 196, 228, 256],
  fontWeights: {
    body: 400,
    heading: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  sizes: {
    container: 1280,
  },
  radii: {
    none: "0",
    xs: ".25rem",
    sm: ".5rem",
    md: "1rem",
    lg: "2rem",
    full: "9999px",
  },
  shadows: {
    none: "none",
    default:
      "0 20px 40px -10px rgba(50,50,93,0.15),0 10px 30px -20px rgba(0,0,0,0.15)",
  },
  text: {
    default: {
      lineHeight: "body",
    },
    p: {
      fontSize: [1],
      lineHeight: "1.5",
      fontFamily: "body",
      fontWeight: "body",
      letterSpacing: "2px",
    },
    heading: {
      fontSize: [5],
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      color: "primary",
    },
    h1: {
      fontSize: [6, 7],
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      color: "primary",
      mb: 3,
    },
    h2: {
      fontSize: [5, 6],
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      color: "primary",
      mb: 3,
      mt: 4,
    },
    h3: {
      fontSize: [5],
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      color: "primary",
      mb: 3,
      mt: 4,
    },
    h4: {
      fontSize: 4,
      fontFamily: "heading",
      fontWeight: "bold",
      color: "primary",
      mb: 2,
      mt: 4,
    },
    h5: {
      fontSize: 4,
      color: "dark",
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      mb: 2,
      mt: 4,
    },
    h6: {
      fontSize: 3,
      color: "dark",
      fontFamily: "heading",
      fontWeight: "body",
      lineHeight: "heading",
      mb: 2,
      mt: 4,
    },
    sectionTitleBlack: {
      h2: {
        margin: "inherit",
        fontFamily: "heading",
        fontSize: [6],
        letterSpacing: "-.5px",
        lineHeight: "1.12",
        em: {
          fontStyle: "normal",
          color: "dark",
        },
      },
      span: {
        display: "block",
      },
      p: {
        margin: "inherit",
        fontSize: [1],
        letterSpacing: "2px",
        lineHeight: "1.4",
        em: {
          fontStyle: "normal",
          color: "primary",
        },
      },
      ul: {
        p: 0,
        listStyleType: "none",
        margin: "inherit",
        fontSize: [1],
        letterSpacing: "2px",
        lineHeight: "1.7",
        em: {
          fontStyle: "normal",
          color: "dark",
        },
        ml: [1],
        li: {
          color: "light",
          position: "relative",
          "span:before": {
            content: "'//'",
            color: "dark",
            ml: [1],
            position: "absolute",
            left: [-3, -4, -4, -4],
          },
        },
      },
    },
    sectionTitle: {
      h2: {
        margin: "inherit",
        fontFamily: "heading",
        fontSize: [6],
        letterSpacing: "-.5px",
        lineHeight: "1.12",
        em: {
          fontStyle: "normal",
          color: "primary",
        },
      },
      a: {
        color: "primary",
        "&:hover": {
          textDecoration: "underline",
        },
      },
      span: {
        display: "block",
      },
      p: {
        fontFamily: "body",
        margin: "inherit",
        fontSize: [1],
        letterSpacing: "2px",
        lineHeight: "1.4",
        em: {
          fontStyle: "normal",
          color: "primary",
        },
      },
      ul: {
        p: 0,
        listStyleType: "none",
        margin: "inherit",
        fontSize: [1],
        letterSpacing: "2px",
        lineHeight: "1.7",
        em: {
          fontStyle: "normal",
          color: "primary",
        },
        ml: [1],
        li: {
          position: "relative",
          span: {
            ml: [3, 3, 3, 3],
          },
          "span:before": {
            content: "'//'",
            color: "primary",
            position: "absolute",
            left: [-2, -2, -2, -2],
          },
        },
      },
    },
    caption: {
      fontSize: 1,
      color: "primary",
      letterSpacing: "2.5px",
      textTransform: "uppercase",
      fontWeight: "bold",
      "&:before": {
        content: "'// '",
      },
      "&:after": {
        content: "' //'",
      },
      black: {
        fontSize: 1,
        color: "dark",
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        fontWeight: "bold",
        "&:before": {
          content: "'// '",
        },
        "&:after": {
          content: "' //'",
        },
      },
    },
    article: {
      fontSize: 3,
      lineHeight: 1.5,
    },
  },
  layout: {
    container: {
      padding: 4,
    },
    xs: {
      maxWidth: "576px",
    },
    sm: {
      maxWidth: "576px",
    },
    md: {
      maxWidth: "768px",
    },
    lg: {
      maxWidth: "992px",
    },
    xl: {
      maxWidth: "1200px",
    },
    xxl: {
      maxWidth: "1400px",
    },
    fw: {
      maxWidth: "100%",
    },
    header: {
      maxWidth: "100%",
    },
  },
  buttons: {
    primary: {
      color: "white",
      bg: "primary",
      "&:hover": {
        bg: "text",
      },
    },
    disabled: {
      bg: "#ddd",
    },
    icon: {
      backgroundColor: "transparent",
      svg: {
        stroke: "text",
      },
    },
  },
  links: {
    nav: {
      paddingX: 3,
      paddingY: 3,
      backgroundColor: "primary",

      "&.active": {
        color: "primary",
      },
    },
    tab: {
      textDecoration: "none",
      mr: 3,
      color: "text",
      "&.active": {
        color: "primary",
        fontWeight: "bold",
      },
    },
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "muted",
    },
  },
  forms: {
    label: {
      fontSize: 1,
      fontWeight: "bold",
      mb: 2,
    },
    input: {
      mb: 3,
    },
  },
  styles: {
    root: {
      overflow: "auto",
      body: {
        overflow: "auto",
        backgroundColor: "#fcfcfc",
      },
      "a.active": {
        color: "primary",
      },
      fontFamily: "body",
      fontWeight: "body",
      a: {
        color: "inherit",
        "&:hover": {
          textDecoration: "none",
        },
      },
      "--swiper-theme-color": "#00a889",
      ".swiper-container": { pb: 5 },
    },
  },
}
