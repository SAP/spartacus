import { AccountData } from '../support/require-logged-in.commands';
import {
  SampleCartProduct,
  SampleNonPurchasableProduct,
  SampleProduct,
  SampleUser,
  user,
} from './checkout-flow';

export const POWERTOOLS_BASESITE = 'powertools-spa';
export const USER_REQUEST_ENDPOINT = 'orgUsers';
export const ORDER_REQUEST_ENDPOINT = 'replenishmentOrders';
export const poNumber = '123';
export const costCenter = 'PunchOut Organization';
export const b2bUnit = 'PunchOut Organization';
export const replenishmentDay = '8';
export const replenishmentDate = '2100-01-01';
export const convertedReplenishmentDate = 'Jan 01 2100';

export const b2bProduct: SampleProduct = {
  name: 'Cordless screwdriver 2436',
  code: '3881074',
};

export const b2bProduct2: SampleProduct = {
  name: '6 Inch Nylon Cable Ties 100-Pack',
  code: '1128763',
};

export const b2bNonPurchasableProduct: SampleNonPurchasableProduct = {
  name: 'Expertise Hiker Steel Toe',
  code: '50500000',
  multidimensional: true,
};

export const b2bProducts: SampleProduct[] = [
  {
    name: 'Impact Drill RT-ID 105',
    code: '3879444',
  },
  {
    name: 'Angle Grinder RT-AG 230',
    code: '3881016',
  },
  {
    name: 'PMF 180 E',
    code: '4567130',
  },
  {
    name: 'PC Service Set Professional',
    code: '3803058',
  },
  {
    name: 'Measuring cylinders',
    code: '2222485',
  },
  {
    name: 'Laboratory Bottle',
    code: '2221933',
  },
  {
    name: 'Professional Network Installer Tool Kit',
    code: '1128762',
  },
  {
    name: 'Quick-Loader multibit screwdriver',
    code: '3865614',
  },
  {
    name: 'UTP / FTP / Coax cable-stripper',
    code: '3864748',
  },
  {
    name: 'GEX 125-1 AE',
    code: '4567174',
  },
];

export const cartWithB2bProduct: SampleCartProduct = {
  estimatedShipping: '$9.99',
  total: '$35.00',
  totalAndShipping: '$44.99',
};

export const b2bAccountShipToUser: SampleUser = {
  email: 'powertools-test-user-with-orders@sap.cx.com',
  password: 'pw4all',
  fullName: 'PunchOut Customer',
  address: {
    city: 'Chicago',
    line1: '999 South Wacker Drive',
  },
};

export const products: SampleProduct[] = [b2bProduct, b2bProduct2];

export const b2bUser: AccountData = {
  user: 'b2bUser',
  registrationData: {
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
    titleCode: 'mr',
  },
};

export const order_type = {
  PLACE_ORDER: 'PLACE_ORDER',
  SCHEDULE_REPLENISHMENT: 'SCHEDULE_REPLENISHMENT_ORDER',
};

export const recurrencePeriod = {
  MONTHLY: 'MONTHLY',
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
};

export enum DaysOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export const recurrencePeriodMap = new Map<string, string>([
  [recurrencePeriod.DAILY, 'days'],
  [recurrencePeriod.WEEKLY, 'week'],
  [recurrencePeriod.MONTHLY, 'month'],
]);
