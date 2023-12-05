import { Action } from '@ngrx/store';
import { LoaderState } from './loader-state';
import { LoaderAction } from './loader.action';
export declare const initialLoaderState: LoaderState<any>;
/**
 * Higher order reducer that adds generic loading flag to chunk of the state
 *
 * Utilizes "loader" meta field of actions to set specific flags for specific
 * action (LOAD, SUCCESS, FAIL, RESET)
 */
export declare function loaderReducer<T, V extends Action = Action>(entityType: string, reducer?: (state: T | undefined, action: Action | V) => T | undefined): (state: LoaderState<T> | undefined, action: LoaderAction) => LoaderState<T>;
