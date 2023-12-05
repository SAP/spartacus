/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageSlotModule } from '../../../cms-structure/page/slot/page-slot.module';
import { OutletModule } from '../../outlet/outlet.module';
import { PageLayoutComponent } from './page-layout.component';
import { PageTemplateDirective } from './page-template.directive';
import * as i0 from "@angular/core";
export class PageLayoutModule {
}
PageLayoutModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageLayoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PageLayoutModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PageLayoutModule, declarations: [PageLayoutComponent, PageTemplateDirective], imports: [CommonModule, OutletModule, PageSlotModule], exports: [PageLayoutComponent, PageTemplateDirective] });
PageLayoutModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageLayoutModule, imports: [CommonModule, OutletModule, PageSlotModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageLayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OutletModule, PageSlotModule],
                    declarations: [PageLayoutComponent, PageTemplateDirective],
                    exports: [PageLayoutComponent, PageTemplateDirective],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1sYXlvdXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtc3RydWN0dXJlL3BhZ2UvcGFnZS1sYXlvdXQvcGFnZS1sYXlvdXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDbkYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQU9sRSxNQUFNLE9BQU8sZ0JBQWdCOzs2R0FBaEIsZ0JBQWdCOzhHQUFoQixnQkFBZ0IsaUJBSFosbUJBQW1CLEVBQUUscUJBQXFCLGFBRC9DLFlBQVksRUFBRSxZQUFZLEVBQUUsY0FBYyxhQUUxQyxtQkFBbUIsRUFBRSxxQkFBcUI7OEdBRXpDLGdCQUFnQixZQUpqQixZQUFZLEVBQUUsWUFBWSxFQUFFLGNBQWM7MkZBSXpDLGdCQUFnQjtrQkFMNUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQztvQkFDckQsWUFBWSxFQUFFLENBQUMsbUJBQW1CLEVBQUUscUJBQXFCLENBQUM7b0JBQzFELE9BQU8sRUFBRSxDQUFDLG1CQUFtQixFQUFFLHFCQUFxQixDQUFDO2lCQUN0RCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZVNsb3RNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9jbXMtc3RydWN0dXJlL3BhZ2Uvc2xvdC9wYWdlLXNsb3QubW9kdWxlJztcbmltcG9ydCB7IE91dGxldE1vZHVsZSB9IGZyb20gJy4uLy4uL291dGxldC9vdXRsZXQubW9kdWxlJztcbmltcG9ydCB7IFBhZ2VMYXlvdXRDb21wb25lbnQgfSBmcm9tICcuL3BhZ2UtbGF5b3V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYWdlVGVtcGxhdGVEaXJlY3RpdmUgfSBmcm9tICcuL3BhZ2UtdGVtcGxhdGUuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgT3V0bGV0TW9kdWxlLCBQYWdlU2xvdE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1BhZ2VMYXlvdXRDb21wb25lbnQsIFBhZ2VUZW1wbGF0ZURpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtQYWdlTGF5b3V0Q29tcG9uZW50LCBQYWdlVGVtcGxhdGVEaXJlY3RpdmVdLFxufSlcbmV4cG9ydCBjbGFzcyBQYWdlTGF5b3V0TW9kdWxlIHt9XG4iXX0=