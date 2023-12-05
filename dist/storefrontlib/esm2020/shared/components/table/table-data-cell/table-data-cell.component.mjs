/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../../cms-structure/outlet/outlet.model";
export class TableDataCellComponent {
    constructor(outlet) {
        this.outlet = outlet;
    }
    get value() {
        return this.model[this.field];
    }
    get model() {
        return this.outlet?.context;
    }
    get field() {
        return this.outlet?.context?._field;
    }
}
TableDataCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TableDataCellComponent, deps: [{ token: i1.OutletContextData }], target: i0.ɵɵFactoryTarget.Component });
TableDataCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: TableDataCellComponent, selector: "cx-table-data-cell", host: { properties: { "attr.title": "this.value" } }, ngImport: i0, template: `{{ value }}`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TableDataCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'cx-table-data-cell',
                    template: `{{ value }}`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.OutletContextData }]; }, propDecorators: { value: [{
                type: HostBinding,
                args: ['attr.title']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZGF0YS1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL2NvbXBvbmVudHMvdGFibGUvdGFibGUtZGF0YS1jZWxsL3RhYmxlLWRhdGEtY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFTaEYsTUFBTSxPQUFPLHNCQUFzQjtJQUNqQyxZQUFzQixNQUFtRDtRQUFuRCxXQUFNLEdBQU4sTUFBTSxDQUE2QztJQUFHLENBQUM7SUFFN0UsSUFDSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFBYyxLQUFLO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQWMsS0FBSztRQUNqQixPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQztJQUN0QyxDQUFDOzttSEFkVSxzQkFBc0I7dUdBQXRCLHNCQUFzQixnSEFIdkIsYUFBYTsyRkFHWixzQkFBc0I7a0JBTGxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDt3R0FLSyxLQUFLO3NCQURSLFdBQVc7dUJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPdXRsZXRDb250ZXh0RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uL2Ntcy1zdHJ1Y3R1cmUvb3V0bGV0L291dGxldC5tb2RlbCc7XG5pbXBvcnQgeyBUYWJsZUhlYWRlck91dGxldENvbnRleHQgfSBmcm9tICcuLi90YWJsZS5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXRhYmxlLWRhdGEtY2VsbCcsXG4gIHRlbXBsYXRlOiBge3sgdmFsdWUgfX1gLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVGFibGVEYXRhQ2VsbENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBvdXRsZXQ6IE91dGxldENvbnRleHREYXRhPFRhYmxlSGVhZGVyT3V0bGV0Q29udGV4dD4pIHt9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnRpdGxlJylcbiAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWxbdGhpcy5maWVsZF07XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IG1vZGVsKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMub3V0bGV0Py5jb250ZXh0O1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBmaWVsZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm91dGxldD8uY29udGV4dD8uX2ZpZWxkO1xuICB9XG59XG4iXX0=