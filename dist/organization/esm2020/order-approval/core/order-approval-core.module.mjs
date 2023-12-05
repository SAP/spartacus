/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { OrderApprovalStoreModule } from './store/order-approval-store.module';
import { OrderApprovalConnector } from './connectors/order-approval.connector';
import * as i0 from "@angular/core";
export class OrderApprovalCoreModule {
    static forRoot() {
        return {
            ngModule: OrderApprovalCoreModule,
            providers: [OrderApprovalConnector],
        };
    }
}
OrderApprovalCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderApprovalCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalCoreModule, imports: [OrderApprovalStoreModule] });
OrderApprovalCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalCoreModule, imports: [OrderApprovalStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OrderApprovalStoreModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItYXBwcm92YWwtY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL29yZGVyLWFwcHJvdmFsL2NvcmUvb3JkZXItYXBwcm92YWwtY29yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOztBQUsvRSxNQUFNLE9BQU8sdUJBQXVCO0lBQ2xDLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDcEMsQ0FBQztJQUNKLENBQUM7O29IQU5VLHVCQUF1QjtxSEFBdkIsdUJBQXVCLFlBRnhCLHdCQUF3QjtxSEFFdkIsdUJBQXVCLFlBRnhCLHdCQUF3QjsyRkFFdkIsdUJBQXVCO2tCQUhuQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLHdCQUF3QixDQUFDO2lCQUNwQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPcmRlckFwcHJvdmFsU3RvcmVNb2R1bGUgfSBmcm9tICcuL3N0b3JlL29yZGVyLWFwcHJvdmFsLXN0b3JlLm1vZHVsZSc7XG5pbXBvcnQgeyBPcmRlckFwcHJvdmFsQ29ubmVjdG9yIH0gZnJvbSAnLi9jb25uZWN0b3JzL29yZGVyLWFwcHJvdmFsLmNvbm5lY3Rvcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtPcmRlckFwcHJvdmFsU3RvcmVNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlckFwcHJvdmFsQ29yZU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8T3JkZXJBcHByb3ZhbENvcmVNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE9yZGVyQXBwcm92YWxDb3JlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbT3JkZXJBcHByb3ZhbENvbm5lY3Rvcl0sXG4gICAgfTtcbiAgfVxufVxuIl19