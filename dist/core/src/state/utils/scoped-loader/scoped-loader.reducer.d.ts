import { Action } from '@ngrx/store';
import { EntityScopedLoaderAction } from '../../../product/store/actions/product.action';
import { ScopedLoaderState } from './scoped-loader.state';
export declare const initialScopedLoaderState: ScopedLoaderState<any>;
/**
 * Higher order reducer designed to add scope support for loader reducer
 *
 * @param entityType
 * @param reducer
 */
export declare function scopedLoaderReducer<T>(entityType: string, reducer?: (state: T | undefined, action: Action) => T): (state: ScopedLoaderState<T>, action: EntityScopedLoaderAction) => ScopedLoaderState<T>;
