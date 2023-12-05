import { LoaderAction } from '../loader/loader.action';
import { EntityLoaderState } from './entity-loader-state';
import { EntityLoaderAction } from './entity-loader.action';
/**
 * Higher order reducer that wraps LoaderReducer and EntityReducer enhancing
 * single state reducer to support multiple entities with generic loading flags
 */
export declare function entityLoaderReducer<T, V extends LoaderAction = LoaderAction>(entityType: string, reducer?: (state: T | undefined, action: V | LoaderAction) => T | undefined): (state: EntityLoaderState<T> | undefined, action: EntityLoaderAction) => EntityLoaderState<T>;
