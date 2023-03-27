import { Typography, Card, CardMedia, CardContent, CardActions, Button, Box, Tabs } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"

const spacesMock = [
  {
    id: 1,
    title: 'Nike Store',
    owner: 'Nike',
    image: "/space-store.png",
  },
  {
    id: 1,
    title: 'Nike Store',
    owner: 'Nike',
    image: "/space-store.png",
  },
  {
    id: 1,
    title: 'Nike Store',
    owner: 'Nike',
    image: "/space-store.png",
  },
  {
    id: 1,
    title: 'Nike Store',
    owner: 'Nike',
    image: "/space-store.png",
  },
  {
    id: 1,
    title: 'Nike Store',
    owner: 'Nike',
    image: "/space-store.png",
  },
  {
    id: 1,
    title: 'Nike Store',
    owner: 'Nike',
    image: "/space-store.png",
  },
]

interface SpaceCardProps {
  title: string
  owner: string
  image: string
}

const SpaceCard = ({ title, owner, image }: SpaceCardProps) => {
  return (
    <Card>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          By: {owner}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Visit Space</Button>
      </CardActions>
    </Card>
  )
}

const Spaces = () => {
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
          spacesMock.map((space) => (
            <Grid xs={12} md={4} key={space.title}>
              <SpaceCard
                key={space.id}
                title={space.title}
                owner={space.owner}
                image={space.image}
              />
            </Grid>
          ))
        }
      </Grid >
    </Box >
  )
}

export default Spaces