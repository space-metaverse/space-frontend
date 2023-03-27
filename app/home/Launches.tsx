import { Typography, Card, CardMedia, CardContent, CardActions, Button, Box, Tabs } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"

const launchesMock = [
  {
    id: 1,
    title: 'Faze Blaze',
    price: 299,
    image: "/launch-1.png",
  },
  {
    id: 1,
    title: 'Killy',
    price: 643,
    image: "/launch-2.png",
  },
  {
    id: 1,
    title: 'The Professor',
    price: 299,
    image: "/launch-3.png",
  },
  {
    id: 1,
    title: 'CJ So Cool',
    price: 1299,
    image: "/launch-4.png",
  },
  {
    id: 1,
    title: 'Fernanfloo',
    price: 23,
    image: "/launch-5.png",
  },
]

const formatPrice = (price: number) => {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

interface LaunchCardProps {
  title: string
  price: number
  image: string
}

const LaunchCard = ({ title, price, image }: LaunchCardProps) => {
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
          Price: {formatPrice(price)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Buy SuperFan Badge</Button>
      </CardActions>
    </Card>
  )
}

const Launches = () => {
  return (
    <Box pt={3}>
      <Typography variant="h2" align="center" p={3} fontWeight={500}>
        Upcoming Launches
      </Typography>
      <Grid container pt={1} spacing={3} justifyContent='center'>
        {
          launchesMock.map((launch, index) => (
            <Grid xs={12} md={2} key={launch.title + index}>
              <LaunchCard
                key={launch.id}
                title={launch.title}
                price={launch.price}
                image={launch.image}
              />
            </Grid>
          ))
        }
      </Grid >
    </Box >
  )
}

export default Launches