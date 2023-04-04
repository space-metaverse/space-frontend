import { Card, CardActions, CardContent, CardMedia, Typography, Button, Stack } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/navigation"
import spaceImage from "../public/space-store.png"

interface ProductCardProps {
  productId: string
  title: string
  owner: string
  image: string
}

const ProductCard = ({ productId, title, owner, image }: ProductCardProps) => {
  const router = useRouter()

  return (
    <Card sx={{ height: '100%' }}>
      <Stack height='100%' justifyContent='space-between'>
        <CardMedia
          sx={{ height: 140 }}
          title={title}
        >
          <Image src={image || spaceImage} alt={title} height={140} width={300} style={{ width: '100%', objectFit: 'cover' }} />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {owner}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => router.push(`/product/${productId}`)} fullWidth>Visit Product</Button>
        </CardActions>
      </Stack>
    </Card >
  )
}

export default ProductCard
