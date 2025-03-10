import { createTheme } from "@mui/material";

// Define common values to avoid duplication
const colors = {
  gray: "#D0D2D7",
  primaryColor: "#081025",
  hoverColor: "#ffc107", // For hover on 'primary-hover' class
  activeColor: "red",
  completedColor: "blue",
  disabledColor: "#D0D2D7",
  toggleButtonColor: "#DBDDE180",
};

const theme = createTheme({
  components: {
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontSize: "1rem",
          color: colors.gray,
          textTransform: "capitalize",
        },
        root: {
          "&.Mui-active .MuiStepLabel-label": { color: colors.activeColor },
          "&.Mui-completed .MuiStepLabel-label": { color: colors.completedColor },
          "&.Mui-disabled .MuiStepLabel-label": { color: colors.disabledColor },
          "& .MuiStepLabel-label.Mui-active": { fontWeight: 600 },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": { color: colors.primaryColor },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.primaryColor,
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused": { backgroundColor: `${colors.primaryColor}20` }, // Adding opacity
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused:before": { borderBottomColor: colors.primaryColor },
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        line: {
          backgroundColor: colors.gray,
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
          
          "&.small": {
            transform: "scale(1)",
            width: "max-content",
            color: colors.primaryColor,
          },
    
          // Hover effect for 'primary-hover' class
          "&.primary-hover:hover": {
            backgroundColor: colors.hoverColor, // Use the hover color defined
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          height: 35,
          border: "none",
          backgroundColor: colors.toggleButtonColor,
          "&.Mui-selected": {
            backgroundColor: colors.hoverColor,
            color: colors.primaryColor,
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        text: { fill: "#fff", backgroundColor: "rgba(0,0,0,0)" },
        root: {
          fontSize: "1.7rem",
          color: colors.gray,
          borderRadius: "50%",
          opacity: 1,
        },
      },
    },
  },
  defaultColorScheme: "light",
  palette: {
    primary: { main: colors.hoverColor }, // Primary color defined by 'hoverColor'
    secondary: { main: "#f4f4f4" },
  },
  typography: {
    fontSize: 12.5,
    fontFamily: "Poppins",
    allVariants: { color: colors.primaryColor },
  },
});

export default theme;
