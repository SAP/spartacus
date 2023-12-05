import { Action } from '@ngrx/store';
import { LoaderMeta } from '../loader/loader.action';
export declare const PROCESSES_INCREMENT_ACTION = "[PROCESSES LOADER] INCREMENT";
export declare const PROCESSES_DECREMENT_ACTION = "[PROCESSES LOADER] DECREMENT";
export declare const PROCESSES_LOADER_RESET_ACTION = "[PROCESSES LOADER] RESET";
export interface ProcessesLoaderMeta extends LoaderMeta {
    entityType: string;
    processesCountDiff?: number | null;
}
export interface ProcessesLoaderAction extends Action {
    readonly payload?: any;
    readonly meta?: ProcessesLoaderMeta;
}
export declare function processesIncrementMeta(entityType: string): ProcessesLoaderMeta;
export declare function processesDecrementMeta(entityType: string): ProcessesLoaderMeta;
export declare function processesLoaderResetMeta(entityType: string): ProcessesLoaderMeta;
export declare class ProcessesLoaderResetAction implements ProcessesLoaderAction {
    type: string;
    readonly meta: ProcessesLoaderMeta;
    constructor(entityType: string);
}
export declare class ProcessesIncrementAction implements ProcessesLoaderAction {
    type: string;
    readonly meta: ProcessesLoaderMeta;
    constructor(entityType: string);
}
export declare class ProcessesDecrementAction implements ProcessesLoaderAction {
    type: string;
    readonly meta: ProcessesLoaderMeta;
    constructor(entityType: string);
}
