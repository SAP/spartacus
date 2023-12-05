import { StateUtils } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { ConfiguratorTextfield } from '../../model/configurator-textfield.model';
export declare const CREATE_CONFIGURATION = "[Configurator] Create Configuration Textfield";
export declare const CREATE_CONFIGURATION_FAIL = "[Configurator] Create Configuration Textfield Fail";
export declare const CREATE_CONFIGURATION_SUCCESS = "[Configurator] Create Configuration Textfield Success";
export declare const UPDATE_CONFIGURATION = "[Configurator] Update Configuration Textfield";
export declare const ADD_TO_CART = "[Configurator] Add to cart Textfield";
export declare const ADD_TO_CART_FAIL = "[Configurator] Add to cart Textfield Fail";
export declare const READ_CART_ENTRY_CONFIGURATION = "[Configurator] Read cart entry configuration Textfield";
export declare const READ_CART_ENTRY_CONFIGURATION_FAIL = "[Configurator] Read cart entry configuration Textfield Fail";
export declare const READ_CART_ENTRY_CONFIGURATION_SUCCESS = "[Configurator] Read cart entry configuration Textfield Success";
export declare const READ_ORDER_ENTRY_CONFIGURATION = "[Configurator] Read order entry configuration textfield";
export declare const READ_ORDER_ENTRY_CONFIGURATION_FAIL = "[Configurator] Read order entry configuration textfield Fail";
export declare const READ_ORDER_ENTRY_CONFIGURATION_SUCCESS = "[Configurator] Read order entry configuration textfield Success";
export declare const UPDATE_CART_ENTRY_CONFIGURATION = "[Configurator] Update cart entry configuration Textfield";
export declare const UPDATE_CART_ENTRY_CONFIGURATION_FAIL = "[Configurator] Update cart entry configuration Textfield Fail";
export declare const REMOVE_CONFIGURATION = "[Configurator] Remove Configuration Textfield";
export declare class CreateConfiguration extends StateUtils.LoaderLoadAction {
    payload: {
        productCode: string;
        owner: CommonConfigurator.Owner;
    };
    readonly type = "[Configurator] Create Configuration Textfield";
    constructor(payload: {
        productCode: string;
        owner: CommonConfigurator.Owner;
    });
}
export declare class CreateConfigurationFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[Configurator] Create Configuration Textfield Fail";
    constructor(payload: any);
}
export declare class CreateConfigurationSuccess extends StateUtils.LoaderSuccessAction {
    payload: ConfiguratorTextfield.Configuration;
    readonly type = "[Configurator] Create Configuration Textfield Success";
    constructor(payload: ConfiguratorTextfield.Configuration);
}
export declare class UpdateConfiguration extends StateUtils.LoaderLoadAction {
    payload: ConfiguratorTextfield.Configuration;
    readonly type = "[Configurator] Update Configuration Textfield";
    constructor(payload: ConfiguratorTextfield.Configuration);
}
export declare class AddToCart extends StateUtils.LoaderLoadAction {
    payload: ConfiguratorTextfield.AddToCartParameters;
    readonly type = "[Configurator] Add to cart Textfield";
    constructor(payload: ConfiguratorTextfield.AddToCartParameters);
}
export declare class AddToCartFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[Configurator] Add to cart Textfield Fail";
    constructor(payload: any);
}
export declare class UpdateCartEntryConfiguration extends StateUtils.LoaderLoadAction {
    payload: ConfiguratorTextfield.UpdateCartEntryParameters;
    readonly type = "[Configurator] Update cart entry configuration Textfield";
    constructor(payload: ConfiguratorTextfield.UpdateCartEntryParameters);
}
export declare class UpdateCartEntryConfigurationFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[Configurator] Update cart entry configuration Textfield Fail";
    constructor(payload: any);
}
export declare class ReadCartEntryConfiguration extends StateUtils.LoaderLoadAction {
    payload: CommonConfigurator.ReadConfigurationFromCartEntryParameters;
    readonly type = "[Configurator] Read cart entry configuration Textfield";
    constructor(payload: CommonConfigurator.ReadConfigurationFromCartEntryParameters);
}
export declare class ReadCartEntryConfigurationSuccess extends StateUtils.LoaderSuccessAction {
    payload: ConfiguratorTextfield.Configuration;
    readonly type = "[Configurator] Read cart entry configuration Textfield Success";
    constructor(payload: ConfiguratorTextfield.Configuration);
}
export declare class ReadCartEntryConfigurationFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[Configurator] Read cart entry configuration Textfield Fail";
    constructor(payload: any);
}
export declare class ReadOrderEntryConfiguration extends StateUtils.LoaderLoadAction {
    payload: CommonConfigurator.ReadConfigurationFromOrderEntryParameters;
    readonly type = "[Configurator] Read order entry configuration textfield";
    constructor(payload: CommonConfigurator.ReadConfigurationFromOrderEntryParameters);
}
export declare class ReadOrderEntryConfigurationSuccess extends StateUtils.LoaderSuccessAction {
    payload: ConfiguratorTextfield.Configuration;
    readonly type = "[Configurator] Read order entry configuration textfield Success";
    constructor(payload: ConfiguratorTextfield.Configuration);
}
export declare class ReadOrderEntryConfigurationFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[Configurator] Read order entry configuration textfield Fail";
    constructor(payload: any);
}
export declare class RemoveConfiguration extends StateUtils.LoaderResetAction {
    readonly type = "[Configurator] Remove Configuration Textfield";
    constructor();
}
export type ConfiguratorActions = CreateConfiguration | CreateConfigurationFail | CreateConfigurationSuccess | UpdateConfiguration | ReadCartEntryConfigurationFail | ReadCartEntryConfigurationSuccess | ReadCartEntryConfiguration | ReadOrderEntryConfigurationFail | ReadOrderEntryConfigurationSuccess | ReadOrderEntryConfiguration | UpdateCartEntryConfiguration | RemoveConfiguration;
