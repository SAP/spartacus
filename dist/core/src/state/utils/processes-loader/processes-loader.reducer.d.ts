import { Action } from '@ngrx/store';
import { ProcessesLoaderState } from './processes-loader-state';
import { ProcessesLoaderAction } from './processes-loader.action';
export declare const initialProcessesState: ProcessesLoaderState<any>;
/**
 * Higher order reducer that adds processes count
 */
export declare function processesLoaderReducer<T>(entityType: string, reducer?: (state: T | undefined, action: Action) => T): (state: ProcessesLoaderState<T>, action: ProcessesLoaderAction) => ProcessesLoaderState<T>;
