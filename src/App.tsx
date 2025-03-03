import { useEffect, useState } from "react"
import { Content } from "./types"
import Landing from "./components/Landing"
import NewBuildConfirmation from "./components/NewBuildConfirmation"
import PurchaseEstimate1 from "./components/PurchaseEstimate1"
import PurchaseEstimate2 from "./components/PurchaseEstimate2"
import PurchaseEstimate3 from "./components/PurchaseEstimate3"
import { Box, Button, createTheme, Dialog, LinearProgress, ThemeProvider, Typography } from "@mui/material"

const App = () => {

  // Theme customization 
  const theme = createTheme({
    defaultColorScheme: "light",
    palette: {
      primary: { main: "#ffc107" },
      secondary: {main: "#f4f4f4"}
    },
    typography: {
      fontSize: 13,
      fontFamily: "poppins"
    }
  })

  // current UI component 
  const [content, setContent] = useState<Content>()

  // track visibility of the modal 
  const [open, setOpen] = useState(false)

  // track the loading state for rendering the modal content 
  const [loading, setLoading] = useState(true)

  // move to the new build confirmation screen 
  const onOptionSelect=(key: string)=>{
    console.log(key)
    setContent(contents[1])
  }

  // move the first section of purchase estimates 
  const newBuildAction=(response: "yes" | "no")=>{
    console.log(response)
    setContent(contents[2])
  }

  // UI components for the modal 
  const contents: Content[] = [
    {
      title: "landing",
      body: <Landing onOptionSelect={onOptionSelect}/>
    },
    {
      title: "new build confirmation",
      body: <NewBuildConfirmation newBuildAction={newBuildAction}/>
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

  // simulate delay and set the first UI component for the modal 
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

              // loading state container 
              <Box  display={"flex"} flexDirection={"column"} padding={"20px 0px 0px 0px"} alignItems={"center"} justifyContent={"space-between"}>
                <Typography variant="h4">Getting things ready</Typography>
                <Typography variant="caption">please wait as we collect the neccessary resources...</Typography>
                <br />
                <LinearProgress style={{ width: "100%" }} />
              </Box>
              :

              // modal content 
              content?.body
          }
        </Dialog>

      </Box>
    </ThemeProvider>
  )
}

export default App