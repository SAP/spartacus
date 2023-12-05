/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard, I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { CardModule } from '../../../shared/components/card/card.module';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { MyCouponsComponent } from './my-coupons.component';
import { CouponCardComponent } from './coupon-card/coupon-card.component';
import { ListNavigationModule } from '../../../shared/components/list-navigation/list-navigation.module';
import { CouponDialogComponent } from './coupon-card/coupon-dialog/coupon-dialog.component';
import { CouponClaimComponent } from './coupon-claim/coupon-claim.component';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../cms-structure/page/page-layout/page-layout.component';
import { IconModule } from '../../misc/icon/icon.module';
import { defaultCouponLayoutConfig } from './default-coupon-card-layout.config';
import { KeyboardFocusModule } from '../../../layout/index';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class MyCouponsModule {
}
MyCouponsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyCouponsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MyCouponsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MyCouponsModule, declarations: [MyCouponsComponent,
        CouponCardComponent,
        CouponDialogComponent,
        CouponClaimComponent], imports: [CommonModule,
        CardModule,
        SpinnerModule,
        I18nModule,
        RouterModule,
        UrlModule,
        IconModule,
        ListNavigationModule, i1.RouterModule, KeyboardFocusModule], exports: [MyCouponsComponent, CouponClaimComponent] });
MyCouponsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyCouponsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                MyCouponsComponent: {
                    component: MyCouponsComponent,
                    guards: [AuthGuard],
                },
                CouponClaimComponent: {
                    component: CouponClaimComponent,
                    guards: [AuthGuard],
                },
            },
        }),
        provideDefaultConfig(defaultCouponLayoutConfig),
    ], imports: [CommonModule,
        CardModule,
        SpinnerModule,
        I18nModule,
        RouterModule,
        UrlModule,
        IconModule,
        ListNavigationModule,
        RouterModule.forChild([
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'couponClaim' },
            },
        ]),
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyCouponsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CardModule,
                        SpinnerModule,
                        I18nModule,
                        RouterModule,
                        UrlModule,
                        IconModule,
                        ListNavigationModule,
                        RouterModule.forChild([
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'couponClaim' },
                            },
                        ]),
                        KeyboardFocusModule,
                    ],
                    declarations: [
                        MyCouponsComponent,
                        CouponCardComponent,
                        CouponDialogComponent,
                        CouponClaimComponent,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                MyCouponsComponent: {
                                    component: MyCouponsComponent,
                                    guards: [AuthGuard],
                                },
                                CouponClaimComponent: {
                                    component: CouponClaimComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                        provideDefaultConfig(defaultCouponLayoutConfig),
                    ],
                    exports: [MyCouponsComponent, CouponClaimComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktY291cG9ucy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL215YWNjb3VudC9teS1jb3Vwb25zL215LWNvdXBvbnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLFNBQVMsRUFFVCxVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDbEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUVBQW1FLENBQUM7QUFDekcsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDNUYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7O0FBOEM1RCxNQUFNLE9BQU8sZUFBZTs7NEdBQWYsZUFBZTs2R0FBZixlQUFlLGlCQXRCeEIsa0JBQWtCO1FBQ2xCLG1CQUFtQjtRQUNuQixxQkFBcUI7UUFDckIsb0JBQW9CLGFBdkJwQixZQUFZO1FBQ1osVUFBVTtRQUNWLGFBQWE7UUFDYixVQUFVO1FBQ1YsWUFBWTtRQUNaLFNBQVM7UUFDVCxVQUFVO1FBQ1Ysb0JBQW9CLG1CQVVwQixtQkFBbUIsYUF1Qlgsa0JBQWtCLEVBQUUsb0JBQW9COzZHQUV2QyxlQUFlLGFBakJmO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLGtCQUFrQixFQUFFO29CQUNsQixTQUFTLEVBQUUsa0JBQWtCO29CQUM3QixNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUJBQ3BCO2dCQUNELG9CQUFvQixFQUFFO29CQUNwQixTQUFTLEVBQUUsb0JBQW9CO29CQUMvQixNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUJBQ3BCO2FBQ0Y7U0FDRixDQUFDO1FBQ0Ysb0JBQW9CLENBQUMseUJBQXlCLENBQUM7S0FDaEQsWUF2Q0MsWUFBWTtRQUNaLFVBQVU7UUFDVixhQUFhO1FBQ2IsVUFBVTtRQUNWLFlBQVk7UUFDWixTQUFTO1FBQ1QsVUFBVTtRQUNWLG9CQUFvQjtRQUNwQixZQUFZLENBQUMsUUFBUSxDQUFDO1lBQ3BCO2dCQUNFLGFBQWE7Z0JBQ2IsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQztnQkFDdEMsU0FBUyxFQUFFLG1CQUFtQjtnQkFDOUIsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRTthQUNqQztTQUNGLENBQUM7UUFDRixtQkFBbUI7MkZBeUJWLGVBQWU7a0JBNUMzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsYUFBYTt3QkFDYixVQUFVO3dCQUNWLFlBQVk7d0JBQ1osU0FBUzt3QkFDVCxVQUFVO3dCQUNWLG9CQUFvQjt3QkFDcEIsWUFBWSxDQUFDLFFBQVEsQ0FBQzs0QkFDcEI7Z0NBQ0UsYUFBYTtnQ0FDYixJQUFJLEVBQUUsSUFBSTtnQ0FDVixXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO2dDQUN0QyxTQUFTLEVBQUUsbUJBQW1CO2dDQUM5QixJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFOzZCQUNqQzt5QkFDRixDQUFDO3dCQUNGLG1CQUFtQjtxQkFDcEI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLGtCQUFrQjt3QkFDbEIsbUJBQW1CO3dCQUNuQixxQkFBcUI7d0JBQ3JCLG9CQUFvQjtxQkFDckI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2Isa0JBQWtCLEVBQUU7b0NBQ2xCLFNBQVMsRUFBRSxrQkFBa0I7b0NBQzdCLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztpQ0FDcEI7Z0NBQ0Qsb0JBQW9CLEVBQUU7b0NBQ3BCLFNBQVMsRUFBRSxvQkFBb0I7b0NBQy9CLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztpQ0FDcEI7NkJBQ0Y7eUJBQ0YsQ0FBQzt3QkFDRixvQkFBb0IsQ0FBQyx5QkFBeUIsQ0FBQztxQkFDaEQ7b0JBQ0QsT0FBTyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsb0JBQW9CLENBQUM7aUJBQ3BEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgQXV0aEd1YXJkLFxuICBDbXNDb25maWcsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBVcmxNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDYXJkTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvY2FyZC9jYXJkLm1vZHVsZSc7XG5pbXBvcnQgeyBTcGlubmVyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyLm1vZHVsZSc7XG5pbXBvcnQgeyBNeUNvdXBvbnNDb21wb25lbnQgfSBmcm9tICcuL215LWNvdXBvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IENvdXBvbkNhcmRDb21wb25lbnQgfSBmcm9tICcuL2NvdXBvbi1jYXJkL2NvdXBvbi1jYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaXN0TmF2aWdhdGlvbk1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2xpc3QtbmF2aWdhdGlvbi9saXN0LW5hdmlnYXRpb24ubW9kdWxlJztcbmltcG9ydCB7IENvdXBvbkRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY291cG9uLWNhcmQvY291cG9uLWRpYWxvZy9jb3Vwb24tZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb3Vwb25DbGFpbUNvbXBvbmVudCB9IGZyb20gJy4vY291cG9uLWNsYWltL2NvdXBvbi1jbGFpbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ21zUGFnZUd1YXJkIH0gZnJvbSAnLi4vLi4vLi4vY21zLXN0cnVjdHVyZS9ndWFyZHMvY21zLXBhZ2UuZ3VhcmQnO1xuaW1wb3J0IHsgUGFnZUxheW91dENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2Ntcy1zdHJ1Y3R1cmUvcGFnZS9wYWdlLWxheW91dC9wYWdlLWxheW91dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSWNvbk1vZHVsZSB9IGZyb20gJy4uLy4uL21pc2MvaWNvbi9pY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBkZWZhdWx0Q291cG9uTGF5b3V0Q29uZmlnIH0gZnJvbSAnLi9kZWZhdWx0LWNvdXBvbi1jYXJkLWxheW91dC5jb25maWcnO1xuaW1wb3J0IHsgS2V5Ym9hcmRGb2N1c01vZHVsZSB9IGZyb20gJy4uLy4uLy4uL2xheW91dC9pbmRleCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQ2FyZE1vZHVsZSxcbiAgICBTcGlubmVyTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBJY29uTW9kdWxlLFxuICAgIExpc3ROYXZpZ2F0aW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChbXG4gICAgICB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIENtc1BhZ2VHdWFyZF0sXG4gICAgICAgIGNvbXBvbmVudDogUGFnZUxheW91dENvbXBvbmVudCxcbiAgICAgICAgZGF0YTogeyBjeFJvdXRlOiAnY291cG9uQ2xhaW0nIH0sXG4gICAgICB9LFxuICAgIF0pLFxuICAgIEtleWJvYXJkRm9jdXNNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE15Q291cG9uc0NvbXBvbmVudCxcbiAgICBDb3Vwb25DYXJkQ29tcG9uZW50LFxuICAgIENvdXBvbkRpYWxvZ0NvbXBvbmVudCxcbiAgICBDb3Vwb25DbGFpbUNvbXBvbmVudCxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIE15Q291cG9uc0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogTXlDb3Vwb25zQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICAgIENvdXBvbkNsYWltQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBDb3Vwb25DbGFpbUNvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtBdXRoR3VhcmRdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0Q291cG9uTGF5b3V0Q29uZmlnKSxcbiAgXSxcbiAgZXhwb3J0czogW015Q291cG9uc0NvbXBvbmVudCwgQ291cG9uQ2xhaW1Db21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBNeUNvdXBvbnNNb2R1bGUge31cbiJdfQ==