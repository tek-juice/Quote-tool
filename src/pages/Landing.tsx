import { Box, Button, Typography } from "@mui/material";
import { Option } from "../types";
import { useNavigate } from "react-router";
import Grid from "@mui/material/Grid2";
import Item from "../components/common/GridItem";
import { useState } from "react";

// icons 
import BuyingIcon from "../assets/buying.svg";
import SellingIcon from "../assets/selling.svg";
import BuyingAndSellingIcon from "../assets/buying_and_selling.svg";
import RemortgageIcon from "../assets/remortgage.svg";

const Landing = () => {
  const options: Option[] = [
    {
      label: "Buying a property",
      route: "/buying",
      icon: BuyingIcon,
    },
    {
      label: "Selling a property",
      route: "/selling",
      icon: SellingIcon,
    },
    {
      label: "Remortgage",
      route: "remortgage",
      icon: RemortgageIcon,
    },
    {
      label: "Buy and sell a property",
      route: "buying_and_selling",
      icon: BuyingAndSellingIcon,
    },
  ];

  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);

  return (
    <Box
      display={"flex"}
      className="shadow rounded"
      justifyContent={"space-between"}
      sx={{ px: 6, py: 8 }}
      flexWrap={"wrap"}
    >


      <Box sx={{ flexGrow: 1 }}>
      <Typography fontWeight={600} variant="h5" textAlign={"center"}>Get a personalised estimate in just a few clicks</Typography>
      <hr />
        <Grid container spacing={2}>
          {options?.map((option, index) => (
            <Grid size={6} key={index}>
              <Item
                className="border-primary border-grey"
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
                elevation={0}
              >
                <div className="option-img">
                  <img src={option?.icon?.toString()} height={50} />
                </div>

                {/* option label  */}
                <Typography
                  fontWeight={600}
                  sx={{ my: 1, textTransform: "uppercase" }}
                >
                  {option?.label}
                </Typography>

                {/* option button with hover effect */}
                <Button
                  className="btn-primary small"
                  color={hoveredButton === index ? "primary" : "inherit"}
                  onClick={() => navigate(option?.route)}
                  disableElevation
                  variant={hoveredButton === index ? "contained" : "outlined"}
                  onMouseEnter={() => setHoveredButton(index)}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <Typography color={"textPrimary"}>Get a quote</Typography>
                </Button>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Landing;
