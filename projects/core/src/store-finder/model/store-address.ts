export interface StoreAddress {
  id?: string;
  defaultAddress: boolean;
  formattedAddress: string;
  line2?: string;
  town: string;
  postalCode: string;
  country: {
    name: string;
    isocode: string;
  };
  region?: {
    name: string;
    isocode: string;
    isocodeShort: string;
  };
}
