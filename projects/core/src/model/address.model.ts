import { ErrorModel } from './misc.model';

export interface Country {
  isocode?: string;
  name?: string;
}

export enum CountryType {
  BILLING = 'BILLING',
  SHIPPING = 'SHIPPING',
}

export interface Region {
  countryIso?: string;
  isocode?: string;
  isocodeShort?: string;
  name?: string;
}

export interface Address {
  companyName?: string;
  country?: Country;
  defaultAddress?: boolean;
  email?: string;
  firstName?: string;
  formattedAddress?: string;
  id?: string;
  lastName?: string;
  line1?: string;
  line2?: string;
  phone?: string;
  postalCode?: string;
  region?: Region;
  shippingAddress?: boolean;
  title?: string;
  titleCode?: string;
  town?: string;
  visibleInAddressBook?: boolean;
}

export interface AddressValidation {
  decision?: string;
  // TODO: Simplify with converter
  errors?: { errors: ErrorModel[] };
  suggestedAddresses?: Address[];
}
