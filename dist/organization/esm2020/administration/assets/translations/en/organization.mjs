/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { orgBudget, orgBudgetAssignedCostCenters } from './budget.i18n';
import { orgCostCenter, orgCostCenterAssignedBudgets, orgCostCenterBudgets, } from './cost-center.i18n';
import { orgPurchaseLimit } from './permission.i18n';
import { orgUnit, orgUnitAddress, orgUnitApprovers, orgUnitAssignedApprovers, orgUnitAssignedRoles, orgUnitAssignedUsers, orgUnitChildren, orgUnitCostCenters, orgUnitUserRoles, orgUnitUsers, } from './units.i18n';
import { orgUserGroup, orgUserGroupAssignedPermissions, orgUserGroupAssignedUsers, orgUserGroupPermissions, orgUserGroupUsers, } from './user-group.i18n';
import { orgUser, orgUserApprovers, orgUserAssignedApprovers, orgUserAssignedPermissions, orgUserAssignedUserGroups, orgUserPermissions, orgUserUserGroups, } from './user.i18n';
/**
 * The organization i18n labels provide generic labels for all organization sub features.
 * Once #7154 is in place, we can start adding specific i18n labels. The organization labels
 * will then serve as a backup.
 */
export const organization = {
    organization: {
        enabled: 'Active',
        disabled: 'Disabled',
        enable: 'Enable',
        disable: 'Disable',
        name: 'Name',
        code: 'Code',
        done: 'done',
        cancel: 'Cancel',
        add: 'Add',
        manageUsers: 'Manage Users',
        create: 'Create {{name}}',
        edit: 'Edit',
        save: 'Save {{name}}',
        delete: 'Delete',
        assign: 'Manage',
        active: 'Active',
        status: 'Status',
        details: 'Details',
        messages: {
            emptyList: 'The list is empty',
        },
        userRoles: {
            b2bcustomergroup: 'Customer',
            b2bapprovergroup: 'Approver',
            b2bmanagergroup: 'Manager',
            b2badmingroup: 'Admin',
        },
        userRights: {
            unitorderviewergroup: 'View Unit-Level Orders',
        },
        breadcrumb: 'Organization',
        notification: {
            noSufficientPermissions: 'No sufficient permissions to access this page',
            notExist: 'This item does not exist',
            disabled: 'You cannot edit a disabled item',
        },
        confirmation: {
            cancel: 'CANCEL',
            confirm: 'CONFIRM',
            disable: 'DISABLE',
            delete: 'DELETE',
        },
        httpHandlers: {
            conflict: {
                budget: 'Budget with code {{ code }} already exists.',
                costCenter: 'Cost center with code {{ code }} already exists.',
                unit: 'Organizational unit with uid {{ code }} already exists.',
                user: 'User with email {{ code }} already exists',
                userGroup: 'User Group with id {{ code }} already exists',
                permission: 'Approval Permission with code {{ code }} already exists.',
                unknown: 'Server validation error.',
            },
        },
        information: 'Information',
    },
    // sub feature labels are added below
    orgCostCenter,
    orgCostCenterBudgets,
    orgCostCenterAssignedBudgets,
    orgBudget,
    orgBudgetAssignedCostCenters,
    orgUnit,
    orgUnitChildren,
    orgUnitApprovers,
    orgUnitAssignedApprovers,
    orgUnitAssignedRoles,
    orgUnitUsers,
    orgUnitUserRoles,
    orgUnitAssignedUsers,
    orgUnitCostCenters,
    orgUnitAddress,
    orgUserGroup,
    orgUserGroupUsers,
    orgUserGroupAssignedUsers,
    orgUserGroupPermissions,
    orgUserGroupAssignedPermissions,
    orgUser,
    orgUserUserGroups,
    orgUserAssignedUserGroups,
    orgUserApprovers,
    orgUserAssignedApprovers,
    orgUserPermissions,
    orgUserAssignedPermissions,
    orgPurchaseLimit,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9hc3NldHMvdHJhbnNsYXRpb25zL2VuL29yZ2FuaXphdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQ0wsYUFBYSxFQUNiLDRCQUE0QixFQUM1QixvQkFBb0IsR0FDckIsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRCxPQUFPLEVBQ0wsT0FBTyxFQUNQLGNBQWMsRUFDZCxnQkFBZ0IsRUFDaEIsd0JBQXdCLEVBQ3hCLG9CQUFvQixFQUNwQixvQkFBb0IsRUFDcEIsZUFBZSxFQUNmLGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsWUFBWSxHQUNiLE1BQU0sY0FBYyxDQUFDO0FBQ3RCLE9BQU8sRUFDTCxZQUFZLEVBQ1osK0JBQStCLEVBQy9CLHlCQUF5QixFQUN6Qix1QkFBdUIsRUFDdkIsaUJBQWlCLEdBQ2xCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUNMLE9BQU8sRUFDUCxnQkFBZ0IsRUFDaEIsd0JBQXdCLEVBQ3hCLDBCQUEwQixFQUMxQix5QkFBeUIsRUFDekIsa0JBQWtCLEVBQ2xCLGlCQUFpQixHQUNsQixNQUFNLGFBQWEsQ0FBQztBQUVyQjs7OztHQUlHO0FBRUgsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHO0lBQzFCLFlBQVksRUFBRTtRQUNaLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLFFBQVEsRUFBRSxVQUFVO1FBRXBCLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE9BQU8sRUFBRSxTQUFTO1FBRWxCLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLE1BQU07UUFFWixJQUFJLEVBQUUsTUFBTTtRQUVaLE1BQU0sRUFBRSxRQUFRO1FBRWhCLEdBQUcsRUFBRSxLQUFLO1FBQ1YsV0FBVyxFQUFFLGNBQWM7UUFDM0IsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxRQUFRO1FBRWhCLE1BQU0sRUFBRSxRQUFRO1FBRWhCLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE9BQU8sRUFBRSxTQUFTO1FBRWxCLFFBQVEsRUFBRTtZQUNSLFNBQVMsRUFBRSxtQkFBbUI7U0FDL0I7UUFDRCxTQUFTLEVBQUU7WUFDVCxnQkFBZ0IsRUFBRSxVQUFVO1lBQzVCLGdCQUFnQixFQUFFLFVBQVU7WUFDNUIsZUFBZSxFQUFFLFNBQVM7WUFDMUIsYUFBYSxFQUFFLE9BQU87U0FDdkI7UUFFRCxVQUFVLEVBQUU7WUFDVixvQkFBb0IsRUFBRSx3QkFBd0I7U0FDL0M7UUFFRCxVQUFVLEVBQUUsY0FBYztRQUUxQixZQUFZLEVBQUU7WUFDWix1QkFBdUIsRUFBRSwrQ0FBK0M7WUFDeEUsUUFBUSxFQUFFLDBCQUEwQjtZQUNwQyxRQUFRLEVBQUUsaUNBQWlDO1NBQzVDO1FBRUQsWUFBWSxFQUFFO1lBQ1osTUFBTSxFQUFFLFFBQVE7WUFDaEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsTUFBTSxFQUFFLFFBQVE7U0FDakI7UUFFRCxZQUFZLEVBQUU7WUFDWixRQUFRLEVBQUU7Z0JBQ1IsTUFBTSxFQUFFLDZDQUE2QztnQkFDckQsVUFBVSxFQUFFLGtEQUFrRDtnQkFDOUQsSUFBSSxFQUFFLHlEQUF5RDtnQkFDL0QsSUFBSSxFQUFFLDJDQUEyQztnQkFDakQsU0FBUyxFQUFFLDhDQUE4QztnQkFDekQsVUFBVSxFQUFFLDBEQUEwRDtnQkFDdEUsT0FBTyxFQUFFLDBCQUEwQjthQUNwQztTQUNGO1FBQ0QsV0FBVyxFQUFFLGFBQWE7S0FDM0I7SUFFRCxxQ0FBcUM7SUFDckMsYUFBYTtJQUNiLG9CQUFvQjtJQUNwQiw0QkFBNEI7SUFDNUIsU0FBUztJQUNULDRCQUE0QjtJQUM1QixPQUFPO0lBQ1AsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQix3QkFBd0I7SUFDeEIsb0JBQW9CO0lBQ3BCLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsb0JBQW9CO0lBQ3BCLGtCQUFrQjtJQUNsQixjQUFjO0lBRWQsWUFBWTtJQUNaLGlCQUFpQjtJQUNqQix5QkFBeUI7SUFDekIsdUJBQXVCO0lBQ3ZCLCtCQUErQjtJQUMvQixPQUFPO0lBQ1AsaUJBQWlCO0lBQ2pCLHlCQUF5QjtJQUN6QixnQkFBZ0I7SUFDaEIsd0JBQXdCO0lBQ3hCLGtCQUFrQjtJQUNsQiwwQkFBMEI7SUFDMUIsZ0JBQWdCO0NBQ2pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBvcmdCdWRnZXQsIG9yZ0J1ZGdldEFzc2lnbmVkQ29zdENlbnRlcnMgfSBmcm9tICcuL2J1ZGdldC5pMThuJztcbmltcG9ydCB7XG4gIG9yZ0Nvc3RDZW50ZXIsXG4gIG9yZ0Nvc3RDZW50ZXJBc3NpZ25lZEJ1ZGdldHMsXG4gIG9yZ0Nvc3RDZW50ZXJCdWRnZXRzLFxufSBmcm9tICcuL2Nvc3QtY2VudGVyLmkxOG4nO1xuaW1wb3J0IHsgb3JnUHVyY2hhc2VMaW1pdCB9IGZyb20gJy4vcGVybWlzc2lvbi5pMThuJztcbmltcG9ydCB7XG4gIG9yZ1VuaXQsXG4gIG9yZ1VuaXRBZGRyZXNzLFxuICBvcmdVbml0QXBwcm92ZXJzLFxuICBvcmdVbml0QXNzaWduZWRBcHByb3ZlcnMsXG4gIG9yZ1VuaXRBc3NpZ25lZFJvbGVzLFxuICBvcmdVbml0QXNzaWduZWRVc2VycyxcbiAgb3JnVW5pdENoaWxkcmVuLFxuICBvcmdVbml0Q29zdENlbnRlcnMsXG4gIG9yZ1VuaXRVc2VyUm9sZXMsXG4gIG9yZ1VuaXRVc2Vycyxcbn0gZnJvbSAnLi91bml0cy5pMThuJztcbmltcG9ydCB7XG4gIG9yZ1VzZXJHcm91cCxcbiAgb3JnVXNlckdyb3VwQXNzaWduZWRQZXJtaXNzaW9ucyxcbiAgb3JnVXNlckdyb3VwQXNzaWduZWRVc2VycyxcbiAgb3JnVXNlckdyb3VwUGVybWlzc2lvbnMsXG4gIG9yZ1VzZXJHcm91cFVzZXJzLFxufSBmcm9tICcuL3VzZXItZ3JvdXAuaTE4bic7XG5pbXBvcnQge1xuICBvcmdVc2VyLFxuICBvcmdVc2VyQXBwcm92ZXJzLFxuICBvcmdVc2VyQXNzaWduZWRBcHByb3ZlcnMsXG4gIG9yZ1VzZXJBc3NpZ25lZFBlcm1pc3Npb25zLFxuICBvcmdVc2VyQXNzaWduZWRVc2VyR3JvdXBzLFxuICBvcmdVc2VyUGVybWlzc2lvbnMsXG4gIG9yZ1VzZXJVc2VyR3JvdXBzLFxufSBmcm9tICcuL3VzZXIuaTE4bic7XG5cbi8qKlxuICogVGhlIG9yZ2FuaXphdGlvbiBpMThuIGxhYmVscyBwcm92aWRlIGdlbmVyaWMgbGFiZWxzIGZvciBhbGwgb3JnYW5pemF0aW9uIHN1YiBmZWF0dXJlcy5cbiAqIE9uY2UgIzcxNTQgaXMgaW4gcGxhY2UsIHdlIGNhbiBzdGFydCBhZGRpbmcgc3BlY2lmaWMgaTE4biBsYWJlbHMuIFRoZSBvcmdhbml6YXRpb24gbGFiZWxzXG4gKiB3aWxsIHRoZW4gc2VydmUgYXMgYSBiYWNrdXAuXG4gKi9cblxuZXhwb3J0IGNvbnN0IG9yZ2FuaXphdGlvbiA9IHtcbiAgb3JnYW5pemF0aW9uOiB7XG4gICAgZW5hYmxlZDogJ0FjdGl2ZScsXG4gICAgZGlzYWJsZWQ6ICdEaXNhYmxlZCcsXG5cbiAgICBlbmFibGU6ICdFbmFibGUnLFxuICAgIGRpc2FibGU6ICdEaXNhYmxlJyxcblxuICAgIG5hbWU6ICdOYW1lJyxcbiAgICBjb2RlOiAnQ29kZScsXG5cbiAgICBkb25lOiAnZG9uZScsXG5cbiAgICBjYW5jZWw6ICdDYW5jZWwnLFxuXG4gICAgYWRkOiAnQWRkJyxcbiAgICBtYW5hZ2VVc2VyczogJ01hbmFnZSBVc2VycycsXG4gICAgY3JlYXRlOiAnQ3JlYXRlIHt7bmFtZX19JyxcbiAgICBlZGl0OiAnRWRpdCcsXG4gICAgc2F2ZTogJ1NhdmUge3tuYW1lfX0nLFxuICAgIGRlbGV0ZTogJ0RlbGV0ZScsXG5cbiAgICBhc3NpZ246ICdNYW5hZ2UnLFxuXG4gICAgYWN0aXZlOiAnQWN0aXZlJyxcbiAgICBzdGF0dXM6ICdTdGF0dXMnLFxuICAgIGRldGFpbHM6ICdEZXRhaWxzJyxcblxuICAgIG1lc3NhZ2VzOiB7XG4gICAgICBlbXB0eUxpc3Q6ICdUaGUgbGlzdCBpcyBlbXB0eScsXG4gICAgfSxcbiAgICB1c2VyUm9sZXM6IHtcbiAgICAgIGIyYmN1c3RvbWVyZ3JvdXA6ICdDdXN0b21lcicsXG4gICAgICBiMmJhcHByb3Zlcmdyb3VwOiAnQXBwcm92ZXInLFxuICAgICAgYjJibWFuYWdlcmdyb3VwOiAnTWFuYWdlcicsXG4gICAgICBiMmJhZG1pbmdyb3VwOiAnQWRtaW4nLFxuICAgIH0sXG5cbiAgICB1c2VyUmlnaHRzOiB7XG4gICAgICB1bml0b3JkZXJ2aWV3ZXJncm91cDogJ1ZpZXcgVW5pdC1MZXZlbCBPcmRlcnMnLFxuICAgIH0sXG5cbiAgICBicmVhZGNydW1iOiAnT3JnYW5pemF0aW9uJyxcblxuICAgIG5vdGlmaWNhdGlvbjoge1xuICAgICAgbm9TdWZmaWNpZW50UGVybWlzc2lvbnM6ICdObyBzdWZmaWNpZW50IHBlcm1pc3Npb25zIHRvIGFjY2VzcyB0aGlzIHBhZ2UnLFxuICAgICAgbm90RXhpc3Q6ICdUaGlzIGl0ZW0gZG9lcyBub3QgZXhpc3QnLFxuICAgICAgZGlzYWJsZWQ6ICdZb3UgY2Fubm90IGVkaXQgYSBkaXNhYmxlZCBpdGVtJyxcbiAgICB9LFxuXG4gICAgY29uZmlybWF0aW9uOiB7XG4gICAgICBjYW5jZWw6ICdDQU5DRUwnLFxuICAgICAgY29uZmlybTogJ0NPTkZJUk0nLFxuICAgICAgZGlzYWJsZTogJ0RJU0FCTEUnLFxuICAgICAgZGVsZXRlOiAnREVMRVRFJyxcbiAgICB9LFxuXG4gICAgaHR0cEhhbmRsZXJzOiB7XG4gICAgICBjb25mbGljdDoge1xuICAgICAgICBidWRnZXQ6ICdCdWRnZXQgd2l0aCBjb2RlIHt7IGNvZGUgfX0gYWxyZWFkeSBleGlzdHMuJyxcbiAgICAgICAgY29zdENlbnRlcjogJ0Nvc3QgY2VudGVyIHdpdGggY29kZSB7eyBjb2RlIH19IGFscmVhZHkgZXhpc3RzLicsXG4gICAgICAgIHVuaXQ6ICdPcmdhbml6YXRpb25hbCB1bml0IHdpdGggdWlkIHt7IGNvZGUgfX0gYWxyZWFkeSBleGlzdHMuJyxcbiAgICAgICAgdXNlcjogJ1VzZXIgd2l0aCBlbWFpbCB7eyBjb2RlIH19IGFscmVhZHkgZXhpc3RzJyxcbiAgICAgICAgdXNlckdyb3VwOiAnVXNlciBHcm91cCB3aXRoIGlkIHt7IGNvZGUgfX0gYWxyZWFkeSBleGlzdHMnLFxuICAgICAgICBwZXJtaXNzaW9uOiAnQXBwcm92YWwgUGVybWlzc2lvbiB3aXRoIGNvZGUge3sgY29kZSB9fSBhbHJlYWR5IGV4aXN0cy4nLFxuICAgICAgICB1bmtub3duOiAnU2VydmVyIHZhbGlkYXRpb24gZXJyb3IuJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBpbmZvcm1hdGlvbjogJ0luZm9ybWF0aW9uJyxcbiAgfSxcblxuICAvLyBzdWIgZmVhdHVyZSBsYWJlbHMgYXJlIGFkZGVkIGJlbG93XG4gIG9yZ0Nvc3RDZW50ZXIsXG4gIG9yZ0Nvc3RDZW50ZXJCdWRnZXRzLFxuICBvcmdDb3N0Q2VudGVyQXNzaWduZWRCdWRnZXRzLFxuICBvcmdCdWRnZXQsXG4gIG9yZ0J1ZGdldEFzc2lnbmVkQ29zdENlbnRlcnMsXG4gIG9yZ1VuaXQsXG4gIG9yZ1VuaXRDaGlsZHJlbixcbiAgb3JnVW5pdEFwcHJvdmVycyxcbiAgb3JnVW5pdEFzc2lnbmVkQXBwcm92ZXJzLFxuICBvcmdVbml0QXNzaWduZWRSb2xlcyxcbiAgb3JnVW5pdFVzZXJzLFxuICBvcmdVbml0VXNlclJvbGVzLFxuICBvcmdVbml0QXNzaWduZWRVc2VycyxcbiAgb3JnVW5pdENvc3RDZW50ZXJzLFxuICBvcmdVbml0QWRkcmVzcyxcblxuICBvcmdVc2VyR3JvdXAsXG4gIG9yZ1VzZXJHcm91cFVzZXJzLFxuICBvcmdVc2VyR3JvdXBBc3NpZ25lZFVzZXJzLFxuICBvcmdVc2VyR3JvdXBQZXJtaXNzaW9ucyxcbiAgb3JnVXNlckdyb3VwQXNzaWduZWRQZXJtaXNzaW9ucyxcbiAgb3JnVXNlcixcbiAgb3JnVXNlclVzZXJHcm91cHMsXG4gIG9yZ1VzZXJBc3NpZ25lZFVzZXJHcm91cHMsXG4gIG9yZ1VzZXJBcHByb3ZlcnMsXG4gIG9yZ1VzZXJBc3NpZ25lZEFwcHJvdmVycyxcbiAgb3JnVXNlclBlcm1pc3Npb25zLFxuICBvcmdVc2VyQXNzaWduZWRQZXJtaXNzaW9ucyxcbiAgb3JnUHVyY2hhc2VMaW1pdCxcbn07XG4iXX0=