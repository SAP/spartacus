/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { ProgressButtonModule } from '@spartacus/storefront';
import { CartProceedToCheckoutComponent } from './cart-proceed-to-checkout.component';
import * as i0 from "@angular/core";
export class CartProceedToCheckoutModule {
}
CartProceedToCheckoutModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartProceedToCheckoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartProceedToCheckoutModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartProceedToCheckoutModule, declarations: [CartProceedToCheckoutComponent], imports: [CommonModule,
        ProgressButtonModule,
        RouterModule,
        I18nModule,
        UrlModule], exports: [CartProceedToCheckoutComponent] });
CartProceedToCheckoutModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartProceedToCheckoutModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CartProceedToCheckoutComponent: {
                    component: CartProceedToCheckoutComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        ProgressButtonModule,
        RouterModule,
        I18nModule,
        UrlModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartProceedToCheckoutModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ProgressButtonModule,
                        RouterModule,
                        I18nModule,
                        UrlModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CartProceedToCheckoutComponent: {
                                    component: CartProceedToCheckoutComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [CartProceedToCheckoutComponent],
                    exports: [CartProceedToCheckoutComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1wcm9jZWVkLXRvLWNoZWNrb3V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2UvY29tcG9uZW50cy9jYXJ0LXByb2NlZWQtdG8tY2hlY2tvdXQvY2FydC1wcm9jZWVkLXRvLWNoZWNrb3V0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFFTCxVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDOztBQXNCdEYsTUFBTSxPQUFPLDJCQUEyQjs7d0hBQTNCLDJCQUEyQjt5SEFBM0IsMkJBQTJCLGlCQUh2Qiw4QkFBOEIsYUFmM0MsWUFBWTtRQUNaLG9CQUFvQjtRQUNwQixZQUFZO1FBQ1osVUFBVTtRQUNWLFNBQVMsYUFZRCw4QkFBOEI7eUhBRTdCLDJCQUEyQixhQVozQjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYiw4QkFBOEIsRUFBRTtvQkFDOUIsU0FBUyxFQUFFLDhCQUE4QjtpQkFDMUM7YUFDRjtTQUNGLENBQUM7S0FDSCxZQWRDLFlBQVk7UUFDWixvQkFBb0I7UUFDcEIsWUFBWTtRQUNaLFVBQVU7UUFDVixTQUFTOzJGQWNBLDJCQUEyQjtrQkFwQnZDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osb0JBQW9CO3dCQUNwQixZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsU0FBUztxQkFDVjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYiw4QkFBOEIsRUFBRTtvQ0FDOUIsU0FBUyxFQUFFLDhCQUE4QjtpQ0FDMUM7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztvQkFDOUMsT0FBTyxFQUFFLENBQUMsOEJBQThCLENBQUM7aUJBQzFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgQ21zQ29uZmlnLFxuICBJMThuTW9kdWxlLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgVXJsTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUHJvZ3Jlc3NCdXR0b25Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQ2FydFByb2NlZWRUb0NoZWNrb3V0Q29tcG9uZW50IH0gZnJvbSAnLi9jYXJ0LXByb2NlZWQtdG8tY2hlY2tvdXQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBQcm9ncmVzc0J1dHRvbk1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBDYXJ0UHJvY2VlZFRvQ2hlY2tvdXRDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IENhcnRQcm9jZWVkVG9DaGVja291dENvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NhcnRQcm9jZWVkVG9DaGVja291dENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDYXJ0UHJvY2VlZFRvQ2hlY2tvdXRDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDYXJ0UHJvY2VlZFRvQ2hlY2tvdXRNb2R1bGUge31cbiJdfQ==