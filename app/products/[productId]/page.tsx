"use client";

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/image";
import headerImage from "../../../public/space-header.png";
import { useState } from "react";
import { Stack } from "@mui/system";
import { useAppDispatch } from "../../../redux/hooks";
import { addCartItem } from "../../../redux/slices/cart";
import { usePathname, useRouter } from "next/navigation";
import {
  useAddCartItemMutation,
  useGetProductQuery,
  useGetSpaceQuery,
} from "../../../api/space";
import { formatCurrency } from "../../../helpers";
import missingImage from "../../../public/missing-image.jpg";
import Countdown from "react-countdown";
import LiveCountdown from "../../../components/LiveCountdown";

const sizes = ["Size 1", "Size 2", "Size 3"];

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [size, setSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const pathname = usePathname();
  const productId = pathname?.split("/")[2];

  const { data, error, isLoading } = useGetProductQuery(
    { productId: String(productId) },
    { skip: !productId }
  );

  const {
    data: spaceData,
    error: spaceError,
    isLoading: spaceLoading,
    isSuccess: spaceSuccess,
  } = useGetSpaceQuery(
    { hubId: String(data?.product?.hub_sid) },
    {
      skip: !data?.product?.hub_sid,
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

  const handleAddCartItem = async (productId: string) => {
    await postCartItem({
      hub_sid: data?.product?.hub_sid,
      item: {
        product_variation_sid: productId,
      },
      quantity,
    });
    dispatch(
      addCartItem({
        item: { product: { product_variation_sid: productId } },
        quantity,
      })
    );
  };

  const isLive =
    new Date(Number(data?.product?.start_date) * 1000).getTime() <
    new Date().getTime();

  return (
    <Box pb={0}>
      {isLoading && (
        <Stack justifyContent="center" alignItems="center" height="80vh">
          <CircularProgress />
        </Stack>
      )}
      {!isLoading && (
        <>
          <Image
            src={headerImage}
            alt={"header"}
            style={{ width: "100%", height: "10rem", objectFit: "cover" }}
          />
          <Grid container>
            <Grid xs={12} md={6}>
              <Image
                src={
                  data?.thumbnail_url.startsWith("http")
                    ? data?.thumbnail_url
                    : missingImage
                }
                alt={"header"}
                width={500}
                height={500}
                style={{ width: "100%", height: "50rem", objectFit: "cover" }}
              />
            </Grid>
            <Grid xs={12} md={6} p={5}>
              <Typography variant="h4" component="h1">
                {data?.name}
              </Typography>
              <Link href={`/spaces/${data?.product?.hub_sid}`}>
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
              <Typography variant="h6" pt={3}>
                {formatCurrency(Number(data?.price))}
              </Typography>
              <Typography variant="body1" pt={3}>
                {data?.product?.description}
              </Typography>
              {data?.product?.start_date && (
                <Box mt={3}>
                  <Countdown
                    date={new Date(
                      Number(data?.product?.start_date) * 1000
                    ).getTime()}
                    renderer={(props) => (
                      <LiveCountdown {...props} isLive={isLive} />
                    )}
                  />
                </Box>
              )}
              <Stack flexDirection="row" gap={3} mt={10}>
                <FormControl fullWidth>
                  <InputLabel id="size-label">Size</InputLabel>
                  <Select
                    label="Size"
                    labelId="size-label"
                    value={size}
                    onChange={({ target }) => setSize(target.value)}
                  >
                    {sizes.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </Stack>
              <Stack flexDirection="row" gap={3} mt={10}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={() => handleAddCartItem(productId)}
                  disabled={
                    postCartItemLoading ||
                    data?.quantity === 0 ||
                    (data?.product?.start_date && !isLive) ||
                    false
                  }
                >
                  {data?.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={async () => {
                    await handleAddCartItem(productId);
                    router.push("/checkout");
                  }}
                  disabled={
                    postCartItemLoading ||
                    data?.quantity === 0 ||
                    (data?.product?.start_date && !isLive) ||
                    false
                  }
                >
                  Buy now
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default ProductPage;
