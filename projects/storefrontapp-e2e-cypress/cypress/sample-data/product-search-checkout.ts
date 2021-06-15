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
    total: '$86.37',
    totalAndShipping: '$98.36',
  },
];

export const products: SampleProduct[] = [
  { name: 'DSC-N1', code: '358639' },
  { name: 'Digital Camera Tripod', code: '932577' },
  { name: 'QuickCam for Notebooks Pro', code: '479742' },
];
