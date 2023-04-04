"use client"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { Typography, Box, Stack, Button } from "@mui/material"
import CheckoutItem from "./CheckoutItem"
import StripeCheckout from "../../components/StripeCheckout"
import { useState } from "react"
import { getClientUrl } from "../../api/url"

export default function Checkout() {
  const [isStripeOpen, setIsStripeOpen] = useState(false)

  return (
    <>
      <Box pl={3} pr={3} pb={4} sx={(theme: any) => ({
        minHeight: '80%',
        [theme.breakpoints.up('md')]: {
          paddingRight: '15%',
          paddingLeft: '15%',
        },
      })}>
        <Typography variant="h2" align="center" p={3} fontWeight={500}>
          Checkout
        </Typography>
        <Grid container spacing={3}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Grid xs={12} key={i}>
              <CheckoutItem title="Title" type="Type" price={100} />
            </Grid>
          ))}
        </Grid>
        <Stack pt={3} pb={3} spacing={3}>
          <Stack flexDirection='row' justifyContent='space-between'>
            <Typography variant="h5" fontWeight={500}>
              Subtotal
            </Typography>
            <Typography variant="h5" fontWeight={500}>
              $500.00
            </Typography>
          </Stack>
          <Stack flexDirection='row' justifyContent='space-between'>
            <Typography variant="h5" fontWeight={500}>
              Taxes
            </Typography>
            <Typography variant="h5" fontWeight={500}>
              $13.40
            </Typography>
          </Stack>
          <Stack flexDirection='row' justifyContent='space-between'>
            <Typography variant="h5" fontWeight={500}>
              Total
            </Typography>
            <Typography variant="h5" fontWeight={500}>
              $513.40
            </Typography>
          </Stack>
        </Stack>
        <Button onClick={() => setIsStripeOpen(true)} fullWidth variant="contained" sx={{ p: 3 }} >
          Checkout
        </Button>
      </Box>

      <StripeCheckout
        open={isStripeOpen}
        onClose={() => setIsStripeOpen(false)}
        metadata={{
          "account_id": "",
          "products": [
            {
              "product_variation_sid": "gXLnmjQ",
              "quantity": 1
            }
          ],
          "tickets": ["timeSlot1Id", "timeSlot2Id", "timeSlot3Id"]
        }}
        amount={500}
        returnUrl={`${getClientUrl()}/checkout`}
        title={'SPACE Checkout'}
        submitText={'Checkout!'}
      />
    </>
  )
}