import { type Event, useGetAllEventsQuery } from "../../api/space"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Carousel from 'react-material-ui-carousel'
import EventCard from "../EventCard"

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
                    timeslots={event.timeslots}
                    hubId={event.hub_sid}
                    title={event.title}
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