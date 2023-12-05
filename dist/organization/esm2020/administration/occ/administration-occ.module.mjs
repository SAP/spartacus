/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CostCenterOccModule, provideDefaultConfig } from '@spartacus/core';
import { B2BUNIT_APPROVAL_PROCESSES_NORMALIZER, B2BUNIT_NODE_LIST_NORMALIZER, B2BUNIT_NODE_NORMALIZER, B2BUNIT_NORMALIZER, B2BUserAdapter, B2B_USERS_NORMALIZER, B2B_USER_NORMALIZER, B2B_USER_SERIALIZER, BudgetAdapter, BUDGETS_NORMALIZER, BUDGET_NORMALIZER, BUDGET_SERIALIZER, CostCenterAdapter, OrgUnitAdapter, PermissionAdapter, PERMISSIONS_NORMALIZER, PERMISSION_NORMALIZER, PERMISSION_TYPES_NORMALIZER, PERMISSION_TYPE_NORMALIZER, UserGroupAdapter, USER_GROUPS_NORMALIZER, USER_GROUP_NORMALIZER, } from '@spartacus/organization/administration/core';
import { OccB2BUserAdapter } from './adapters/occ-b2b-users.adapter';
import { OccBudgetAdapter } from './adapters/occ-budget.adapter';
import { OccCostCenterAdapter } from './adapters/occ-cost-center.adapter';
import { OccOrgUnitAdapter } from './adapters/occ-org-unit.adapter';
import { OccPermissionAdapter } from './adapters/occ-permission.adapter';
import { OccUserGroupAdapter } from './adapters/occ-user-group.adapter';
import { defaultOccOrganizationConfig } from './config/default-occ-organization-config';
import { OccBudgetSerializer } from './converters/occ-budget-serializer';
import { OccB2BUserNormalizer } from './converters/occ-b2b-user-normalizer';
import { OccB2bUserSerializer } from './converters/occ-b2b-user-serializer';
import { OccBudgetListNormalizer } from './converters/occ-budget-list-normalizer';
import { OccBudgetNormalizer } from './converters/occ-budget-normalizer';
import { OccOrgUnitApprovalProcessNormalizer } from './converters/occ-org-unit-approval-processes-normalizer';
import { OccOrgUnitNodeListNormalizer } from './converters/occ-org-unit-node-list-normalizer';
import { OccOrgUnitNodeNormalizer } from './converters/occ-org-unit-node-normalizer';
import { OccOrgUnitNormalizer } from './converters/occ-org-unit-normalizer';
import { OccPermissionListNormalizer } from './converters/occ-permission-list-normalizer';
import { OccPermissionNormalizer } from './converters/occ-permission-normalizer';
import { OccPermissionTypeListNormalizer } from './converters/occ-permission-type-list.normalizer';
import { OccPermissionTypeNormalizer } from './converters/occ-permission-type-normalizer';
import { OccUserGroupListNormalizer } from './converters/occ-user-group-list-normalizer';
import { OccUserGroupNormalizer } from './converters/occ-user-group-normalizer';
import { OccUserListNormalizer } from './converters/occ-user-list-normalizer';
import * as i0 from "@angular/core";
export class AdministrationOccModule {
}
AdministrationOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AdministrationOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AdministrationOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AdministrationOccModule, imports: [CommonModule, CostCenterOccModule] });
AdministrationOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AdministrationOccModule, providers: [
        provideDefaultConfig(defaultOccOrganizationConfig),
        {
            provide: BudgetAdapter,
            useClass: OccBudgetAdapter,
        },
        {
            provide: BUDGET_NORMALIZER,
            useExisting: OccBudgetNormalizer,
            multi: true,
        },
        {
            provide: BUDGET_SERIALIZER,
            useExisting: OccBudgetSerializer,
            multi: true,
        },
        {
            provide: BUDGETS_NORMALIZER,
            useExisting: OccBudgetListNormalizer,
            multi: true,
        },
        {
            provide: OrgUnitAdapter,
            useClass: OccOrgUnitAdapter,
        },
        {
            provide: B2BUNIT_NORMALIZER,
            useExisting: OccOrgUnitNormalizer,
            multi: true,
        },
        {
            provide: B2BUNIT_NODE_NORMALIZER,
            useExisting: OccOrgUnitNodeNormalizer,
            multi: true,
        },
        {
            provide: B2BUNIT_NODE_LIST_NORMALIZER,
            useExisting: OccOrgUnitNodeListNormalizer,
            multi: true,
        },
        {
            provide: B2BUNIT_APPROVAL_PROCESSES_NORMALIZER,
            useExisting: OccOrgUnitApprovalProcessNormalizer,
            multi: true,
        },
        {
            provide: UserGroupAdapter,
            useClass: OccUserGroupAdapter,
        },
        {
            provide: USER_GROUP_NORMALIZER,
            useExisting: OccUserGroupNormalizer,
            multi: true,
        },
        {
            provide: USER_GROUPS_NORMALIZER,
            useExisting: OccUserGroupListNormalizer,
            multi: true,
        },
        {
            provide: PermissionAdapter,
            useClass: OccPermissionAdapter,
        },
        {
            provide: PERMISSION_NORMALIZER,
            useExisting: OccPermissionNormalizer,
            multi: true,
        },
        {
            provide: PERMISSIONS_NORMALIZER,
            useExisting: OccPermissionListNormalizer,
            multi: true,
        },
        {
            provide: PERMISSION_TYPE_NORMALIZER,
            useExisting: OccPermissionTypeNormalizer,
            multi: true,
        },
        {
            provide: PERMISSION_TYPES_NORMALIZER,
            useExisting: OccPermissionTypeListNormalizer,
            multi: true,
        },
        {
            provide: CostCenterAdapter,
            useClass: OccCostCenterAdapter,
        },
        {
            provide: B2BUserAdapter,
            useClass: OccB2BUserAdapter,
        },
        {
            provide: B2B_USER_NORMALIZER,
            useExisting: OccB2BUserNormalizer,
            multi: true,
        },
        {
            provide: B2B_USER_SERIALIZER,
            useExisting: OccB2bUserSerializer,
            multi: true,
        },
        {
            provide: B2B_USERS_NORMALIZER,
            useExisting: OccUserListNormalizer,
            multi: true,
        },
    ], imports: [CommonModule, CostCenterOccModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AdministrationOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, CostCenterOccModule],
                    providers: [
                        provideDefaultConfig(defaultOccOrganizationConfig),
                        {
                            provide: BudgetAdapter,
                            useClass: OccBudgetAdapter,
                        },
                        {
                            provide: BUDGET_NORMALIZER,
                            useExisting: OccBudgetNormalizer,
                            multi: true,
                        },
                        {
                            provide: BUDGET_SERIALIZER,
                            useExisting: OccBudgetSerializer,
                            multi: true,
                        },
                        {
                            provide: BUDGETS_NORMALIZER,
                            useExisting: OccBudgetListNormalizer,
                            multi: true,
                        },
                        {
                            provide: OrgUnitAdapter,
                            useClass: OccOrgUnitAdapter,
                        },
                        {
                            provide: B2BUNIT_NORMALIZER,
                            useExisting: OccOrgUnitNormalizer,
                            multi: true,
                        },
                        {
                            provide: B2BUNIT_NODE_NORMALIZER,
                            useExisting: OccOrgUnitNodeNormalizer,
                            multi: true,
                        },
                        {
                            provide: B2BUNIT_NODE_LIST_NORMALIZER,
                            useExisting: OccOrgUnitNodeListNormalizer,
                            multi: true,
                        },
                        {
                            provide: B2BUNIT_APPROVAL_PROCESSES_NORMALIZER,
                            useExisting: OccOrgUnitApprovalProcessNormalizer,
                            multi: true,
                        },
                        {
                            provide: UserGroupAdapter,
                            useClass: OccUserGroupAdapter,
                        },
                        {
                            provide: USER_GROUP_NORMALIZER,
                            useExisting: OccUserGroupNormalizer,
                            multi: true,
                        },
                        {
                            provide: USER_GROUPS_NORMALIZER,
                            useExisting: OccUserGroupListNormalizer,
                            multi: true,
                        },
                        {
                            provide: PermissionAdapter,
                            useClass: OccPermissionAdapter,
                        },
                        {
                            provide: PERMISSION_NORMALIZER,
                            useExisting: OccPermissionNormalizer,
                            multi: true,
                        },
                        {
                            provide: PERMISSIONS_NORMALIZER,
                            useExisting: OccPermissionListNormalizer,
                            multi: true,
                        },
                        {
                            provide: PERMISSION_TYPE_NORMALIZER,
                            useExisting: OccPermissionTypeNormalizer,
                            multi: true,
                        },
                        {
                            provide: PERMISSION_TYPES_NORMALIZER,
                            useExisting: OccPermissionTypeListNormalizer,
                            multi: true,
                        },
                        {
                            provide: CostCenterAdapter,
                            useClass: OccCostCenterAdapter,
                        },
                        {
                            provide: B2BUserAdapter,
                            useClass: OccB2BUserAdapter,
                        },
                        {
                            provide: B2B_USER_NORMALIZER,
                            useExisting: OccB2BUserNormalizer,
                            multi: true,
                        },
                        {
                            provide: B2B_USER_SERIALIZER,
                            useExisting: OccB2bUserSerializer,
                            multi: true,
                        },
                        {
                            provide: B2B_USERS_NORMALIZER,
                            useExisting: OccUserListNormalizer,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW5pc3RyYXRpb24tb2NjLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vb2NjL2FkbWluaXN0cmF0aW9uLW9jYy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzVFLE9BQU8sRUFDTCxxQ0FBcUMsRUFDckMsNEJBQTRCLEVBQzVCLHVCQUF1QixFQUN2QixrQkFBa0IsRUFDbEIsY0FBYyxFQUNkLG9CQUFvQixFQUNwQixtQkFBbUIsRUFDbkIsbUJBQW1CLEVBQ25CLGFBQWEsRUFDYixrQkFBa0IsRUFDbEIsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQixpQkFBaUIsRUFDakIsY0FBYyxFQUNkLGlCQUFpQixFQUNqQixzQkFBc0IsRUFDdEIscUJBQXFCLEVBQ3JCLDJCQUEyQixFQUMzQiwwQkFBMEIsRUFDMUIsZ0JBQWdCLEVBQ2hCLHNCQUFzQixFQUN0QixxQkFBcUIsR0FDdEIsTUFBTSw2Q0FBNkMsQ0FBQztBQUNyRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsbUJB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TyxFQUFFLHFCQUFxQjs0QkFDOUIsV0FBVyxFQUFFLHVCQUF1Qjs0QkFDcEMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLHNCQUFzQjs0QkFDL0IsV0FBVyxFQUFFLDJCQUEyQjs0QkFDeEMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLDBCQUEwQjs0QkFDbkMsV0FBVyxFQUFFLDJCQUEyQjs0QkFDeEMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLDJCQUEyQjs0QkFDcEMsV0FBVyxFQUFFLCtCQUErQjs0QkFDNUMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsUUFBUSxFQUFFLG9CQUFvQjt5QkFDL0I7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLGNBQWM7NEJBQ3ZCLFFBQVEsRUFBRSxpQkFBaUI7eUJBQzVCO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxtQkFBbUI7NEJBQzVCLFdBQVcsRUFBRSxvQkFBb0I7NEJBQ2pDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxtQkFBbUI7NEJBQzVCLFdBQVcsRUFBRSxvQkFBb0I7NEJBQ2pDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxvQkFBb0I7NEJBQzdCLFdBQVcsRUFBRSxxQkFBcUI7NEJBQ2xDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3N0Q2VudGVyT2NjTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBCMkJVTklUX0FQUFJPVkFMX1BST0NFU1NFU19OT1JNQUxJWkVSLFxuICBCMkJVTklUX05PREVfTElTVF9OT1JNQUxJWkVSLFxuICBCMkJVTklUX05PREVfTk9STUFMSVpFUixcbiAgQjJCVU5JVF9OT1JNQUxJWkVSLFxuICBCMkJVc2VyQWRhcHRlcixcbiAgQjJCX1VTRVJTX05PUk1BTElaRVIsXG4gIEIyQl9VU0VSX05PUk1BTElaRVIsXG4gIEIyQl9VU0VSX1NFUklBTElaRVIsXG4gIEJ1ZGdldEFkYXB0ZXIsXG4gIEJVREdFVFNfTk9STUFMSVpFUixcbiAgQlVER0VUX05PUk1BTElaRVIsXG4gIEJVREdFVF9TRVJJQUxJWkVSLFxuICBDb3N0Q2VudGVyQWRhcHRlcixcbiAgT3JnVW5pdEFkYXB0ZXIsXG4gIFBlcm1pc3Npb25BZGFwdGVyLFxuICBQRVJNSVNTSU9OU19OT1JNQUxJWkVSLFxuICBQRVJNSVNTSU9OX05PUk1BTElaRVIsXG4gIFBFUk1JU1NJT05fVFlQRVNfTk9STUFMSVpFUixcbiAgUEVSTUlTU0lPTl9UWVBFX05PUk1BTElaRVIsXG4gIFVzZXJHcm91cEFkYXB0ZXIsXG4gIFVTRVJfR1JPVVBTX05PUk1BTElaRVIsXG4gIFVTRVJfR1JPVVBfTk9STUFMSVpFUixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQgeyBPY2NCMkJVc2VyQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcnMvb2NjLWIyYi11c2Vycy5hZGFwdGVyJztcbmltcG9ydCB7IE9jY0J1ZGdldEFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXJzL29jYy1idWRnZXQuYWRhcHRlcic7XG5pbXBvcnQgeyBPY2NDb3N0Q2VudGVyQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcnMvb2NjLWNvc3QtY2VudGVyLmFkYXB0ZXInO1xuaW1wb3J0IHsgT2NjT3JnVW5pdEFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXJzL29jYy1vcmctdW5pdC5hZGFwdGVyJztcbmltcG9ydCB7IE9jY1Blcm1pc3Npb25BZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVycy9vY2MtcGVybWlzc2lvbi5hZGFwdGVyJztcbmltcG9ydCB7IE9jY1VzZXJHcm91cEFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXJzL29jYy11c2VyLWdyb3VwLmFkYXB0ZXInO1xuaW1wb3J0IHsgZGVmYXVsdE9jY09yZ2FuaXphdGlvbkNvbmZpZyB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtb2NjLW9yZ2FuaXphdGlvbi1jb25maWcnO1xuaW1wb3J0IHsgT2NjQnVkZ2V0U2VyaWFsaXplciB9IGZyb20gJy4vY29udmVydGVycy9vY2MtYnVkZ2V0LXNlcmlhbGl6ZXInO1xuaW1wb3J0IHsgT2NjQjJCVXNlck5vcm1hbGl6ZXIgfSBmcm9tICcuL2NvbnZlcnRlcnMvb2NjLWIyYi11c2VyLW5vcm1hbGl6ZXInO1xuaW1wb3J0IHsgT2NjQjJiVXNlclNlcmlhbGl6ZXIgfSBmcm9tICcuL2NvbnZlcnRlcnMvb2NjLWIyYi11c2VyLXNlcmlhbGl6ZXInO1xuaW1wb3J0IHsgT2NjQnVkZ2V0TGlzdE5vcm1hbGl6ZXIgfSBmcm9tICcuL2NvbnZlcnRlcnMvb2NjLWJ1ZGdldC1saXN0LW5vcm1hbGl6ZXInO1xuaW1wb3J0IHsgT2NjQnVkZ2V0Tm9ybWFsaXplciB9IGZyb20gJy4vY29udmVydGVycy9vY2MtYnVkZ2V0LW5vcm1hbGl6ZXInO1xuaW1wb3J0IHsgT2NjT3JnVW5pdEFwcHJvdmFsUHJvY2Vzc05vcm1hbGl6ZXIgfSBmcm9tICcuL2NvbnZlcnRlcnMvb2NjLW9yZy11bml0LWFwcHJvdmFsLXByb2Nlc3Nlcy1ub3JtYWxpemVyJztcbmltcG9ydCB7IE9jY09yZ1VuaXROb2RlTGlzdE5vcm1hbGl6ZXIgfSBmcm9tICcuL2NvbnZlcnRlcnMvb2NjLW9yZy11bml0LW5vZGUtbGlzdC1ub3JtYWxpemVyJztcbmltcG9ydCB7IE9jY09yZ1VuaXROb2RlTm9ybWFsaXplciB9IGZyb20gJy4vY29udmVydGVycy9vY2Mtb3JnLXVuaXQtbm9kZS1ub3JtYWxpemVyJztcbmltcG9ydCB7IE9jY09yZ1VuaXROb3JtYWxpemVyIH0gZnJvbSAnLi9jb252ZXJ0ZXJzL29jYy1vcmctdW5pdC1ub3JtYWxpemVyJztcbmltcG9ydCB7IE9jY1Blcm1pc3Npb25MaXN0Tm9ybWFsaXplciB9IGZyb20gJy4vY29udmVydGVycy9vY2MtcGVybWlzc2lvbi1saXN0LW5vcm1hbGl6ZXInO1xuaW1wb3J0IHsgT2NjUGVybWlzc2lvbk5vcm1hbGl6ZXIgfSBmcm9tICcuL2NvbnZlcnRlcnMvb2NjLXBlcm1pc3Npb24tbm9ybWFsaXplcic7XG5pbXBvcnQgeyBPY2NQZXJtaXNzaW9uVHlwZUxpc3ROb3JtYWxpemVyIH0gZnJvbSAnLi9jb252ZXJ0ZXJzL29jYy1wZXJtaXNzaW9uLXR5cGUtbGlzdC5ub3JtYWxpemVyJztcbmltcG9ydCB7IE9jY1Blcm1pc3Npb25UeXBlTm9ybWFsaXplciB9IGZyb20gJy4vY29udmVydGVycy9vY2MtcGVybWlzc2lvbi10eXBlLW5vcm1hbGl6ZXInO1xuaW1wb3J0IHsgT2NjVXNlckdyb3VwTGlzdE5vcm1hbGl6ZXIgfSBmcm9tICcuL2NvbnZlcnRlcnMvb2NjLXVzZXItZ3JvdXAtbGlzdC1ub3JtYWxpemVyJztcbmltcG9ydCB7IE9jY1VzZXJHcm91cE5vcm1hbGl6ZXIgfSBmcm9tICcuL2NvbnZlcnRlcnMvb2NjLXVzZXItZ3JvdXAtbm9ybWFsaXplcic7XG5pbXBvcnQgeyBPY2NVc2VyTGlzdE5vcm1hbGl6ZXIgfSBmcm9tICcuL2NvbnZlcnRlcnMvb2NjLXVzZXItbGlzdC1ub3JtYWxpemVyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQ29zdENlbnRlck9jY01vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRPY2NPcmdhbml6YXRpb25Db25maWcpLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEJ1ZGdldEFkYXB0ZXIsXG4gICAgICB1c2VDbGFzczogT2NjQnVkZ2V0QWRhcHRlcixcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEJVREdFVF9OT1JNQUxJWkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9jY0J1ZGdldE5vcm1hbGl6ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEJVREdFVF9TRVJJQUxJWkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9jY0J1ZGdldFNlcmlhbGl6ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEJVREdFVFNfTk9STUFMSVpFUixcbiAgICAgIHVzZUV4aXN0aW5nOiBPY2NCdWRnZXRMaXN0Tm9ybWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogT3JnVW5pdEFkYXB0ZXIsXG4gICAgICB1c2VDbGFzczogT2NjT3JnVW5pdEFkYXB0ZXIsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBCMkJVTklUX05PUk1BTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogT2NjT3JnVW5pdE5vcm1hbGl6ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEIyQlVOSVRfTk9ERV9OT1JNQUxJWkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9jY09yZ1VuaXROb2RlTm9ybWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogQjJCVU5JVF9OT0RFX0xJU1RfTk9STUFMSVpFUixcbiAgICAgIHVzZUV4aXN0aW5nOiBPY2NPcmdVbml0Tm9kZUxpc3ROb3JtYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBCMkJVTklUX0FQUFJPVkFMX1BST0NFU1NFU19OT1JNQUxJWkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9jY09yZ1VuaXRBcHByb3ZhbFByb2Nlc3NOb3JtYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBVc2VyR3JvdXBBZGFwdGVyLFxuICAgICAgdXNlQ2xhc3M6IE9jY1VzZXJHcm91cEFkYXB0ZXIsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBVU0VSX0dST1VQX05PUk1BTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogT2NjVXNlckdyb3VwTm9ybWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogVVNFUl9HUk9VUFNfTk9STUFMSVpFUixcbiAgICAgIHVzZUV4aXN0aW5nOiBPY2NVc2VyR3JvdXBMaXN0Tm9ybWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogUGVybWlzc2lvbkFkYXB0ZXIsXG4gICAgICB1c2VDbGFzczogT2NjUGVybWlzc2lvbkFkYXB0ZXIsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBQRVJNSVNTSU9OX05PUk1BTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogT2NjUGVybWlzc2lvbk5vcm1hbGl6ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFBFUk1JU1NJT05TX05PUk1BTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogT2NjUGVybWlzc2lvbkxpc3ROb3JtYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBQRVJNSVNTSU9OX1RZUEVfTk9STUFMSVpFUixcbiAgICAgIHVzZUV4aXN0aW5nOiBPY2NQZXJtaXNzaW9uVHlwZU5vcm1hbGl6ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFBFUk1JU1NJT05fVFlQRVNfTk9STUFMSVpFUixcbiAgICAgIHVzZUV4aXN0aW5nOiBPY2NQZXJtaXNzaW9uVHlwZUxpc3ROb3JtYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBDb3N0Q2VudGVyQWRhcHRlcixcbiAgICAgIHVzZUNsYXNzOiBPY2NDb3N0Q2VudGVyQWRhcHRlcixcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEIyQlVzZXJBZGFwdGVyLFxuICAgICAgdXNlQ2xhc3M6IE9jY0IyQlVzZXJBZGFwdGVyLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogQjJCX1VTRVJfTk9STUFMSVpFUixcbiAgICAgIHVzZUV4aXN0aW5nOiBPY2NCMkJVc2VyTm9ybWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogQjJCX1VTRVJfU0VSSUFMSVpFUixcbiAgICAgIHVzZUV4aXN0aW5nOiBPY2NCMmJVc2VyU2VyaWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogQjJCX1VTRVJTX05PUk1BTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogT2NjVXNlckxpc3ROb3JtYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWRtaW5pc3RyYXRpb25PY2NNb2R1bGUge31cbiJdfQ==