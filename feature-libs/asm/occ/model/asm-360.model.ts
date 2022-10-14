import {
  AsmCustomer360ReviewList,
  AsmCustomer360StoreLocation,
} from '@spartacus/asm/root';

export interface OccAsmCustomer360Params {
  userId: string;
}

export enum OccAsmCustomer360Type {
  REVIEW_LIST = 'C360ReviewList',
  STORE_LOCATION = 'C360StoreLocation',
}

export interface AdditionalRequestParameters {
  timeout?: number;
}

export interface OccAsmCustomer360Query {
  customer360Type: OccAsmCustomer360Type;
  additionalRequestParameters?: AdditionalRequestParameters;
}

export interface OccAsmCustomer360Request {
  queries: Array<OccAsmCustomer360Query>;
  options?: OccAsmCustomer360Params;
}

export interface OccAsmCustomer360ReviewList extends AsmCustomer360ReviewList {
  type: OccAsmCustomer360Type.REVIEW_LIST;
}

export interface OccAsmCustomer360StoreLocation
  extends AsmCustomer360StoreLocation {
  type: OccAsmCustomer360Type.STORE_LOCATION;
}

export type OccAsmCustomer360Data =
  | OccAsmCustomer360ReviewList
  | OccAsmCustomer360StoreLocation;

export interface OccAsmCustomer360Response {
  value: Array<OccAsmCustomer360Data>;
}
