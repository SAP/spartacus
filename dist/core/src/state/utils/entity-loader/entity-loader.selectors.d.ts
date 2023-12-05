import { LoaderState } from '../loader/loader-state';
import { EntityLoaderState } from './entity-loader-state';
export declare function entityLoaderStateSelector<T>(state: EntityLoaderState<T>, id: string): LoaderState<T>;
export declare function entityValueSelector<T>(state: EntityLoaderState<T>, id: string): T;
export declare function entityLoadingSelector<T>(state: EntityLoaderState<T>, id: string): boolean;
export declare function entityErrorSelector<T>(state: EntityLoaderState<T>, id: string): boolean;
export declare function entitySuccessSelector<T>(state: EntityLoaderState<T>, id: string): boolean;
