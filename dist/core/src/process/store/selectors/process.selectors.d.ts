import { MemoizedSelector } from '@ngrx/store';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { StateWithProcess } from '../process-state';
export declare function getProcessStateFactory<T>(processId: string): MemoizedSelector<StateWithProcess<T>, LoaderState<T>>;
export declare function getProcessLoadingFactory<T>(processId: string): MemoizedSelector<StateWithProcess<T>, boolean>;
export declare function getProcessSuccessFactory<T>(processId: string): MemoizedSelector<StateWithProcess<T>, boolean>;
export declare function getProcessErrorFactory<T>(processId: string): MemoizedSelector<StateWithProcess<T>, boolean>;
