import { OperatorFunction, SchedulerLike } from 'rxjs';
export declare function bufferDebounceTime<T>(time?: number, scheduler?: SchedulerLike): OperatorFunction<T, T[]>;
