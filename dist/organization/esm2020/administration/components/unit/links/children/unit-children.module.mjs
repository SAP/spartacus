/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { DisableInfoModule } from '../../../shared/detail/disable-info/disable-info.module';
import { ListModule } from '../../../shared/list/list.module';
import { SubListModule } from '../../../shared/sub-list/sub-list.module';
import { UnitChildrenComponent } from './unit-children.component';
import * as i0 from "@angular/core";
export class UnitChildrenModule {
}
UnitChildrenModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildrenModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitChildrenModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitChildrenModule, declarations: [UnitChildrenComponent], imports: [ListModule,
        I18nModule,
        RouterModule,
        SubListModule,
        CommonModule,
        DisableInfoModule] });
UnitChildrenModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildrenModule, imports: [ListModule,
        I18nModule,
        RouterModule,
        SubListModule,
        CommonModule,
        DisableInfoModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildrenModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ListModule,
                        I18nModule,
                        RouterModule,
                        SubListModule,
                        CommonModule,
                        DisableInfoModule,
                    ],
                    declarations: [UnitChildrenComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1jaGlsZHJlbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdW5pdC9saW5rcy9jaGlsZHJlbi91bml0LWNoaWxkcmVuLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUM1RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQWFsRSxNQUFNLE9BQU8sa0JBQWtCOzsrR0FBbEIsa0JBQWtCO2dIQUFsQixrQkFBa0IsaUJBRmQscUJBQXFCLGFBUGxDLFVBQVU7UUFDVixVQUFVO1FBQ1YsWUFBWTtRQUNaLGFBQWE7UUFDYixZQUFZO1FBQ1osaUJBQWlCO2dIQUlSLGtCQUFrQixZQVQzQixVQUFVO1FBQ1YsVUFBVTtRQUNWLFlBQVk7UUFDWixhQUFhO1FBQ2IsWUFBWTtRQUNaLGlCQUFpQjsyRkFJUixrQkFBa0I7a0JBWDlCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixpQkFBaUI7cUJBQ2xCO29CQUNELFlBQVksRUFBRSxDQUFDLHFCQUFxQixDQUFDO2lCQUN0QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgRGlzYWJsZUluZm9Nb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvZGV0YWlsL2Rpc2FibGUtaW5mby9kaXNhYmxlLWluZm8ubW9kdWxlJztcbmltcG9ydCB7IExpc3RNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbGlzdC9saXN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBTdWJMaXN0TW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3N1Yi1saXN0L3N1Yi1saXN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBVbml0Q2hpbGRyZW5Db21wb25lbnQgfSBmcm9tICcuL3VuaXQtY2hpbGRyZW4uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIExpc3RNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgU3ViTGlzdE1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRGlzYWJsZUluZm9Nb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1VuaXRDaGlsZHJlbkNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFVuaXRDaGlsZHJlbk1vZHVsZSB7fVxuIl19