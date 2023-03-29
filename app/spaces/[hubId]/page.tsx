"use client"
import { Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation"
import { useGetSpaceQuery } from "../../../api/space"
import headerImage from "../../../public/space-header.png"
import nikeImage from "../../../public/nike.png"
import product1 from "../../../public/nike-1.png"
import product2 from "../../../public/nike-2.png"
import product3 from "../../../public/nike-3.png"
import { formatCurrency } from "../../../helpers";

const productsMock = [
  {
    id: 1,
    title: 'Fly Boys v3',
    type: 'Phygital',
    image: product1,
    price: 100,
  },
  {
    id: 1,
    title: 'Sport Kicks',
    type: 'Phygital',
    image: product2,
    price: 200,
  },
  {
    id: 1,
    title: 'Jordans',
    type: 'Phygital',
    image: product3,
    price: 300,
  }
]

interface ProductCardProps {
  type: string
  title: string
  image: StaticImageData
  price: number
}

const ProductCard = ({ type, title, image, price }: ProductCardProps) => {
  return (
    <Card>
      <CardMedia
        sx={{ height: 140 }}
        title={title}
      >
        <Image src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {type}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="body1">
          {formatCurrency(price)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Buy Product</Button>
      </CardActions>
    </Card>
  )
}

export default function Spaces() {
  const pathname = usePathname();
  const hubId = pathname?.split("/")[2];

  const { data, error, isLoading } = useGetSpaceQuery({ hubId: String(hubId) }, { skip: !hubId })

  return (
    <Box pb={4}>
      <Image src={headerImage} alt={'header'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <Grid container spacing={3} sx={(theme) => ({
        paddingRight: '1rem',
        paddingLeft: '1rem',
        [theme.breakpoints.up('md')]: {
          paddingRight: '15%',
          paddingLeft: '15%',
        },
        minHeight: '50vh',
        mt: 2
      })}>
        <Grid xs={12} md={8}>
          <Box sx={{ border: '1px solid #e9e9e9', borderRadius: '10px', padding: '1rem 2rem', position: 'relative' }}>
            <Image
              src={nikeImage}
              alt={'header'}
              style={{
                width: '8rem',
                height: '8rem',
                objectFit: 'cover',
                position: 'absolute',
                top: -75,
                left: 25,
                borderRadius: '100px',
                border: '4px solid white'
              }}
            />
            <Stack flexDirection={'row'} alignItems='center' justifyContent={'space-between'}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }} mt={6}>
                {data?.name}
              </Typography>
              <a href={`https://metaverse-demo.com/${hubId}`} target="_blank">
                <Button variant="contained">
                  Enter Space
                </Button>
              </a>
            </Stack>
            <Typography variant="subtitle1">
              Official Store
            </Typography>
            <Typography variant="body1" mt={3}>
              {data?.description || 'No description'}
            </Typography>
          </Box>
          <Box sx={{ border: '1px solid #e9e9e9', borderRadius: '10px', padding: '1rem 2rem', position: 'relative', mt: 3 }}>
            <Typography variant="h5">
              Featured Products
            </Typography>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              {productsMock.map((product) => (
                <Grid xs={12} md={4} key={product.title}>
                  <ProductCard {...product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid xs={12} md={4}>
          <Box sx={{ border: '1px solid #e9e9e9', borderRadius: '10px', padding: '1rem 2rem', position: 'relative' }}>
            <Typography variant="h5">
              Categories
            </Typography>
          </Box>
          <Box sx={{ border: '1px solid #e9e9e9', borderRadius: '10px', padding: '1rem 2rem', position: 'relative', mt: 3 }}>
            <Typography variant="h5">
              Communication
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}