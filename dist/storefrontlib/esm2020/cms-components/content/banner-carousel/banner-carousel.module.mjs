/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { PageComponentModule } from '../../../cms-structure/page/component/page-component.module';
import { CarouselModule, MediaModule } from '../../../shared/components/index';
import { BannerCarouselComponent } from './banner-carousel.component';
import * as i0 from "@angular/core";
export class BannerCarouselModule {
}
BannerCarouselModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BannerCarouselModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BannerCarouselModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: BannerCarouselModule, declarations: [BannerCarouselComponent], imports: [CommonModule, PageComponentModule, CarouselModule, MediaModule], exports: [BannerCarouselComponent] });
BannerCarouselModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BannerCarouselModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                RotatingImagesComponent: {
                    component: BannerCarouselComponent,
                },
            },
        }),
    ], imports: [CommonModule, PageComponentModule, CarouselModule, MediaModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BannerCarouselModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PageComponentModule, CarouselModule, MediaModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                RotatingImagesComponent: {
                                    component: BannerCarouselComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [BannerCarouselComponent],
                    exports: [BannerCarouselComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFubmVyLWNhcm91c2VsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvY29udGVudC9iYW5uZXItY2Fyb3VzZWwvYmFubmVyLWNhcm91c2VsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFhLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDbEcsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7QUFnQnRFLE1BQU0sT0FBTyxvQkFBb0I7O2lIQUFwQixvQkFBb0I7a0hBQXBCLG9CQUFvQixpQkFIaEIsdUJBQXVCLGFBVjVCLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxjQUFjLEVBQUUsV0FBVyxhQVc5RCx1QkFBdUI7a0hBRXRCLG9CQUFvQixhQVpwQjtRQUNULG9CQUFvQixDQUFDO1lBQ25CLGFBQWEsRUFBRTtnQkFDYix1QkFBdUIsRUFBRTtvQkFDdkIsU0FBUyxFQUFFLHVCQUF1QjtpQkFDbkM7YUFDRjtTQUNXLENBQUM7S0FDaEIsWUFUUyxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsY0FBYyxFQUFFLFdBQVc7MkZBYTdELG9CQUFvQjtrQkFkaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsY0FBYyxFQUFFLFdBQVcsQ0FBQztvQkFDekUsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDOzRCQUNuQixhQUFhLEVBQUU7Z0NBQ2IsdUJBQXVCLEVBQUU7b0NBQ3ZCLFNBQVMsRUFBRSx1QkFBdUI7aUNBQ25DOzZCQUNGO3lCQUNXLENBQUM7cUJBQ2hCO29CQUNELFlBQVksRUFBRSxDQUFDLHVCQUF1QixDQUFDO29CQUN2QyxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztpQkFDbkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENtc0NvbmZpZywgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUGFnZUNvbXBvbmVudE1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL2Ntcy1zdHJ1Y3R1cmUvcGFnZS9jb21wb25lbnQvcGFnZS1jb21wb25lbnQubW9kdWxlJztcbmltcG9ydCB7IENhcm91c2VsTW9kdWxlLCBNZWRpYU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2luZGV4JztcbmltcG9ydCB7IEJhbm5lckNhcm91c2VsQ29tcG9uZW50IH0gZnJvbSAnLi9iYW5uZXItY2Fyb3VzZWwuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUGFnZUNvbXBvbmVudE1vZHVsZSwgQ2Fyb3VzZWxNb2R1bGUsIE1lZGlhTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoe1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBSb3RhdGluZ0ltYWdlc0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogQmFubmVyQ2Fyb3VzZWxDb21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0gYXMgQ21zQ29uZmlnKSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQmFubmVyQ2Fyb3VzZWxDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQmFubmVyQ2Fyb3VzZWxDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBCYW5uZXJDYXJvdXNlbE1vZHVsZSB7fVxuIl19