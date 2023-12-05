/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { OrganizationTableType } from '../../../shared/organization.model';
import { UserUserGroupListService } from '../user-user-group-list.service';
import * as i0 from "@angular/core";
export class UserAssignedUserGroupListService extends UserUserGroupListService {
    constructor() {
        super(...arguments);
        this.tableType = OrganizationTableType.USER_ASSIGNED_USER_GROUPS;
    }
    load(pagination, code) {
        return super.load(pagination, code).pipe(filter((list) => Boolean(list)), map((userGroups) => this.filterSelected(userGroups)));
    }
}
UserAssignedUserGroupListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedUserGroupListService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UserAssignedUserGroupListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedUserGroupListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedUserGroupListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hc3NpZ25lZC11c2VyLWdyb3VwLWxpc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91c2VyL3VzZXItZ3JvdXBzL2Fzc2lnbmVkL3VzZXItYXNzaWduZWQtdXNlci1ncm91cC1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7QUFLM0UsTUFBTSxPQUFPLGdDQUFpQyxTQUFRLHdCQUF3QjtJQUg5RTs7UUFJWSxjQUFTLEdBQUcscUJBQXFCLENBQUMseUJBQXlCLENBQUM7S0FXdkU7SUFUVyxJQUFJLENBQ1osVUFBMkIsRUFDM0IsSUFBWTtRQUVaLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUN0QyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUMvQixHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FDckQsQ0FBQztJQUNKLENBQUM7OzZIQVhVLGdDQUFnQztpSUFBaEMsZ0NBQWdDLGNBRi9CLE1BQU07MkZBRVAsZ0NBQWdDO2tCQUg1QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVudGl0aWVzTW9kZWwsIFBhZ2luYXRpb25Nb2RlbCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBVc2VyR3JvdXAgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT3JnYW5pemF0aW9uVGFibGVUeXBlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL29yZ2FuaXphdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBVc2VyVXNlckdyb3VwTGlzdFNlcnZpY2UgfSBmcm9tICcuLi91c2VyLXVzZXItZ3JvdXAtbGlzdC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJBc3NpZ25lZFVzZXJHcm91cExpc3RTZXJ2aWNlIGV4dGVuZHMgVXNlclVzZXJHcm91cExpc3RTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIHRhYmxlVHlwZSA9IE9yZ2FuaXphdGlvblRhYmxlVHlwZS5VU0VSX0FTU0lHTkVEX1VTRVJfR1JPVVBTO1xuXG4gIHByb3RlY3RlZCBsb2FkKFxuICAgIHBhZ2luYXRpb246IFBhZ2luYXRpb25Nb2RlbCxcbiAgICBjb2RlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxFbnRpdGllc01vZGVsPFVzZXJHcm91cD4gfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gc3VwZXIubG9hZChwYWdpbmF0aW9uLCBjb2RlKS5waXBlKFxuICAgICAgZmlsdGVyKChsaXN0KSA9PiBCb29sZWFuKGxpc3QpKSxcbiAgICAgIG1hcCgodXNlckdyb3VwcykgPT4gdGhpcy5maWx0ZXJTZWxlY3RlZCh1c2VyR3JvdXBzKSlcbiAgICApO1xuICB9XG59XG4iXX0=