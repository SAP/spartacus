import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { provideDefaultConfig, provideDefaultConfigFactory } from '@spartacus/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Names of the route params used in the organization administration feature
 */
const ROUTE_PARAMS = {
    budgetCode: 'budgetCode',
    unitCode: 'unitCode',
    costCenterCode: 'costCenterCode',
    userCode: 'userCode',
    userGroupCode: 'userGroupCode',
    permissionCode: 'permissionCode',
    addressCode: 'addressId',
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const listPath$5 = `organization/budgets/:${ROUTE_PARAMS.budgetCode}`;
const paramsMapping$5 = {
    budgetCode: 'code',
};
const defaultBudgetRoutingConfig = {
    routing: {
        routes: {
            orgBudget: {
                paths: ['organization/budgets'],
            },
            orgBudgetCreate: {
                paths: ['organization/budgets/create'],
            },
            orgBudgetDetails: {
                paths: [`${listPath$5}`],
                paramsMapping: paramsMapping$5,
            },
            orgBudgetCostCenters: {
                paths: [`${listPath$5}/cost-centers`],
                paramsMapping: paramsMapping$5,
            },
            orgBudgetEdit: {
                paths: [`${listPath$5}/edit`],
                paramsMapping: paramsMapping$5,
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const listPath$4 = `organization/cost-centers/:${ROUTE_PARAMS.costCenterCode}`;
const paramsMapping$4 = {
    costCenterCode: 'code',
};
const defaultCostCenterRoutingConfig = {
    routing: {
        routes: {
            orgCostCenter: {
                paths: ['organization/cost-centers'],
            },
            orgCostCenterCreate: {
                paths: ['organization/cost-centers/create'],
            },
            orgCostCenterDetails: {
                paths: [`${listPath$4}`],
                paramsMapping: paramsMapping$4,
            },
            orgCostCenterBudgets: {
                paths: [`${listPath$4}/budgets`],
                paramsMapping: paramsMapping$4,
            },
            orgCostCenterAssignBudgets: {
                paths: [`${listPath$4}/budgets/assign`],
                paramsMapping: paramsMapping$4,
            },
            orgCostCenterEdit: {
                paths: [`${listPath$4}/edit`],
                paramsMapping: paramsMapping$4,
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultOrganizationLayoutConfig = {
    layoutSlots: {
        CompanyPageTemplate: {
            slots: ['BodyContent'],
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const listPath$3 = `organization/purchase-limits/:${ROUTE_PARAMS.permissionCode}`;
const paramsMapping$3 = {
    permissionCode: 'code',
};
const defaultPermissionRoutingConfig = {
    routing: {
        routes: {
            orgPurchaseLimit: {
                paths: ['organization/purchase-limits'],
            },
            orgPurchaseLimitCreate: {
                paths: ['organization/purchase-limits/create'],
            },
            orgPurchaseLimitDetails: {
                paths: [listPath$3],
                paramsMapping: paramsMapping$3,
            },
            orgPurchaseLimitEdit: {
                paths: [`${listPath$3}/edit`],
                paramsMapping: paramsMapping$3,
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const listPath$2 = `organization/units/:${ROUTE_PARAMS.unitCode}`;
const paramsMapping$2 = {
    unitCode: 'uid',
    addressId: 'id',
    userCode: 'customerId',
};
const defaultUnitsRoutingConfig = {
    routing: {
        routes: {
            orgUnits: {
                paths: ['organization/units'],
            },
            orgUnitCreate: {
                paths: ['organization/units/create'],
            },
            orgUnitDetails: {
                paths: [listPath$2],
                paramsMapping: paramsMapping$2,
            },
            orgUnitEdit: {
                paths: [`${listPath$2}/edit`],
                paramsMapping: paramsMapping$2,
            },
            orgUnitChildren: {
                paths: [`${listPath$2}/children`],
                paramsMapping: paramsMapping$2,
            },
            orgUnitCreateChild: {
                paths: [`${listPath$2}/children/create`],
                paramsMapping: paramsMapping$2,
            },
            orgUnitUserList: {
                paths: [`${listPath$2}/users`],
                paramsMapping: paramsMapping$2,
            },
            orgUnitCreateUser: {
                paths: [`${listPath$2}/users/create`],
                paramsMapping: paramsMapping$2,
            },
            orgUnitUserRoles: {
                paths: [`${listPath$2}/users/:userCode/roles`],
                paramsMapping: paramsMapping$2,
            },
            orgUnitApprovers: {
                paths: [`${listPath$2}/approvers`],
                paramsMapping: paramsMapping$2,
            },
            orgUnitAssignApprovers: {
                paths: [`${listPath$2}/approvers/assign`],
                paramsMapping: paramsMapping$2,
            },
            orgUnitAddressList: {
                paths: [`${listPath$2}/addresses`],
                paramsMapping: paramsMapping$2,
            },
            orgUnitAddressCreate: {
                paths: [`${listPath$2}/addresses/create`],
                paramsMapping: paramsMapping$2,
            },
            orgUnitAddressDetails: {
                paths: [`${listPath$2}/addresses/:addressId`],
                paramsMapping: paramsMapping$2,
            },
            orgUnitAddressEdit: {
                paths: [`${listPath$2}/addresses/:addressId/edit`],
                paramsMapping: paramsMapping$2,
            },
            orgUnitCostCenters: {
                paths: [`${listPath$2}/cost-centers`],
                paramsMapping: paramsMapping$2,
            },
            orgUnitCreateCostCenter: {
                paths: [`${listPath$2}/cost-centers/create`],
                paramsMapping: paramsMapping$2,
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const listPath$1 = `organization/user-groups/:${ROUTE_PARAMS.userGroupCode}`;
const paramsMapping$1 = {
    userGroupCode: 'uid',
};
// TODO: this doesn't work with lazy loaded feature
const defaultUserGroupRoutingConfig = {
    routing: {
        routes: {
            orgUserGroup: {
                paths: ['organization/user-groups'],
            },
            orgUserGroupCreate: {
                paths: ['organization/user-groups/create'],
            },
            orgUserGroupDetails: {
                paths: [listPath$1],
                paramsMapping: paramsMapping$1,
            },
            orgUserGroupEdit: {
                paths: [`${listPath$1}/edit`],
                paramsMapping: paramsMapping$1,
            },
            orgUserGroupUsers: {
                paths: [`${listPath$1}/users`],
                paramsMapping: paramsMapping$1,
            },
            orgUserGroupAssignUsers: {
                paths: [`${listPath$1}/users/assign`],
                paramsMapping: paramsMapping$1,
            },
            orgUserGroupPermissions: {
                paths: [`${listPath$1}/purchase-limits`],
                paramsMapping: paramsMapping$1,
            },
            orgUserGroupAssignPermissions: {
                paths: [`${listPath$1}/purchase-limits/assign`],
                paramsMapping: paramsMapping$1,
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const listPath = `organization/users/:${ROUTE_PARAMS.userCode}`;
const paramsMapping = {
    userCode: 'customerId',
};
const defaultUserRoutingConfig = {
    routing: {
        routes: {
            orgUser: {
                paths: ['organization/users'],
            },
            orgUserCreate: {
                paths: ['organization/users/create'],
            },
            orgUserDetails: {
                paths: [listPath],
                paramsMapping,
            },
            orgUserEdit: {
                paths: [`${listPath}/edit`],
                paramsMapping,
            },
            orgUserChangePassword: {
                paths: [`${listPath}/change-password`],
                paramsMapping,
            },
            orgUserApprovers: {
                paths: [`${listPath}/approvers`],
                paramsMapping,
            },
            orgUserAssignApprovers: {
                paths: [`${listPath}/approvers/assign`],
                paramsMapping,
            },
            orgUserPermissions: {
                paths: [`${listPath}/purchase-limits`],
                paramsMapping,
            },
            orgUserAssignPermissions: {
                paths: [`${listPath}/purchase-limits/assign`],
                paramsMapping,
            },
            orgUserUserGroups: {
                paths: [`${listPath}/user-groups`],
                paramsMapping,
            },
            orgUserAssignUserGroups: {
                paths: [`${listPath}/user-groups/assign`],
                paramsMapping,
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ORGANIZATION_ADMINISTRATION_FEATURE = 'organizationAdministration';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// TODO: Inline this factory when we start releasing Ivy compiled libraries
function defaultOrganizationAdministrationComponentsConfig() {
    const config = {
        featureModules: {
            [ORGANIZATION_ADMINISTRATION_FEATURE]: {
                cmsComponents: [
                    'ManageBudgetsListComponent',
                    'ManageCostCentersListComponent',
                    'ManagePermissionsListComponent',
                    'ManageUnitsListComponent',
                    'ManageUsersListComponent',
                    'ManageUserGroupsListComponent',
                ],
            },
        },
    };
    return config;
}
class AdministrationRootModule {
}
AdministrationRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AdministrationRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AdministrationRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AdministrationRootModule });
AdministrationRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AdministrationRootModule, providers: [
        provideDefaultConfig(defaultOrganizationLayoutConfig),
        provideDefaultConfig({
            routing: { routes: { organization: { paths: ['organization'] } } },
        }),
        provideDefaultConfig(defaultBudgetRoutingConfig),
        provideDefaultConfig(defaultCostCenterRoutingConfig),
        provideDefaultConfig(defaultPermissionRoutingConfig),
        provideDefaultConfig(defaultUnitsRoutingConfig),
        provideDefaultConfig(defaultUserRoutingConfig),
        provideDefaultConfig(defaultUserGroupRoutingConfig),
        provideDefaultConfigFactory(defaultOrganizationAdministrationComponentsConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AdministrationRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfig(defaultOrganizationLayoutConfig),
                        provideDefaultConfig({
                            routing: { routes: { organization: { paths: ['organization'] } } },
                        }),
                        provideDefaultConfig(defaultBudgetRoutingConfig),
                        provideDefaultConfig(defaultCostCenterRoutingConfig),
                        provideDefaultConfig(defaultPermissionRoutingConfig),
                        provideDefaultConfig(defaultUnitsRoutingConfig),
                        provideDefaultConfig(defaultUserRoutingConfig),
                        provideDefaultConfig(defaultUserGroupRoutingConfig),
                        provideDefaultConfigFactory(defaultOrganizationAdministrationComponentsConfig),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AdministrationRootModule, ORGANIZATION_ADMINISTRATION_FEATURE, ROUTE_PARAMS, defaultBudgetRoutingConfig, defaultCostCenterRoutingConfig, defaultOrganizationAdministrationComponentsConfig, defaultOrganizationLayoutConfig, defaultPermissionRoutingConfig, defaultUnitsRoutingConfig, defaultUserGroupRoutingConfig, defaultUserRoutingConfig };
//# sourceMappingURL=spartacus-organization-administration-root.mjs.map
