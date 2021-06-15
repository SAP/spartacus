import { SampleCartProduct, SampleProduct } from './checkout-flow';

export const carts: SampleCartProduct[] = [
  {
    estimatedShipping: '11.99',
    total: '$465.57',
    totalAndShipping: '$963.13',
  },
  {
    estimatedShipping: '11.99',
    total: '$24.47',
    totalAndShipping: '$36.46',
  },
  {
    estimatedShipping: '11.99',
    total: '$79.11',
    totalAndShipping: '$91.10',
  },
];

export const products: SampleProduct[] = [
  { name: 'DSC-N1', code: '358639' },
  { name: 'Digital Camera Tripod', code: '932577' },
  { name: 'Micro Webcam', code: '1377492' },
];
