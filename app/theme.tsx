import { orange } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import "@fontsource/inter";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const theme = createTheme({
  typography: {
    fontFamily: ['Aeroport', 'Inter', 'Roboto', 'sans-serif'].join(","),
    body1: {
      fontFamily: 'Inter',
    },
    body2: {
      fontFamily: 'Inter',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Aeroport';
          src: local('Aeroport'), local('Aeroport'), url(/fonts/Aeroport.otf) format('otf');
        }
      `,
    },
  },
  status: {
    danger: orange[500],
  },
});