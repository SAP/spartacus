import {
  StorefrontConfig,
  CheckoutStepType,
  DeliveryModePreferences,
} from '@spartacus/storefront';
import { environment } from '../environments/environment';
import { translationChunksConfig, translations } from '@spartacus/assets';

export const b2bConfig: StorefrontConfig = {
  backend: {
    occ: {
      baseUrl: environment.occBaseUrl,
      legacy: false,
      endpoints: {
        addEntries: 'orgUsers/${userId}/carts/${cartId}/entries',
        user: 'orgUsers/${userId}',
      },
    },
  },
  context: {
    urlParameters: ['baseSite', 'language', 'currency'],
    baseSite: ['powertools-spa'],
  },

  // custom routing configuration for e2e testing
  routing: {
    routes: {
      product: {
        paths: ['product/:productCode/:name', 'product/:productCode'],
      },
    },
  },
  // we bring in static translations to be up and running soon right away
  i18n: {
    resources: translations,
    chunks: translationChunksConfig,
    fallbackLang: 'en',
  },

  checkout: {
    steps: [
      {
        id: 'paymentType',
        name: 'checkoutProgress.paymentType',
        routeName: 'checkoutPaymentType',
        type: [CheckoutStepType.PAYMENT_TYPES],
      },
      {
        id: 'shippingAddress',
        name: 'checkoutProgress.shippingAddress',
        routeName: 'checkoutShippingAddress',
        type: [CheckoutStepType.SHIPPING_ADDRESS],
      },
      {
        id: 'deliveryMode',
        name: 'checkoutProgress.deliveryMode',
        routeName: 'checkoutDeliveryMode',
        type: [CheckoutStepType.DELIVERY_MODE],
      },
      {
        id: 'paymentDetails',
        name: 'checkoutProgress.paymentDetails',
        routeName: 'checkoutPaymentDetails',
        type: [CheckoutStepType.PAYMENT_DETAILS],
      },
      {
        id: 'reviewOrder',
        name: 'checkoutProgress.reviewOrder',
        routeName: 'checkoutReviewOrder',
        type: [CheckoutStepType.REVIEW_ORDER],
      },
    ],
    express: false,
    defaultDeliveryMode: [DeliveryModePreferences.FREE],
    guest: false,
  },

  features: {
    level: '1.5',
  },
};
