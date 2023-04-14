"use client";

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
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
import { useAddCartItemMutation, useGetProductQuery } from "../../../api/space";
import { formatCurrency } from "../../../helpers";
import miley from "../../../public/miley.png";

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
      hub_sid: "SgPdAJP",
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
                    : miley
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
              <Typography variant="h6" pt={3}>
                {formatCurrency(Number(data?.price))}
              </Typography>
              <Typography variant="body1" pt={3}>
                {data?.product?.description}
              </Typography>
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
                  disabled={postCartItemLoading || data?.quantity === 0}
                >
                  {data?.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                </Button>
                {data?.quantity > 0 && (
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={async () => {
                      await handleAddCartItem(productId);
                      setTimeout(() => {
                        router.push("/checkout");
                      }, 1500);
                    }}
                  >
                    Buy now
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default ProductPage;
