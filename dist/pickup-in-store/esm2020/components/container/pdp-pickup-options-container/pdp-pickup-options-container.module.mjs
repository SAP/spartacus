/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { PickupOptionsModule } from '../../presentational/index';
import { PdpPickupOptionsContainerComponent } from './pdp-pickup-options-container.component';
import * as i0 from "@angular/core";
export class PdpPickupOptionsContainerModule {
}
PdpPickupOptionsContainerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PdpPickupOptionsContainerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PdpPickupOptionsContainerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PdpPickupOptionsContainerModule, declarations: [PdpPickupOptionsContainerComponent], imports: [CommonModule, PickupOptionsModule], exports: [PdpPickupOptionsContainerComponent] });
PdpPickupOptionsContainerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PdpPickupOptionsContainerModule, providers: [
        provideOutlet({
            id: CartOutlets.ADD_TO_CART_PICKUP_OPTION,
            position: OutletPosition.REPLACE,
            component: PdpPickupOptionsContainerComponent,
        }),
    ], imports: [CommonModule, PickupOptionsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PdpPickupOptionsContainerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PickupOptionsModule],
                    exports: [PdpPickupOptionsContainerComponent],
                    declarations: [PdpPickupOptionsContainerComponent],
                    providers: [
                        provideOutlet({
                            id: CartOutlets.ADD_TO_CART_PICKUP_OPTION,
                            position: OutletPosition.REPLACE,
                            component: PdpPickupOptionsContainerComponent,
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRwLXBpY2t1cC1vcHRpb25zLWNvbnRhaW5lci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcGlja3VwLWluLXN0b3JlL2NvbXBvbmVudHMvY29udGFpbmVyL3BkcC1waWNrdXAtb3B0aW9ucy1jb250YWluZXIvcGRwLXBpY2t1cC1vcHRpb25zLWNvbnRhaW5lci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRWpFLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOztBQWM5RixNQUFNLE9BQU8sK0JBQStCOzs0SEFBL0IsK0JBQStCOzZIQUEvQiwrQkFBK0IsaUJBVDNCLGtDQUFrQyxhQUZ2QyxZQUFZLEVBQUUsbUJBQW1CLGFBQ2pDLGtDQUFrQzs2SEFVakMsK0JBQStCLGFBUi9CO1FBQ1QsYUFBYSxDQUFDO1lBQ1osRUFBRSxFQUFFLFdBQVcsQ0FBQyx5QkFBeUI7WUFDekMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxPQUFPO1lBQ2hDLFNBQVMsRUFBRSxrQ0FBa0M7U0FDOUMsQ0FBQztLQUNILFlBVFMsWUFBWSxFQUFFLG1CQUFtQjsyRkFXaEMsK0JBQStCO2tCQVozQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxtQkFBbUIsQ0FBQztvQkFDNUMsT0FBTyxFQUFFLENBQUMsa0NBQWtDLENBQUM7b0JBQzdDLFlBQVksRUFBRSxDQUFDLGtDQUFrQyxDQUFDO29CQUNsRCxTQUFTLEVBQUU7d0JBQ1QsYUFBYSxDQUFDOzRCQUNaLEVBQUUsRUFBRSxXQUFXLENBQUMseUJBQXlCOzRCQUN6QyxRQUFRLEVBQUUsY0FBYyxDQUFDLE9BQU87NEJBQ2hDLFNBQVMsRUFBRSxrQ0FBa0M7eUJBQzlDLENBQUM7cUJBQ0g7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhcnRPdXRsZXRzIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBPdXRsZXRQb3NpdGlvbiwgcHJvdmlkZU91dGxldCB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBQaWNrdXBPcHRpb25zTW9kdWxlIH0gZnJvbSAnLi4vLi4vcHJlc2VudGF0aW9uYWwvaW5kZXgnO1xuXG5pbXBvcnQgeyBQZHBQaWNrdXBPcHRpb25zQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9wZHAtcGlja3VwLW9wdGlvbnMtY29udGFpbmVyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFBpY2t1cE9wdGlvbnNNb2R1bGVdLFxuICBleHBvcnRzOiBbUGRwUGlja3VwT3B0aW9uc0NvbnRhaW5lckNvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW1BkcFBpY2t1cE9wdGlvbnNDb250YWluZXJDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlT3V0bGV0KHtcbiAgICAgIGlkOiBDYXJ0T3V0bGV0cy5BRERfVE9fQ0FSVF9QSUNLVVBfT1BUSU9OLFxuICAgICAgcG9zaXRpb246IE91dGxldFBvc2l0aW9uLlJFUExBQ0UsXG4gICAgICBjb21wb25lbnQ6IFBkcFBpY2t1cE9wdGlvbnNDb250YWluZXJDb21wb25lbnQsXG4gICAgfSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBkcFBpY2t1cE9wdGlvbnNDb250YWluZXJNb2R1bGUge31cbiJdfQ==