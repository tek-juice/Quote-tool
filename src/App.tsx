import { Route, Routes } from "react-router"
import Index from "./routes/Index"
import { createTheme, ThemeProvider } from "@mui/material"

const App = () => {

   // Theme customization 
    const theme = createTheme({

      components: {
        MuiToggleButtonGroup: {
          styleOverrides: {
            root: {
              border: "none", // Remove borders from the group
            },
          },
        },
        MuiToggleButton: {
          styleOverrides: {
            root: {
              border: "none", // Remove borders from the button
              backgroundColor: "#f4f4f4", // Transparent background initially
              "&.Mui-selected": {
                backgroundColor: "#ffc107", // Use the primary color for the fill (default button color)
                color: "#fff", // Text color when selected (white)
              },
              "&:hover": {
                color: "#333"
              },
            },
          },
        },
        MuiStepIcon: {
          styleOverrides: {
            root: {
              fontSize: "1.7rem", // Increase step icon size
            },
          },
        },
        MuiStepConnector: {
          styleOverrides: {
            line: {
              borderTopWidth: "4px", // Make connector line thicker
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
        fontSize: 11.5,
        fontFamily: "poppins"
      }
    })

  return (
    <ThemeProvider theme={theme}>
    <Routes>
        <Route path="/*" Component={Index}/>
    </Routes>
    </ThemeProvider>
  )
}

export default App