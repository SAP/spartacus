import * as i0 from "@angular/core";
export declare enum StorageSyncType {
    NO_STORAGE = "NO_STORAGE",
    LOCAL_STORAGE = "LOCAL_STORAGE",
    SESSION_STORAGE = "SESSION_STORAGE"
}
export declare enum StateTransferType {
    TRANSFER_STATE = "SSR"
}
export declare abstract class StateConfig {
    state?: {
        ssrTransfer?: {
            keys?: {
                /**
                 * A set of state keys that should be transferred from server.
                 */
                [key: string]: StateTransferType;
            };
        };
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<StateConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StateConfig>;
}
declare module '../../config/config-tokens' {
    interface Config extends StateConfig {
    }
}
