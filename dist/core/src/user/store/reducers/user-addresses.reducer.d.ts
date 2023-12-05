import { Address } from '../../../model/address.model';
import { UserActions } from '../actions/index';
export declare const initialState: Address[];
export declare function reducer(state: Address[] | undefined, action: UserActions.UserAddressesAction): Address[];
