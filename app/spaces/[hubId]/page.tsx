"use client"
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/image";
import { usePathname } from "next/navigation"
import { useGetSpaceQuery } from "../../../api/space"
import headerImage from "../../../public/space-header.png"
import nikeImage from "../../../public/nike.png"

export default function Spaces() {
  const pathname = usePathname();
  const hubId = pathname?.split("/")[2];

  const { data, error, isLoading } = useGetSpaceQuery({ hubId: String(hubId) }, { skip: !hubId })

  return (
    <Box>
      <Image src={headerImage} alt={'header'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <Grid container spacing={3} sx={(theme) => ({
        [theme.breakpoints.up('md')]: {
          paddingRight: '15%',
          paddingLeft: '15%',
        },
        minHeight: '50vh',
        mt: 2
      })}>
        <Grid xs={12} md={8}>
          <Box sx={{ border: '1px solid #e9e9e9', borderRadius: '10px', padding: '1rem 2rem', position: 'relative' }}>
            <Image
              src={nikeImage}
              alt={'header'}
              style={{
                width: '8rem',
                height: '8rem',
                objectFit: 'cover',
                position: 'absolute',
                top: -75,
                left: 25,
                borderRadius: '100px',
                border: '4px solid white'
              }}
            />
            <Stack flexDirection={'row'} alignItems='center' justifyContent={'space-between'}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }} mt={6}>
                {data?.name}
              </Typography>
              <a href={`https://metaverse-demo.com/${hubId}`} target="_blank">
                <Button variant="contained">
                  Enter Space
                </Button>
              </a>
            </Stack>
            <Typography variant="subtitle1">
              Official Store
            </Typography>
            <Typography variant="body1" mt={3}>
              {data?.description || 'No description'}
            </Typography>
          </Box>
          <Box sx={{ border: '1px solid #e9e9e9', borderRadius: '10px', padding: '1rem 2rem', position: 'relative', mt: 3 }}>
            <Typography variant="h5">
              Featured Products
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12} md={4}>
          <Box sx={{ border: '1px solid #e9e9e9', borderRadius: '10px', padding: '1rem 2rem', position: 'relative' }}>
            <Typography variant="h5">
              Categories
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}