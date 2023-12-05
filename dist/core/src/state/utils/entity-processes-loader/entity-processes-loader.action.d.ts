import { Action } from '@ngrx/store';
import { EntityMeta } from '../entity/entity.action';
import { ProcessesLoaderMeta } from '../processes-loader/processes-loader.action';
export declare const ENTITY_PROCESSES_LOADER_RESET_ACTION = "[ENTITY] PROCESSES LOADER RESET";
export declare const ENTITY_PROCESSES_INCREMENT_ACTION = "[ENTITY] PROCESSES INCREMENT";
export declare const ENTITY_PROCESSES_DECREMENT_ACTION = "[ENTITY] PROCESSES DECREMENT";
export interface EntityProcessesLoaderMeta extends EntityMeta, ProcessesLoaderMeta {
}
export interface EntityProcessesLoaderAction extends Action {
    readonly payload?: any;
    readonly meta?: EntityProcessesLoaderMeta;
}
export declare function entityProcessesLoaderResetMeta(entityType: string, id: string | string[]): EntityProcessesLoaderMeta;
export declare function entityProcessesIncrementMeta(entityType: string, id: string | string[]): EntityProcessesLoaderMeta;
export declare function entityProcessesDecrementMeta(entityType: string, id: string | string[]): EntityProcessesLoaderMeta;
export declare class EntityProcessesLoaderResetAction implements EntityProcessesLoaderAction {
    type: string;
    readonly meta: EntityProcessesLoaderMeta;
    constructor(entityType: string, id: string | string[]);
}
export declare class EntityProcessesIncrementAction implements EntityProcessesLoaderAction {
    type: string;
    readonly meta: EntityProcessesLoaderMeta;
    constructor(entityType: string, id: string | string[]);
}
export declare class EntityProcessesDecrementAction implements EntityProcessesLoaderAction {
    type: string;
    readonly meta: EntityProcessesLoaderMeta;
    constructor(entityType: string, id: string | string[]);
}
