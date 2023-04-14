import { useDeleteCartItemMutation } from "../../api/space";
import { Delete } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/image";

interface CheckoutItemProps {
  id: string;
  hubId: string;
  title: string;
  type: string;
  price: string;
  image: string;
  quantity: number;
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
  refetchCart,
}: CheckoutItemProps) => {
  const [
    deleteCartItem,
    {
      isLoading: deleteCartItemLoading,
      isSuccess: deleteCartItemSuccess,
      isError: deleteCartItemError,
    },
  ] = useDeleteCartItemMutation();

  const handleDelete = async () => {
    await deleteCartItem({
      hub_sid: hubId,
      item: {
        ...(type === "ticket" && { timeslot_sid: id }),
        ...(type === "product" && { product_variation_sid: id }),
      },
      quantity: 1,
    });
    refetchCart();
  };

  return (
    <Box sx={{ p: 3, borderBottom: "1px #c9c9c9 solid" }}>
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
          <Typography variant="body1" pb={2} fontWeight={500}>
            {type}
          </Typography>
          <Typography variant="h5" pb={2} fontWeight={500}>
            {title}
          </Typography>
          <Typography variant="h5" fontWeight={500}>
            {price}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            Quantity: {quantity}
          </Typography>
        </Grid>
        <Grid xs={12} md={1}>
          <Delete onClick={handleDelete} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutItem;
