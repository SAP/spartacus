import { Injectable, isDevMode } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WindowRef } from '@spartacus/core';
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
   * @param {FormControl[]} controlArray - Control array
   * @param {Configurator.Attribute} attribute -  Configuration attribute
   * @return {Configurator.Value[]} - list of configurator values
   */
  assembleValuesForMultiSelectAttributes(
    controlArray: FormControl[],
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
          console.warn(
            'ControlArray does not match values, at least one value could not been found'
          );
        }
      }
    }
    return localAssembledValues;
  }

  /**
   * Verifies whether the HTML element is in the viewport.
   *
   * @param {Element} element - HTML element
   * @return {boolean} Returns 'true' if the HTML element is in the viewport, otherwise 'false'
   */
  protected isInViewport(element: Element): boolean {
    const bounding = element.getBoundingClientRect();
    const window = this.windowRef.nativeWindow;
    const document = this.windowRef.document;
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <=
        (window?.innerHeight || document?.documentElement.clientHeight) &&
      bounding.right <=
        (window?.innerWidth || document?.documentElement.clientWidth)
    );
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
      const element = this.windowRef.document?.querySelector(selector);
      if (element && !this.isInViewport(element)) {
        this.scroll(element);
      }
    }
  }

  /**
   * Focus the first attribute in the form.
   */
  focusFirstAttribute(): void {
    if (this.keyboardFocusService) {
      if (this.windowRef.isBrowser()) {
        const form: HTMLElement | null = this.windowRef.document?.querySelector(
          'cx-configurator-form'
        );
        if (form) {
          const focusableElements: HTMLElement[] =
            this.keyboardFocusService.findFocusable(form);
          if (focusableElements && focusableElements.length > 0) {
            focusableElements[0].focus();
          }
        }
      }
    }
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
}
