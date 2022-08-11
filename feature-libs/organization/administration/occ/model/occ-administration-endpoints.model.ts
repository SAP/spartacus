import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint for organization customers
     *
     * @member {string}
     */
    b2bUsers?: string | OccEndpoint;
    /**
     * Endpoint for organization customer
     *
     * @member {string}
     */
    b2bUser?: string | OccEndpoint;
    /**
     * Endpoint for organization customer approvers
     *
     * @member {string}
     */
    b2bUserApprovers?: string | OccEndpoint;
    /**
     * Endpoint for organization customer approver
     *
     * @member {string}
     */
    b2bUserApprover?: string | OccEndpoint;
    /**
     * Endpoint for organization customer user groups
     *
     * @member {string}
     */
    b2bUserUserGroups?: string | OccEndpoint;
    /**
     * Endpoint for organization customer user group
     *
     * @member {string}
     */
    b2bUserUserGroup?: string | OccEndpoint;
    /**
     * Endpoint for organization customer permissions
     *
     * @member {string}
     */
    b2bUserPermissions?: string | OccEndpoint;
    /**
     * Endpoint for organization customer permission
     *
     * @member {string}
     */
    b2bUserPermission?: string | OccEndpoint;
    /**
     * Endpoint for userGroupOrderApprovalPermission
     *
     * @member {string}
     */
    budget?: string | OccEndpoint;
    /**
     * Endpoint for budgets list
     *
     * @member {string}
     */
    budgets?: string | OccEndpoint;
    /**
     * Endpoint for all costCenters
     *
     * @member {string}
     */
    costCentersAll?: string | OccEndpoint;
    /**
     * Endpoint for costCenter
     *
     * @member {string}
     */
    costCenter?: string | OccEndpoint;
    /**
     * Endpoint for userGroupOrderApprovalPermission
     *
     * @member {string}
     */
    costCenters?: string | OccEndpoint;
    /**
     * Endpoint for budgets assigned to costCenter
     *
     * @member {string}
     */
    costCenterBudgets?: string | OccEndpoint;
    /**
     * Endpoint for budget assigned to costCenter
     *
     * @member {string}
     */
    costCenterBudget?: string | OccEndpoint;
    /**
     * Endpoint for organizations
     *
     * @member {string}
     */
    orgUnits?: string | OccEndpoint;
    /**
     * Endpoint for organizations list
     *
     * @member {string}
     */
    orgUnitsAvailable?: string | OccEndpoint;
    /**
     * Endpoint for organization units tree
     *
     * @member {string}
     */
    orgUnitsTree?: string | OccEndpoint;
    /**
     * Endpoint for approval processes for organization units
     *
     * @member {string}
     */
    orgUnitsApprovalProcesses?: string | OccEndpoint;
    /**
     * Endpoint for organization
     *
     * @member {string}
     */
    orgUnit?: string | OccEndpoint;
    /**
     * Endpoint for orgUnitUsers:
     *
     * @member {string}
     */
    orgUnitUsers?: string | OccEndpoint;
    /**
     * Endpoint for add orgUnitUserRoles (except approver):
     *
     * @member {string}
     */
    orgUnitUserRoles?: string | OccEndpoint;
    /**
     * Endpoint for remove orgUnitUserRole (except approver):
     *
     * @member {string}
     */
    orgUnitUserRole?: string | OccEndpoint;
    /**
     * Endpoint for add orgUnitApprovers:
     *
     * @member {string}
     */
    orgUnitApprovers?: string | OccEndpoint;
    /**
     * Endpoint for delete orgUnitApprover:
     *
     * @member {string}
     */
    orgUnitApprover?: string | OccEndpoint;
    /**
     * Endpoint for organizational unit addresses
     *
     * @member {string}
     */
    orgUnitsAddresses?: string | OccEndpoint;
    /**
     * Endpoint for organizational unit address
     *
     * @member {string}
     */
    orgUnitsAddress?: string | OccEndpoint;
    /**
     * Endpoint for permission list
     *
     * @member {string}
     */
    permissions?: string | OccEndpoint;
    /**
     * Endpoint for permission
     *
     * @member {string}
     */
    permission?: string | OccEndpoint;
    /**
     * Endpoint for order approval permission types
     *
     * @member {string}
     */
    orderApprovalPermissionTypes?: string | OccEndpoint;
    /**
     * Endpoint for organizational unit user groups list
     *
     * @member {string}
     */
    userGroups?: string | OccEndpoint;
    /**
     * Endpoint for organizational unit user group
     *
     * @member {string}
     */
    userGroup?: string | OccEndpoint;
    /**
     * Endpoint for costCenter list
     *
     * @member {string}
     */
    userGroupAvailableOrderApprovalPermissions?: string | OccEndpoint;
    /**
     * Endpoint for userGroupAvailableOrderApprovalPermissions list
     *
     * @member {string}
     */
    userGroupAvailableOrgCustomers?: string | OccEndpoint;
    /**
     * Endpoint for userGroupAvailableOrgCustomers list
     *
     * @member {string}
     */
    userGroupMembers?: string | OccEndpoint;
    /**
     * Endpoint for userGroupMembers list
     *
     * @member {string}
     */
    userGroupMember?: string | OccEndpoint;
    /**
     * Endpoint for userGroupMember
     *
     * @member {string}
     */
    userGroupOrderApprovalPermissions?: string | OccEndpoint;
    /**
     * Endpoint for userGroupOrderApprovalPermissions list
     *
     * @member {string}
     */
    userGroupOrderApprovalPermission?: string | OccEndpoint;
  }
}
