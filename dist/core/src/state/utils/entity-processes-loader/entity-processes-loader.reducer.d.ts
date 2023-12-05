import { ProcessesLoaderAction } from '../processes-loader/processes-loader.action';
import { EntityProcessesLoaderState } from './entity-processes-loader-state';
import { EntityProcessesLoaderAction } from './entity-processes-loader.action';
/**
 * Higher order reducer that wraps ProcessesLoaderReducer and EntityReducer enhancing
 * single state reducer to support multiple entities with generic processesCount flag
 */
export declare function entityProcessesLoaderReducer<T>(entityType: string, reducer?: (state: T | undefined, action: ProcessesLoaderAction) => T): (state: EntityProcessesLoaderState<T> | undefined, action: EntityProcessesLoaderAction) => EntityProcessesLoaderState<T>;
