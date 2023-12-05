import { LoaderAction } from '../loader/loader.action';
import { EntityScopedLoaderActions } from './entity-scoped-loader.actions';
import { EntityScopedLoaderState } from './scoped-loader.state';
/**
 * Higher order reducer that wraps scopedLoaderReducer and EntityReducer enhancing
 * single state reducer to support multiple entities with generic loading flags and scopes
 */
export declare function entityScopedLoaderReducer<T>(entityType: string, reducer?: (state: T | undefined, action: LoaderAction) => T): (state: EntityScopedLoaderState<T> | undefined, action: EntityScopedLoaderActions.EntityScopedLoaderAction) => EntityScopedLoaderState<T>;
