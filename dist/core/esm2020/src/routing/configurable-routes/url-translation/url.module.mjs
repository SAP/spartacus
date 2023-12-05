/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UrlPipe } from './url.pipe';
import { ProductURLPipe } from './product-url.pipe';
import * as i0 from "@angular/core";
export class UrlModule {
}
UrlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UrlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UrlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UrlModule, declarations: [UrlPipe, ProductURLPipe], imports: [CommonModule], exports: [UrlPipe, ProductURLPipe] });
UrlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UrlModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UrlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [UrlPipe, ProductURLPipe],
                    exports: [UrlPipe, ProductURLPipe],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3JvdXRpbmcvY29uZmlndXJhYmxlLXJvdXRlcy91cmwtdHJhbnNsYXRpb24vdXJsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNyQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBT3BELE1BQU0sT0FBTyxTQUFTOztzR0FBVCxTQUFTO3VHQUFULFNBQVMsaUJBSEwsT0FBTyxFQUFFLGNBQWMsYUFENUIsWUFBWSxhQUVaLE9BQU8sRUFBRSxjQUFjO3VHQUV0QixTQUFTLFlBSlYsWUFBWTsyRkFJWCxTQUFTO2tCQUxyQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsWUFBWSxFQUFFLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQztvQkFDdkMsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQztpQkFDbkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVybFBpcGUgfSBmcm9tICcuL3VybC5waXBlJztcbmltcG9ydCB7IFByb2R1Y3RVUkxQaXBlIH0gZnJvbSAnLi9wcm9kdWN0LXVybC5waXBlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1VybFBpcGUsIFByb2R1Y3RVUkxQaXBlXSxcbiAgZXhwb3J0czogW1VybFBpcGUsIFByb2R1Y3RVUkxQaXBlXSxcbn0pXG5leHBvcnQgY2xhc3MgVXJsTW9kdWxlIHt9XG4iXX0=