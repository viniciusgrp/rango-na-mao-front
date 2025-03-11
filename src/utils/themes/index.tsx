import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#1371ff",
    },
    secondary: {
      main: "#da5000",
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
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            color: "#fff",
            backgroundColor: "#1371ff",
            "&:hover": {
              backgroundColor: "#3888ff",
            },
          },
        },
        {
          props: { variant: "outlined", color: "primary" },
          style: {
            color: "#1371ff",
            backgroundColor: "#ffff",
            border: "1px solid #1371ff",
            "&:hover": {
              backgroundColor: "#efefef",
            },
          },
        },
      ],
    },
  },
});

export default lightTheme;