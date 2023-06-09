import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const Hero = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Box
            sx={(theme) => ({
              color: "white",
              borderRadius: "20px",
              height: "100%",
              position: "relative",
              [theme.breakpoints.down("md")]: {
                height: "30rem",
              },
            })}
          >
            <Typography
              variant="h1"
              align="center"
              p={3}
              sx={(theme) => ({
                position: "absolute",
                width: "100%",
                background: "#1B1B1F",
                borderRadius: "20px 20px 0 0",
                [theme.breakpoints.down("md")]: {
                  fontSize: "3rem",
                },
              })}
            >
              Your{" "}
              <Typography
                color="#71717A"
                variant="h1"
                component="span"
                fontWeight={500}
                sx={(theme) => ({
                  [theme.breakpoints.down("md")]: {
                    fontSize: "3.5rem",
                  },
                })}
              >
                Store
              </Typography>{" "}
              in 3D
            </Typography>
            <video
              autoPlay
              loop
              muted
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "20px",
              }}
            >
              <source
                src={
                  "https://public-space-assets.s3.us-west-2.amazonaws.com/space-hero.mp4"
                }
                type="video/mp4"
              />
            </video>
          </Box>
        </Grid>
        <Grid xs={12} md={4} container>
          <Grid xs={12}>
            <Box
              sx={{
                height: "100%",
                background: "white",
                color: "#111114",
                borderRadius: "20px",
                border: "4px solid #111114",
              }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h4" align="center" p={3}>
                Join the ultimate launch experience with FanSPACE - your
                destination for exclusive drops and VR launch parties!
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box
              sx={{
                height: "100%",
                background: "white",
                color: "#111114",
                borderRadius: "20px",
                border: "4px solid #111114",
              }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h4" align="center" p={3}>
                <video
                  autoPlay
                  loop
                  muted
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "0 0 20px 20px",
                  }}
                >
                  <source
                    src={
                      "https://public-space-assets.s3.us-west-2.amazonaws.com/space-helmet.mp4"
                    }
                    type="video/mp4"
                  />
                </video>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Hero;
