import {
  useDeleteCartItemMutation,
  useGetSpaceQuery,
  useUpdateCartItemMutation,
} from "../../api/space";
import { Delete } from "@mui/icons-material";
import {
  Alert,
  Box,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/image";
import { useState } from "react";
import Countdown from "react-countdown";
import LiveCountdown from "../../components/LiveCountdown";

interface CheckoutItemProps {
  id: string;
  hubId: string;
  title: string;
  type: string;
  price: string;
  image: string;
  quantity: number;
  description: string;
  startDate?: number;
  endDate?: number;
  error?: string;
  refetchCart: () => void;
}

const CheckoutItem = ({
  id,
  hubId,
  title,
  type,
  price,
  image,
  quantity,
  description,
  startDate,
  endDate,
  error,
  refetchCart,
}: CheckoutItemProps) => {
  const [customQuantity, setCustomQuantity] = useState<number>(quantity);

  const [
    deleteCartItem,
    {
      isLoading: deleteCartItemLoading,
      isSuccess: deleteCartItemSuccess,
      isError: deleteCartItemError,
    },
  ] = useDeleteCartItemMutation();

  const [
    updateCartItem,
    {
      isLoading: updateCartItemLoading,
      isSuccess: updateCartItemSuccess,
      isError: updateCartItemError,
    },
  ] = useUpdateCartItemMutation();

  const {
    data: spaceData,
    error: spaceError,
    isLoading: spaceLoading,
    isSuccess: spaceSuccess,
  } = useGetSpaceQuery(
    { hubId },
    {
      skip: !hubId,
    }
  );

  const handleDelete = async () => {
    await deleteCartItem({
      hub_sid: hubId,
      item: {
        ...(type === "ticket" && { timeslot_sid: id }),
        ...(type === "product" && { product_variation_sid: id }),
      },
      quantity,
    });
    refetchCart();
  };

  const handleQuantityChange = async (value: number) => {
    setCustomQuantity(value);
    await updateCartItem({
      hub_sid: hubId,
      item: {
        ...(type === "ticket" && { timeslot_sid: id }),
        ...(type === "product" && { product_variation_sid: id }),
      },
      quantity: value,
    });
    refetchCart();
  };

  return (
    <Box sx={{ pt: 3, pb: 3, borderBottom: "1px #c9c9c9 solid" }}>
      <Grid container>
        <Grid xs={12} md={4}>
          <Image
            src={image}
            alt=""
            width={400}
            height={400}
            style={{ width: "12rem", height: "12rem", objectFit: "cover" }}
          />
        </Grid>
        <Grid xs={12} md={7}>
          <Typography variant="h5" fontWeight={500}>
            {title}
          </Typography>
          <Link href={`/spaces/${hubId}`} style={{ textDecoration: "none" }}>
            <Typography
              variant="subtitle1"
              component="h1"
              sx={{
                color: "blue  ",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
                mt: 0,
              }}
            >
              {spaceData?.name}
            </Typography>
          </Link>

          <Typography variant="body1" pt={2} pb={2}>
            {description}
          </Typography>
          {!startDate && !endDate && (
            <TextField
              sx={{ mt: 2, width: 200 }}
              label="Quantity"
              type="number"
              value={customQuantity}
              onChange={({ target }) =>
                handleQuantityChange(Number(target.value))
              }
            />
          )}
          {startDate && endDate && (
            <Typography variant="h6" pt={3}>
              <Countdown
                date={new Date(startDate * 1000).getTime()}
                renderer={(props) => (
                  <LiveCountdown
                    {...props}
                    isLive={
                      startDate < Math.round(new Date().getTime() / 1000) &&
                      endDate > Math.round(new Date().getTime() / 1000)
                    }
                  />
                )}
              />
            </Typography>
          )}
        </Grid>
        <Grid xs={12} md={1}>
          <Stack
            justifyContent="space-between"
            alignItems="flex-end"
            height="100%"
          >
            <IconButton aria-label="delete" onClick={handleDelete}>
              <Delete />
            </IconButton>
            <Typography variant="subtitle1">{price}</Typography>
          </Stack>
        </Grid>
        {error && (
          <Grid xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CheckoutItem;
