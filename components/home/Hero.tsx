import { Typography, Box } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Image from "next/image"
import logoImage from "../../public/logo.png"

const Hero = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Box sx={{ background: '#1B1B1F', color: 'white', borderRadius: '20px' }}>
            <Typography variant="h1" align="center" p={3}>
              Your <Typography color='#71717A' variant="h1" component='span' fontWeight={500}>
                Store
              </Typography> in 3D
            </Typography>
            <video autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0 0 20px 20px' }}>
              <source src={'https://public-space-assets.s3.us-west-2.amazonaws.com/space-hero.mp4'} type="video/mp4" />
            </video>
          </Box>
        </Grid>
        <Grid xs={12} md={4} container>
          <Grid xs={12}>
            <Box
              sx={{ height: '100%', background: 'white', color: '#111114', borderRadius: '20px', border: '4px solid #111114' }}
              display="flex"
              alignItems="center"
              justifyContent='center'
            >
              <Typography variant="h4" align="center" p={3}>
                Join the Ultimate Launch Experience with FAN Space - Your Destination for Exclusive Drops and VR Launch Parties!
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box
              sx={{ height: '100%', background: 'white', color: '#111114', borderRadius: '20px', border: '4px solid #111114' }}
              display="flex"
              alignItems="center"
              justifyContent='center'
            >
              <Typography variant="h4" align="center" p={3}>
                <Image src={logoImage} alt="space-store" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid >
    </div >
  )
}

export default Hero