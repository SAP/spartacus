/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { VisualViewerAnimationSliderModule } from './toolbar/visual-viewer-animation-slider/visual-viewer-animation-slider.module';
import { VisualViewerToolbarButtonModule } from './toolbar/visual-viewer-toolbar-button/visual-viewer-toolbar-button.module';
import { VisualViewerComponent } from './visual-viewer.component';
import * as i0 from "@angular/core";
export class VisualViewerModule {
}
VisualViewerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VisualViewerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerModule, declarations: [VisualViewerComponent], imports: [CommonModule,
        RouterModule,
        I18nModule,
        VisualViewerToolbarButtonModule,
        VisualViewerAnimationSliderModule,
        SpinnerModule], exports: [VisualViewerComponent] });
VisualViewerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerModule, imports: [CommonModule,
        RouterModule,
        I18nModule,
        VisualViewerToolbarButtonModule,
        VisualViewerAnimationSliderModule,
        SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        I18nModule,
                        VisualViewerToolbarButtonModule,
                        VisualViewerAnimationSliderModule,
                        SpinnerModule,
                    ],
                    declarations: [VisualViewerComponent],
                    exports: [VisualViewerComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsLXZpZXdlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2VwZC12aXN1YWxpemF0aW9uL2NvbXBvbmVudHMvdmlzdWFsLXZpZXdlci92aXN1YWwtdmlld2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sZ0ZBQWdGLENBQUM7QUFDbkksT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sNEVBQTRFLENBQUM7QUFDN0gsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBY2xFLE1BQU0sT0FBTyxrQkFBa0I7OytHQUFsQixrQkFBa0I7Z0hBQWxCLGtCQUFrQixpQkFIZCxxQkFBcUIsYUFQbEMsWUFBWTtRQUNaLFlBQVk7UUFDWixVQUFVO1FBQ1YsK0JBQStCO1FBQy9CLGlDQUFpQztRQUNqQyxhQUFhLGFBR0wscUJBQXFCO2dIQUVwQixrQkFBa0IsWUFWM0IsWUFBWTtRQUNaLFlBQVk7UUFDWixVQUFVO1FBQ1YsK0JBQStCO1FBQy9CLGlDQUFpQztRQUNqQyxhQUFhOzJGQUtKLGtCQUFrQjtrQkFaOUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsK0JBQStCO3dCQUMvQixpQ0FBaUM7d0JBQ2pDLGFBQWE7cUJBQ2Q7b0JBQ0QsWUFBWSxFQUFFLENBQUMscUJBQXFCLENBQUM7b0JBQ3JDLE9BQU8sRUFBRSxDQUFDLHFCQUFxQixDQUFDO2lCQUNqQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgU3Bpbm5lck1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBWaXN1YWxWaWV3ZXJBbmltYXRpb25TbGlkZXJNb2R1bGUgfSBmcm9tICcuL3Rvb2xiYXIvdmlzdWFsLXZpZXdlci1hbmltYXRpb24tc2xpZGVyL3Zpc3VhbC12aWV3ZXItYW5pbWF0aW9uLXNsaWRlci5tb2R1bGUnO1xuaW1wb3J0IHsgVmlzdWFsVmlld2VyVG9vbGJhckJ1dHRvbk1vZHVsZSB9IGZyb20gJy4vdG9vbGJhci92aXN1YWwtdmlld2VyLXRvb2xiYXItYnV0dG9uL3Zpc3VhbC12aWV3ZXItdG9vbGJhci1idXR0b24ubW9kdWxlJztcbmltcG9ydCB7IFZpc3VhbFZpZXdlckNvbXBvbmVudCB9IGZyb20gJy4vdmlzdWFsLXZpZXdlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIFZpc3VhbFZpZXdlclRvb2xiYXJCdXR0b25Nb2R1bGUsXG4gICAgVmlzdWFsVmlld2VyQW5pbWF0aW9uU2xpZGVyTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1Zpc3VhbFZpZXdlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtWaXN1YWxWaWV3ZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBWaXN1YWxWaWV3ZXJNb2R1bGUge31cbiJdfQ==