/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../../cms-structure/outlet/outlet.model";
import * as i2 from "@spartacus/core";
export class TableHeaderCellComponent {
    constructor(outlet) {
        this.outlet = outlet;
    }
    /**
     * Returns the static label for the given field, if available.
     */
    get header() {
        if (typeof this.fieldOptions?.label === 'string') {
            return this.fieldOptions.label;
        }
    }
    /**
     * Returns the localized label for the given field.
     *
     * The localized label is either driven by the configured `label.i18nKey`
     * or concatenated by the table `type` and field `key`:
     *
     * `[tableType].[fieldKey]`
     *
     * The localized header can be translated with the `cxTranslate` pipe or `TranslationService`.
     */
    get localizedHeader() {
        return (this.fieldOptions?.label?.i18nKey ||
            `${this.i18nRoot}.${this.field}`);
    }
    get fieldOptions() {
        return this.outlet?.context._options?.cells?.[this.field];
    }
    get field() {
        return this.outlet?.context?._field;
    }
    get type() {
        return this.outlet?.context?._type;
    }
    get i18nRoot() {
        return this.outlet?.context?._i18nRoot;
    }
}
TableHeaderCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TableHeaderCellComponent, deps: [{ token: i1.OutletContextData }], target: i0.ɵɵFactoryTarget.Component });
TableHeaderCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: TableHeaderCellComponent, selector: "cx-table-header-cell", ngImport: i0, template: `{{ header || (localizedHeader | cxTranslate) }}`, isInline: true, dependencies: [{ kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TableHeaderCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'cx-table-header-cell',
                    template: `{{ header || (localizedHeader | cxTranslate) }}`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.OutletContextData }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtaGVhZGVyLWNlbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy90YWJsZS90YWJsZS1oZWFkZXItY2VsbC90YWJsZS1oZWFkZXItY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFhbkUsTUFBTSxPQUFPLHdCQUF3QjtJQUNuQyxZQUFzQixNQUFtRDtRQUFuRCxXQUFNLEdBQU4sTUFBTSxDQUE2QztJQUFHLENBQUM7SUFFN0U7O09BRUc7SUFDSCxJQUFJLE1BQU07UUFDUixJQUFJLE9BQU8sSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQ2hELE9BQWUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxlQUFlO1FBQ2pCLE9BQU8sQ0FDSixJQUFJLENBQUMsWUFBWSxFQUFFLEtBQXFCLEVBQUUsT0FBTztZQUNsRCxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUNqQyxDQUFDO0lBQ0osQ0FBQztJQUVELElBQWMsWUFBWTtRQUN4QixPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELElBQWMsS0FBSztRQUNqQixPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQztJQUN0QyxDQUFDO0lBRUQsSUFBYyxJQUFJO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFjLFFBQVE7UUFDcEIsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUM7SUFDekMsQ0FBQzs7cUhBM0NVLHdCQUF3Qjt5R0FBeEIsd0JBQXdCLDREQUh6QixpREFBaUQ7MkZBR2hELHdCQUF3QjtrQkFMcEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsaURBQWlEO29CQUMzRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPdXRsZXRDb250ZXh0RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uL2Ntcy1zdHJ1Y3R1cmUvb3V0bGV0L291dGxldC5tb2RlbCc7XG5pbXBvcnQge1xuICBUYWJsZUZpZWxkT3B0aW9ucyxcbiAgVGFibGVIZWFkZXIsXG4gIFRhYmxlSGVhZGVyT3V0bGV0Q29udGV4dCxcbn0gZnJvbSAnLi4vdGFibGUubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC10YWJsZS1oZWFkZXItY2VsbCcsXG4gIHRlbXBsYXRlOiBge3sgaGVhZGVyIHx8IChsb2NhbGl6ZWRIZWFkZXIgfCBjeFRyYW5zbGF0ZSkgfX1gLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVGFibGVIZWFkZXJDZWxsQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIG91dGxldDogT3V0bGV0Q29udGV4dERhdGE8VGFibGVIZWFkZXJPdXRsZXRDb250ZXh0Pikge31cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc3RhdGljIGxhYmVsIGZvciB0aGUgZ2l2ZW4gZmllbGQsIGlmIGF2YWlsYWJsZS5cbiAgICovXG4gIGdldCBoZWFkZXIoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuZmllbGRPcHRpb25zPy5sYWJlbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiA8c3RyaW5nPnRoaXMuZmllbGRPcHRpb25zLmxhYmVsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsb2NhbGl6ZWQgbGFiZWwgZm9yIHRoZSBnaXZlbiBmaWVsZC5cbiAgICpcbiAgICogVGhlIGxvY2FsaXplZCBsYWJlbCBpcyBlaXRoZXIgZHJpdmVuIGJ5IHRoZSBjb25maWd1cmVkIGBsYWJlbC5pMThuS2V5YFxuICAgKiBvciBjb25jYXRlbmF0ZWQgYnkgdGhlIHRhYmxlIGB0eXBlYCBhbmQgZmllbGQgYGtleWA6XG4gICAqXG4gICAqIGBbdGFibGVUeXBlXS5bZmllbGRLZXldYFxuICAgKlxuICAgKiBUaGUgbG9jYWxpemVkIGhlYWRlciBjYW4gYmUgdHJhbnNsYXRlZCB3aXRoIHRoZSBgY3hUcmFuc2xhdGVgIHBpcGUgb3IgYFRyYW5zbGF0aW9uU2VydmljZWAuXG4gICAqL1xuICBnZXQgbG9jYWxpemVkSGVhZGVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLmZpZWxkT3B0aW9ucz8ubGFiZWwgYXMgVGFibGVIZWFkZXIpPy5pMThuS2V5IHx8XG4gICAgICBgJHt0aGlzLmkxOG5Sb290fS4ke3RoaXMuZmllbGR9YFxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IGZpZWxkT3B0aW9ucygpOiBUYWJsZUZpZWxkT3B0aW9ucyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMub3V0bGV0Py5jb250ZXh0Ll9vcHRpb25zPy5jZWxscz8uW3RoaXMuZmllbGRdO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBmaWVsZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm91dGxldD8uY29udGV4dD8uX2ZpZWxkO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCB0eXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMub3V0bGV0Py5jb250ZXh0Py5fdHlwZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgaTE4blJvb3QoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5vdXRsZXQ/LmNvbnRleHQ/Ll9pMThuUm9vdDtcbiAgfVxufVxuIl19