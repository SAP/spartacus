import { ProcessesLoaderState } from '../processes-loader';
import { EntityProcessesLoaderState } from './entity-processes-loader-state';
export declare function entityHasPendingProcessesSelector<T>(state: EntityProcessesLoaderState<T>, id: string): boolean;
export declare function entityIsStableSelector<T>(state: EntityProcessesLoaderState<T>, id: string): boolean;
export declare function entityProcessesLoaderStateSelector<T>(state: EntityProcessesLoaderState<T>, id: string): ProcessesLoaderState<T>;
