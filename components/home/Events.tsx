import { Typography, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { useRouter } from "next/navigation"

const eventsMock = [
  {
    id: 1,
    title: 'Miley Cyrus',
    description: 'Take a ride on the wild side with Miley Cyrus and Lil Xan',
    image: "/miley.png",
  },
  {
    id: 2,
    title: 'Lil Nas X',
    description: 'Get your satan on with a bad boy ;)',
    image: "/lil-x.png",
  },
  {
    id: 3,
    title: 'Lil Yaughty',
    description: 'Gang, Gang, Gang, Gang... yeah.',
    image: "/rapper.png",
  }
]

interface EventCardProps {
  id: number
  title: string
  description: string
  image: string
}

const EventCard = ({ id, title, description, image }: EventCardProps) => {
  const router = useRouter()

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
        <Button size="small" onClick={() => router.push(`/events/${id}`)}>Learn More</Button>
        <Button size="small" onClick={() => router.push(`/events/${id}`)}>Buy a Ticket</Button>
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
              id={event.id}
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