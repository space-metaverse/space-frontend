"use client"

import { Box } from "@mui/system"
import EmailSubscribe from "../components/home/EmailSubscribe"
import Events from "../components/home/Events"
import Hero from "../components/home/Hero"
import Launches from "../components/home/Launches"
import Spaces from "../components/home/Spaces"

export default function Home() {
  return (
    <Box p={3} sx={(theme) => ({
      [theme.breakpoints.up('md')]: {
        paddingRight: '15%',
        paddingLeft: '15%',
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
