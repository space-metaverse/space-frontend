import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseURL } from './url'
import { PaymentIntent } from '@stripe/stripe-js'

interface GetMySpacesRequest {
}

interface GetMySpacesResponse {
  entries: Array<{
    attributions: {
      creator: string
    }
    categories: string[]
    commerce_type: string
    description: string
    id: string
    images: {
      preview: {
        url: string
      }
    }
    lobby_count: number
    member_count: number
    name: string
    room_size: number
    scene_id: number
    type: string
    url: string
    user_data: string
    weight: number
  }>
}

interface GetSpaceRequest {
  hubId: string
}

interface GetSpaceResponse {
  allow_promotion: boolean
  business_details: Record<any, any>
  categories: string[]
  commerce_type: string
  created_by: string
  description: string
  hub_id: string
  name: string
  products: any[]
  updated_at: string
  url: string
  screenshot_url: string
}

interface GetShippingZoneRequest {
  hubId: string
}

export interface ShippingZoneType {
  shipping_zone_id?: string
  hub_sid: string
  country: string
  name: string
  rate_name: string
  rate_transit_time: string
  shipping_price: number
  price_conditions: boolean
  order_min_value: number
  order_max_value: number
}

interface PostShippingZoneRequest {
  data: ShippingZoneType
}

interface PostShippingZoneResponse {
  data: {
    data: ShippingZoneType
  }
}

interface PatchShippingZoneRequest {
  data: ShippingZoneType
}

interface PatchShippingZoneResponse {
  data: {
    data: ShippingZoneType
  }
}

interface SpaceOrder {
  amount: number
  created_at: string
  crypto_amount: string
  crypto_payment_from: string
  crypto_payment_to: string
  currency: string
  delivery_type: string
  customer: {
    account_id: number
    address: string
    address_line_two: string
    city: string
    country: string
    customer_sid: string
    email: string
    id: number
    name: string
    state: string
    telephone: string
    zipcode: string
  }
  hub_sid: string
  live_mode: boolean
  order_items: Array<{
    listing_id: string
    minting_links: string[]
    order_type: string
    product: {
      name: string
      product_sid: string
      tax_rate: string
      tax_status: boolean
    }
    product_type: string
    product_variation: {
      barcode: string
      color: string
      dimension: string
      dimension_unit: string
      mint: string
      model_name: string
      model_size: string
      model_url: string
      name: string
      phygital_listing_id: string
      price: string
      product_sid: string
      product_variation_sid: string
      quantity: number
      sale_price: string
      shopify_variation_id: number
      sku: string
      thumbnail_name: string
      thumbnail_size: string
      thumbnail_url: string
      weight: string
      weight_unit: string
    }
    quantity: number
  }>
  order_sid: string
  payment_id: string
  shipping_cost: number
  status: string
  tracking_link: string
  tracking_number: string
  fulfillment_status: string
  shipping_carrier: string
  shipping_email_sent_at: string
  notes: string
}

interface GetSpaceOrdersRequest {
  hubId: string
}

interface GetSpaceOrdersResponse {
  orders: SpaceOrder[]
}

interface PatchFulfilOrderRequest {
  data: {
    order_sid: string
    fulfillment_status: string
    shipping_carrier: string
    shipping_email_sent_at: string
    tracking_link: string
    tracking_number: string
  }
}

interface PatchFulfilOrderResponse {
  message?: string
  ok?: string
}

interface PostOrderNotesRequest {
  data: {
    order_sid: string
    notes: string
  }
}

interface PostOrderNotesResponse {
  message?: string
  ok?: string
}

export interface Event {
  description: string
  end_date: number
  event_sid: string
  featured: true,
  hub_sid: string
  image_url: string
  start_date: number
  title: string
  timeslots: Array<{
    end_date: string
    price: string
    quantity: string
    start_date: string
    timeslot_sid: string
  }>
}

interface GetEventResponse {
  description: string
  end_date: number
  event_sid: string
  featured: boolean
  hub_sid: string
  image_url: string
  start_date: number
  timeslots: Array<{
    end_date: number
    price: number
    quantity: number
    start_date: number
    tickets: any[],
    timeslot_sid: string
  }>
  title: string
}

export interface Room {
  allow_promotion: boolean
  commerce_type: string
  created_by: number
  description?: string
  hub_id: string
  name: string
  screenshot_url: string
  updated_at: string
  url: string
  created_by_username: string
}

interface AddCartItemRequest {
  hub_sid: string
  item: {
    product_variation_sid?: string
    timeslot_sid?: string
  },
  quantity: number
}

interface AddCartItemResponse {
  account_id: string
  item: {
    product_variation_sid?: string
    timeslot_sid?: string
  },
  quantity: number
}

interface GetCartResponse {
  data: Array<{
    id: number
    item: {
      product_variation_sid?: string
      timeslot_sid?: string
    },
    quantity: number
  }>
}

interface DeleteCartItemRequest {
  hub_sid: string
  item: {
    product_variation_sid?: string
    timeslot_sid?: string
  },
  quantity: number
}

interface PostPaymentIntentRequest {
  amount: number
  metadata: {
    type: string
  }
}

interface PostPaymentIntentResponse extends PaymentIntent {
  clientSecret: string
}

interface PostOrderRequest {
  data: {
    account_id: string
    amount: number
    shipping_cost: number
    currency: string
    status: string
    live_mode: boolean
    hub_sid: string
    payment_id: string
    products: Array<{
      product_variation_sid: string
      quantity: number
    }>
    tickets: any[]
  },
  customer: {
    name: string
    address_line_two: string
    country: string
    zipcode: string
    city: string
    state: string
    address: string
    email: string
    telephone: string
  }
}

interface PostOrderResponse {

}

interface PostTicketTimerRequest {
  tickets: string[]
}

interface PostTicketTimerResponse {
  ok: {
    tickets_available: Array<{
      ok: {
        tickets_available: number
        timeslot_sid: string
      },
    }>,
    timers: Array<{
      ok: {
        status: string
        timeslot: string
        users_in_queue: number
      }
    }>
  }
}

export const spaceApi = createApi({
  reducerPath: 'spaceApi',
  baseQuery: fetchBaseQuery({ baseUrl: getBaseURL() }),
  endpoints: (builder) => ({
    getMySpaces: builder.query<GetMySpacesResponse, GetMySpacesRequest>({
      query: () => ({
        url: '/api/v1/media/search?source=rooms&filter=my&cursor=1',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('hubsToken')}`,
          'Content-Type': 'application/json'
        }
      })
    }),
    getSpace: builder.query<GetSpaceResponse, GetSpaceRequest>({
      query: ({ hubId }) => ({
        url: `/api/v1/hubs/?hub_id=${hubId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('hubsToken')}`
        }
      })
    }),
    getShippingZones: builder.query<any, GetShippingZoneRequest>({
      query: ({ hubId }) => ({
        url: `/api/v1/shipping_zones?hub_sid=${hubId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('hubsToken')}`
        }
      })
    }),
    postShippingZone: builder.mutation<PostShippingZoneResponse, PostShippingZoneRequest>({
      query: (body) => ({
        url: `/api/v1/shipping_zone`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('hubsToken')}`
        },
        body
      })
    }),
    patchShippingZone: builder.mutation<PatchShippingZoneResponse, PatchShippingZoneRequest>({
      query: (body) => ({
        url: `/api/v1/shipping_zone`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('hubsToken')}`
        },
        body
      })
    }),
    deleteShippingZone: builder.mutation<any, { shippingZoneId: string }>({
      query: ({ shippingZoneId }) => ({
        url: `/api/v1/shipping_zone?shipping_zone_id=${shippingZoneId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('hubsToken')}`
        }
      })
    }),
    getSpaceOrders: builder.query<GetSpaceOrdersResponse, GetSpaceOrdersRequest>({
      query: ({ hubId }) => ({
        url: `/api/v1/orders/?hub_id=${hubId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('hubsToken')}`
        }
      })
    }),
    patchFullfilOrder: builder.mutation<PatchFulfilOrderResponse, PatchFulfilOrderRequest>({
      query: (body) => ({
        url: '/api/v1/fulfill_order',
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('hubsToken')}`
        }
      })
    }),
    postOrderNotes: builder.mutation<PostOrderNotesResponse, PostOrderNotesRequest>({
      query: (body) => ({
        url: '/api/v1/dynamical_pandora_box',
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('hubsToken')}`
        }
      })
    }),
    getOrdersCount: builder.query<{ unfulfilled_order_count: number }, { hubId: string }>({
      query: ({ hubId }) => ({
        url: `/api/v1/count_orders_unfulfilled/?hub_id=${hubId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('hubsToken')}`
        }
      })
    }),
    getAllEvents: builder.query<{ data: Event[] }, {}>({
      query: () => ({
        url: `/api/v1/all_events`,
        method: 'GET',
      })
    }),
    getAllRooms: builder.query<{ data: Room[] }, {}>({
      query: () => ({
        url: `/api/v1/all_rooms`,
        method: 'GET',
      })
    }),
    getEvent: builder.query<GetEventResponse, { event_sid: string }>({
      query: ({ event_sid }) => ({
        url: `/api/v1/event_with_timeslots_and_tickets?event_sid=${event_sid}`,
        method: 'GET',
      })
    }),
    getAllProducts: builder.query<any, {}>({
      query: () => ({
        url: `api/v1/all_products`,
        method: 'GET',
      })
    }),
    addCartItem: builder.mutation<AddCartItemResponse, AddCartItemRequest>({
      query: (body) => ({
        url: `/api/v1/cart_items/add`,
        method: 'POST',
        body: {
          ...body,
          account_id: window.localStorage.getItem('accountId') as string
        }
      })
    }),
    getCartItems: builder.query<GetCartResponse, {}>({
      query: () => ({
        url: `api/v1/cart_items/all_hubs?account_id=${window.localStorage.getItem('accountId') as string}`,
        method: 'GET',
      })
    }),
    deleteCartItem: builder.mutation<any, DeleteCartItemRequest>({
      query: (body) => ({
        url: `api/v1/cart_items/subtract`,
        method: 'POST',
        body: {
          ...body,
          account_id: window.localStorage.getItem('accountId') as string
        }
      })
    }),
    getProduct: builder.query<any, { productId: string }>({
      query: ({ productId }) => ({
        url: `api/v1/product_variation?product_variation_sid=${productId}`,
        method: 'GET',
      })
    }),
    getTicket: builder.query<any, { timeslotId: string }>({
      query: ({ timeslotId }) => ({
        url: `api/v1/timeslot?timeslot_sid=${timeslotId}`,
        method: 'GET',
      })
    }),
    postPaymentIntent: builder.mutation<PostPaymentIntentResponse, PostPaymentIntentRequest>({
      query: (body) => ({
        url: `/api/v1/immers_create_payment_intent`,
        method: 'POST',
        body: {
          ...body,
          metadata: {
            ...body.metadata,
            account_id: window.localStorage.getItem('accountId') as string,
          }
        }
      })
    }),
    postOrder: builder.mutation<PostOrderResponse, PostOrderRequest>({
      query: (body) => ({
        url: `/api/v1/orders`,
        method: 'POST',
        body,
      })
    }),
    getEventsBySpace: builder.query<any, { hubId: string }>({
      query: ({ hubId }) => ({
        url: `api/v1/all_events_for_hub?hub_sid=${hubId}`,
        method: 'GET',
      })
    }),
    postTicketTimer: builder.mutation<PostTicketTimerResponse, PostTicketTimerRequest>({
      query: (body) => ({
        url: `/api/v1/new_ticket/ticket_purchase_timer_init`,
        method: 'POST',
        body: {
          ...body,
          account_id: window.localStorage.getItem('accountId') as string
        }
      })
    }),
  })
})

export const {
  useGetMySpacesQuery,
  useGetSpaceQuery,
  useGetShippingZonesQuery,
  usePostShippingZoneMutation,
  usePatchShippingZoneMutation,
  useDeleteShippingZoneMutation,
  useGetSpaceOrdersQuery,
  usePatchFullfilOrderMutation,
  usePostOrderNotesMutation,
  useGetOrdersCountQuery,
  useGetAllEventsQuery,
  useGetAllRoomsQuery,
  useGetEventQuery,
  useGetAllProductsQuery,
  useAddCartItemMutation,
  useGetCartItemsQuery,
  useLazyGetProductQuery,
  useGetProductQuery,
  useDeleteCartItemMutation,
  usePostPaymentIntentMutation,
  usePostOrderMutation,
  useGetTicketQuery,
  useLazyGetTicketQuery,
  useGetEventsBySpaceQuery,
  usePostTicketTimerMutation
} = spaceApi
