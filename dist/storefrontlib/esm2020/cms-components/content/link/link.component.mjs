/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../../cms-structure/page/model/cms-component-data";
import * as i2 from "@angular/common";
import * as i3 from "../../../shared/components/generic-link/generic-link.component";
export class LinkComponent {
    constructor(component) {
        this.component = component;
        this.data$ = this.component.data$.pipe(tap((data) => (this.styleClasses = data?.styleClasses)));
    }
    /**
     * Returns `_blank` to force opening the link in a new window whenever the
     * `data.target` flag is set to `true`.
     */
    getTarget(data) {
        return data.target === 'true' || data.target === true ? '_blank' : null;
    }
}
LinkComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LinkComponent, deps: [{ token: i1.CmsComponentData }], target: i0.ɵɵFactoryTarget.Component });
LinkComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: LinkComponent, selector: "cx-link", host: { properties: { "class": "this.styleClasses" } }, ngImport: i0, template: "<cx-generic-link\n  *ngIf=\"data$ | async as data\"\n  [url]=\"data.url ?? ''\"\n  [style]=\"data.styleAttributes\"\n  [target]=\"getTarget(data)\"\n  >{{ data.linkName }}</cx-generic-link\n>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.GenericLinkComponent, selector: "cx-generic-link", inputs: ["url", "target", "id", "class", "style", "title"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LinkComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-link', changeDetection: ChangeDetectionStrategy.OnPush, template: "<cx-generic-link\n  *ngIf=\"data$ | async as data\"\n  [url]=\"data.url ?? ''\"\n  [style]=\"data.styleAttributes\"\n  [target]=\"getTarget(data)\"\n  >{{ data.linkName }}</cx-generic-link\n>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CmsComponentData }]; }, propDecorators: { styleClasses: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL2NvbnRlbnQvbGluay9saW5rLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvY29udGVudC9saW5rL2xpbmsuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR2hGLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFRckMsTUFBTSxPQUFPLGFBQWE7SUFPeEIsWUFBc0IsU0FBNkM7UUFBN0MsY0FBUyxHQUFULFNBQVMsQ0FBb0M7UUFKbkUsVUFBSyxHQUFpQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQzdELEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUN4RCxDQUFDO0lBRW9FLENBQUM7SUFFdkU7OztPQUdHO0lBQ0gsU0FBUyxDQUFDLElBQXNCO1FBQzlCLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzFFLENBQUM7OzBHQWZVLGFBQWE7OEZBQWIsYUFBYSx1R0NqQjFCLG1NQU9BOzJGRFVhLGFBQWE7a0JBTHpCLFNBQVM7K0JBQ0UsU0FBUyxtQkFFRix1QkFBdUIsQ0FBQyxNQUFNO3VHQUd6QixZQUFZO3NCQUFqQyxXQUFXO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ21zTGlua0NvbXBvbmVudCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDbXNDb21wb25lbnREYXRhIH0gZnJvbSAnLi4vLi4vLi4vY21zLXN0cnVjdHVyZS9wYWdlL21vZGVsL2Ntcy1jb21wb25lbnQtZGF0YSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWxpbmsnLFxuICB0ZW1wbGF0ZVVybDogJy4vbGluay5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBMaW5rQ29tcG9uZW50IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIHN0eWxlQ2xhc3Nlczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIGRhdGEkOiBPYnNlcnZhYmxlPENtc0xpbmtDb21wb25lbnQ+ID0gdGhpcy5jb21wb25lbnQuZGF0YSQucGlwZShcbiAgICB0YXAoKGRhdGEpID0+ICh0aGlzLnN0eWxlQ2xhc3NlcyA9IGRhdGE/LnN0eWxlQ2xhc3NlcykpXG4gICk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNvbXBvbmVudDogQ21zQ29tcG9uZW50RGF0YTxDbXNMaW5rQ29tcG9uZW50Pikge31cblxuICAvKipcbiAgICogUmV0dXJucyBgX2JsYW5rYCB0byBmb3JjZSBvcGVuaW5nIHRoZSBsaW5rIGluIGEgbmV3IHdpbmRvdyB3aGVuZXZlciB0aGVcbiAgICogYGRhdGEudGFyZ2V0YCBmbGFnIGlzIHNldCB0byBgdHJ1ZWAuXG4gICAqL1xuICBnZXRUYXJnZXQoZGF0YTogQ21zTGlua0NvbXBvbmVudCk6IHN0cmluZyB8IG51bGwge1xuICAgIHJldHVybiBkYXRhLnRhcmdldCA9PT0gJ3RydWUnIHx8IGRhdGEudGFyZ2V0ID09PSB0cnVlID8gJ19ibGFuaycgOiBudWxsO1xuICB9XG59XG4iLCI8Y3gtZ2VuZXJpYy1saW5rXG4gICpuZ0lmPVwiZGF0YSQgfCBhc3luYyBhcyBkYXRhXCJcbiAgW3VybF09XCJkYXRhLnVybCA/PyAnJ1wiXG4gIFtzdHlsZV09XCJkYXRhLnN0eWxlQXR0cmlidXRlc1wiXG4gIFt0YXJnZXRdPVwiZ2V0VGFyZ2V0KGRhdGEpXCJcbiAgPnt7IGRhdGEubGlua05hbWUgfX08L2N4LWdlbmVyaWMtbGlua1xuPlxuIl19