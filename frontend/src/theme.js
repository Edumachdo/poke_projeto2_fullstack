import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4f46e5", // Azul vibrante
    },
    secondary: {
      main: "#7c3aed", // Roxo
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#213547",
      secondary: "#555",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: 14, // Aumenta o tamanho da fonte base para melhor legibilidade
    lineHeight: 1.6, // Ajusta a altura da linha para maior conforto de leitura
    h3: {
      fontWeight: 700,
      color: "#4f46e5",
    },
    h4: {
      fontWeight: 600,
      color: "#4f46e5",
    },
    body1: {
      fontSize: 16, // Define um tamanho de fonte maior para o texto do corpo
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "10px 24px", // Aumenta o padding para botões mais substanciais
          borderRadius: 12, // Aumenta o border-radius para um visual mais suave
          textTransform: "none",
          fontWeight: 600,
          fontSize: "1rem", // Aumenta o tamanho da fonte do botão
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Adiciona uma sombra sutil
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px) scale(1.02)", // Efeito hover mais pronunciado
            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)", // Sombra mais intensa no hover
          },
        },
        outlined: {
          borderColor: "#FFFFFF",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderColor: "#FFFFFF",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
          transition: "all 0.2s ease-in-out",
        },
      },
    },
  },
});

export default theme;
