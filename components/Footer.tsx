import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/image";
import logoImage from "../public/logo.png";
import Link from "next/link";

const footerItems = [
  {
    title: "Metaverse",
    children: [
      {
        title: "Builder",
        href: "https://app.tryspace.com/spoke/projects",
      },
    ],
  },
  {
    title: "Space",
    children: [
      {
        title: "Career",
        href: "https://spacemetaverseag.bamboohr.com/jobs/",
      },
      {
        title: "FAQ",
        href: "https://app.tryspace.com/faq",
      },
      {
        title: "Contact",
        href: "https://www.tryspace.com/#",
      },
    ],
  },
  {
    title: "Account",
    children: [
      {
        title: "Create Account",
        href: "/signup",
      },
      {
        title: "Log In",
        href: "/login",
      },
      {
        title: "My Account",
        href:
          process.env.NEXT_PUBLIC_ENV === "prod"
            ? "https://account.tryspace.com"
            : "https://account.qa.tryspace.com",
      },
    ],
  },
  {
    title: "Social",
    children: [
      {
        title: "Instagram",
        href: "https://www.instagram.com/spacemetaverse/",
      },
      {
        title: "Twitter",
        href: "https://twitter.com/spacemetaverse",
      },
      {
        title: "Discord",
        href: "https://discord.gg/qRu9G2HnwC",
      },
      {
        title: "Telegram",
        href: "https://t.me/spacemetaverse",
      },
      {
        title: "Facebook",
        href: "https://www.facebook.com/SpaceMetaverse",
      },
      {
        title: "LinkedIn",
        href: "https://www.linkedin.com/company/space-metaverse/mycompany/",
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
                    <Link href={child.href} target="__blank">
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#fff",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {child.title}
                      </Typography>
                    </Link>
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
            © {new Date().getFullYear()} Space Store. All rights reserved.
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
