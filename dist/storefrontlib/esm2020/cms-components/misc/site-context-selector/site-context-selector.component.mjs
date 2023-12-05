/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICON_TYPE } from '../icon/icon.model';
import * as i0 from "@angular/core";
import * as i1 from "./site-context-component.service";
import * as i2 from "@angular/common";
import * as i3 from "../icon/icon.component";
export class SiteContextSelectorComponent {
    constructor(componentService) {
        this.componentService = componentService;
        this.iconTypes = ICON_TYPE;
    }
    get items$() {
        return this.componentService.getItems(this.context);
    }
    get activeItem$() {
        return this.componentService.getActiveItem(this.context);
    }
    set active(value) {
        this.componentService.setActive(value, this.context);
    }
    get label$() {
        return this.componentService.getLabel(this.context);
    }
}
SiteContextSelectorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextSelectorComponent, deps: [{ token: i1.SiteContextComponentService }], target: i0.ɵɵFactoryTarget.Component });
SiteContextSelectorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: SiteContextSelectorComponent, selector: "cx-site-context-selector", inputs: { context: "context" }, ngImport: i0, template: "<label *ngIf=\"(items$ | async)?.length > 1 && (items$ | async) as items\">\n  <span>{{ label$ | async }}:</span>\n  <select (change)=\"active = $any($event).target.value\">\n    <option\n      *ngFor=\"let item of items\"\n      value=\"{{ item.isocode }}\"\n      [selected]=\"(activeItem$ | async) === item.isocode\"\n    >\n      {{ item.label }}\n    </option>\n  </select>\n  <cx-icon [type]=\"iconTypes.CARET_DOWN\" class=\"small\"></cx-icon>\n</label>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextSelectorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-site-context-selector', changeDetection: ChangeDetectionStrategy.OnPush, template: "<label *ngIf=\"(items$ | async)?.length > 1 && (items$ | async) as items\">\n  <span>{{ label$ | async }}:</span>\n  <select (change)=\"active = $any($event).target.value\">\n    <option\n      *ngFor=\"let item of items\"\n      value=\"{{ item.isocode }}\"\n      [selected]=\"(activeItem$ | async) === item.isocode\"\n    >\n      {{ item.label }}\n    </option>\n  </select>\n  <cx-icon [type]=\"iconTypes.CARET_DOWN\" class=\"small\"></cx-icon>\n</label>\n" }]
        }], ctorParameters: function () { return [{ type: i1.SiteContextComponentService }]; }, propDecorators: { context: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS1jb250ZXh0LXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbWlzYy9zaXRlLWNvbnRleHQtc2VsZWN0b3Ivc2l0ZS1jb250ZXh0LXNlbGVjdG9yLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbWlzYy9zaXRlLWNvbnRleHQtc2VsZWN0b3Ivc2l0ZS1jb250ZXh0LXNlbGVjdG9yLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcxRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7O0FBUy9DLE1BQU0sT0FBTyw0QkFBNEI7SUFTdkMsWUFBb0IsZ0JBQTZDO1FBQTdDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBNkI7UUFQakUsY0FBUyxHQUFHLFNBQVMsQ0FBQztJQU84QyxDQUFDO0lBRXJFLElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELElBQUksTUFBTSxDQUFDLEtBQWE7UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RELENBQUM7O3lIQXpCVSw0QkFBNEI7NkdBQTVCLDRCQUE0QixnR0NsQnpDLCtjQWFBOzJGREthLDRCQUE0QjtrQkFMeEMsU0FBUzsrQkFDRSwwQkFBMEIsbUJBRW5CLHVCQUF1QixDQUFDLE1BQU07a0hBU3RDLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaXRlQ29udGV4dCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJQ09OX1RZUEUgfSBmcm9tICcuLi9pY29uL2ljb24ubW9kZWwnO1xuaW1wb3J0IHsgU2l0ZUNvbnRleHRDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi9zaXRlLWNvbnRleHQtY29tcG9uZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgU2l0ZUNvbnRleHRUeXBlIH0gZnJvbSAnLi9zaXRlLWNvbnRleHQubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1zaXRlLWNvbnRleHQtc2VsZWN0b3InLFxuICB0ZW1wbGF0ZVVybDogJy4vc2l0ZS1jb250ZXh0LXNlbGVjdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFNpdGVDb250ZXh0U2VsZWN0b3JDb21wb25lbnQge1xuICBzaXRlQ29udGV4dFNlcnZpY2U6IFNpdGVDb250ZXh0PGFueT47XG4gIGljb25UeXBlcyA9IElDT05fVFlQRTtcbiAgLyoqXG4gICAqIHRoZSBjb250ZXh0IHR5cGUgY2FuIGJlIHNldCBhcyBhbiBpbnB1dC4gSWYgdGhlIGNvbnRleHQgaXNcbiAgICogbm90IGdpdmVuLCB0aGUgY29udGV4dCB3aWxsIGJlIGxvYWRlZCBmcm9tIHRoZSBiYWNrZW5kLlxuICAgKi9cbiAgQElucHV0KCkgY29udGV4dDogU2l0ZUNvbnRleHRUeXBlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50U2VydmljZTogU2l0ZUNvbnRleHRDb21wb25lbnRTZXJ2aWNlKSB7fVxuXG4gIGdldCBpdGVtcyQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnRTZXJ2aWNlLmdldEl0ZW1zKHRoaXMuY29udGV4dCk7XG4gIH1cblxuICBnZXQgYWN0aXZlSXRlbSQoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnRTZXJ2aWNlLmdldEFjdGl2ZUl0ZW0odGhpcy5jb250ZXh0KTtcbiAgfVxuXG4gIHNldCBhY3RpdmUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuY29tcG9uZW50U2VydmljZS5zZXRBY3RpdmUodmFsdWUsIHRoaXMuY29udGV4dCk7XG4gIH1cblxuICBnZXQgbGFiZWwkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50U2VydmljZS5nZXRMYWJlbCh0aGlzLmNvbnRleHQpO1xuICB9XG59XG4iLCI8bGFiZWwgKm5nSWY9XCIoaXRlbXMkIHwgYXN5bmMpPy5sZW5ndGggPiAxICYmIChpdGVtcyQgfCBhc3luYykgYXMgaXRlbXNcIj5cbiAgPHNwYW4+e3sgbGFiZWwkIHwgYXN5bmMgfX06PC9zcGFuPlxuICA8c2VsZWN0IChjaGFuZ2UpPVwiYWN0aXZlID0gJGFueSgkZXZlbnQpLnRhcmdldC52YWx1ZVwiPlxuICAgIDxvcHRpb25cbiAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zXCJcbiAgICAgIHZhbHVlPVwie3sgaXRlbS5pc29jb2RlIH19XCJcbiAgICAgIFtzZWxlY3RlZF09XCIoYWN0aXZlSXRlbSQgfCBhc3luYykgPT09IGl0ZW0uaXNvY29kZVwiXG4gICAgPlxuICAgICAge3sgaXRlbS5sYWJlbCB9fVxuICAgIDwvb3B0aW9uPlxuICA8L3NlbGVjdD5cbiAgPGN4LWljb24gW3R5cGVdPVwiaWNvblR5cGVzLkNBUkVUX0RPV05cIiBjbGFzcz1cInNtYWxsXCI+PC9jeC1pY29uPlxuPC9sYWJlbD5cbiJdfQ==