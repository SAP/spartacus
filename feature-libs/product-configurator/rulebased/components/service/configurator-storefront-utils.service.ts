/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject, isDevMode } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { LoggerService, WindowRef } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { KeyboardFocusService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorStorefrontUtilsService {
  /**
   * 'CX' prefix is used to generate an alphanumeric prefix ID.
   */
  protected readonly CX_PREFIX = 'cx';
  protected readonly SEPARATOR = '--';
  /**
   * Height of a CSS box model of an 'add-to-cart' button
   * See _configurator-add-to-cart-button.scss
   */
  protected readonly ADD_TO_CART_BUTTON_HEIGHT = 82;

  protected logger = inject(LoggerService);

  constructor(
    protected configuratorGroupsService: ConfiguratorGroupsService,
    protected windowRef: WindowRef,
    protected keyboardFocusService: KeyboardFocusService
  ) {}

  /**
   * Does the configuration belong to a cart entry, or has the group been visited already?
   * In both cases we need to render indications for mandatory attributes.
   * This method emits only once and then stops further emissions.
   *
   * @param {CommonConfigurator.Owner} owner -
   * @param {string} groupId - Group ID
   * @return {Observable<boolean>} - Returns 'Observable<true>' if the cart entry or group are visited, otherwise 'Observable<false>'
   */
  isCartEntryOrGroupVisited(
    owner: CommonConfigurator.Owner,
    groupId: string
  ): Observable<boolean> {
    return this.configuratorGroupsService.isGroupVisited(owner, groupId).pipe(
      take(1),
      map((result) =>
        result ? true : owner.type === CommonConfigurator.OwnerType.CART_ENTRY
      )
    );
  }

  /**
   * Assemble an attribute value with the currently selected values from a checkbox list.
   *
   * @param {UntypedFormControl[]} controlArray - Control array
   * @param {Configurator.Attribute} attribute -  Configuration attribute
   * @return {Configurator.Value[]} - list of configurator values
   */
  assembleValuesForMultiSelectAttributes(
    controlArray: UntypedFormControl[],
    attribute: Configurator.Attribute
  ): Configurator.Value[] {
    const localAssembledValues: Configurator.Value[] = [];

    for (let i = 0; i < controlArray.length; i++) {
      const value = attribute.values ? attribute.values[i] : undefined;
      if (value) {
        const localAttributeValue: Configurator.Value = {
          valueCode: value.valueCode,
        };
        localAttributeValue.name = value.name;
        localAttributeValue.quantity = value.quantity;
        localAttributeValue.selected = controlArray[i].value;

        localAssembledValues.push(localAttributeValue);
      } else {
        if (isDevMode()) {
          this.logger.warn(
            'ControlArray does not match values, at least one value could not been found'
          );
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
  protected scroll(element: Element | HTMLElement): void {
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
  scrollToConfigurationElement(selector: string): void {
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
  focusFirstAttribute(): void {
    if (!this.windowRef.isBrowser()) {
      return;
    }
    const form = this.getElement('cx-configurator-form');
    if (form) {
      const focusableElements: HTMLElement[] =
        this.keyboardFocusService.findFocusable(form);
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }

  protected getFocusableElementById(
    focusableElements: HTMLElement[],
    id?: string
  ): HTMLElement | undefined {
    return focusableElements.find((focusableElement) => {
      if (id) {
        if (
          focusableElement.nodeName.toLocaleLowerCase().indexOf(id) !== -1 ||
          focusableElement.id.indexOf(id) !== -1
        ) {
          return focusableElement;
        }
      }
    });
  }

  protected getFocusableConflictDescription(
    focusableElements: HTMLElement[]
  ): HTMLElement | undefined {
    return this.getFocusableElementById(
      focusableElements,
      'cx-configurator-conflict-description'
    );
  }

  protected getFocusableElementByValueUiKey(
    focusableElements: HTMLElement[],
    valueUiKey?: string
  ): HTMLElement | undefined {
    return this.getFocusableElementById(focusableElements, valueUiKey);
  }

  protected getFocusableElementByAttributeId(
    focusableElements: HTMLElement[],
    attributeName: string
  ): HTMLElement | undefined {
    return this.getFocusableElementById(focusableElements, attributeName);
  }

  protected createAttributeValueUiKey(
    attributeId: string,
    valueId: string
  ): string {
    return attributeId + this.SEPARATOR + valueId;
  }

  /**
   * Focus a value in the form.
   *
   * @param {Configurator.Attribute} attribute - Attribute
   */
  focusValue(attribute: Configurator.Attribute): void {
    if (!this.windowRef.isBrowser()) {
      return;
    }
    const form = this.getElement('cx-configurator-form');
    if (form) {
      const focusableElements: HTMLElement[] =
        this.keyboardFocusService.findFocusable(form);
      if (focusableElements.length > 0) {
        this.focusOnElements(focusableElements, attribute);
      }
    }
  }

  protected focusOnElements(
    focusableElements: HTMLElement[],
    attribute: Configurator.Attribute
  ) {
    let foundFocusableElement =
      this.getFocusableConflictDescription(focusableElements);
    if (!foundFocusableElement) {
      foundFocusableElement = this.focusOnElementForConflicting(
        attribute,
        foundFocusableElement,
        focusableElements
      );
    }
    if (foundFocusableElement) {
      foundFocusableElement.focus();
    }
  }

  protected focusOnElementForConflicting(
    attribute: Configurator.Attribute,
    foundFocusableElement: HTMLElement | undefined,
    focusableElements: HTMLElement[]
  ) {
    const selectedValue = attribute.values?.find((value) => value.selected);
    if (selectedValue) {
      const valueUiKey = this.createAttributeValueUiKey(
        attribute.name,
        selectedValue.valueCode
      );
      foundFocusableElement = this.getFocusableElementByValueUiKey(
        focusableElements,
        valueUiKey
      );
    }
    if (!foundFocusableElement) {
      foundFocusableElement = this.getFocusableElementByAttributeId(
        focusableElements,
        attribute.name
      );
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
  getPrefixId(idPrefix: string | undefined, groupId: string): string {
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
  createGroupId(groupId?: string): string | undefined {
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
  createOvGroupId(prefix: string, groupId: string): string {
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
  createOvMenuItemId(prefix: string, groupId: string): string {
    return this.getPrefixId(prefix, groupId) + '-ovMenuItem';
  }

  /**
   * Persist the keyboard focus state for the given key.
   * The focus is stored globally or for the given group.
   *
   * @param {string} key - key
   * @param {string} group? - Group
   */
  setFocus(key?: string, group?: string): void {
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
  changeStyling(querySelector: string, property: string, value: string): void {
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
  removeStyling(querySelector: string, property: string): void {
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
  getElement(querySelector: string): HTMLElement | undefined {
    if (this.windowRef.isBrowser()) {
      return this.windowRef.document.querySelector(
        querySelector
      ) as HTMLElement;
    }
  }

  /**
   * Retrieves a list of HTML elements based on querySelector when running in browser
   *
   * @param {string} querySelector - querySelector
   * @returns {HTMLElement[] | undefined} - List of HTML elements
   */
  getElements(querySelector: string): HTMLElement[] | undefined {
    if (this.windowRef.isBrowser()) {
      return Array.from(
        this.windowRef.document.querySelectorAll(querySelector)
      );
    }
  }

  /**
   * Retrieves a number of pixels that the document is currently scrolled vertically.
   *
   * @returns {number | undefined} - Number of pixels that the document is currently scrolled vertically.
   */
  getVerticallyScrolledPixels(): number | undefined {
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
  hasScrollbar(querySelector: string): boolean {
    const element = this.getElement(querySelector);
    if (element) {
      return element.scrollHeight > element.clientHeight;
    }
    return false;
  }

  protected isInViewport(element: HTMLElement | undefined): boolean {
    if (element) {
      const bounding = element.getBoundingClientRect();
      const height = element.offsetHeight;
      const width = element.offsetWidth;

      return (
        bounding.top >= -height &&
        bounding.left >= -width &&
        bounding.right <=
          (this.windowRef.nativeWindow?.innerWidth || element.clientWidth) +
            width &&
        bounding.bottom <=
          (this.windowRef.nativeWindow?.innerHeight || element.clientHeight) +
            height
      );
    }
    return false;
  }

  public getHeight(querySelector: string): number {
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
  getSpareViewportHeight(): number {
    if (this.windowRef.isBrowser()) {
      const spaHeaderHeight = this.getHeight('header');
      const ovHeaderHeight = this.getHeight('.VariantConfigOverviewHeader');
      const addToCartHeight =
        this.getHeight('cx-configurator-add-to-cart-button') !== 0
          ? this.getHeight('cx-configurator-add-to-cart-button')
          : this.ADD_TO_CART_BUTTON_HEIGHT;

      const occupiedHeight =
        spaHeaderHeight + ovHeaderHeight + addToCartHeight * 2;

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
  ensureElementVisible(
    querySelector: string,
    element: HTMLElement | undefined
  ): void {
    const container = this.getElement(querySelector);
    if (element && container) {
      if (element.offsetTop > container.scrollTop) {
        const offsetBottom = element.offsetTop + element.offsetHeight;
        if (offsetBottom > container.scrollTop) {
          container.scrollTop = offsetBottom - container.offsetHeight;
        }
      } else {
        container.scrollTop = element.getBoundingClientRect()?.top - 10;
      }
    }
  }
}
