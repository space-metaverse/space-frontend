"use client"

import { Box } from "@mui/system"
import EmailSubscribe from "./home/EmailSubscribe"
import Events from "./home/Events"
import Hero from "./home/Hero"
import Launches from "./home/Launches"
import Spaces from "./home/Spaces"

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
      <Spaces />
      <EmailSubscribe />
      <Launches />
    </Box>
  )
}
