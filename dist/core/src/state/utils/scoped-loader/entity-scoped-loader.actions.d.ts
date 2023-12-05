import { Action } from '@ngrx/store';
import { EntityLoaderMeta } from '../entity-loader/entity-loader.action';
export declare namespace EntityScopedLoaderActions {
    interface EntityScopedLoaderMeta extends EntityLoaderMeta {
        scope?: string;
    }
    interface EntityScopedLoaderAction extends Action {
        readonly payload?: any;
        readonly meta?: EntityScopedLoaderMeta;
    }
    function entityScopedLoadMeta(entityType: string, id: string | string[], scope?: string): EntityScopedLoaderMeta;
    function entityScopedFailMeta(entityType: string, id: string | string[], scope?: string, error?: any): EntityScopedLoaderMeta;
    function entityScopedSuccessMeta(entityType: string, id: string | string[], scope?: string): EntityScopedLoaderMeta;
    function entityScopedResetMeta(entityType: string, id?: string | string[], scope?: string): EntityScopedLoaderMeta;
    class EntityScopedLoadAction implements EntityScopedLoaderAction {
        type: string;
        readonly meta: EntityScopedLoaderMeta;
        constructor(entityType: string, id: string | string[], scope?: string);
    }
    class EntityScopedFailAction implements EntityScopedLoaderAction {
        type: string;
        readonly meta: EntityScopedLoaderMeta;
        constructor(entityType: string, id: string | string[], scope?: string, error?: any);
    }
    class EntityScopedSuccessAction implements EntityScopedLoaderAction {
        payload?: any;
        type: string;
        readonly meta: EntityScopedLoaderMeta;
        constructor(entityType: string, id: string | string[], scope?: string, payload?: any);
    }
    class EntityScopedResetAction implements EntityScopedLoaderAction {
        type: string;
        readonly meta: EntityScopedLoaderMeta;
        constructor(entityType: string, id?: string | string[], scope?: string);
    }
}
