import { StateTransferType, StorageSyncType } from '../config/state-config';
export declare function getStateSliceValue<T, E>(keys: string, state: T): E;
export declare function createShellObject<T, E>(key: string, excludeKeys: string[], value: T): E;
export declare function getStateSlice<T, E>(keys: string[], excludeKeys: string[], state: T): E;
export declare function handleExclusions(key: string, excludeKeys: string[], value: any): any;
export declare function getExclusionKeys(key: string, excludeKeys: string[]): string[];
export declare function filterKeysByType(keys: {
    [key: string]: StorageSyncType | StateTransferType;
}, type: StorageSyncType | StateTransferType): string[];
