import { Box, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Image from "next/image"

interface CheckoutItemProps {
  title: string
  type: string
  price: number
}

const CheckoutItem = ({ title, type, price }: CheckoutItemProps) => {
  return (
    <Box sx={{ p: 5, borderBottom: '1px black solid' }}>
      <Grid container>
        <Grid xs={12} md={4}>
          <Image
            src="/nike-1.png"
            alt=''
            width={150}
            height={150}
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
            ${price}.00
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CheckoutItem