"use client"
import { Typography, Box, CircularProgress, Stack } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { useGetAllProductsQuery } from "../../api/space"
import ProductCard from "../../components/ProductCard"

export default function ProductsPage() {
  const { data, error, isLoading } = useGetAllProductsQuery({})

  return (
    <Box pl={3} pr={3} pb={4} sx={{ minHeight: '80%' }}>
      <Typography variant="h2" align="center" p={3} fontWeight={500}>
        All Products
      </Typography>
      <Grid container spacing={3}>
        {
          isLoading ? <Stack alignItems='center' width='100%' p={8}><CircularProgress /></Stack> : (
            data?.products?.map((product: any, index: number) => (
              <Grid xs={12} md={3} key={product.id + index}>
                <ProductCard
                  productId={product.product_variations?.[0]?.product_variation_sid}
                  title={product.name}
                  owner={product.commerce_type}
                  image={product.product_variations?.[0]?.thumbnail_url.startsWith('http') ? product.product_variations?.[0]?.thumbnail_url : null}
                  price={product.product_variations?.[0]?.price}
                />
              </Grid>
            ))
          )
        }
      </Grid >
    </Box>
  )
}