/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, isDevMode, Output, } from '@angular/core';
import { TableLayout, } from './table.model';
import * as i0 from "@angular/core";
import * as i1 from "./table-renderer.service";
import * as i2 from "@angular/common";
import * as i3 from "../../../cms-structure/outlet/outlet.directive";
/**
 * The table component provides a generic table DOM structure, with 3 layout types:
 * horizontal, vertical and _stacked vertical_ layout. The layout is driven by the
 * table structure.
 *
 * The implementation is fairly "dumb" and only renders string based content for TH
 * and TD elements. The actual cell rendering is delegated to a (configurable) cell
 * component. Additionally, each cell is registered as an outlet, so that customizations
 * can be done by both outlet templates and components.
 *
 * The outlet references are concatenated from the table `type` and header `key`. The
 * following snippet shows an outlet generated for a table header, for the table type
 * "cost-center" with a header key "name":
 *
 * ```
 * <th>
 *   <template cxOutlet="table.cost-center.header.name">
 *   </template>
 * </th>
 * ```
 *
 * Similarly, the data cells (`<td>`) are generated with the outlet template reference
 * `table.cost-center.data.name`.
 */
export class TableComponent {
    set structure(structure) {
        this._structure = structure;
        this.init();
    }
    get structure() {
        return this._structure;
    }
    constructor(rendererService) {
        this.rendererService = rendererService;
        this.launch = new EventEmitter();
    }
    init() {
        this.verticalLayout = !this.layout || this.layout === TableLayout.VERTICAL;
        this.verticalStackedLayout = this.layout === TableLayout.VERTICAL_STACKED;
        this.horizontalLayout = this.layout === TableLayout.HORIZONTAL;
        this.rendererService.add(this.structure);
        this.addTableDebugInfo();
    }
    launchItem(item) {
        this.launch.emit(item);
    }
    /**
     * Indicates whether the given item is the current item.
     *
     * The current item is driven by the `currentItem`, that holds a
     * property and value to compare.
     */
    isCurrentItem(item) {
        if (!this.currentItem || !this.currentItem.value) {
            return false;
        }
        return this.currentItem?.value === item?.[this.currentItem?.property];
    }
    /**
     * Returns the header (th) outlet reference for the given field.
     */
    getHeaderOutletRef(field) {
        return this.rendererService.getHeaderOutletRef(this.type, field);
    }
    /**
     * Returns the header (th) outlet context for the given field.
     */
    getHeaderOutletContext(field) {
        return this.rendererService.getHeaderOutletContext(this.type, this.options, this.i18nRoot, field);
    }
    /**
     * Returns the data (td) outlet reference for the given field.
     */
    getDataOutletRef(field) {
        return this.rendererService.getDataOutletRef(this.type, field);
    }
    /**
     * Returns the data (td) outlet context for the given field.
     */
    getDataOutletContext(field, data) {
        return this.rendererService.getDataOutletContext(this.type, this.options, this.i18nRoot, field, data);
    }
    trackData(_i, item) {
        return JSON.stringify(item);
    }
    /**
     * Generates the table type into the UI in devMode, so that developers
     * can easily get the notion of the table type.
     */
    addTableDebugInfo() {
        if (isDevMode() && this.type) {
            this.tableType = this.type;
        }
    }
    /**
     * Helper method to return the deeply nested orientation configuration.
     */
    get layout() {
        return this.structure?.options?.layout;
    }
    /**
     * Helper method to return the deeply nested type.
     */
    get type() {
        return this.structure?.type;
    }
    get options() {
        return this.structure?.options;
    }
}
TableComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TableComponent, deps: [{ token: i1.TableRendererService }], target: i0.ɵɵFactoryTarget.Component });
TableComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: TableComponent, selector: "cx-table", inputs: { structure: "structure", data: "data", i18nRoot: "i18nRoot", currentItem: "currentItem" }, outputs: { launch: "launch" }, host: { properties: { "attr.__cx-table-type": "this.tableType", "class.horizontal": "this.horizontalLayout", "class.vertical": "this.verticalLayout", "class.vertical-stacked": "this.verticalStackedLayout" } }, ngImport: i0, template: "<table *ngIf=\"structure\">\n  <ng-container *ngIf=\"verticalStackedLayout\">\n    <tbody\n      *ngFor=\"let item of data; trackBy: trackData\"\n      (click)=\"launchItem(item)\"\n      [class.is-current]=\"isCurrentItem(item)\"\n    >\n      <tr *ngFor=\"let cell of structure.cells\" [class]=\"cell\">\n        <th>\n          <ng-template\n            [cxOutlet]=\"getHeaderOutletRef(cell)\"\n            [cxOutletContext]=\"getHeaderOutletContext(cell)\"\n          >\n            {{ cell }}\n          </ng-template>\n        </th>\n        <td>\n          <ng-template\n            [cxOutlet]=\"getDataOutletRef(cell)\"\n            [cxOutletContext]=\"getDataOutletContext(cell, item)\"\n          >\n            {{ $any(item)[cell] }}\n          </ng-template>\n        </td>\n      </tr>\n    </tbody>\n  </ng-container>\n\n  <!-- vertical tables render the item  -->\n  <ng-container *ngIf=\"verticalLayout\">\n    <thead>\n      <tr>\n        <th scope=\"col\" *ngFor=\"let cell of structure.cells\" [class]=\"cell\">\n          <ng-template\n            [cxOutlet]=\"getHeaderOutletRef(cell)\"\n            [cxOutletContext]=\"getHeaderOutletContext(cell)\"\n          >\n            {{ cell }}\n          </ng-template>\n        </th>\n      </tr>\n    </thead>\n\n    <tr\n      *ngFor=\"let item of data; trackBy: trackData\"\n      [class.is-current]=\"isCurrentItem(item)\"\n      (click)=\"launchItem(item)\"\n    >\n      <td *ngFor=\"let cell of structure.cells; let i = index\" [class]=\"cell\">\n        <ng-template\n          [cxOutlet]=\"getDataOutletRef(cell)\"\n          [cxOutletContext]=\"getDataOutletContext(cell, item)\"\n        >\n          {{ $any(item)[cell] }}\n        </ng-template>\n      </td>\n    </tr>\n  </ng-container>\n\n  <ng-container *ngIf=\"horizontalLayout\">\n    <tr *ngFor=\"let cell of structure.cells\" [class]=\"cell\">\n      <th scope=\"col\">\n        <ng-template\n          [cxOutlet]=\"getHeaderOutletRef(cell)\"\n          [cxOutletContext]=\"getHeaderOutletContext(cell)\"\n        >\n          {{ cell }}\n        </ng-template>\n      </th>\n      <td\n        *ngFor=\"let item of data; trackBy: trackData\"\n        [class.is-current]=\"isCurrentItem(item)\"\n        (click)=\"launchItem(item)\"\n      >\n        <ng-template\n          [cxOutlet]=\"getDataOutletRef(cell)\"\n          [cxOutletContext]=\"getDataOutletContext(cell, item)\"\n        >\n          {{ $any(item)[cell] }}\n        </ng-template>\n      </td>\n    </tr>\n  </ng-container>\n</table>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer", "cxComponentRef"], outputs: ["loaded", "cxComponentRefChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-table', changeDetection: ChangeDetectionStrategy.OnPush, template: "<table *ngIf=\"structure\">\n  <ng-container *ngIf=\"verticalStackedLayout\">\n    <tbody\n      *ngFor=\"let item of data; trackBy: trackData\"\n      (click)=\"launchItem(item)\"\n      [class.is-current]=\"isCurrentItem(item)\"\n    >\n      <tr *ngFor=\"let cell of structure.cells\" [class]=\"cell\">\n        <th>\n          <ng-template\n            [cxOutlet]=\"getHeaderOutletRef(cell)\"\n            [cxOutletContext]=\"getHeaderOutletContext(cell)\"\n          >\n            {{ cell }}\n          </ng-template>\n        </th>\n        <td>\n          <ng-template\n            [cxOutlet]=\"getDataOutletRef(cell)\"\n            [cxOutletContext]=\"getDataOutletContext(cell, item)\"\n          >\n            {{ $any(item)[cell] }}\n          </ng-template>\n        </td>\n      </tr>\n    </tbody>\n  </ng-container>\n\n  <!-- vertical tables render the item  -->\n  <ng-container *ngIf=\"verticalLayout\">\n    <thead>\n      <tr>\n        <th scope=\"col\" *ngFor=\"let cell of structure.cells\" [class]=\"cell\">\n          <ng-template\n            [cxOutlet]=\"getHeaderOutletRef(cell)\"\n            [cxOutletContext]=\"getHeaderOutletContext(cell)\"\n          >\n            {{ cell }}\n          </ng-template>\n        </th>\n      </tr>\n    </thead>\n\n    <tr\n      *ngFor=\"let item of data; trackBy: trackData\"\n      [class.is-current]=\"isCurrentItem(item)\"\n      (click)=\"launchItem(item)\"\n    >\n      <td *ngFor=\"let cell of structure.cells; let i = index\" [class]=\"cell\">\n        <ng-template\n          [cxOutlet]=\"getDataOutletRef(cell)\"\n          [cxOutletContext]=\"getDataOutletContext(cell, item)\"\n        >\n          {{ $any(item)[cell] }}\n        </ng-template>\n      </td>\n    </tr>\n  </ng-container>\n\n  <ng-container *ngIf=\"horizontalLayout\">\n    <tr *ngFor=\"let cell of structure.cells\" [class]=\"cell\">\n      <th scope=\"col\">\n        <ng-template\n          [cxOutlet]=\"getHeaderOutletRef(cell)\"\n          [cxOutletContext]=\"getHeaderOutletContext(cell)\"\n        >\n          {{ cell }}\n        </ng-template>\n      </th>\n      <td\n        *ngFor=\"let item of data; trackBy: trackData\"\n        [class.is-current]=\"isCurrentItem(item)\"\n        (click)=\"launchItem(item)\"\n      >\n        <ng-template\n          [cxOutlet]=\"getDataOutletRef(cell)\"\n          [cxOutletContext]=\"getDataOutletContext(cell, item)\"\n        >\n          {{ $any(item)[cell] }}\n        </ng-template>\n      </td>\n    </tr>\n  </ng-container>\n</table>\n" }]
        }], ctorParameters: function () { return [{ type: i1.TableRendererService }]; }, propDecorators: { tableType: [{
                type: HostBinding,
                args: ['attr.__cx-table-type']
            }], horizontalLayout: [{
                type: HostBinding,
                args: ['class.horizontal']
            }], verticalLayout: [{
                type: HostBinding,
                args: ['class.vertical']
            }], verticalStackedLayout: [{
                type: HostBinding,
                args: ['class.vertical-stacked']
            }], structure: [{
                type: Input
            }], data: [{
                type: Input
            }], i18nRoot: [{
                type: Input
            }], currentItem: [{
                type: Input
            }], launch: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy90YWJsZS90YWJsZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL3RhYmxlL3RhYmxlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxFQUNYLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFHTCxXQUFXLEdBR1osTUFBTSxlQUFlLENBQUM7Ozs7O0FBRXZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQU1ILE1BQU0sT0FBTyxjQUFjO0lBT3pCLElBQWEsU0FBUyxDQUFDLFNBQXlCO1FBQzlDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFDRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQW9CRCxZQUFzQixlQUFxQztRQUFyQyxvQkFBZSxHQUFmLGVBQWUsQ0FBc0I7UUFGakQsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFd0IsQ0FBQztJQUUvRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBQzNFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsTUFBTSxLQUFLLFdBQVcsQ0FBQyxnQkFBZ0Is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O2dCQVFHLElBQUk7c0JBQVosS0FBSztnQkFNRyxRQUFRO3NCQUFoQixLQUFLO2dCQVFHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBRUksTUFBTTtzQkFBZixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIGlzRGV2TW9kZSxcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRhYmxlUmVuZGVyZXJTZXJ2aWNlIH0gZnJvbSAnLi90YWJsZS1yZW5kZXJlci5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIFRhYmxlRGF0YU91dGxldENvbnRleHQsXG4gIFRhYmxlSGVhZGVyT3V0bGV0Q29udGV4dCxcbiAgVGFibGVMYXlvdXQsXG4gIFRhYmxlT3B0aW9ucyxcbiAgVGFibGVTdHJ1Y3R1cmUsXG59IGZyb20gJy4vdGFibGUubW9kZWwnO1xuXG4vKipcbiAqIFRoZSB0YWJsZSBjb21wb25lbnQgcHJvdmlkZXMgYSBnZW5lcmljIHRhYmxlIERPTSBzdHJ1Y3R1cmUsIHdpdGggMyBsYXlvdXQgdHlwZXM6XG4gKiBob3Jpem9udGFsLCB2ZXJ0aWNhbCBhbmQgX3N0YWNrZWQgdmVydGljYWxfIGxheW91dC4gVGhlIGxheW91dCBpcyBkcml2ZW4gYnkgdGhlXG4gKiB0YWJsZSBzdHJ1Y3R1cmUuXG4gKlxuICogVGhlIGltcGxlbWVudGF0aW9uIGlzIGZhaXJseSBcImR1bWJcIiBhbmQgb25seSByZW5kZXJzIHN0cmluZyBiYXNlZCBjb250ZW50IGZvciBUSFxuICogYW5kIFREIGVsZW1lbnRzLiBUaGUgYWN0dWFsIGNlbGwgcmVuZGVyaW5nIGlzIGRlbGVnYXRlZCB0byBhIChjb25maWd1cmFibGUpIGNlbGxcbiAqIGNvbXBvbmVudC4gQWRkaXRpb25hbGx5LCBlYWNoIGNlbGwgaXMgcmVnaXN0ZXJlZCBhcyBhbiBvdXRsZXQsIHNvIHRoYXQgY3VzdG9taXphdGlvbnNcbiAqIGNhbiBiZSBkb25lIGJ5IGJvdGggb3V0bGV0IHRlbXBsYXRlcyBhbmQgY29tcG9uZW50cy5cbiAqXG4gKiBUaGUgb3V0bGV0IHJlZmVyZW5jZXMgYXJlIGNvbmNhdGVuYXRlZCBmcm9tIHRoZSB0YWJsZSBgdHlwZWAgYW5kIGhlYWRlciBga2V5YC4gVGhlXG4gKiBmb2xsb3dpbmcgc25pcHBldCBzaG93cyBhbiBvdXRsZXQgZ2VuZXJhdGVkIGZvciBhIHRhYmxlIGhlYWRlciwgZm9yIHRoZSB0YWJsZSB0eXBlXG4gKiBcImNvc3QtY2VudGVyXCIgd2l0aCBhIGhlYWRlciBrZXkgXCJuYW1lXCI6XG4gKlxuICogYGBgXG4gKiA8dGg+XG4gKiAgIDx0ZW1wbGF0ZSBjeE91dGxldD1cInRhYmxlLmNvc3QtY2VudGVyLmhlYWRlci5uYW1lXCI+XG4gKiAgIDwvdGVtcGxhdGU+XG4gKiA8L3RoPlxuICogYGBgXG4gKlxuICogU2ltaWxhcmx5LCB0aGUgZGF0YSBjZWxscyAoYDx0ZD5gKSBhcmUgZ2VuZXJhdGVkIHdpdGggdGhlIG91dGxldCB0ZW1wbGF0ZSByZWZlcmVuY2VcbiAqIGB0YWJsZS5jb3N0LWNlbnRlci5kYXRhLm5hbWVgLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC10YWJsZScsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZUNvbXBvbmVudDxUPiB7XG4gIEBIb3N0QmluZGluZygnYXR0ci5fX2N4LXRhYmxlLXR5cGUnKSB0YWJsZVR5cGU6IHN0cmluZztcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5ob3Jpem9udGFsJykgaG9yaXpvbnRhbExheW91dDogYm9vbGVhbjtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy52ZXJ0aWNhbCcpIHZlcnRpY2FsTGF5b3V0OiBib29sZWFuO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnZlcnRpY2FsLXN0YWNrZWQnKSB2ZXJ0aWNhbFN0YWNrZWRMYXlvdXQ6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBfc3RydWN0dXJlOiBUYWJsZVN0cnVjdHVyZTtcbiAgQElucHV0KCkgc2V0IHN0cnVjdHVyZShzdHJ1Y3R1cmU6IFRhYmxlU3RydWN0dXJlKSB7XG4gICAgdGhpcy5fc3RydWN0dXJlID0gc3RydWN0dXJlO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG4gIGdldCBzdHJ1Y3R1cmUoKTogVGFibGVTdHJ1Y3R1cmUge1xuICAgIHJldHVybiB0aGlzLl9zdHJ1Y3R1cmU7XG4gIH1cblxuICBASW5wdXQoKSBkYXRhOiBUW107XG5cbiAgLyoqXG4gICAqIFRoZSBpMThuUm9vdCBpcyBwYXNzZWQgaW50byB0aGUgdGFibGUgY2VsbCBjb250ZXh0LCBzbyB0aGF0XG4gICAqIGNlbGwgY29tcG9uZW50cyBjYW4gY29uY2F0ZW5hdGUgdGhlIGkxOG4gcm9vdCBhbmQgbGFiZWwuXG4gICAqL1xuICBASW5wdXQoKSBpMThuUm9vdDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBQcm92aWRlcyBhIG1lY2hhbmlzbSB0byBjb21wYXJlIGEgbWF0Y2hpbmcgdmFsdWUgZm9yIGVhY2ggaXRlbS5cbiAgICpcbiAgICogVGhlIGBwcm9wZXJ0eWAgcmVmZXJzIHRvIHRoZSBkYXRhc2V0LnZhbHVlIHByb3BlcnR5LCBhbmQgdGhlIHZhbHVlIHRvdCB0aGVcbiAgICogbWF0Y2hpbmcgcHJvcGVydHkgdmFsdWUuXG4gICAqL1xuICBASW5wdXQoKSBjdXJyZW50SXRlbTogeyB2YWx1ZTogYW55OyBwcm9wZXJ0eTogc3RyaW5nIH07XG5cbiAgQE91dHB1dCgpIGxhdW5jaCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVuZGVyZXJTZXJ2aWNlOiBUYWJsZVJlbmRlcmVyU2VydmljZSkge31cblxuICBpbml0KCkge1xuICAgIHRoaXMudmVydGljYWxMYXlvdXQgPSAhdGhpcy5sYXlvdXQgfHwgdGhpcy5sYXlvdXQgPT09IFRhYmxlTGF5b3V0LlZFUlRJQ0FMO1xuICAgIHRoaXMudmVydGljYWxTdGFja2VkTGF5b3V0ID0gdGhpcy5sYXlvdXQgPT09IFRhYmxlTGF5b3V0LlZFUlRJQ0FMX1NUQUNLRUQ7XG4gICAgdGhpcy5ob3Jpem9udGFsTGF5b3V0ID0gdGhpcy5sYXlvdXQgPT09IFRhYmxlTGF5b3V0LkhPUklaT05UQUw7XG5cbiAgICB0aGlzLnJlbmRlcmVyU2VydmljZS5hZGQodGhpcy5zdHJ1Y3R1cmUpO1xuXG4gICAgdGhpcy5hZGRUYWJsZURlYnVnSW5mbygpO1xuICB9XG5cbiAgbGF1bmNoSXRlbShpdGVtOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmxhdW5jaC5lbWl0KGl0ZW0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBpdGVtIGlzIHRoZSBjdXJyZW50IGl0ZW0uXG4gICAqXG4gICAqIFRoZSBjdXJyZW50IGl0ZW0gaXMgZHJpdmVuIGJ5IHRoZSBgY3VycmVudEl0ZW1gLCB0aGF0IGhvbGRzIGFcbiAgICogcHJvcGVydHkgYW5kIHZhbHVlIHRvIGNvbXBhcmUuXG4gICAqL1xuICBpc0N1cnJlbnRJdGVtKGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5jdXJyZW50SXRlbSB8fCAhdGhpcy5jdXJyZW50SXRlbS52YWx1ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jdXJyZW50SXRlbT8udmFsdWUgPT09IGl0ZW0/Llt0aGlzLmN1cnJlbnRJdGVtPy5wcm9wZXJ0eV07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaGVhZGVyICh0aCkgb3V0bGV0IHJlZmVyZW5jZSBmb3IgdGhlIGdpdmVuIGZpZWxkLlxuICAgKi9cbiAgZ2V0SGVhZGVyT3V0bGV0UmVmKGZpZWxkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnJlbmRlcmVyU2VydmljZS5nZXRIZWFkZXJPdXRsZXRSZWYodGhpcy50eXBlLCBmaWVsZCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaGVhZGVyICh0aCkgb3V0bGV0IGNvbnRleHQgZm9yIHRoZSBnaXZlbiBmaWVsZC5cbiAgICovXG4gIGdldEhlYWRlck91dGxldENvbnRleHQoZmllbGQ6IHN0cmluZyk6IFRhYmxlSGVhZGVyT3V0bGV0Q29udGV4dCB7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyZXJTZXJ2aWNlLmdldEhlYWRlck91dGxldENvbnRleHQoXG4gICAgICB0aGlzLnR5cGUsXG4gICAgICB0aGlzLm9wdGlvbnMsXG4gICAgICB0aGlzLmkxOG5Sb290LFxuICAgICAgZmllbGRcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGRhdGEgKHRkKSBvdXRsZXQgcmVmZXJlbmNlIGZvciB0aGUgZ2l2ZW4gZmllbGQuXG4gICAqL1xuICBnZXREYXRhT3V0bGV0UmVmKGZpZWxkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnJlbmRlcmVyU2VydmljZS5nZXREYXRhT3V0bGV0UmVmKHRoaXMudHlwZSwgZmllbGQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGRhdGEgKHRkKSBvdXRsZXQgY29udGV4dCBmb3IgdGhlIGdpdmVuIGZpZWxkLlxuICAgKi9cbiAgZ2V0RGF0YU91dGxldENvbnRleHQoZmllbGQ6IHN0cmluZywgZGF0YTogYW55KTogVGFibGVEYXRhT3V0bGV0Q29udGV4dCB7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyZXJTZXJ2aWNlLmdldERhdGFPdXRsZXRDb250ZXh0KFxuICAgICAgdGhpcy50eXBlLFxuICAgICAgdGhpcy5vcHRpb25zLFxuICAgICAgdGhpcy5pMThuUm9vdCxcbiAgICAgIGZpZWxkLFxuICAgICAgZGF0YVxuICAgICk7XG4gIH1cblxuICB0cmFja0RhdGEoX2k6IG51bWJlciwgaXRlbTogYW55KTogYW55IHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoaXRlbSk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIHRoZSB0YWJsZSB0eXBlIGludG8gdGhlIFVJIGluIGRldk1vZGUsIHNvIHRoYXQgZGV2ZWxvcGVyc1xuICAgKiBjYW4gZWFzaWx5IGdldCB0aGUgbm90aW9uIG9mIHRoZSB0YWJsZSB0eXBlLlxuICAgKi9cbiAgcHJvdGVjdGVkIGFkZFRhYmxlRGVidWdJbmZvKCkge1xuICAgIGlmIChpc0Rldk1vZGUoKSAmJiB0aGlzLnR5cGUpIHtcbiAgICAgIHRoaXMudGFibGVUeXBlID0gdGhpcy50eXBlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgbWV0aG9kIHRvIHJldHVybiB0aGUgZGVlcGx5IG5lc3RlZCBvcmllbnRhdGlvbiBjb25maWd1cmF0aW9uLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXQgbGF5b3V0KCk6IFRhYmxlTGF5b3V0IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5zdHJ1Y3R1cmU/Lm9wdGlvbnM/LmxheW91dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgbWV0aG9kIHRvIHJldHVybiB0aGUgZGVlcGx5IG5lc3RlZCB0eXBlLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXQgdHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnN0cnVjdHVyZT8udHlwZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IG9wdGlvbnMoKTogVGFibGVPcHRpb25zIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5zdHJ1Y3R1cmU/Lm9wdGlvbnM7XG4gIH1cbn1cbiIsIjx0YWJsZSAqbmdJZj1cInN0cnVjdHVyZVwiPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwidmVydGljYWxTdGFja2VkTGF5b3V0XCI+XG4gICAgPHRib2R5XG4gICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBkYXRhOyB0cmFja0J5OiB0cmFja0RhdGFcIlxuICAgICAgKGNsaWNrKT1cImxhdW5jaEl0ZW0oaXRlbSlcIlxuICAgICAgW2NsYXNzLmlzLWN1cnJlbnRdPVwiaXNDdXJyZW50SXRlbShpdGVtKVwiXG4gICAgPlxuICAgICAgPHRyICpuZ0Zvcj1cImxldCBjZWxsIG9mIHN0cnVjdHVyZS5jZWxsc1wiIFtjbGFzc109XCJjZWxsXCI+XG4gICAgICAgIDx0aD5cbiAgICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICAgIFtjeE91dGxldF09XCJnZXRIZWFkZXJPdXRsZXRSZWYoY2VsbClcIlxuICAgICAgICAgICAgW2N4T3V0bGV0Q29udGV4dF09XCJnZXRIZWFkZXJPdXRsZXRDb250ZXh0KGNlbGwpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7eyBjZWxsIH19XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC90aD5cbiAgICAgICAgPHRkPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAgICAgW2N4T3V0bGV0XT1cImdldERhdGFPdXRsZXRSZWYoY2VsbClcIlxuICAgICAgICAgICAgW2N4T3V0bGV0Q29udGV4dF09XCJnZXREYXRhT3V0bGV0Q29udGV4dChjZWxsLCBpdGVtKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3sgJGFueShpdGVtKVtjZWxsXSB9fVxuICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L3RyPlxuICAgIDwvdGJvZHk+XG4gIDwvbmctY29udGFpbmVyPlxuXG4gIDwhLS0gdmVydGljYWwgdGFibGVzIHJlbmRlciB0aGUgaXRlbSAgLS0+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJ2ZXJ0aWNhbExheW91dFwiPlxuICAgIDx0aGVhZD5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRoIHNjb3BlPVwiY29sXCIgKm5nRm9yPVwibGV0IGNlbGwgb2Ygc3RydWN0dXJlLmNlbGxzXCIgW2NsYXNzXT1cImNlbGxcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICAgIFtjeE91dGxldF09XCJnZXRIZWFkZXJPdXRsZXRSZWYoY2VsbClcIlxuICAgICAgICAgICAgW2N4T3V0bGV0Q29udGV4dF09XCJnZXRIZWFkZXJPdXRsZXRDb250ZXh0KGNlbGwpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7eyBjZWxsIH19XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC90aD5cbiAgICAgIDwvdHI+XG4gICAgPC90aGVhZD5cblxuICAgIDx0clxuICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgZGF0YTsgdHJhY2tCeTogdHJhY2tEYXRhXCJcbiAgICAgIFtjbGFzcy5pcy1jdXJyZW50XT1cImlzQ3VycmVudEl0ZW0oaXRlbSlcIlxuICAgICAgKGNsaWNrKT1cImxhdW5jaEl0ZW0oaXRlbSlcIlxuICAgID5cbiAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgY2VsbCBvZiBzdHJ1Y3R1cmUuY2VsbHM7IGxldCBpID0gaW5kZXhcIiBbY2xhc3NdPVwiY2VsbFwiPlxuICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICBbY3hPdXRsZXRdPVwiZ2V0RGF0YU91dGxldFJlZihjZWxsKVwiXG4gICAgICAgICAgW2N4T3V0bGV0Q29udGV4dF09XCJnZXREYXRhT3V0bGV0Q29udGV4dChjZWxsLCBpdGVtKVwiXG4gICAgICAgID5cbiAgICAgICAgICB7eyAkYW55KGl0ZW0pW2NlbGxdIH19XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L3RkPlxuICAgIDwvdHI+XG4gIDwvbmctY29udGFpbmVyPlxuXG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJob3Jpem9udGFsTGF5b3V0XCI+XG4gICAgPHRyICpuZ0Zvcj1cImxldCBjZWxsIG9mIHN0cnVjdHVyZS5jZWxsc1wiIFtjbGFzc109XCJjZWxsXCI+XG4gICAgICA8dGggc2NvcGU9XCJjb2xcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgW2N4T3V0bGV0XT1cImdldEhlYWRlck91dGxldFJlZihjZWxsKVwiXG4gICAgICAgICAgW2N4T3V0bGV0Q29udGV4dF09XCJnZXRIZWFkZXJPdXRsZXRDb250ZXh0KGNlbGwpXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt7IGNlbGwgfX1cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvdGg+XG4gICAgICA8dGRcbiAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgZGF0YTsgdHJhY2tCeTogdHJhY2tEYXRhXCJcbiAgICAgICAgW2NsYXNzLmlzLWN1cnJlbnRdPVwiaXNDdXJyZW50SXRlbShpdGVtKVwiXG4gICAgICAgIChjbGljayk9XCJsYXVuY2hJdGVtKGl0ZW0pXCJcbiAgICAgID5cbiAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgW2N4T3V0bGV0XT1cImdldERhdGFPdXRsZXRSZWYoY2VsbClcIlxuICAgICAgICAgIFtjeE91dGxldENvbnRleHRdPVwiZ2V0RGF0YU91dGxldENvbnRleHQoY2VsbCwgaXRlbSlcIlxuICAgICAgICA+XG4gICAgICAgICAge3sgJGFueShpdGVtKVtjZWxsXSB9fVxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC90ZD5cbiAgICA8L3RyPlxuICA8L25nLWNvbnRhaW5lcj5cbjwvdGFibGU+XG4iXX0=