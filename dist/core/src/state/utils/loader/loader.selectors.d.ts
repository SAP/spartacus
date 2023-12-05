import { LoaderState } from './loader-state';
export declare function loaderValueSelector<T>(state: LoaderState<T>): T;
export declare function loaderLoadingSelector<T>(state: LoaderState<T>): boolean;
export declare function loaderErrorSelector<T>(state: LoaderState<T>): boolean;
export declare function loaderSuccessSelector<T>(state: LoaderState<T>): boolean;
