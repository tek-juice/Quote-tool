import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontSize: "1rem",
          color: "#D0D2D7",
          textTransform: "capitalize",
        },
        root: {
          "&.Mui-active .MuiStepLabel-label": { color: "red" },
          "&.Mui-completed .MuiStepLabel-label": { color: "blue" },
          "&.Mui-disabled .MuiStepLabel-label": { color: "#D0D2D7" },
          "& .MuiStepLabel-label.Mui-active": { fontWeight: 600 },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": { color: "#081025" },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#081025",
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused": { backgroundColor: "#08102520" },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused:before": { borderBottomColor: "#081025" },
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        line: {
          backgroundColor: "#D0D2D7",
          borderTopWidth: 0,
          minHeight: 1.5,
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: { border: "none" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          width: 150,
          transform: "scale(1.2)",
          "&:hover": {
            backgroundColor: "#ffc107",
            boxShadow: "none",
          },
          "&.small": {
            transform: "scale(1)",
            width: "max-content",
            color: "#081025",
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          height: 35,
          border: "none",
          backgroundColor: "#DBDDE180",
          "&.Mui-selected": {
            backgroundColor: "#ffc107",
            color: "#081025",
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        text: { fill: "#fff", backgroundColor: "rgba(0,0,0,0)" },
        root: {
          fontSize: "1.7rem",
          color: "#ddd",
          borderRadius: "50%",
          opacity: 1,
        },
      },
    },
  },
  defaultColorScheme: "light",
  palette: {
    primary: { main: "#ffc107" },
    secondary: { main: "#f4f4f4" },
  },
  typography: {
    fontSize: 12.5,
    fontFamily: "Poppins",
    allVariants: { color: "#081025" },
  },
});

export default theme;
