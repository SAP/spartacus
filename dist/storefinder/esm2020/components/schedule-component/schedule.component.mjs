/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@spartacus/core";
export class ScheduleComponent {
    constructor() {
        // Intentional empty constructor
    }
    ngOnInit() {
        if (this.location) {
            this.weekDays = this.location.openingHours
                ?.weekDayOpeningList;
        }
    }
}
ScheduleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ScheduleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ScheduleComponent, selector: "cx-schedule", inputs: { location: "location" }, ngImport: i0, template: "<ng-content></ng-content>\n<div class=\"container cx-store-hours\" *ngIf=\"location.openingHours\">\n  <div *ngFor=\"let day of weekDays\" class=\"row\">\n    <div class=\"cx-days col-4\">{{ day.weekDay }}</div>\n\n    <div *ngIf=\"day.closed\" class=\"cx-hours col-8 closed\">\n      {{ 'storeFinder.closed' | cxTranslate }}\n    </div>\n\n    <div *ngIf=\"!day.closed\" class=\"cx-hours col-8\">\n      {{ day.openingTime?.formattedHour }} -\n      {{ day.closingTime?.formattedHour }}\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-schedule', template: "<ng-content></ng-content>\n<div class=\"container cx-store-hours\" *ngIf=\"location.openingHours\">\n  <div *ngFor=\"let day of weekDays\" class=\"row\">\n    <div class=\"cx-days col-4\">{{ day.weekDay }}</div>\n\n    <div *ngIf=\"day.closed\" class=\"cx-hours col-8 closed\">\n      {{ 'storeFinder.closed' | cxTranslate }}\n    </div>\n\n    <div *ngIf=\"!day.closed\" class=\"cx-hours col-8\">\n      {{ day.openingTime?.formattedHour }} -\n      {{ day.closingTime?.formattedHour }}\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { location: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZWR1bGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3N0b3JlZmluZGVyL2NvbXBvbmVudHMvc2NoZWR1bGUtY29tcG9uZW50L3NjaGVkdWxlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9zdG9yZWZpbmRlci9jb21wb25lbnRzL3NjaGVkdWxlLWNvbXBvbmVudC9zY2hlZHVsZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7Ozs7QUFPekQsTUFBTSxPQUFPLGlCQUFpQjtJQU01QjtRQUNFLGdDQUFnQztJQUNsQyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWTtnQkFDeEMsRUFBRSxrQkFBeUMsQ0FBQztTQUMvQztJQUNILENBQUM7OzhHQWZVLGlCQUFpQjtrR0FBakIsaUJBQWlCLHFGQ2I5Qix5Z0JBZUE7MkZERmEsaUJBQWlCO2tCQUo3QixTQUFTOytCQUNFLGFBQWE7MEVBS3ZCLFFBQVE7c0JBRFAsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9pbnRPZlNlcnZpY2UsIFdlZWtkYXlPcGVuaW5nRGF5IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtc2NoZWR1bGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2NoZWR1bGUuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBTY2hlZHVsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGxvY2F0aW9uOiBQb2ludE9mU2VydmljZTtcblxuICB3ZWVrRGF5czogV2Vla2RheU9wZW5pbmdEYXlbXTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBJbnRlbnRpb25hbCBlbXB0eSBjb25zdHJ1Y3RvclxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubG9jYXRpb24pIHtcbiAgICAgIHRoaXMud2Vla0RheXMgPSB0aGlzLmxvY2F0aW9uLm9wZW5pbmdIb3Vyc1xuICAgICAgICA/LndlZWtEYXlPcGVuaW5nTGlzdCBhcyBXZWVrZGF5T3BlbmluZ0RheVtdO1xuICAgIH1cbiAgfVxufVxuIiwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPGRpdiBjbGFzcz1cImNvbnRhaW5lciBjeC1zdG9yZS1ob3Vyc1wiICpuZ0lmPVwibG9jYXRpb24ub3BlbmluZ0hvdXJzXCI+XG4gIDxkaXYgKm5nRm9yPVwibGV0IGRheSBvZiB3ZWVrRGF5c1wiIGNsYXNzPVwicm93XCI+XG4gICAgPGRpdiBjbGFzcz1cImN4LWRheXMgY29sLTRcIj57eyBkYXkud2Vla0RheSB9fTwvZGl2PlxuXG4gICAgPGRpdiAqbmdJZj1cImRheS5jbG9zZWRcIiBjbGFzcz1cImN4LWhvdXJzIGNvbC04IGNsb3NlZFwiPlxuICAgICAge3sgJ3N0b3JlRmluZGVyLmNsb3NlZCcgfCBjeFRyYW5zbGF0ZSB9fVxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiAqbmdJZj1cIiFkYXkuY2xvc2VkXCIgY2xhc3M9XCJjeC1ob3VycyBjb2wtOFwiPlxuICAgICAge3sgZGF5Lm9wZW5pbmdUaW1lPy5mb3JtYXR0ZWRIb3VyIH19IC1cbiAgICAgIHt7IGRheS5jbG9zaW5nVGltZT8uZm9ybWF0dGVkSG91ciB9fVxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19