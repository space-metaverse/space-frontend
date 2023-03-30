"use client"

import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Image from 'next/image'
import headerImage from "../../../public/space-header.png"
import event1 from "../../../public/miley.png"
import { useState } from "react"
import { Stack } from "@mui/system"
import { useAppDispatch } from "../../../redux/hooks"
import { addCartItem } from "../../../redux/slices/cart"

const sizes = ['Size 1', 'Size 2', 'Size 3']

export default function EventPage() {
  const dispatch = useAppDispatch()
  const [size, setSize] = useState(sizes[0])

  return (
    <Box>
      <Image src={headerImage} alt={'header'} style={{ width: '100%', height: '10rem', objectFit: 'cover' }} />
      <Grid container>
        <Grid xs={12} md={6}>
          <Image src={event1} alt={'header'} style={{ width: '100%', height: '50rem', objectFit: 'cover' }} />
        </Grid>
        <Grid xs={12} md={6} p={5}>
          <Typography variant="h4" component="h1">
            Miley Cyrus - Bangerz Tour Event
          </Typography>
          <Typography variant="h6" pt={3}>
            $3000.00
          </Typography>
          <Typography variant="body1" pt={3}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquet nisl, eget aliquam nisl nisl eu nunc. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquet nisl, eget aliquam nisl nisl eu nunc.
          </Typography>
          <Typography variant="h6" pt={3}>
            LIVE IN 3d 4H 30M
          </Typography>
          <Stack flexDirection='row' gap={3} mt={10}>
            <Button
              variant='contained'
              color='primary'
              size="large"
              fullWidth
              onClick={() => dispatch(addCartItem({ id: '1', title: 'Nike Air Max 270 React', price: 123.23, quantity: 1, size }))}
            >
              Add ticket to cart
            </Button>
            <Button variant='outlined' color='primary' size="large" fullWidth>Buy Ticket now</Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}