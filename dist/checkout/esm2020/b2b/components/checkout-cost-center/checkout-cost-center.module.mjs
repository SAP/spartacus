/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartValidationGuard } from '@spartacus/cart/base/core';
import { CartNotEmptyGuard, CheckoutAuthGuard, } from '@spartacus/checkout/base/components';
import { ConfigModule, I18nModule } from '@spartacus/core';
import { CheckoutCostCenterComponent } from './checkout-cost-center.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class CheckoutCostCenterModule {
}
CheckoutCostCenterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutCostCenterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterModule, declarations: [CheckoutCostCenterComponent], imports: [CommonModule,
        I18nModule, i1.ConfigModule] });
CheckoutCostCenterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterModule, imports: [CommonModule,
        I18nModule,
        ConfigModule.withConfig({
            cmsComponents: {
                CheckoutCostCenterComponent: {
                    component: CheckoutCostCenterComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                CheckoutCostCenterComponent: {
                                    component: CheckoutCostCenterComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutCostCenterComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtY29zdC1jZW50ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2IyYi9jb21wb25lbnRzL2NoZWNrb3V0LWNvc3QtY2VudGVyL2NoZWNrb3V0LWNvc3QtY2VudGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDaEUsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixpQkFBaUIsR0FDbEIsTUFBTSxxQ0FBcUMsQ0FBQztBQUM3QyxPQUFPLEVBQWEsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOzs7QUFpQi9FLE1BQU0sT0FBTyx3QkFBd0I7O3FIQUF4Qix3QkFBd0I7c0hBQXhCLHdCQUF3QixpQkFGcEIsMkJBQTJCLGFBWHhDLFlBQVk7UUFDWixVQUFVO3NIQVlELHdCQUF3QixZQWJqQyxZQUFZO1FBQ1osVUFBVTtRQUNWLFlBQVksQ0FBQyxVQUFVLENBQVk7WUFDakMsYUFBYSxFQUFFO2dCQUNiLDJCQUEyQixFQUFFO29CQUMzQixTQUFTLEVBQUUsMkJBQTJCO29CQUN0QyxNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsQ0FBQztpQkFDcEU7YUFDRjtTQUNGLENBQUM7MkZBSU8sd0JBQXdCO2tCQWZwQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsWUFBWSxDQUFDLFVBQVUsQ0FBWTs0QkFDakMsYUFBYSxFQUFFO2dDQUNiLDJCQUEyQixFQUFFO29DQUMzQixTQUFTLEVBQUUsMkJBQTJCO29DQUN0QyxNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsQ0FBQztpQ0FDcEU7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztpQkFDNUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhcnRWYWxpZGF0aW9uR3VhcmQgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9jb3JlJztcbmltcG9ydCB7XG4gIENhcnROb3RFbXB0eUd1YXJkLFxuICBDaGVja291dEF1dGhHdWFyZCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jaGVja291dC9iYXNlL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgQ21zQ29uZmlnLCBDb25maWdNb2R1bGUsIEkxOG5Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ2hlY2tvdXRDb3N0Q2VudGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jaGVja291dC1jb3N0LWNlbnRlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgQ29uZmlnTW9kdWxlLndpdGhDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIENoZWNrb3V0Q29zdENlbnRlckNvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogQ2hlY2tvdXRDb3N0Q2VudGVyQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0NoZWNrb3V0QXV0aEd1YXJkLCBDYXJ0Tm90RW1wdHlHdWFyZCwgQ2FydFZhbGlkYXRpb25HdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDaGVja291dENvc3RDZW50ZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dENvc3RDZW50ZXJNb2R1bGUge31cbiJdfQ==