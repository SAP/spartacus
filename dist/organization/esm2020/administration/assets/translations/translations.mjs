/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { en } from './en/index';
export const organizationTranslations = {
    en,
};
// expose all translation chunk mapping for organization sub features
export const organizationTranslationChunksConfig = {
    organization: [
        'orgBudget',
        'orgBudgetAssignedCostCenters',
        'orgCostCenter',
        'orgCostCenterBudgets',
        'orgCostCenterAssignedBudgets',
        'orgUnit',
        'orgUnitChildren',
        'orgUnitAssignedRoles',
        'orgUnitApprovers',
        'orgUnitAssignedApprovers',
        'orgUnitCostCenters',
        'orgUnitUsers',
        'orgUnitUserRoles',
        'orgUnitAssignedUsers',
        'orgUnitAddress',
        'orgUserGroup',
        'orgUserGroupUsers',
        'orgUserGroupAssignedUsers',
        'orgUserGroupPermissions',
        'orgUserGroupAssignedPermissions',
        'orgUser',
        'orgUserApprovers',
        'orgUserAssignedApprovers',
        'orgUserPermissions',
        'orgUserAssignedPermissions',
        'orgUserUserGroups',
        'orgUserAssignedUserGroups',
        'orgPurchaseLimit',
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9hc3NldHMvdHJhbnNsYXRpb25zL3RyYW5zbGF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBR0gsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUVoQyxNQUFNLENBQUMsTUFBTSx3QkFBd0IsR0FBeUI7SUFDNUQsRUFBRTtDQUNILENBQUM7QUFFRixxRUFBcUU7QUFDckUsTUFBTSxDQUFDLE1BQU0sbUNBQW1DLEdBQTRCO0lBQzFFLFlBQVksRUFBRTtRQUNaLFdBQVc7UUFDWCw4QkFBOEI7UUFDOUIsZUFBZTtRQUNmLHNCQUFzQjtRQUN0Qiw4QkFBOEI7UUFDOUIsU0FBUztRQUNULGlCQUFpQjtRQUNqQixzQkFBc0I7UUFDdEIsa0JBQWtCO1FBQ2xCLDBCQUEwQjtRQUMxQixvQkFBb0I7UUFDcEIsY0FBYztRQUNkLGtCQUFrQjtRQUNsQixzQkFBc0I7UUFDdEIsZ0JBQWdCO1FBRWhCLGNBQWM7UUFDZCxtQkFBbUI7UUFDbkIsMkJBQTJCO1FBQzNCLHlCQUF5QjtRQUN6QixpQ0FBaUM7UUFDakMsU0FBUztRQUNULGtCQUFrQjtRQUNsQiwwQkFBMEI7UUFDMUIsb0JBQW9CO1FBQ3BCLDRCQUE0QjtRQUM1QixtQkFBbUI7UUFDbkIsMkJBQTJCO1FBQzNCLGtCQUFrQjtLQUNuQjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBUcmFuc2xhdGlvbkNodW5rc0NvbmZpZywgVHJhbnNsYXRpb25SZXNvdXJjZXMgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgZW4gfSBmcm9tICcuL2VuL2luZGV4JztcblxuZXhwb3J0IGNvbnN0IG9yZ2FuaXphdGlvblRyYW5zbGF0aW9uczogVHJhbnNsYXRpb25SZXNvdXJjZXMgPSB7XG4gIGVuLFxufTtcblxuLy8gZXhwb3NlIGFsbCB0cmFuc2xhdGlvbiBjaHVuayBtYXBwaW5nIGZvciBvcmdhbml6YXRpb24gc3ViIGZlYXR1cmVzXG5leHBvcnQgY29uc3Qgb3JnYW5pemF0aW9uVHJhbnNsYXRpb25DaHVua3NDb25maWc6IFRyYW5zbGF0aW9uQ2h1bmtzQ29uZmlnID0ge1xuICBvcmdhbml6YXRpb246IFtcbiAgICAnb3JnQnVkZ2V0JyxcbiAgICAnb3JnQnVkZ2V0QXNzaWduZWRDb3N0Q2VudGVycycsXG4gICAgJ29yZ0Nvc3RDZW50ZXInLFxuICAgICdvcmdDb3N0Q2VudGVyQnVkZ2V0cycsXG4gICAgJ29yZ0Nvc3RDZW50ZXJBc3NpZ25lZEJ1ZGdldHMnLFxuICAgICdvcmdVbml0JyxcbiAgICAnb3JnVW5pdENoaWxkcmVuJyxcbiAgICAnb3JnVW5pdEFzc2lnbmVkUm9sZXMnLFxuICAgICdvcmdVbml0QXBwcm92ZXJzJyxcbiAgICAnb3JnVW5pdEFzc2lnbmVkQXBwcm92ZXJzJyxcbiAgICAnb3JnVW5pdENvc3RDZW50ZXJzJyxcbiAgICAnb3JnVW5pdFVzZXJzJyxcbiAgICAnb3JnVW5pdFVzZXJSb2xlcycsXG4gICAgJ29yZ1VuaXRBc3NpZ25lZFVzZXJzJyxcbiAgICAnb3JnVW5pdEFkZHJlc3MnLFxuXG4gICAgJ29yZ1VzZXJHcm91cCcsXG4gICAgJ29yZ1VzZXJHcm91cFVzZXJzJyxcbiAgICAnb3JnVXNlckdyb3VwQXNzaWduZWRVc2VycycsXG4gICAgJ29yZ1VzZXJHcm91cFBlcm1pc3Npb25zJyxcbiAgICAnb3JnVXNlckdyb3VwQXNzaWduZWRQZXJtaXNzaW9ucycsXG4gICAgJ29yZ1VzZXInLFxuICAgICdvcmdVc2VyQXBwcm92ZXJzJyxcbiAgICAnb3JnVXNlckFzc2lnbmVkQXBwcm92ZXJzJyxcbiAgICAnb3JnVXNlclBlcm1pc3Npb25zJyxcbiAgICAnb3JnVXNlckFzc2lnbmVkUGVybWlzc2lvbnMnLFxuICAgICdvcmdVc2VyVXNlckdyb3VwcycsXG4gICAgJ29yZ1VzZXJBc3NpZ25lZFVzZXJHcm91cHMnLFxuICAgICdvcmdQdXJjaGFzZUxpbWl0JyxcbiAgXSxcbn07XG4iXX0=