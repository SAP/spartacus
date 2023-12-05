/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FeaturesConfigModule, I18nModule, provideDefaultConfig, } from '@spartacus/core';
import { OrderConfirmationOrderEntriesContextToken, OrderFacade, OrderOutlets, } from '@spartacus/order/root';
import { CardModule, FormErrorsModule, OutletModule, PasswordVisibilityToggleModule, PromotionsModule, PwaModule, provideOutlet, } from '@spartacus/storefront';
import { OrderConfirmationGuard } from '../guards/order-confirmation.guard';
import { OrderDetailBillingComponent } from '../order-details/order-detail-billing/order-detail-billing.component';
import { OrderDetailsService } from '../order-details/order-details.service';
import { OrderOverviewComponent } from '../order-details/order-overview/order-overview.component';
import { OrderConfirmationOrderEntriesContext } from '../page-context/order-confirmation-order-entries.context';
import { OrderConfirmationItemsComponent } from './order-confirmation-items/order-confirmation-items.component';
import { OrderConfirmationShippingComponent } from './order-confirmation-shipping/order-confirmation-shipping.component';
import { OrderConfirmationThankYouMessageComponent } from './order-confirmation-thank-you-message/order-confirmation-thank-you-message.component';
import { OrderConfirmationTotalsComponent } from './order-confirmation-totals/order-confirmation-totals.component';
import { OrderGuestRegisterFormComponent } from './order-guest-register-form/order-guest-register-form.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
const orderConfirmationComponents = [
    OrderConfirmationItemsComponent,
    OrderConfirmationThankYouMessageComponent,
    OrderConfirmationTotalsComponent,
    OrderGuestRegisterFormComponent,
    OrderConfirmationShippingComponent,
];
export class OrderConfirmationModule {
}
OrderConfirmationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderConfirmationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationModule, declarations: [OrderConfirmationItemsComponent,
        OrderConfirmationThankYouMessageComponent,
        OrderConfirmationTotalsComponent,
        OrderGuestRegisterFormComponent,
        OrderConfirmationShippingComponent], imports: [CommonModule,
        CardModule,
        PwaModule,
        PromotionsModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule, i1.OutletModule, PasswordVisibilityToggleModule,
        FeaturesConfigModule], exports: [OrderConfirmationItemsComponent,
        OrderConfirmationThankYouMessageComponent,
        OrderConfirmationTotalsComponent,
        OrderGuestRegisterFormComponent,
        OrderConfirmationShippingComponent] });
OrderConfirmationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                OrderConfirmationThankMessageComponent: {
                    component: OrderConfirmationThankYouMessageComponent,
                    guards: [OrderConfirmationGuard],
                },
                ReplenishmentConfirmationMessageComponent: {
                    component: OrderConfirmationThankYouMessageComponent,
                    guards: [OrderConfirmationGuard],
                },
                OrderConfirmationItemsComponent: {
                    component: OrderConfirmationItemsComponent,
                    guards: [OrderConfirmationGuard],
                },
                ReplenishmentConfirmationItemsComponent: {
                    component: OrderConfirmationItemsComponent,
                    guards: [OrderConfirmationGuard],
                },
                OrderConfirmationTotalsComponent: {
                    component: OrderConfirmationTotalsComponent,
                    guards: [OrderConfirmationGuard],
                },
                ReplenishmentConfirmationTotalsComponent: {
                    component: OrderConfirmationTotalsComponent,
                    guards: [OrderConfirmationGuard],
                },
                OrderConfirmationOverviewComponent: {
                    component: OrderOverviewComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: OrderFacade,
                        },
                    ],
                    guards: [OrderConfirmationGuard],
                },
                ReplenishmentConfirmationOverviewComponent: {
                    component: OrderOverviewComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: OrderFacade,
                        },
                    ],
                    guards: [OrderConfirmationGuard],
                },
                OrderConfirmationShippingComponent: {
                    component: OrderConfirmationShippingComponent,
                    guards: [OrderConfirmationGuard],
                },
                OrderConfirmationBillingComponent: {
                    component: OrderDetailBillingComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: OrderFacade,
                        },
                    ],
                    guards: [OrderConfirmationGuard],
                },
            },
        }),
        {
            provide: OrderConfirmationOrderEntriesContextToken,
            useExisting: OrderConfirmationOrderEntriesContext,
        },
        provideOutlet({
            id: OrderOutlets.CONSIGNMENT_DELIVERY_INFO,
            component: OrderConfirmationShippingComponent,
        }),
    ], imports: [CommonModule,
        CardModule,
        PwaModule,
        PromotionsModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        OutletModule.forChild(),
        PasswordVisibilityToggleModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CardModule,
                        PwaModule,
                        PromotionsModule,
                        I18nModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                        OutletModule.forChild(),
                        PasswordVisibilityToggleModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                OrderConfirmationThankMessageComponent: {
                                    component: OrderConfirmationThankYouMessageComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                ReplenishmentConfirmationMessageComponent: {
                                    component: OrderConfirmationThankYouMessageComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                OrderConfirmationItemsComponent: {
                                    component: OrderConfirmationItemsComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                ReplenishmentConfirmationItemsComponent: {
                                    component: OrderConfirmationItemsComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                OrderConfirmationTotalsComponent: {
                                    component: OrderConfirmationTotalsComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                ReplenishmentConfirmationTotalsComponent: {
                                    component: OrderConfirmationTotalsComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                OrderConfirmationOverviewComponent: {
                                    component: OrderOverviewComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: OrderFacade,
                                        },
                                    ],
                                    guards: [OrderConfirmationGuard],
                                },
                                ReplenishmentConfirmationOverviewComponent: {
                                    component: OrderOverviewComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: OrderFacade,
                                        },
                                    ],
                                    guards: [OrderConfirmationGuard],
                                },
                                OrderConfirmationShippingComponent: {
                                    component: OrderConfirmationShippingComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                OrderConfirmationBillingComponent: {
                                    component: OrderDetailBillingComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: OrderFacade,
                                        },
                                    ],
                                    guards: [OrderConfirmationGuard],
                                },
                            },
                        }),
                        {
                            provide: OrderConfirmationOrderEntriesContextToken,
                            useExisting: OrderConfirmationOrderEntriesContext,
                        },
                        provideOutlet({
                            id: OrderOutlets.CONSIGNMENT_DELIVERY_INFO,
                            component: OrderConfirmationShippingComponent,
                        }),
                    ],
                    declarations: [...orderConfirmationComponents],
                    exports: [...orderConfirmationComponents],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItY29uZmlybWF0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb21wb25lbnRzL29yZGVyLWNvbmZpcm1hdGlvbi9vcmRlci1jb25maXJtYXRpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBRUwsb0JBQW9CLEVBQ3BCLFVBQVUsRUFDVixvQkFBb0IsR0FDckIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQ0wseUNBQXlDLEVBQ3pDLFdBQVcsRUFDWCxZQUFZLEdBQ2IsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQ0wsVUFBVSxFQUNWLGdCQUFnQixFQUNoQixZQUFZLEVBQ1osOEJBQThCLEVBQzlCLGdCQUFnQixFQUNoQixTQUFTLEVBQ1QsYUFBYSxHQUNkLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDNUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sc0VBQXNFLENBQUM7QUFDbkgsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDN0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDbEcsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDaEgsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDaEgsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0scUVBQXFFLENBQUM7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QUU7b0NBQ2xDLFNBQVMsRUFBRSxzQkFBc0I7b0NBQ2pDLFNBQVMsRUFBRTt3Q0FDVDs0Q0FDRSxPQUFPLEVBQUUsbUJBQW1COzRDQUM1QixXQUFXLEVBQUUsV0FBVzt5Q0FDekI7cUNBQ0Y7b0NBQ0QsTUFBTSxFQUFFLENBQUMsc0JBQXNCLENBQUM7aUNBQ2pDO2dDQUNELDBDQUEwQyxFQUFFO29DQUMxQyxTQUFTLEVBQUUsc0JBQXNCO29DQUNqQyxTQUFTLEVBQUU7d0NBQ1Q7NENBQ0UsT0FBTyxFQUFFLG1CQUFtQjs0Q0FDNUIsV0FBVyxFQUFFLFdBQVc7eUNBQ3pCO3FDQUNGO29DQUNELE1BQU0sRUFBRSxDQUFDLHNCQUFzQixDQUFDO2lDQUNqQztnQ0FFRCxrQ0FBa0MsRUFBRTtvQ0FDbEMsU0FBUyxFQUFFLGtDQUFrQztvQ0FDN0MsTUFBTSxFQUFFLENBQUMsc0JBQXNCLENBQUM7aUNBQ2pDO2dDQUVELGlDQUFpQyxFQUFFO29DQUNqQyxTQUFTLEVBQUUsMkJBQTJCO29DQUN0QyxTQUFTLEVBQUU7d0NBQ1Q7NENBQ0UsT0FBTyxFQUFFLG1CQUFtQjs0Q0FDNUIsV0FBVyxFQUFFLFdBQVc7eUNBQ3pCO3FDQUNGO29DQUNELE1BQU0sRUFBRSxDQUFDLHNCQUFzQixDQUFDO2lDQUNqQzs2QkFDRjt5QkFDRixDQUFDO3dCQUNGOzRCQUNFLE9BQU8sRUFBRSx5Q0FBeUM7NEJBQ2xELFdBQVcsRUFBRSxvQ0FBb0M7eUJBQ2xEO3dCQUNELGFBQWEsQ0FBQzs0QkFDWixFQUFFLEVBQUUsWUFBWSxDQUFDLHlCQUF5Qjs0QkFDMUMsU0FBUyxFQUFFLGtDQUFrQzt5QkFDOUMsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxHQUFHLDJCQUEyQixDQUFDO29CQUM5QyxPQUFPLEVBQUUsQ0FBQyxHQUFHLDJCQUEyQixDQUFDO2lCQUMxQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIENtc0NvbmZpZyxcbiAgRmVhdHVyZXNDb25maWdNb2R1bGUsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgT3JkZXJDb25maXJtYXRpb25PcmRlckVudHJpZXNDb250ZXh0VG9rZW4sXG4gIE9yZGVyRmFjYWRlLFxuICBPcmRlck91dGxldHMsXG59IGZyb20gJ0BzcGFydGFjdXMvb3JkZXIvcm9vdCc7XG5pbXBvcnQge1xuICBDYXJkTW9kdWxlLFxuICBGb3JtRXJyb3JzTW9kdWxlLFxuICBPdXRsZXRNb2R1bGUsXG4gIFBhc3N3b3JkVmlzaWJpbGl0eVRvZ2dsZU1vZHVsZSxcbiAgUHJvbW90aW9uc01vZHVsZSxcbiAgUHdhTW9kdWxlLFxuICBwcm92aWRlT3V0bGV0LFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT3JkZXJDb25maXJtYXRpb25HdWFyZCB9IGZyb20gJy4uL2d1YXJkcy9vcmRlci1jb25maXJtYXRpb24uZ3VhcmQnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxCaWxsaW5nQ29tcG9uZW50IH0gZnJvbSAnLi4vb3JkZXItZGV0YWlscy9vcmRlci1kZXRhaWwtYmlsbGluZy9vcmRlci1kZXRhaWwtYmlsbGluZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxzU2VydmljZSB9IGZyb20gJy4uL29yZGVyLWRldGFpbHMvb3JkZXItZGV0YWlscy5zZXJ2aWNlJztcbmltcG9ydCB7IE9yZGVyT3ZlcnZpZXdDb21wb25lbnQgfSBmcm9tICcuLi9vcmRlci1kZXRhaWxzL29yZGVyLW92ZXJ2aWV3L29yZGVyLW92ZXJ2aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPcmRlckNvbmZpcm1hdGlvbk9yZGVyRW50cmllc0NvbnRleHQgfSBmcm9tICcuLi9wYWdlLWNvbnRleHQvb3JkZXItY29uZmlybWF0aW9uLW9yZGVyLWVudHJpZXMuY29udGV4dCc7XG5pbXBvcnQgeyBPcmRlckNvbmZpcm1hdGlvbkl0ZW1zQ29tcG9uZW50IH0gZnJvbSAnLi9vcmRlci1jb25maXJtYXRpb24taXRlbXMvb3JkZXItY29uZmlybWF0aW9uLWl0ZW1zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPcmRlckNvbmZpcm1hdGlvblNoaXBwaW5nQ29tcG9uZW50IH0gZnJvbSAnLi9vcmRlci1jb25maXJtYXRpb24tc2hpcHBpbmcvb3JkZXItY29uZmlybWF0aW9uLXNoaXBwaW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPcmRlckNvbmZpcm1hdGlvblRoYW5rWW91TWVzc2FnZUNvbXBvbmVudCB9IGZyb20gJy4vb3JkZXItY29uZmlybWF0aW9uLXRoYW5rLXlvdS1tZXNzYWdlL29yZGVyLWNvbmZpcm1hdGlvbi10aGFuay15b3UtbWVzc2FnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJDb25maXJtYXRpb25Ub3RhbHNDb21wb25lbnQgfSBmcm9tICcuL29yZGVyLWNvbmZpcm1hdGlvbi10b3RhbHMvb3JkZXItY29uZmlybWF0aW9uLXRvdGFscy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJHdWVzdFJlZ2lzdGVyRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vb3JkZXItZ3Vlc3QtcmVnaXN0ZXItZm9ybS9vcmRlci1ndWVzdC1yZWdpc3Rlci1mb3JtLmNvbXBvbmVudCc7XG5cbmNvbnN0IG9yZGVyQ29uZmlybWF0aW9uQ29tcG9uZW50cyA9IFtcbiAgT3JkZXJDb25maXJtYXRpb25JdGVtc0NvbXBvbmVudCxcbiAgT3JkZXJDb25maXJtYXRpb25UaGFua1lvdU1lc3NhZ2VDb21wb25lbnQsXG4gIE9yZGVyQ29uZmlybWF0aW9uVG90YWxzQ29tcG9uZW50LFxuICBPcmRlckd1ZXN0UmVnaXN0ZXJGb3JtQ29tcG9uZW50LFxuICBPcmRlckNvbmZpcm1hdGlvblNoaXBwaW5nQ29tcG9uZW50LFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBDYXJkTW9kdWxlLFxuICAgIFB3YU1vZHVsZSxcbiAgICBQcm9tb3Rpb25zTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBGb3JtRXJyb3JzTW9kdWxlLFxuICAgIE91dGxldE1vZHVsZS5mb3JDaGlsZCgpLFxuICAgIFBhc3N3b3JkVmlzaWJpbGl0eVRvZ2dsZU1vZHVsZSxcbiAgICBGZWF0dXJlc0NvbmZpZ01vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIE9yZGVyQ29uZmlybWF0aW9uVGhhbmtNZXNzYWdlQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlckNvbmZpcm1hdGlvblRoYW5rWW91TWVzc2FnZUNvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtPcmRlckNvbmZpcm1hdGlvbkd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgICAgUmVwbGVuaXNobWVudENvbmZpcm1hdGlvbk1lc3NhZ2VDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyQ29uZmlybWF0aW9uVGhhbmtZb3VNZXNzYWdlQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW09yZGVyQ29uZmlybWF0aW9uR3VhcmRdLFxuICAgICAgICB9LFxuXG4gICAgICAgIE9yZGVyQ29uZmlybWF0aW9uSXRlbXNDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyQ29uZmlybWF0aW9uSXRlbXNDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbT3JkZXJDb25maXJtYXRpb25HdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICAgIFJlcGxlbmlzaG1lbnRDb25maXJtYXRpb25JdGVtc0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogT3JkZXJDb25maXJtYXRpb25JdGVtc0NvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtPcmRlckNvbmZpcm1hdGlvbkd1YXJkXSxcbiAgICAgICAgfSxcblxuICAgICAgICBPcmRlckNvbmZpcm1hdGlvblRvdGFsc0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogT3JkZXJDb25maXJtYXRpb25Ub3RhbHNDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbT3JkZXJDb25maXJtYXRpb25HdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICAgIFJlcGxlbmlzaG1lbnRDb25maXJtYXRpb25Ub3RhbHNDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyQ29uZmlybWF0aW9uVG90YWxzQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW09yZGVyQ29uZmlybWF0aW9uR3VhcmRdLFxuICAgICAgICB9LFxuXG4gICAgICAgIE9yZGVyQ29uZmlybWF0aW9uT3ZlcnZpZXdDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyT3ZlcnZpZXdDb21wb25lbnQsXG4gICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByb3ZpZGU6IE9yZGVyRGV0YWlsc1NlcnZpY2UsXG4gICAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBPcmRlckZhY2FkZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBndWFyZHM6IFtPcmRlckNvbmZpcm1hdGlvbkd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgICAgUmVwbGVuaXNobWVudENvbmZpcm1hdGlvbk92ZXJ2aWV3Q29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlck92ZXJ2aWV3Q29tcG9uZW50LFxuICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcm92aWRlOiBPcmRlckRldGFpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgICB1c2VFeGlzdGluZzogT3JkZXJGYWNhZGUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgZ3VhcmRzOiBbT3JkZXJDb25maXJtYXRpb25HdWFyZF0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgT3JkZXJDb25maXJtYXRpb25TaGlwcGluZ0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogT3JkZXJDb25maXJtYXRpb25TaGlwcGluZ0NvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtPcmRlckNvbmZpcm1hdGlvbkd1YXJkXSxcbiAgICAgICAgfSxcblxuICAgICAgICBPcmRlckNvbmZpcm1hdGlvbkJpbGxpbmdDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyRGV0YWlsQmlsbGluZ0NvbXBvbmVudCxcbiAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJvdmlkZTogT3JkZXJEZXRhaWxzU2VydmljZSxcbiAgICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IE9yZGVyRmFjYWRlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGd1YXJkczogW09yZGVyQ29uZmlybWF0aW9uR3VhcmRdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBPcmRlckNvbmZpcm1hdGlvbk9yZGVyRW50cmllc0NvbnRleHRUb2tlbixcbiAgICAgIHVzZUV4aXN0aW5nOiBPcmRlckNvbmZpcm1hdGlvbk9yZGVyRW50cmllc0NvbnRleHQsXG4gICAgfSxcbiAgICBwcm92aWRlT3V0bGV0KHtcbiAgICAgIGlkOiBPcmRlck91dGxldHMuQ09OU0lHTk1FTlRfREVMSVZFUllfSU5GTyxcbiAgICAgIGNvbXBvbmVudDogT3JkZXJDb25maXJtYXRpb25TaGlwcGluZ0NvbXBvbmVudCxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbLi4ub3JkZXJDb25maXJtYXRpb25Db21wb25lbnRzXSxcbiAgZXhwb3J0czogWy4uLm9yZGVyQ29uZmlybWF0aW9uQ29tcG9uZW50c10sXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyQ29uZmlybWF0aW9uTW9kdWxlIHt9XG4iXX0=