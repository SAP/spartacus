import { Action } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Configurator } from '../../model/configurator.model';
export declare const CREATE_CONFIGURATION = "[Configurator] Create Configuration";
export declare const CREATE_CONFIGURATION_FAIL = "[Configurator] Create Configuration Fail";
export declare const CREATE_CONFIGURATION_SUCCESS = "[Configurator] Create Configuration Sucess";
export declare const READ_CONFIGURATION = "[Configurator] Read Configuration";
export declare const READ_CONFIGURATION_FAIL = "[Configurator] Read Configuration Fail";
export declare const READ_CONFIGURATION_SUCCESS = "[Configurator] Read Configuration Sucess";
export declare const UPDATE_CONFIGURATION = "[Configurator] Update Configuration";
export declare const UPDATE_CONFIGURATION_FAIL = "[Configurator] Update Configuration Fail";
export declare const UPDATE_CONFIGURATION_SUCCESS = "[Configurator] Update Configuration Success";
export declare const UPDATE_CONFIGURATION_FINALIZE_SUCCESS = "[Configurator] Update Configuration finalize success";
export declare const UPDATE_CONFIGURATION_FINALIZE_FAIL = "[Configurator] Update Configuration finalize fail";
export declare const CHANGE_GROUP = "[Configurator] Change group";
export declare const CHANGE_GROUP_FINALIZE = "[Configurator] Change group finalize";
export declare const REMOVE_CONFIGURATION = "[Configurator] Remove configuration";
export declare const UPDATE_PRICE_SUMMARY = "[Configurator] Update Configuration Summary Price";
export declare const UPDATE_PRICE_SUMMARY_FAIL = "[Configurator] Update Configuration Price Summary fail";
export declare const UPDATE_PRICE_SUMMARY_SUCCESS = "[Configurator] Update Configuration Price Summary success";
export declare const GET_CONFIGURATION_OVERVIEW = "[Configurator] Get Configuration Overview";
export declare const GET_CONFIGURATION_OVERVIEW_FAIL = "[Configurator] Get Configuration Overview fail";
export declare const GET_CONFIGURATION_OVERVIEW_SUCCESS = "[Configurator] Get Configuration Overview success";
export declare const UPDATE_CONFIGURATION_OVERVIEW = "[Configurator] Update Configuration Overview";
export declare const UPDATE_CONFIGURATION_OVERVIEW_FAIL = "[Configurator] Update Configuration Overview fail";
export declare const UPDATE_CONFIGURATION_OVERVIEW_SUCCESS = "[Configurator] Update Configuration Overview success";
export declare const SET_INTERACTION_STATE = "[Configurator] Set interaction state";
export declare const SET_CURRENT_GROUP = "[Configurator] Set current group to State";
export declare const SET_MENU_PARENT_GROUP = "[Configurator] Set current parent group for menu to State";
export declare const SET_GROUPS_VISITED = "[Configurator] Set groups to visited";
export declare const REMOVE_PRODUCT_BOUND_CONFIGURATIONS = "[Configurator] Remove product bound configurations";
export declare const DISMISS_CONFLICT_DIALOG = "[Configurator] Dismiss conflict dialog";
export declare const CHECK_CONFLICT_DIALOG = "[Configurator] Check conflict dialog";
export declare class CreateConfiguration extends StateUtils.EntityLoadAction {
    payload: {
        owner: CommonConfigurator.Owner;
        configIdTemplate?: string;
        forceReset?: boolean;
    };
    readonly type = "[Configurator] Create Configuration";
    constructor(payload: {
        owner: CommonConfigurator.Owner;
        configIdTemplate?: string;
        forceReset?: boolean;
    });
}
export declare class CreateConfigurationFail extends StateUtils.EntityFailAction {
    payload: {
        ownerKey: string;
        error: any;
    };
    readonly type = "[Configurator] Create Configuration Fail";
    constructor(payload: {
        ownerKey: string;
        error: any;
    });
}
export declare class CreateConfigurationSuccess extends StateUtils.EntitySuccessAction {
    payload: Configurator.Configuration;
    readonly type = "[Configurator] Create Configuration Sucess";
    constructor(payload: Configurator.Configuration);
}
export declare class ReadConfiguration extends StateUtils.EntityLoadAction {
    payload: {
        configuration: Configurator.Configuration;
        groupId: string;
    };
    readonly type = "[Configurator] Read Configuration";
    constructor(payload: {
        configuration: Configurator.Configuration;
        groupId: string;
    });
}
export declare class ReadConfigurationFail extends StateUtils.EntityFailAction {
    payload: {
        ownerKey: string;
        error: any;
    };
    readonly type = "[Configurator] Read Configuration Fail";
    constructor(payload: {
        ownerKey: string;
        error: any;
    });
}
export declare class ReadConfigurationSuccess extends StateUtils.EntitySuccessAction {
    payload: Configurator.Configuration;
    readonly type = "[Configurator] Read Configuration Sucess";
    constructor(payload: Configurator.Configuration);
}
export declare class UpdateConfiguration extends StateUtils.EntityProcessesIncrementAction {
    payload: Configurator.Configuration;
    readonly type = "[Configurator] Update Configuration";
    constructor(payload: Configurator.Configuration);
}
export declare class UpdateConfigurationFail extends StateUtils.EntityProcessesDecrementAction {
    payload: {
        configuration: Configurator.Configuration;
        error: any;
    };
    readonly type = "[Configurator] Update Configuration Fail";
    constructor(payload: {
        configuration: Configurator.Configuration;
        error: any;
    });
}
export declare class UpdateConfigurationSuccess extends StateUtils.EntityProcessesDecrementAction {
    payload: Configurator.Configuration;
    readonly type = "[Configurator] Update Configuration Success";
    constructor(payload: Configurator.Configuration);
}
export declare class UpdateConfigurationFinalizeSuccess extends StateUtils.EntitySuccessAction {
    payload: Configurator.Configuration;
    readonly type = "[Configurator] Update Configuration finalize success";
    constructor(payload: Configurator.Configuration);
}
export declare class UpdateConfigurationFinalizeFail extends StateUtils.EntitySuccessAction {
    payload: Configurator.Configuration;
    readonly type = "[Configurator] Update Configuration finalize fail";
    constructor(payload: Configurator.Configuration);
}
export declare class UpdatePriceSummary extends StateUtils.EntityLoadAction {
    payload: Configurator.Configuration;
    readonly type = "[Configurator] Update Configuration Summary Price";
    constructor(payload: Configurator.Configuration);
}
export declare class UpdatePriceSummaryFail extends StateUtils.EntityFailAction {
    payload: {
        ownerKey: string;
        error: any;
    };
    readonly type = "[Configurator] Update Configuration Price Summary fail";
    constructor(payload: {
        ownerKey: string;
        error: any;
    });
}
export declare class UpdatePriceSummarySuccess extends StateUtils.EntitySuccessAction {
    payload: Configurator.Configuration;
    readonly type = "[Configurator] Update Configuration Price Summary success";
    constructor(payload: Configurator.Configuration);
}
export declare class ChangeGroup extends StateUtils.EntityLoadAction {
    payload: {
        configuration: Configurator.Configuration;
        groupId: string;
        /**
         * Id of parent group. Can be undefined for groups on root level
         */
        parentGroupId?: string;
        conflictResolutionMode?: boolean;
    };
    readonly type = "[Configurator] Change group";
    constructor(payload: {
        configuration: Configurator.Configuration;
        groupId: string;
        /**
         * Id of parent group. Can be undefined for groups on root level
         */
        parentGroupId?: string;
        conflictResolutionMode?: boolean;
    });
}
export declare class ChangeGroupFinalize extends StateUtils.EntityLoadAction {
    payload: Configurator.Configuration;
    readonly type = "[Configurator] Change group finalize";
    constructor(payload: Configurator.Configuration);
}
export declare class RemoveConfiguration extends StateUtils.EntityLoaderResetAction {
    payload: {
        ownerKey: string | string[];
    };
    readonly type = "[Configurator] Remove configuration";
    constructor(payload: {
        ownerKey: string | string[];
    });
}
export declare class GetConfigurationOverview extends StateUtils.EntityLoadAction {
    payload: Configurator.Configuration;
    readonly type = "[Configurator] Get Configuration Overview";
    constructor(payload: Configurator.Configuration);
}
export declare class GetConfigurationOverviewFail extends StateUtils.EntityFailAction {
    payload: {
        ownerKey: string;
        error: any;
    };
    readonly type = "[Configurator] Get Configuration Overview fail";
    constructor(payload: {
        ownerKey: string;
        error: any;
    });
}
export declare class GetConfigurationOverviewSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        ownerKey: string;
        overview: Configurator.Overview;
    };
    readonly type = "[Configurator] Get Configuration Overview success";
    constructor(payload: {
        ownerKey: string;
        overview: Configurator.Overview;
    });
}
export declare class UpdateConfigurationOverview extends StateUtils.EntityLoadAction {
    payload: Configurator.Configuration;
    readonly type = "[Configurator] Update Configuration Overview";
    constructor(payload: Configurator.Configuration);
}
export declare class UpdateConfigurationOverviewFail extends StateUtils.EntityFailAction {
    payload: {
        ownerKey: string;
        error: any;
    };
    readonly type = "[Configurator] Update Configuration Overview fail";
    constructor(payload: {
        ownerKey: string;
        error: any;
    });
}
export declare class UpdateConfigurationOverviewSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        ownerKey: string;
        overview: Configurator.Overview;
    };
    readonly type = "[Configurator] Update Configuration Overview success";
    constructor(payload: {
        ownerKey: string;
        overview: Configurator.Overview;
    });
}
export declare class SetInteractionState extends StateUtils.EntitySuccessAction {
    payload: {
        entityKey: string | string[];
        interactionState: Configurator.InteractionState;
    };
    readonly type = "[Configurator] Set interaction state";
    constructor(payload: {
        entityKey: string | string[];
        interactionState: Configurator.InteractionState;
    });
}
export declare class SetCurrentGroup extends StateUtils.EntitySuccessAction {
    payload: {
        entityKey: string | string[];
        currentGroup: string;
    };
    readonly type = "[Configurator] Set current group to State";
    constructor(payload: {
        entityKey: string | string[];
        currentGroup: string;
    });
}
export declare class SetMenuParentGroup extends StateUtils.EntitySuccessAction {
    payload: {
        entityKey: string | string[];
        /**
         * Id of parent group. Can be undefined for groups on root level
         */
        menuParentGroup?: string;
    };
    readonly type = "[Configurator] Set current parent group for menu to State";
    constructor(payload: {
        entityKey: string | string[];
        /**
         * Id of parent group. Can be undefined for groups on root level
         */
        menuParentGroup?: string;
    });
}
export declare class SetGroupsVisited extends StateUtils.EntitySuccessAction {
    payload: {
        entityKey: string;
        visitedGroups: string[];
    };
    readonly type = "[Configurator] Set groups to visited";
    constructor(payload: {
        entityKey: string;
        visitedGroups: string[];
    });
}
export declare class RemoveProductBoundConfigurations implements Action {
    readonly type = "[Configurator] Remove product bound configurations";
    constructor();
}
export declare class DissmissConflictDialoge extends StateUtils.EntitySuccessAction {
    ownerKey: string;
    readonly type = "[Configurator] Dismiss conflict dialog";
    constructor(ownerKey: string);
}
export declare class CheckConflictDialoge extends StateUtils.EntitySuccessAction {
    ownerKey: string;
    readonly type = "[Configurator] Check conflict dialog";
    constructor(ownerKey: string);
}
export type ConfiguratorAction = CreateConfiguration | CreateConfigurationFail | CreateConfigurationSuccess | ReadConfiguration | ReadConfigurationFail | ReadConfigurationSuccess | UpdateConfiguration | UpdateConfigurationFail | UpdateConfigurationSuccess | UpdateConfigurationFinalizeFail | UpdateConfigurationFinalizeSuccess | UpdatePriceSummary | UpdatePriceSummaryFail | UpdatePriceSummarySuccess | ChangeGroup | ChangeGroupFinalize | GetConfigurationOverview | GetConfigurationOverviewFail | GetConfigurationOverviewSuccess | UpdateConfigurationOverview | UpdateConfigurationOverviewFail | UpdateConfigurationOverviewSuccess | RemoveConfiguration | SetInteractionState | SetMenuParentGroup | SetCurrentGroup | SetGroupsVisited | RemoveProductBoundConfigurations | CheckConflictDialoge | DissmissConflictDialoge;
