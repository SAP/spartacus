/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeaturesConfigModule, I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
import { ReturnRequestItemsComponent } from './return-request-items/return-request-items.component';
import { ReturnRequestOverviewComponent } from './return-request-overview/return-request-overview.component';
import { ReturnRequestTotalsComponent } from './return-request-totals/return-request-totals.component';
import * as i0 from "@angular/core";
const components = [
    ReturnRequestOverviewComponent,
    ReturnRequestItemsComponent,
    ReturnRequestTotalsComponent,
];
export class ReturnRequestDetailModule {
}
ReturnRequestDetailModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestDetailModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReturnRequestDetailModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestDetailModule, declarations: [ReturnRequestOverviewComponent,
        ReturnRequestItemsComponent,
        ReturnRequestTotalsComponent], imports: [CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        MediaModule,
        FeaturesConfigModule], exports: [ReturnRequestOverviewComponent,
        ReturnRequestItemsComponent,
        ReturnRequestTotalsComponent] });
ReturnRequestDetailModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestDetailModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ReturnRequestOverviewComponent: {
                    component: ReturnRequestOverviewComponent,
                },
                ReturnRequestItemsComponent: {
                    component: ReturnRequestItemsComponent,
                },
                ReturnRequestTotalsComponent: {
                    component: ReturnRequestTotalsComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        MediaModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestDetailModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        MediaModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ReturnRequestOverviewComponent: {
                                    component: ReturnRequestOverviewComponent,
                                },
                                ReturnRequestItemsComponent: {
                                    component: ReturnRequestItemsComponent,
                                },
                                ReturnRequestTotalsComponent: {
                                    component: ReturnRequestTotalsComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [...components],
                    exports: [...components],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0dXJuLXJlcXVlc3QtZGV0YWlsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb21wb25lbnRzL3JldHVybi1yZXF1ZXN0LWRldGFpbC9yZXR1cm4tcmVxdWVzdC1kZXRhaWwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUVMLG9CQUFvQixFQUNwQixVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUNwRyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw2REFBNkQsQ0FBQztBQUM3RyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQzs7QUFFdkcsTUFBTSxVQUFVLEdBQUc7SUFDakIsOEJBQThCO0lBQzlCLDJCQUEyQjtJQUMzQiw0QkFBNEI7Q0FDN0IsQ0FBQztBQTZCRixNQUFNLE9BQU8seUJBQXlCOztzSEFBekIseUJBQXlCO3VIQUF6Qix5QkFBeUIsaUJBaENwQyw4QkFBOEI7UUFDOUIsMkJBQTJCO1FBQzNCLDRCQUE0QixhQUsxQixZQUFZO1FBQ1osWUFBWTtRQUNaLFNBQVM7UUFDVCxVQUFVO1FBQ1YsV0FBVztRQUNYLG9CQUFvQixhQVp0Qiw4QkFBOEI7UUFDOUIsMkJBQTJCO1FBQzNCLDRCQUE0Qjt1SEE4QmpCLHlCQUF5QixhQWxCekI7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2IsOEJBQThCLEVBQUU7b0JBQzlCLFNBQVMsRUFBRSw4QkFBOEI7aUJBQzFDO2dCQUNELDJCQUEyQixFQUFFO29CQUMzQixTQUFTLEVBQUUsMkJBQTJCO2lCQUN2QztnQkFDRCw0QkFBNEIsRUFBRTtvQkFDNUIsU0FBUyxFQUFFLDRCQUE0QjtpQkFDeEM7YUFDRjtTQUNGLENBQUM7S0FDSCxZQXJCQyxZQUFZO1FBQ1osWUFBWTtRQUNaLFNBQVM7UUFDVCxVQUFVO1FBQ1YsV0FBVztRQUNYLG9CQUFvQjsyRkFvQlgseUJBQXlCO2tCQTNCckMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixZQUFZO3dCQUNaLFNBQVM7d0JBQ1QsVUFBVTt3QkFDVixXQUFXO3dCQUNYLG9CQUFvQjtxQkFDckI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IsOEJBQThCLEVBQUU7b0NBQzlCLFNBQVMsRUFBRSw4QkFBOEI7aUNBQzFDO2dDQUNELDJCQUEyQixFQUFFO29DQUMzQixTQUFTLEVBQUUsMkJBQTJCO2lDQUN2QztnQ0FDRCw0QkFBNEIsRUFBRTtvQ0FDNUIsU0FBUyxFQUFFLDRCQUE0QjtpQ0FDeEM7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztvQkFDN0IsT0FBTyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUM7aUJBQ3pCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgQ21zQ29uZmlnLFxuICBGZWF0dXJlc0NvbmZpZ01vZHVsZSxcbiAgSTE4bk1vZHVsZSxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIFVybE1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE1lZGlhTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFJldHVyblJlcXVlc3RJdGVtc0NvbXBvbmVudCB9IGZyb20gJy4vcmV0dXJuLXJlcXVlc3QtaXRlbXMvcmV0dXJuLXJlcXVlc3QtaXRlbXMuY29tcG9uZW50JztcbmltcG9ydCB7IFJldHVyblJlcXVlc3RPdmVydmlld0NvbXBvbmVudCB9IGZyb20gJy4vcmV0dXJuLXJlcXVlc3Qtb3ZlcnZpZXcvcmV0dXJuLXJlcXVlc3Qtb3ZlcnZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IFJldHVyblJlcXVlc3RUb3RhbHNDb21wb25lbnQgfSBmcm9tICcuL3JldHVybi1yZXF1ZXN0LXRvdGFscy9yZXR1cm4tcmVxdWVzdC10b3RhbHMuY29tcG9uZW50JztcblxuY29uc3QgY29tcG9uZW50cyA9IFtcbiAgUmV0dXJuUmVxdWVzdE92ZXJ2aWV3Q29tcG9uZW50LFxuICBSZXR1cm5SZXF1ZXN0SXRlbXNDb21wb25lbnQsXG4gIFJldHVyblJlcXVlc3RUb3RhbHNDb21wb25lbnQsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBNZWRpYU1vZHVsZSxcbiAgICBGZWF0dXJlc0NvbmZpZ01vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIFJldHVyblJlcXVlc3RPdmVydmlld0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogUmV0dXJuUmVxdWVzdE92ZXJ2aWV3Q29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgICBSZXR1cm5SZXF1ZXN0SXRlbXNDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IFJldHVyblJlcXVlc3RJdGVtc0NvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgICAgUmV0dXJuUmVxdWVzdFRvdGFsc0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogUmV0dXJuUmVxdWVzdFRvdGFsc0NvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogWy4uLmNvbXBvbmVudHNdLFxuICBleHBvcnRzOiBbLi4uY29tcG9uZW50c10sXG59KVxuZXhwb3J0IGNsYXNzIFJldHVyblJlcXVlc3REZXRhaWxNb2R1bGUge31cbiJdfQ==