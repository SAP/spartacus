/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { PERMISSION_NORMALIZER, } from '@spartacus/organization/administration/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class OccPermissionListNormalizer {
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
OccPermissionListNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionListNormalizer, deps: [{ token: i1.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccPermissionListNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionListNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionListNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXBlcm1pc3Npb24tbGlzdC1ub3JtYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9vY2MvY29udmVydGVycy9vY2MtcGVybWlzc2lvbi1saXN0LW5vcm1hbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPM0MsT0FBTyxFQUVMLHFCQUFxQixHQUN0QixNQUFNLDZDQUE2QyxDQUFDOzs7QUFLckQsTUFBTSxPQUFPLDJCQUEyQjtJQUd0QyxZQUFvQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtJQUFHLENBQUM7SUFFbkQsT0FBTyxDQUNMLE1BQTJCLEVBQzNCLE1BQWtDO1FBRWxDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN4QixNQUFNLEdBQUcsRUFBRSxHQUFJLE1BQWMsRUFBK0IsQ0FBQztTQUM5RDtRQUNELE1BQU0sQ0FBQyxNQUFNO1lBQ1gsTUFBTSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDcEQsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUscUJBQXFCLENBQUM7YUFDN0QsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7d0hBakJVLDJCQUEyQjs0SEFBM0IsMkJBQTJCLGNBRjFCLE1BQU07MkZBRVAsMkJBQTJCO2tCQUh2QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvbnZlcnRlcixcbiAgQ29udmVydGVyU2VydmljZSxcbiAgRW50aXRpZXNNb2RlbCxcbiAgT2NjLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgUGVybWlzc2lvbixcbiAgUEVSTUlTU0lPTl9OT1JNQUxJWkVSLFxufSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE9jY1Blcm1pc3Npb25MaXN0Tm9ybWFsaXplclxuICBpbXBsZW1lbnRzIENvbnZlcnRlcjxPY2MuUGVybWlzc2lvbnNMaXN0LCBFbnRpdGllc01vZGVsPFBlcm1pc3Npb24+Plxue1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnZlcnRlcjogQ29udmVydGVyU2VydmljZSkge31cblxuICBjb252ZXJ0KFxuICAgIHNvdXJjZTogT2NjLlBlcm1pc3Npb25zTGlzdCxcbiAgICB0YXJnZXQ/OiBFbnRpdGllc01vZGVsPFBlcm1pc3Npb24+XG4gICk6IEVudGl0aWVzTW9kZWw8UGVybWlzc2lvbj4ge1xuICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0ID0geyAuLi4oc291cmNlIGFzIGFueSkgfSBhcyBFbnRpdGllc01vZGVsPFBlcm1pc3Npb24+O1xuICAgIH1cbiAgICB0YXJnZXQudmFsdWVzID1cbiAgICAgIHNvdXJjZS5vcmRlckFwcHJvdmFsUGVybWlzc2lvbnM/Lm1hcCgocGVybWlzc2lvbikgPT4gKHtcbiAgICAgICAgLi4udGhpcy5jb252ZXJ0ZXIuY29udmVydChwZXJtaXNzaW9uLCBQRVJNSVNTSU9OX05PUk1BTElaRVIpLFxuICAgICAgfSkpID8/IFtdO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbn1cbiJdfQ==