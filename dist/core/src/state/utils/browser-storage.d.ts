import { WindowRef } from '../../window/window-ref';
import { StorageSyncType } from '../config/state-config';
export declare function getStorage(storageType: StorageSyncType, winRef: WindowRef): Storage | undefined;
export declare function persistToStorage(configKey: string, value: any, storage: Storage): void;
export declare function readFromStorage(storage: Storage, key: string): unknown;
export declare function isSsr(storage: Storage): boolean;
