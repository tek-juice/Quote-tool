import { Route, Routes } from "react-router"
import Index from "./routes/Index"
import {ThemeProvider } from "@mui/material"
import theme from "./theme"

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/*" Component={Index} />
      </Routes>
    </ThemeProvider>
  )
}

export default App