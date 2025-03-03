import { useEffect, useState } from "react"
import { Content } from "./types"
import Landing from "./components/Landing"
import NewBuildConfirmation from "./components/NewBuildConfirmation"
import PurchaseEstimate1 from "./components/PurchaseEstimate1"
import PurchaseEstimate2 from "./components/PurchaseEstimate2"
import PurchaseEstimate3 from "./components/PurchaseEstimate3"
import { Box, Button, createTheme, ThemeProvider } from "@mui/material"

const App = () => {

  const theme = createTheme({
    defaultColorScheme: "light",
    palette: {
      primary: {main: "#ffc107"}
    }
  })

  const [content, setContent] = useState<Content>()
  const contents: Content[] = [
    {
      title: "landing",
      body: <Landing />
    },
    {
      title: "new build confirmation",
      body: <NewBuildConfirmation />
    },
    {
      title: "purchase estimate 1",
      body: <PurchaseEstimate1 />
    }, {
      title: "purchase estimate 2",
      body: <PurchaseEstimate2 />
    }, {
      title: "purchase estimate 3",
      body: <PurchaseEstimate3 />
    }
  ]

  useEffect(() => {
    setContent(contents[1])
    console.log(content)
  }, [])


  return (
    <ThemeProvider theme={theme}>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100vh"} width={"100vw"}>
        
      {/* trigger for getting a quote  */}
      <Button variant="contained">Get a quote</Button>

      </Box>
    </ThemeProvider>
  )
}

export default App