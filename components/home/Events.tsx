import { type Event, useGetAllEventsQuery } from "../../api/space"
import { Typography, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { useRouter } from "next/navigation"
import Carousel from 'react-material-ui-carousel'
import Countdown from 'react-countdown';

interface EventCardProps {
  id: string
  title: string
  description: string
  image: string
  startDate: number
  endDate: number
  isLive: boolean
}

const CountdownRender = ({ hours, minutes, seconds, completed, isLive }: { hours: number, minutes: number, seconds: number, completed: boolean, isLive: boolean }) => {
  if (isLive) {
    return <Typography variant="h4" display="inline" pr={2}>
      Live now!
    </Typography>
  } else if (completed && !isLive) {
    return <Typography variant="h4" display="inline" pr={2}>
      Ended
    </Typography>
  } else {
    return <>
      <Typography variant="h5" color="text.secondary" display="inline" pr={2}>
        Live In:
      </Typography>
      <Typography variant="h4" display="inline" pr={2}>
        {hours}h {minutes}m {seconds}s
      </Typography>
    </>;
  }
};

const EventCard = ({ id, title, description, image, startDate, endDate }: EventCardProps) => {
  const router = useRouter()

  return (
    <Card sx={{ height: '100%' }}>
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
        <Countdown
          date={new Date(startDate * 1000).getTime()}
          renderer={(props) => <CountdownRender
            {...props}
            isLive={(new Date(startDate * 1000).getTime() < new Date().getTime()) && (new Date(endDate * 1000).getTime() > new Date().getTime())} />
          }
        />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => router.push(`/events/${id}`)}>Learn More</Button>
        <Button size="small" onClick={() => router.push(`/events/${id}`)}>Buy a Ticket</Button>
      </CardActions>
    </Card>
  )
}

const Events = () => {
  const { data, error, isLoading } = useGetAllEventsQuery({})

  const eventSlides = data?.data?.reduce((all: any, one: any, i) => {
    const ch = Math.floor(i / 3);
    all[ch] = [].concat((all[ch] || []), one);
    return all
  }, [])

  return (
    <Carousel>
      {
        eventSlides?.map((slides: Event[], index: number) => (
          <Grid container pt={1} spacing={3} key={index}>
            {
              slides?.map((event: Event) => (
                <Grid xs={12} md={4} key={event.event_sid}>
                  <EventCard
                    id={event.event_sid}
                    title={event.title}
                    description={event.description}
                    image={event.image_url}
                    startDate={event.start_date}
                    endDate={event.end_date}
                  />
                </Grid>
              ))
            }
          </Grid >
        ))
      }
    </Carousel>
  )
}

export default Events