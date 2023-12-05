import { StateKey, TransferState } from '@angular/platform-browser';
import { AuthStatePersistenceService } from '../../auth/user-auth/services/auth-state-persistence.service';
import { StateConfig, StateTransferType } from '../config/state-config';
export declare const CX_KEY: StateKey<string>;
export declare function getTransferStateReducer(platformId: Object, transferState?: TransferState, config?: StateConfig, authStatePersistenceService?: AuthStatePersistenceService): (reducer: any) => any;
export declare function getServerTransferStateReducer(transferState: TransferState, keys: {
    [key: string]: StateTransferType;
}): (reducer: any) => (state: any, action: any) => any;
export declare function getBrowserTransferStateReducer(transferState: TransferState, keys: {
    [key: string]: StateTransferType;
}, isLoggedIn: boolean): (reducer: any) => (state: any, action: any) => any;
