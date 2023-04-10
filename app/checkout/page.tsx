"use client";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
  Typography,
  Box,
  Stack,
  Button,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Autocomplete,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import CheckoutItem from "./CheckoutItem";
import StripeCheckout from "../../components/StripeCheckout";
import { useEffect, useMemo, useState } from "react";
import { getClientUrl } from "../../api/url";
import { useLazyGetProductQuery, useGetCartItemsQuery } from "../../api/space";
import { formatCurrency } from "../../helpers";
import { MuiTelInput } from "mui-tel-input";
import Image from "next/image";
import { allCountries } from "country-region-data";

enum CheckoutStep {
  Cart = 0,
  Shipping = 1,
  Payment = 2,
}

const Checkout = () => {
  const [isStripeOpen, setIsStripeOpen] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [activeStep, setActiveStep] = useState<CheckoutStep>(
    CheckoutStep.Shipping
  );

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+1");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [suite, setSuite] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");

  const {
    data: cartData,
    error: cartError,
    isLoading: cartLoading,
    refetch: refetchCart,
  } = useGetCartItemsQuery({});

  const [
    getProduct,
    {
      data: productData,
      isLoading: productLoading,
      isFetching: productFetching,
    },
  ] = useLazyGetProductQuery();

  useEffect(() => {
    cartData?.data.forEach(async (entry: any) => {
      if (entry?.quantity > 0) {
        if (
          entry?.item?.product &&
          entry?.item?.product?.product_variation_sid
        ) {
          const product = await getProduct({
            productId: entry?.item?.product?.product_variation_sid,
          });
          if (product?.isSuccess) {
            setProducts((oldProducts: any) => [
              ...oldProducts,
              {
                productId: entry?.item?.product?.product_variation_sid,
                title: product?.data?.name,
                type: "product",
                price: product?.data?.price,
                quantity: entry?.quantity,
                image: product?.data?.thumbnail_url,
              },
            ]);
          }
        }
      }
    });
  }, [cartData?.data, getProduct]);

  const totalPrice = useMemo(() => {
    return formatCurrency(
      products.reduce((acc: number, curr: any) => {
        return acc + curr?.price * curr?.quantity;
      }, 0)
    );
  }, [products]);

  return (
    <Box
      pl={3}
      pr={3}
      pb={4}
      sx={(theme: any) => ({
        minHeight: "80%",
        [theme.breakpoints.up("md")]: {
          paddingRight: "15%",
          paddingLeft: "15%",
        },
      })}
    >
      <Typography variant="h3" align="center" p={3} fontWeight={500}>
        Checkout
      </Typography>
      <Stepper activeStep={activeStep}>
        {Object.values(CheckoutStep)
          .slice(3, 6)
          .map((step, i) => (
            <Step
              key={`${step}-${i}`}
              onClick={() => setActiveStep(i)}
              completed={activeStep > i}
            >
              <StepLabel>
                {step === CheckoutStep.Cart && " Review Cart"}
                {step === CheckoutStep.Shipping && "Shipping"}
                {step === CheckoutStep.Payment && "Payment"}
              </StepLabel>
            </Step>
          ))}
      </Stepper>

      {!cartLoading && !cartError && activeStep === CheckoutStep.Cart && (
        <>
          <Grid container spacing={3}>
            {[...products].map((item, i) => (
              <Grid xs={12} key={`${item.productId}-${i}`}>
                <CheckoutItem
                  id={`${item.productId}-${i}`}
                  title={item.title}
                  type={item.type}
                  price={formatCurrency(Number(item.price))}
                  image={item.image}
                  quantity={item.quantity}
                  refetchCart={refetchCart}
                />
              </Grid>
            ))}
          </Grid>
          <Stack pt={3} pb={3} spacing={3}>
            <Stack flexDirection="row" justifyContent="space-between">
              <Typography variant="h5" fontWeight={500}>
                Taxes
              </Typography>
              <Typography variant="h5" fontWeight={500}>
                $0.00
              </Typography>
            </Stack>
            <Stack flexDirection="row" justifyContent="space-between">
              <Typography variant="h5" fontWeight={500}>
                Total
              </Typography>
              <Typography variant="h5" fontWeight={500}>
                {totalPrice}
              </Typography>
            </Stack>
          </Stack>
          <Button
            onClick={() => setActiveStep(CheckoutStep.Shipping)}
            fullWidth
            size="large"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Continue to Shipping
          </Button>
        </>
      )}

      {!cartLoading && !cartError && activeStep === CheckoutStep.Shipping && (
        <>
          <Grid container spacing={3} mt={3}>
            <Grid xs={12}>
              <Typography variant="h5" fontWeight={500}>
                Personal Information
              </Typography>
            </Grid>

            <Grid xs={12} lg={6}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid xs={12} lg={6}>
              <MuiTelInput
                value={phone}
                onChange={(value: string) => setPhone(value)}
                defaultCountry="us"
                fullWidth
              />
            </Grid>

            <Grid xs={12}>
              <Typography variant="h5" fontWeight={500}>
                Personal Information
              </Typography>
            </Grid>

            <Grid xs={12} lg={6}>
              <Autocomplete
                options={allCountries}
                onChange={(e: any, value: any) => setCountry(value[0])}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
                openOnFocus
                renderOption={(props, option) => (
                  <Box
                    {...props}
                    sx={{
                      "& > img": {
                        mr: 2,
                        flexShrink: 0,
                        borderRadius: ".25rem",
                      },
                    }}
                    component="li"
                  >
                    <Image
                      src={`https://flagcdn.com/w20/${option[1]?.toLowerCase()}.png`}
                      alt=""
                      width={20}
                      height={16}
                      loading="lazy"
                    />
                    {option[0]}
                  </Box>
                )}
                autoHighlight
                getOptionLabel={(option) => option[0]}
              />
            </Grid>

            <Grid xs={12} lg={6}>
              <Autocomplete
                options={allCountries.find((c) => c[0] === country)?.[2] || []}
                onChange={(e: any, value: any) => setRegion(value)}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Region"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
                openOnFocus
                renderOption={(props, option) => (
                  <Box key={option[0]} component="li">
                    {option[0]}
                  </Box>
                )}
                autoHighlight
                getOptionLabel={(option) => option[0]}
              />
            </Grid>

            <Grid xs={12} lg={6}>
              <TextField
                id="outlined-basic"
                label="City"
                variant="outlined"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid xs={12} lg={6}>
              <TextField
                id="outlined-basic"
                label="Zip Code"
                variant="outlined"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid xs={12} lg={6}>
              <TextField
                id="outlined-basic"
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid xs={12} lg={6}>
              <TextField
                id="outlined-basic"
                label="Suite #"
                variant="outlined"
                value={suite}
                onChange={(e) => setSuite(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid xs={12}>
              <TextField
                multiline
                maxRows={4}
                id="outlined-basic"
                label="Delivery Notes"
                variant="outlined"
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid xs={12}>
              <Typography variant="h5" fontWeight={500}>
                Shipping
              </Typography>
            </Grid>

            <Grid xs={12}>
              <RadioGroup
                aria-labelledby="shipping-radios"
                defaultValue="express"
                name="shipping-radios"
              >
                <FormControlLabel
                  value="express"
                  control={<Radio />}
                  label="Express (1 - 2 days)"
                />
                <FormControlLabel
                  value="standard"
                  control={<Radio />}
                  label="Standard (3 - 5 days)"
                />
              </RadioGroup>
            </Grid>
          </Grid>

          <Button
            onClick={() => setActiveStep(CheckoutStep.Payment)}
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
          >
            Continue to Payment
          </Button>
        </>
      )}

      {!cartLoading && !cartError && activeStep === CheckoutStep.Payment && (
        <>
          <Grid container spacing={3}></Grid>

          <Button
            onClick={() => setIsStripeOpen(true)}
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            Complete Checkout
          </Button>

          <StripeCheckout
            open={isStripeOpen}
            onClose={() => setIsStripeOpen(false)}
            metadata={{
              account_id: "",
              products: [
                {
                  product_variation_sid: "gXLnmjQ",
                  quantity: 1,
                },
              ],
              tickets: ["timeSlot1Id", "timeSlot2Id", "timeSlot3Id"],
            }}
            amount={500}
            returnUrl={`${getClientUrl()}/checkout`}
            title={"SPACE Checkout"}
            submitText={"Checkout!"}
          />
        </>
      )}

      {cartLoading && (
        <Stack alignItems="center" width="100%" p={8}>
          <CircularProgress />
        </Stack>
      )}

      {cartError && (
        <Stack alignItems="center" width="100%" p={8}>
          <Typography variant="h5" fontWeight={500}>
            There was an error loading your cart.
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

export default Checkout;
