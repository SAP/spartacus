/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class OccOrgUnitApprovalProcessNormalizer {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLW9yZy11bml0LWFwcHJvdmFsLXByb2Nlc3Nlcy1ub3JtYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9vY2MvY29udmVydGVycy9vY2Mtb3JnLXVuaXQtYXBwcm92YWwtcHJvY2Vzc2VzLW5vcm1hbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTTNDLE1BQU0sT0FBTyxtQ0FBbUM7SUFHOUM7UUFDRSxnQ0FBZ0M7SUFDbEMsQ0FBQztJQUVELE9BQU8sQ0FDTCxNQUFrQyxFQUNsQyxNQUE2QjtRQUU3QixJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDeEIsTUFBTSxHQUFHLENBQUMsR0FBSSxNQUFNLENBQUMsaUJBQXlCLENBQUMsQ0FBQztTQUNqRDtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7O2dJQWZVLG1DQUFtQztvSUFBbkMsbUNBQW1DLGNBRmxDLE1BQU07MkZBRVAsbUNBQW1DO2tCQUgvQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnZlcnRlciwgT2NjLCBCMkJBcHByb3ZhbFByb2Nlc3MgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgT2NjT3JnVW5pdEFwcHJvdmFsUHJvY2Vzc05vcm1hbGl6ZXJcbiAgaW1wbGVtZW50cyBDb252ZXJ0ZXI8T2NjLkIyQkFwcHJvdmFsUHJvY2Vzc0xpc3QsIEIyQkFwcHJvdmFsUHJvY2Vzc1tdPlxue1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBJbnRlbnRpb25hbCBlbXB0eSBjb25zdHJ1Y3RvclxuICB9XG5cbiAgY29udmVydChcbiAgICBzb3VyY2U6IE9jYy5CMkJBcHByb3ZhbFByb2Nlc3NMaXN0LFxuICAgIHRhcmdldD86IEIyQkFwcHJvdmFsUHJvY2Vzc1tdXG4gICk6IEIyQkFwcHJvdmFsUHJvY2Vzc1tdIHtcbiAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldCA9IFsuLi4oc291cmNlLmFwcHJvdmFsUHJvY2Vzc2VzIGFzIGFueSldO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG59XG4iXX0=