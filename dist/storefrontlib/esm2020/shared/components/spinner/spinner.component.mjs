/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
// TODO: Improve a11y with better text appropriate to usage (example: loading cart spinner)
export class SpinnerComponent {
    constructor() {
        // Intentional empty constructor
    }
}
SpinnerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SpinnerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
SpinnerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: SpinnerComponent, selector: "cx-spinner", ngImport: i0, template: "<div class=\"loader-container\" role=\"status\">\n  <div class=\"loader\">{{ 'spinner.loading' | cxTranslate }}</div>\n</div>\n", dependencies: [{ kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SpinnerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-spinner', template: "<div class=\"loader-container\" role=\"status\">\n  <div class=\"loader\">{{ 'spinner.loading' | cxTranslate }}</div>\n</div>\n" }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBRTFDLDJGQUEyRjtBQU0zRixNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCO1FBQ0UsZ0NBQWdDO0lBQ2xDLENBQUM7OzZHQUhVLGdCQUFnQjtpR0FBaEIsZ0JBQWdCLGtEQ2Q3QixpSUFHQTsyRkRXYSxnQkFBZ0I7a0JBSjVCLFNBQVM7K0JBQ0UsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBUT0RPOiBJbXByb3ZlIGExMXkgd2l0aCBiZXR0ZXIgdGV4dCBhcHByb3ByaWF0ZSB0byB1c2FnZSAoZXhhbXBsZTogbG9hZGluZyBjYXJ0IHNwaW5uZXIpXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXNwaW5uZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vc3Bpbm5lci5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIFNwaW5uZXJDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBJbnRlbnRpb25hbCBlbXB0eSBjb25zdHJ1Y3RvclxuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwibG9hZGVyLWNvbnRhaW5lclwiIHJvbGU9XCJzdGF0dXNcIj5cbiAgPGRpdiBjbGFzcz1cImxvYWRlclwiPnt7ICdzcGlubmVyLmxvYWRpbmcnIHwgY3hUcmFuc2xhdGUgfX08L2Rpdj5cbjwvZGl2PlxuIl19