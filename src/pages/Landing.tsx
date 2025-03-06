import { Box, Button, colors, Typography } from "@mui/material"
import { Option } from "../types"
import { useNavigate } from "react-router"
import Grid from '@mui/material/Grid2';
import Item from "../components/common/GridItem"

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
    <Box display={"flex"} className="shadow rounded" justifyContent={"space-between"} sx={{ px: 6, py: 12 }} flexWrap={"wrap"}>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {
            options?.map((option, index) => <Grid size={6}>
              <Item 
              className="border-primary"
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                background: colors?.grey[100],
              }}
                key={index}
                elevation={0}
              >


                {/* option label  */}
                <Typography fontWeight={600} sx={{ mb: 1, textTransform: "uppercase" }}>{option?.label}</Typography>

                {/* option button  */}
                <Button 
                // disabled={currentOption == index} 
                className="btn-primary"
                color="inherit"
                onClick={() => navigate(option?.route)} 
                disableElevation 
                variant="contained"
                >
                  <Typography color={colors.grey[100]}>get a quote</Typography>
                </Button>
              </Item>
            </Grid>)
          }

        </Grid>
      </Box>

    </Box>
  )
}

export default Landing