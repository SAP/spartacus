/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../service/skip-link.service";
import * as i2 from "@angular/common";
import * as i3 from "../../keyboard-focus/focus.directive";
import * as i4 from "@spartacus/core";
export class SkipLinkComponent {
    constructor(skipLinkService) {
        this.skipLinkService = skipLinkService;
        this.skipLinks$ = this.skipLinkService.getSkipLinks();
    }
    scrollToTarget(skipLink) {
        this.skipLinkService.scrollToTarget(skipLink);
    }
}
SkipLinkComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SkipLinkComponent, deps: [{ token: i1.SkipLinkService }], target: i0.ɵɵFactoryTarget.Component });
SkipLinkComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: SkipLinkComponent, selector: "cx-skip-link", ngImport: i0, template: "<div [cxFocus]=\"{ tab: true }\" *ngIf=\"skipLinks$ | async as links\">\n  <button *ngFor=\"let link of links\" (click)=\"scrollToTarget(link)\">\n    {{ 'skipLink.skipTo' | cxTranslate }}\n    {{ link.i18nKey | cxTranslate }}\n  </button>\n</div>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SkipLinkComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-skip-link', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [cxFocus]=\"{ tab: true }\" *ngIf=\"skipLinks$ | async as links\">\n  <button *ngFor=\"let link of links\" (click)=\"scrollToTarget(link)\">\n    {{ 'skipLink.skipTo' | cxTranslate }}\n    {{ link.i18nKey | cxTranslate }}\n  </button>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.SkipLinkService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpcC1saW5rLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvbGF5b3V0L2ExMXkvc2tpcC1saW5rL2NvbXBvbmVudC9za2lwLWxpbmsuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9sYXlvdXQvYTExeS9za2lwLWxpbmsvY29tcG9uZW50L3NraXAtbGluay5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBVW5FLE1BQU0sT0FBTyxpQkFBaUI7SUFHNUIsWUFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBRnBELGVBQVUsR0FBMkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUVsQixDQUFDO0lBRXhELGNBQWMsQ0FBQyxRQUFrQjtRQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRCxDQUFDOzs4R0FQVSxpQkFBaUI7a0dBQWpCLGlCQUFpQixvRENoQjlCLDJQQU1BOzJGRFVhLGlCQUFpQjtrQkFMN0IsU0FBUzsrQkFDRSxjQUFjLG1CQUVQLHVCQUF1QixDQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTa2lwTGluayB9IGZyb20gJy4uL2NvbmZpZy9za2lwLWxpbmsuY29uZmlnJztcbmltcG9ydCB7IFNraXBMaW5rU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2Uvc2tpcC1saW5rLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1za2lwLWxpbmsnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2tpcC1saW5rLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFNraXBMaW5rQ29tcG9uZW50IHtcbiAgc2tpcExpbmtzJDogT2JzZXJ2YWJsZTxTa2lwTGlua1tdPiA9IHRoaXMuc2tpcExpbmtTZXJ2aWNlLmdldFNraXBMaW5rcygpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2tpcExpbmtTZXJ2aWNlOiBTa2lwTGlua1NlcnZpY2UpIHt9XG5cbiAgc2Nyb2xsVG9UYXJnZXQoc2tpcExpbms6IFNraXBMaW5rKTogdm9pZCB7XG4gICAgdGhpcy5za2lwTGlua1NlcnZpY2Uuc2Nyb2xsVG9UYXJnZXQoc2tpcExpbmspO1xuICB9XG59XG4iLCI8ZGl2IFtjeEZvY3VzXT1cInsgdGFiOiB0cnVlIH1cIiAqbmdJZj1cInNraXBMaW5rcyQgfCBhc3luYyBhcyBsaW5rc1wiPlxuICA8YnV0dG9uICpuZ0Zvcj1cImxldCBsaW5rIG9mIGxpbmtzXCIgKGNsaWNrKT1cInNjcm9sbFRvVGFyZ2V0KGxpbmspXCI+XG4gICAge3sgJ3NraXBMaW5rLnNraXBUbycgfCBjeFRyYW5zbGF0ZSB9fVxuICAgIHt7IGxpbmsuaTE4bktleSB8IGN4VHJhbnNsYXRlIH19XG4gIDwvYnV0dG9uPlxuPC9kaXY+XG4iXX0=