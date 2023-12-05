/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigModule, I18nModule, UrlModule, } from '@spartacus/core';
import { CardModule, IconModule, MediaModule } from '@spartacus/storefront';
import { StoreModule } from '../../presentational';
import { PickUpItemsDetailsComponent } from './pickup-items-details.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class PickUpItemsDetailsModule {
}
PickUpItemsDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickUpItemsDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PickUpItemsDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PickUpItemsDetailsModule, declarations: [PickUpItemsDetailsComponent], imports: [CommonModule,
        I18nModule,
        RouterModule,
        UrlModule,
        IconModule,
        StoreModule,
        CardModule,
        MediaModule, i1.ConfigModule], exports: [PickUpItemsDetailsComponent] });
PickUpItemsDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickUpItemsDetailsModule, imports: [CommonModule,
        I18nModule,
        RouterModule,
        UrlModule,
        IconModule,
        StoreModule,
        CardModule,
        MediaModule,
        ConfigModule.withConfig({
            cmsComponents: {
                OrderConfirmationPickUpComponent: {
                    component: PickUpItemsDetailsComponent,
                    data: {
                        showEdit: false,
                        context: 'order',
                    },
                },
                CheckoutReviewPickup: {
                    component: PickUpItemsDetailsComponent,
                    data: {
                        showEdit: true,
                        context: 'review',
                    },
                },
                PickupInStoreDeliveryModeComponent: {
                    component: PickUpItemsDetailsComponent,
                    data: {
                        showEdit: false,
                        context: 'deliveryMode',
                    },
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickUpItemsDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        RouterModule,
                        UrlModule,
                        IconModule,
                        StoreModule,
                        CardModule,
                        MediaModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                OrderConfirmationPickUpComponent: {
                                    component: PickUpItemsDetailsComponent,
                                    data: {
                                        showEdit: false,
                                        context: 'order',
                                    },
                                },
                                CheckoutReviewPickup: {
                                    component: PickUpItemsDetailsComponent,
                                    data: {
                                        showEdit: true,
                                        context: 'review',
                                    },
                                },
                                PickupInStoreDeliveryModeComponent: {
                                    component: PickUpItemsDetailsComponent,
                                    data: {
                                        showEdit: false,
                                        context: 'deliveryMode',
                                    },
                                },
                            },
                        }),
                    ],
                    declarations: [PickUpItemsDetailsComponent],
                    exports: [PickUpItemsDetailsComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3VwLWl0ZW1zLWRldGFpbHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3BpY2t1cC1pbi1zdG9yZS9jb21wb25lbnRzL2NvbnRhaW5lci9waWNrdXAtaXRlbXMtZGV0YWlscy9waWNrdXAtaXRlbXMtZGV0YWlscy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBRUwsWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEdBQ1YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7OztBQXlDL0UsTUFBTSxPQUFPLHdCQUF3Qjs7cUhBQXhCLHdCQUF3QjtzSEFBeEIsd0JBQXdCLGlCQUhwQiwyQkFBMkIsYUFsQ3hDLFlBQVk7UUFDWixVQUFVO1FBQ1YsWUFBWTtRQUNaLFNBQVM7UUFDVCxVQUFVO1FBQ1YsV0FBVztRQUNYLFVBQVU7UUFDVixXQUFXLDhCQTRCSCwyQkFBMkI7c0hBRTFCLHdCQUF3QixZQXJDakMsWUFBWTtRQUNaLFVBQVU7UUFDVixZQUFZO1FBQ1osU0FBUztRQUNULFVBQVU7UUFDVixXQUFXO1FBQ1gsVUFBVTtRQUNWLFdBQVc7UUFDWCxZQUFZLENBQUMsVUFBVSxDQUFDO1lBQ3RCLGFBQWEsRUFBRTtnQkFDYixnQ0FBZ0MsRUFBRTtvQkFDaEMsU0FBUyxFQUFFLDJCQUEyQjtvQkFDdEMsSUFBSSxFQUFFO3dCQUNKLFFBQVEsRUFBRSxLQUFLO3dCQUNmLE9BQU8sRUFBRSxPQUFPO3FCQUNqQjtpQkFDRjtnQkFDRCxvQkFBb0IsRUFBRTtvQkFDcEIsU0FBUyxFQUFFLDJCQUEyQjtvQkFDdEMsSUFBSSxFQUFFO3dCQUNKLFFBQVEsRUFBRSxJQUFJO3dCQUNkLE9BQU8sRUFBRSxRQUFRO3FCQUNsQjtpQkFDRjtnQkFDRCxrQ0FBa0MsRUFBRTtvQkFDbEMsU0FBUyxFQUFFLDJCQUEyQjtvQkFDdEMsSUFBSSxFQUFFO3dCQUNKLFFBQVEsRUFBRSxLQUFLO3dCQUNmLE9BQU8sRUFBRSxjQUFjO3FCQUN4QjtpQkFDRjthQUNGO1NBQ1csQ0FBQzsyRkFLTix3QkFBd0I7a0JBdkNwQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsWUFBWTt3QkFDWixTQUFTO3dCQUNULFVBQVU7d0JBQ1YsV0FBVzt3QkFDWCxVQUFVO3dCQUNWLFdBQVc7d0JBQ1gsWUFBWSxDQUFDLFVBQVUsQ0FBQzs0QkFDdEIsYUFBYSxFQUFFO2dDQUNiLGdDQUFnQyxFQUFFO29DQUNoQyxTQUFTLEVBQUUsMkJBQTJCO29DQUN0QyxJQUFJLEVBQUU7d0NBQ0osUUFBUSxFQUFFLEtBQUs7d0NBQ2YsT0FBTyxFQUFFLE9BQU87cUNBQ2pCO2lDQUNGO2dDQUNELG9CQUFvQixFQUFFO29DQUNwQixTQUFTLEVBQUUsMkJBQTJCO29DQUN0QyxJQUFJLEVBQUU7d0NBQ0osUUFBUSxFQUFFLElBQUk7d0NBQ2QsT0FBTyxFQUFFLFFBQVE7cUNBQ2xCO2lDQUNGO2dDQUNELGtDQUFrQyxFQUFFO29DQUNsQyxTQUFTLEVBQUUsMkJBQTJCO29DQUN0QyxJQUFJLEVBQUU7d0NBQ0osUUFBUSxFQUFFLEtBQUs7d0NBQ2YsT0FBTyxFQUFFLGNBQWM7cUNBQ3hCO2lDQUNGOzZCQUNGO3lCQUNXLENBQUM7cUJBQ2hCO29CQUNELFlBQVksRUFBRSxDQUFDLDJCQUEyQixDQUFDO29CQUMzQyxPQUFPLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztpQkFDdkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7XG4gIENtc0NvbmZpZyxcbiAgQ29uZmlnTW9kdWxlLFxuICBJMThuTW9kdWxlLFxuICBVcmxNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDYXJkTW9kdWxlLCBJY29uTW9kdWxlLCBNZWRpYU1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBTdG9yZU1vZHVsZSB9IGZyb20gJy4uLy4uL3ByZXNlbnRhdGlvbmFsJztcbmltcG9ydCB7IFBpY2tVcEl0ZW1zRGV0YWlsc0NvbXBvbmVudCB9IGZyb20gJy4vcGlja3VwLWl0ZW1zLWRldGFpbHMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgSWNvbk1vZHVsZSxcbiAgICBTdG9yZU1vZHVsZSxcbiAgICBDYXJkTW9kdWxlLFxuICAgIE1lZGlhTW9kdWxlLFxuICAgIENvbmZpZ01vZHVsZS53aXRoQ29uZmlnKHtcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgT3JkZXJDb25maXJtYXRpb25QaWNrVXBDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IFBpY2tVcEl0ZW1zRGV0YWlsc0NvbXBvbmVudCxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBzaG93RWRpdDogZmFsc2UsXG4gICAgICAgICAgICBjb250ZXh0OiAnb3JkZXInLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIENoZWNrb3V0UmV2aWV3UGlja3VwOiB7XG4gICAgICAgICAgY29tcG9uZW50OiBQaWNrVXBJdGVtc0RldGFpbHNDb21wb25lbnQsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgc2hvd0VkaXQ6IHRydWUsXG4gICAgICAgICAgICBjb250ZXh0OiAncmV2aWV3JyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBQaWNrdXBJblN0b3JlRGVsaXZlcnlNb2RlQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBQaWNrVXBJdGVtc0RldGFpbHNDb21wb25lbnQsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgc2hvd0VkaXQ6IGZhbHNlLFxuICAgICAgICAgICAgY29udGV4dDogJ2RlbGl2ZXJ5TW9kZScsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSBhcyBDbXNDb25maWcpLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQaWNrVXBJdGVtc0RldGFpbHNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUGlja1VwSXRlbXNEZXRhaWxzQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgUGlja1VwSXRlbXNEZXRhaWxzTW9kdWxlIHt9XG4iXX0=