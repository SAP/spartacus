/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { PERMISSION_TYPE_NORMALIZER } from '@spartacus/organization/administration/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class OccPermissionTypeListNormalizer {
    constructor(converter) {
        this.converter = converter;
    }
    convert(source, target) {
        target = source.orderApprovalPermissionTypes?.map((permissionType) => this.converter.convert(permissionType, PERMISSION_TYPE_NORMALIZER));
        return target ?? [];
    }
}
OccPermissionTypeListNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionTypeListNormalizer, deps: [{ token: i1.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccPermissionTypeListNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionTypeListNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionTypeListNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXBlcm1pc3Npb24tdHlwZS1saXN0Lm5vcm1hbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL29jYy9jb252ZXJ0ZXJzL29jYy1wZXJtaXNzaW9uLXR5cGUtbGlzdC5ub3JtYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTzNDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDOzs7QUFLekYsTUFBTSxPQUFPLCtCQUErQjtJQU8xQyxZQUFvQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtJQUFHLENBQUM7SUFFbkQsT0FBTyxDQUNMLE1BQTJDLEVBQzNDLE1BQXNDO1FBRXRDLE1BQU0sR0FBRyxNQUFNLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FDbkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLDBCQUEwQixDQUFDLENBQ25FLENBQUM7UUFFRixPQUFPLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7NEhBbEJVLCtCQUErQjtnSUFBL0IsK0JBQStCLGNBRjlCLE1BQU07MkZBRVAsK0JBQStCO2tCQUgzQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvbnZlcnRlcixcbiAgQ29udmVydGVyU2VydmljZSxcbiAgT2NjLFxuICBPcmRlckFwcHJvdmFsUGVybWlzc2lvblR5cGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBQRVJNSVNTSU9OX1RZUEVfTk9STUFMSVpFUiB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgT2NjUGVybWlzc2lvblR5cGVMaXN0Tm9ybWFsaXplclxuICBpbXBsZW1lbnRzXG4gICAgQ29udmVydGVyPFxuICAgICAgT2NjLk9yZGVyQXBwcm92YWxQZXJtaXNzaW9uVHlwZUxpc3QsXG4gICAgICBPcmRlckFwcHJvdmFsUGVybWlzc2lvblR5cGVbXVxuICAgID5cbntcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb252ZXJ0ZXI6IENvbnZlcnRlclNlcnZpY2UpIHt9XG5cbiAgY29udmVydChcbiAgICBzb3VyY2U6IE9jYy5PcmRlckFwcHJvdmFsUGVybWlzc2lvblR5cGVMaXN0LFxuICAgIHRhcmdldD86IE9yZGVyQXBwcm92YWxQZXJtaXNzaW9uVHlwZVtdXG4gICk6IE9yZGVyQXBwcm92YWxQZXJtaXNzaW9uVHlwZVtdIHtcbiAgICB0YXJnZXQgPSBzb3VyY2Uub3JkZXJBcHByb3ZhbFBlcm1pc3Npb25UeXBlcz8ubWFwKChwZXJtaXNzaW9uVHlwZSkgPT5cbiAgICAgIHRoaXMuY29udmVydGVyLmNvbnZlcnQocGVybWlzc2lvblR5cGUsIFBFUk1JU1NJT05fVFlQRV9OT1JNQUxJWkVSKVxuICAgICk7XG5cbiAgICByZXR1cm4gdGFyZ2V0ID8/IFtdO1xuICB9XG59XG4iXX0=