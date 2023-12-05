/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig, UrlModule } from '@spartacus/core';
import { CarouselModule, MediaModule } from '@spartacus/storefront';
import { AttributesModule } from './directives/attributes/attributes.module';
import { MerchandisingCarouselComponent } from './merchandising-carousel/merchandising-carousel.component';
import * as i0 from "@angular/core";
export class MerchandisingCarouselCmsModule {
}
MerchandisingCarouselCmsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingCarouselCmsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MerchandisingCarouselCmsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingCarouselCmsModule, declarations: [MerchandisingCarouselComponent], imports: [CommonModule,
        AttributesModule,
        CarouselModule,
        MediaModule,
        RouterModule,
        UrlModule], exports: [MerchandisingCarouselComponent] });
MerchandisingCarouselCmsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingCarouselCmsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                MerchandisingCarouselComponent: {
                    component: MerchandisingCarouselComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        AttributesModule,
        CarouselModule,
        MediaModule,
        RouterModule,
        UrlModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingCarouselCmsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        AttributesModule,
                        CarouselModule,
                        MediaModule,
                        RouterModule,
                        UrlModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                MerchandisingCarouselComponent: {
                                    component: MerchandisingCarouselComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [MerchandisingCarouselComponent],
                    exports: [MerchandisingCarouselComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyY2hhbmRpc2luZy1jYXJvdXNlbC1jbXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZHMvc3JjL21lcmNoYW5kaXNpbmcvY21zLWNvbXBvbmVudHMvbWVyY2hhbmRpc2luZy1jYXJvdXNlbC1jbXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFhLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdFLE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sMkRBQTJELENBQUM7O0FBdUIzRyxNQUFNLE9BQU8sOEJBQThCOzsySEFBOUIsOEJBQThCOzRIQUE5Qiw4QkFBOEIsaUJBSDFCLDhCQUE4QixhQWhCM0MsWUFBWTtRQUNaLGdCQUFnQjtRQUNoQixjQUFjO1FBQ2QsV0FBVztRQUNYLFlBQVk7UUFDWixTQUFTLGFBWUQsOEJBQThCOzRIQUU3Qiw4QkFBOEIsYUFaOUI7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2IsOEJBQThCLEVBQUU7b0JBQzlCLFNBQVMsRUFBRSw4QkFBOEI7aUJBQzFDO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFmQyxZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLGNBQWM7UUFDZCxXQUFXO1FBQ1gsWUFBWTtRQUNaLFNBQVM7MkZBY0EsOEJBQThCO2tCQXJCMUMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixnQkFBZ0I7d0JBQ2hCLGNBQWM7d0JBQ2QsV0FBVzt3QkFDWCxZQUFZO3dCQUNaLFNBQVM7cUJBQ1Y7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IsOEJBQThCLEVBQUU7b0NBQzlCLFNBQVMsRUFBRSw4QkFBOEI7aUNBQzFDOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsOEJBQThCLENBQUM7b0JBQzlDLE9BQU8sRUFBRSxDQUFDLDhCQUE4QixDQUFDO2lCQUMxQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IENtc0NvbmZpZywgcHJvdmlkZURlZmF1bHRDb25maWcsIFVybE1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDYXJvdXNlbE1vZHVsZSwgTWVkaWFNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQXR0cmlidXRlc01vZHVsZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9hdHRyaWJ1dGVzL2F0dHJpYnV0ZXMubW9kdWxlJztcbmltcG9ydCB7IE1lcmNoYW5kaXNpbmdDYXJvdXNlbENvbXBvbmVudCB9IGZyb20gJy4vbWVyY2hhbmRpc2luZy1jYXJvdXNlbC9tZXJjaGFuZGlzaW5nLWNhcm91c2VsLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQXR0cmlidXRlc01vZHVsZSxcbiAgICBDYXJvdXNlbE1vZHVsZSxcbiAgICBNZWRpYU1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgVXJsTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgTWVyY2hhbmRpc2luZ0Nhcm91c2VsQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBNZXJjaGFuZGlzaW5nQ2Fyb3VzZWxDb21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtNZXJjaGFuZGlzaW5nQ2Fyb3VzZWxDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTWVyY2hhbmRpc2luZ0Nhcm91c2VsQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTWVyY2hhbmRpc2luZ0Nhcm91c2VsQ21zTW9kdWxlIHt9XG4iXX0=