import {
  Address,
  PaymentDetails,
  OrderHistoryList,
  User,
  Region,
  Order
} from '../../occ/occ-models/occ.models';

export const USER_FEATURE = 'user';

export interface StateWithUser {
  [USER_FEATURE]: UserState;
}

export interface DeliveryCountriesState {
  entities: { [isocode: string]: any };
}

export interface UserState {
  account: UserDetailsState;
  addresses: UserAddressesState;
  countries: DeliveryCountriesState;
  payments: UserPaymentMethodsState;
  orders: UserOrdersState;
  order: OrderDetailsState;
  titles: TitlesState;
  regions: RegionsState;
}

export interface OrderDetailsState {
  order: Order;
}

export interface UserPaymentMethodsState {
  list: PaymentDetails[];
  isLoading: boolean;
}

export interface RegionsState {
  entities: Region[];
}

export interface TitlesState {
  entities: { [code: string]: any };
}

export interface UserAddressesState {
  list: Address[];
  isLoading: boolean;
  isActionProcessing: boolean;
}

export interface UserDetailsState {
  details: User;
}

export interface UserOrdersState {
  orders: OrderHistoryList;
  loading: boolean;
  loaded: boolean;
}
