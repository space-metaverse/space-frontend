"use client";

import "@space-metaverse-ag/space-ui/index.css";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import { ThemeProvider as SpaceThemeProvider } from "@space-metaverse-ag/space-ui";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../redux/store";
import { theme } from "./theme";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { usePathname } from "next/navigation";
import { LazyMotion, domAnimation } from "framer-motion";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const showNav =
    pathname !== "/login" &&
    pathname !== "/signup" &&
    pathname !== "/forgot-password" &&
    pathname !== "/reset-password";
  const showFooter =
    pathname !== "/login" &&
    pathname !== "/signup" &&
    pathname !== "/forgot-password" &&
    pathname !== "/reset-password";

  return (
    <html lang="en">
      <title>Space</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="Explore 3D e-commerce and meet your favorite creators."
      />
      <ReduxProvider store={store}>
        <SpaceThemeProvider>
          <ThemeProvider theme={theme}>
            <LazyMotion features={domAnimation}>
              <body>
                {showNav && <TopNav />}
                {children}
                {showFooter && <Footer />}
              </body>
            </LazyMotion>
          </ThemeProvider>
        </SpaceThemeProvider>
      </ReduxProvider>
    </html>
  );
};

export default RootLayout;
