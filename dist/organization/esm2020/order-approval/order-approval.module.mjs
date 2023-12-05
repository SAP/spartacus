/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { OrderApprovalComponentsModule } from './components/order-approval-components.module';
import { OrderApprovalCoreModule } from './core/order-approval-core.module';
import { OrderApprovalOccModule } from './occ/order-approval-occ.module';
import * as i0 from "@angular/core";
import * as i1 from "./core/order-approval-core.module";
export class OrderApprovalModule {
}
OrderApprovalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderApprovalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalModule, imports: [i1.OrderApprovalCoreModule, OrderApprovalOccModule,
        OrderApprovalComponentsModule] });
OrderApprovalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalModule, imports: [OrderApprovalCoreModule.forRoot(),
        OrderApprovalOccModule,
        OrderApprovalComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        OrderApprovalCoreModule.forRoot(),
                        OrderApprovalOccModule,
                        OrderApprovalComponentsModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItYXBwcm92YWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9vcmRlci1hcHByb3ZhbC9vcmRlci1hcHByb3ZhbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDOUYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDNUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0saUNBQWlDLENBQUM7OztBQVN6RSxNQUFNLE9BQU8sbUJBQW1COztnSEFBbkIsbUJBQW1CO2lIQUFuQixtQkFBbUIsd0NBSjVCLHNCQUFzQjtRQUN0Qiw2QkFBNkI7aUhBR3BCLG1CQUFtQixZQUw1Qix1QkFBdUIsQ0FBQyxPQUFPLEVBQUU7UUFDakMsc0JBQXNCO1FBQ3RCLDZCQUE2QjsyRkFHcEIsbUJBQW1CO2tCQVAvQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCx1QkFBdUIsQ0FBQyxPQUFPLEVBQUU7d0JBQ2pDLHNCQUFzQjt3QkFDdEIsNkJBQTZCO3FCQUM5QjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPcmRlckFwcHJvdmFsQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy9vcmRlci1hcHByb3ZhbC1jb21wb25lbnRzLm1vZHVsZSc7XG5pbXBvcnQgeyBPcmRlckFwcHJvdmFsQ29yZU1vZHVsZSB9IGZyb20gJy4vY29yZS9vcmRlci1hcHByb3ZhbC1jb3JlLm1vZHVsZSc7XG5pbXBvcnQgeyBPcmRlckFwcHJvdmFsT2NjTW9kdWxlIH0gZnJvbSAnLi9vY2Mvb3JkZXItYXBwcm92YWwtb2NjLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBPcmRlckFwcHJvdmFsQ29yZU1vZHVsZS5mb3JSb290KCksXG4gICAgT3JkZXJBcHByb3ZhbE9jY01vZHVsZSxcbiAgICBPcmRlckFwcHJvdmFsQ29tcG9uZW50c01vZHVsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJBcHByb3ZhbE1vZHVsZSB7fVxuIl19