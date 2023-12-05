import { Action } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Configurator } from '../../model/configurator.model';
export declare const READ_CART_ENTRY_CONFIGURATION = "[Configurator] Read Cart Entry Configuration";
export declare const READ_CART_ENTRY_CONFIGURATION_SUCCESS = "[Configurator] Read Cart Entry Configuration Success";
export declare const READ_CART_ENTRY_CONFIGURATION_FAIL = "[Configurator] Read Cart Entry Configuration Fail";
export declare const READ_ORDER_ENTRY_CONFIGURATION = "[Configurator] Read Order Entry Configuration";
export declare const READ_ORDER_ENTRY_CONFIGURATION_SUCCESS = "[Configurator] Read Order Entry Configuration Success";
export declare const READ_ORDER_ENTRY_CONFIGURATION_FAIL = "[Configurator] Read Order Entry Configuration Fail";
export declare const ADD_TO_CART = "[Configurator] Add to cart";
export declare const UPDATE_CART_ENTRY = "[Configurator] Update cart entry";
export declare const UPDATE_CART_ENTRY_SUCCESS = "[Configurator] Update cart entry success";
export declare const ADD_NEXT_OWNER = "[Configurator] Add next owner";
export declare const SET_NEXT_OWNER_CART_ENTRY = "[Configurator] Set next owner cart entry";
export declare const REMOVE_CART_BOUND_CONFIGURATIONS = "[Configurator] Remove cart bound configurations";
export declare class ReadCartEntryConfiguration extends StateUtils.EntityLoadAction {
    payload: CommonConfigurator.ReadConfigurationFromCartEntryParameters;
    readonly type = "[Configurator] Read Cart Entry Configuration";
    constructor(payload: CommonConfigurator.ReadConfigurationFromCartEntryParameters);
}
export declare class ReadCartEntryConfigurationSuccess extends StateUtils.EntitySuccessAction {
    payload: Configurator.Configuration;
    readonly type = "[Configurator] Read Cart Entry Configuration Success";
    constructor(payload: Configurator.Configuration);
}
export declare class ReadCartEntryConfigurationFail extends StateUtils.EntityFailAction {
    payload: {
        ownerKey: string;
        error: any;
    };
    readonly type = "[Configurator] Read Cart Entry Configuration Fail";
    constructor(payload: {
        ownerKey: string;
        error: any;
    });
}
export declare class ReadOrderEntryConfiguration extends StateUtils.EntityLoadAction {
    payload: CommonConfigurator.ReadConfigurationFromOrderEntryParameters;
    readonly type = "[Configurator] Read Order Entry Configuration";
    constructor(payload: CommonConfigurator.ReadConfigurationFromOrderEntryParameters);
}
export declare class ReadOrderEntryConfigurationSuccess extends StateUtils.EntitySuccessAction {
    payload: Configurator.Configuration;
    readonly type = "[Configurator] Read Order Entry Configuration Success";
    constructor(payload: Configurator.Configuration);
}
export declare class ReadOrderEntryConfigurationFail extends StateUtils.EntityFailAction {
    payload: {
        ownerKey: string;
        error: any;
    };
    readonly type = "[Configurator] Read Order Entry Configuration Fail";
    constructor(payload: {
        ownerKey: string;
        error: any;
    });
}
export declare class AddToCart extends StateUtils.EntityProcessesIncrementAction {
    payload: Configurator.AddToCartParameters;
    readonly type = "[Configurator] Add to cart";
    constructor(payload: Configurator.AddToCartParameters);
}
export declare class UpdateCartEntry extends StateUtils.EntityProcessesIncrementAction {
    payload: Configurator.UpdateConfigurationForCartEntryParameters;
    readonly type = "[Configurator] Update cart entry";
    constructor(payload: Configurator.UpdateConfigurationForCartEntryParameters);
}
export declare class AddNextOwner implements Action {
    payload: {
        ownerKey: string;
        cartEntryNo: string;
    };
    readonly type = "[Configurator] Add next owner";
    constructor(payload: {
        ownerKey: string;
        cartEntryNo: string;
    });
}
export declare class RemoveCartBoundConfigurations implements Action {
    readonly type = "[Configurator] Remove cart bound configurations";
    constructor();
}
export declare class SetNextOwnerCartEntry extends StateUtils.EntitySuccessAction {
    payload: {
        configuration: Configurator.Configuration;
        cartEntryNo: string;
    };
    readonly type = "[Configurator] Set next owner cart entry";
    constructor(payload: {
        configuration: Configurator.Configuration;
        cartEntryNo: string;
    });
}
export type ConfiguratorCartAction = AddNextOwner | SetNextOwnerCartEntry | ReadCartEntryConfiguration | ReadCartEntryConfigurationSuccess | ReadCartEntryConfigurationFail | ReadOrderEntryConfiguration | ReadOrderEntryConfigurationSuccess | ReadOrderEntryConfigurationFail | RemoveCartBoundConfigurations | UpdateCartEntry;
