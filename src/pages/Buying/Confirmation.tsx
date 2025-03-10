import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useState } from "react";

const NewBuildConfirmation = () => {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState<"yes" | "no" | null>(null);

  return (
    <Box
      className="shadow"
      sx={{
        borderRadius: 1,
      }}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box sx={{ px: 5, py: 3 }}>
        {/* intro section  */}
        <Typography textAlign={"center"} variant="h4">
          Purchase estimate
        </Typography>
        <Typography textAlign={"center"} sx={{ my: 1 }} fontWeight={400} variant="h6">
          Is the property a new build?
        </Typography>

        <Box sx={{ mt: 2 }} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Button
            onClick={() => navigate("/buying/yes")}
            color={hoveredButton === "yes" ? "primary" : "inherit"}
            disableElevation
            variant={hoveredButton === "yes" ? "contained" : "outlined"}
            onMouseEnter={() => setHoveredButton("yes")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            YES
          </Button>
          <Box sx={{ mx: 2 }} />
          <Button
            onClick={() => navigate("/buying/no")}
            color={hoveredButton === "no" ? "primary" : "inherit"}
            sx={{ ml: 1 }}
            disableElevation
            variant={hoveredButton === "no" ? "contained" : "outlined"}
            onMouseEnter={() => setHoveredButton("no")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            NO
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NewBuildConfirmation;