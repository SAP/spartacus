import { Action } from '@ngrx/store';
import { EntityState } from './entity-state';
import { EntityAction } from './entity.action';
export declare const initialEntityState: EntityState<any>;
/**
 * Higher order reducer for reusing reducer logic for multiple entities
 *
 * Utilizes entityId meta field to target entity by id in actions
 */
export declare function entityReducer<T, V extends Action = Action>(entityType: string, reducer: (state: T, action: Action | V) => T): (state: EntityState<T> | undefined, action: EntityAction) => EntityState<T>;
