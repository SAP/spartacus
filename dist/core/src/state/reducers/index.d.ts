import { InjectionToken, Provider } from '@angular/core';
export { getStateSlice } from '../utils/get-state-slice';
export * from './transfer-state.reducer';
export declare const TRANSFER_STATE_META_REDUCER: InjectionToken<unknown>;
export declare const stateMetaReducers: Provider[];
