/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitListComponent } from './unit-list.component';
import { IconModule } from '@spartacus/storefront';
import { ListModule } from '../../shared/list/list.module';
import { ToggleLinkCellComponent } from './toggle-link/toggle-link-cell.component';
import * as i0 from "@angular/core";
export class UnitListModule {
}
UnitListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitListModule, declarations: [UnitListComponent, ToggleLinkCellComponent], imports: [CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        IconModule,
        ListModule], exports: [ToggleLinkCellComponent] });
UnitListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitListModule, imports: [CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        IconModule,
        ListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        IconModule,
                        ListModule,
                    ],
                    declarations: [UnitListComponent, ToggleLinkCellComponent],
                    exports: [ToggleLinkCellComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1saXN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpc3QvdW5pdC1saXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7QUFjbkYsTUFBTSxPQUFPLGNBQWM7OzJHQUFkLGNBQWM7NEdBQWQsY0FBYyxpQkFIVixpQkFBaUIsRUFBRSx1QkFBdUIsYUFQdkQsWUFBWTtRQUNaLFlBQVk7UUFDWixTQUFTO1FBQ1QsVUFBVTtRQUNWLFVBQVU7UUFDVixVQUFVLGFBR0YsdUJBQXVCOzRHQUV0QixjQUFjLFlBVnZCLFlBQVk7UUFDWixZQUFZO1FBQ1osU0FBUztRQUNULFVBQVU7UUFDVixVQUFVO1FBQ1YsVUFBVTsyRkFLRCxjQUFjO2tCQVoxQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFlBQVk7d0JBQ1osU0FBUzt3QkFDVCxVQUFVO3dCQUNWLFVBQVU7d0JBQ1YsVUFBVTtxQkFDWDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSx1QkFBdUIsQ0FBQztvQkFDMUQsT0FBTyxFQUFFLENBQUMsdUJBQXVCLENBQUM7aUJBQ25DIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSwgVXJsTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFVuaXRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi91bml0LWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IEljb25Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgTGlzdE1vZHVsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9saXN0L2xpc3QubW9kdWxlJztcbmltcG9ydCB7IFRvZ2dsZUxpbmtDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi90b2dnbGUtbGluay90b2dnbGUtbGluay1jZWxsLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIEljb25Nb2R1bGUsXG4gICAgTGlzdE1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbVW5pdExpc3RDb21wb25lbnQsIFRvZ2dsZUxpbmtDZWxsQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1RvZ2dsZUxpbmtDZWxsQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgVW5pdExpc3RNb2R1bGUge31cbiJdfQ==