"use client";
import { useGetAllEventsQuery } from "../../api/space";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Typography, Box, CircularProgress, Stack } from "@mui/material";
import EventCard from "../../components/EventCard";

const Events = () => {
  const { data, error, isLoading } = useGetAllEventsQuery({});

  return (
    <Box pl={3} pr={3} pb={4} sx={{ minHeight: "80%" }}>
      <Typography variant="h2" align="center" p={3} fontWeight={500}>
        All Events
      </Typography>
      <Grid container spacing={3}>
        {isLoading ? (
          <Stack alignItems="center" width="100%" p={8}>
            <CircularProgress />
          </Stack>
        ) : (
          data?.data?.slice()?.sort((a, b) => Number(b.start_date) - Number(a.start_date)).map((event, index) => (
            <Grid xs={12} md={3} key={event.event_sid + index}>
              <EventCard
                id={event.event_sid}
                hubId={event.hub_sid}
                title={event.title}
                image={event.image_url}
                startDate={event.start_date}
                endDate={event.end_date}
                timeslots={event.timeslots}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Events;
