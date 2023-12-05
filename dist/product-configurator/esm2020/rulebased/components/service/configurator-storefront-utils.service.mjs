/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, inject, isDevMode } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { map, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../core/facade/configurator-groups.service";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/storefront";
export class ConfiguratorStorefrontUtilsService {
    constructor(configuratorGroupsService, windowRef, keyboardFocusService) {
        this.configuratorGroupsService = configuratorGroupsService;
        this.windowRef = windowRef;
        this.keyboardFocusService = keyboardFocusService;
        /**
         * 'CX' prefix is used to generate an alphanumeric prefix ID.
         */
        this.CX_PREFIX = 'cx';
        this.SEPARATOR = '--';
        /**
         * Height of a CSS box model of an 'add-to-cart' button
         * See _configurator-add-to-cart-button.scss
         */
        this.ADD_TO_CART_BUTTON_HEIGHT = 82;
        this.logger = inject(LoggerService);
    }
    /**
     * Does the configuration belong to a cart entry, or has the group been visited already?
     * In both cases we need to render indications for mandatory attributes.
     * This method emits only once and then stops further emissions.
     *
     * @param {CommonConfigurator.Owner} owner -
     * @param {string} groupId - Group ID
     * @return {Observable<boolean>} - Returns 'Observable<true>' if the cart entry or group are visited, otherwise 'Observable<false>'
     */
    isCartEntryOrGroupVisited(owner, groupId) {
        return this.configuratorGroupsService.isGroupVisited(owner, groupId).pipe(take(1), map((result) => result ? true : owner.type === CommonConfigurator.OwnerType.CART_ENTRY));
    }
    /**
     * Assemble an attribute value with the currently selected values from a checkbox list.
     *
     * @param {UntypedFormControl[]} controlArray - Control array
     * @param {Configurator.Attribute} attribute -  Configuration attribute
     * @return {Configurator.Value[]} - list of configurator values
     */
    assembleValuesForMultiSelectAttributes(controlArray, attribute) {
        const localAssembledValues = [];
        for (let i = 0; i < controlArray.length; i++) {
            const value = attribute.values ? attribute.values[i] : undefined;
            if (value) {
                const localAttributeValue = {
                    valueCode: value.valueCode,
                };
                localAttributeValue.name = value.name;
                localAttributeValue.quantity = value.quantity;
                localAttributeValue.selected = controlArray[i].value;
                localAssembledValues.push(localAttributeValue);
            }
            else {
                if (isDevMode()) {
                    this.logger.warn('ControlArray does not match values, at least one value could not been found');
                }
            }
        }
        return localAssembledValues;
    }
    /**
     * Scrolls to the corresponding HTML element.
     *
     * @param {Element | HTMLElement} element - HTML element
     */
    scroll(element) {
        let topOffset = 0;
        if (element instanceof HTMLElement) {
            topOffset = element.offsetTop;
        }
        this.windowRef.nativeWindow?.scroll(0, topOffset);
    }
    /**
     * Scrolls to the corresponding configuration element in the HTML tree.
     *
     * @param {string} selector - Selector of the HTML element
     */
    scrollToConfigurationElement(selector) {
        if (this.windowRef.isBrowser()) {
            // we don't want to run this logic when doing SSR
            const element = this.getElement(selector);
            if (element) {
                this.scroll(element);
            }
        }
    }
    /**
     * Focus the first attribute in the form.
     */
    focusFirstAttribute() {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        const form = this.getElement('cx-configurator-form');
        if (form) {
            const focusableElements = this.keyboardFocusService.findFocusable(form);
            if (focusableElements && focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }
    }
    getFocusableElementById(focusableElements, id) {
        return focusableElements.find((focusableElement) => {
            if (id) {
                if (focusableElement.nodeName.toLocaleLowerCase().indexOf(id) !== -1 ||
                    focusableElement.id.indexOf(id) !== -1) {
                    return focusableElement;
                }
            }
        });
    }
    getFocusableConflictDescription(focusableElements) {
        return this.getFocusableElementById(focusableElements, 'cx-configurator-conflict-description');
    }
    getFocusableElementByValueUiKey(focusableElements, valueUiKey) {
        return this.getFocusableElementById(focusableElements, valueUiKey);
    }
    getFocusableElementByAttributeId(focusableElements, attributeName) {
        return this.getFocusableElementById(focusableElements, attributeName);
    }
    createAttributeValueUiKey(attributeId, valueId) {
        return attributeId + this.SEPARATOR + valueId;
    }
    /**
     * Focus a value in the form.
     *
     * @param {Configurator.Attribute} attribute - Attribute
     */
    focusValue(attribute) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        const form = this.getElement('cx-configurator-form');
        if (form) {
            const focusableElements = this.keyboardFocusService.findFocusable(form);
            if (focusableElements.length > 0) {
                this.focusOnElements(focusableElements, attribute);
            }
        }
    }
    focusOnElements(focusableElements, attribute) {
        let foundFocusableElement = this.getFocusableConflictDescription(focusableElements);
        if (!foundFocusableElement) {
            foundFocusableElement = this.focusOnElementForConflicting(attribute, foundFocusableElement, focusableElements);
        }
        if (foundFocusableElement) {
            foundFocusableElement.focus();
        }
    }
    focusOnElementForConflicting(attribute, foundFocusableElement, focusableElements) {
        const selectedValue = attribute.values?.find((value) => value.selected);
        if (selectedValue) {
            const valueUiKey = this.createAttributeValueUiKey(attribute.name, selectedValue.valueCode);
            foundFocusableElement = this.getFocusableElementByValueUiKey(focusableElements, valueUiKey);
        }
        if (!foundFocusableElement) {
            foundFocusableElement = this.getFocusableElementByAttributeId(focusableElements, attribute.name);
        }
        return foundFocusableElement;
    }
    /**
     * Retrieves a unique prefix ID.
     *
     * @param {string | undefined} prefix - prefix that we need to make the ID unique
     * @param {string} groupId - group ID
     * @returns {string} - prefix ID
     */
    getPrefixId(idPrefix, groupId) {
        return idPrefix
            ? idPrefix + this.SEPARATOR + groupId
            : this.CX_PREFIX + this.SEPARATOR + groupId;
    }
    /**
     * Generates a group ID.
     *
     * @param {string} groupId - group ID
     * @returns {string | undefined} - generated group ID
     */
    createGroupId(groupId) {
        if (groupId) {
            return groupId + '-group';
        }
    }
    /**
     * Generates a unique overview group ID from the local group ID
     * and a prefix that reflects the parent groups in the group hierarchy
     *
     * @param {string} prefix - prefix that we need to make the ID unique
     * @param {string} groupId - group ID
     * @returns {string} - generated group ID
     */
    createOvGroupId(prefix, groupId) {
        return this.getPrefixId(prefix, groupId) + '-ovGroup';
    }
    /**
     * Generates a unique overview menu item ID from the local group ID
     * and a prefix that reflects the parent groups in the group hierarchy
     *
     * @param {string} prefix - prefix that we need to make the ID unique
     * @param {string} groupId - group ID
     * @returns {string} - generated group ID
     */
    createOvMenuItemId(prefix, groupId) {
        return this.getPrefixId(prefix, groupId) + '-ovMenuItem';
    }
    /**
     * Persist the keyboard focus state for the given key.
     * The focus is stored globally or for the given group.
     *
     * @param {string} key - key
     * @param {string} group? - Group
     */
    setFocus(key, group) {
        if (key) {
            this.keyboardFocusService.set(key, group);
        }
    }
    /**
     * Change styling of element
     *
     * @param {string} querySelector - querySelector
     * @param {string} property - CSS property
     * @param {string} value - CSS value
     */
    changeStyling(querySelector, property, value) {
        const element = this.getElement(querySelector);
        if (element) {
            element.style.setProperty(property, value);
        }
    }
    /**
     * Removes styling for element
     *
     * @param {string} querySelector - querySelector
     * @param {string} property - CSS property
     */
    removeStyling(querySelector, property) {
        const element = this.getElement(querySelector);
        if (element) {
            element.style.removeProperty(property);
        }
    }
    /**
     * Get HTML element based on querySelector when running in browser
     *
     * @param querySelector - querySelector
     * @returns selected HTML element
     */
    getElement(querySelector) {
        if (this.windowRef.isBrowser()) {
            return this.windowRef.document.querySelector(querySelector);
        }
    }
    /**
     * Retrieves a list of HTML elements based on querySelector when running in browser
     *
     * @param {string} querySelector - querySelector
     * @returns {HTMLElement[] | undefined} - List of HTML elements
     */
    getElements(querySelector) {
        if (this.windowRef.isBrowser()) {
            return Array.from(this.windowRef.document.querySelectorAll(querySelector));
        }
    }
    /**
     * Retrieves a number of pixels that the document is currently scrolled vertically.
     *
     * @returns {number | undefined} - Number of pixels that the document is currently scrolled vertically.
     */
    getVerticallyScrolledPixels() {
        if (this.windowRef.isBrowser()) {
            return this.windowRef.nativeWindow?.scrollY;
        }
        return undefined;
    }
    /**
     * Verifies whether the element has a scrollbar.
     *
     * @param {string} querySelector - Element query selector
     * @returns {boolean} - 'True', if the element has a scrollbar, otherwise 'false'
     */
    hasScrollbar(querySelector) {
        const element = this.getElement(querySelector);
        if (element) {
            return element.scrollHeight > element.clientHeight;
        }
        return false;
    }
    isInViewport(element) {
        if (element) {
            const bounding = element.getBoundingClientRect();
            const height = element.offsetHeight;
            const width = element.offsetWidth;
            return (bounding.top >= -height &&
                bounding.left >= -width &&
                bounding.right <=
                    (this.windowRef.nativeWindow?.innerWidth || element.clientWidth) +
                        width &&
                bounding.bottom <=
                    (this.windowRef.nativeWindow?.innerHeight || element.clientHeight) +
                        height);
        }
        return false;
    }
    getHeight(querySelector) {
        const element = this.getElement(querySelector);
        const isElementInViewport = this.isInViewport(element);
        if (isElementInViewport && element?.offsetHeight) {
            return element?.offsetHeight;
        }
        return 0;
    }
    /**
     * Retrieves the actual height of the spare viewport.
     *
     * SPA header, variant configuration overview header and "Add to cart" button occupy certain height of the viewport, that's why
     * if SPA header, variant configuration overview header and "Add to cart" button are in the viewport,
     * they will be subtracted from the actual viewport height.
     *
     * @returns {number} - Height of the spare viewport.
     */
    getSpareViewportHeight() {
        if (this.windowRef.isBrowser()) {
            const spaHeaderHeight = this.getHeight('header');
            const ovHeaderHeight = this.getHeight('.VariantConfigOverviewHeader');
            const addToCartHeight = this.getHeight('cx-configurator-add-to-cart-button') !== 0
                ? this.getHeight('cx-configurator-add-to-cart-button')
                : this.ADD_TO_CART_BUTTON_HEIGHT;
            const occupiedHeight = spaHeaderHeight + ovHeaderHeight + addToCartHeight * 2;
            return this.windowRef.nativeWindow
                ? this.windowRef.nativeWindow.innerHeight - occupiedHeight
                : 0;
        }
        return 0;
    }
    /**
     * Ensure that the element is always visible.
     *
     * @param {string} querySelector - Element query selector
     * @param {HTMLElement | undefined} element - Element that should be visible within the scrollable element.
     */
    ensureElementVisible(querySelector, element) {
        const container = this.getElement(querySelector);
        if (element && container) {
            if (element.offsetTop > container.scrollTop) {
                const offsetBottom = element.offsetTop + element.offsetHeight;
                if (offsetBottom > container.scrollTop) {
                    container.scrollTop = offsetBottom - container.offsetHeight;
                }
            }
            else {
                container.scrollTop = element.getBoundingClientRect()?.top - 10;
            }
        }
    }
}
ConfiguratorStorefrontUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorStorefrontUtilsService, deps: [{ token: i1.ConfiguratorGroupsService }, { token: i2.WindowRef }, { token: i3.KeyboardFocusService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorStorefrontUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorStorefrontUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorStorefrontUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorGroupsService }, { type: i2.WindowRef }, { type: i3.KeyboardFocusService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXN0b3JlZnJvbnQtdXRpbHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9zZXJ2aWNlL2NvbmZpZ3VyYXRvci1zdG9yZWZyb250LXV0aWxzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUUsYUFBYSxFQUFhLE1BQU0saUJBQWlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFHNUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFPM0MsTUFBTSxPQUFPLGtDQUFrQztJQWM3QyxZQUNZLHlCQUFvRCxFQUNwRCxTQUFvQixFQUNwQixvQkFBMEM7UUFGMUMsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQUNwRCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFoQnREOztXQUVHO1FBQ2dCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNwQzs7O1dBR0c7UUFDZ0IsOEJBQXlCLEdBQUcsRUFBRSxDQUFDO1FBRXhDLFdBQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFNdEMsQ0FBQztJQUVKOzs7Ozs7OztPQVFHO0lBQ0gseUJBQXlCLENBQ3ZCLEtBQStCLEVBQy9CLE9BQWU7UUFFZixPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDdkUs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LFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaW5qZWN0LCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVudHlwZWRGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UsIFdpbmRvd1JlZiB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Db25maWd1cmF0b3IgfSBmcm9tICdAc3BhcnRhY3VzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbic7XG5pbXBvcnQgeyBLZXlib2FyZEZvY3VzU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JHcm91cHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9mYWNhZGUvY29uZmlndXJhdG9yLWdyb3Vwcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWwvY29uZmlndXJhdG9yLm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2Uge1xuICAvKipcbiAgICogJ0NYJyBwcmVmaXggaXMgdXNlZCB0byBnZW5lcmF0ZSBhbiBhbHBoYW51bWVyaWMgcHJlZml4IElELlxuICAgKi9cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IENYX1BSRUZJWCA9ICdjeCc7XG4gIHByb3RlY3RlZCByZWFkb25seSBTRVBBUkFUT1IgPSAnLS0nO1xuICAvKipcbiAgICogSGVpZ2h0IG9mIGEgQ1NTIGJveCBtb2RlbCBvZiBhbiAnYWRkLXRvLWNhcnQnIGJ1dHRvblxuICAgKiBTZWUgX2NvbmZpZ3VyYXRvci1hZGQtdG8tY2FydC1idXR0b24uc2Nzc1xuICAgKi9cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IEFERF9UT19DQVJUX0JVVFRPTl9IRUlHSFQgPSA4MjtcblxuICBwcm90ZWN0ZWQgbG9nZ2VyID0gaW5qZWN0KExvZ2dlclNlcnZpY2UpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjb25maWd1cmF0b3JHcm91cHNTZXJ2aWNlOiBDb25maWd1cmF0b3JHcm91cHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB3aW5kb3dSZWY6IFdpbmRvd1JlZixcbiAgICBwcm90ZWN0ZWQga2V5Ym9hcmRGb2N1c1NlcnZpY2U6IEtleWJvYXJkRm9jdXNTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogRG9lcyB0aGUgY29uZmlndXJhdGlvbiBiZWxvbmcgdG8gYSBjYXJ0IGVudHJ5LCBvciBoYXMgdGhlIGdyb3VwIGJlZW4gdmlzaXRlZCBhbHJlYWR5P1xuICAgKiBJbiBib3RoIGNhc2VzIHdlIG5lZWQgdG8gcmVuZGVyIGluZGljYXRpb25zIGZvciBtYW5kYXRvcnkgYXR0cmlidXRlcy5cbiAgICogVGhpcyBtZXRob2QgZW1pdHMgb25seSBvbmNlIGFuZCB0aGVuIHN0b3BzIGZ1cnRoZXIgZW1pc3Npb25zLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcn0gb3duZXIgLVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZ3JvdXBJZCAtIEdyb3VwIElEXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8Ym9vbGVhbj59IC0gUmV0dXJucyAnT2JzZXJ2YWJsZTx0cnVlPicgaWYgdGhlIGNhcnQgZW50cnkgb3IgZ3JvdXAgYXJlIHZpc2l0ZWQsIG90aGVyd2lzZSAnT2JzZXJ2YWJsZTxmYWxzZT4nXG4gICAqL1xuICBpc0NhcnRFbnRyeU9yR3JvdXBWaXNpdGVkKFxuICAgIG93bmVyOiBDb21tb25Db25maWd1cmF0b3IuT3duZXIsXG4gICAgZ3JvdXBJZDogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRvckdyb3Vwc1NlcnZpY2UuaXNHcm91cFZpc2l0ZWQob3duZXIsIGdyb3VwSWQpLnBpcGUoXG4gICAgICB0YWtlKDEpLFxuICAgICAgbWFwKChyZXN1bHQpID0+XG4gICAgICAgIHJlc3VsdCA/IHRydWUgOiBvd25lci50eXBlID09PSBDb21tb25Db25maWd1cmF0b3IuT3duZXJUeXBlLkNBUlRfRU5UUllcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFzc2VtYmxlIGFuIGF0dHJpYnV0ZSB2YWx1ZSB3aXRoIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgdmFsdWVzIGZyb20gYSBjaGVja2JveCBsaXN0LlxuICAgKlxuICAgKiBAcGFyYW0ge1VudHlwZWRGb3JtQ29udHJvbFtdfSBjb250cm9sQXJyYXkgLSBDb250cm9sIGFycmF5XG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkF0dHJpYnV0ZX0gYXR0cmlidXRlIC0gIENvbmZpZ3VyYXRpb24gYXR0cmlidXRlXG4gICAqIEByZXR1cm4ge0NvbmZpZ3VyYXRvci5WYWx1ZVtdfSAtIGxpc3Qgb2YgY29uZmlndXJhdG9yIHZhbHVlc1xuICAgKi9cbiAgYXNzZW1ibGVWYWx1ZXNGb3JNdWx0aVNlbGVjdEF0dHJpYnV0ZXMoXG4gICAgY29udHJvbEFycmF5OiBVbnR5cGVkRm9ybUNvbnRyb2xbXSxcbiAgICBhdHRyaWJ1dGU6IENvbmZpZ3VyYXRvci5BdHRyaWJ1dGVcbiAgKTogQ29uZmlndXJhdG9yLlZhbHVlW10ge1xuICAgIGNvbnN0IGxvY2FsQXNzZW1ibGVkVmFsdWVzOiBDb25maWd1cmF0b3IuVmFsdWVbXSA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250cm9sQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gYXR0cmlidXRlLnZhbHVlcyA/IGF0dHJpYnV0ZS52YWx1ZXNbaV0gOiB1bmRlZmluZWQ7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgY29uc3QgbG9jYWxBdHRyaWJ1dGVWYWx1ZTogQ29uZmlndXJhdG9yLlZhbHVlID0ge1xuICAgICAgICAgIHZhbHVlQ29kZTogdmFsdWUudmFsdWVDb2RlLFxuICAgICAgICB9O1xuICAgICAgICBsb2NhbEF0dHJpYnV0ZVZhbHVlLm5hbWUgPSB2YWx1ZS5uYW1lO1xuICAgICAgICBsb2NhbEF0dHJpYnV0ZVZhbHVlLnF1YW50aXR5ID0gdmFsdWUucXVhbnRpdHk7XG4gICAgICAgIGxvY2FsQXR0cmlidXRlVmFsdWUuc2VsZWN0ZWQgPSBjb250cm9sQXJyYXlbaV0udmFsdWU7XG5cbiAgICAgICAgbG9jYWxBc3NlbWJsZWRWYWx1ZXMucHVzaChsb2NhbEF0dHJpYnV0ZVZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXG4gICAgICAgICAgICAnQ29udHJvbEFycmF5IGRvZXMgbm90IG1hdGNoIHZhbHVlcywgYXQgbGVhc3Qgb25lIHZhbHVlIGNvdWxkIG5vdCBiZWVuIGZvdW5kJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxvY2FsQXNzZW1ibGVkVmFsdWVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbHMgdG8gdGhlIGNvcnJlc3BvbmRpbmcgSFRNTCBlbGVtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnQgfCBIVE1MRWxlbWVudH0gZWxlbWVudCAtIEhUTUwgZWxlbWVudFxuICAgKi9cbiAgcHJvdGVjdGVkIHNjcm9sbChlbGVtZW50OiBFbGVtZW50IHwgSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBsZXQgdG9wT2Zmc2V0ID0gMDtcbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICB0b3BPZmZzZXQgPSBlbGVtZW50Lm9mZnNldFRvcDtcbiAgICB9XG4gICAgdGhpcy53aW5kb3dSZWYubmF0aXZlV2luZG93Py5zY3JvbGwoMCwgdG9wT2Zmc2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY3JvbGxzIHRvIHRoZSBjb3JyZXNwb25kaW5nIGNvbmZpZ3VyYXRpb24gZWxlbWVudCBpbiB0aGUgSFRNTCB0cmVlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgLSBTZWxlY3RvciBvZiB0aGUgSFRNTCBlbGVtZW50XG4gICAqL1xuICBzY3JvbGxUb0NvbmZpZ3VyYXRpb25FbGVtZW50KHNlbGVjdG9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIC8vIHdlIGRvbid0IHdhbnQgdG8gcnVuIHRoaXMgbG9naWMgd2hlbiBkb2luZyBTU1JcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnQoc2VsZWN0b3IpO1xuICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5zY3JvbGwoZWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzIHRoZSBmaXJzdCBhdHRyaWJ1dGUgaW4gdGhlIGZvcm0uXG4gICAqL1xuICBmb2N1c0ZpcnN0QXR0cmlidXRlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZm9ybSA9IHRoaXMuZ2V0RWxlbWVudCgnY3gtY29uZmlndXJhdG9yLWZvcm0nKTtcbiAgICBpZiAoZm9ybSkge1xuICAgICAgY29uc3QgZm9jdXNhYmxlRWxlbWVudHM6IEhUTUxFbGVtZW50W10gPVxuICAgICAgICB0aGlzLmtleWJvYXJkRm9jdXNTZXJ2aWNlLmZpbmRGb2N1c2FibGUoZm9ybSk7XG4gICAgICBpZiAoZm9jdXNhYmxlRWxlbWVudHMgJiYgZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICBmb2N1c2FibGVFbGVtZW50c1swXS5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRGb2N1c2FibGVFbGVtZW50QnlJZChcbiAgICBmb2N1c2FibGVFbGVtZW50czogSFRNTEVsZW1lbnRbXSxcbiAgICBpZD86IHN0cmluZ1xuICApOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIGZvY3VzYWJsZUVsZW1lbnRzLmZpbmQoKGZvY3VzYWJsZUVsZW1lbnQpID0+IHtcbiAgICAgIGlmIChpZCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZm9jdXNhYmxlRWxlbWVudC5ub2RlTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpLmluZGV4T2YoaWQpICE9PSAtMSB8fFxuICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnQuaWQuaW5kZXhPZihpZCkgIT09IC0xXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBmb2N1c2FibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0Rm9jdXNhYmxlQ29uZmxpY3REZXNjcmlwdGlvbihcbiAgICBmb2N1c2FibGVFbGVtZW50czogSFRNTEVsZW1lbnRbXVxuICApOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Rm9jdXNhYmxlRWxlbWVudEJ5SWQoXG4gICAgICBmb2N1c2FibGVFbGVtZW50cyxcbiAgICAgICdjeC1jb25maWd1cmF0b3ItY29uZmxpY3QtZGVzY3JpcHRpb24nXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRGb2N1c2FibGVFbGVtZW50QnlWYWx1ZVVpS2V5KFxuICAgIGZvY3VzYWJsZUVsZW1lbnRzOiBIVE1MRWxlbWVudFtdLFxuICAgIHZhbHVlVWlLZXk/OiBzdHJpbmdcbiAgKTogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmdldEZvY3VzYWJsZUVsZW1lbnRCeUlkKGZvY3VzYWJsZUVsZW1lbnRzLCB2YWx1ZVVpS2V5KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRGb2N1c2FibGVFbGVtZW50QnlBdHRyaWJ1dGVJZChcbiAgICBmb2N1c2FibGVFbGVtZW50czogSFRNTEVsZW1lbnRbXSxcbiAgICBhdHRyaWJ1dGVOYW1lOiBzdHJpbmdcbiAgKTogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmdldEZvY3VzYWJsZUVsZW1lbnRCeUlkKGZvY3VzYWJsZUVsZW1lbnRzLCBhdHRyaWJ1dGVOYW1lKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVBdHRyaWJ1dGVWYWx1ZVVpS2V5KFxuICAgIGF0dHJpYnV0ZUlkOiBzdHJpbmcsXG4gICAgdmFsdWVJZDogc3RyaW5nXG4gICk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZUlkICsgdGhpcy5TRVBBUkFUT1IgKyB2YWx1ZUlkO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzIGEgdmFsdWUgaW4gdGhlIGZvcm0uXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkF0dHJpYnV0ZX0gYXR0cmlidXRlIC0gQXR0cmlidXRlXG4gICAqL1xuICBmb2N1c1ZhbHVlKGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZSk6IHZvaWQge1xuICAgIGlmICghdGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZm9ybSA9IHRoaXMuZ2V0RWxlbWVudCgnY3gtY29uZmlndXJhdG9yLWZvcm0nKTtcbiAgICBpZiAoZm9ybSkge1xuICAgICAgY29uc3QgZm9jdXNhYmxlRWxlbWVudHM6IEhUTUxFbGVtZW50W10gPVxuICAgICAgICB0aGlzLmtleWJvYXJkRm9jdXNTZXJ2aWNlLmZpbmRGb2N1c2FibGUoZm9ybSk7XG4gICAgICBpZiAoZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmZvY3VzT25FbGVtZW50cyhmb2N1c2FibGVFbGVtZW50cywgYXR0cmlidXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZm9jdXNPbkVsZW1lbnRzKFxuICAgIGZvY3VzYWJsZUVsZW1lbnRzOiBIVE1MRWxlbWVudFtdLFxuICAgIGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZVxuICApIHtcbiAgICBsZXQgZm91bmRGb2N1c2FibGVFbGVtZW50ID1cbiAgICAgIHRoaXMuZ2V0Rm9jdXNhYmxlQ29uZmxpY3REZXNjcmlwdGlvbihmb2N1c2FibGVFbGVtZW50cyk7XG4gICAgaWYgKCFmb3VuZEZvY3VzYWJsZUVsZW1lbnQpIHtcbiAgICAgIGZvdW5kRm9jdXNhYmxlRWxlbWVudCA9IHRoaXMuZm9jdXNPbkVsZW1lbnRGb3JDb25mbGljdGluZyhcbiAgICAgICAgYXR0cmlidXRlLFxuICAgICAgICBmb3VuZEZvY3VzYWJsZUVsZW1lbnQsXG4gICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZm91bmRGb2N1c2FibGVFbGVtZW50KSB7XG4gICAgICBmb3VuZEZvY3VzYWJsZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZm9jdXNPbkVsZW1lbnRGb3JDb25mbGljdGluZyhcbiAgICBhdHRyaWJ1dGU6IENvbmZpZ3VyYXRvci5BdHRyaWJ1dGUsXG4gICAgZm91bmRGb2N1c2FibGVFbGVtZW50OiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCxcbiAgICBmb2N1c2FibGVFbGVtZW50czogSFRNTEVsZW1lbnRbXVxuICApIHtcbiAgICBjb25zdCBzZWxlY3RlZFZhbHVlID0gYXR0cmlidXRlLnZhbHVlcz8uZmluZCgodmFsdWUpID0+IHZhbHVlLnNlbGVjdGVkKTtcbiAgICBpZiAoc2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgY29uc3QgdmFsdWVVaUtleSA9IHRoaXMuY3JlYXRlQXR0cmlidXRlVmFsdWVVaUtleShcbiAgICAgICAgYXR0cmlidXRlLm5hbWUsXG4gICAgICAgIHNlbGVjdGVkVmFsdWUudmFsdWVDb2RlXG4gICAgICApO1xuICAgICAgZm91bmRGb2N1c2FibGVFbGVtZW50ID0gdGhpcy5nZXRGb2N1c2FibGVFbGVtZW50QnlWYWx1ZVVpS2V5KFxuICAgICAgICBmb2N1c2FibGVFbGVtZW50cyxcbiAgICAgICAgdmFsdWVVaUtleVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCFmb3VuZEZvY3VzYWJsZUVsZW1lbnQpIHtcbiAgICAgIGZvdW5kRm9jdXNhYmxlRWxlbWVudCA9IHRoaXMuZ2V0Rm9jdXNhYmxlRWxlbWVudEJ5QXR0cmlidXRlSWQoXG4gICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzLFxuICAgICAgICBhdHRyaWJ1dGUubmFtZVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kRm9jdXNhYmxlRWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYSB1bmlxdWUgcHJlZml4IElELlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZyB8IHVuZGVmaW5lZH0gcHJlZml4IC0gcHJlZml4IHRoYXQgd2UgbmVlZCB0byBtYWtlIHRoZSBJRCB1bmlxdWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwSWQgLSBncm91cCBJRFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSAtIHByZWZpeCBJRFxuICAgKi9cbiAgZ2V0UHJlZml4SWQoaWRQcmVmaXg6IHN0cmluZyB8IHVuZGVmaW5lZCwgZ3JvdXBJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaWRQcmVmaXhcbiAgICAgID8gaWRQcmVmaXggKyB0aGlzLlNFUEFSQVRPUiArIGdyb3VwSWRcbiAgICAgIDogdGhpcy5DWF9QUkVGSVggKyB0aGlzLlNFUEFSQVRPUiArIGdyb3VwSWQ7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgZ3JvdXAgSUQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cElkIC0gZ3JvdXAgSURcbiAgICogQHJldHVybnMge3N0cmluZyB8IHVuZGVmaW5lZH0gLSBnZW5lcmF0ZWQgZ3JvdXAgSURcbiAgICovXG4gIGNyZWF0ZUdyb3VwSWQoZ3JvdXBJZD86IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKGdyb3VwSWQpIHtcbiAgICAgIHJldHVybiBncm91cElkICsgJy1ncm91cCc7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIHVuaXF1ZSBvdmVydmlldyBncm91cCBJRCBmcm9tIHRoZSBsb2NhbCBncm91cCBJRFxuICAgKiBhbmQgYSBwcmVmaXggdGhhdCByZWZsZWN0cyB0aGUgcGFyZW50IGdyb3VwcyBpbiB0aGUgZ3JvdXAgaGllcmFyY2h5XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXggLSBwcmVmaXggdGhhdCB3ZSBuZWVkIHRvIG1ha2UgdGhlIElEIHVuaXF1ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZ3JvdXBJZCAtIGdyb3VwIElEXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IC0gZ2VuZXJhdGVkIGdyb3VwIElEXG4gICAqL1xuICBjcmVhdGVPdkdyb3VwSWQocHJlZml4OiBzdHJpbmcsIGdyb3VwSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UHJlZml4SWQocHJlZml4LCBncm91cElkKSArICctb3ZHcm91cCc7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgdW5pcXVlIG92ZXJ2aWV3IG1lbnUgaXRlbSBJRCBmcm9tIHRoZSBsb2NhbCBncm91cCBJRFxuICAgKiBhbmQgYSBwcmVmaXggdGhhdCByZWZsZWN0cyB0aGUgcGFyZW50IGdyb3VwcyBpbiB0aGUgZ3JvdXAgaGllcmFyY2h5XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXggLSBwcmVmaXggdGhhdCB3ZSBuZWVkIHRvIG1ha2UgdGhlIElEIHVuaXF1ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZ3JvdXBJZCAtIGdyb3VwIElEXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IC0gZ2VuZXJhdGVkIGdyb3VwIElEXG4gICAqL1xuICBjcmVhdGVPdk1lbnVJdGVtSWQocHJlZml4OiBzdHJpbmcsIGdyb3VwSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UHJlZml4SWQocHJlZml4LCBncm91cElkKSArICctb3ZNZW51SXRlbSc7XG4gIH1cblxuICAvKipcbiAgICogUGVyc2lzdCB0aGUga2V5Ym9hcmQgZm9jdXMgc3RhdGUgZm9yIHRoZSBnaXZlbiBrZXkuXG4gICAqIFRoZSBmb2N1cyBpcyBzdG9yZWQgZ2xvYmFsbHkgb3IgZm9yIHRoZSBnaXZlbiBncm91cC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIGtleVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZ3JvdXA/IC0gR3JvdXBcbiAgICovXG4gIHNldEZvY3VzKGtleT86IHN0cmluZywgZ3JvdXA/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoa2V5KSB7XG4gICAgICB0aGlzLmtleWJvYXJkRm9jdXNTZXJ2aWNlLnNldChrZXksIGdyb3VwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlIHN0eWxpbmcgb2YgZWxlbWVudFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlTZWxlY3RvciAtIHF1ZXJ5U2VsZWN0b3JcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IC0gQ1NTIHByb3BlcnR5XG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIENTUyB2YWx1ZVxuICAgKi9cbiAgY2hhbmdlU3R5bGluZyhxdWVyeVNlbGVjdG9yOiBzdHJpbmcsIHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5nZXRFbGVtZW50KHF1ZXJ5U2VsZWN0b3IpO1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgc3R5bGluZyBmb3IgZWxlbWVudFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlTZWxlY3RvciAtIHF1ZXJ5U2VsZWN0b3JcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IC0gQ1NTIHByb3BlcnR5XG4gICAqL1xuICByZW1vdmVTdHlsaW5nKHF1ZXJ5U2VsZWN0b3I6IHN0cmluZywgcHJvcGVydHk6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnQocXVlcnlTZWxlY3Rvcik7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkocHJvcGVydHkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgSFRNTCBlbGVtZW50IGJhc2VkIG9uIHF1ZXJ5U2VsZWN0b3Igd2hlbiBydW5uaW5nIGluIGJyb3dzZXJcbiAgICpcbiAgICogQHBhcmFtIHF1ZXJ5U2VsZWN0b3IgLSBxdWVyeVNlbGVjdG9yXG4gICAqIEByZXR1cm5zIHNlbGVjdGVkIEhUTUwgZWxlbWVudFxuICAgKi9cbiAgZ2V0RWxlbWVudChxdWVyeVNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm4gdGhpcy53aW5kb3dSZWYuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgcXVlcnlTZWxlY3RvclxuICAgICAgKSBhcyBIVE1MRWxlbWVudDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGEgbGlzdCBvZiBIVE1MIGVsZW1lbnRzIGJhc2VkIG9uIHF1ZXJ5U2VsZWN0b3Igd2hlbiBydW5uaW5nIGluIGJyb3dzZXJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5U2VsZWN0b3IgLSBxdWVyeVNlbGVjdG9yXG4gICAqIEByZXR1cm5zIHtIVE1MRWxlbWVudFtdIHwgdW5kZWZpbmVkfSAtIExpc3Qgb2YgSFRNTCBlbGVtZW50c1xuICAgKi9cbiAgZ2V0RWxlbWVudHMocXVlcnlTZWxlY3Rvcjogc3RyaW5nKTogSFRNTEVsZW1lbnRbXSB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShcbiAgICAgICAgdGhpcy53aW5kb3dSZWYuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChxdWVyeVNlbGVjdG9yKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGEgbnVtYmVyIG9mIHBpeGVscyB0aGF0IHRoZSBkb2N1bWVudCBpcyBjdXJyZW50bHkgc2Nyb2xsZWQgdmVydGljYWxseS5cbiAgICpcbiAgICogQHJldHVybnMge251bWJlciB8IHVuZGVmaW5lZH0gLSBOdW1iZXIgb2YgcGl4ZWxzIHRoYXQgdGhlIGRvY3VtZW50IGlzIGN1cnJlbnRseSBzY3JvbGxlZCB2ZXJ0aWNhbGx5LlxuICAgKi9cbiAgZ2V0VmVydGljYWxseVNjcm9sbGVkUGl4ZWxzKCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm4gdGhpcy53aW5kb3dSZWYubmF0aXZlV2luZG93Py5zY3JvbGxZO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIHdoZXRoZXIgdGhlIGVsZW1lbnQgaGFzIGEgc2Nyb2xsYmFyLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlTZWxlY3RvciAtIEVsZW1lbnQgcXVlcnkgc2VsZWN0b3JcbiAgICogQHJldHVybnMge2Jvb2xlYW59IC0gJ1RydWUnLCBpZiB0aGUgZWxlbWVudCBoYXMgYSBzY3JvbGxiYXIsIG90aGVyd2lzZSAnZmFsc2UnXG4gICAqL1xuICBoYXNTY3JvbGxiYXIocXVlcnlTZWxlY3Rvcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZ2V0RWxlbWVudChxdWVyeVNlbGVjdG9yKTtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuc2Nyb2xsSGVpZ2h0ID4gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0luVmlld3BvcnQoZWxlbWVudDogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQpOiBib29sZWFuIHtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgY29uc3QgYm91bmRpbmcgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICBjb25zdCB3aWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIGJvdW5kaW5nLnRvcCA+PSAtaGVpZ2h0ICYmXG4gICAgICAgIGJvdW5kaW5nLmxlZnQgPj0gLXdpZHRoICYmXG4gICAgICAgIGJvdW5kaW5nLnJpZ2h0IDw9XG4gICAgICAgICAgKHRoaXMud2luZG93UmVmLm5hdGl2ZVdpbmRvdz8uaW5uZXJXaWR0aCB8fCBlbGVtZW50LmNsaWVudFdpZHRoKSArXG4gICAgICAgICAgICB3aWR0aCAmJlxuICAgICAgICBib3VuZGluZy5ib3R0b20gPD1cbiAgICAgICAgICAodGhpcy53aW5kb3dSZWYubmF0aXZlV2luZG93Py5pbm5lckhlaWdodCB8fCBlbGVtZW50LmNsaWVudEhlaWdodCkgK1xuICAgICAgICAgICAgaGVpZ2h0XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0SGVpZ2h0KHF1ZXJ5U2VsZWN0b3I6IHN0cmluZyk6IG51bWJlciB7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZ2V0RWxlbWVudChxdWVyeVNlbGVjdG9yKTtcbiAgICBjb25zdCBpc0VsZW1lbnRJblZpZXdwb3J0ID0gdGhpcy5pc0luVmlld3BvcnQoZWxlbWVudCk7XG4gICAgaWYgKGlzRWxlbWVudEluVmlld3BvcnQgJiYgZWxlbWVudD8ub2Zmc2V0SGVpZ2h0KSB7XG4gICAgICByZXR1cm4gZWxlbWVudD8ub2Zmc2V0SGVpZ2h0O1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIGFjdHVhbCBoZWlnaHQgb2YgdGhlIHNwYXJlIHZpZXdwb3J0LlxuICAgKlxuICAgKiBTUEEgaGVhZGVyLCB2YXJpYW50IGNvbmZpZ3VyYXRpb24gb3ZlcnZpZXcgaGVhZGVyIGFuZCBcIkFkZCB0byBjYXJ0XCIgYnV0dG9uIG9jY3VweSBjZXJ0YWluIGhlaWdodCBvZiB0aGUgdmlld3BvcnQsIHRoYXQncyB3aHlcbiAgICogaWYgU1BBIGhlYWRlciwgdmFyaWFudCBjb25maWd1cmF0aW9uIG92ZXJ2aWV3IGhlYWRlciBhbmQgXCJBZGQgdG8gY2FydFwiIGJ1dHRvbiBhcmUgaW4gdGhlIHZpZXdwb3J0LFxuICAgKiB0aGV5IHdpbGwgYmUgc3VidHJhY3RlZCBmcm9tIHRoZSBhY3R1YWwgdmlld3BvcnQgaGVpZ2h0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSAtIEhlaWdodCBvZiB0aGUgc3BhcmUgdmlld3BvcnQuXG4gICAqL1xuICBnZXRTcGFyZVZpZXdwb3J0SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICBjb25zdCBzcGFIZWFkZXJIZWlnaHQgPSB0aGlzLmdldEhlaWdodCgnaGVhZGVyJyk7XG4gICAgICBjb25zdCBvdkhlYWRlckhlaWdodCA9IHRoaXMuZ2V0SGVpZ2h0KCcuVmFyaWFudENvbmZpZ092ZXJ2aWV3SGVhZGVyJyk7XG4gICAgICBjb25zdCBhZGRUb0NhcnRIZWlnaHQgPVxuICAgICAgICB0aGlzLmdldEhlaWdodCgnY3gtY29uZmlndXJhdG9yLWFkZC10by1jYXJ0LWJ1dHRvbicpICE9PSAwXG4gICAgICAgICAgPyB0aGlzLmdldEhlaWdodCgnY3gtY29uZmlndXJhdG9yLWFkZC10by1jYXJ0LWJ1dHRvbicpXG4gICAgICAgICAgOiB0aGlzLkFERF9UT19DQVJUX0JVVFRPTl9IRUlHSFQ7XG5cbiAgICAgIGNvbnN0IG9jY3VwaWVkSGVpZ2h0ID1cbiAgICAgICAgc3BhSGVhZGVySGVpZ2h0ICsgb3ZIZWFkZXJIZWlnaHQgKyBhZGRUb0NhcnRIZWlnaHQgKiAyO1xuXG4gICAgICByZXR1cm4gdGhpcy53aW5kb3dSZWYubmF0aXZlV2luZG93XG4gICAgICAgID8gdGhpcy53aW5kb3dSZWYubmF0aXZlV2luZG93LmlubmVySGVpZ2h0IC0gb2NjdXBpZWRIZWlnaHRcbiAgICAgICAgOiAwO1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbnN1cmUgdGhhdCB0aGUgZWxlbWVudCBpcyBhbHdheXMgdmlzaWJsZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5U2VsZWN0b3IgLSBFbGVtZW50IHF1ZXJ5IHNlbGVjdG9yXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnQgfCB1bmRlZmluZWR9IGVsZW1lbnQgLSBFbGVtZW50IHRoYXQgc2hvdWxkIGJlIHZpc2libGUgd2l0aGluIHRoZSBzY3JvbGxhYmxlIGVsZW1lbnQuXG4gICAqL1xuICBlbnN1cmVFbGVtZW50VmlzaWJsZShcbiAgICBxdWVyeVNlbGVjdG9yOiBzdHJpbmcsXG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWRcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5nZXRFbGVtZW50KHF1ZXJ5U2VsZWN0b3IpO1xuICAgIGlmIChlbGVtZW50ICYmIGNvbnRhaW5lcikge1xuICAgICAgaWYgKGVsZW1lbnQub2Zmc2V0VG9wID4gY29udGFpbmVyLnNjcm9sbFRvcCkge1xuICAgICAgICBjb25zdCBvZmZzZXRCb3R0b20gPSBlbGVtZW50Lm9mZnNldFRvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBpZiAob2Zmc2V0Qm90dG9tID4gY29udGFpbmVyLnNjcm9sbFRvcCkge1xuICAgICAgICAgIGNvbnRhaW5lci5zY3JvbGxUb3AgPSBvZmZzZXRCb3R0b20gLSBjb250YWluZXIub2Zmc2V0SGVpZ2h0O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250YWluZXIuc2Nyb2xsVG9wID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKT8udG9wIC0gMTA7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=