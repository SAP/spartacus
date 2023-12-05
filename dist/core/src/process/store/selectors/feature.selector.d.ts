import { MemoizedSelector } from '@ngrx/store';
import { StateWithProcess } from '../process-state';
import { EntityLoaderState } from '../../../state/utils/entity-loader/entity-loader-state';
export declare function getProcessState<T>(): MemoizedSelector<StateWithProcess<T>, EntityLoaderState<T>>;
