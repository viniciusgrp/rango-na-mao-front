import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#FF5733",
    },
    secondary: {
      main: '#da5000',
    },
    success: {
        main: "#33FF57",
    },
    error: {
        main: "#ff0000",
    },
    warning: {
        main: "#e5ff00",
    },
    info: {
        main: "#00b3ff",
    },
  },
});

export default lightTheme;