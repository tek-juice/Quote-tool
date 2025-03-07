import { Route, Routes } from "react-router"
import Index from "./routes/Index"
import { createTheme, ThemeProvider } from "@mui/material"

const App = () => {

  // Theme customization 
  const theme = createTheme({

    components: {
      MuiStepLabel: {
        styleOverrides: {
          label: {
            fontSize: "1rem", // Increase label size
            color: "#D0D2D7", // Default label color
            textTransform: "capitalize"
          },
          root: {
            "&.Mui-active .MuiStepLabel-label": {
              color: "#red", // Active label color
            },
            "&.Mui-completed .MuiStepLabel-label": {
              color: "blue", // Completed label color
            },
            "&.Mui-disabled .MuiStepLabel-label": {
              color: "#D0D2D7", // Disabled label color
            },
            "& .MuiStepLabel-label.Mui-active": {
              fontWeight: 600
              // color: "red", // Keep active label color
            },
          },
        },},
      MuiFormLabel: {
        styleOverrides: {
          root: {
            "&.Mui-focused": {
              color: "#081025", // Change label color when focused
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#081025", // Change border color on focus
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            "&.Mui-focused": {
              backgroundColor: "#08102520", // Slightly darken background on focus (optional)
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&.Mui-focused:before": {
              borderBottomColor: "#081025", // For underline variant
            },
          },
        },
      },
      MuiStepConnector: {
        styleOverrides: {
          line: {
            backgroundColor: "#D0D2D7",
            borderTopWidth: 0, // Adjust thickness
            minHeight: 1.5, // Adjust line length
          },
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            border: "none", // Remove borders from the group
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            width: 150,
            transform: "scale(1.2)", // Default scale for all buttons
            "&.small": {
              transform: "scale(1)", // Reset scale for buttons with "small" class
              width: "max-content",
              color: "#081025"
            },
          },
        },
      },

      MuiToggleButton: {
        styleOverrides: {
          root: {
            height: 35,
            border: "none", // Remove borders from the button
            backgroundColor: "#DBDDE180", // Transparent background initially
            "&.Mui-selected": {
              backgroundColor: "#ffc107", // Use the primary color for the fill (default button color)
              color: "#081025", // Text color when selected (white)
            },
          },
        },
      },
      MuiStepIcon: {
        styleOverrides: {
          text: {
            fill: "#fff", // Step number color
            backgroundColor: "rgba(0,0,0,0)"
          },
          // completed: {
          //   color: "#4caf50", // Background for completed steps
          //   backgroundColor: "yellow"
          // },

          root: {
            fontSize: "1.7rem", // Increase step icon size
            color: "#ddd", // Light grey for unselected steps
            borderRadius: "50%", // Keep circular shape
            opacity: 1, // Forces visibility for light colors
          },

        },
      },
    },

    defaultColorScheme: "light",
    palette: {
      primary: { main: "#ffc107" },
      secondary: { main: "#f4f4f4" }
    },
    typography: {
      fontSize: 12,
      fontFamily: "poppins",
      allVariants: {
        color: "#081025"
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/*" Component={Index} />
      </Routes>
    </ThemeProvider>
  )
}

export default App