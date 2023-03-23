import { country } from './country';

export interface shippingAddress {
  country: country;
  defaultAddress: boolean;
  formattedAddress: String;
  id: String;
  line2: String;
  phone: String;
  postalCode: String;
  town: String;
}
