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
  order: any;
}

export interface UserPaymentMethodsState {
  list: any;
  isLoading: boolean;
}

export interface RegionsState {
  entities: any;
}

export interface TitlesState {
  entities: { [code: string]: any };
}

export interface UserAddressesState {
  list: any[];
  isLoading: boolean;
}

export interface UserDetailsState {
  details: any;
}

export interface UserOrdersState {
  orders: any;
  loading: boolean;
  loaded: boolean;
}
