/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeBaseComponent } from './configurator-attribute-base.component';
import * as i0 from "@angular/core";
import * as i1 from "../../quantity/configurator-attribute-quantity.service";
import * as i2 from "../../composition/configurator-attribute-composition.model";
import * as i3 from "../../../../core/facade/configurator-commons.service";
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class ConfiguratorAttributeMultiSelectionBaseComponent extends ConfiguratorAttributeBaseComponent {
    constructor(quantityService, attributeComponentContext, configuratorCommonsService) {
        super();
        this.quantityService = quantityService;
        this.attributeComponentContext = attributeComponentContext;
        this.configuratorCommonsService = configuratorCommonsService;
        this.loading$ = new BehaviorSubject(false);
        this.attribute = attributeComponentContext.attribute;
        this.ownerKey = attributeComponentContext.owner.key;
        this.expMode = attributeComponentContext.expMode;
    }
    /**
     * Checks if we are supposed to render a quantity control on attribute level, which
     * can be derived from the attribute meta data
     *
     * @return {boolean} - Display quantity picker on attribute level?
     */
    get withQuantityOnAttributeLevel() {
        return this.quantityService.withQuantityOnAttributeLevel(this.attribute);
    }
    /**
     * Checks if we are supposed to render a quantity control, which
     * can be derived from the attribute meta data
     *
     * @return {boolean} - Display quantity picker?
     */
    get withQuantity() {
        return this.quantityService.withQuantity(this.attribute.dataType ?? Configurator.DataType.NOT_IMPLEMENTED, this.attribute.uiType ?? Configurator.UiType.NOT_IMPLEMENTED);
    }
    /**
     * Checks if quantity control should be disabled
     *
     * @return {boolean} - Disable quantity picker?
     */
    get disableQuantityActions() {
        return this.quantityService.disableQuantityActionsMultiSelection(this.attribute);
    }
    /**
     *  Extract corresponding quantity parameters
     *
     * @param {number} initialQuantity - Initial quantity
     * @param {boolean} allowZero - Allow zero
     * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
     */
    extractQuantityParameters(initialQuantity, allowZero) {
        const disableQuantityActions$ = this.loading$.pipe(map((loading) => {
            return loading || this.disableQuantityActions;
        }));
        return {
            allowZero: allowZero ?? !this.attribute.required,
            initialQuantity: initialQuantity,
            disableQuantityActions$: disableQuantityActions$,
        };
    }
    onHandleAttributeQuantity(quantity) {
        this.loading$.next(true);
        this.configuratorCommonsService.updateConfiguration(this.ownerKey, {
            ...this.attribute,
            quantity,
        }, Configurator.UpdateType.ATTRIBUTE_QUANTITY);
    }
    /**
     * Extract corresponding price formula parameters.
     * For the multi-selection attribute types only total price of the attribute should be displayed at the attribute level.
     *
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractPriceFormulaParameters() {
        return {
            quantity: 0,
            price: {
                value: 0,
                currencyIso: '',
            },
            priceTotal: this.attribute.attributePriceTotal,
            isLightedUp: true,
        };
    }
    /**
     * Extract corresponding value price formula parameters.
     * For the multi-selection attribute types the complete price formula should be displayed at the value level.
     *
     * @param {Configurator.Value} value - Configurator value
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractValuePriceFormulaParameters(value) {
        return {
            quantity: value.quantity,
            price: value.valuePrice,
            priceTotal: value.valuePriceTotal,
            isLightedUp: value.selected,
        };
    }
}
ConfiguratorAttributeMultiSelectionBaseComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBaseComponent, deps: [{ token: i1.ConfiguratorAttributeQuantityService }, { token: i2.ConfiguratorAttributeCompositionContext }, { token: i3.ConfiguratorCommonsService }], target: i0.ɵɵFactoryTarget.Directive });
ConfiguratorAttributeMultiSelectionBaseComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeMultiSelectionBaseComponent, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBaseComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorAttributeQuantityService }, { type: i2.ConfiguratorAttributeCompositionContext }, { type: i3.ConfiguratorCommonsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1tdWx0aS1zZWxlY3Rpb24tYmFzZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvbXBvbmVudHMvYXR0cmlidXRlL3R5cGVzL2Jhc2UvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1tdWx0aS1zZWxlY3Rpb24tYmFzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBTXpFLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOzs7OztBQUk3RixrRUFBa0U7QUFDbEUsTUFBTSxPQUFnQixnREFBaUQsU0FBUSxrQ0FBa0M7SUFPL0csWUFDWSxlQUFxRCxFQUNyRCx5QkFBa0UsRUFDbEUsMEJBQXNEO1FBRWhFLEtBQUssRUFBRSxDQUFDO1FBSkUsb0JBQWUsR0FBZixlQUFlLENBQXNDO1FBQ3JELDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBeUM7UUFDbEUsK0JBQTBCLEdBQTFCLDBCQUEwQixDQUE0QjtRQVRsRSxhQUFRLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7UUFZN0MsSUFBSSxDQUFDLFNBQVMsR0FBRyx5QkFBeUIsQ0FBQyxTQUFTLENBQUM7UUFDckQsSUFBSSxDQUFDLFFBQVEsR0FBRyx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ3BELElBQUksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUMsT0FBTyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILElBQUksNEJBQTRCO1FBQzlCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQ2hFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUM3RCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFJLHNCQUFzQjtRQUN4QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsb0NBQW9DLENBQzlELElBQUksQ0FBQyxTQUFTLENBQ2YsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCx5QkFBeUIsQ0FDdkIsZUFBd0IsRUFDeEIsU0FBbUI7UUFFbkIsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDaEQsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDZCxPQUFPLE9BQU8sSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLE9BQU87WUFDTCxTQUFTLEVBQUUsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRO1lBQ2hELGVBQWUsRUFBRSxlQUFlO1lBQ2hDLHVCQUF1QixFQUFFLHVCQUF1QjtTQUNqRCxDQUFDO0lBQ0osQ0FBQztJQUVTLHlCQUF5QixDQUFDLFFBQWdCO1FBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpCLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxtQkFBbUIsQ0FDakQsSUFBSSxDQUFDLFFBQVEsRUFDYjtZQUNFLEdBQUcsSUFBSSxDQUFDLFNBQVM7WUFDakIsUUFBUTtTQUNULEVBQ0QsWUFBWSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FDM0MsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILDZCQUE2QjtRQUMzQixPQUFPO1lBQ0wsUUFBUSxFQUFFLENBQUM7WUFDWCxLQUFLLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsV0FBVyxFQUFFLEVBQUU7YUFDaEI7WUFDRCxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUI7WUFDOUMsV0FBVyxFQUFFLElBQUk7U0FDbEIsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxrQ0FBa0MsQ0FDaEMsS0FBeUI7UUFFekIsT0FBTztZQUNMLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtZQUN4QixLQUFLLEVBQUUsS0FBSyxDQUFDLFVBQVU7WUFDdkIsVUFBVSxFQUFFLEtBQUssQ0FBQyxlQUFlO1lBQ2pDLFdBQVcsRUFBRSxLQUFLLENBQUMsUUFBUTtTQUM1QixDQUFDO0lBQ0osQ0FBQzs7NklBM0htQixnREFBZ0Q7aUlBQWhELGdEQUFnRDsyRkFBaEQsZ0RBQWdEO2tCQUZyRSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvbW9kZWwvY29uZmlndXJhdG9yLm1vZGVsJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUNvbXBvc2l0aW9uQ29udGV4dCB9IGZyb20gJy4uLy4uL2NvbXBvc2l0aW9uL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtY29tcG9zaXRpb24ubW9kZWwnO1xuXG5pbXBvcnQgeyBDb25maWd1cmF0b3JQcmljZUNvbXBvbmVudE9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9wcmljZS9jb25maWd1cmF0b3ItcHJpY2UuY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZVF1YW50aXR5Q29tcG9uZW50T3B0aW9ucyB9IGZyb20gJy4uLy4uL3F1YW50aXR5L2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtcXVhbnRpdHkuY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZVF1YW50aXR5U2VydmljZSB9IGZyb20gJy4uLy4uL3F1YW50aXR5L2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtcXVhbnRpdHkuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maWd1cmF0b3ItYXR0cmlidXRlLWJhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9mYWNhZGUvY29uZmlndXJhdG9yLWNvbW1vbnMuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoKVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtY2xhc3Mtc3VmZml4XG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29uZmlndXJhdG9yQXR0cmlidXRlTXVsdGlTZWxlY3Rpb25CYXNlQ29tcG9uZW50IGV4dGVuZHMgQ29uZmlndXJhdG9yQXR0cmlidXRlQmFzZUNvbXBvbmVudCB7XG4gIGxvYWRpbmckID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlO1xuICBvd25lcktleTogc3RyaW5nO1xuICBleHBNb2RlOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBxdWFudGl0eVNlcnZpY2U6IENvbmZpZ3VyYXRvckF0dHJpYnV0ZVF1YW50aXR5U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXR0cmlidXRlQ29tcG9uZW50Q29udGV4dDogQ29uZmlndXJhdG9yQXR0cmlidXRlQ29tcG9zaXRpb25Db250ZXh0LFxuICAgIHByb3RlY3RlZCBjb25maWd1cmF0b3JDb21tb25zU2VydmljZTogQ29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmF0dHJpYnV0ZSA9IGF0dHJpYnV0ZUNvbXBvbmVudENvbnRleHQuYXR0cmlidXRlO1xuICAgIHRoaXMub3duZXJLZXkgPSBhdHRyaWJ1dGVDb21wb25lbnRDb250ZXh0Lm93bmVyLmtleTtcbiAgICB0aGlzLmV4cE1vZGUgPSBhdHRyaWJ1dGVDb21wb25lbnRDb250ZXh0LmV4cE1vZGU7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHdlIGFyZSBzdXBwb3NlZCB0byByZW5kZXIgYSBxdWFudGl0eSBjb250cm9sIG9uIGF0dHJpYnV0ZSBsZXZlbCwgd2hpY2hcbiAgICogY2FuIGJlIGRlcml2ZWQgZnJvbSB0aGUgYXR0cmlidXRlIG1ldGEgZGF0YVxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSAtIERpc3BsYXkgcXVhbnRpdHkgcGlja2VyIG9uIGF0dHJpYnV0ZSBsZXZlbD9cbiAgICovXG4gIGdldCB3aXRoUXVhbnRpdHlPbkF0dHJpYnV0ZUxldmVsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnF1YW50aXR5U2VydmljZS53aXRoUXVhbnRpdHlPbkF0dHJpYnV0ZUxldmVsKHRoaXMuYXR0cmlidXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgd2UgYXJlIHN1cHBvc2VkIHRvIHJlbmRlciBhIHF1YW50aXR5IGNvbnRyb2wsIHdoaWNoXG4gICAqIGNhbiBiZSBkZXJpdmVkIGZyb20gdGhlIGF0dHJpYnV0ZSBtZXRhIGRhdGFcbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gLSBEaXNwbGF5IHF1YW50aXR5IHBpY2tlcj9cbiAgICovXG4gIGdldCB3aXRoUXVhbnRpdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucXVhbnRpdHlTZXJ2aWNlLndpdGhRdWFudGl0eShcbiAgICAgIHRoaXMuYXR0cmlidXRlLmRhdGFUeXBlID8/IENvbmZpZ3VyYXRvci5EYXRhVHlwZS5OT1RfSU1QTEVNRU5URUQsXG4gICAgICB0aGlzLmF0dHJpYnV0ZS51aVR5cGUgPz8gQ29uZmlndXJhdG9yLlVpVHlwZS5OT1RfSU1QTEVNRU5URURcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBxdWFudGl0eSBjb250cm9sIHNob3VsZCBiZSBkaXNhYmxlZFxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSAtIERpc2FibGUgcXVhbnRpdHkgcGlja2VyP1xuICAgKi9cbiAgZ2V0IGRpc2FibGVRdWFudGl0eUFjdGlvbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucXVhbnRpdHlTZXJ2aWNlLmRpc2FibGVRdWFudGl0eUFjdGlvbnNNdWx0aVNlbGVjdGlvbihcbiAgICAgIHRoaXMuYXR0cmlidXRlXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgRXh0cmFjdCBjb3JyZXNwb25kaW5nIHF1YW50aXR5IHBhcmFtZXRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluaXRpYWxRdWFudGl0eSAtIEluaXRpYWwgcXVhbnRpdHlcbiAgICogQHBhcmFtIHtib29sZWFufSBhbGxvd1plcm8gLSBBbGxvdyB6ZXJvXG4gICAqIEByZXR1cm4ge0NvbmZpZ3VyYXRvckF0dHJpYnV0ZVF1YW50aXR5Q29tcG9uZW50T3B0aW9uc30gLSBOZXcgcXVhbnRpdHkgb3B0aW9uc1xuICAgKi9cbiAgZXh0cmFjdFF1YW50aXR5UGFyYW1ldGVycyhcbiAgICBpbml0aWFsUXVhbnRpdHk/OiBudW1iZXIsXG4gICAgYWxsb3daZXJvPzogYm9vbGVhblxuICApOiBDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eUNvbXBvbmVudE9wdGlvbnMge1xuICAgIGNvbnN0IGRpc2FibGVRdWFudGl0eUFjdGlvbnMkID0gdGhpcy5sb2FkaW5nJC5waXBlKFxuICAgICAgbWFwKChsb2FkaW5nKSA9PiB7XG4gICAgICAgIHJldHVybiBsb2FkaW5nIHx8IHRoaXMuZGlzYWJsZVF1YW50aXR5QWN0aW9ucztcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHJldHVybiB7XG4gICAgICBhbGxvd1plcm86IGFsbG93WmVybyA/PyAhdGhpcy5hdHRyaWJ1dGUucmVxdWlyZWQsXG4gICAgICBpbml0aWFsUXVhbnRpdHk6IGluaXRpYWxRdWFudGl0eSxcbiAgICAgIGRpc2FibGVRdWFudGl0eUFjdGlvbnMkOiBkaXNhYmxlUXVhbnRpdHlBY3Rpb25zJCxcbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uSGFuZGxlQXR0cmlidXRlUXVhbnRpdHkocXVhbnRpdHk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZyQubmV4dCh0cnVlKTtcblxuICAgIHRoaXMuY29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2UudXBkYXRlQ29uZmlndXJhdGlvbihcbiAgICAgIHRoaXMub3duZXJLZXksXG4gICAgICB7XG4gICAgICAgIC4uLnRoaXMuYXR0cmlidXRlLFxuICAgICAgICBxdWFudGl0eSxcbiAgICAgIH0sXG4gICAgICBDb25maWd1cmF0b3IuVXBkYXRlVHlwZS5BVFRSSUJVVEVfUVVBTlRJVFlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4dHJhY3QgY29ycmVzcG9uZGluZyBwcmljZSBmb3JtdWxhIHBhcmFtZXRlcnMuXG4gICAqIEZvciB0aGUgbXVsdGktc2VsZWN0aW9uIGF0dHJpYnV0ZSB0eXBlcyBvbmx5IHRvdGFsIHByaWNlIG9mIHRoZSBhdHRyaWJ1dGUgc2hvdWxkIGJlIGRpc3BsYXllZCBhdCB0aGUgYXR0cmlidXRlIGxldmVsLlxuICAgKlxuICAgKiBAcmV0dXJuIHtDb25maWd1cmF0b3JQcmljZUNvbXBvbmVudE9wdGlvbnN9IC0gTmV3IHByaWNlIGZvcm11bGFcbiAgICovXG4gIGV4dHJhY3RQcmljZUZvcm11bGFQYXJhbWV0ZXJzKCk6IENvbmZpZ3VyYXRvclByaWNlQ29tcG9uZW50T3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHF1YW50aXR5OiAwLFxuICAgICAgcHJpY2U6IHtcbiAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgIGN1cnJlbmN5SXNvOiAnJyxcbiAgICAgIH0sXG4gICAgICBwcmljZVRvdGFsOiB0aGlzLmF0dHJpYnV0ZS5hdHRyaWJ1dGVQcmljZVRvdGFsLFxuICAgICAgaXNMaWdodGVkVXA6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRyYWN0IGNvcnJlc3BvbmRpbmcgdmFsdWUgcHJpY2UgZm9ybXVsYSBwYXJhbWV0ZXJzLlxuICAgKiBGb3IgdGhlIG11bHRpLXNlbGVjdGlvbiBhdHRyaWJ1dGUgdHlwZXMgdGhlIGNvbXBsZXRlIHByaWNlIGZvcm11bGEgc2hvdWxkIGJlIGRpc3BsYXllZCBhdCB0aGUgdmFsdWUgbGV2ZWwuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLlZhbHVlfSB2YWx1ZSAtIENvbmZpZ3VyYXRvciB2YWx1ZVxuICAgKiBAcmV0dXJuIHtDb25maWd1cmF0b3JQcmljZUNvbXBvbmVudE9wdGlvbnN9IC0gTmV3IHByaWNlIGZvcm11bGFcbiAgICovXG4gIGV4dHJhY3RWYWx1ZVByaWNlRm9ybXVsYVBhcmFtZXRlcnMoXG4gICAgdmFsdWU6IENvbmZpZ3VyYXRvci5WYWx1ZVxuICApOiBDb25maWd1cmF0b3JQcmljZUNvbXBvbmVudE9wdGlvbnMge1xuICAgIHJldHVybiB7XG4gICAgICBxdWFudGl0eTogdmFsdWUucXVhbnRpdHksXG4gICAgICBwcmljZTogdmFsdWUudmFsdWVQcmljZSxcbiAgICAgIHByaWNlVG90YWw6IHZhbHVlLnZhbHVlUHJpY2VUb3RhbCxcbiAgICAgIGlzTGlnaHRlZFVwOiB2YWx1ZS5zZWxlY3RlZCxcbiAgICB9O1xuICB9XG59XG4iXX0=