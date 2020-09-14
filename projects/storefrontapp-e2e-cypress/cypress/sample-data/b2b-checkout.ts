import { AccountData } from '../support/require-logged-in.commands';
import {
  SampleCartProduct,
  SampleProduct,
  SimpleUser,
  user,
} from './checkout-flow';

export const POWERTOOLS_BASESITE = 'powertools-spa';
export const POWERTOOLS_DEFAULT_DELIVERY_MODE = 'deliveryMode-standard-net';
export const poNumber = '123';
export const costCenter = 'PunchOut Organization';
export const b2bUnit = 'PunchOut Organization';
export const b2bProduct: SampleProduct = {
  name: 'Cordless screwdriver 2436',
  code: '3881074',
};

export const cartWithB2bProduct: SampleCartProduct = {
  estimatedShipping: '$9.99',
  total: '$35.00',
  totalAndShipping: '$44.99',
};

export const b2bAccountShipToUser: SimpleUser = {
  fullName: 'PunchOut Customer',
  address: {
    city: 'Chicago',
    line1: '999 South Wacker Drive',
  },
};

export const products: SampleProduct[] = [b2bProduct];

export const b2bUser: AccountData = {
  user: 'b2bUser',
  registrationData: {
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
    titleCode: 'mr',
  },
};
