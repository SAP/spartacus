/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component } from '@angular/core';
import { AddToHomeScreenComponent } from '../add-to-home-screen.component';
import * as i0 from "@angular/core";
import * as i1 from "../../services/add-to-home-screen.service";
import * as i2 from "@angular/common";
export class AddToHomeScreenBtnComponent extends AddToHomeScreenComponent {
    constructor(addToHomeScreenService) {
        super(addToHomeScreenService);
        this.addToHomeScreenService = addToHomeScreenService;
    }
}
AddToHomeScreenBtnComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToHomeScreenBtnComponent, deps: [{ token: i1.AddToHomeScreenService }], target: i0.ɵɵFactoryTarget.Component });
AddToHomeScreenBtnComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AddToHomeScreenBtnComponent, selector: "cx-add-to-home-screen-btn", usesInheritance: true, ngImport: i0, template: "<span (click)=\"prompt()\">\n  <ng-content *ngIf=\"canPrompt$ | async\"></ng-content>\n</span>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToHomeScreenBtnComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-add-to-home-screen-btn', template: "<span (click)=\"prompt()\">\n  <ng-content *ngIf=\"canPrompt$ | async\"></ng-content>\n</span>\n" }]
        }], ctorParameters: function () { return [{ type: i1.AddToHomeScreenService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXRvLWhvbWUtc2NyZWVuLWJ0bi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1zdHJ1Y3R1cmUvcHdhL2NvbXBvbmVudHMvYWRkLXRvLWhvbWUtc2NyZWVuLWJ0bi9hZGQtdG8taG9tZS1zY3JlZW4tYnRuLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9wd2EvY29tcG9uZW50cy9hZGQtdG8taG9tZS1zY3JlZW4tYnRuL2FkZC10by1ob21lLXNjcmVlbi1idG4uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7QUFNM0UsTUFBTSxPQUFPLDJCQUE0QixTQUFRLHdCQUF3QjtJQUN2RSxZQUFzQixzQkFBOEM7UUFDbEUsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFEViwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO0lBRXBFLENBQUM7O3dIQUhVLDJCQUEyQjs0R0FBM0IsMkJBQTJCLHdGQ2R4QyxrR0FHQTsyRkRXYSwyQkFBMkI7a0JBSnZDLFNBQVM7K0JBQ0UsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBZGRUb0hvbWVTY3JlZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYWRkLXRvLWhvbWUtc2NyZWVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWRkVG9Ib21lU2NyZWVuQ29tcG9uZW50IH0gZnJvbSAnLi4vYWRkLXRvLWhvbWUtc2NyZWVuLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWFkZC10by1ob21lLXNjcmVlbi1idG4nLFxuICB0ZW1wbGF0ZVVybDogJy4vYWRkLXRvLWhvbWUtc2NyZWVuLWJ0bi5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIEFkZFRvSG9tZVNjcmVlbkJ0bkNvbXBvbmVudCBleHRlbmRzIEFkZFRvSG9tZVNjcmVlbkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhZGRUb0hvbWVTY3JlZW5TZXJ2aWNlOiBBZGRUb0hvbWVTY3JlZW5TZXJ2aWNlKSB7XG4gICAgc3VwZXIoYWRkVG9Ib21lU2NyZWVuU2VydmljZSk7XG4gIH1cbn1cbiIsIjxzcGFuIChjbGljayk9XCJwcm9tcHQoKVwiPlxuICA8bmctY29udGVudCAqbmdJZj1cImNhblByb21wdCQgfCBhc3luY1wiPjwvbmctY29udGVudD5cbjwvc3Bhbj5cbiJdfQ==