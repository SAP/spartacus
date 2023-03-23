import { entries } from './entries';
import { shippingAddress } from './shippingAddress';

export interface consignments {
  code: string;
  shippingAddress: shippingAddress;
  status: string;
  statusDisplay: string;
  entries: entries[];
}
