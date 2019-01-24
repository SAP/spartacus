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
  addresses: LoaderState<UserAddressesState>;
  billingCountries: BillingCountriesState;
  countries: DeliveryCountriesState;
  payments: LoaderState<UserPaymentMethodsState>;
  orders: LoaderState<UserOrdersState>;
  order: OrderDetailsState;
  titles: TitlesState;
  regions: RegionsState;
}

export interface OrderDetailsState {
  order: Order;
}

export interface UserPaymentMethodsState {
  list: PaymentDetails[];
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

export interface UserAddressesState {
  list: Address[];
  isActionProcessing: boolean;
}

export interface UserDetailsState {
  details: User;
}

export interface UserOrdersState {
  orders: OrderHistoryList;
}
