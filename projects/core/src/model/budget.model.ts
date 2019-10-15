import { Occ } from '../occ/occ-models/occ.models';

export interface Budget {
  active: boolean;
  budget: number;
  code: string;
  currency: Occ.Currency;
  endDate: string;
  startDate: string;
  name: string;
  orgUnit?: OrgUnit;
  costCenters?: CostCenter[];
}

export interface OrgUnit {
  uid: string;
  name: string;
  addresses?: Address[];
}

export interface CostCenter {
  active: string;
  code: string;
  name: string;
  originalCode: string;
  unit?: OrgUnit;
}

export interface Address {
  cellphone: string;
  companyName: string;
  country: {
    isocode: string;
    name: string;
  };
  defaultAddress: true;
  district: string;
  email: string;
  firstName: string;
  formattedAddress: string;
  id: string;
  lastName: string;
  line1: string;
  line2: string;
  phone: string;
  postalCode: string;
  region: {
    countryIso: string;
    isocode: string;
    isocodeShort: string;
    name: string;
  };
  shippingAddress: true;
  title: string;
  titleCode: string;
  town: string;
  visibleInAddressBook: true;
}
