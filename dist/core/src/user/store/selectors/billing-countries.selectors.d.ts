import { MemoizedSelector } from '@ngrx/store';
import { Country } from '../../../model/address.model';
import { BillingCountriesState, BillingCountryEntities, StateWithUser } from '../user-state';
export declare const getBillingCountriesState: MemoizedSelector<StateWithUser, BillingCountriesState>;
export declare const getBillingCountriesEntites: MemoizedSelector<StateWithUser, BillingCountryEntities>;
export declare const getAllBillingCountries: MemoizedSelector<StateWithUser, Country[]>;
