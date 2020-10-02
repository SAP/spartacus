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
  id?: string;

  title?: string;
  titleCode?: string;

  email?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;

  line1?: string;
  line2?: string;
  postalCode?: string;
  town?: string;
  region?: Region;
  district?: string;
  country?: Country;
  cellphone?: string;

  defaultAddress?: boolean;
  shippingAddress?: boolean;

  formattedAddress?: string;
  phone?: string;

  visibleInAddressBook?: boolean;
}

export interface AddressValidation {
  decision?: string;
  // TODO: Simplify with converter
  errors?: { errors: ErrorModel[] };
  suggestedAddresses?: Address[];
}
