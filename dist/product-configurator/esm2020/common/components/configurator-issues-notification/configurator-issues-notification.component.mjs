/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, Optional } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { EMPTY } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../shared/utils/common-configurator-utils.service";
import * as i2 from "@spartacus/cart/base/root";
import * as i3 from "@angular/common";
import * as i4 from "@spartacus/storefront";
import * as i5 from "../configure-cart-entry/configure-cart-entry.component";
import * as i6 from "@spartacus/core";
export class ConfiguratorIssuesNotificationComponent {
    constructor(commonConfigUtilsService, cartItemContext) {
        this.commonConfigUtilsService = commonConfigUtilsService;
        this.cartItemContext = cartItemContext;
        this.iconTypes = ICON_TYPE;
        this.orderEntry$ = this.cartItemContext?.item$ ?? EMPTY;
        this.quantityControl$ = this.cartItemContext?.quantityControl$ ?? EMPTY;
        this.readonly$ = this.cartItemContext?.readonly$ ?? EMPTY;
        // TODO: remove the logic below when configurable products support "Saved Cart" and "Save For Later"
        this.shouldShowButton$ = this.commonConfigUtilsService.isActiveCartContext(this.cartItemContext);
    }
    /**
     * Verifies whether the item has any issues.
     *
     * @param item - Cart item
     * @returns - whether there are any issues
     */
    hasIssues(item) {
        return this.commonConfigUtilsService.hasIssues(item);
    }
    /**
     * Retrieves the number of issues at the cart item.
     *
     * @param item - Cart item
     * @returns - the number of issues at the cart item
     */
    getNumberOfIssues(item) {
        return this.commonConfigUtilsService.getNumberOfIssues(item);
    }
    /**
     * Retrieves the unique id for the error message.
     *
     * @param item - Cart item
     * @returns - Unique id for error message
     */
    getErrorMessageId(item) {
        return 'cx-error-msg-' + item.entryNumber;
    }
}
ConfiguratorIssuesNotificationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorIssuesNotificationComponent, deps: [{ token: i1.CommonConfiguratorUtilsService }, { token: i2.CartItemContext, optional: true }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorIssuesNotificationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorIssuesNotificationComponent, selector: "cx-configurator-issues-notification", ngImport: i0, template: "<ng-container *ngIf=\"orderEntry$ | async as orderEntry\">\n  <ng-container *ngIf=\"hasIssues(orderEntry) && !(readonly$ | async)\">\n    <cx-icon [type]=\"iconTypes.ERROR\"></cx-icon>\n    <div id=\"{{ getErrorMessageId(orderEntry) }}\">\n      {{\n        'configurator.notificationBanner.numberOfIssues'\n          | cxTranslate: { count: getNumberOfIssues(orderEntry) }\n      }}\n      <ng-container *ngIf=\"quantityControl$ | async as quantityControl\">\n        <cx-configure-cart-entry\n          class=\"cx-error-msg-action\"\n          *ngIf=\"\n            (shouldShowButton$ | async) && orderEntry?.product?.configurable\n          \"\n          [cartEntry]=\"orderEntry\"\n          [readOnly]=\"(readonly$ | async) ?? true\"\n          [msgBanner]=\"true\"\n          [disabled]=\"quantityControl.disabled\"\n        ></cx-configure-cart-entry\n      ></ng-container>\n    </div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i5.ConfigureCartEntryComponent, selector: "cx-configure-cart-entry", inputs: ["cartEntry", "readOnly", "msgBanner", "disabled"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i6.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorIssuesNotificationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-issues-notification', template: "<ng-container *ngIf=\"orderEntry$ | async as orderEntry\">\n  <ng-container *ngIf=\"hasIssues(orderEntry) && !(readonly$ | async)\">\n    <cx-icon [type]=\"iconTypes.ERROR\"></cx-icon>\n    <div id=\"{{ getErrorMessageId(orderEntry) }}\">\n      {{\n        'configurator.notificationBanner.numberOfIssues'\n          | cxTranslate: { count: getNumberOfIssues(orderEntry) }\n      }}\n      <ng-container *ngIf=\"quantityControl$ | async as quantityControl\">\n        <cx-configure-cart-entry\n          class=\"cx-error-msg-action\"\n          *ngIf=\"\n            (shouldShowButton$ | async) && orderEntry?.product?.configurable\n          \"\n          [cartEntry]=\"orderEntry\"\n          [readOnly]=\"(readonly$ | async) ?? true\"\n          [msgBanner]=\"true\"\n          [disabled]=\"quantityControl.disabled\"\n        ></cx-configure-cart-entry\n      ></ng-container>\n    </div>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CommonConfiguratorUtilsService }, { type: i2.CartItemContext, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWlzc3Vlcy1ub3RpZmljYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbi9jb21wb25lbnRzL2NvbmZpZ3VyYXRvci1pc3N1ZXMtbm90aWZpY2F0aW9uL2NvbmZpZ3VyYXRvci1pc3N1ZXMtbm90aWZpY2F0aW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9jb21tb24vY29tcG9uZW50cy9jb25maWd1cmF0b3ItaXNzdWVzLW5vdGlmaWNhdGlvbi9jb25maWd1cmF0b3ItaXNzdWVzLW5vdGlmaWNhdGlvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHcEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxLQUFLLEVBQWMsTUFBTSxNQUFNLENBQUM7Ozs7Ozs7O0FBT3pDLE1BQU0sT0FBTyx1Q0FBdUM7SUFHbEQsWUFDWSx3QkFBd0QsRUFDNUMsZUFBZ0M7UUFENUMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUFnQztRQUM1QyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFKeEQsY0FBUyxHQUFHLFNBQVMsQ0FBQztRQU9iLGdCQUFXLEdBQ2xCLElBQUksQ0FBQyxlQUFlLEVBQUUsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUU5QixxQkFBZ0IsR0FDdkIsSUFBSSxDQUFDLGVBQWUsRUFBRSxnQkFBZ0IsSUFBSSxLQUFLLENBQUM7UUFFekMsY0FBUyxHQUNoQixJQUFJLENBQUMsZUFBZSxFQUFFLFNBQVMsSUFBSSxLQUFLLENBQUM7UUFFM0Msb0dBQW9HO1FBQzNGLHNCQUFpQixHQUN4QixJQUFJLENBQUMsd0JBQXdCLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBYnZFLENBQUM7SUFlSjs7Ozs7T0FLRztJQUNILFNBQVMsQ0FBQyxJQUFnQjtRQUN4QixPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsaUJBQWlCLENBQUMsSUFBZ0I7UUFDaEMsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsaUJBQWlCLENBQUMsSUFBZ0I7UUFDaEMsT0FBTyxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QyxDQUFDOztvSUFqRFUsdUNBQXVDO3dIQUF2Qyx1Q0FBdUMsMkVDakJwRCxxNkJBdUJBOzJGRE5hLHVDQUF1QztrQkFKbkQsU0FBUzsrQkFDRSxxQ0FBcUM7OzBCQVE1QyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVW50eXBlZEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ2FydEl0ZW1Db250ZXh0LCBPcmRlckVudHJ5IH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBJQ09OX1RZUEUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgRU1QVFksIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbW1vbkNvbmZpZ3VyYXRvclV0aWxzU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy9jb21tb24tY29uZmlndXJhdG9yLXV0aWxzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1jb25maWd1cmF0b3ItaXNzdWVzLW5vdGlmaWNhdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb25maWd1cmF0b3ItaXNzdWVzLW5vdGlmaWNhdGlvbi5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvcklzc3Vlc05vdGlmaWNhdGlvbkNvbXBvbmVudCB7XG4gIGljb25UeXBlcyA9IElDT05fVFlQRTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29tbW9uQ29uZmlnVXRpbHNTZXJ2aWNlOiBDb21tb25Db25maWd1cmF0b3JVdGlsc1NlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJvdGVjdGVkIGNhcnRJdGVtQ29udGV4dDogQ2FydEl0ZW1Db250ZXh0XG4gICkge31cblxuICByZWFkb25seSBvcmRlckVudHJ5JDogT2JzZXJ2YWJsZTxPcmRlckVudHJ5PiA9XG4gICAgdGhpcy5jYXJ0SXRlbUNvbnRleHQ/Lml0ZW0kID8/IEVNUFRZO1xuXG4gIHJlYWRvbmx5IHF1YW50aXR5Q29udHJvbCQ6IE9ic2VydmFibGU8VW50eXBlZEZvcm1Db250cm9sPiA9XG4gICAgdGhpcy5jYXJ0SXRlbUNvbnRleHQ/LnF1YW50aXR5Q29udHJvbCQgPz8gRU1QVFk7XG5cbiAgcmVhZG9ubHkgcmVhZG9ubHkkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID1cbiAgICB0aGlzLmNhcnRJdGVtQ29udGV4dD8ucmVhZG9ubHkkID8/IEVNUFRZO1xuXG4gIC8vIFRPRE86IHJlbW92ZSB0aGUgbG9naWMgYmVsb3cgd2hlbiBjb25maWd1cmFibGUgcHJvZHVjdHMgc3VwcG9ydCBcIlNhdmVkIENhcnRcIiBhbmQgXCJTYXZlIEZvciBMYXRlclwiXG4gIHJlYWRvbmx5IHNob3VsZFNob3dCdXR0b24kOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID1cbiAgICB0aGlzLmNvbW1vbkNvbmZpZ1V0aWxzU2VydmljZS5pc0FjdGl2ZUNhcnRDb250ZXh0KHRoaXMuY2FydEl0ZW1Db250ZXh0KTtcblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgaXRlbSBoYXMgYW55IGlzc3Vlcy5cbiAgICpcbiAgICogQHBhcmFtIGl0ZW0gLSBDYXJ0IGl0ZW1cbiAgICogQHJldHVybnMgLSB3aGV0aGVyIHRoZXJlIGFyZSBhbnkgaXNzdWVzXG4gICAqL1xuICBoYXNJc3N1ZXMoaXRlbTogT3JkZXJFbnRyeSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbW1vbkNvbmZpZ1V0aWxzU2VydmljZS5oYXNJc3N1ZXMoaXRlbSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBudW1iZXIgb2YgaXNzdWVzIGF0IHRoZSBjYXJ0IGl0ZW0uXG4gICAqXG4gICAqIEBwYXJhbSBpdGVtIC0gQ2FydCBpdGVtXG4gICAqIEByZXR1cm5zIC0gdGhlIG51bWJlciBvZiBpc3N1ZXMgYXQgdGhlIGNhcnQgaXRlbVxuICAgKi9cbiAgZ2V0TnVtYmVyT2ZJc3N1ZXMoaXRlbTogT3JkZXJFbnRyeSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY29tbW9uQ29uZmlnVXRpbHNTZXJ2aWNlLmdldE51bWJlck9mSXNzdWVzKGl0ZW0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgdW5pcXVlIGlkIGZvciB0aGUgZXJyb3IgbWVzc2FnZS5cbiAgICpcbiAgICogQHBhcmFtIGl0ZW0gLSBDYXJ0IGl0ZW1cbiAgICogQHJldHVybnMgLSBVbmlxdWUgaWQgZm9yIGVycm9yIG1lc3NhZ2VcbiAgICovXG4gIGdldEVycm9yTWVzc2FnZUlkKGl0ZW06IE9yZGVyRW50cnkpOiBzdHJpbmcge1xuICAgIHJldHVybiAnY3gtZXJyb3ItbXNnLScgKyBpdGVtLmVudHJ5TnVtYmVyO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwib3JkZXJFbnRyeSQgfCBhc3luYyBhcyBvcmRlckVudHJ5XCI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJoYXNJc3N1ZXMob3JkZXJFbnRyeSkgJiYgIShyZWFkb25seSQgfCBhc3luYylcIj5cbiAgICA8Y3gtaWNvbiBbdHlwZV09XCJpY29uVHlwZXMuRVJST1JcIj48L2N4LWljb24+XG4gICAgPGRpdiBpZD1cInt7IGdldEVycm9yTWVzc2FnZUlkKG9yZGVyRW50cnkpIH19XCI+XG4gICAgICB7e1xuICAgICAgICAnY29uZmlndXJhdG9yLm5vdGlmaWNhdGlvbkJhbm5lci5udW1iZXJPZklzc3VlcydcbiAgICAgICAgICB8IGN4VHJhbnNsYXRlOiB7IGNvdW50OiBnZXROdW1iZXJPZklzc3VlcyhvcmRlckVudHJ5KSB9XG4gICAgICB9fVxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInF1YW50aXR5Q29udHJvbCQgfCBhc3luYyBhcyBxdWFudGl0eUNvbnRyb2xcIj5cbiAgICAgICAgPGN4LWNvbmZpZ3VyZS1jYXJ0LWVudHJ5XG4gICAgICAgICAgY2xhc3M9XCJjeC1lcnJvci1tc2ctYWN0aW9uXCJcbiAgICAgICAgICAqbmdJZj1cIlxuICAgICAgICAgICAgKHNob3VsZFNob3dCdXR0b24kIHwgYXN5bmMpICYmIG9yZGVyRW50cnk/LnByb2R1Y3Q/LmNvbmZpZ3VyYWJsZVxuICAgICAgICAgIFwiXG4gICAgICAgICAgW2NhcnRFbnRyeV09XCJvcmRlckVudHJ5XCJcbiAgICAgICAgICBbcmVhZE9ubHldPVwiKHJlYWRvbmx5JCB8IGFzeW5jKSA/PyB0cnVlXCJcbiAgICAgICAgICBbbXNnQmFubmVyXT1cInRydWVcIlxuICAgICAgICAgIFtkaXNhYmxlZF09XCJxdWFudGl0eUNvbnRyb2wuZGlzYWJsZWRcIlxuICAgICAgICA+PC9jeC1jb25maWd1cmUtY2FydC1lbnRyeVxuICAgICAgPjwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cbjwvbmctY29udGFpbmVyPlxuIl19