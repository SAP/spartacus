/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { OrderOutlets } from '@spartacus/order/root';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { PickupInStoreOrderConsignmentContainerComponent } from './pickup-in-store-order-consignment-container.component';
import * as i0 from "@angular/core";
export class OrderConsignmentContainerModule {
}
OrderConsignmentContainerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConsignmentContainerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderConsignmentContainerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderConsignmentContainerModule, declarations: [PickupInStoreOrderConsignmentContainerComponent], imports: [CommonModule, I18nModule], exports: [PickupInStoreOrderConsignmentContainerComponent] });
OrderConsignmentContainerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConsignmentContainerModule, providers: [
        provideOutlet({
            id: OrderOutlets.ORDER_CONSIGNMENT,
            position: OutletPosition.AFTER,
            component: PickupInStoreOrderConsignmentContainerComponent,
        }),
    ], imports: [CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConsignmentContainerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule],
                    exports: [PickupInStoreOrderConsignmentContainerComponent],
                    declarations: [PickupInStoreOrderConsignmentContainerComponent],
                    providers: [
                        provideOutlet({
                            id: OrderOutlets.ORDER_CONSIGNMENT,
                            position: OutletPosition.AFTER,
                            component: PickupInStoreOrderConsignmentContainerComponent,
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3VwLWluLXN0b3JlLW9yZGVyLWNvbnNpZ25tZW50LWNvbnRhaW5lci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcGlja3VwLWluLXN0b3JlL2NvbXBvbmVudHMvY29udGFpbmVyL3BpY2t1cC1pbi1zdG9yZS1vcmRlci1jb25zaWdubWVudC9waWNrdXAtaW4tc3RvcmUtb3JkZXItY29uc2lnbm1lbnQtY29udGFpbmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSwrQ0FBK0MsRUFBRSxNQUFNLHlEQUF5RCxDQUFDOztBQWMxSCxNQUFNLE9BQU8sK0JBQStCOzs0SEFBL0IsK0JBQStCOzZIQUEvQiwrQkFBK0IsaUJBVDNCLCtDQUErQyxhQUZwRCxZQUFZLEVBQUUsVUFBVSxhQUN4QiwrQ0FBK0M7NkhBVTlDLCtCQUErQixhQVIvQjtRQUNULGFBQWEsQ0FBQztZQUNaLEVBQUUsRUFBRSxZQUFZLENBQUMsaUJBQWlCO1lBQ2xDLFFBQVEsRUFBRSxjQUFjLENBQUMsS0FBSztZQUM5QixTQUFTLEVBQUUsK0NBQStDO1NBQzNELENBQUM7S0FDSCxZQVRTLFlBQVksRUFBRSxVQUFVOzJGQVd2QiwrQkFBK0I7a0JBWjNDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQztvQkFDbkMsT0FBTyxFQUFFLENBQUMsK0NBQStDLENBQUM7b0JBQzFELFlBQVksRUFBRSxDQUFDLCtDQUErQyxDQUFDO29CQUMvRCxTQUFTLEVBQUU7d0JBQ1QsYUFBYSxDQUFDOzRCQUNaLEVBQUUsRUFBRSxZQUFZLENBQUMsaUJBQWlCOzRCQUNsQyxRQUFRLEVBQUUsY0FBYyxDQUFDLEtBQUs7NEJBQzlCLFNBQVMsRUFBRSwrQ0FBK0M7eUJBQzNELENBQUM7cUJBQ0g7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT3JkZXJPdXRsZXRzIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9yb290JztcbmltcG9ydCB7IE91dGxldFBvc2l0aW9uLCBwcm92aWRlT3V0bGV0IH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFBpY2t1cEluU3RvcmVPcmRlckNvbnNpZ25tZW50Q29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9waWNrdXAtaW4tc3RvcmUtb3JkZXItY29uc2lnbm1lbnQtY29udGFpbmVyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEkxOG5Nb2R1bGVdLFxuICBleHBvcnRzOiBbUGlja3VwSW5TdG9yZU9yZGVyQ29uc2lnbm1lbnRDb250YWluZXJDb21wb25lbnRdLFxuICBkZWNsYXJhdGlvbnM6IFtQaWNrdXBJblN0b3JlT3JkZXJDb25zaWdubWVudENvbnRhaW5lckNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVPdXRsZXQoe1xuICAgICAgaWQ6IE9yZGVyT3V0bGV0cy5PUkRFUl9DT05TSUdOTUVOVCxcbiAgICAgIHBvc2l0aW9uOiBPdXRsZXRQb3NpdGlvbi5BRlRFUixcbiAgICAgIGNvbXBvbmVudDogUGlja3VwSW5TdG9yZU9yZGVyQ29uc2lnbm1lbnRDb250YWluZXJDb21wb25lbnQsXG4gICAgfSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyQ29uc2lnbm1lbnRDb250YWluZXJNb2R1bGUge31cbiJdfQ==