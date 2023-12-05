/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, Input } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import * as i0 from "@angular/core";
import * as i1 from "../../item.service";
import * as i2 from "./disable-info.service";
import * as i3 from "@angular/common";
import * as i4 from "@spartacus/storefront";
import * as i5 from "@spartacus/core";
export class DisableInfoComponent {
    constructor(itemService, disableInfoService) {
        this.itemService = itemService;
        this.disableInfoService = disableInfoService;
        /**
         * Flag to enable display custom message(s) even if no condition has been met
         */
        this.displayCustomInfo = false;
        /**
         * resolves the current item.
         */
        this.current$ = this.itemService.current$;
        this.iconTypes = ICON_TYPE;
    }
    get defaultInfoConfig() {
        return {
            disabledCreate: false,
            disabledEdit: true,
            disabledEnable: true,
            disabledDisable: false,
        };
    }
    ngOnInit() {
        this.displayInfoConfig = {
            ...this.defaultInfoConfig,
            ...this.displayInfoConfig,
        };
    }
    displayDisabledCreate(item) {
        return (this.displayInfoConfig?.disabledCreate &&
            this.disableInfoService.isItemDisabled(item));
    }
    displayDisabledEdit(item) {
        return (this.displayInfoConfig?.disabledEdit &&
            this.disableInfoService.isItemDisabled(item));
    }
    displayDisabledEnable(item) {
        return (this.displayInfoConfig?.disabledEnable &&
            this.disableInfoService.isParentDisabled(item));
    }
    displayDisabledDisable(item) {
        return (this.displayInfoConfig?.disabledDisable &&
            this.disableInfoService.isRootUnit(item));
    }
}
DisableInfoComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DisableInfoComponent, deps: [{ token: i1.ItemService }, { token: i2.DisableInfoService }], target: i0.ɵɵFactoryTarget.Component });
DisableInfoComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: DisableInfoComponent, selector: "cx-org-disable-info", inputs: { i18nRoot: "i18nRoot", displayInfoConfig: "displayInfoConfig", displayCustomInfo: "displayCustomInfo" }, host: { classAttribute: "content-wrapper" }, ngImport: i0, template: "<ng-container *ngIf=\"current$ | async as item\">\n  <section\n    *ngIf=\"\n      displayDisabledCreate(item) ||\n      displayDisabledEdit(item) ||\n      displayDisabledEnable(item) ||\n      displayDisabledDisable(item) ||\n      displayCustomInfo\n    \"\n  >\n    <cx-icon [type]=\"iconTypes.INFO\"></cx-icon>\n    <ul>\n      <li *ngIf=\"displayDisabledEnable(item)\">\n        {{ i18nRoot + '.info.disabledEnable' | cxTranslate }}\n      </li>\n      <li *ngIf=\"displayDisabledCreate(item)\">\n        {{ i18nRoot + '.info.disabledCreate' | cxTranslate }}\n      </li>\n      <li *ngIf=\"displayDisabledEdit(item)\">\n        {{ i18nRoot + '.info.disabledEdit' | cxTranslate }}\n      </li>\n      <li *ngIf=\"displayDisabledDisable(item)\">\n        {{ i18nRoot + '.info.disabledDisable' | cxTranslate }}\n      </li>\n      <ng-content></ng-content>\n    </ul>\n  </section>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i5.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DisableInfoComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-disable-info', host: { class: 'content-wrapper' }, template: "<ng-container *ngIf=\"current$ | async as item\">\n  <section\n    *ngIf=\"\n      displayDisabledCreate(item) ||\n      displayDisabledEdit(item) ||\n      displayDisabledEnable(item) ||\n      displayDisabledDisable(item) ||\n      displayCustomInfo\n    \"\n  >\n    <cx-icon [type]=\"iconTypes.INFO\"></cx-icon>\n    <ul>\n      <li *ngIf=\"displayDisabledEnable(item)\">\n        {{ i18nRoot + '.info.disabledEnable' | cxTranslate }}\n      </li>\n      <li *ngIf=\"displayDisabledCreate(item)\">\n        {{ i18nRoot + '.info.disabledCreate' | cxTranslate }}\n      </li>\n      <li *ngIf=\"displayDisabledEdit(item)\">\n        {{ i18nRoot + '.info.disabledEdit' | cxTranslate }}\n      </li>\n      <li *ngIf=\"displayDisabledDisable(item)\">\n        {{ i18nRoot + '.info.disabledDisable' | cxTranslate }}\n      </li>\n      <ng-content></ng-content>\n    </ul>\n  </section>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ItemService }, { type: i2.DisableInfoService }]; }, propDecorators: { i18nRoot: [{
                type: Input
            }], displayInfoConfig: [{
                type: Input
            }], displayCustomInfo: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYWJsZS1pbmZvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy9zaGFyZWQvZGV0YWlsL2Rpc2FibGUtaW5mby9kaXNhYmxlLWluZm8uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3NoYXJlZC9kZXRhaWwvZGlzYWJsZS1pbmZvL2Rpc2FibGUtaW5mby5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7Ozs7O0FBV2xELE1BQU0sT0FBTyxvQkFBb0I7SUErQi9CLFlBQ1ksV0FBMkIsRUFDM0Isa0JBQXlDO1FBRHpDLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUMzQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXVCO1FBZHJEOztXQUVHO1FBQ00sc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBRW5DOztXQUVHO1FBQ0gsYUFBUSxHQUE4QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztRQUVoRSxjQUFTLEdBQUcsU0FBUyxDQUFDO0lBS25CLENBQUM7SUFFSixJQUFjLGlCQUFpQjtRQUM3QixPQUFPO1lBQ0wsY0FBYyxFQUFFLEtBQUs7WUFDckIsWUFBWSxFQUFFLElBQUk7WUFDbEIsY0FBYyxFQUFFLElBQUk7WUFDcEIsZUFBZSxFQUFFLEtBQUs7U0FDdkIsQ0FBQztJQUNKLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGlCQUFpQixHQUFHO1lBQ3ZCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQjtZQUN6QixHQUFHLElBQUksQ0FBQyxpQkFBaUI7U0FDMUIsQ0FBQztJQUNKLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxJQUFPO1FBQzNCLE9BQU8sQ0FDTCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsY0FBYztZQUN0QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUM3QyxDQUFDO0lBQ0osQ0FBQztJQUVELG1CQUFtQixDQUFDLElBQU87UUFDekIsT0FBTyxDQUNMLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxZQUFZO1lBQ3BDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQzdDLENBQUM7SUFDSixDQUFDO0lBRUQscUJBQXFCLENBQUMsSUFBTztRQUMzQixPQUFPLENBQ0wsSUFBSSxDQUFDLGlCQUFpQixFQUFFLGNBQWM7WUFDdEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUMvQyxDQUFDO0lBQ0osQ0FBQztJQUVELHNCQUFzQixDQUFDLElBQU87UUFDNUIsT0FBTyxDQUNMLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxlQUFlO1lBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQ3pDLENBQUM7SUFDSixDQUFDOztpSEE5RVUsb0JBQW9CO3FHQUFwQixvQkFBb0IsME5DbEJqQywwNEJBNEJBOzJGRFZhLG9CQUFvQjtrQkFMaEMsU0FBUzsrQkFDRSxxQkFBcUIsUUFFekIsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUU7bUlBU3pCLFFBQVE7c0JBQWhCLEtBQUs7Z0JBS0csaUJBQWlCO3NCQUF6QixLQUFLO2dCQVVHLGlCQUFpQjtzQkFBekIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUNPTl9UWVBFIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vaXRlbS5zZXJ2aWNlJztcbmltcG9ydCB7IEJhc2VJdGVtIH0gZnJvbSAnLi4vLi4vb3JnYW5pemF0aW9uLm1vZGVsJztcbmltcG9ydCB7IERpc2FibGVJbmZvU2VydmljZSB9IGZyb20gJy4vZGlzYWJsZS1pbmZvLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1vcmctZGlzYWJsZS1pbmZvJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Rpc2FibGUtaW5mby5jb21wb25lbnQuaHRtbCcsXG4gIGhvc3Q6IHsgY2xhc3M6ICdjb250ZW50LXdyYXBwZXInIH0sXG59KVxuZXhwb3J0IGNsYXNzIERpc2FibGVJbmZvQ29tcG9uZW50PFQgZXh0ZW5kcyBCYXNlSXRlbT4gaW1wbGVtZW50cyBPbkluaXQge1xuICAvKipcbiAgICogVGhlIGxvY2FsaXphdGlvbiBvZiBtZXNzYWdlcyBpcyBiYXNlZCBvbiB0aGUgaTE4biByb290LiBNZXNzYWdlcyBhcmVcbiAgICogY29uY2F0ZW5hdGVkIHRvIHRoZSByb290LCBzdWNoIGFzOlxuICAgKlxuICAgKiBgW2kxOG5Sb290XS5pbmZvLmRpc2FibGVkRWRpdGBcbiAgICovXG4gIEBJbnB1dCgpIGkxOG5Sb290OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRvIGNvbmZpZ3VyZSB0aGUgbWVzc2FnZXMgdG8gZGlzcGxheSBhbmQgb3ZlcnJpZGUgZGVmYXVsdE1lc3NhZ2VDb25maWdcbiAgICovXG4gIEBJbnB1dCgpIGRpc3BsYXlJbmZvQ29uZmlnOiB7XG4gICAgZGlzYWJsZWRDcmVhdGU/OiBib29sZWFuO1xuICAgIGRpc2FibGVkRWRpdD86IGJvb2xlYW47XG4gICAgZGlzYWJsZWRFbmFibGU/OiBib29sZWFuO1xuICAgIGRpc2FibGVkRGlzYWJsZT86IGJvb2xlYW47XG4gIH07XG5cbiAgLyoqXG4gICAqIEZsYWcgdG8gZW5hYmxlIGRpc3BsYXkgY3VzdG9tIG1lc3NhZ2UocykgZXZlbiBpZiBubyBjb25kaXRpb24gaGFzIGJlZW4gbWV0XG4gICAqL1xuICBASW5wdXQoKSBkaXNwbGF5Q3VzdG9tSW5mbyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiByZXNvbHZlcyB0aGUgY3VycmVudCBpdGVtLlxuICAgKi9cbiAgY3VycmVudCQ6IE9ic2VydmFibGU8VCB8IHVuZGVmaW5lZD4gPSB0aGlzLml0ZW1TZXJ2aWNlLmN1cnJlbnQkO1xuXG4gIGljb25UeXBlcyA9IElDT05fVFlQRTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaXRlbVNlcnZpY2U6IEl0ZW1TZXJ2aWNlPFQ+LFxuICAgIHByb3RlY3RlZCBkaXNhYmxlSW5mb1NlcnZpY2U6IERpc2FibGVJbmZvU2VydmljZTxUPlxuICApIHt9XG5cbiAgcHJvdGVjdGVkIGdldCBkZWZhdWx0SW5mb0NvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGlzYWJsZWRDcmVhdGU6IGZhbHNlLFxuICAgICAgZGlzYWJsZWRFZGl0OiB0cnVlLFxuICAgICAgZGlzYWJsZWRFbmFibGU6IHRydWUsXG4gICAgICBkaXNhYmxlZERpc2FibGU6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRpc3BsYXlJbmZvQ29uZmlnID0ge1xuICAgICAgLi4udGhpcy5kZWZhdWx0SW5mb0NvbmZpZyxcbiAgICAgIC4uLnRoaXMuZGlzcGxheUluZm9Db25maWcsXG4gICAgfTtcbiAgfVxuXG4gIGRpc3BsYXlEaXNhYmxlZENyZWF0ZShpdGVtOiBUKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZGlzcGxheUluZm9Db25maWc/LmRpc2FibGVkQ3JlYXRlICYmXG4gICAgICB0aGlzLmRpc2FibGVJbmZvU2VydmljZS5pc0l0ZW1EaXNhYmxlZChpdGVtKVxuICAgICk7XG4gIH1cblxuICBkaXNwbGF5RGlzYWJsZWRFZGl0KGl0ZW06IFQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5kaXNwbGF5SW5mb0NvbmZpZz8uZGlzYWJsZWRFZGl0ICYmXG4gICAgICB0aGlzLmRpc2FibGVJbmZvU2VydmljZS5pc0l0ZW1EaXNhYmxlZChpdGVtKVxuICAgICk7XG4gIH1cblxuICBkaXNwbGF5RGlzYWJsZWRFbmFibGUoaXRlbTogVCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmRpc3BsYXlJbmZvQ29uZmlnPy5kaXNhYmxlZEVuYWJsZSAmJlxuICAgICAgdGhpcy5kaXNhYmxlSW5mb1NlcnZpY2UuaXNQYXJlbnREaXNhYmxlZChpdGVtKVxuICAgICk7XG4gIH1cblxuICBkaXNwbGF5RGlzYWJsZWREaXNhYmxlKGl0ZW06IFQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5kaXNwbGF5SW5mb0NvbmZpZz8uZGlzYWJsZWREaXNhYmxlICYmXG4gICAgICB0aGlzLmRpc2FibGVJbmZvU2VydmljZS5pc1Jvb3RVbml0KGl0ZW0pXG4gICAgKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImN1cnJlbnQkIHwgYXN5bmMgYXMgaXRlbVwiPlxuICA8c2VjdGlvblxuICAgICpuZ0lmPVwiXG4gICAgICBkaXNwbGF5RGlzYWJsZWRDcmVhdGUoaXRlbSkgfHxcbiAgICAgIGRpc3BsYXlEaXNhYmxlZEVkaXQoaXRlbSkgfHxcbiAgICAgIGRpc3BsYXlEaXNhYmxlZEVuYWJsZShpdGVtKSB8fFxuICAgICAgZGlzcGxheURpc2FibGVkRGlzYWJsZShpdGVtKSB8fFxuICAgICAgZGlzcGxheUN1c3RvbUluZm9cbiAgICBcIlxuICA+XG4gICAgPGN4LWljb24gW3R5cGVdPVwiaWNvblR5cGVzLklORk9cIj48L2N4LWljb24+XG4gICAgPHVsPlxuICAgICAgPGxpICpuZ0lmPVwiZGlzcGxheURpc2FibGVkRW5hYmxlKGl0ZW0pXCI+XG4gICAgICAgIHt7IGkxOG5Sb290ICsgJy5pbmZvLmRpc2FibGVkRW5hYmxlJyB8IGN4VHJhbnNsYXRlIH19XG4gICAgICA8L2xpPlxuICAgICAgPGxpICpuZ0lmPVwiZGlzcGxheURpc2FibGVkQ3JlYXRlKGl0ZW0pXCI+XG4gICAgICAgIHt7IGkxOG5Sb290ICsgJy5pbmZvLmRpc2FibGVkQ3JlYXRlJyB8IGN4VHJhbnNsYXRlIH19XG4gICAgICA8L2xpPlxuICAgICAgPGxpICpuZ0lmPVwiZGlzcGxheURpc2FibGVkRWRpdChpdGVtKVwiPlxuICAgICAgICB7eyBpMThuUm9vdCArICcuaW5mby5kaXNhYmxlZEVkaXQnIHwgY3hUcmFuc2xhdGUgfX1cbiAgICAgIDwvbGk+XG4gICAgICA8bGkgKm5nSWY9XCJkaXNwbGF5RGlzYWJsZWREaXNhYmxlKGl0ZW0pXCI+XG4gICAgICAgIHt7IGkxOG5Sb290ICsgJy5pbmZvLmRpc2FibGVkRGlzYWJsZScgfCBjeFRyYW5zbGF0ZSB9fVxuICAgICAgPC9saT5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L3VsPlxuICA8L3NlY3Rpb24+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==