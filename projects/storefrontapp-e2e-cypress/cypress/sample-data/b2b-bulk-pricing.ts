export const PRODUCT = '2221933';
export const PRODUCT_NO_PRICING = '3881074';
export const TEST_QUANTITY = '31';
export const QUANTITY_FOR_25_DISCOUNT = '100';
export const QUANTITY_FOR_13_DISCOUNT = '99';
export const QUANTITY_FOR_NO_DISCOUNT = '9';
export const QUANTITY_FOR_8_DISCOUNT = '49';
export const QUANTITY_PLUS_ONE = '50';
export const QUANTITY_FOR_3_DISCOUNT = '29';
export const expectedData = [
  {
    quantity: '1 - 9',
    price: '$4.00',
    discount: '0%',
  },
  {
    quantity: '10 - 29',
    price: '$3.89',
    discount: '-3%',
  },
  {
    quantity: '30 - 49',
    price: '$3.69',
    discount: '-8%',
  },
  {
    quantity: '50 - 99',
    price: '$3.49',
    discount: '-13%',
  },
  {
    quantity: '100+',
    price: '$2.99',
    discount: '-25%',
  },
];
