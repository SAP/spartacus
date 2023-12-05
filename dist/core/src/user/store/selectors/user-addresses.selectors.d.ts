import { MemoizedSelector } from '@ngrx/store';
import { Address } from '../../../model/address.model';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { StateWithUser } from '../user-state';
export declare const getAddressesLoaderState: MemoizedSelector<StateWithUser, LoaderState<Address[]>>;
export declare const getAddresses: MemoizedSelector<StateWithUser, Address[]>;
export declare const getAddressesLoading: MemoizedSelector<StateWithUser, boolean>;
export declare const getAddressesLoadedSuccess: MemoizedSelector<StateWithUser, boolean>;
