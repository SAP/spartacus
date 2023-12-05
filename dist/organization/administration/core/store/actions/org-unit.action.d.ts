import { Address, B2BApprovalProcess, B2BUnit, ListModel, SearchConfig, StateUtils } from '@spartacus/core';
import { B2BUnitNode } from '../../model/unit-node.model';
export declare const LOAD_ORG_UNIT = "[B2BUnit] Load B2BUnit Data";
export declare const LOAD_ORG_UNIT_FAIL = "[B2BUnit] Load B2BUnit Data Fail";
export declare const LOAD_ORG_UNIT_SUCCESS = "[B2BUnit] Load B2BUnit Data Success";
export declare const LOAD_UNIT_NODE = "[B2BUnitNode] Load B2BUnitNode Data";
export declare const LOAD_UNIT_NODE_FAIL = "[B2BUnitNode] Load B2BUnitNode Data Fail";
export declare const LOAD_UNIT_NODE_SUCCESS = "[B2BUnitNode] Load B2BUnitNode Data Success";
export declare const LOAD_UNIT_NODES = "[B2BUnitNode] Load B2BUnitNodes";
export declare const LOAD_UNIT_NODES_FAIL = "[B2BUnitNode] Load B2BUnitNodes Fail";
export declare const LOAD_UNIT_NODES_SUCCESS = "[B2BUnitNode] Load B2BUnitNodes Success";
export declare const CREATE_ORG_UNIT = "[B2BUnit] Create B2BUnitNode";
export declare const CREATE_ORG_UNIT_FAIL = "[B2BUnit] Create B2BUnitNode Fail";
export declare const CREATE_ORG_UNIT_SUCCESS = "[B2BUnit] Create B2BUnitNode Success";
export declare const UPDATE_ORG_UNIT = "[B2BUnit] Update B2BUnitNode";
export declare const UPDATE_ORG_UNIT_FAIL = "[B2BUnit] Update B2BUnitNode Fail";
export declare const UPDATE_ORG_UNIT_SUCCESS = "[B2BUnit] Update B2BUnitNode Success";
export declare const LOAD_UNIT_TREE = "[B2BUnitNode] Load Tree";
export declare const LOAD_UNIT_TREE_FAIL = "[B2BUnitNode] Load Tree Fail";
export declare const LOAD_UNIT_TREE_SUCCESS = "[B2BUnitNode] Load Tree Success";
export declare const LOAD_APPROVAL_PROCESSES = "[B2BApprovalProcess] Load Approval Processes";
export declare const LOAD_APPROVAL_PROCESSES_FAIL = "[B2BApprovalProcess] Load Approval Processes Fail";
export declare const LOAD_APPROVAL_PROCESSES_SUCCESS = "[B2BApprovalProcess] Load Approval Processes Success";
export declare const LOAD_ASSIGNED_USERS = "[B2BUnit] Load Users";
export declare const LOAD_ASSIGNED_USERS_SUCCESS = "[B2BUnit] Load Users success";
export declare const LOAD_ASSIGNED_USERS_FAIL = "[B2BUnit] Load Users fail";
export declare const ASSIGN_ROLE = "[B2BUnit] Assign Role";
export declare const ASSIGN_ROLE_SUCCESS = "[B2BUnit] Assign Role success";
export declare const ASSIGN_ROLE_FAIL = "[B2BUnit] Assign Role fail";
export declare const UNASSIGN_ROLE = "[B2BUnit] Unassign Role";
export declare const UNASSIGN_ROLE_SUCCESS = "[B2BUnit] Unassign Role success";
export declare const UNASSIGN_ROLE_FAIL = "[B2BUnit] Unassign Role fail";
export declare const ASSIGN_APPROVER = "[B2BUnit] Assign Approver";
export declare const ASSIGN_APPROVER_SUCCESS = "[B2BUnit] Assign Approver success";
export declare const ASSIGN_APPROVER_FAIL = "[B2BUnit] Assign Approver fail";
export declare const UNASSIGN_APPROVER = "[B2BUnit] Unassign Approver";
export declare const UNASSIGN_APPROVER_SUCCESS = "[B2BUnit] Unassign Approver success";
export declare const UNASSIGN_APPROVER_FAIL = "[B2BUnit] Unassign Approver fail";
export declare const CREATE_ADDRESS = "[B2BUnit] Create address";
export declare const CREATE_ADDRESS_SUCCESS = "[B2BUnit] Create address success";
export declare const CREATE_ADDRESS_FAIL = "[B2BUnit] Create address fail";
export declare const UPDATE_ADDRESS = "[B2BUnit] Update address";
export declare const UPDATE_ADDRESS_SUCCESS = "[B2BUnit] Update address success";
export declare const UPDATE_ADDRESS_FAIL = "[B2BUnit] Update address fail";
export declare const DELETE_ADDRESS = "[B2BUnit] Delete address";
export declare const DELETE_ADDRESS_SUCCESS = "[B2BUnit] Delete address success";
export declare const DELETE_ADDRESS_FAIL = "[B2BUnit] Delete address fail";
export declare const LOAD_ADDRESS_SUCCESS = "[B2BUnit] Load address success";
export declare const LOAD_ADDRESSES = "[B2BUnit] Load addresses";
export declare const LOAD_ADDRESSES_SUCCESS = "[B2BUnit] Load addresses success";
export declare const LOAD_ADDRESSES_FAIL = "[B2BUnit] Load addresses fail";
export declare const CLEAR_ASSIGNED_USERS = "[B2BUnit] Clear Assigned Users";
export declare class LoadOrgUnit extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orgUnitId: string;
    };
    readonly type = "[B2BUnit] Load B2BUnit Data";
    constructor(payload: {
        userId: string;
        orgUnitId: string;
    });
}
export declare class LoadOrgUnitFail extends StateUtils.EntityFailAction {
    payload: {
        orgUnitId: string;
        error: any;
    };
    readonly type = "[B2BUnit] Load B2BUnit Data Fail";
    constructor(payload: {
        orgUnitId: string;
        error: any;
    });
}
export declare class LoadOrgUnitSuccess extends StateUtils.EntitySuccessAction {
    payload: B2BUnit | B2BUnit[];
    readonly type = "[B2BUnit] Load B2BUnit Data Success";
    constructor(payload: B2BUnit | B2BUnit[]);
}
export declare class LoadOrgUnitNodes extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
    };
    readonly type = "[B2BUnitNode] Load B2BUnitNodes";
    constructor(payload: {
        userId: string;
    });
}
export declare class LoadOrgUnitNodesFail extends StateUtils.EntityFailAction {
    payload: any;
    readonly type = "[B2BUnitNode] Load B2BUnitNodes Fail";
    constructor(payload: any);
}
export declare class LoadOrgUnitNodesSuccess extends StateUtils.EntitySuccessAction {
    payload: B2BUnitNode[];
    readonly type = "[B2BUnitNode] Load B2BUnitNodes Success";
    constructor(payload: B2BUnitNode[]);
}
export declare class CreateUnit extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        unit: B2BUnit;
    };
    readonly type = "[B2BUnit] Create B2BUnitNode";
    constructor(payload: {
        userId: string;
        unit: B2BUnit;
    });
}
export declare class CreateUnitFail extends StateUtils.EntityFailAction {
    payload: {
        unitCode: string;
        error: any;
    };
    readonly type = "[B2BUnit] Create B2BUnitNode Fail";
    constructor(payload: {
        unitCode: string;
        error: any;
    });
}
export declare class CreateUnitSuccess extends StateUtils.EntitySuccessAction {
    payload: B2BUnit;
    readonly type = "[B2BUnit] Create B2BUnitNode Success";
    constructor(payload: B2BUnit);
}
export declare class UpdateUnit extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        unitCode: string;
        unit: B2BUnit;
    };
    readonly type = "[B2BUnit] Update B2BUnitNode";
    constructor(payload: {
        userId: string;
        unitCode: string;
        unit: B2BUnit;
    });
}
export declare class UpdateUnitFail extends StateUtils.EntityFailAction {
    payload: {
        unitCode: string;
        error: any;
    };
    readonly type = "[B2BUnit] Update B2BUnitNode Fail";
    constructor(payload: {
        unitCode: string;
        error: any;
    });
}
export declare class UpdateUnitSuccess extends StateUtils.EntitySuccessAction {
    payload: B2BUnit;
    readonly type = "[B2BUnit] Update B2BUnitNode Success";
    constructor(payload: B2BUnit);
}
export declare class LoadTree extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
    };
    readonly type = "[B2BUnitNode] Load Tree";
    constructor(payload: {
        userId: string;
    });
}
export declare class LoadTreeFail extends StateUtils.EntityFailAction {
    payload: {
        error: any;
    };
    readonly type = "[B2BUnitNode] Load Tree Fail";
    constructor(payload: {
        error: any;
    });
}
export declare class LoadTreeSuccess extends StateUtils.EntitySuccessAction {
    payload: B2BUnitNode;
    readonly type = "[B2BUnitNode] Load Tree Success";
    constructor(payload: B2BUnitNode);
}
export declare class LoadApprovalProcesses extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
    };
    readonly type = "[B2BApprovalProcess] Load Approval Processes";
    constructor(payload: {
        userId: string;
    });
}
export declare class LoadApprovalProcessesFail extends StateUtils.EntityFailAction {
    payload: {
        error: any;
    };
    readonly type = "[B2BApprovalProcess] Load Approval Processes Fail";
    constructor(payload: {
        error: any;
    });
}
export declare class LoadApprovalProcessesSuccess extends StateUtils.EntitySuccessAction {
    payload: B2BApprovalProcess[];
    readonly type = "[B2BApprovalProcess] Load Approval Processes Success";
    constructor(payload: B2BApprovalProcess[]);
}
export declare class LoadAssignedUsers extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orgUnitId: string;
        roleId: string;
        params: SearchConfig;
    };
    readonly type = "[B2BUnit] Load Users";
    constructor(payload: {
        userId: string;
        orgUnitId: string;
        roleId: string;
        params: SearchConfig;
    });
}
export declare class ClearAssignedUsers extends StateUtils.EntityRemoveAction {
    payload: {
        orgUnitId: string;
        roleId: string;
        params: SearchConfig;
    };
    readonly type = "[B2BUnit] Clear Assigned Users";
    constructor(payload: {
        orgUnitId: string;
        roleId: string;
        params: SearchConfig;
    });
}
export declare class LoadAssignedUsersFail extends StateUtils.EntityFailAction {
    payload: {
        orgUnitId: string;
        roleId: string;
        params: SearchConfig;
        error: any;
    };
    readonly type = "[B2BUnit] Load Users fail";
    constructor(payload: {
        orgUnitId: string;
        roleId: string;
        params: SearchConfig;
        error: any;
    });
}
export declare class LoadAssignedUsersSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        orgUnitId: string;
        roleId: string;
        page: ListModel;
        params: SearchConfig;
    };
    readonly type = "[B2BUnit] Load Users success";
    constructor(payload: {
        orgUnitId: string;
        roleId: string;
        page: ListModel;
        params: SearchConfig;
    });
}
export declare class AssignRole extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orgCustomerId: string;
        roleId: string;
    };
    readonly type = "[B2BUnit] Assign Role";
    constructor(payload: {
        userId: string;
        orgCustomerId: string;
        roleId: string;
    });
}
export declare class AssignRoleFail extends StateUtils.EntityFailAction {
    payload: {
        orgCustomerId: string;
        error: any;
    };
    readonly type = "[B2BUnit] Assign Role fail";
    constructor(payload: {
        orgCustomerId: string;
        error: any;
    });
}
export declare class AssignRoleSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        uid: string;
        roleId: string;
        selected: boolean;
    };
    readonly type = "[B2BUnit] Assign Role success";
    constructor(payload: {
        uid: string;
        roleId: string;
        selected: boolean;
    });
}
export declare class UnassignRole extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orgCustomerId: string;
        roleId: string;
    };
    readonly type = "[B2BUnit] Unassign Role";
    constructor(payload: {
        userId: string;
        orgCustomerId: string;
        roleId: string;
    });
}
export declare class UnassignRoleFail extends StateUtils.EntityFailAction {
    payload: {
        orgCustomerId: string;
        error: any;
    };
    readonly type = "[B2BUnit] Unassign Role fail";
    constructor(payload: {
        orgCustomerId: string;
        error: any;
    });
}
export declare class UnassignRoleSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        uid: string;
        roleId: string;
        selected: boolean;
    };
    readonly type = "[B2BUnit] Unassign Role success";
    constructor(payload: {
        uid: string;
        roleId: string;
        selected: boolean;
    });
}
export declare class AssignApprover extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orgUnitId: string;
        orgCustomerId: string;
        roleId: string;
    };
    readonly type = "[B2BUnit] Assign Approver";
    constructor(payload: {
        userId: string;
        orgUnitId: string;
        orgCustomerId: string;
        roleId: string;
    });
}
export declare class AssignApproverFail extends StateUtils.EntityFailAction {
    payload: {
        orgCustomerId: string;
        error: any;
    };
    readonly type = "[B2BUnit] Assign Approver fail";
    constructor(payload: {
        orgCustomerId: string;
        error: any;
    });
}
export declare class AssignApproverSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        uid: string;
        roleId: string;
        selected: boolean;
    };
    readonly type = "[B2BUnit] Assign Approver success";
    constructor(payload: {
        uid: string;
        roleId: string;
        selected: boolean;
    });
}
export declare class UnassignApprover extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orgUnitId: string;
        orgCustomerId: string;
        roleId: string;
    };
    readonly type = "[B2BUnit] Unassign Approver";
    constructor(payload: {
        userId: string;
        orgUnitId: string;
        orgCustomerId: string;
        roleId: string;
    });
}
export declare class UnassignApproverFail extends StateUtils.EntityFailAction {
    payload: {
        orgCustomerId: string;
        error: any;
    };
    readonly type = "[B2BUnit] Unassign Approver fail";
    constructor(payload: {
        orgCustomerId: string;
        error: any;
    });
}
export declare class UnassignApproverSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        uid: string;
        roleId: string;
        selected: boolean;
    };
    readonly type = "[B2BUnit] Unassign Approver success";
    constructor(payload: {
        uid: string;
        roleId: string;
        selected: boolean;
    });
}
export declare class CreateAddress extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orgUnitId: string;
        address: Address;
    };
    readonly type = "[B2BUnit] Create address";
    constructor(payload: {
        userId: string;
        orgUnitId: string;
        address: Address;
    });
}
export declare class CreateAddressFail extends StateUtils.EntityFailAction {
    payload: {
        addressId: string;
        error: any;
    };
    readonly type = "[B2BUnit] Create address fail";
    constructor(payload: {
        addressId: string;
        error: any;
    });
}
export declare class CreateAddressSuccess extends StateUtils.EntitySuccessAction {
    payload: Address;
    readonly type = "[B2BUnit] Create address success";
    constructor(payload: Address);
}
export declare class UpdateAddress extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orgUnitId: string;
        addressId: string;
        address: Address;
    };
    readonly type = "[B2BUnit] Update address";
    constructor(payload: {
        userId: string;
        orgUnitId: string;
        addressId: string;
        address: Address;
    });
}
export declare class UpdateAddressFail extends StateUtils.EntityFailAction {
    payload: {
        addressId: string;
        error: any;
    };
    readonly type = "[B2BUnit] Update address fail";
    constructor(payload: {
        addressId: string;
        error: any;
    });
}
export declare class UpdateAddressSuccess extends StateUtils.EntitySuccessAction {
    payload: Address;
    readonly type = "[B2BUnit] Update address success";
    constructor(payload: Address);
}
export declare class DeleteAddress extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orgUnitId: string;
        addressId: string;
    };
    readonly type = "[B2BUnit] Delete address";
    constructor(payload: {
        userId: string;
        orgUnitId: string;
        addressId: string;
    });
}
export declare class DeleteAddressFail extends StateUtils.EntityFailAction {
    payload: {
        addressId: string;
        error: any;
    };
    readonly type = "[B2BUnit] Delete address fail";
    constructor(payload: {
        addressId: string;
        error: any;
    });
}
export declare class DeleteAddressSuccess extends StateUtils.EntityRemoveAction {
    payload: Address;
    readonly type = "[B2BUnit] Delete address success";
    constructor(payload: Address);
}
export declare class LoadAddressSuccess extends StateUtils.EntitySuccessAction {
    payload: Address | Address[];
    readonly type = "[B2BUnit] Load address success";
    constructor(payload: Address | Address[]);
}
export declare class LoadAddresses extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orgUnitId: string;
    };
    readonly type = "[B2BUnit] Load addresses";
    constructor(payload: {
        userId: string;
        orgUnitId: string;
    });
}
export declare class LoadAddressesFail extends StateUtils.EntityFailAction {
    payload: {
        orgUnitId: string;
        error: any;
    };
    readonly type = "[B2BUnit] Load addresses fail";
    constructor(payload: {
        orgUnitId: string;
        error: any;
    });
}
export declare class LoadAddressesSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        page: ListModel;
        orgUnitId: string;
    };
    readonly type = "[B2BUnit] Load addresses success";
    constructor(payload: {
        page: ListModel;
        orgUnitId: string;
    });
}
export type OrgUnitAction = LoadOrgUnitNodes | LoadOrgUnitNodesFail | LoadOrgUnitNodesSuccess | LoadOrgUnit | LoadOrgUnitFail | LoadOrgUnitSuccess | CreateUnit | CreateUnitFail | CreateUnitSuccess | UpdateUnit | UpdateUnitFail | UpdateUnitSuccess | LoadTree | LoadTreeSuccess | LoadTreeFail | LoadApprovalProcesses | LoadApprovalProcessesSuccess | LoadApprovalProcessesFail | AssignRole | AssignRoleSuccess | AssignRoleFail | UnassignRole | UnassignRoleSuccess | UnassignRoleFail | AssignApprover | AssignApproverSuccess | AssignApproverFail | UnassignApprover | UnassignApproverSuccess | UnassignApproverFail | CreateAddress | CreateAddressSuccess | CreateAddressFail | UpdateAddress | UpdateAddressSuccess | UpdateAddressFail | DeleteAddress | DeleteAddressSuccess | DeleteAddressFail | LoadAddresses | LoadAddressesFail | LoadAddressesSuccess | LoadAddressSuccess | ClearAssignedUsers;
