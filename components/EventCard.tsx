import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Stack,
  CardActionArea,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Countdown from "react-countdown";
import LiveCountdown from "./LiveCountdown";
import { useAppDispatch } from "../redux/hooks";
import { useAddCartItemMutation } from "../api/space";
import { addCartItem } from "../redux/slices/cart";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

interface EventCardProps {
  id: string;
  hubId: string;
  title: string;
  image: string;
  startDate: number;
  endDate: number;
  timeslots: any[];
}

const EventCard = ({
  id,
  hubId,
  title,
  image,
  startDate,
  endDate,
  timeslots,
}: EventCardProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [
    postCartItem,
    {
      isLoading: postCartItemLoading,
      isSuccess: postCartItemSuccess,
      isError: postCartItemError,
    },
  ] = useAddCartItemMutation();

  const handleAddCartItem = async (id: string) => {
    await postCartItem({
      hub_sid: hubId,
      item: {
        timeslot_sid: id,
      },
      quantity: 1,
    });
    dispatch(
      addCartItem({ item: { ticket: { timeslot_sid: id } }, quantity: 1 })
    );
  };

  return (
    <Card sx={{ height: "100%", borderRadius: 3 }}>
      <Stack height="100%" justifyContent="space-between">
        <CardActionArea
          onClick={() => router.push(`/events/${id}`)}
          sx={{ height: "100%" }}
        >
          <CardMedia sx={{ height: 140 }} image={image} title={title} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Event
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Countdown
              date={new Date(startDate * 1000).getTime()}
              renderer={(props) => (
                <LiveCountdown
                  {...props}
                  isLive={
                    new Date(startDate * 1000).getTime() <
                      new Date().getTime() &&
                    new Date(endDate * 1000).getTime() > new Date().getTime()
                  }
                />
              )}
            />
          </CardContent>
        </CardActionArea>
        <Grid container spacing={2} p={2}>
          <Grid xs={12} lg={6}>
            <Button
              size="medium"
              onClick={() => router.push(`/events/${id}`)}
              fullWidth
              color="secondary"
              variant="outlined"
            >
              Learn More
            </Button>
          </Grid>
          <Grid xs={12} lg={6}>
            <Button
              size="medium"
              onClick={() => router.push(`/events/${id}`)}
              fullWidth
              color="primary"
              variant="contained"
            >
              Buy Now
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
};

export default EventCard;
