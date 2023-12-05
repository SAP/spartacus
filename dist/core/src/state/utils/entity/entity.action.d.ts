import { Action } from '@ngrx/store';
export declare const ENTITY_REMOVE_ACTION = "[ENTITY] REMOVE";
export declare const ENTITY_REMOVE_ALL_ACTION = "[ENTITY] REMOVE ALL";
export type EntityId = string | string[] | null;
export interface EntityMeta {
    entityType: string;
    entityId?: EntityId;
    entityRemove?: boolean;
}
export declare function entityMeta(type: string, id?: EntityId): EntityMeta;
export declare function entityRemoveMeta(type: string, id: EntityId): EntityMeta;
export declare function entityRemoveAllMeta(type: string): EntityMeta;
export interface EntityAction extends Action {
    readonly payload?: any;
    readonly meta?: EntityMeta;
}
export declare class EntityRemoveAction implements EntityAction {
    type: string;
    readonly meta: EntityMeta;
    constructor(entityType: string, id: EntityId);
}
export declare class EntityRemoveAllAction implements EntityAction {
    type: string;
    readonly meta: EntityMeta;
    constructor(entityType: string);
}
