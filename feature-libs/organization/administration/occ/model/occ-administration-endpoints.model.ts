/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OccEndpoint as CoreOccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint for organization customers
     *
     * @member {string}
     */
    b2bUsers?: string | CoreOccEndpoint;
    /**
     * Endpoint for organization customer
     *
     * @member {string}
     */
    b2bUser?: string | CoreOccEndpoint;
    /**
     * Endpoint for organization customer approvers
     *
     * @member {string}
     */
    b2bUserApprovers?: string | CoreOccEndpoint;
    /**
     * Endpoint for organization customer approver
     *
     * @member {string}
     */
    b2bUserApprover?: string | CoreOccEndpoint;
    /**
     * Endpoint for organization customer user groups
     *
     * @member {string}
     */
    b2bUserUserGroups?: string | CoreOccEndpoint;
    /**
     * Endpoint for organization customer user group
     *
     * @member {string}
     */
    b2bUserUserGroup?: string | CoreOccEndpoint;
    /**
     * Endpoint for organization customer permissions
     *
     * @member {string}
     */
    b2bUserPermissions?: string | CoreOccEndpoint;
    /**
     * Endpoint for organization customer permission
     *
     * @member {string}
     */
    b2bUserPermission?: string | CoreOccEndpoint;
    /**
     * Endpoint for userGroupOrderApprovalPermission
     *
     * @member {string}
     */
    budget?: string | CoreOccEndpoint;
    /**
     * Endpoint for budgets list
     *
     * @member {string}
     */
    budgets?: string | CoreOccEndpoint;
    /**
     * Endpoint for all costCenters
     *
     * @member {string}
     */
    costCentersAll?: string | CoreOccEndpoint;
    /**
     * Endpoint for costCenter
     *
     * @member {string}
     */
    costCenter?: string | CoreOccEndpoint;
    /**
     * Endpoint for userGroupOrderApprovalPermission
     *
     * @member {string}
     */
    costCenters?: string | CoreOccEndpoint;
    /**
     * Endpoint for budgets assigned to costCenter
     *
     * @member {string}
     */
    costCenterBudgets?: string | CoreOccEndpoint;
    /**
     * Endpoint for budget assigned to costCenter
     *
     * @member {string}
     */
    costCenterBudget?: string | CoreOccEndpoint;
    /**
     * Endpoint for organizations
     *
     * @member {string}
     */
    orgUnits?: string | CoreOccEndpoint;
    /**
     * Endpoint for organizations list
     *
     * @member {string}
     */
    orgUnitsAvailable?: string | CoreOccEndpoint;
    /**
     * Endpoint for organization units tree
     *
     * @member {string}
     */
    orgUnitsTree?: string | CoreOccEndpoint;
    /**
     * Endpoint for approval processes for organization units
     *
     * @member {string}
     */
    orgUnitsApprovalProcesses?: string | CoreOccEndpoint;
    /**
     * Endpoint for organization
     *
     * @member {string}
     */
    orgUnit?: string | CoreOccEndpoint;
    /**
     * Endpoint for orgUnitUsers:
     *
     * @member {string}
     */
    orgUnitUsers?: string | CoreOccEndpoint;
    /**
     * Endpoint for add orgUnitUserRoles (except approver):
     *
     * @member {string}
     */
    orgUnitUserRoles?: string | CoreOccEndpoint;
    /**
     * Endpoint for remove orgUnitUserRole (except approver):
     *
     * @member {string}
     */
    orgUnitUserRole?: string | CoreOccEndpoint;
    /**
     * Endpoint for add orgUnitApprovers:
     *
     * @member {string}
     */
    orgUnitApprovers?: string | CoreOccEndpoint;
    /**
     * Endpoint for delete orgUnitApprover:
     *
     * @member {string}
     */
    orgUnitApprover?: string | CoreOccEndpoint;
    /**
     * Endpoint for organizational unit addresses
     *
     * @member {string}
     */
    orgUnitsAddresses?: string | CoreOccEndpoint;
    /**
     * Endpoint for organizational unit address
     *
     * @member {string}
     */
    orgUnitsAddress?: string | CoreOccEndpoint;
    /**
     * Endpoint for permission list
     *
     * @member {string}
     */
    permissions?: string | CoreOccEndpoint;
    /**
     * Endpoint for permission
     *
     * @member {string}
     */
    permission?: string | CoreOccEndpoint;
    /**
     * Endpoint for order approval permission types
     *
     * @member {string}
     */
    orderApprovalPermissionTypes?: string | CoreOccEndpoint;
    /**
     * Endpoint for organizational unit user groups list
     *
     * @member {string}
     */
    userGroups?: string | CoreOccEndpoint;
    /**
     * Endpoint for organizational unit user group
     *
     * @member {string}
     */
    userGroup?: string | CoreOccEndpoint;
    /**
     * Endpoint for costCenter list
     *
     * @member {string}
     */
    userGroupAvailableOrderApprovalPermissions?: string | CoreOccEndpoint;
    /**
     * Endpoint for userGroupAvailableOrderApprovalPermissions list
     *
     * @member {string}
     */
    userGroupAvailableOrgCustomers?: string | CoreOccEndpoint;
    /**
     * Endpoint for userGroupAvailableOrgCustomers list
     *
     * @member {string}
     */
    userGroupMembers?: string | CoreOccEndpoint;
    /**
     * Endpoint for userGroupMembers list
     *
     * @member {string}
     */
    userGroupMember?: string | CoreOccEndpoint;
    /**
     * Endpoint for userGroupMember
     *
     * @member {string}
     */
    userGroupOrderApprovalPermissions?: string | CoreOccEndpoint;
    /**
     * Endpoint for userGroupOrderApprovalPermissions list
     *
     * @member {string}
     */
    userGroupOrderApprovalPermission?: string | CoreOccEndpoint;
  }
}
