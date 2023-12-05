/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonConfigurator } from '../../core/model/common-configurator.model';
import * as i0 from "@angular/core";
import * as i1 from "../../shared/utils/common-configurator-utils.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
import * as i4 from "@spartacus/core";
export class ConfigureCartEntryComponent {
    /**
     * Verifies whether the entry has any issues.
     *
     * @returns - whether there are any issues
     */
    hasIssues() {
        return this.commonConfigUtilsService.hasIssues(this.cartEntry);
    }
    /**
     * Verifies whether the cart entry has an order code and returns a corresponding owner type.
     *
     * @returns - an owner type
     */
    getOwnerType() {
        return this.cartEntry.orderCode !== undefined
            ? CommonConfigurator.OwnerType.ORDER_ENTRY
            : CommonConfigurator.OwnerType.CART_ENTRY;
    }
    /**
     * Verifies whether the cart entry has an order code, retrieves a composed owner ID
     * and concatenates a corresponding entry number.
     *
     * @returns - an entry key
     */
    getEntityKey() {
        const entryNumber = this.cartEntry.entryNumber;
        if (entryNumber === undefined) {
            throw new Error('No entryNumber present in entry');
        }
        return this.cartEntry.orderCode
            ? this.commonConfigUtilsService.getComposedOwnerId(this.cartEntry.orderCode, entryNumber)
            : entryNumber.toString();
    }
    /**
     * Retrieves a corresponding route depending whether the configuration is read only or not.
     *
     * @returns - a route
     */
    getRoute() {
        const configuratorType = this.cartEntry.product?.configuratorType;
        return this.readOnly
            ? 'configureOverview' + configuratorType
            : 'configure' + configuratorType;
    }
    /**
     * Retrieves the state of the configuration.
     *
     *  @returns - 'true' if the configuration is read only, otherwise 'false'
     */
    getDisplayOnly() {
        return this.readOnly;
    }
    /**
     * Verifies whether the link to the configuration is disabled.
     *
     *  @returns - 'true' if the the configuration is not read only, otherwise 'false'
     */
    isDisabled() {
        return this.readOnly ? false : this.disabled;
    }
    /**
     * Retrieves the additional resolve issues accessibility description.
     *
     * @returns - If there is a 'resolve issues' link, the ID to the element with additional description will be returned.
     */
    getResolveIssuesA11yDescription() {
        const errorMsgId = 'cx-error-msg-' + this.cartEntry.entryNumber;
        return !this.readOnly && this.msgBanner ? errorMsgId : undefined;
    }
    /**
     * Compiles query parameters for the router link. 'resolveIssues' is only set if the component is
     * rendered in the context of the message banner, and if issues exist at all
     * @returns Query parameters
     */
    getQueryParams() {
        return {
            forceReload: true,
            resolveIssues: this.msgBanner && this.hasIssues(),
        };
    }
    constructor(commonConfigUtilsService) {
        this.commonConfigUtilsService = commonConfigUtilsService;
    }
}
ConfigureCartEntryComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigureCartEntryComponent, deps: [{ token: i1.CommonConfiguratorUtilsService }], target: i0.ɵɵFactoryTarget.Component });
ConfigureCartEntryComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfigureCartEntryComponent, selector: "cx-configure-cart-entry", inputs: { cartEntry: "cartEntry", readOnly: "readOnly", msgBanner: "msgBanner", disabled: "disabled" }, ngImport: i0, template: "<ng-container *ngIf=\"cartEntry\">\n  <label *ngIf=\"isDisabled()\" class=\"disabled-link\">\n    <ng-container *ngIf=\"isDisabled(); then configureText\"> </ng-container>\n  </label>\n\n  <a\n    *ngIf=\"!isDisabled()\"\n    class=\"link cx-action-link\"\n    [routerLink]=\"\n      {\n        cxRoute: getRoute(),\n        params: {\n          ownerType: getOwnerType(),\n          entityKey: getEntityKey(),\n          displayOnly: getDisplayOnly()\n        }\n      } | cxUrl\n    \"\n    [queryParams]=\"getQueryParams()\"\n    cxAutoFocus\n    attr.aria-describedby=\"{{ getResolveIssuesA11yDescription() }}\"\n  >\n    <ng-container *ngIf=\"!isDisabled(); then configureText\"> </ng-container>\n  </a>\n</ng-container>\n\n<ng-template #configureText>\n  <ng-container *ngIf=\"readOnly\">\n    {{ 'configurator.header.displayConfiguration' | cxTranslate }}</ng-container\n  >\n  <ng-container *ngIf=\"!readOnly && !msgBanner\">\n    {{ 'configurator.header.editConfiguration' | cxTranslate }}\n  </ng-container>\n\n  <ng-container *ngIf=\"!readOnly && msgBanner\">\n    {{ 'configurator.header.resolveIssues' | cxTranslate }}\n  </ng-container>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i4.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigureCartEntryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configure-cart-entry', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"cartEntry\">\n  <label *ngIf=\"isDisabled()\" class=\"disabled-link\">\n    <ng-container *ngIf=\"isDisabled(); then configureText\"> </ng-container>\n  </label>\n\n  <a\n    *ngIf=\"!isDisabled()\"\n    class=\"link cx-action-link\"\n    [routerLink]=\"\n      {\n        cxRoute: getRoute(),\n        params: {\n          ownerType: getOwnerType(),\n          entityKey: getEntityKey(),\n          displayOnly: getDisplayOnly()\n        }\n      } | cxUrl\n    \"\n    [queryParams]=\"getQueryParams()\"\n    cxAutoFocus\n    attr.aria-describedby=\"{{ getResolveIssuesA11yDescription() }}\"\n  >\n    <ng-container *ngIf=\"!isDisabled(); then configureText\"> </ng-container>\n  </a>\n</ng-container>\n\n<ng-template #configureText>\n  <ng-container *ngIf=\"readOnly\">\n    {{ 'configurator.header.displayConfiguration' | cxTranslate }}</ng-container\n  >\n  <ng-container *ngIf=\"!readOnly && !msgBanner\">\n    {{ 'configurator.header.editConfiguration' | cxTranslate }}\n  </ng-container>\n\n  <ng-container *ngIf=\"!readOnly && msgBanner\">\n    {{ 'configurator.header.resolveIssues' | cxTranslate }}\n  </ng-container>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CommonConfiguratorUtilsService }]; }, propDecorators: { cartEntry: [{
                type: Input
            }], readOnly: [{
                type: Input
            }], msgBanner: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlLWNhcnQtZW50cnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbi9jb21wb25lbnRzL2NvbmZpZ3VyZS1jYXJ0LWVudHJ5L2NvbmZpZ3VyZS1jYXJ0LWVudHJ5LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9jb21tb24vY29tcG9uZW50cy9jb25maWd1cmUtY2FydC1lbnRyeS9jb25maWd1cmUtY2FydC1lbnRyeS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNENBQTRDLENBQUM7Ozs7OztBQVFoRixNQUFNLE9BQU8sMkJBQTJCO0lBTXRDOzs7O09BSUc7SUFDSCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxLQUFLLFNBQVM7WUFDM0MsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxXQUFXO1lBQzFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO0lBQzlDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILFlBQVk7UUFDVixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztRQUMvQyxJQUFJLFdBQVcsS0FBSyxTQUFTLEVBQUU7WUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1NBQ3BEO1FBRUQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVM7WUFDN0IsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxrQkFBa0IsQ0FDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQ3hCLFdBQVcsQ0FDWjtZQUNILENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxRQUFRO1FBQ04sTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQztRQUNsRSxPQUFPLElBQUksQ0FBQyxRQUFRO1lBQ2xCLENBQUMsQ0FBQyxtQkFBbUIsR0FBRyxnQkFBZ0I7WUFDeEMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCwrQkFBK0I7UUFDN0IsTUFBTSxVQUFVLEdBQUcsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO1FBQ2hFLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ25FLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsY0FBYztRQUNaLE9BQU87WUFDTCxXQUFXLEVBQUUsSUFBSTtZQUNqQixhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1NBQ2xELENBQUM7SUFDSixDQUFDO0lBRUQsWUFDWSx3QkFBd0Q7UUFBeEQsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUFnQztJQUNqRSxDQUFDOzt3SEFwR08sMkJBQTJCOzRHQUEzQiwyQkFBMkIsdUtDakJ4QyxrcENBc0NBOzJGRHJCYSwyQkFBMkI7a0JBTHZDLFNBQVM7K0JBQ0UseUJBQXlCLG1CQUVsQix1QkFBdUIsQ0FBQyxNQUFNO3FIQUd0QyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBPcmRlckVudHJ5IH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBDb21tb25Db25maWd1cmF0b3IgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVsL2NvbW1vbi1jb25maWd1cmF0b3IubW9kZWwnO1xuaW1wb3J0IHsgQ29tbW9uQ29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzL2NvbW1vbi1jb25maWd1cmF0b3ItdXRpbHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWNvbmZpZ3VyZS1jYXJ0LWVudHJ5JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbmZpZ3VyZS1jYXJ0LWVudHJ5LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyZUNhcnRFbnRyeUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGNhcnRFbnRyeTogT3JkZXJFbnRyeTtcbiAgQElucHV0KCkgcmVhZE9ubHk6IGJvb2xlYW47XG4gIEBJbnB1dCgpIG1zZ0Jhbm5lcjogYm9vbGVhbjtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIHdoZXRoZXIgdGhlIGVudHJ5IGhhcyBhbnkgaXNzdWVzLlxuICAgKlxuICAgKiBAcmV0dXJucyAtIHdoZXRoZXIgdGhlcmUgYXJlIGFueSBpc3N1ZXNcbiAgICovXG4gIGhhc0lzc3VlcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb21tb25Db25maWdVdGlsc1NlcnZpY2UuaGFzSXNzdWVzKHRoaXMuY2FydEVudHJ5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZmllcyB3aGV0aGVyIHRoZSBjYXJ0IGVudHJ5IGhhcyBhbiBvcmRlciBjb2RlIGFuZCByZXR1cm5zIGEgY29ycmVzcG9uZGluZyBvd25lciB0eXBlLlxuICAgKlxuICAgKiBAcmV0dXJucyAtIGFuIG93bmVyIHR5cGVcbiAgICovXG4gIGdldE93bmVyVHlwZSgpOiBDb21tb25Db25maWd1cmF0b3IuT3duZXJUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5jYXJ0RW50cnkub3JkZXJDb2RlICE9PSB1bmRlZmluZWRcbiAgICAgID8gQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyVHlwZS5PUkRFUl9FTlRSWVxuICAgICAgOiBDb21tb25Db25maWd1cmF0b3IuT3duZXJUeXBlLkNBUlRfRU5UUlk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgY2FydCBlbnRyeSBoYXMgYW4gb3JkZXIgY29kZSwgcmV0cmlldmVzIGEgY29tcG9zZWQgb3duZXIgSURcbiAgICogYW5kIGNvbmNhdGVuYXRlcyBhIGNvcnJlc3BvbmRpbmcgZW50cnkgbnVtYmVyLlxuICAgKlxuICAgKiBAcmV0dXJucyAtIGFuIGVudHJ5IGtleVxuICAgKi9cbiAgZ2V0RW50aXR5S2V5KCk6IHN0cmluZyB7XG4gICAgY29uc3QgZW50cnlOdW1iZXIgPSB0aGlzLmNhcnRFbnRyeS5lbnRyeU51bWJlcjtcbiAgICBpZiAoZW50cnlOdW1iZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBlbnRyeU51bWJlciBwcmVzZW50IGluIGVudHJ5Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2FydEVudHJ5Lm9yZGVyQ29kZVxuICAgICAgPyB0aGlzLmNvbW1vbkNvbmZpZ1V0aWxzU2VydmljZS5nZXRDb21wb3NlZE93bmVySWQoXG4gICAgICAgICAgdGhpcy5jYXJ0RW50cnkub3JkZXJDb2RlLFxuICAgICAgICAgIGVudHJ5TnVtYmVyXG4gICAgICAgIClcbiAgICAgIDogZW50cnlOdW1iZXIudG9TdHJpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYSBjb3JyZXNwb25kaW5nIHJvdXRlIGRlcGVuZGluZyB3aGV0aGVyIHRoZSBjb25maWd1cmF0aW9uIGlzIHJlYWQgb25seSBvciBub3QuXG4gICAqXG4gICAqIEByZXR1cm5zIC0gYSByb3V0ZVxuICAgKi9cbiAgZ2V0Um91dGUoKTogc3RyaW5nIHtcbiAgICBjb25zdCBjb25maWd1cmF0b3JUeXBlID0gdGhpcy5jYXJ0RW50cnkucHJvZHVjdD8uY29uZmlndXJhdG9yVHlwZTtcbiAgICByZXR1cm4gdGhpcy5yZWFkT25seVxuICAgICAgPyAnY29uZmlndXJlT3ZlcnZpZXcnICsgY29uZmlndXJhdG9yVHlwZVxuICAgICAgOiAnY29uZmlndXJlJyArIGNvbmZpZ3VyYXRvclR5cGU7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBzdGF0ZSBvZiB0aGUgY29uZmlndXJhdGlvbi5cbiAgICpcbiAgICogIEByZXR1cm5zIC0gJ3RydWUnIGlmIHRoZSBjb25maWd1cmF0aW9uIGlzIHJlYWQgb25seSwgb3RoZXJ3aXNlICdmYWxzZSdcbiAgICovXG4gIGdldERpc3BsYXlPbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnJlYWRPbmx5O1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIHdoZXRoZXIgdGhlIGxpbmsgdG8gdGhlIGNvbmZpZ3VyYXRpb24gaXMgZGlzYWJsZWQuXG4gICAqXG4gICAqICBAcmV0dXJucyAtICd0cnVlJyBpZiB0aGUgdGhlIGNvbmZpZ3VyYXRpb24gaXMgbm90IHJlYWQgb25seSwgb3RoZXJ3aXNlICdmYWxzZSdcbiAgICovXG4gIGlzRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVhZE9ubHkgPyBmYWxzZSA6IHRoaXMuZGlzYWJsZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBhZGRpdGlvbmFsIHJlc29sdmUgaXNzdWVzIGFjY2Vzc2liaWxpdHkgZGVzY3JpcHRpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIC0gSWYgdGhlcmUgaXMgYSAncmVzb2x2ZSBpc3N1ZXMnIGxpbmssIHRoZSBJRCB0byB0aGUgZWxlbWVudCB3aXRoIGFkZGl0aW9uYWwgZGVzY3JpcHRpb24gd2lsbCBiZSByZXR1cm5lZC5cbiAgICovXG4gIGdldFJlc29sdmVJc3N1ZXNBMTF5RGVzY3JpcHRpb24oKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBlcnJvck1zZ0lkID0gJ2N4LWVycm9yLW1zZy0nICsgdGhpcy5jYXJ0RW50cnkuZW50cnlOdW1iZXI7XG4gICAgcmV0dXJuICF0aGlzLnJlYWRPbmx5ICYmIHRoaXMubXNnQmFubmVyID8gZXJyb3JNc2dJZCA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21waWxlcyBxdWVyeSBwYXJhbWV0ZXJzIGZvciB0aGUgcm91dGVyIGxpbmsuICdyZXNvbHZlSXNzdWVzJyBpcyBvbmx5IHNldCBpZiB0aGUgY29tcG9uZW50IGlzXG4gICAqIHJlbmRlcmVkIGluIHRoZSBjb250ZXh0IG9mIHRoZSBtZXNzYWdlIGJhbm5lciwgYW5kIGlmIGlzc3VlcyBleGlzdCBhdCBhbGxcbiAgICogQHJldHVybnMgUXVlcnkgcGFyYW1ldGVyc1xuICAgKi9cbiAgZ2V0UXVlcnlQYXJhbXMoKTogUGFyYW1zIHtcbiAgICByZXR1cm4ge1xuICAgICAgZm9yY2VSZWxvYWQ6IHRydWUsXG4gICAgICByZXNvbHZlSXNzdWVzOiB0aGlzLm1zZ0Jhbm5lciAmJiB0aGlzLmhhc0lzc3VlcygpLFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29tbW9uQ29uZmlnVXRpbHNTZXJ2aWNlOiBDb21tb25Db25maWd1cmF0b3JVdGlsc1NlcnZpY2VcbiAgKSB7fVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImNhcnRFbnRyeVwiPlxuICA8bGFiZWwgKm5nSWY9XCJpc0Rpc2FibGVkKClcIiBjbGFzcz1cImRpc2FibGVkLWxpbmtcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNEaXNhYmxlZCgpOyB0aGVuIGNvbmZpZ3VyZVRleHRcIj4gPC9uZy1jb250YWluZXI+XG4gIDwvbGFiZWw+XG5cbiAgPGFcbiAgICAqbmdJZj1cIiFpc0Rpc2FibGVkKClcIlxuICAgIGNsYXNzPVwibGluayBjeC1hY3Rpb24tbGlua1wiXG4gICAgW3JvdXRlckxpbmtdPVwiXG4gICAgICB7XG4gICAgICAgIGN4Um91dGU6IGdldFJvdXRlKCksXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIG93bmVyVHlwZTogZ2V0T3duZXJUeXBlKCksXG4gICAgICAgICAgZW50aXR5S2V5OiBnZXRFbnRpdHlLZXkoKSxcbiAgICAgICAgICBkaXNwbGF5T25seTogZ2V0RGlzcGxheU9ubHkoKVxuICAgICAgICB9XG4gICAgICB9IHwgY3hVcmxcbiAgICBcIlxuICAgIFtxdWVyeVBhcmFtc109XCJnZXRRdWVyeVBhcmFtcygpXCJcbiAgICBjeEF1dG9Gb2N1c1xuICAgIGF0dHIuYXJpYS1kZXNjcmliZWRieT1cInt7IGdldFJlc29sdmVJc3N1ZXNBMTF5RGVzY3JpcHRpb24oKSB9fVwiXG4gID5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzRGlzYWJsZWQoKTsgdGhlbiBjb25maWd1cmVUZXh0XCI+IDwvbmctY29udGFpbmVyPlxuICA8L2E+XG48L25nLWNvbnRhaW5lcj5cblxuPG5nLXRlbXBsYXRlICNjb25maWd1cmVUZXh0PlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwicmVhZE9ubHlcIj5cbiAgICB7eyAnY29uZmlndXJhdG9yLmhlYWRlci5kaXNwbGF5Q29uZmlndXJhdGlvbicgfCBjeFRyYW5zbGF0ZSB9fTwvbmctY29udGFpbmVyXG4gID5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFyZWFkT25seSAmJiAhbXNnQmFubmVyXCI+XG4gICAge3sgJ2NvbmZpZ3VyYXRvci5oZWFkZXIuZWRpdENvbmZpZ3VyYXRpb24nIHwgY3hUcmFuc2xhdGUgfX1cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFyZWFkT25seSAmJiBtc2dCYW5uZXJcIj5cbiAgICB7eyAnY29uZmlndXJhdG9yLmhlYWRlci5yZXNvbHZlSXNzdWVzJyB8IGN4VHJhbnNsYXRlIH19XG4gIDwvbmctY29udGFpbmVyPlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==