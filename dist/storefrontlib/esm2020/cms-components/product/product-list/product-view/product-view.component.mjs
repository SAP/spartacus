/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { ICON_TYPE } from '../../../misc/icon/icon.model';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../../misc/icon/icon.component";
import * as i3 from "@spartacus/core";
export var ViewModes;
(function (ViewModes) {
    ViewModes["Grid"] = "grid";
    ViewModes["List"] = "list";
})(ViewModes || (ViewModes = {}));
export class ProductViewComponent {
    constructor() {
        this.iconTypes = ICON_TYPE;
        this.modeChange = new EventEmitter();
    }
    get buttonClass() {
        const viewName = this.viewMode?.toLowerCase();
        return `cx-product-${viewName}`;
    }
    /**
     *   Display icons inversely to allow users
     *   to see the view they will navigate to
     */
    get viewMode() {
        if (this.mode === 'list') {
            return this.iconTypes.GRID;
        }
        return this.iconTypes.LIST;
    }
    changeMode() {
        const newMode = this.mode === ViewModes.Grid ? ViewModes.List : ViewModes.Grid;
        this.modeChange.emit(newMode);
    }
}
ProductViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ProductViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ProductViewComponent, selector: "cx-product-view", inputs: { mode: "mode" }, outputs: { modeChange: "modeChange" }, ngImport: i0, template: "<button\n  class=\"btn cx-product-layout\"\n  [ngClass]=\"buttonClass\"\n  (click)=\"changeMode()\"\n  tabindex=\"0\"\n  attr.aria-label=\"{{\n    viewMode === iconTypes.GRID\n      ? ('productView.gridView' | cxTranslate)\n      : viewMode === iconTypes.LIST\n      ? ('productView.listView' | cxTranslate)\n      : null\n  }}\"\n>\n  <cx-icon\n    *ngIf=\"viewMode === iconTypes.GRID\"\n    [type]=\"iconTypes.GRID\"\n  ></cx-icon>\n  <cx-icon\n    *ngIf=\"viewMode === iconTypes.LIST\"\n    [type]=\"iconTypes.LIST\"\n  ></cx-icon>\n</button>\n", dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductViewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-product-view', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  class=\"btn cx-product-layout\"\n  [ngClass]=\"buttonClass\"\n  (click)=\"changeMode()\"\n  tabindex=\"0\"\n  attr.aria-label=\"{{\n    viewMode === iconTypes.GRID\n      ? ('productView.gridView' | cxTranslate)\n      : viewMode === iconTypes.LIST\n      ? ('productView.listView' | cxTranslate)\n      : null\n  }}\"\n>\n  <cx-icon\n    *ngIf=\"viewMode === iconTypes.GRID\"\n    [type]=\"iconTypes.GRID\"\n  ></cx-icon>\n  <cx-icon\n    *ngIf=\"viewMode === iconTypes.LIST\"\n    [type]=\"iconTypes.LIST\"\n  ></cx-icon>\n</button>\n" }]
        }], propDecorators: { mode: [{
                type: Input
            }], modeChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvcHJvZHVjdC9wcm9kdWN0LWxpc3QvcHJvZHVjdC12aWV3L3Byb2R1Y3Qtdmlldy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL3Byb2R1Y3QvcHJvZHVjdC1saXN0L3Byb2R1Y3Qtdmlldy9wcm9kdWN0LXZpZXcuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7QUFFMUQsTUFBTSxDQUFOLElBQVksU0FHWDtBQUhELFdBQVksU0FBUztJQUNuQiwwQkFBYSxDQUFBO0lBQ2IsMEJBQWEsQ0FBQTtBQUNmLENBQUMsRUFIVyxTQUFTLEtBQVQsU0FBUyxRQUdwQjtBQU9ELE1BQU0sT0FBTyxvQkFBb0I7SUFMakM7UUFNRSxjQUFTLEdBQUcsU0FBUyxDQUFDO1FBSXRCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBYSxDQUFDO0tBdUI1QztJQXJCQyxJQUFJLFdBQVc7UUFDYixNQUFNLFFBQVEsR0FBVyxJQUFJLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxDQUFDO1FBQ3RELE9BQU8sY0FBYyxRQUFRLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSSxRQUFRO1FBQ1YsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUN4QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1NBQzVCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztJQUM3QixDQUFDO0lBRUQsVUFBVTtRQUNSLE1BQU0sT0FBTyxHQUNYLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztRQUNqRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDOztpSEEzQlUsb0JBQW9CO3FHQUFwQixvQkFBb0Isd0hDekJqQyxxaUJBc0JBOzJGREdhLG9CQUFvQjtrQkFMaEMsU0FBUzsrQkFDRSxpQkFBaUIsbUJBRVYsdUJBQXVCLENBQUMsTUFBTTs4QkFLL0MsSUFBSTtzQkFESCxLQUFLO2dCQUdOLFVBQVU7c0JBRFQsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJQ09OX1RZUEUgfSBmcm9tICcuLi8uLi8uLi9taXNjL2ljb24vaWNvbi5tb2RlbCc7XG5cbmV4cG9ydCBlbnVtIFZpZXdNb2RlcyB7XG4gIEdyaWQgPSAnZ3JpZCcsXG4gIExpc3QgPSAnbGlzdCcsXG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXByb2R1Y3QtdmlldycsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcm9kdWN0LXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdFZpZXdDb21wb25lbnQge1xuICBpY29uVHlwZXMgPSBJQ09OX1RZUEU7XG4gIEBJbnB1dCgpXG4gIG1vZGU6IFZpZXdNb2RlcztcbiAgQE91dHB1dCgpXG4gIG1vZGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFZpZXdNb2Rlcz4oKTtcblxuICBnZXQgYnV0dG9uQ2xhc3MoKSB7XG4gICAgY29uc3Qgdmlld05hbWU6IHN0cmluZyA9IHRoaXMudmlld01vZGU/LnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIGBjeC1wcm9kdWN0LSR7dmlld05hbWV9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiAgIERpc3BsYXkgaWNvbnMgaW52ZXJzZWx5IHRvIGFsbG93IHVzZXJzXG4gICAqICAgdG8gc2VlIHRoZSB2aWV3IHRoZXkgd2lsbCBuYXZpZ2F0ZSB0b1xuICAgKi9cbiAgZ2V0IHZpZXdNb2RlKCkge1xuICAgIGlmICh0aGlzLm1vZGUgPT09ICdsaXN0Jykge1xuICAgICAgcmV0dXJuIHRoaXMuaWNvblR5cGVzLkdSSUQ7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmljb25UeXBlcy5MSVNUO1xuICB9XG5cbiAgY2hhbmdlTW9kZSgpIHtcbiAgICBjb25zdCBuZXdNb2RlID1cbiAgICAgIHRoaXMubW9kZSA9PT0gVmlld01vZGVzLkdyaWQgPyBWaWV3TW9kZXMuTGlzdCA6IFZpZXdNb2Rlcy5HcmlkO1xuICAgIHRoaXMubW9kZUNoYW5nZS5lbWl0KG5ld01vZGUpO1xuICB9XG59XG4iLCI8YnV0dG9uXG4gIGNsYXNzPVwiYnRuIGN4LXByb2R1Y3QtbGF5b3V0XCJcbiAgW25nQ2xhc3NdPVwiYnV0dG9uQ2xhc3NcIlxuICAoY2xpY2spPVwiY2hhbmdlTW9kZSgpXCJcbiAgdGFiaW5kZXg9XCIwXCJcbiAgYXR0ci5hcmlhLWxhYmVsPVwie3tcbiAgICB2aWV3TW9kZSA9PT0gaWNvblR5cGVzLkdSSURcbiAgICAgID8gKCdwcm9kdWN0Vmlldy5ncmlkVmlldycgfCBjeFRyYW5zbGF0ZSlcbiAgICAgIDogdmlld01vZGUgPT09IGljb25UeXBlcy5MSVNUXG4gICAgICA/ICgncHJvZHVjdFZpZXcubGlzdFZpZXcnIHwgY3hUcmFuc2xhdGUpXG4gICAgICA6IG51bGxcbiAgfX1cIlxuPlxuICA8Y3gtaWNvblxuICAgICpuZ0lmPVwidmlld01vZGUgPT09IGljb25UeXBlcy5HUklEXCJcbiAgICBbdHlwZV09XCJpY29uVHlwZXMuR1JJRFwiXG4gID48L2N4LWljb24+XG4gIDxjeC1pY29uXG4gICAgKm5nSWY9XCJ2aWV3TW9kZSA9PT0gaWNvblR5cGVzLkxJU1RcIlxuICAgIFt0eXBlXT1cImljb25UeXBlcy5MSVNUXCJcbiAgPjwvY3gtaWNvbj5cbjwvYnV0dG9uPlxuIl19