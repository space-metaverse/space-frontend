import { Typography, Card, CardMedia, CardContent, CardActions, Button, Box, Tabs } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Image from "next/image"
import { useRouter } from "next/navigation"
import spaceImage from "../../public/space-store.png"
import { useGetAllRoomsQuery } from "@/api/space"

interface SpaceCardProps {
  hubId: string
  title: string
  owner: string
  image: string
}

const SpaceCard = ({ hubId, title, owner, image }: SpaceCardProps) => {
  const router = useRouter()

  return (
    <Card sx={{ height: '100%' }}>
      <CardMedia
        sx={{ height: 140 }}
        title={title}
      >
        <Image src={image || spaceImage} alt={title} height={140} width={300} style={{ width: '100%', objectFit: 'cover' }} />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          By: {owner}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => router.push(`/spaces/${hubId}`)}>Visit Space</Button>
      </CardActions>
    </Card>
  )
}

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