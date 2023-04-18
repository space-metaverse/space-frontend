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
  Alert,
} from "@mui/material";
import CheckoutItem from "./CheckoutItem";
import StripeCheckout from "../../components/StripeCheckout";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getClientUrl } from "../../api/url";
import {
  useLazyGetProductQuery,
  useGetCartItemsQuery,
  usePostOrderMutation,
  useLazyGetTicketQuery,
  usePostTicketTimerMutation,
  usePostPaymentIntentMutation,
} from "../../api/space";
import { formatCurrency } from "../../helpers";
import { MuiTelInput } from "mui-tel-input";
import Image from "next/image";
import { allCountries } from "country-region-data";
import { PaymentIntent } from "@stripe/stripe-js";
import Link from "next/link";

enum CheckoutStep {
  Cart = 0,
  Shipping = 1,
  Payment = 2,
  Result = 3,
}

const Checkout = () => {
  const [products, setProducts] = useState<any>([]);
  const [tickets, setTickets] = useState<any>([]);
  const [activeStep, setActiveStep] = useState<CheckoutStep>(CheckoutStep.Cart);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+1");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [suite, setSuite] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [selectedHubId, setSelectedHubId] = useState("");
  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>(
    {}
  );

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

  const [
    getTicket,
    { data: ticketData, isLoading: ticketLoading, isFetching: ticketFetching },
  ] = useLazyGetTicketQuery();

  const [
    postOrder,
    {
      isLoading: postOrderLoading,
      isSuccess: postOrderSuccess,
      isError: postOrderError,
    },
  ] = usePostOrderMutation();

  const [
    postTicketTimer,
    {
      isLoading: postTicketTimerLoading,
      isSuccess: postTicketTimerSuccess,
      isError: postTicketTimerError,
    },
  ] = usePostTicketTimerMutation();

  const [
    postPaymentIntent,
    {
      data: postPaymentIntentData,
      isLoading: postPaymentIntentLoading,
      isSuccess: postPaymentIntentSuccess,
    },
  ] = usePostPaymentIntentMutation();

  const isShippingValid = useMemo(() => {
    setShippingErrors({});
    let isValid = true;
    if (!email) {
      setShippingErrors((oldErrors: any) => ({
        ...oldErrors,
        email: "Email is required",
      }));
      isValid = false;
    }
    if (!name) {
      setShippingErrors((oldErrors: any) => ({
        ...oldErrors,
        name: "Name is required",
      }));
      isValid = false;
    }
    if (!phone || phone.length < 10) {
      setShippingErrors((oldErrors: any) => ({
        ...oldErrors,
        phone: "Phone is required",
      }));
      isValid = false;
    }
    if (!country) {
      setShippingErrors((oldErrors: any) => ({
        ...oldErrors,
        country: "Country is required",
      }));
      isValid = false;
    }
    if (!region) {
      setShippingErrors((oldErrors: any) => ({
        ...oldErrors,
        region: "Region is required",
      }));
      isValid = false;
    }
    if (!city) {
      setShippingErrors((oldErrors: any) => ({
        ...oldErrors,
        city: "City is required",
      }));
      isValid = false;
    }
    if (!zipCode) {
      setShippingErrors((oldErrors: any) => ({
        ...oldErrors,
        zipCode: "Zip code is required",
      }));
      isValid = false;
    }
    if (!address) {
      setShippingErrors((oldErrors: any) => ({
        ...oldErrors,
        address: "Address is required",
      }));
      isValid = false;
    }
    return isValid;
  }, [address, city, country, email, name, phone, region, zipCode]);

  useEffect(() => {
    tickets.forEach(async (ticket: any) => {
      await postTicketTimer({
        tickets: tickets.map((ticket: any) => ticket.id),
      });
    });
  }, [postTicketTimer, tickets]);

  useEffect(() => {
    setProducts([]);
    setTickets([]);

    cartData?.data.forEach(async (entry: any) => {
      if (entry?.quantity > 0) {
        if (entry?.item) {
          if (entry?.item?.product_variation_sid) {
            const product = await getProduct({
              productId: entry?.item?.product_variation_sid,
            });
            if (product?.isSuccess) {
              setSelectedHubId(entry?.hub_sid);
              setProducts((oldProducts: any) => [
                ...oldProducts,
                {
                  id: entry?.item?.product_variation_sid,
                  hubId: entry?.hub_sid,
                  title: product?.data?.name,
                  type: "product",
                  price: product?.data?.price,
                  quantity: entry?.quantity,
                  image: product?.data?.thumbnail_url,
                },
              ]);
            }
          } else if (entry?.item?.timeslot_sid) {
            const ticket = await getTicket({
              timeslotId: entry?.item?.timeslot_sid,
            });
            if (ticket?.isSuccess) {
              setSelectedHubId(entry?.hub_sid);
              setTickets((oldTickets: any) => [
                ...oldTickets,
                {
                  id: entry?.item?.timeslot_sid,
                  hubId: entry?.hub_sid,
                  title: ticket?.data?.event?.title,
                  type: "ticket",
                  price: ticket?.data?.price,
                  quantity: entry?.quantity,
                  image: ticket?.data?.event?.image_url,
                },
              ]);
            }
          }
        }
      }
    });
  }, [cartData?.data, getProduct, getTicket]);

  const formattedAmount = useMemo(() => {
    return formatCurrency(
      [...products, ...tickets]
        .filter((p: any) => p.hubId === selectedHubId)
        .reduce((acc: number, curr: any) => {
          return acc + curr?.price * curr?.quantity;
        }, 0)
    );
  }, [products, selectedHubId, tickets]);

  console.log(products, tickets);

  const amount = useMemo(() => {
    return [...products, ...tickets]
      .filter((p: any) => p.hubId === selectedHubId)
      .reduce((acc: number, curr: any) => {
        return acc + curr?.price * curr?.quantity;
      }, 0);
  }, [products, selectedHubId, tickets]);

  const handleStripeIntentSuccess = useCallback(
    (paymentIntent: PaymentIntent) => {
      console.log(paymentIntent);
      postOrder({
        data: {
          account_id: window.localStorage.getItem("accountId") as string,
          amount: amount * 100,
          shipping_cost: 0,
          currency: "usd",
          status: "payment_processing",
          live_mode: false,
          hub_sid: selectedHubId,
          payment_id: paymentIntent.id,
          products: products
            .filter((p: any) => p.hubId === selectedHubId)
            .map((product: any) => ({
              product_variation_sid: product.id,
              quantity: product.quantity,
            })),
          tickets: tickets
            .filter((t: any) => t.hubId === selectedHubId)
            .map((ticket: any) => ticket.id),
        },
        customer: {
          name,
          address_line_two: suite,
          country,
          zipcode: zipCode,
          city,
          state: region[0],
          address,
          email,
          telephone: phone,
        },
      });
    },
    [
      address,
      amount,
      city,
      country,
      email,
      name,
      phone,
      postOrder,
      products,
      region,
      selectedHubId,
      suite,
      tickets,
      zipCode,
    ]
  );

  const handleStripeSuccess = (paymentIntent: PaymentIntent) => {
    setActiveStep(CheckoutStep.Result);
  };

  const handleStripeError = (error: any) => {
    console.log(error);
  };

  const refreshCart = async () => {
    setProducts([]);
    setTickets([]);
    setSelectedHubId("");
    await refetchCart();
  };

  useEffect(() => {
    if (activeStep === CheckoutStep.Payment) {
      console.log(amount);
      postPaymentIntent({
        amount,
        metadata: {
          type: "order",
        },
      });
    }
  }, [activeStep, amount, postPaymentIntent]);

  useEffect(() => {
    if (postPaymentIntentSuccess && postPaymentIntentData) {
      handleStripeIntentSuccess(postPaymentIntentData);
    }
  }, [
    postPaymentIntentSuccess,
    postPaymentIntentData,
    handleStripeIntentSuccess,
  ]);

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
          .slice(4, 8)
          .map((step, i) => (
            <Step key={`${step}-${i}`} completed={activeStep > i}>
              <StepLabel>
                {step === CheckoutStep.Cart && " Review Cart"}
                {step === CheckoutStep.Shipping && "Shipping"}
                {step === CheckoutStep.Payment && "Payment"}
                {step === CheckoutStep.Result && "Result"}
              </StepLabel>
            </Step>
          ))}
      </Stepper>

      {!cartLoading && !cartError && activeStep === CheckoutStep.Cart && (
        <>
          <Grid container spacing={3} pt={3}>
            {[...products, ...tickets].map((item, i) => (
              <Grid xs={12} key={`${item.id}-${i}`}>
                <CheckoutItem
                  id={item.id}
                  hubId={item.hubId}
                  title={item.title}
                  type={item.type}
                  price={formatCurrency(Number(item.price))}
                  image={item.image}
                  quantity={item.quantity}
                  refetchCart={refreshCart}
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
                {formattedAmount}
              </Typography>
            </Stack>
          </Stack>
          <Button
            onClick={() => setActiveStep(CheckoutStep.Shipping)}
            fullWidth
            size="large"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={!amount || !selectedHubId || postTicketTimerError}
          >
            Continue to Shipping
          </Button>

          {postTicketTimerError && (
            <Alert severity="error" sx={{ mt: 3 }}>
              Ticket timer has expired. Please delete the ticket and try to buy
              another one.
            </Alert>
          )}
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
                error={!!shippingErrors.email}
                helperText={shippingErrors.email}
              />
            </Grid>

            <Grid xs={12} lg={6}>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                error={!!shippingErrors.name}
                helperText={shippingErrors.name}
              />
            </Grid>

            <Grid xs={12} lg={6}>
              <MuiTelInput
                value={phone}
                onChange={(value: string) => setPhone(value)}
                defaultCountry="us"
                fullWidth
                error={!!shippingErrors.phone}
                helperText={shippingErrors.phone}
              />
            </Grid>

            <Grid xs={12}>
              <Typography variant="h5" fontWeight={500}>
                Delivery Information
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
                    error={!!shippingErrors.country}
                    helperText={shippingErrors.country}
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
                    error={!!shippingErrors.region}
                    helperText={shippingErrors.region}
                  />
                )}
                openOnFocus
                renderOption={(props, option) => (
                  <Box
                    key={option[0]}
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
                error={!!shippingErrors.city}
                helperText={shippingErrors.city}
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
                error={!!shippingErrors.zipCode}
                helperText={shippingErrors.zipCode}
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
                error={!!shippingErrors.address}
                helperText={shippingErrors.address}
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
            disabled={!isShippingValid}
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
        <Box mt={3}>
          <StripeCheckout
            metadata={{}}
            amount={amount * 100}
            returnUrl={`${getClientUrl()}/checkout`}
            submitText={"Finish Payment"}
            onSuccess={handleStripeSuccess}
            onError={handleStripeError}
            onIntentSuccess={handleStripeIntentSuccess}
            clientSecret={postPaymentIntentData?.clientSecret}
          />
          <Stack flexDirection="row" justifyContent="space-between" mt={3}>
            <Typography variant="h5" fontWeight={500}>
              Total
            </Typography>
            <Typography variant="h5" fontWeight={500}>
              {formattedAmount}
            </Typography>
          </Stack>
        </Box>
      )}

      {activeStep === CheckoutStep.Result && (
        <Box>
          {postOrderSuccess && (
            <Alert severity="success">
              Your order has been placed successfully!
            </Alert>
          )}
          {postOrderError && (
            <Alert severity="error">
              There was an error placing your order.
            </Alert>
          )}
        </Box>
      )}

      {cartLoading && (
        <Stack alignItems="center" width="100%" p={8}>
          <CircularProgress />
        </Stack>
      )}

      {cartError && (
        <Stack alignItems="center" width="100%" p={8}>
          <Typography variant="h5" fontWeight={500}>
            Please Login to Checkout
          </Typography>
          <Link href={`/login?redirect=${window.location.href}`}>
            <Button variant="contained" size="large" sx={{ mt: 2 }}>
              Login
            </Button>
          </Link>
        </Stack>
      )}
    </Box>
  );
};

export default Checkout;
