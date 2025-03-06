import { Box, Button, colors, Typography, DialogActions as DialogActionsMui } from "@mui/material"

import { useDispatch } from "react-redux"
import { updateActiveStep } from "../../store/data"

const CostEstimate = () => {
  const dispatch = useDispatch()

  return (
    <Box>
      <Typography>Cost estimates</Typography>
      <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non voluptatum aut incidunt tempore eius ipsa optio veniam maxime dicta deserunt adipisci aperiam reiciendis pariatur, debitis eligendi iste! Odit cupiditate eos recusandae animi ex velit ipsum suscipit ducimus autem. Beatae dignissimos sapiente recusandae excepturi! Aliquam fugit magnam blanditiis nisi quibusdam sunt repudiandae praesentium necessitatibus iusto mollitia pariatur quia aliquid, doloribus nulla minima ad ipsam dolorem dolorum est, veniam soluta obcaecati quisquam. Blanditiis, ipsum consequatur! Ratione quis aspernatur quod veniam inventore labore ipsa, quasi at illo doloremque dignissimos, nihil nostrum officiis quo vel sunt earum? Consequuntur magnam cumque culpa eaque soluta esse.</Typography>

      {/* action buttons */}
      <DialogActionsMui sx={{ justifyContent: "space-between", mt: 2 }}>
        <Button
          onClick={() => dispatch(updateActiveStep(1))}
          sx={{ background: colors.grey[100] }}
          disableElevation
          variant="contained"
        >
          back
        </Button>
        <Button type="submit" disableElevation variant="contained">
          next
        </Button>
      </DialogActionsMui>
    </Box>
  )
}

export default CostEstimate
