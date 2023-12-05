import { UserActions } from '../actions/index';
import { DeliveryCountriesState } from '../user-state';
export declare const initialState: DeliveryCountriesState;
export declare function reducer(state: DeliveryCountriesState | undefined, action: UserActions.DeliveryCountriesAction | UserActions.ClearUserMiscsData): DeliveryCountriesState;
