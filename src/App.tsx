import { Route, Routes } from "react-router"
import Index from "./routes/Index"
import { createTheme, ThemeProvider } from "@mui/material"

const App = () => {

  // Theme customization 
  const theme = createTheme({
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
        <Route path="/*" Component={Index} />
      </Routes>
    </ThemeProvider>
  )
}

export default App