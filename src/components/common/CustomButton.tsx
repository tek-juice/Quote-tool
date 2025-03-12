import { Typography } from "@mui/material"
import { colors } from "../../theme"
import React from "react"

export interface Props {
  title: string
  action?: () => void
  fullWidth?: boolean
  styles?: React.CSSProperties
  type?: string
}

const CustomButton: React.FC<Props> = ({ title, action, fullWidth, styles, type }) => {
  return (
    <button
      type={type ? "submit" : "button"}
      onClick={action}
      style={{
        cursor: "pointer",
        color: colors?.primaryColor,
        padding: 12,
        outline: "none",
        textAlign: "center",
        width: fullWidth ? "100%" : "max-content",
        border: "none",
        backgroundColor: colors?.hoverColor,
        ...styles,
      }}>
      <Typography fontWeight={400}>{title}</Typography>
    </button>
  )
}

export default CustomButton