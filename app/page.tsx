"use client"

import { Box } from "@mui/system"
import Events from "./home/Events"
import Hero from "./home/Hero"

export default function Home() {
  return (
    <Box p={3} sx={(theme) => ({
      [theme.breakpoints.up('md')]: {
        paddingRight: '10%',
        paddingLeft: '10%',
      },
    })}>
      <Hero />
      <Events />
    </Box>
  )
}
