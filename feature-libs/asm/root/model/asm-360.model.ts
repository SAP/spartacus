export interface AsmCustomer360Params {
  userId: string;
}

export enum AsmCustomer360Type {
  CUSTOMER_HEADING = 'customerHeading',
  //
  REVIEW_LIST = 'reviewList',
  STORE_LOCATION = 'storeLocation',
}

export interface AdditionalRequestParameters {
  timeout?: number;
}

export interface AsmCustomer360Query {
  customer360Type: AsmCustomer360Type;
  additionalRequestParameters?: AdditionalRequestParameters;
}

export interface AsmCustomer360Review {
  productName: string;
  productCode: string;
  createdAt: string;
  updatedAt: string;
  rating: string;
  reviewStatus: string;
  reviewText: string;
}

export interface AsmCustomer360ReviewList {
  type: AsmCustomer360Type.REVIEW_LIST;
  reviews: Array<AsmCustomer360Review>;
}

export interface AsmCustomer360StoreLocation {
  type: AsmCustomer360Type.STORE_LOCATION;
  address: string;
}

export type AsmCustomer360Data =
  | AsmCustomer360ReviewList
  | AsmCustomer360StoreLocation;

export interface AsmCustomer360Response {
  value: Array<AsmCustomer360Data>;
}
