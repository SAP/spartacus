import { UserActions } from '../actions/index';
import { BillingCountriesState } from '../user-state';
export declare const initialState: BillingCountriesState;
export declare function reducer(state: BillingCountriesState | undefined, action: UserActions.BillingCountriesAction | UserActions.ClearUserMiscsData): BillingCountriesState;
