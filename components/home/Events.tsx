import { Typography, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"

const eventsMock = [
  {
    id: 1,
    title: 'Miley Cyrus',
    description: 'Take a ride on the wild side with Miley Cyrus and Lil Xan',
    image: "/miley.png",
  },
  {
    id: 1,
    title: 'Lil Nas X',
    description: 'Get your satan on with a bad boy ;)',
    image: "/lil-x.png",
  },
  {
    id: 1,
    title: 'Lil Yaughty',
    description: 'Gang, Gang, Gang, Gang... yeah.',
    image: "/rapper.png",
  }
]

interface EventCardProps {
  title: string
  description: string
  image: string
}

const EventCard = ({ title, description, image }: EventCardProps) => {
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
          {description}
        </Typography>
        <Typography variant="h6" pt={3}>
          LIVE IN 3d 4H 30M
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
        <Button size="small">Buy a Ticket</Button>
      </CardActions>
    </Card>
  )
}

const Events = () => {
  return (
    <Grid container pt={1} spacing={3}>
      {
        eventsMock.map((event) => (
          <Grid xs={12} md={4} key={event.title}>
            <EventCard
              key={event.id}
              title={event.title}
              description={event.description}
              image={event.image}
            />
          </Grid>
        ))
      }
    </Grid >
  )
}

export default Events