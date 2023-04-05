"use client"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { Typography, Box, Stack, Button } from "@mui/material"
import CheckoutItem from "./CheckoutItem"
import StripeCheckout from "../../components/StripeCheckout"
import { useEffect, useMemo, useState } from "react"
import { getClientUrl } from "../../api/url"
import { useLazyGetProductQuery, useGetCartItemsQuery } from "../../api/space"
import { formatCurrency } from "../../helpers"

export default function Checkout() {
  const [isStripeOpen, setIsStripeOpen] = useState(false)
  const [products, setProducts] = useState<any>([])

  const { data: cartData, error: cartError, isLoading: cartLoading } = useGetCartItemsQuery({})

  const [getProduct, { data: productData, isLoading: productLoading, isFetching: productFetching }] = useLazyGetProductQuery();

  useEffect(() => {
    cartData?.data.forEach(async (entry: any) => {
      if (entry?.quantity > 0) {
        if (entry?.item?.product && entry?.item?.product?.product_variation_sid) {
          const product = await getProduct({ productId: entry?.item?.product?.product_variation_sid })
          if (product?.isSuccess) {
            setProducts((oldProducts: any) => [...oldProducts, {
              productId: entry?.item?.product?.product_variation_sid,
              title: product?.data?.name,
              type: 'product',
              price: product?.data?.price,
              quantity: entry?.quantity,
              image: product?.data?.thumbnail_url
            }])
          }
        }
      }
    })
  }, [cartData?.data, getProduct])

  const totalPrice = useMemo(() => {
    return formatCurrency(products.reduce((acc: number, curr: any) => {
      return acc + (curr?.price * curr?.quantity)
    }, 0))
  }, [products])

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
          {[...products].map((item, i) => (
            <Grid xs={12} key={i}>
              <CheckoutItem
                id={item.productId}
                title={item.title}
                type={item.type}
                price={formatCurrency(Number(item.price))}
                image={item.image}
                quantity={item.quantity}
              />
            </Grid>
          ))}
        </Grid>
        <Stack pt={3} pb={3} spacing={3}>
          <Stack flexDirection='row' justifyContent='space-between'>
            <Typography variant="h5" fontWeight={500}>
              Taxes
            </Typography>
            <Typography variant="h5" fontWeight={500}>
              $0.00
            </Typography>
          </Stack>
          <Stack flexDirection='row' justifyContent='space-between'>
            <Typography variant="h5" fontWeight={500}>
              Total
            </Typography>
            <Typography variant="h5" fontWeight={500}>
              {totalPrice}
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