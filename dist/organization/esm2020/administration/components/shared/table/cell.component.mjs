/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
import * as i4 from "@spartacus/core";
export class CellComponent {
    constructor(outlet) {
        this.outlet = outlet;
    }
    get tabIndex() {
        return -1;
    }
    get model() {
        return this.outlet.context;
    }
    get property() {
        return this.model?.[this.outlet?.context?._field];
    }
    /**
     * Indicates wether the cell is linkable.
     *
     * If the cells is linkable, an anchor link is created to the detailed route
     * of the given `_type`.
     *
     * Defaults to `true`.
     */
    get linkable() {
        return this.property !== undefined && (this.cellOptions.linkable ?? true);
    }
    /**
     * Helper method to access the cell options.
     */
    get cellOptions() {
        return (this.outlet.context?._options?.cells?.[this.outlet.context?._field] ?? {});
    }
    /**
     * Generates the configurable route to the detail page of the given context item.
     */
    get route() {
        return this.outlet.context._type + 'Details';
    }
    get routeModel() {
        return this.outlet.context;
    }
    get type() {
        return this.model._type;
    }
    /**
     * Indicates whether the item is loaded.
     */
    get hasItem() {
        return !!this.item && Object.keys(this.item).length > 0;
    }
    get item() {
        if (!this.outlet.context) {
            return null;
        }
        const { _field, _options, _type, _i18nRoot, ...all } = this.outlet.context;
        return all;
    }
}
CellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CellComponent, deps: [{ token: i1.OutletContextData }], target: i0.ɵɵFactoryTarget.Component });
CellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CellComponent, selector: "cx-org-cell", ngImport: i0, template: "<a\n  *ngIf=\"linkable; else text\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabIndex]=\"tabIndex\"\n>\n  <ng-container *ngTemplateOutlet=\"text\"></ng-container>\n</a>\n\n<ng-template #text>\n  <span class=\"text\" title=\"{{ property }}\">{{ property }}</span>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i3.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i4.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-cell', changeDetection: ChangeDetectionStrategy.OnPush, template: "<a\n  *ngIf=\"linkable; else text\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabIndex]=\"tabIndex\"\n>\n  <ng-container *ngTemplateOutlet=\"text\"></ng-container>\n</a>\n\n<ng-template #text>\n  <span class=\"text\" title=\"{{ property }}\">{{ property }}</span>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.OutletContextData }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvc2hhcmVkL3RhYmxlL2NlbGwuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3NoYXJlZC90YWJsZS9jZWxsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFZbkUsTUFBTSxPQUFPLGFBQWE7SUFDeEIsWUFBc0IsTUFBaUQ7UUFBakQsV0FBTSxHQUFOLE1BQU0sQ0FBMkM7SUFBRyxDQUFDO0lBRTNFLElBQUksUUFBUTtRQUNWLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDWixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxXQUFXO1FBQ2IsT0FBTyxDQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQzFFLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7SUFDL0MsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxPQUFPO1FBQ1QsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxJQUFjLElBQUk7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ3hCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEdBQUcsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDM0UsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDOzswR0FoRVUsYUFBYTs4RkFBYixhQUFhLG1EQ2xCMUIsd1RBV0E7MkZET2EsYUFBYTtrQkFMekIsU0FBUzsrQkFDRSxhQUFhLG1CQUVOLHVCQUF1QixDQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBPdXRsZXRDb250ZXh0RGF0YSxcbiAgVGFibGVEYXRhT3V0bGV0Q29udGV4dCxcbiAgVGFibGVGaWVsZE9wdGlvbnMsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LW9yZy1jZWxsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NlbGwuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ2VsbENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBvdXRsZXQ6IE91dGxldENvbnRleHREYXRhPFRhYmxlRGF0YU91dGxldENvbnRleHQ+KSB7fVxuXG4gIGdldCB0YWJJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIGdldCBtb2RlbCgpOiBUYWJsZURhdGFPdXRsZXRDb250ZXh0IHtcbiAgICByZXR1cm4gdGhpcy5vdXRsZXQuY29udGV4dDtcbiAgfVxuXG4gIGdldCBwcm9wZXJ0eSgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLm1vZGVsPy5bdGhpcy5vdXRsZXQ/LmNvbnRleHQ/Ll9maWVsZF07XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdldGhlciB0aGUgY2VsbCBpcyBsaW5rYWJsZS5cbiAgICpcbiAgICogSWYgdGhlIGNlbGxzIGlzIGxpbmthYmxlLCBhbiBhbmNob3IgbGluayBpcyBjcmVhdGVkIHRvIHRoZSBkZXRhaWxlZCByb3V0ZVxuICAgKiBvZiB0aGUgZ2l2ZW4gYF90eXBlYC5cbiAgICpcbiAgICogRGVmYXVsdHMgdG8gYHRydWVgLlxuICAgKi9cbiAgZ2V0IGxpbmthYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnByb3BlcnR5ICE9PSB1bmRlZmluZWQgJiYgKHRoaXMuY2VsbE9wdGlvbnMubGlua2FibGUgPz8gdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIG1ldGhvZCB0byBhY2Nlc3MgdGhlIGNlbGwgb3B0aW9ucy5cbiAgICovXG4gIGdldCBjZWxsT3B0aW9ucygpOiBUYWJsZUZpZWxkT3B0aW9ucyB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMub3V0bGV0LmNvbnRleHQ/Ll9vcHRpb25zPy5jZWxscz8uW3RoaXMub3V0bGV0LmNvbnRleHQ/Ll9maWVsZF0gPz8ge31cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyB0aGUgY29uZmlndXJhYmxlIHJvdXRlIHRvIHRoZSBkZXRhaWwgcGFnZSBvZiB0aGUgZ2l2ZW4gY29udGV4dCBpdGVtLlxuICAgKi9cbiAgZ2V0IHJvdXRlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMub3V0bGV0LmNvbnRleHQuX3R5cGUgKyAnRGV0YWlscyc7XG4gIH1cblxuICBnZXQgcm91dGVNb2RlbCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLm91dGxldC5jb250ZXh0O1xuICB9XG5cbiAgZ2V0IHR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbC5fdHlwZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgaXRlbSBpcyBsb2FkZWQuXG4gICAqL1xuICBnZXQgaGFzSXRlbSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLml0ZW0gJiYgT2JqZWN0LmtleXModGhpcy5pdGVtKS5sZW5ndGggPiAwO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBpdGVtKCk6IGFueSB7XG4gICAgaWYgKCF0aGlzLm91dGxldC5jb250ZXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgeyBfZmllbGQsIF9vcHRpb25zLCBfdHlwZSwgX2kxOG5Sb290LCAuLi5hbGwgfSA9IHRoaXMub3V0bGV0LmNvbnRleHQ7XG4gICAgcmV0dXJuIGFsbDtcbiAgfVxufVxuIiwiPGFcbiAgKm5nSWY9XCJsaW5rYWJsZTsgZWxzZSB0ZXh0XCJcbiAgW3JvdXRlckxpbmtdPVwieyBjeFJvdXRlOiByb3V0ZSwgcGFyYW1zOiByb3V0ZU1vZGVsIH0gfCBjeFVybFwiXG4gIFt0YWJJbmRleF09XCJ0YWJJbmRleFwiXG4+XG4gIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZXh0XCI+PC9uZy1jb250YWluZXI+XG48L2E+XG5cbjxuZy10ZW1wbGF0ZSAjdGV4dD5cbiAgPHNwYW4gY2xhc3M9XCJ0ZXh0XCIgdGl0bGU9XCJ7eyBwcm9wZXJ0eSB9fVwiPnt7IHByb3BlcnR5IH19PC9zcGFuPlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==