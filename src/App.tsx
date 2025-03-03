import { useEffect, useState } from "react"
import { Content } from "./types"
import Landing from "./components/Landing"
import NewBuildConfirmation from "./components/NewBuildConfirmation"
import PurchaseEstimate1 from "./components/PurchaseEstimate1"
import PurchaseEstimate2 from "./components/PurchaseEstimate2"
import PurchaseEstimate3 from "./components/PurchaseEstimate3"
import { Box, Button, createTheme, Dialog, LinearProgress, ThemeProvider, Typography } from "@mui/material"

const App = () => {

  const theme = createTheme({
    defaultColorScheme: "light",
    palette: {
      primary: { main: "#ffc107" },
    },
    typography: {
      fontSize: 13,
      fontFamily: "poppins"
    }
  })

  const [content, setContent] = useState<Content>()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
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
    setContent(contents[0])
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }, [])




  return (
    <ThemeProvider theme={theme}>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100vh"} width={"100vw"}>

        {/* trigger for getting a quote  */}
        <Button onClick={() => setOpen(true)} variant="contained">Get a quote</Button>

        {/* modal for displaying the forms  */}
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
          {
            loading
              ?
              <Box  display={"flex"} flexDirection={"column"} padding={"20px 0px 0px 0px"} alignItems={"center"} justifyContent={"space-between"}>
                <Typography variant="h4">Getting things ready</Typography>
                <Typography variant="caption">please wait as we collect the neccessary resources...</Typography>
                <br />
                <LinearProgress style={{ width: "100%" }} />
              </Box>
              :
              content?.body
          }
        </Dialog>

      </Box>
    </ThemeProvider>
  )
}

export default App