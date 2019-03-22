import { LoaderState } from '../../state';
import {
  Address,
  PaymentDetails,
  OrderHistoryList,
  User,
  Region,
  Order,
  Country,
  Title
} from '../../occ/occ-models/index';

export const USER_FEATURE = 'user';
export const USER_PAYMENT_METHODS = '[User] User Payment Methods';
export const USER_ORDERS = '[User] User Orders';
export const USER_ADDRESSES = '[User] User Addresses';

export interface StateWithUser {
  [USER_FEATURE]: UserState;
}

export interface UserState {
  account: UserDetailsState;
  addresses: LoaderState<Address[]>;
  billingCountries: BillingCountriesState;
  countries: DeliveryCountriesState;
  payments: LoaderState<PaymentDetails[]>;
  orders: LoaderState<OrderHistoryList>;
  order: OrderDetailsState;
  titles: TitlesState;
  regions: RegionsState;
  resetPassword: boolean;
}

export interface OrderDetailsState {
  order: Order;
}

export interface RegionsState {
  entities: Region[];
}

export interface BillingCountryEntities {
  [key: string]: Country;
}

export interface BillingCountriesState {
  entities: BillingCountryEntities;
}

export interface DeliveryCountryEntities {
  [key: string]: Country;
}

export interface DeliveryCountriesState {
  entities: DeliveryCountryEntities;
}

export interface TitleEntities {
  [key: string]: Title;
}

export interface TitlesState {
  entities: TitleEntities;
}

export interface UserDetailsState {
  details: User;
}
