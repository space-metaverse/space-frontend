"use client";

import { Box } from "@mui/system";
import EmailSubscribe from "../components/home/EmailSubscribe";
import Events from "../components/home/Events";
import Hero from "../components/home/Hero";
import Spaces from "../components/home/Spaces";

const Home = () => {
  return (
    <Box
      p={3}
      sx={(theme) => ({
        [theme.breakpoints.up("lg")]: {
          paddingRight: "15%",
          paddingLeft: "15%",
        },
      })}
    >
      <Hero />
      <Events />
      <Spaces />
      <EmailSubscribe />
    </Box>
  );
};

export default Home;
