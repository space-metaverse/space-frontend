import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Countdown from "react-countdown";
import LiveCountdown from "./LiveCountdown";
import { useAppDispatch } from "../redux/hooks";
import { useAddCartItemMutation } from "../api/space";
import { addCartItem } from "../redux/slices/cart";

interface EventCardProps {
  id: string;
  hubId: string;
  title: string;
  description: string;
  image: string;
  startDate: number;
  endDate: number;
}

const EventCard = ({
  id,
  hubId,
  title,
  description,
  image,
  startDate,
  endDate,
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
    <Card sx={{ height: "100%" }}>
      <Stack height="100%" justifyContent="space-between">
        <CardMedia sx={{ height: 140 }} image={image} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Countdown
            date={new Date(startDate * 1000).getTime()}
            renderer={(props) => (
              <LiveCountdown
                {...props}
                isLive={
                  new Date(startDate * 1000).getTime() < new Date().getTime() &&
                  new Date(endDate * 1000).getTime() > new Date().getTime()
                }
              />
            )}
          />
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => router.push(`/events/${id}`)}
            fullWidth
            color="secondary"
          >
            Learn More
          </Button>
          <Button
            size="small"
            onClick={() => handleAddCartItem(id)}
            fullWidth
            color="primary"
          >
            Add to Cart
          </Button>
        </CardActions>
      </Stack>
    </Card>
  );
};

export default EventCard;
