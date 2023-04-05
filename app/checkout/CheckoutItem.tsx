import { Box, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Image from "next/image"

interface CheckoutItemProps {
  id: string
  title: string
  type: string
  price: string
  image: string
  quantity: number
}

const CheckoutItem = ({ id, title, type, price, image, quantity }: CheckoutItemProps) => {
  return (
    <Box sx={{ p: 5, borderBottom: '1px black solid' }}>
      <Grid container>
        <Grid xs={12} md={4}>
          <Image
            src={image}
            alt=''
            width={400}
            height={400}
            style={{ width: '12rem', height: '12rem', objectFit: 'cover' }}
          />
        </Grid>
        <Grid xs={12} md={8}>
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
      </Grid>
    </Box>
  )
}

export default CheckoutItem