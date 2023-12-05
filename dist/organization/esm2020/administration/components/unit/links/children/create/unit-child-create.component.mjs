/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UnitItemService } from '../../../services/unit-item.service';
import { UnitChildItemService } from './unit-child-item.service';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/current-unit.service";
import * as i2 from "../../../form/unit-form.component";
export class UnitChildCreateComponent {
    constructor(unitService) {
        this.unitService = unitService;
        this.unitKey$ = this.unitService.key$;
    }
}
UnitChildCreateComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildCreateComponent, deps: [{ token: i1.CurrentUnitService }], target: i0.ɵɵFactoryTarget.Component });
UnitChildCreateComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitChildCreateComponent, selector: "cx-org-unit-child-create", host: { classAttribute: "content-wrapper" }, providers: [
        // we provide a specific version of the `UnitItemService` to
        // let the form component work with child units.
        {
            provide: UnitItemService,
            useExisting: UnitChildItemService,
        },
    ], ngImport: i0, template: "<cx-org-unit-form\n  [createChildUnit]=\"true\"\n  i18nRoot=\"orgUnit.children\"\n></cx-org-unit-form>\n", dependencies: [{ kind: "component", type: i2.UnitFormComponent, selector: "cx-org-unit-form", inputs: ["i18nRoot", "createChildUnit"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildCreateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-child-create', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        // we provide a specific version of the `UnitItemService` to
                        // let the form component work with child units.
                        {
                            provide: UnitItemService,
                            useExisting: UnitChildItemService,
                        },
                    ], template: "<cx-org-unit-form\n  [createChildUnit]=\"true\"\n  i18nRoot=\"orgUnit.children\"\n></cx-org-unit-form>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CurrentUnitService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1jaGlsZC1jcmVhdGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VuaXQvbGlua3MvY2hpbGRyZW4vY3JlYXRlL3VuaXQtY2hpbGQtY3JlYXRlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpbmtzL2NoaWxkcmVuL2NyZWF0ZS91bml0LWNoaWxkLWNyZWF0ZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUduRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDdEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7QUFnQmpFLE1BQU0sT0FBTyx3QkFBd0I7SUFFbkMsWUFBc0IsV0FBK0I7UUFBL0IsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBRHJELGFBQVEsR0FBdUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFDRyxDQUFDOztxSEFGOUMsd0JBQXdCO3lHQUF4Qix3QkFBd0IsZ0dBVHhCO1FBQ1QsNERBQTREO1FBQzVELGdEQUFnRDtRQUNoRDtZQUNFLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLFdBQVcsRUFBRSxvQkFBb0I7U0FDbEM7S0FDRiwwQkN4QkgsMEdBSUE7MkZEc0JhLHdCQUF3QjtrQkFkcEMsU0FBUzsrQkFDRSwwQkFBMEIsbUJBRW5CLHVCQUF1QixDQUFDLE1BQU0sUUFDekMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsYUFDdkI7d0JBQ1QsNERBQTREO3dCQUM1RCxnREFBZ0Q7d0JBQ2hEOzRCQUNFLE9BQU8sRUFBRSxlQUFlOzRCQUN4QixXQUFXLEVBQUUsb0JBQW9CO3lCQUNsQztxQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEN1cnJlbnRVbml0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2N1cnJlbnQtdW5pdC5zZXJ2aWNlJztcbmltcG9ydCB7IFVuaXRJdGVtU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL3VuaXQtaXRlbS5zZXJ2aWNlJztcbmltcG9ydCB7IFVuaXRDaGlsZEl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi91bml0LWNoaWxkLWl0ZW0uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LW9yZy11bml0LWNoaWxkLWNyZWF0ZScsXG4gIHRlbXBsYXRlVXJsOiAnLi91bml0LWNoaWxkLWNyZWF0ZS5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7IGNsYXNzOiAnY29udGVudC13cmFwcGVyJyB9LFxuICBwcm92aWRlcnM6IFtcbiAgICAvLyB3ZSBwcm92aWRlIGEgc3BlY2lmaWMgdmVyc2lvbiBvZiB0aGUgYFVuaXRJdGVtU2VydmljZWAgdG9cbiAgICAvLyBsZXQgdGhlIGZvcm0gY29tcG9uZW50IHdvcmsgd2l0aCBjaGlsZCB1bml0cy5cbiAgICB7XG4gICAgICBwcm92aWRlOiBVbml0SXRlbVNlcnZpY2UsXG4gICAgICB1c2VFeGlzdGluZzogVW5pdENoaWxkSXRlbVNlcnZpY2UsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVW5pdENoaWxkQ3JlYXRlQ29tcG9uZW50IHtcbiAgdW5pdEtleSQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMudW5pdFNlcnZpY2Uua2V5JDtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHVuaXRTZXJ2aWNlOiBDdXJyZW50VW5pdFNlcnZpY2UpIHt9XG59XG4iLCI8Y3gtb3JnLXVuaXQtZm9ybVxuICBbY3JlYXRlQ2hpbGRVbml0XT1cInRydWVcIlxuICBpMThuUm9vdD1cIm9yZ1VuaXQuY2hpbGRyZW5cIlxuPjwvY3gtb3JnLXVuaXQtZm9ybT5cbiJdfQ==