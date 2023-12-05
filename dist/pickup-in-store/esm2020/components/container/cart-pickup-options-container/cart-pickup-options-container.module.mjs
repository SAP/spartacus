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
import { CartPickupOptionsContainerComponent } from './cart-pickup-options-container.component';
import * as i0 from "@angular/core";
export class CartPickupOptionsContainerModule {
}
CartPickupOptionsContainerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPickupOptionsContainerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartPickupOptionsContainerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartPickupOptionsContainerModule, declarations: [CartPickupOptionsContainerComponent], imports: [CommonModule, PickupOptionsModule], exports: [CartPickupOptionsContainerComponent] });
CartPickupOptionsContainerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPickupOptionsContainerModule, providers: [
        provideOutlet({
            id: CartOutlets.ITEM_DELIVERY_DETAILS,
            position: OutletPosition.REPLACE,
            component: CartPickupOptionsContainerComponent,
        }),
    ], imports: [CommonModule, PickupOptionsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPickupOptionsContainerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PickupOptionsModule],
                    exports: [CartPickupOptionsContainerComponent],
                    declarations: [CartPickupOptionsContainerComponent],
                    providers: [
                        provideOutlet({
                            id: CartOutlets.ITEM_DELIVERY_DETAILS,
                            position: OutletPosition.REPLACE,
                            component: CartPickupOptionsContainerComponent,
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1waWNrdXAtb3B0aW9ucy1jb250YWluZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3BpY2t1cC1pbi1zdG9yZS9jb21wb25lbnRzL2NvbnRhaW5lci9jYXJ0LXBpY2t1cC1vcHRpb25zLWNvbnRhaW5lci9jYXJ0LXBpY2t1cC1vcHRpb25zLWNvbnRhaW5lci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRWpFLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLDJDQUEyQyxDQUFDOztBQWNoRyxNQUFNLE9BQU8sZ0NBQWdDOzs2SEFBaEMsZ0NBQWdDOzhIQUFoQyxnQ0FBZ0MsaUJBVDVCLG1DQUFtQyxhQUZ4QyxZQUFZLEVBQUUsbUJBQW1CLGFBQ2pDLG1DQUFtQzs4SEFVbEMsZ0NBQWdDLGFBUmhDO1FBQ1QsYUFBYSxDQUFDO1lBQ1osRUFBRSxFQUFFLFdBQVcsQ0FBQyxxQkFBcUI7WUFDckMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxPQUFPO1lBQ2hDLFNBQVMsRUFBRSxtQ0FBbUM7U0FDL0MsQ0FBQztLQUNILFlBVFMsWUFBWSxFQUFFLG1CQUFtQjsyRkFXaEMsZ0NBQWdDO2tCQVo1QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxtQkFBbUIsQ0FBQztvQkFDNUMsT0FBTyxFQUFFLENBQUMsbUNBQW1DLENBQUM7b0JBQzlDLFlBQVksRUFBRSxDQUFDLG1DQUFtQyxDQUFDO29CQUNuRCxTQUFTLEVBQUU7d0JBQ1QsYUFBYSxDQUFDOzRCQUNaLEVBQUUsRUFBRSxXQUFXLENBQUMscUJBQXFCOzRCQUNyQyxRQUFRLEVBQUUsY0FBYyxDQUFDLE9BQU87NEJBQ2hDLFNBQVMsRUFBRSxtQ0FBbUM7eUJBQy9DLENBQUM7cUJBQ0g7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhcnRPdXRsZXRzIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBPdXRsZXRQb3NpdGlvbiwgcHJvdmlkZU91dGxldCB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBQaWNrdXBPcHRpb25zTW9kdWxlIH0gZnJvbSAnLi4vLi4vcHJlc2VudGF0aW9uYWwvaW5kZXgnO1xuXG5pbXBvcnQgeyBDYXJ0UGlja3VwT3B0aW9uc0NvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vY2FydC1waWNrdXAtb3B0aW9ucy1jb250YWluZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUGlja3VwT3B0aW9uc01vZHVsZV0sXG4gIGV4cG9ydHM6IFtDYXJ0UGlja3VwT3B0aW9uc0NvbnRhaW5lckNvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW0NhcnRQaWNrdXBPcHRpb25zQ29udGFpbmVyQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZU91dGxldCh7XG4gICAgICBpZDogQ2FydE91dGxldHMuSVRFTV9ERUxJVkVSWV9ERVRBSUxTLFxuICAgICAgcG9zaXRpb246IE91dGxldFBvc2l0aW9uLlJFUExBQ0UsXG4gICAgICBjb21wb25lbnQ6IENhcnRQaWNrdXBPcHRpb25zQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIH0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDYXJ0UGlja3VwT3B0aW9uc0NvbnRhaW5lck1vZHVsZSB7fVxuIl19