import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
  CardActionArea,
  Box,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAddCartItemMutation } from "../api/space";
import { useAppDispatch } from "../redux/hooks";
import { addCartItem } from "../redux/slices/cart";
import spaceImage from "../public/space-store.png";
import { formatCurrency } from "../helpers";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Countdown from "react-countdown";
import LiveCountdown from "./LiveCountdown";

interface ProductCardProps {
  productId: string;
  hubId: string;
  title: string;
  owner: string;
  image: string;
  price: number;
  quantity: number;
  startDate?: number;
  endDate?: number;
}

const ProductCard = ({
  productId,
  hubId,
  title,
  owner,
  image,
  price,
  quantity,
  startDate,
  endDate,
}: ProductCardProps) => {
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

  const handleAddCartItem = async (productId: string) => {
    await postCartItem({
      hub_sid: hubId,
      item: {
        product_variation_sid: productId,
      },
      quantity: 1,
    });
    dispatch(
      addCartItem({
        item: { product: { product_variation_sid: productId } },
        quantity: 1,
      })
    );
  };

  const isLive =
    new Date(Number(startDate) * 1000).getTime() < new Date().getTime();

  return (
    <Card sx={{ height: "100%", borderRadius: 3 }}>
      <Stack height="100%" justifyContent="space-between">
        <CardActionArea
          onClick={() => router.push(`/products/${productId}`)}
          sx={{ height: "100%" }}
        >
          <CardMedia sx={{ height: 140 }} title={title}>
            <Image
              src={image || spaceImage}
              alt={title}
              height={140}
              width={300}
              style={{ width: "100%", objectFit: "cover" }}
            />
          </CardMedia>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Product
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {owner}
            </Typography>
            <Typography variant="body1">
              {formatCurrency(Number(price) ?? 0)}
            </Typography>
            {startDate && (
              <Box mt={1}>
                <Countdown
                  date={new Date(Number(startDate) * 1000).getTime()}
                  renderer={(props) => (
                    <LiveCountdown {...props} isLive={isLive} />
                  )}
                />
              </Box>
            )}
          </CardContent>
        </CardActionArea>
        <Grid container spacing={2}>
          <Grid xs={12} lg={6}>
            <Button
              size="medium"
              onClick={() => handleAddCartItem(productId)}
              fullWidth
              color="secondary"
              variant="outlined"
              disabled={quantity === 0 || (startDate && !isLive) || false}
            >
              Add to Cart
            </Button>
          </Grid>
          <Grid xs={12} lg={6}>
            <Button
              size="medium"
              onClick={async () => {
                await handleAddCartItem(productId);
                router.push("/checkout");
              }}
              fullWidth
              color="primary"
              disabled={quantity === 0 || (startDate && !isLive) || false}
              variant="contained"
            >
              {quantity > 0 ? "Buy Now" : "Out of Stock"}
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
};

export default ProductCard;
