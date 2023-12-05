/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import { SupplementHashAnchorsModule } from '../../../shared/pipes/suplement-hash-anchors/supplement-hash-anchors.module';
import { ParagraphComponent } from './paragraph.component';
import * as i0 from "@angular/core";
export class CmsParagraphModule {
}
CmsParagraphModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsParagraphModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CmsParagraphModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CmsParagraphModule, declarations: [ParagraphComponent], imports: [CommonModule, RouterModule, SupplementHashAnchorsModule], exports: [ParagraphComponent] });
CmsParagraphModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsParagraphModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CMSParagraphComponent: {
                    component: ParagraphComponent,
                },
                CMSTabParagraphComponent: {
                    component: ParagraphComponent,
                },
            },
        }),
    ], imports: [CommonModule, RouterModule, SupplementHashAnchorsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsParagraphModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, SupplementHashAnchorsModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CMSParagraphComponent: {
                                    component: ParagraphComponent,
                                },
                                CMSTabParagraphComponent: {
                                    component: ParagraphComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ParagraphComponent],
                    exports: [ParagraphComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYWdyYXBoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvY29udGVudC9wYXJhZ3JhcGgvcGFyYWdyYXBoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBYSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDZFQUE2RSxDQUFDO0FBQzFILE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQW1CM0QsTUFBTSxPQUFPLGtCQUFrQjs7K0dBQWxCLGtCQUFrQjtnSEFBbEIsa0JBQWtCLGlCQUhkLGtCQUFrQixhQWJ2QixZQUFZLEVBQUUsWUFBWSxFQUFFLDJCQUEyQixhQWN2RCxrQkFBa0I7Z0hBRWpCLGtCQUFrQixhQWZsQjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYixxQkFBcUIsRUFBRTtvQkFDckIsU0FBUyxFQUFFLGtCQUFrQjtpQkFDOUI7Z0JBQ0Qsd0JBQXdCLEVBQUU7b0JBQ3hCLFNBQVMsRUFBRSxrQkFBa0I7aUJBQzlCO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFaUyxZQUFZLEVBQUUsWUFBWSxFQUFFLDJCQUEyQjsyRkFnQnRELGtCQUFrQjtrQkFqQjlCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSwyQkFBMkIsQ0FBQztvQkFDbEUsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IscUJBQXFCLEVBQUU7b0NBQ3JCLFNBQVMsRUFBRSxrQkFBa0I7aUNBQzlCO2dDQUNELHdCQUF3QixFQUFFO29DQUN4QixTQUFTLEVBQUUsa0JBQWtCO2lDQUM5Qjs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRSxDQUFDLGtCQUFrQixDQUFDO29CQUNsQyxPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztpQkFDOUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDbXNDb25maWcsIHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFN1cHBsZW1lbnRIYXNoQW5jaG9yc01vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9waXBlcy9zdXBsZW1lbnQtaGFzaC1hbmNob3JzL3N1cHBsZW1lbnQtaGFzaC1hbmNob3JzLm1vZHVsZSc7XG5pbXBvcnQgeyBQYXJhZ3JhcGhDb21wb25lbnQgfSBmcm9tICcuL3BhcmFncmFwaC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBSb3V0ZXJNb2R1bGUsIFN1cHBsZW1lbnRIYXNoQW5jaG9yc01vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBDTVNQYXJhZ3JhcGhDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IFBhcmFncmFwaENvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgICAgQ01TVGFiUGFyYWdyYXBoQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBQYXJhZ3JhcGhDb21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQYXJhZ3JhcGhDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUGFyYWdyYXBoQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ21zUGFyYWdyYXBoTW9kdWxlIHt9XG4iXX0=