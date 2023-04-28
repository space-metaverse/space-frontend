"use client";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/image";
import headerImage from "../../../public/space-header.png";
import { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import { useAppDispatch } from "../../../redux/hooks";
import { addCartItem } from "../../../redux/slices/cart";
import {
  useAddCartItemMutation,
  useGetEventQuery,
  useGetSpaceQuery,
} from "../../../api/space";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "@space-metaverse-ag/space-ui";
import Countdown from "react-countdown";
import LiveCountdown from "../../../components/LiveCountdown";
import { formatCurrency } from "../../../helpers";
import Link from "next/link";
import EventCalendar from "../../../components/EventCalendar";

const sizes = ["Size 1", "Size 2", "Size 3"];

const EventPage = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const eventId = pathname.split("/")[2];
  const [size, setSize] = useState(sizes[0]);
  const [selectedTimeslot, setSelectedTimeslot] = useState<string | null>(null);

  const {
    data: eventData,
    error: eventError,
    isLoading: eventLoading,
    isSuccess: eventSuccess,
  } = useGetEventQuery({ event_sid: eventId });

  const {
    data: spaceData,
    error: spaceError,
    isLoading: spaceLoading,
    isSuccess: spaceSuccess,
  } = useGetSpaceQuery(
    { hubId: String(eventData?.hub_sid) },
    {
      skip: !eventData?.hub_sid,
    }
  );

  const [
    postCartItem,
    {
      isLoading: postCartItemLoading,
      isSuccess: postCartItemSuccess,
      isError: postCartItemError,
    },
  ] = useAddCartItemMutation();

  useEffect(() => {
    if (eventSuccess && eventData?.timeslots?.length > 0) {
      const currentTime = Math.round(new Date().getTime() / 1000);
      const firstTimeslot = eventData?.timeslots.find(
        (timeslot) =>
          timeslot.quantity > 0 &&
          timeslot.start_date < currentTime &&
          timeslot.end_date > currentTime
      );
      setSelectedTimeslot(firstTimeslot?.timeslot_sid || null);
    }
  }, [eventData?.timeslots, eventSuccess]);

  const handleAddCartItem = async () => {
    if (!selectedTimeslot) return;
    await postCartItem({
      hub_sid: String(eventData?.hub_sid),
      item: {
        timeslot_sid: selectedTimeslot,
      },
      quantity: 1,
    });
    dispatch(
      addCartItem({
        hub_sid: String(eventData?.hub_sid),
        item: { timeslot_sid: selectedTimeslot },
        quantity: 1,
      })
    );
  };

  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <Box>
      <Image
        src={headerImage}
        alt={"header"}
        style={{ width: "100%", height: "10rem", objectFit: "cover" }}
      />
      <Grid container>
        <Grid xs={12} md={6}>
          {eventLoading || !eventData?.image_url ? (
            <Skeleton width="100%" height="50rem" />
          ) : (
            <Image
              src={eventData?.image_url}
              alt={"header"}
              width={1000}
              height={2000}
              style={{ width: "100%", height: "50rem", objectFit: "cover" }}
            />
          )}
        </Grid>
        <Grid xs={12} md={6} p={5}>
          <Stack direction="row" alignItems="center">
            {eventData?.start_date && (
              <EventCalendar
                month={
                  shortMonths[
                    new Date(eventData?.start_date * 1000).getMonth() + 1
                  ]
                }
                day={new Date(eventData?.start_date * 1000).getDate()}
              />
            )}
            <Stack pl={4}>
              <Typography variant="h3" component="h1">
                {eventData?.title}
              </Typography>
              <Link href={`/spaces/${eventData?.hub_sid}`}>
                <Typography
                  variant="subtitle1"
                  component="h1"
                  sx={{
                    color: "blue  ",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                    mt: 1,
                  }}
                >
                  {spaceData?.name}
                </Typography>
              </Link>
            </Stack>
          </Stack>
          <Typography variant="body1" pt={3}>
            {eventData?.description}
          </Typography>
          <Typography variant="h6" pt={3}>
            {eventData?.start_date && (
              <Countdown
                date={new Date(eventData?.start_date * 1000).getTime()}
                renderer={(props) => (
                  <LiveCountdown
                    {...props}
                    isLive={
                      eventData?.start_date <
                        Math.round(new Date().getTime() / 1000) &&
                      eventData?.end_date >
                        Math.round(new Date().getTime() / 1000)
                    }
                  />
                )}
              />
            )}
          </Typography>
          {eventData?.start_date && (
            <Typography variant="body1" pt={3}>
              Ends at: {new Date(eventData?.end_date * 1000).toLocaleString()}
            </Typography>
          )}
          <FormControl sx={{ mt: 5 }}>
            <FormLabel id="timeslots">Event Timeslots</FormLabel>
            <RadioGroup
              aria-labelledby="timeslots"
              defaultValue={selectedTimeslot}
              value={selectedTimeslot}
              name="timeslots"
              onChange={(e) => setSelectedTimeslot(e.target.value)}
            >
              {eventData?.timeslots?.map((timeslot) => (
                <FormControlLabel
                  key={timeslot.timeslot_sid}
                  value={timeslot.timeslot_sid}
                  control={<Radio />}
                  label={`${new Date(
                    timeslot.start_date * 1000
                  ).toLocaleString()} - ${new Date(
                    timeslot.end_date * 1000
                  ).toLocaleString()} - ${formatCurrency(
                    Number(timeslot.price)
                  )} - ${timeslot.quantity} tickets left`}
                  disabled={
                    timeslot.quantity === 0 ||
                    timeslot.end_date < Math.round(new Date().getTime() / 1000)
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Stack flexDirection="row" gap={3} mt={10}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={!selectedTimeslot}
              onClick={handleAddCartItem}
            >
              Add ticket to cart
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              fullWidth
              disabled={!selectedTimeslot}
              onClick={async () => {
                await handleAddCartItem();
                router.push("/checkout");
              }}
            >
              Buy Ticket now
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventPage;
