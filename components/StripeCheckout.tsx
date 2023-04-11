import { Button } from "@mui/material";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import {
  loadStripe,
  PaymentIntent,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import { useEffect } from "react";
import { usePostPaymentIntentMutation } from "../api/space";
import { getClientUrl } from "../api/url";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface StripeCheckoutProps {
  metadata?: any;
  amount: number;
  returnUrl?: string;
  submitText: string;
  onSuccess?: (paymentIntent: PaymentIntent) => void;
  onError?: (error: any) => void;
}

const StripeForm = ({
  returnUrl,
  submitText,
  onSuccess,
  onError,
}: StripeCheckoutProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const cardElement = elements?.getElement(PaymentElement);

    if (!elements || !stripe || !cardElement) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl
          ? returnUrl
          : `${getClientUrl()}/checkout/success`,
      },
      redirect: "if_required",
    });

    if (!error) {
      onSuccess && onSuccess(paymentIntent);
      return;
    } else {
      onError && onError(error);
      console.log(error);
    }

    console.log(error, paymentIntent);
  };

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
  onSuccess,
  onError,
}: StripeCheckoutProps) => {
  const [
    postPaymentIntent,
    {
      data: postPaymentIntentData,
      isLoading: postPaymentIntentLoading,
      isSuccess: postPaymentIntentSuccess,
    },
  ] = usePostPaymentIntentMutation();

  const clientSecret = postPaymentIntentData?.clientSecret;

  useEffect(() => {
    postPaymentIntent({ amount, metadata });
  }, [amount, metadata, postPaymentIntent]);

  if (!clientSecret) return null;

  const options: StripeElementsOptions = {
    clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripeForm
        amount={amount}
        returnUrl={returnUrl}
        submitText={submitText}
        onError={onError}
        onSuccess={onSuccess}
      />
    </Elements>
  );
};

export default StripeCheckout;
