/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Configurator } from '../../../core/model/configurator.model';
import * as i0 from "@angular/core";
export class ConfiguratorAttributeQuantityService {
    /**
     * Checks if the interaction with the quantity control needs
     * to be disabled
     * @param {any} value Selected value
     * @returns {boolean} Quantity actions disabled?
     */
    disableQuantityActions(value) {
        return !value || value === '0';
    }
    /**
     * Checks if the interaction with the quantity control needs for multiselection components
     * to be disabled
     * @param {Configurator.Attribute} attribute Configurator Attribute
     * @returns {boolean} Quantity actions disabled?
     */
    disableQuantityActionsMultiSelection(attribute) {
        return (attribute.dataType ===
            Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL &&
            (!attribute.values ||
                !attribute.values.find((value) => value.selected) ||
                attribute.quantity === 0));
    }
    /**
     * Checks if it is supposed to render a quantity control on attribute level
     *
     * @param {Configurator.Attribute} attribute Configurator Attribute
     * @return {boolean} - Display quantity picker on attribute level?
     */
    withQuantityOnAttributeLevel(attribute) {
        return (attribute.dataType ===
            Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL);
    }
    /**
     * Checks if an attribute needs to be equipped with the option to select
     * a quantity
     * @param {Configurator.DataType} dataType Attribute data type
     * @param {Configurator.UiType} uiType Attribute ui type, refers to how an attribute must be rendered
     * @returns  {boolean} Render a quantity component?
     */
    withQuantity(dataType, uiType) {
        switch (uiType) {
            case Configurator.UiType.DROPDOWN_PRODUCT:
            case Configurator.UiType.DROPDOWN:
            case Configurator.UiType.RADIOBUTTON_PRODUCT:
            case Configurator.UiType.RADIOBUTTON:
                return (dataType === Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL);
            case Configurator.UiType.CHECKBOXLIST:
            case Configurator.UiType.CHECKBOXLIST_PRODUCT:
                return (dataType === Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL);
            default:
                return false;
        }
    }
    /**
     * Checks if the zero quantity is allowed
     *
     * @param {Configurator.Attribute} attribute Configurator Attribute
     * @return {boolean} - true when zero quantity is allowed
     */
    allowZeroValueQuantity(attribute) {
        const selectedValues = attribute.values
            ? attribute.values.filter((value) => value.selected).length
            : 0;
        if (attribute.required && selectedValues < 2) {
            return false;
        }
        return true;
    }
}
ConfiguratorAttributeQuantityService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeQuantityService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorAttributeQuantityService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeQuantityService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeQuantityService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1xdWFudGl0eS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS9xdWFudGl0eS9jb25maWd1cmF0b3ItYXR0cmlidXRlLXF1YW50aXR5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdDQUF3QyxDQUFDOztBQUt0RSxNQUFNLE9BQU8sb0NBQW9DO0lBQy9DOzs7OztPQUtHO0lBQ0gsc0JBQXNCLENBQUMsS0FBVTtRQUMvQixPQUFPLENBQUMsS0FBSyxJQUFJLEtBQUssS0FBSyxHQUFHLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsb0NBQW9DLENBQ2xDLFNBQWlDO1FBRWpDLE9BQU8sQ0FDTCxTQUFTLENBQUMsUUFBUTtZQUNoQixZQUFZLENBQUMsUUFBUSxDQUFDLGtDQUFrQztZQUMxRCxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU07Z0JBQ2hCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7Z0JBQ2pELFNBQVMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQzVCLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCw0QkFBNEIsQ0FBQyxTQUFpQztRQUM1RCxPQUFPLENBQ0wsU0FBUyxDQUFDLFFBQVE7WUFDbEIsWUFBWSxDQUFDLFFBQVEsQ0FBQyxrQ0FBa0MsQ0FDekQsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxZQUFZLENBQ1YsUUFBK0IsRUFDL0IsTUFBMkI7UUFFM0IsUUFBUSxNQUFNLEVBQUU7WUFDZCxLQUFLLFlBQVksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7WUFDMUMsS0FBSyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNsQyxLQUFLLFlBQVksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUM7WUFDN0MsS0FBSyxZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVc7Z0JBQ2xDLE9BQU8sQ0FDTCxRQUFRLEtBQUssWUFBWSxDQUFDLFFBQVEsQ0FBQyxrQ0FBa0MsQ0FDdEUsQ0FBQztZQUVKLEtBQUssWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7WUFDdEMsS0FBSyxZQUFZLENBQUMsTUFBTSxDQUFDLG9CQUFvQjtnQkFDM0MsT0FBTyxDQUNMLFFBQVEsS0FBSyxZQUFZLENBQUMsUUFBUSxDQUFDLDhCQUE4QixDQUNsRSxDQUFDO1lBRUo7Z0JBQ0UsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxzQkFBc0IsQ0FBQyxTQUFpQztRQUN0RCxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsTUFBTTtZQUNyQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNO1lBQzNELENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDTixJQUFJLFNBQVMsQ0FBQyxRQUFRLElBQUksY0FBYyxHQUFHLENBQUMsRUFBRTtZQUM1QyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOztpSUF2RlUsb0NBQW9DO3FJQUFwQyxvQ0FBb0MsY0FGbkMsTUFBTTsyRkFFUCxvQ0FBb0M7a0JBSGhELFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9tb2RlbC9jb25maWd1cmF0b3IubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yQXR0cmlidXRlUXVhbnRpdHlTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgaW50ZXJhY3Rpb24gd2l0aCB0aGUgcXVhbnRpdHkgY29udHJvbCBuZWVkc1xuICAgKiB0byBiZSBkaXNhYmxlZFxuICAgKiBAcGFyYW0ge2FueX0gdmFsdWUgU2VsZWN0ZWQgdmFsdWVcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFF1YW50aXR5IGFjdGlvbnMgZGlzYWJsZWQ/XG4gICAqL1xuICBkaXNhYmxlUXVhbnRpdHlBY3Rpb25zKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXZhbHVlIHx8IHZhbHVlID09PSAnMCc7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBpbnRlcmFjdGlvbiB3aXRoIHRoZSBxdWFudGl0eSBjb250cm9sIG5lZWRzIGZvciBtdWx0aXNlbGVjdGlvbiBjb21wb25lbnRzXG4gICAqIHRvIGJlIGRpc2FibGVkXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkF0dHJpYnV0ZX0gYXR0cmlidXRlIENvbmZpZ3VyYXRvciBBdHRyaWJ1dGVcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFF1YW50aXR5IGFjdGlvbnMgZGlzYWJsZWQ/XG4gICAqL1xuICBkaXNhYmxlUXVhbnRpdHlBY3Rpb25zTXVsdGlTZWxlY3Rpb24oXG4gICAgYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlXG4gICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBhdHRyaWJ1dGUuZGF0YVR5cGUgPT09XG4gICAgICAgIENvbmZpZ3VyYXRvci5EYXRhVHlwZS5VU0VSX1NFTEVDVElPTl9RVFlfQVRUUklCVVRFX0xFVkVMICYmXG4gICAgICAoIWF0dHJpYnV0ZS52YWx1ZXMgfHxcbiAgICAgICAgIWF0dHJpYnV0ZS52YWx1ZXMuZmluZCgodmFsdWUpID0+IHZhbHVlLnNlbGVjdGVkKSB8fFxuICAgICAgICBhdHRyaWJ1dGUucXVhbnRpdHkgPT09IDApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgaXQgaXMgc3VwcG9zZWQgdG8gcmVuZGVyIGEgcXVhbnRpdHkgY29udHJvbCBvbiBhdHRyaWJ1dGUgbGV2ZWxcbiAgICpcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuQXR0cmlidXRlfSBhdHRyaWJ1dGUgQ29uZmlndXJhdG9yIEF0dHJpYnV0ZVxuICAgKiBAcmV0dXJuIHtib29sZWFufSAtIERpc3BsYXkgcXVhbnRpdHkgcGlja2VyIG9uIGF0dHJpYnV0ZSBsZXZlbD9cbiAgICovXG4gIHdpdGhRdWFudGl0eU9uQXR0cmlidXRlTGV2ZWwoYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIGF0dHJpYnV0ZS5kYXRhVHlwZSA9PT1cbiAgICAgIENvbmZpZ3VyYXRvci5EYXRhVHlwZS5VU0VSX1NFTEVDVElPTl9RVFlfQVRUUklCVVRFX0xFVkVMXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYW4gYXR0cmlidXRlIG5lZWRzIHRvIGJlIGVxdWlwcGVkIHdpdGggdGhlIG9wdGlvbiB0byBzZWxlY3RcbiAgICogYSBxdWFudGl0eVxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5EYXRhVHlwZX0gZGF0YVR5cGUgQXR0cmlidXRlIGRhdGEgdHlwZVxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5VaVR5cGV9IHVpVHlwZSBBdHRyaWJ1dGUgdWkgdHlwZSwgcmVmZXJzIHRvIGhvdyBhbiBhdHRyaWJ1dGUgbXVzdCBiZSByZW5kZXJlZFxuICAgKiBAcmV0dXJucyAge2Jvb2xlYW59IFJlbmRlciBhIHF1YW50aXR5IGNvbXBvbmVudD9cbiAgICovXG4gIHdpdGhRdWFudGl0eShcbiAgICBkYXRhVHlwZTogQ29uZmlndXJhdG9yLkRhdGFUeXBlLFxuICAgIHVpVHlwZTogQ29uZmlndXJhdG9yLlVpVHlwZVxuICApOiBib29sZWFuIHtcbiAgICBzd2l0Y2ggKHVpVHlwZSkge1xuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLkRST1BET1dOX1BST0RVQ1Q6XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuRFJPUERPV046XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuUkFESU9CVVRUT05fUFJPRFVDVDpcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5SQURJT0JVVFRPTjpcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBkYXRhVHlwZSA9PT0gQ29uZmlndXJhdG9yLkRhdGFUeXBlLlVTRVJfU0VMRUNUSU9OX1FUWV9BVFRSSUJVVEVfTEVWRUxcbiAgICAgICAgKTtcblxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLkNIRUNLQk9YTElTVDpcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5DSEVDS0JPWExJU1RfUFJPRFVDVDpcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBkYXRhVHlwZSA9PT0gQ29uZmlndXJhdG9yLkRhdGFUeXBlLlVTRVJfU0VMRUNUSU9OX1FUWV9WQUxVRV9MRVZFTFxuICAgICAgICApO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgemVybyBxdWFudGl0eSBpcyBhbGxvd2VkXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkF0dHJpYnV0ZX0gYXR0cmlidXRlIENvbmZpZ3VyYXRvciBBdHRyaWJ1dGVcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gLSB0cnVlIHdoZW4gemVybyBxdWFudGl0eSBpcyBhbGxvd2VkXG4gICAqL1xuICBhbGxvd1plcm9WYWx1ZVF1YW50aXR5KGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHNlbGVjdGVkVmFsdWVzID0gYXR0cmlidXRlLnZhbHVlc1xuICAgICAgPyBhdHRyaWJ1dGUudmFsdWVzLmZpbHRlcigodmFsdWUpID0+IHZhbHVlLnNlbGVjdGVkKS5sZW5ndGhcbiAgICAgIDogMDtcbiAgICBpZiAoYXR0cmlidXRlLnJlcXVpcmVkICYmIHNlbGVjdGVkVmFsdWVzIDwgMikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIl19