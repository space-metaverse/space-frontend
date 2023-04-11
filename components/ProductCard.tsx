import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAddCartItemMutation } from "@/api/space";
import { useAppDispatch } from "../redux/hooks";
import { addCartItem } from "../redux/slices/cart";
import spaceImage from "../public/space-store.png";
import { formatCurrency } from "../helpers";

interface ProductCardProps {
  productId: string;
  hubId: string;
  title: string;
  owner: string;
  image: string;
  price: number;
  quantity: number;
}

const ProductCard = ({
  productId,
  hubId,
  title,
  owner,
  image,
  price,
  quantity,
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

  return (
    <Card sx={{ height: "100%" }}>
      <Stack height="100%" justifyContent="space-between">
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
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {owner}
          </Typography>
          <Typography variant="subtitle1">
            {formatCurrency(Number(price) ?? 0)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => router.push(`/products/${productId}`)}
            fullWidth
            color="secondary"
          >
            Visit Product
          </Button>
          <Button
            size="small"
            onClick={() => handleAddCartItem(productId)}
            fullWidth
            color="primary"
            disabled={quantity === 0}
          >
            {quantity > 0 ? "Add to Cart" : "Out of Stock"}
          </Button>
        </CardActions>
      </Stack>
    </Card>
  );
};

export default ProductCard;
