import { Button } from "@mui/material";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useEffect } from "react";
import { usePostPaymentIntentMutation } from "../api/stripe";
import { getClientUrl } from "../api/url";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface StripeCheckoutProps {
  metadata?: any;
  amount: number;
  returnUrl?: string;
  submitText: string;
}

const StripeForm = ({ returnUrl, submitText }: StripeCheckoutProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const cardElement = elements?.getElement(PaymentElement);

    if (!elements || !stripe || !cardElement) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl ? returnUrl : `${getClientUrl()}/checkout`,
      },
    });

    console.log(error);
  };

  console.log("asdkjfnasfd")

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        type="submit"
        disabled={!stripe || !elements}
        variant="contained"
        fullWidth
        sx={{ mt: 4 }}
      >
        {submitText}
      </Button>
    </form>
  );
};

const StripeCheckout = ({
  metadata,
  amount,
  returnUrl,
  submitText,
}: StripeCheckoutProps) => {
  const [
    postPaymentIntent,
    {
      data: postPaymentIntentData,
      isLoading: postPaymentIntentLoading,
      isSuccess: postPaymentIntentSuccess,
    },
  ] = usePostPaymentIntentMutation();

  const clientSecret = postPaymentIntentData?.client_secret;

  useEffect(() => {
    postPaymentIntent({ amount, metadata });
  }, [amount, metadata, postPaymentIntent]);

  if (!clientSecret) return null;

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "night",
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripeForm
        amount={amount}
        returnUrl={returnUrl}
        submitText={submitText}
      />
    </Elements>
  );
};

export default StripeCheckout;
