/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ActiveLinkCellComponent } from './active-link/active-link-cell.component';
import { AmountCellComponent } from './amount/amount-cell.component';
import { DateRangeCellComponent } from './date-range/date-range-cell.component';
import { LimitCellComponent } from './limit/limit-cell.component';
import { CellComponent } from './cell.component';
import { RolesCellComponent } from './roles/roles-cell.component';
import { StatusCellComponent } from './status/status-cell.component';
import { UnitCellComponent } from './unit/unit-cell.component';
import * as i0 from "@angular/core";
export class CellModule {
}
CellModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CellModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CellModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CellModule, declarations: [CellComponent,
        ActiveLinkCellComponent,
        AmountCellComponent,
        DateRangeCellComponent,
        LimitCellComponent,
        RolesCellComponent,
        StatusCellComponent,
        UnitCellComponent], imports: [CommonModule, RouterModule, UrlModule, I18nModule, IconModule] });
CellModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CellModule, imports: [CommonModule, RouterModule, UrlModule, I18nModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CellModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, UrlModule, I18nModule, IconModule],
                    declarations: [
                        CellComponent,
                        ActiveLinkCellComponent,
                        AmountCellComponent,
                        DateRangeCellComponent,
                        LimitCellComponent,
                        RolesCellComponent,
                        StatusCellComponent,
                        UnitCellComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvc2hhcmVkL3RhYmxlL2NlbGwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDbkYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDckUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDOztBQWUvRCxNQUFNLE9BQU8sVUFBVTs7dUdBQVYsVUFBVTt3R0FBVixVQUFVLGlCQVZuQixhQUFhO1FBQ2IsdUJBQXVCO1FBQ3ZCLG1CQUFtQjtRQUNuQixzQkFBc0I7UUFDdEIsa0JBQWtCO1FBQ2xCLGtCQUFrQjtRQUNsQixtQkFBbUI7UUFDbkIsaUJBQWlCLGFBVFQsWUFBWSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVU7d0dBWTVELFVBQVUsWUFaWCxZQUFZLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVTsyRkFZNUQsVUFBVTtrQkFidEIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO29CQUN4RSxZQUFZLEVBQUU7d0JBQ1osYUFBYTt3QkFDYix1QkFBdUI7d0JBQ3ZCLG1CQUFtQjt3QkFDbkIsc0JBQXNCO3dCQUN0QixrQkFBa0I7d0JBQ2xCLGtCQUFrQjt3QkFDbEIsbUJBQW1CO3dCQUNuQixpQkFBaUI7cUJBQ2xCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSwgVXJsTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEljb25Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQWN0aXZlTGlua0NlbGxDb21wb25lbnQgfSBmcm9tICcuL2FjdGl2ZS1saW5rL2FjdGl2ZS1saW5rLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IEFtb3VudENlbGxDb21wb25lbnQgfSBmcm9tICcuL2Ftb3VudC9hbW91bnQtY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0ZVJhbmdlQ2VsbENvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS1yYW5nZS9kYXRlLXJhbmdlLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IExpbWl0Q2VsbENvbXBvbmVudCB9IGZyb20gJy4vbGltaXQvbGltaXQtY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2VsbENvbXBvbmVudCB9IGZyb20gJy4vY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUm9sZXNDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi9yb2xlcy9yb2xlcy1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdGF0dXNDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi9zdGF0dXMvc3RhdHVzLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IFVuaXRDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi91bml0L3VuaXQtY2VsbC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBSb3V0ZXJNb2R1bGUsIFVybE1vZHVsZSwgSTE4bk1vZHVsZSwgSWNvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENlbGxDb21wb25lbnQsXG4gICAgQWN0aXZlTGlua0NlbGxDb21wb25lbnQsXG4gICAgQW1vdW50Q2VsbENvbXBvbmVudCxcbiAgICBEYXRlUmFuZ2VDZWxsQ29tcG9uZW50LFxuICAgIExpbWl0Q2VsbENvbXBvbmVudCxcbiAgICBSb2xlc0NlbGxDb21wb25lbnQsXG4gICAgU3RhdHVzQ2VsbENvbXBvbmVudCxcbiAgICBVbml0Q2VsbENvbXBvbmVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2VsbE1vZHVsZSB7fVxuIl19