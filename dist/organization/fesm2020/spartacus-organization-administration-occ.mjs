import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import { BUDGET_NORMALIZER, BUDGETS_NORMALIZER, BUDGET_SERIALIZER, B2BUNIT_NORMALIZER, B2BUNIT_SERIALIZER, B2BUNIT_NODE_NORMALIZER, B2BUNIT_NODE_LIST_NORMALIZER, B2BUNIT_APPROVAL_PROCESSES_NORMALIZER, B2B_USERS_NORMALIZER, USER_GROUP_NORMALIZER, USER_GROUPS_NORMALIZER, PERMISSIONS_NORMALIZER, USER_GROUP_SERIALIZER, PERMISSION_NORMALIZER, PERMISSION_SERIALIZER, PERMISSION_TYPES_NORMALIZER, B2B_USER_NORMALIZER, B2B_USER_SERIALIZER, PERMISSION_TYPE_NORMALIZER, BudgetAdapter, OrgUnitAdapter, UserGroupAdapter, PermissionAdapter, CostCenterAdapter, B2BUserAdapter } from '@spartacus/organization/administration/core';
import * as i1 from '@angular/common/http';
import * as i2 from '@spartacus/core';
import { COST_CENTER_NORMALIZER, COST_CENTERS_NORMALIZER, COST_CENTER_SERIALIZER, ADDRESS_LIST_NORMALIZER, ADDRESS_SERIALIZER, ADDRESS_NORMALIZER, TimeUtils, CostCenterOccModule, provideDefaultConfig } from '@spartacus/core';
import { CommonModule } from '@angular/common';

class OccBudgetAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    load(userId, budgetCode) {
        return this.http
            .get(this.getBudgetEndpoint(userId, budgetCode))
            .pipe(this.converter.pipeable(BUDGET_NORMALIZER));
    }
    loadList(userId, params) {
        return this.http
            .get(this.getBudgetsEndpoint(userId, params))
            .pipe(this.converter.pipeable(BUDGETS_NORMALIZER));
    }
    create(userId, budget) {
        const convertedBudget = this.converter.convert(budget, BUDGET_SERIALIZER);
        return this.http
            .post(this.getBudgetsEndpoint(userId), convertedBudget)
            .pipe(this.converter.pipeable(BUDGET_NORMALIZER));
    }
    update(userId, budgetCode, budget) {
        const convertedBudget = this.converter.convert(budget, BUDGET_SERIALIZER);
        return this.http
            .patch(this.getBudgetEndpoint(userId, budgetCode), convertedBudget)
            .pipe(this.converter.pipeable(BUDGET_NORMALIZER));
    }
    getBudgetEndpoint(userId, budgetCode) {
        return this.occEndpoints.buildUrl('budget', {
            urlParams: { userId, budgetCode },
        });
    }
    getBudgetsEndpoint(userId, params) {
        return this.occEndpoints.buildUrl('budgets', {
            urlParams: { userId },
            queryParams: params,
        });
    }
}
OccBudgetAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBudgetAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccBudgetAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBudgetAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBudgetAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

class OccCostCenterAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    load(userId, costCenterCode) {
        return this.http
            .get(this.getCostCenterEndpoint(userId, costCenterCode))
            .pipe(this.converter.pipeable(COST_CENTER_NORMALIZER));
    }
    loadList(userId, params) {
        return this.http
            .get(this.getAllCostCentersEndpoint(userId, params))
            .pipe(this.converter.pipeable(COST_CENTERS_NORMALIZER));
    }
    create(userId, costCenter) {
        costCenter = this.converter.convert(costCenter, COST_CENTER_SERIALIZER);
        return this.http
            .post(this.getCostCentersEndpoint(userId), costCenter)
            .pipe(this.converter.pipeable(COST_CENTER_NORMALIZER));
    }
    update(userId, costCenterCode, costCenter) {
        costCenter = this.converter.convert(costCenter, COST_CENTER_SERIALIZER);
        return this.http
            .patch(this.getCostCenterEndpoint(userId, costCenterCode), costCenter)
            .pipe(this.converter.pipeable(COST_CENTER_NORMALIZER));
    }
    loadBudgets(userId, costCenterCode, params) {
        return this.http
            .get(this.getBudgetsEndpoint(userId, costCenterCode, params))
            .pipe(this.converter.pipeable(BUDGETS_NORMALIZER));
    }
    assignBudget(userId, costCenterCode, budgetCode) {
        return this.http.post(this.getBudgetsEndpoint(userId, costCenterCode, { budgetCode }), null);
    }
    unassignBudget(userId, costCenterCode, budgetCode) {
        return this.http.delete(this.getBudgetEndpoint(userId, costCenterCode, budgetCode));
    }
    getCostCenterEndpoint(userId, costCenterCode) {
        return this.occEndpoints.buildUrl('costCenter', {
            urlParams: { userId, costCenterCode },
        });
    }
    getCostCentersEndpoint(userId, params) {
        return this.occEndpoints.buildUrl('costCenters', {
            urlParams: { userId },
            queryParams: params,
        });
    }
    getAllCostCentersEndpoint(userId, params) {
        return this.occEndpoints.buildUrl('costCentersAll', {
            urlParams: { userId },
            queryParams: params,
        });
    }
    getBudgetsEndpoint(userId, costCenterCode, params) {
        return this.occEndpoints.buildUrl('costCenterBudgets', {
            urlParams: { userId, costCenterCode },
            queryParams: params,
        });
    }
    getBudgetEndpoint(userId, costCenterCode, budgetCode) {
        return this.occEndpoints.buildUrl('costCenterBudget', {
            urlParams: {
                userId,
                costCenterCode,
                budgetCode,
            },
        });
    }
}
OccCostCenterAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCostCenterAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCostCenterAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCostCenterAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCostCenterAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

class OccOrgUnitAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    load(userId, orgUnitId) {
        return this.http
            .get(this.getOrgUnitEndpoint(userId, orgUnitId))
            .pipe(this.converter.pipeable(B2BUNIT_NORMALIZER));
    }
    create(userId, orgUnit) {
        return this.http
            .post(this.getOrgUnitsEndpoint(userId), orgUnit)
            .pipe(this.converter.pipeable(B2BUNIT_NORMALIZER));
    }
    update(userId, orgUnitId, orgUnit) {
        orgUnit = this.converter.convert(orgUnit, B2BUNIT_SERIALIZER);
        return this.http
            .patch(this.getOrgUnitEndpoint(userId, orgUnitId), orgUnit)
            .pipe(this.converter.pipeable(B2BUNIT_NORMALIZER));
    }
    loadTree(userId) {
        return this.http
            .get(this.getOrgUnitsTreeEndpoint(userId))
            .pipe(this.converter.pipeable(B2BUNIT_NODE_NORMALIZER));
    }
    loadList(userId) {
        return this.http
            .get(this.getAvailableOrgUnitsEndpoint(userId))
            .pipe(this.converter.pipeable(B2BUNIT_NODE_LIST_NORMALIZER));
    }
    loadApprovalProcesses(userId) {
        return this.http
            .get(this.getOrgUnitsApprovalProcessesEndpoint(userId))
            .pipe(this.converter.pipeable(B2BUNIT_APPROVAL_PROCESSES_NORMALIZER));
    }
    loadUsers(userId, orgUnitId, roleId, params) {
        return this.http
            .get(this.getUsersEndpoint(userId, orgUnitId, roleId, params))
            .pipe(this.converter.pipeable(B2B_USERS_NORMALIZER));
    }
    assignRole(userId, orgCustomerId, roleId) {
        return this.http.post(this.getRolesEndpoint(userId, orgCustomerId, { roleId }), null);
    }
    unassignRole(userId, orgCustomerId, roleId) {
        return this.http.delete(this.getRoleEndpoint(userId, orgCustomerId, roleId));
    }
    assignApprover(userId, orgUnitId, orgCustomerId, roleId) {
        return this.http.post(this.getApproversEndpoint(userId, orgUnitId, orgCustomerId, { roleId }), null);
    }
    unassignApprover(userId, orgUnitId, orgCustomerId, roleId) {
        return this.http.delete(this.getApproverEndpoint(userId, orgUnitId, orgCustomerId, roleId));
    }
    loadAddresses(userId, orgUnitId) {
        return this.http
            .get(this.getAddressesEndpoint(userId, orgUnitId))
            .pipe(this.converter.pipeable(ADDRESS_LIST_NORMALIZER));
    }
    createAddress(userId, orgUnitId, address) {
        address = this.converter.convert(address, ADDRESS_SERIALIZER);
        return this.http
            .post(this.getAddressesEndpoint(userId, orgUnitId), address)
            .pipe(this.converter.pipeable(ADDRESS_NORMALIZER));
    }
    updateAddress(userId, orgUnitId, addressId, address) {
        address = this.converter.convert(address, ADDRESS_SERIALIZER);
        return this.http
            .patch(this.getAddressEndpoint(userId, orgUnitId, addressId), address)
            .pipe(this.converter.pipeable(ADDRESS_NORMALIZER));
    }
    deleteAddress(userId, orgUnitId, addressId) {
        return this.http
            .delete(this.getAddressEndpoint(userId, orgUnitId, addressId))
            .pipe(this.converter.pipeable(ADDRESS_NORMALIZER));
    }
    getOrgUnitEndpoint(userId, orgUnitId) {
        return this.occEndpoints.buildUrl('orgUnit', {
            urlParams: { userId, orgUnitId },
        });
    }
    getOrgUnitsEndpoint(userId) {
        return this.occEndpoints.buildUrl('orgUnits', { urlParams: { userId } });
    }
    getAvailableOrgUnitsEndpoint(userId) {
        return this.occEndpoints.buildUrl('orgUnitsAvailable', {
            urlParams: { userId },
        });
    }
    getOrgUnitsTreeEndpoint(userId) {
        return this.occEndpoints.buildUrl('orgUnitsTree', {
            urlParams: { userId },
        });
    }
    getOrgUnitsApprovalProcessesEndpoint(userId) {
        return this.occEndpoints.buildUrl('orgUnitsApprovalProcesses', {
            urlParams: { userId },
        });
    }
    getUsersEndpoint(userId, orgUnitId, roleId, params) {
        return this.occEndpoints.buildUrl('orgUnitUsers', {
            urlParams: {
                userId,
                orgUnitId,
                roleId,
            },
            queryParams: params,
        });
    }
    getRolesEndpoint(userId, orgCustomerId, params) {
        return this.occEndpoints.buildUrl('orgUnitUserRoles', {
            urlParams: { userId, orgCustomerId },
            queryParams: params,
        });
    }
    getRoleEndpoint(userId, orgCustomerId, roleId) {
        return this.occEndpoints.buildUrl('orgUnitUserRole', {
            urlParams: {
                userId,
                orgCustomerId,
                roleId,
            },
        });
    }
    getApproversEndpoint(userId, orgUnitId, orgCustomerId, params) {
        return this.occEndpoints.buildUrl('orgUnitApprovers', {
            urlParams: { userId, orgUnitId, orgCustomerId },
            queryParams: params,
        });
    }
    getApproverEndpoint(userId, orgUnitId, orgCustomerId, roleId) {
        return this.occEndpoints.buildUrl('orgUnitApprover', {
            urlParams: {
                userId,
                orgUnitId,
                orgCustomerId,
                roleId,
            },
        });
    }
    getAddressesEndpoint(userId, orgUnitId) {
        return this.occEndpoints.buildUrl('orgUnitsAddresses', {
            urlParams: {
                userId,
                orgUnitId,
            },
        });
    }
    getAddressEndpoint(userId, orgUnitId, addressId) {
        return this.occEndpoints.buildUrl('orgUnitsAddress', {
            urlParams: {
                userId,
                orgUnitId,
                addressId,
            },
        });
    }
}
OccOrgUnitAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrgUnitAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccOrgUnitAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrgUnitAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrgUnitAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

class OccUserGroupAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    load(userId, userGroupId) {
        return this.http
            .get(this.getUserGroupEndpoint(userId, userGroupId))
            .pipe(this.converter.pipeable(USER_GROUP_NORMALIZER));
    }
    loadList(userId, params) {
        return this.http
            .get(this.getUserGroupsEndpoint(userId, params))
            .pipe(this.converter.pipeable(USER_GROUPS_NORMALIZER));
    }
    loadAvailableOrderApprovalPermissions(userId, userGroupId, params) {
        return this.http
            .get(this.getPermissionsEndpoint(userId, userGroupId, params))
            .pipe(this.converter.pipeable(PERMISSIONS_NORMALIZER));
    }
    loadAvailableOrgCustomers(userId, userGroupId, params) {
        return this.http
            .get(this.getAvailableCustomersEndpoint(userId, userGroupId, params))
            .pipe(this.converter.pipeable(B2B_USERS_NORMALIZER));
    }
    create(userId, userGroup) {
        userGroup = this.converter.convert(userGroup, USER_GROUP_SERIALIZER);
        return this.http
            .post(this.getUserGroupsEndpoint(userId), userGroup)
            .pipe(this.converter.pipeable(USER_GROUP_NORMALIZER));
    }
    delete(userId, userGroupId) {
        return this.http
            .delete(this.getUserGroupEndpoint(userId, userGroupId))
            .pipe(this.converter.pipeable(USER_GROUP_NORMALIZER));
    }
    update(userId, userGroupId, userGroup) {
        userGroup = this.converter.convert(userGroup, USER_GROUP_SERIALIZER);
        return this.http
            .patch(this.getUserGroupEndpoint(userId, userGroupId), userGroup)
            .pipe(this.converter.pipeable(USER_GROUP_NORMALIZER));
    }
    assignMember(userId, userGroupId, orgCustomerId) {
        return this.http.post(this.getMembersEndpoint(userId, userGroupId, {
            orgCustomerId,
        }), null);
    }
    assignOrderApprovalPermission(userId, userGroupId, orderApprovalPermissionCode) {
        return this.http.post(this.getOrderApprovalPermissionsEndpoint(userId, userGroupId, {
            orderApprovalPermissionCode,
        }), null);
    }
    unassignMember(userId, userGroupId, orgCustomerId) {
        return this.http.delete(this.getMemberEndpoint(userId, userGroupId, orgCustomerId));
    }
    unassignAllMembers(userId, userGroupId) {
        return this.http.delete(this.getMembersEndpoint(userId, userGroupId));
    }
    unassignOrderApprovalPermission(userId, userGroupId, orderApprovalPermissionCode) {
        return this.http.delete(this.getOrderApprovalPermissionEndpoint(userId, userGroupId, orderApprovalPermissionCode));
    }
    getUserGroupEndpoint(userId, userGroupId) {
        return this.occEndpoints.buildUrl('userGroup', {
            urlParams: {
                userId,
                userGroupId,
            },
        });
    }
    getUserGroupsEndpoint(userId, params) {
        return this.occEndpoints.buildUrl('userGroups', {
            urlParams: { userId },
            queryParams: params,
        });
    }
    getAvailableCustomersEndpoint(userId, userGroupId, params) {
        return this.occEndpoints.buildUrl('userGroupAvailableOrgCustomers', {
            urlParams: { userId, userGroupId },
            queryParams: params,
        });
    }
    getPermissionsEndpoint(userId, userGroupId, params) {
        return this.occEndpoints.buildUrl('userGroupAvailableOrderApprovalPermissions', { urlParams: { userId, userGroupId }, queryParams: params });
    }
    getMemberEndpoint(userId, userGroupId, orgCustomerId) {
        return this.occEndpoints.buildUrl('userGroupMember', {
            urlParams: {
                userId,
                userGroupId,
                orgCustomerId,
            },
        });
    }
    getMembersEndpoint(userId, userGroupId, params) {
        return this.occEndpoints.buildUrl('userGroupMembers', {
            urlParams: { userId, userGroupId },
            queryParams: params,
        });
    }
    getOrderApprovalPermissionsEndpoint(userId, userGroupId, params) {
        return this.occEndpoints.buildUrl('userGroupOrderApprovalPermissions', {
            urlParams: { userId, userGroupId },
            queryParams: params,
        });
    }
    getOrderApprovalPermissionEndpoint(userId, userGroupId, orderApprovalPermissionCode) {
        return this.occEndpoints.buildUrl('userGroupOrderApprovalPermission', {
            urlParams: {
                userId,
                userGroupId,
                orderApprovalPermissionCode,
            },
        });
    }
}
OccUserGroupAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserGroupAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccUserGroupAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserGroupAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserGroupAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

class OccPermissionAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    load(userId, permissionCode) {
        return this.http
            .get(this.getPermissionEndpoint(userId, permissionCode))
            .pipe(this.converter.pipeable(PERMISSION_NORMALIZER));
    }
    loadList(userId, params) {
        return this.http
            .get(this.getPermissionsEndpoint(userId, params))
            .pipe(this.converter.pipeable(PERMISSIONS_NORMALIZER));
    }
    create(userId, permission) {
        permission = this.converter.convert(permission, PERMISSION_SERIALIZER);
        return this.http
            .post(this.getPermissionsEndpoint(userId), permission)
            .pipe(this.converter.pipeable(PERMISSION_NORMALIZER));
    }
    update(userId, permissionCode, permission) {
        permission = this.converter.convert(permission, PERMISSION_SERIALIZER);
        return this.http
            .patch(this.getPermissionEndpoint(userId, permissionCode), permission)
            .pipe(this.converter.pipeable(PERMISSION_NORMALIZER));
    }
    loadTypes() {
        return this.http
            .get(this.getPermissionTypesEndpoint())
            .pipe(this.converter.pipeable(PERMISSION_TYPES_NORMALIZER));
    }
    getPermissionEndpoint(userId, orderApprovalPermissionCode) {
        return this.occEndpoints.buildUrl('permission', {
            urlParams: {
                userId,
                orderApprovalPermissionCode,
            },
        });
    }
    getPermissionsEndpoint(userId, params) {
        return this.occEndpoints.buildUrl('permissions', {
            urlParams: { userId },
            queryParams: params,
        });
    }
    getPermissionTypesEndpoint() {
        return this.occEndpoints.buildUrl('orderApprovalPermissionTypes');
    }
}
OccPermissionAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccPermissionAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

class OccB2BUserAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    load(userId, orgUnitCustomerId) {
        return this.http
            .get(this.getB2BUserEndpoint(userId, orgUnitCustomerId))
            .pipe(this.converter.pipeable(B2B_USER_NORMALIZER));
    }
    loadList(userId, params) {
        return this.http
            .get(this.getB2BUsersEndpoint(userId, params))
            .pipe(this.converter.pipeable(B2B_USERS_NORMALIZER));
    }
    create(userId, orgCustomer) {
        orgCustomer = this.converter.convert(orgCustomer, B2B_USER_SERIALIZER);
        return this.http
            .post(this.getB2BUsersEndpoint(userId), orgCustomer)
            .pipe(this.converter.pipeable(B2B_USER_NORMALIZER));
    }
    update(userId, orgCustomerId, orgCustomer) {
        orgCustomer = this.converter.convert(orgCustomer, B2B_USER_SERIALIZER);
        return this.http
            .patch(this.getB2BUserEndpoint(userId, orgCustomerId), orgCustomer)
            .pipe(this.converter.pipeable(B2B_USER_NORMALIZER));
    }
    loadApprovers(userId, orgCustomerId, params) {
        return this.http
            .get(this.getApproversEndpoint(userId, orgCustomerId, params))
            .pipe(this.converter.pipeable(B2B_USERS_NORMALIZER));
    }
    assignApprover(userId, orgCustomerId, approverId) {
        return this.http.post(this.getApproverEndpoint(userId, orgCustomerId, approverId), null);
    }
    unassignApprover(userId, orgCustomerId, approverId) {
        return this.http.delete(this.getApproverEndpoint(userId, orgCustomerId, approverId));
    }
    loadPermissions(userId, orgCustomerId, params) {
        return this.http
            .get(this.getPermissionsEndpoint(userId, orgCustomerId, params))
            .pipe(this.converter.pipeable(PERMISSIONS_NORMALIZER));
    }
    assignPermission(userId, orgCustomerId, permissionId) {
        return this.http.post(this.getPermissionEndpoint(userId, orgCustomerId, permissionId), null);
    }
    unassignPermission(userId, orgCustomerId, permissionId) {
        return this.http.delete(this.getPermissionEndpoint(userId, orgCustomerId, permissionId));
    }
    loadUserGroups(userId, orgCustomerId, params) {
        return this.http
            .get(this.getUserGroupsEndpoint(userId, orgCustomerId, params))
            .pipe(this.converter.pipeable(USER_GROUPS_NORMALIZER));
    }
    assignUserGroup(userId, orgCustomerId, userGroupId) {
        return this.http.post(this.getUserGroupEndpoint(userId, orgCustomerId, userGroupId), null);
    }
    unassignUserGroup(userId, orgCustomerId, userGroupId) {
        return this.http.delete(this.getUserGroupEndpoint(userId, orgCustomerId, userGroupId));
    }
    getB2BUserEndpoint(userId, orgCustomerId) {
        return this.occEndpoints.buildUrl('b2bUser', {
            urlParams: {
                userId,
                orgCustomerId,
            },
        });
    }
    getB2BUsersEndpoint(userId, params) {
        return this.occEndpoints.buildUrl('b2bUsers', {
            urlParams: { userId },
            queryParams: params,
        });
    }
    getApproverEndpoint(userId, orgCustomerId, approverId) {
        return this.occEndpoints.buildUrl('b2bUserApprover', {
            urlParams: {
                userId,
                orgCustomerId,
                approverId,
            },
        });
    }
    getApproversEndpoint(userId, orgCustomerId, params) {
        return this.occEndpoints.buildUrl('b2bUserApprovers', {
            urlParams: { userId, orgCustomerId },
            queryParams: params,
        });
    }
    getPermissionEndpoint(userId, orgCustomerId, premissionId) {
        return this.occEndpoints.buildUrl('b2bUserPermission', {
            urlParams: {
                userId,
                orgCustomerId,
                premissionId,
            },
        });
    }
    getPermissionsEndpoint(userId, orgCustomerId, params) {
        return this.occEndpoints.buildUrl('b2bUserPermissions', {
            urlParams: {
                userId,
                orgCustomerId,
            },
            queryParams: params,
        });
    }
    getUserGroupEndpoint(userId, orgCustomerId, userGroupId) {
        return this.occEndpoints.buildUrl('b2bUserUserGroup', {
            urlParams: {
                userId,
                orgCustomerId,
                userGroupId,
            },
        });
    }
    getUserGroupsEndpoint(userId, orgCustomerId, params) {
        return this.occEndpoints.buildUrl('b2bUserUserGroups', {
            urlParams: { userId, orgCustomerId },
            queryParams: params,
        });
    }
}
OccB2BUserAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccB2BUserAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccB2BUserAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccB2BUserAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccB2BUserAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

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
const defaultOccOrganizationConfig = {
    backend: {
        occ: {
            endpoints: {
                budgets: '/users/${userId}/budgets',
                budget: '/users/${userId}/budgets/${budgetCode}',
                orgUnitsAvailable: '/users/${userId}/availableOrgUnitNodes',
                orgUnitsTree: '/users/${userId}/orgUnitsRootNodeTree',
                orgUnitsApprovalProcesses: '/users/${userId}/orgUnitsAvailableApprovalProcesses',
                orgUnits: '/users/${userId}/orgUnits',
                orgUnit: '/users/${userId}/orgUnits/${orgUnitId}',
                orgUnitUsers: '/users/${userId}/orgUnits/${orgUnitId}/availableUsers/${roleId}',
                orgUnitApprovers: '/users/${userId}/orgUnits/${orgUnitId}/orgCustomers/${orgCustomerId}/roles',
                orgUnitApprover: '/users/${userId}/orgUnits/${orgUnitId}/orgCustomers/${orgCustomerId}/roles/${roleId}',
                orgUnitUserRoles: '/users/${userId}/orgCustomers/${orgCustomerId}/roles',
                orgUnitUserRole: '/users/${userId}/orgCustomers/${orgCustomerId}/roles/${roleId}',
                orgUnitsAddresses: '/users/${userId}/orgUnits/${orgUnitId}/addresses',
                orgUnitsAddress: '/users/${userId}/orgUnits/${orgUnitId}/addresses/${addressId}',
                userGroups: '/users/${userId}/orgUnitUserGroups',
                userGroup: '/users/${userId}/orgUnitUserGroups/${userGroupId}',
                userGroupAvailableOrderApprovalPermissions: '/users/${userId}/orgUnitUserGroups/${userGroupId}/availableOrderApprovalPermissions',
                userGroupAvailableOrgCustomers: '/users/${userId}/orgUnitUserGroups/${userGroupId}/availableOrgCustomers',
                userGroupMembers: '/users/${userId}/orgUnitUserGroups/${userGroupId}/members',
                userGroupMember: '/users/${userId}/orgUnitUserGroups/${userGroupId}/members/${orgCustomerId}',
                userGroupOrderApprovalPermissions: '/users/${userId}/orgUnitUserGroups/${userGroupId}/orderApprovalPermissions',
                userGroupOrderApprovalPermission: '/users/${userId}/orgUnitUserGroups/${userGroupId}/orderApprovalPermissions/${orderApprovalPermissionCode}',
                costCenters: '/costcenters',
                costCenter: '/costcenters/${costCenterCode}',
                costCentersAll: '/costcentersall',
                costCenterBudgets: '/costcenters/${costCenterCode}/budgets',
                costCenterBudget: '/costcenters/${costCenterCode}/budgets/${budgetCode}',
                permissions: '/users/${userId}/orderApprovalPermissions',
                permission: '/users/${userId}/orderApprovalPermissions/${orderApprovalPermissionCode}',
                orderApprovalPermissionTypes: '/orderApprovalPermissionTypes',
                b2bUsers: '/users/${userId}/orgCustomers',
                b2bUser: '/users/${userId}/orgCustomers/${orgCustomerId}',
                b2bUserApprovers: '/users/${userId}/orgCustomers/${orgCustomerId}/approvers',
                b2bUserApprover: '/users/${userId}/orgCustomers/${orgCustomerId}/approvers/${approverId}',
                b2bUserUserGroups: '/users/${userId}/orgCustomers/${orgCustomerId}/orgUserGroups',
                b2bUserUserGroup: '/users/${userId}/orgCustomers/${orgCustomerId}/orgUserGroups/${userGroupId}',
                b2bUserPermissions: '/users/${userId}/orgCustomers/${orgCustomerId}/permissions',
                b2bUserPermission: '/users/${userId}/orgCustomers/${orgCustomerId}/permissions/${premissionId}',
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccBudgetSerializer {
    constructor() {
        // Intentional empty constructor
    }
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        if (source.startDate) {
            target.startDate = TimeUtils.convertDateToDatetime(source.startDate);
        }
        if (source.endDate) {
            target.endDate = TimeUtils.convertDateToDatetime(source.endDate, true);
        }
        return target;
    }
}
OccBudgetSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBudgetSerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccBudgetSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBudgetSerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBudgetSerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccB2BUserNormalizer {
    constructor() {
        // Intentional empty constructor
    }
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        target.email = source?.uid;
        return target;
    }
}
OccB2BUserNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccB2BUserNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccB2BUserNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccB2BUserNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccB2BUserNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccB2bUserSerializer {
    constructor() {
        // Intentional empty constructor
    }
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        delete target.isAssignedToApprovers;
        if (target.active === false) {
            target.roles = [];
        }
        return target;
    }
}
OccB2bUserSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccB2bUserSerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccB2bUserSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccB2bUserSerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccB2bUserSerializer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccBudgetListNormalizer {
    constructor(converter) {
        this.converter = converter;
    }
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        target.values =
            source.budgets?.map((budget) => ({
                ...this.converter.convert(budget, BUDGET_NORMALIZER),
            })) ?? [];
        return target;
    }
}
OccBudgetListNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBudgetListNormalizer, deps: [{ token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccBudgetListNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBudgetListNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBudgetListNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccBudgetNormalizer {
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        if (source.startDate) {
            target.startDate = TimeUtils.convertDatetimeToDate(source.startDate);
        }
        if (source.endDate) {
            target.endDate = TimeUtils.convertDatetimeToDate(source.endDate);
        }
        return target;
    }
}
OccBudgetNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBudgetNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccBudgetNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBudgetNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBudgetNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccOrgUnitApprovalProcessNormalizer {
    constructor() {
        // Intentional empty constructor
    }
    convert(source, target) {
        if (target === undefined) {
            target = [...source.approvalProcesses];
        }
        return target;
    }
}
OccOrgUnitApprovalProcessNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrgUnitApprovalProcessNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccOrgUnitApprovalProcessNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrgUnitApprovalProcessNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrgUnitApprovalProcessNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccOrgUnitNodeListNormalizer {
    convert(source, target) {
        if (target === undefined) {
            target = [...source.unitNodes];
        }
        return target;
    }
}
OccOrgUnitNodeListNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrgUnitNodeListNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccOrgUnitNodeListNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrgUnitNodeListNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrgUnitNodeListNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccOrgUnitNodeNormalizer {
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        return target;
    }
}
OccOrgUnitNodeNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrgUnitNodeNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccOrgUnitNodeNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrgUnitNodeNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrgUnitNodeNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccOrgUnitNormalizer {
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        return target;
    }
}
OccOrgUnitNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrgUnitNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccOrgUnitNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrgUnitNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrgUnitNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccPermissionListNormalizer {
    constructor(converter) {
        this.converter = converter;
    }
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        target.values =
            source.orderApprovalPermissions?.map((permission) => ({
                ...this.converter.convert(permission, PERMISSION_NORMALIZER),
            })) ?? [];
        return target;
    }
}
OccPermissionListNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionListNormalizer, deps: [{ token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccPermissionListNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionListNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionListNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccPermissionNormalizer {
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        return target;
    }
}
OccPermissionNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccPermissionNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccPermissionTypeListNormalizer {
    constructor(converter) {
        this.converter = converter;
    }
    convert(source, target) {
        target = source.orderApprovalPermissionTypes?.map((permissionType) => this.converter.convert(permissionType, PERMISSION_TYPE_NORMALIZER));
        return target ?? [];
    }
}
OccPermissionTypeListNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionTypeListNormalizer, deps: [{ token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccPermissionTypeListNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionTypeListNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionTypeListNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccPermissionTypeNormalizer {
    constructor() {
        // Intentional empty constructor
    }
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        return target;
    }
}
OccPermissionTypeNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionTypeNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccPermissionTypeNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionTypeNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionTypeNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccUserGroupListNormalizer {
    constructor(converter) {
        this.converter = converter;
    }
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        target.values = source.orgUnitUserGroups.map((userGroup) => ({
            ...this.converter.convert(userGroup, USER_GROUP_NORMALIZER),
        }));
        return target;
    }
}
OccUserGroupListNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserGroupListNormalizer, deps: [{ token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccUserGroupListNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserGroupListNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserGroupListNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccUserGroupNormalizer {
    constructor() {
        // Intentional empty constructor
    }
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        return target;
    }
}
OccUserGroupNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserGroupNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccUserGroupNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserGroupNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserGroupNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccUserListNormalizer {
    constructor(converter) {
        this.converter = converter;
    }
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        target.values = source.users.map((b2bUser) => ({
            ...this.converter.convert(b2bUser, B2B_USER_NORMALIZER),
        }));
        return target;
    }
}
OccUserListNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserListNormalizer, deps: [{ token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccUserListNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserListNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserListNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AdministrationOccModule {
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

export { AdministrationOccModule, OccB2BUserAdapter, OccB2BUserNormalizer, OccB2bUserSerializer, OccBudgetAdapter, OccBudgetListNormalizer, OccBudgetNormalizer, OccBudgetSerializer, OccCostCenterAdapter, OccOrgUnitAdapter, OccOrgUnitApprovalProcessNormalizer, OccOrgUnitNodeListNormalizer, OccOrgUnitNodeNormalizer, OccOrgUnitNormalizer, OccPermissionAdapter, OccPermissionListNormalizer, OccPermissionNormalizer, OccPermissionTypeListNormalizer, OccPermissionTypeNormalizer, OccUserGroupAdapter, OccUserGroupListNormalizer, OccUserGroupNormalizer, OccUserListNormalizer };
//# sourceMappingURL=spartacus-organization-administration-occ.mjs.map
