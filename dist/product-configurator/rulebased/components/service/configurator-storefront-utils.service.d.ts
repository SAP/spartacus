import { UntypedFormControl } from '@angular/forms';
import { LoggerService, WindowRef } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { KeyboardFocusService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorStorefrontUtilsService {
    protected configuratorGroupsService: ConfiguratorGroupsService;
    protected windowRef: WindowRef;
    protected keyboardFocusService: KeyboardFocusService;
    /**
     * 'CX' prefix is used to generate an alphanumeric prefix ID.
     */
    protected readonly CX_PREFIX = "cx";
    protected readonly SEPARATOR = "--";
    /**
     * Height of a CSS box model of an 'add-to-cart' button
     * See _configurator-add-to-cart-button.scss
     */
    protected readonly ADD_TO_CART_BUTTON_HEIGHT = 82;
    protected logger: LoggerService;
    constructor(configuratorGroupsService: ConfiguratorGroupsService, windowRef: WindowRef, keyboardFocusService: KeyboardFocusService);
    /**
     * Does the configuration belong to a cart entry, or has the group been visited already?
     * In both cases we need to render indications for mandatory attributes.
     * This method emits only once and then stops further emissions.
     *
     * @param {CommonConfigurator.Owner} owner -
     * @param {string} groupId - Group ID
     * @return {Observable<boolean>} - Returns 'Observable<true>' if the cart entry or group are visited, otherwise 'Observable<false>'
     */
    isCartEntryOrGroupVisited(owner: CommonConfigurator.Owner, groupId: string): Observable<boolean>;
    /**
     * Assemble an attribute value with the currently selected values from a checkbox list.
     *
     * @param {UntypedFormControl[]} controlArray - Control array
     * @param {Configurator.Attribute} attribute -  Configuration attribute
     * @return {Configurator.Value[]} - list of configurator values
     */
    assembleValuesForMultiSelectAttributes(controlArray: UntypedFormControl[], attribute: Configurator.Attribute): Configurator.Value[];
    /**
     * Scrolls to the corresponding HTML element.
     *
     * @param {Element | HTMLElement} element - HTML element
     */
    protected scroll(element: Element | HTMLElement): void;
    /**
     * Scrolls to the corresponding configuration element in the HTML tree.
     *
     * @param {string} selector - Selector of the HTML element
     */
    scrollToConfigurationElement(selector: string): void;
    /**
     * Focus the first attribute in the form.
     */
    focusFirstAttribute(): void;
    protected getFocusableElementById(focusableElements: HTMLElement[], id?: string): HTMLElement | undefined;
    protected getFocusableConflictDescription(focusableElements: HTMLElement[]): HTMLElement | undefined;
    protected getFocusableElementByValueUiKey(focusableElements: HTMLElement[], valueUiKey?: string): HTMLElement | undefined;
    protected getFocusableElementByAttributeId(focusableElements: HTMLElement[], attributeName: string): HTMLElement | undefined;
    protected createAttributeValueUiKey(attributeId: string, valueId: string): string;
    /**
     * Focus a value in the form.
     *
     * @param {Configurator.Attribute} attribute - Attribute
     */
    focusValue(attribute: Configurator.Attribute): void;
    protected focusOnElements(focusableElements: HTMLElement[], attribute: Configurator.Attribute): void;
    protected focusOnElementForConflicting(attribute: Configurator.Attribute, foundFocusableElement: HTMLElement | undefined, focusableElements: HTMLElement[]): HTMLElement | undefined;
    /**
     * Retrieves a unique prefix ID.
     *
     * @param {string | undefined} prefix - prefix that we need to make the ID unique
     * @param {string} groupId - group ID
     * @returns {string} - prefix ID
     */
    getPrefixId(idPrefix: string | undefined, groupId: string): string;
    /**
     * Generates a group ID.
     *
     * @param {string} groupId - group ID
     * @returns {string | undefined} - generated group ID
     */
    createGroupId(groupId?: string): string | undefined;
    /**
     * Generates a unique overview group ID from the local group ID
     * and a prefix that reflects the parent groups in the group hierarchy
     *
     * @param {string} prefix - prefix that we need to make the ID unique
     * @param {string} groupId - group ID
     * @returns {string} - generated group ID
     */
    createOvGroupId(prefix: string, groupId: string): string;
    /**
     * Generates a unique overview menu item ID from the local group ID
     * and a prefix that reflects the parent groups in the group hierarchy
     *
     * @param {string} prefix - prefix that we need to make the ID unique
     * @param {string} groupId - group ID
     * @returns {string} - generated group ID
     */
    createOvMenuItemId(prefix: string, groupId: string): string;
    /**
     * Persist the keyboard focus state for the given key.
     * The focus is stored globally or for the given group.
     *
     * @param {string} key - key
     * @param {string} group? - Group
     */
    setFocus(key?: string, group?: string): void;
    /**
     * Change styling of element
     *
     * @param {string} querySelector - querySelector
     * @param {string} property - CSS property
     * @param {string} value - CSS value
     */
    changeStyling(querySelector: string, property: string, value: string): void;
    /**
     * Removes styling for element
     *
     * @param {string} querySelector - querySelector
     * @param {string} property - CSS property
     */
    removeStyling(querySelector: string, property: string): void;
    /**
     * Get HTML element based on querySelector when running in browser
     *
     * @param querySelector - querySelector
     * @returns selected HTML element
     */
    getElement(querySelector: string): HTMLElement | undefined;
    /**
     * Retrieves a list of HTML elements based on querySelector when running in browser
     *
     * @param {string} querySelector - querySelector
     * @returns {HTMLElement[] | undefined} - List of HTML elements
     */
    getElements(querySelector: string): HTMLElement[] | undefined;
    /**
     * Retrieves a number of pixels that the document is currently scrolled vertically.
     *
     * @returns {number | undefined} - Number of pixels that the document is currently scrolled vertically.
     */
    getVerticallyScrolledPixels(): number | undefined;
    /**
     * Verifies whether the element has a scrollbar.
     *
     * @param {string} querySelector - Element query selector
     * @returns {boolean} - 'True', if the element has a scrollbar, otherwise 'false'
     */
    hasScrollbar(querySelector: string): boolean;
    protected isInViewport(element: HTMLElement | undefined): boolean;
    getHeight(querySelector: string): number;
    /**
     * Retrieves the actual height of the spare viewport.
     *
     * SPA header, variant configuration overview header and "Add to cart" button occupy certain height of the viewport, that's why
     * if SPA header, variant configuration overview header and "Add to cart" button are in the viewport,
     * they will be subtracted from the actual viewport height.
     *
     * @returns {number} - Height of the spare viewport.
     */
    getSpareViewportHeight(): number;
    /**
     * Ensure that the element is always visible.
     *
     * @param {string} querySelector - Element query selector
     * @param {HTMLElement | undefined} element - Element that should be visible within the scrollable element.
     */
    ensureElementVisible(querySelector: string, element: HTMLElement | undefined): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorStorefrontUtilsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorStorefrontUtilsService>;
}
