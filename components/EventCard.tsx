import { Typography, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material"
import { useRouter } from "next/navigation"
import Countdown from 'react-countdown';
import LiveCountdown from "./LiveCountdown"

interface EventCardProps {
  id: string
  title: string
  description: string
  image: string
  startDate: number
  endDate: number
}

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
          renderer={(props) => <LiveCountdown
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

export default EventCard