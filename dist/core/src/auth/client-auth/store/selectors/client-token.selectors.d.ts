import { MemoizedSelector } from '@ngrx/store';
import { LoaderState } from '../../../../state/utils/loader/loader-state';
import { ClientToken } from '../../models/client-token.model';
import { StateWithClientAuth } from '../client-auth-state';
export declare const getClientTokenState: MemoizedSelector<StateWithClientAuth, LoaderState<ClientToken>>;
