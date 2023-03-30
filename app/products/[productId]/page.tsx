"use client"

import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Image from 'next/image'
import headerImage from "../../../public/space-header.png"
import product1 from "../../../public/nike-1.png"
import { useState } from "react"
import { Stack } from "@mui/system"

const sizes = ['Size 1', 'Size 2', 'Size 3']

export default function ProductPage() {
  const [size, setSize] = useState(sizes[0])

  return (
    <Box pb={4}>
      <Image src={headerImage} alt={'header'} style={{ width: '100%', height: '10rem', objectFit: 'cover' }} />
      <Grid container>
        <Grid xs={12} md={6}>
          <Image src={product1} alt={'header'} style={{ width: '100%', height: '50rem', objectFit: 'cover' }} />
        </Grid>
        <Grid xs={12} md={6} p={5}>
          <Typography variant="h4" component="h1">
            Nike Air Max 270 React
          </Typography>
          <Typography variant="h6" pt={3}>
            $123.23
          </Typography>
          <Typography variant="body1" pt={3}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquet nisl, eget aliquam nisl nisl eu nunc. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquet nisl, eget aliquam nisl nisl eu nunc.
          </Typography>
          <Stack flexDirection='row' gap={3} mt={10}>
            <FormControl fullWidth>
              <InputLabel id="size-label">Size</InputLabel>
              <Select label='Size' labelId='size-label' value={size} onChange={({ target }) => setSize(target.value)}>
                {sizes.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField label='Quantity' type='number' />
          </Stack>
          <Stack flexDirection='row' gap={3} mt={10}>
            <Button variant='contained' color='primary' size="large" fullWidth>Add to cart</Button>
            <Button variant='outlined' color='primary' size="large" fullWidth>Buy now</Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}