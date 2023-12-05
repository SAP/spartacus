/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, Input, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../outlet.service";
export class OutletRefDirective {
    constructor(tpl, outletService) {
        this.tpl = tpl;
        this.outletService = outletService;
    }
    ngOnInit() {
        this.outletService.add(this.cxOutletRef, this.tpl, this.cxOutletPos);
    }
    ngOnDestroy() {
        this.outletService.remove(this.cxOutletRef, this.cxOutletPos, this.tpl);
    }
}
OutletRefDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OutletRefDirective, deps: [{ token: i0.TemplateRef }, { token: i1.OutletService }], target: i0.ɵɵFactoryTarget.Directive });
OutletRefDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: OutletRefDirective, selector: "[cxOutletRef]", inputs: { cxOutletRef: "cxOutletRef", cxOutletPos: "cxOutletPos" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OutletRefDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cxOutletRef]',
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }, { type: i1.OutletService }]; }, propDecorators: { cxOutletRef: [{
                type: Input
            }], cxOutletPos: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGV0LXJlZi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1zdHJ1Y3R1cmUvb3V0bGV0L291dGxldC1yZWYvb3V0bGV0LXJlZi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxHQUlOLE1BQU0sZUFBZSxDQUFDOzs7QUFPdkIsTUFBTSxPQUFPLGtCQUFrQjtJQU03QixZQUNVLEdBQXFCLEVBQ3JCLGFBQTRCO1FBRDVCLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBQ3JCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQ25DLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7K0dBakJVLGtCQUFrQjttR0FBbEIsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBSDlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7aUJBQzFCOzhIQUdDLFdBQVc7c0JBRFYsS0FBSztnQkFHTixXQUFXO3NCQURWLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT3V0bGV0UG9zaXRpb24gfSBmcm9tICcuLi9vdXRsZXQubW9kZWwnO1xuaW1wb3J0IHsgT3V0bGV0U2VydmljZSB9IGZyb20gJy4uL291dGxldC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2N4T3V0bGV0UmVmXScsXG59KVxuZXhwb3J0IGNsYXNzIE91dGxldFJlZkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KClcbiAgY3hPdXRsZXRSZWY6IHN0cmluZztcbiAgQElucHV0KClcbiAgY3hPdXRsZXRQb3M6IE91dGxldFBvc2l0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdHBsOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgIHByaXZhdGUgb3V0bGV0U2VydmljZTogT3V0bGV0U2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vdXRsZXRTZXJ2aWNlLmFkZCh0aGlzLmN4T3V0bGV0UmVmLCB0aGlzLnRwbCwgdGhpcy5jeE91dGxldFBvcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLm91dGxldFNlcnZpY2UucmVtb3ZlKHRoaXMuY3hPdXRsZXRSZWYsIHRoaXMuY3hPdXRsZXRQb3MsIHRoaXMudHBsKTtcbiAgfVxufVxuIl19