import { MemoizedSelector } from '@ngrx/store';
import { Country } from '../../../model/address.model';
import { DeliveryCountriesState, DeliveryCountryEntities, StateWithUser } from '../user-state';
export declare const getDeliveryCountriesState: MemoizedSelector<StateWithUser, DeliveryCountriesState>;
export declare const getDeliveryCountriesEntites: MemoizedSelector<StateWithUser, DeliveryCountryEntities>;
export declare const getAllDeliveryCountries: MemoizedSelector<StateWithUser, Country[]>;
export declare const countrySelectorFactory: (isocode: string) => MemoizedSelector<StateWithUser, Country | null>;
