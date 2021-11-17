import { OccConfig } from '../../config/occ-config';

export const defaultOccUserConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        /* eslint-disable max-len */
        paymentDetailsAll: 'users/${userId}/paymentdetails',
        paymentDetail: 'users/${userId}/paymentdetails/${paymentDetailId}',
        /** @deprecated since 4.2, use order lib instead */
        orderHistory: 'users/${userId}/orders',
        /** @deprecated since 4.2, use order lib instead */
        orderDetail: 'users/${userId}/orders/${orderId}?fields=FULL',
        anonymousConsentTemplates: 'users/anonymous/consenttemplates',
        consentTemplates: 'users/${userId}/consenttemplates',
        consents: 'users/${userId}/consents',
        consentDetail: 'users/${userId}/consents/${consentId}',
        addresses: 'users/${userId}/addresses',
        addressDetail: 'users/${userId}/addresses/${addressId}',
        addressVerification: 'users/${userId}/addresses/verification',
        /** @deprecated since 4.2, use order lib instead */
        consignmentTracking:
          'users/${userId}/orders/${orderCode}/consignments/${consignmentCode}/tracking',
        customerCoupons: 'users/${userId}/customercoupons',
        claimCoupon: 'users/${userId}/customercoupons/${couponCode}/claim',
        couponNotification:
          'users/${userId}/customercoupons/${couponCode}/notification',
        notificationPreference: 'users/${userId}/notificationpreferences',
        productInterests: 'users/${userId}/productinterests',
        getProductInterests:
          'users/${userId}/productinterests?fields=sorts,pagination,results(productInterestEntry,product(code))',
        /** @deprecated since 4.2, use order lib instead */
        cancelOrder: 'users/${userId}/orders/${orderId}/cancellation',
        /** @deprecated since 4.2, use order lib instead */
        returnOrder:
          'users/${userId}/orderReturns?fields=BASIC,returnEntries(BASIC,refundAmount(formattedValue),orderEntry(basePrice(formattedValue),product(name,code,baseOptions,images(DEFAULT,galleryIndex)))),deliveryCost(formattedValue),totalPrice(formattedValue),subTotal(formattedValue)',
        /** @deprecated since 4.2, use order lib instead */
        orderReturns: 'users/${userId}/orderReturns?fields=BASIC',
        /** @deprecated since 4.2, use order lib instead */
        orderReturnDetail:
          'users/${userId}/orderReturns/${returnRequestCode}?fields=BASIC,returnEntries(BASIC,refundAmount(formattedValue),orderEntry(basePrice(formattedValue),product(name,code,baseOptions,images(DEFAULT,galleryIndex)))),deliveryCost(formattedValue),totalPrice(formattedValue),subTotal(formattedValue)',
        /** @deprecated since 4.2, use order lib instead */
        cancelReturn: 'users/${userId}/orderReturns/${returnRequestCode}',
        /* eslint-enable */
      },
    },
  },
};
