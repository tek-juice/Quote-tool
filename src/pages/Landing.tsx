import { Box, Button, colors, Paper, Typography } from "@mui/material"
import { Option } from "../types"
import { useNavigate } from "react-router"

const Landing = () => {
  const options: Option[] = [
    {
      label: "Buying a property",
      route: "/buying",
    },
    {
      label: "Selling a property",
      route: "/selling"
    },
    {
      label: "Remortgage",
      route: "remortgage"
    },
    {
      label: "Buy and sell a property",
      route: "buying_and_selling"
    }
  ]

  const navigate = useNavigate()

  return (
      <Box display={"flex"} sx={{background: colors?.grey[50], borderRadius: 3}} style={{ padding: 20 }} flexWrap={"wrap"}>
        {
          options?.map((option, index) => (

            // option container 
            <Paper
              elevation={0}
              key={index}
              style={{
                background: colors?.grey[100],
                width: "40%",
                margin: "1%"
              }}
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
              }}>

              {/* option label  */}
              <Typography sx={{ mb: 1, textTransform: "uppercase" }}>{option?.label}</Typography>

              {/* option button  */}
              <Button onClick={()=>navigate(option?.route)} disableElevation variant="contained">
                <Typography color={colors.grey[100]}>get a quote</Typography>
              </Button>
            </Paper>
          ))
        }
      </Box>
  )
}

export default Landing