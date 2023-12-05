/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { DisableInfoModule } from '../../../../shared/detail/disable-info/disable-info.module';
import { SubListModule } from '../../../../shared/sub-list/sub-list.module';
import { UnitUserRolesCellComponent } from './unit-user-link-cell.component';
import { UnitUserListComponent } from './unit-user-list.component';
import * as i0 from "@angular/core";
export class UnitUserListModule {
}
UnitUserListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitUserListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitUserListModule, declarations: [UnitUserListComponent, UnitUserRolesCellComponent], imports: [CommonModule,
        I18nModule,
        RouterModule,
        UrlModule,
        SubListModule,
        DisableInfoModule] });
UnitUserListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserListModule, imports: [CommonModule,
        I18nModule,
        RouterModule,
        UrlModule,
        SubListModule,
        DisableInfoModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        RouterModule,
                        UrlModule,
                        SubListModule,
                        DisableInfoModule,
                    ],
                    declarations: [UnitUserListComponent, UnitUserRolesCellComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC11c2VyLWxpc3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VuaXQvbGlua3MvdXNlcnMvbGlzdC91bml0LXVzZXItbGlzdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBQy9GLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7QUFhbkUsTUFBTSxPQUFPLGtCQUFrQjs7K0dBQWxCLGtCQUFrQjtnSEFBbEIsa0JBQWtCLGlCQUZkLHFCQUFxQixFQUFFLDBCQUEwQixhQVA5RCxZQUFZO1FBQ1osVUFBVTtRQUNWLFlBQVk7UUFDWixTQUFTO1FBQ1QsYUFBYTtRQUNiLGlCQUFpQjtnSEFJUixrQkFBa0IsWUFUM0IsWUFBWTtRQUNaLFVBQVU7UUFDVixZQUFZO1FBQ1osU0FBUztRQUNULGFBQWE7UUFDYixpQkFBaUI7MkZBSVIsa0JBQWtCO2tCQVg5QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsWUFBWTt3QkFDWixTQUFTO3dCQUNULGFBQWE7d0JBQ2IsaUJBQWlCO3FCQUNsQjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSwwQkFBMEIsQ0FBQztpQkFDbEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJMThuTW9kdWxlLCBVcmxNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgRGlzYWJsZUluZm9Nb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvZGV0YWlsL2Rpc2FibGUtaW5mby9kaXNhYmxlLWluZm8ubW9kdWxlJztcbmltcG9ydCB7IFN1Ykxpc3RNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc3ViLWxpc3Qvc3ViLWxpc3QubW9kdWxlJztcbmltcG9ydCB7IFVuaXRVc2VyUm9sZXNDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi91bml0LXVzZXItbGluay1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVbml0VXNlckxpc3RDb21wb25lbnQgfSBmcm9tICcuL3VuaXQtdXNlci1saXN0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgVXJsTW9kdWxlLFxuICAgIFN1Ykxpc3RNb2R1bGUsXG4gICAgRGlzYWJsZUluZm9Nb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1VuaXRVc2VyTGlzdENvbXBvbmVudCwgVW5pdFVzZXJSb2xlc0NlbGxDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBVbml0VXNlckxpc3RNb2R1bGUge31cbiJdfQ==