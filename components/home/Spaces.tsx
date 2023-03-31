import { Typography, Button, Box, Tabs } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { useGetAllRoomsQuery } from "@/api/space"
import SpaceCard from "../SpaceCard"

const Spaces = () => {
  const { data, error, isLoading } = useGetAllRoomsQuery({})

  return (
    <Box pt={3}>
      <Typography variant="h2" align="center" p={3} fontWeight={500} sx={{ border: '3px solid #111114' }}>
        Top Spaces
      </Typography>
      <Tabs value={0} centered sx={{ p: 2 }}>
        <Button>All</Button>
        <Button>Art</Button>
        <Button>Influencer Rooms</Button>
        <Button>Fashion</Button>
        <Button>Shows</Button>
        <Button>Sports</Button>
        <Button>Meetups</Button>
        <Button>Concerts</Button>
        <Button>Retail</Button>
      </Tabs>
      <Grid container pt={1} spacing={3}>
        {
          data?.data?.filter((r) => r.allow_promotion).slice(0, 8)?.map((space, index) => (
            <Grid xs={12} md={3} key={space.hub_id + index}>
              <SpaceCard
                key={space.hub_id}
                hubId={space.hub_id}
                title={space.name}
                owner={space.commerce_type}
                image={space.screenshot_url}
              />
            </Grid>
          ))
        }
      </Grid >
    </Box >
  )
}

export default Spaces