"use client"

import { Box, Button, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Image from 'next/image'
import headerImage from "../../../public/space-header.png"
import { useState } from "react"
import { Stack } from "@mui/system"
import { useAppDispatch } from "../../../redux/hooks"
import { addCartItem } from "../../../redux/slices/cart"
import { useGetEventQuery } from "@/api/space"
import { usePathname } from 'next/navigation'
import { Skeleton } from "@space-metaverse-ag/space-ui"
import Countdown from "react-countdown"
import LiveCountdown from "../../../components/LiveCountdown"

const sizes = ['Size 1', 'Size 2', 'Size 3']

export default function EventPage() {
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const eventId = pathname.split('/')[2]
  const [size, setSize] = useState(sizes[0])

  const { data, error, isLoading } = useGetEventQuery({ event_sid: eventId })

  return (
    <Box>
      <Image src={headerImage} alt={'header'} style={{ width: '100%', height: '10rem', objectFit: 'cover' }} />
      <Grid container>
        <Grid xs={12} md={6}>
          {
            isLoading || !data?.image_url ? <Skeleton width='100%' height='50rem' /> : (
              <Image src={data?.image_url} alt={'header'} width={1000} height={2000} style={{ width: '100%', height: '50rem', objectFit: 'cover' }} />
            )
          }
        </Grid>
        <Grid xs={12} md={6} p={5}>
          <Typography variant="h4" component="h1">
            {data?.title}
          </Typography>
          <Typography variant="h6" pt={3}>
            $69.00
          </Typography>
          <Typography variant="body1" pt={3}>
            {data?.description}
          </Typography>
          <Typography variant="h6" pt={3}>
            {
              data?.start_date && (
                <Countdown
                  date={new Date(data?.start_date * 1000).getTime()}
                  renderer={(props) => <LiveCountdown
                    {...props}
                    isLive={(new Date(data?.start_date * 1000).getTime() < new Date().getTime()) && (new Date(data?.start_date * 1000).getTime() > new Date().getTime())} />
                  }
                />
              )
            }
          </Typography>
          {
            data?.start_date && (
              <Typography variant="body1" pt={3}>
                Ends at: {new Date(data?.end_date * 1000).toLocaleString()}
              </Typography>
            )
          }
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