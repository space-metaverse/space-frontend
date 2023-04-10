import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/image";
import logoImage from "../public/logo.png";

const footerItems = [
  {
    title: "Metaverse",
    children: [
      {
        title: "Token",
        href: "/token",
      },
      {
        title: "Litepaper",
        href: "/litepaper",
      },
      {
        title: "Builder",
        href: "/builder",
      },
    ],
  },
  {
    title: "Space",
    children: [
      {
        title: "About",
        href: "/about",
      },
      {
        title: "Team",
        href: "/team",
      },
      {
        title: "Career",
        href: "/career",
      },
      {
        title: "FAQ",
        href: "/faq",
      },
      {
        title: "Contact",
        href: "/contact",
      },
    ],
  },
  {
    title: "Account",
    children: [
      {
        title: "Create Account",
        href: "/register",
      },
      {
        title: "Log In",
        href: "/login",
      },
      {
        title: "My Account",
        href: "/account",
      },
    ],
  },
  {
    title: "Social",
    children: [
      {
        title: "Instagram",
        href: "/instagram",
      },
      {
        title: "Twitter",
        href: "/twitter",
      },
      {
        title: "Discord",
        href: "/discord",
      },
      {
        title: "Telegram",
        href: "/facebook",
      },
      {
        title: "LinkedIn",
        href: "/linkedin",
      },
    ],
  },
];

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#111114", p: 5 }}>
      <Grid container>
        <Grid xs={12} sm={6} md={3}>
          <Box sx={{ p: 3 }}>
            <Image
              src={logoImage}
              alt="logo"
              style={{
                width: "8rem",
                height: "auto",
                objectFit: "cover",
                background: "white",
                borderRadius: 60,
              }}
            />
          </Box>
        </Grid>
        {footerItems.map((item, index) => (
          <Grid xs={12} sm={6} md={2} key={item.title + index}>
            <Box sx={{ p: 3 }}>
              <Typography
                variant="h5"
                fontWeight={500}
                sx={{ color: "#71717A" }}
              >
                {item.title}
              </Typography>
              <Box sx={{ mt: 2 }}>
                {item.children.map((child, index) => (
                  <Box sx={{ mt: 1 }} key={child.title + index}>
                    <Typography variant="body2" sx={{ color: "#fff" }}>
                      {child.title}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid container sx={{ color: "white", pl: 2, pr: 20, pt: 5 }}>
        <Grid xs={12} md={6}>
          <Typography variant="body2" sx={{ color: "#fff" }}>
            © 2023 Space Store. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: "#fff", pt: 2 }}>
            Please see our Terms of Service and Privacy Policy.
          </Typography>
        </Grid>
        <Grid xs={12} md={6}></Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
