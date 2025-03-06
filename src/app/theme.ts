import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#3674B5",
    },
    secondary: {
      main: "#D1F8EF",
    },
  },
  typography: {
    fontFamily: ["Poppins", "Poppins Fallback"].join(","),
  },
});
