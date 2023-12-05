/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./permission.adapter";
export class PermissionConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    get(userId, permissionCode) {
        return this.adapter.load(userId, permissionCode);
    }
    getList(userId, params) {
        return this.adapter.loadList(userId, params);
    }
    create(userId, permission) {
        return this.adapter.create(userId, permission);
    }
    update(userId, permissionCode, permission) {
        return this.adapter.update(userId, permissionCode, permission);
    }
    getTypes() {
        return this.adapter.loadTypes();
    }
}
PermissionConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionConnector, deps: [{ token: i1.PermissionAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
PermissionConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.PermissionAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbi5jb25uZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUvY29ubmVjdG9ycy9wZXJtaXNzaW9uL3Blcm1pc3Npb24uY29ubmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFhM0MsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixZQUFzQixPQUEwQjtRQUExQixZQUFPLEdBQVAsT0FBTyxDQUFtQjtJQUFHLENBQUM7SUFFcEQsR0FBRyxDQUFDLE1BQWMsRUFBRSxjQUFzQjtRQUN4QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsT0FBTyxDQUNMLE1BQWMsRUFDZCxNQUFxQjtRQUVyQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQWMsRUFBRSxVQUFzQjtRQUMzQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsTUFBTSxDQUNKLE1BQWMsRUFDZCxjQUFzQixFQUN0QixVQUFzQjtRQUV0QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7Z0hBNUJVLG1CQUFtQjtvSEFBbkIsbUJBQW1CLGNBRmxCLE1BQU07MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEVudGl0aWVzTW9kZWwsXG4gIFNlYXJjaENvbmZpZyxcbiAgT3JkZXJBcHByb3ZhbFBlcm1pc3Npb25UeXBlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUGVybWlzc2lvbiB9IGZyb20gJy4uLy4uL21vZGVsL3Blcm1pc3Npb24ubW9kZWwnO1xuaW1wb3J0IHsgUGVybWlzc2lvbkFkYXB0ZXIgfSBmcm9tICcuL3Blcm1pc3Npb24uYWRhcHRlcic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBQZXJtaXNzaW9uQ29ubmVjdG9yIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGFkYXB0ZXI6IFBlcm1pc3Npb25BZGFwdGVyKSB7fVxuXG4gIGdldCh1c2VySWQ6IHN0cmluZywgcGVybWlzc2lvbkNvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8UGVybWlzc2lvbj4ge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIubG9hZCh1c2VySWQsIHBlcm1pc3Npb25Db2RlKTtcbiAgfVxuXG4gIGdldExpc3QoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgcGFyYW1zPzogU2VhcmNoQ29uZmlnXG4gICk6IE9ic2VydmFibGU8RW50aXRpZXNNb2RlbDxQZXJtaXNzaW9uPj4ge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIubG9hZExpc3QodXNlcklkLCBwYXJhbXMpO1xuICB9XG5cbiAgY3JlYXRlKHVzZXJJZDogc3RyaW5nLCBwZXJtaXNzaW9uOiBQZXJtaXNzaW9uKTogT2JzZXJ2YWJsZTxQZXJtaXNzaW9uPiB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5jcmVhdGUodXNlcklkLCBwZXJtaXNzaW9uKTtcbiAgfVxuXG4gIHVwZGF0ZShcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBwZXJtaXNzaW9uQ29kZTogc3RyaW5nLFxuICAgIHBlcm1pc3Npb246IFBlcm1pc3Npb25cbiAgKTogT2JzZXJ2YWJsZTxQZXJtaXNzaW9uPiB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci51cGRhdGUodXNlcklkLCBwZXJtaXNzaW9uQ29kZSwgcGVybWlzc2lvbik7XG4gIH1cblxuICBnZXRUeXBlcygpOiBPYnNlcnZhYmxlPE9yZGVyQXBwcm92YWxQZXJtaXNzaW9uVHlwZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5sb2FkVHlwZXMoKTtcbiAgfVxufVxuIl19