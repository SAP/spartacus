/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@spartacus/core";
/**
 * A presentational component for a store's opening hours
 */
export class StoreScheduleComponent {
    constructor() {
        /** The details of the store */
        this.storeDetails = {};
        this.openingTimes = [];
    }
    ngOnChanges() {
        this.openingTimes =
            this.storeDetails?.openingHours?.weekDayOpeningList?.map(({ weekDay, closed, openingTime, closingTime }) => {
                return {
                    openingHours: `${openingTime?.formattedHour ?? ''} - ${closingTime?.formattedHour ?? ''}`,
                    weekDay: weekDay ?? '',
                    closed,
                };
            }) ?? [];
    }
}
StoreScheduleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreScheduleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
StoreScheduleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StoreScheduleComponent, selector: "cx-store-schedule", inputs: { storeDetails: "storeDetails" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"cx-store-schedule-container\">\n  <div class=\"cx-store-schedule-title\">\n    {{ 'storeSchedule.storeHours' | cxTranslate }}\n  </div>\n  <div\n    class=\"cx-store-schedule-opening-times\"\n    *ngFor=\"let openingTime of openingTimes\"\n  >\n    <div class=\"cx-store-schedule-day-of-week\">{{ openingTime.weekDay }}</div>\n    <div *ngIf=\"!openingTime.closed; else closed\">\n      {{ openingTime.openingHours }}\n    </div>\n    <ng-template #closed>{{\n      'storeSchedule.closed' | cxTranslate\n    }}</ng-template>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreScheduleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-store-schedule', template: "<div class=\"cx-store-schedule-container\">\n  <div class=\"cx-store-schedule-title\">\n    {{ 'storeSchedule.storeHours' | cxTranslate }}\n  </div>\n  <div\n    class=\"cx-store-schedule-opening-times\"\n    *ngFor=\"let openingTime of openingTimes\"\n  >\n    <div class=\"cx-store-schedule-day-of-week\">{{ openingTime.weekDay }}</div>\n    <div *ngIf=\"!openingTime.closed; else closed\">\n      {{ openingTime.openingHours }}\n    </div>\n    <ng-template #closed>{{\n      'storeSchedule.closed' | cxTranslate\n    }}</ng-template>\n  </div>\n</div>\n" }]
        }], propDecorators: { storeDetails: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtc2NoZWR1bGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3BpY2t1cC1pbi1zdG9yZS9jb21wb25lbnRzL3ByZXNlbnRhdGlvbmFsL3N0b3JlL3N0b3JlLXNjaGVkdWxlL3N0b3JlLXNjaGVkdWxlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9waWNrdXAtaW4tc3RvcmUvY29tcG9uZW50cy9wcmVzZW50YXRpb25hbC9zdG9yZS9zdG9yZS1zY2hlZHVsZS9zdG9yZS1zY2hlZHVsZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7Ozs7QUFTNUQ7O0dBRUc7QUFLSCxNQUFNLE9BQU8sc0JBQXNCO0lBSm5DO1FBS0UsK0JBQStCO1FBQ3RCLGlCQUFZLEdBQW1CLEVBQUUsQ0FBQztRQUUzQyxpQkFBWSxHQUFrQixFQUFFLENBQUM7S0FnQmxDO0lBZEMsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZO1lBQ2YsSUFBSSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxDQUN0RCxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRTtnQkFDaEQsT0FBTztvQkFDTCxZQUFZLEVBQUUsR0FBRyxXQUFXLEVBQUUsYUFBYSxJQUFJLEVBQUUsTUFDL0MsV0FBVyxFQUFFLGFBQWEsSUFBSSxFQUNoQyxFQUFFO29CQUNGLE9BQU8sRUFBRSxPQUFPLElBQUksRUFBRTtvQkFDdEIsTUFBTTtpQkFDUCxDQUFDO1lBQ0osQ0FBQyxDQUNGLElBQUksRUFBRSxDQUFDO0lBQ1osQ0FBQzs7bUhBbkJVLHNCQUFzQjt1R0FBdEIsc0JBQXNCLHdIQ3RCbkMsK2lCQWlCQTsyRkRLYSxzQkFBc0I7a0JBSmxDLFNBQVM7K0JBQ0UsbUJBQW1COzhCQUtwQixZQUFZO3NCQUFwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb2ludE9mU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbnR5cGUgT3BlbmluZ1RpbWUgPSB7XG4gIHdlZWtEYXk/OiBzdHJpbmc7XG4gIG9wZW5pbmdIb3Vycz86IHN0cmluZztcbiAgY2xvc2VkPzogYm9vbGVhbjtcbn07XG5cbi8qKlxuICogQSBwcmVzZW50YXRpb25hbCBjb21wb25lbnQgZm9yIGEgc3RvcmUncyBvcGVuaW5nIGhvdXJzXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXN0b3JlLXNjaGVkdWxlJyxcbiAgdGVtcGxhdGVVcmw6ICdzdG9yZS1zY2hlZHVsZS5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIFN0b3JlU2NoZWR1bGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAvKiogVGhlIGRldGFpbHMgb2YgdGhlIHN0b3JlICovXG4gIEBJbnB1dCgpIHN0b3JlRGV0YWlsczogUG9pbnRPZlNlcnZpY2UgPSB7fTtcblxuICBvcGVuaW5nVGltZXM6IE9wZW5pbmdUaW1lW10gPSBbXTtcblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLm9wZW5pbmdUaW1lcyA9XG4gICAgICB0aGlzLnN0b3JlRGV0YWlscz8ub3BlbmluZ0hvdXJzPy53ZWVrRGF5T3BlbmluZ0xpc3Q/Lm1hcChcbiAgICAgICAgKHsgd2Vla0RheSwgY2xvc2VkLCBvcGVuaW5nVGltZSwgY2xvc2luZ1RpbWUgfSkgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvcGVuaW5nSG91cnM6IGAke29wZW5pbmdUaW1lPy5mb3JtYXR0ZWRIb3VyID8/ICcnfSAtICR7XG4gICAgICAgICAgICAgIGNsb3NpbmdUaW1lPy5mb3JtYXR0ZWRIb3VyID8/ICcnXG4gICAgICAgICAgICB9YCxcbiAgICAgICAgICAgIHdlZWtEYXk6IHdlZWtEYXkgPz8gJycsXG4gICAgICAgICAgICBjbG9zZWQsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgKSA/PyBbXTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImN4LXN0b3JlLXNjaGVkdWxlLWNvbnRhaW5lclwiPlxuICA8ZGl2IGNsYXNzPVwiY3gtc3RvcmUtc2NoZWR1bGUtdGl0bGVcIj5cbiAgICB7eyAnc3RvcmVTY2hlZHVsZS5zdG9yZUhvdXJzJyB8IGN4VHJhbnNsYXRlIH19XG4gIDwvZGl2PlxuICA8ZGl2XG4gICAgY2xhc3M9XCJjeC1zdG9yZS1zY2hlZHVsZS1vcGVuaW5nLXRpbWVzXCJcbiAgICAqbmdGb3I9XCJsZXQgb3BlbmluZ1RpbWUgb2Ygb3BlbmluZ1RpbWVzXCJcbiAgPlxuICAgIDxkaXYgY2xhc3M9XCJjeC1zdG9yZS1zY2hlZHVsZS1kYXktb2Ytd2Vla1wiPnt7IG9wZW5pbmdUaW1lLndlZWtEYXkgfX08L2Rpdj5cbiAgICA8ZGl2ICpuZ0lmPVwiIW9wZW5pbmdUaW1lLmNsb3NlZDsgZWxzZSBjbG9zZWRcIj5cbiAgICAgIHt7IG9wZW5pbmdUaW1lLm9wZW5pbmdIb3VycyB9fVxuICAgIDwvZGl2PlxuICAgIDxuZy10ZW1wbGF0ZSAjY2xvc2VkPnt7XG4gICAgICAnc3RvcmVTY2hlZHVsZS5jbG9zZWQnIHwgY3hUcmFuc2xhdGVcbiAgICB9fTwvbmctdGVtcGxhdGU+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=