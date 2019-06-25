export const cart = {
  cartDetails: {
    id: 'ID',
    proceedToCheckout: 'Proceed to Checkout',
    cartName: 'Cart #{{code}}',
  },
  cartItems: {
    id: 'ID',
    description: 'Description',
    item: 'Item',
    itemPrice: 'Item price',
    quantity: 'Qty',
    quantityTitle:
      'The quantity represents the total number of this item in your cart.',
    total: 'Total',
    cartTotal: 'Cart total ({{count}} item)',
    cartTotal_plural: 'Cart total ({{count}} items)',
  },
  orderCost: {
    orderSummary: 'Order Summary',
    subtotal: 'Subtotal:',
    estimatedShipping: 'Estimated shipping:',
    discount: 'Discount:',
    salesTax: 'Sales Tax:',
    total: 'Total:',
  },
  miniCart: {
    item: '{{count}} item currently in your cart',
    item_plural: '{{count}} items currently in your cart',
  },
  voucher: {
    coupon: 'Coupons:',
    apply: 'Apply',
    couponLabel: 'Coupon',
    placeholder: 'Enter coupon code',
    applyVoucherSuccess: '{{voucherCode}} has been applied.',
    removeVoucherSuccess: '{{voucherCode}} has been removed.',
    anchor: {
      vouchers: 'COUPON APPLIED: {{count}}',
      vouchers_plural: 'COUPONS APPLIED: {{count}}',
      noVouchers: 'ENTER COUPON CODE',
      tips: 'You can enter your coupon codes in the Coupon field.',
    },
  },
};
