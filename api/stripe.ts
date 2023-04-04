import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { PaymentIntent } from '@stripe/stripe-js'
import { getImmersURL } from './url'

interface PostPaymentIntentRequest {
  amount: number
  metadata: {
    type: string
  }
}

interface PostPaymentIntentResponse extends PaymentIntent {

}

export const stripeApi = createApi({
  reducerPath: 'stripeApi',
  baseQuery: fetchBaseQuery({ baseUrl: getImmersURL() }),
  endpoints: (builder) => ({
    postPaymentIntent: builder.mutation<PostPaymentIntentResponse, PostPaymentIntentRequest>({
      query: (body) => ({
        url: `/create-payment-intent`,
        method: 'POST',
        body,
      })
    }),
  })
})

export const {
  usePostPaymentIntentMutation,
} = stripeApi
