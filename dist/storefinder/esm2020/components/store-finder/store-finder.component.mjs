/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../store-finder-header/store-finder-header.component";
export class StoreFinderComponent {
}
StoreFinderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
StoreFinderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StoreFinderComponent, selector: "cx-store-finder", ngImport: i0, template: "<ng-container>\n  <div aria-live=\"assertive\" aria-relevant=\"additions text\">\n    <div class=\"cx-store-finder-wrapper\">\n      <cx-store-finder-header></cx-store-finder-header>\n      <router-outlet></router-outlet>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i1.RouterOutlet, selector: "router-outlet", inputs: ["name"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "component", type: i2.StoreFinderHeaderComponent, selector: "cx-store-finder-header" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-store-finder', template: "<ng-container>\n  <div aria-live=\"assertive\" aria-relevant=\"additions text\">\n    <div class=\"cx-store-finder-wrapper\">\n      <cx-store-finder-header></cx-store-finder-header>\n      <router-outlet></router-outlet>\n    </div>\n  </div>\n</ng-container>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtZmluZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9zdG9yZWZpbmRlci9jb21wb25lbnRzL3N0b3JlLWZpbmRlci9zdG9yZS1maW5kZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3N0b3JlZmluZGVyL2NvbXBvbmVudHMvc3RvcmUtZmluZGVyL3N0b3JlLWZpbmRlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQU0xQyxNQUFNLE9BQU8sb0JBQW9COztpSEFBcEIsb0JBQW9CO3FHQUFwQixvQkFBb0IsdURDWmpDLHdRQVFBOzJGRElhLG9CQUFvQjtrQkFKaEMsU0FBUzsrQkFDRSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtc3RvcmUtZmluZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3N0b3JlLWZpbmRlci5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIFN0b3JlRmluZGVyQ29tcG9uZW50IHt9XG4iLCI8bmctY29udGFpbmVyPlxuICA8ZGl2IGFyaWEtbGl2ZT1cImFzc2VydGl2ZVwiIGFyaWEtcmVsZXZhbnQ9XCJhZGRpdGlvbnMgdGV4dFwiPlxuICAgIDxkaXYgY2xhc3M9XCJjeC1zdG9yZS1maW5kZXItd3JhcHBlclwiPlxuICAgICAgPGN4LXN0b3JlLWZpbmRlci1oZWFkZXI+PC9jeC1zdG9yZS1maW5kZXItaGVhZGVyPlxuICAgICAgPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuIl19