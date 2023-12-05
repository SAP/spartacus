import { ListModel, StateUtils } from '@spartacus/core';
import { B2BUnitNode } from '../../model/unit-node.model';
export declare const orgUnitInitialState: B2BUnitNode | undefined;
export declare const orgUnitsInitialState: ListModel | undefined;
export declare function orgUnitEntitiesReducer(state: B2BUnitNode | undefined, action: StateUtils.LoaderAction): B2BUnitNode | undefined;
export declare function orgUnitListReducer(state: ListModel | undefined, action: StateUtils.LoaderAction): any;
export declare function orgUnitUserListReducer(state: ListModel | undefined, action: StateUtils.LoaderAction): any;
export declare function orgUnitAddressListReducer(state: ListModel | undefined, action: StateUtils.LoaderAction): ListModel | undefined;
