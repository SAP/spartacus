import { OccConfig } from '../../config/occ-config';

export const defaultOccUserConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        // tslint:disable:max-line-length
        user: 'users/${userId}',
        userRegister: 'users',
        userForgotPassword: 'forgottenpasswordtokens',
        userResetPassword: 'resetpassword',
        userUpdateLoginId: 'users/${userId}/login',
        userUpdatePassword: 'users/${userId}/password',
        titles: 'titles',
        paymentDetailsAll: 'users/${userId}/paymentdetails',
        paymentDetail: 'users/${userId}/paymentdetails/${paymentDetailId}',
        orderHistory: 'users/${userId}/orders',
        orderDetail: 'users/${userId}/orders/${orderId}?fields=FULL',
        anonymousConsentTemplates: 'users/anonymous/consenttemplates',
        consentTemplates: 'users/${userId}/consenttemplates',
        consents: 'users/${userId}/consents',
        consentDetail: 'users/${userId}/consents/${consentId}',
        addresses: 'users/${userId}/addresses',
        addressDetail: 'users/${userId}/addresses/${addressId}',
        addressVerification: 'users/${userId}/addresses/verification',
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
        cancelOrder: 'users/${userId}/orders/${orderId}/cancellation',
        returnOrder:
          'users/${userId}/orderReturns?fields=BASIC,returnEntries(BASIC,refundAmount(formattedValue),orderEntry(basePrice(formattedValue),product(name,code,baseOptions,images(DEFAULT,galleryIndex)))),deliveryCost(formattedValue),totalPrice(formattedValue),subTotal(formattedValue)',
        orderReturns: 'users/${userId}/orderReturns?fields=BASIC',
        orderReturnDetail:
          'users/${userId}/orderReturns/${returnRequestCode}?fields=BASIC,returnEntries(BASIC,refundAmount(formattedValue),orderEntry(basePrice(formattedValue),product(name,code,baseOptions,images(DEFAULT,galleryIndex)))),deliveryCost(formattedValue),totalPrice(formattedValue),subTotal(formattedValue)',
        cancelReturn: 'users/${userId}/orderReturns/${returnRequestCode}',
        // tslint:enable
      },
    },
  },
};
