/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FeaturesConfigModule, I18nModule, provideDefaultConfig, } from '@spartacus/core';
import { OutletModule, PageComponentModule, SpinnerModule, } from '@spartacus/storefront';
import { CartNotEmptyGuard } from '../guards/cart-not-empty.guard';
import { CheckoutAuthGuard } from '../guards/checkout-auth.guard';
import { CheckoutDeliveryModeComponent } from './checkout-delivery-mode.component';
import * as i0 from "@angular/core";
export class CheckoutDeliveryModeModule {
}
CheckoutDeliveryModeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutDeliveryModeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModeModule, declarations: [CheckoutDeliveryModeComponent], imports: [CommonModule,
        ReactiveFormsModule,
        I18nModule,
        SpinnerModule,
        OutletModule,
        PageComponentModule,
        FeaturesConfigModule], exports: [CheckoutDeliveryModeComponent] });
CheckoutDeliveryModeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModeModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutDeliveryMode: {
                    component: CheckoutDeliveryModeComponent,
                    data: {
                        composition: {
                            inner: ['PickupInStoreDeliveryModeComponent'],
                        },
                    },
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        ReactiveFormsModule,
        I18nModule,
        SpinnerModule,
        OutletModule,
        PageComponentModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        I18nModule,
                        SpinnerModule,
                        OutletModule,
                        PageComponentModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutDeliveryMode: {
                                    component: CheckoutDeliveryModeComponent,
                                    data: {
                                        composition: {
                                            inner: ['PickupInStoreDeliveryModeComponent'],
                                        },
                                    },
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutDeliveryModeComponent],
                    exports: [CheckoutDeliveryModeComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtZGVsaXZlcnktbW9kZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9jb21wb25lbnRzL2NoZWNrb3V0LWRlbGl2ZXJ5LW1vZGUvY2hlY2tvdXQtZGVsaXZlcnktbW9kZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFFTCxvQkFBb0IsRUFDcEIsVUFBVSxFQUNWLG9CQUFvQixHQUNyQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCxZQUFZLEVBQ1osbUJBQW1CLEVBQ25CLGFBQWEsR0FDZCxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOztBQThCbkYsTUFBTSxPQUFPLDBCQUEwQjs7dUhBQTFCLDBCQUEwQjt3SEFBMUIsMEJBQTBCLGlCQUh0Qiw2QkFBNkIsYUF2QjFDLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsVUFBVTtRQUNWLGFBQWE7UUFDYixZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLG9CQUFvQixhQWtCWiw2QkFBNkI7d0hBRTVCLDBCQUEwQixhQWxCMUI7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2Isb0JBQW9CLEVBQUU7b0JBQ3BCLFNBQVMsRUFBRSw2QkFBNkI7b0JBQ3hDLElBQUksRUFBRTt3QkFDSixXQUFXLEVBQUU7NEJBQ1gsS0FBSyxFQUFFLENBQUMsb0NBQW9DLENBQUM7eUJBQzlDO3FCQUNGO29CQUNELE1BQU0sRUFBRSxDQUFDLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDO2lCQUMvQzthQUNGO1NBQ0YsQ0FBQztLQUNILFlBdEJDLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsVUFBVTtRQUNWLGFBQWE7UUFDYixZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLG9CQUFvQjsyRkFvQlgsMEJBQTBCO2tCQTVCdEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixtQkFBbUI7d0JBQ25CLFVBQVU7d0JBQ1YsYUFBYTt3QkFDYixZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsb0JBQW9CO3FCQUNyQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYixvQkFBb0IsRUFBRTtvQ0FDcEIsU0FBUyxFQUFFLDZCQUE2QjtvQ0FDeEMsSUFBSSxFQUFFO3dDQUNKLFdBQVcsRUFBRTs0Q0FDWCxLQUFLLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQzt5Q0FDOUM7cUNBQ0Y7b0NBQ0QsTUFBTSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUM7aUNBQy9DOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsNkJBQTZCLENBQUM7b0JBQzdDLE9BQU8sRUFBRSxDQUFDLDZCQUE2QixDQUFDO2lCQUN6QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIENtc0NvbmZpZyxcbiAgRmVhdHVyZXNDb25maWdNb2R1bGUsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgT3V0bGV0TW9kdWxlLFxuICBQYWdlQ29tcG9uZW50TW9kdWxlLFxuICBTcGlubmVyTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQ2FydE5vdEVtcHR5R3VhcmQgfSBmcm9tICcuLi9ndWFyZHMvY2FydC1ub3QtZW1wdHkuZ3VhcmQnO1xuaW1wb3J0IHsgQ2hlY2tvdXRBdXRoR3VhcmQgfSBmcm9tICcuLi9ndWFyZHMvY2hlY2tvdXQtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBDaGVja291dERlbGl2ZXJ5TW9kZUNvbXBvbmVudCB9IGZyb20gJy4vY2hlY2tvdXQtZGVsaXZlcnktbW9kZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBTcGlubmVyTW9kdWxlLFxuICAgIE91dGxldE1vZHVsZSxcbiAgICBQYWdlQ29tcG9uZW50TW9kdWxlLFxuICAgIEZlYXR1cmVzQ29uZmlnTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgQ2hlY2tvdXREZWxpdmVyeU1vZGU6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IENoZWNrb3V0RGVsaXZlcnlNb2RlQ29tcG9uZW50LFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGNvbXBvc2l0aW9uOiB7XG4gICAgICAgICAgICAgIGlubmVyOiBbJ1BpY2t1cEluU3RvcmVEZWxpdmVyeU1vZGVDb21wb25lbnQnXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBndWFyZHM6IFtDaGVja291dEF1dGhHdWFyZCwgQ2FydE5vdEVtcHR5R3VhcmRdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ2hlY2tvdXREZWxpdmVyeU1vZGVDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ2hlY2tvdXREZWxpdmVyeU1vZGVDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dERlbGl2ZXJ5TW9kZU1vZHVsZSB7fVxuIl19