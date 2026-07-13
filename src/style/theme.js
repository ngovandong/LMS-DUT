import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#22d3ee",
      main: "#0891b2",
      dark: "#155e75",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#fb7185",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569",
    },
    error: {
      main: "#dc2626",
    },
  },
  typography: {
    fontFamily:
      '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 42,
          paddingInline: 18,
          borderRadius: 12,
          boxShadow: "none",
        },
        contained: {
          boxShadow: "0 8px 20px rgba(8, 145, 178, 0.18)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          boxShadow: "0 24px 80px rgba(15, 23, 42, 0.2)",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;
