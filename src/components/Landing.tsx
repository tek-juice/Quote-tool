import { Box, Button, colors,Paper, Typography } from "@mui/material"

export interface Option {
  label: string
  action?: () => void
}

const Landing = () => {

  const options: Option[] = [
    {
      label: "Buying a property",
    },
    {
      label: "Selling a property"
    },
    {
      label: "Remortgage",
    },
    {
      label: "Buy and sell a property"
    }
  ]

  return (
    <Box display={"flex"}style={{ padding: 20}} flexWrap={"wrap"}>
      {
        options?.map((option, index)=>(
          <Paper elevation={0}  key={index} style={{background: colors?.grey[100], width: "40%", margin: "1%"}} sx={{p: 2, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
          <Typography  sx={{mb:1, textTransform: "uppercase"}}>{option?.label}</Typography>
          <Button disableElevation disabled={index != 0} variant="contained">
            <Typography color={colors.grey[100]}>get a quote</Typography>
          </Button>
        </Paper>
        ))
      }
    </Box>
  )
}

export default Landing