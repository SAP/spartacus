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

export interface StateWithUser {
  [USER_FEATURE]: UserState;
}

export interface UserState {
  account: UserDetailsState;
  addresses: UserAddressesState;
  billingCountries: BillingCountriesState;
  countries: DeliveryCountriesState;
  payments: UserPaymentMethodsState;
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
  isLoading: boolean;
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
  isLoading: boolean;
  isActionProcessing: boolean;
}

export interface UserDetailsState {
  details: User;
}

export interface UserOrdersState {
  orders: OrderHistoryList;
}
