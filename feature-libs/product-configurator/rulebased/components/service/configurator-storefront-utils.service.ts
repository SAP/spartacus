import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { KeyboardFocusService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { BREAKPOINT, BreakpointService } from '@spartacus/storefront';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorStorefrontUtilsService {
  // TODO(#11681): make keyboardFocusService a required dependency and remove deprecated constructor
  constructor(
    protected configuratorGroupsService: ConfiguratorGroupsService,
    @Inject(PLATFORM_ID) protected platformId: any,
    @Inject(DOCUMENT) protected document,
    protected keyboardFocusService?: KeyboardFocusService,
    protected breakpointService?: BreakpointService
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
      const localAttributeValue: Configurator.Value = {};
      localAttributeValue.name = attribute.values[i].name;
      localAttributeValue.quantity = attribute.values[i].quantity;
      localAttributeValue.selected = controlArray[i].value;
      localAttributeValue.valueCode = attribute.values[i].valueCode;
      localAssembledValues.push(localAttributeValue);
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
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth)
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
    window.scroll(0, topOffset);
  }

  /**
   * Scrolls to the corresponding configuration element in the HTML tree.
   *
   * @param {string} selector - Selector of the HTML element
   */
  scrollToConfigurationElement(selector: string): void {
    if (isPlatformBrowser(this.platformId)) {
      // we don't want to run this logic when doing SSR
      const element = document.querySelector(selector);
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
      if (isPlatformBrowser(this.platformId)) {
        const form: HTMLElement = document.querySelector(
          'cx-configurator-form'
        );
        const focusedElements: HTMLElement[] = this.keyboardFocusService.findFocusable(
          form
        );
        if (focusedElements && focusedElements.length > 1) {
          focusedElements[0]?.focus();
        }
      }
    }
  }

  protected getTabs() {
    if (isPlatformBrowser(this.platformId)) {
      let selector = ' cx-configurator-group-menu button[role="tab"]';
      if (this.breakpointService?.isUp(BREAKPOINT.lg)) {
        selector = 'main' + selector;
      } else {
        selector = '.navigation' + selector;
      }
      return this.document.querySelectorAll(selector);
    }
  }

  protected getFocusedElementTabIndex(tabs): number {
    if (isPlatformBrowser(this.platformId)) {
      let focusedElement = this.document.activeElement;
      let focusedElementId = focusedElement.id;
      for (let index = 0; index < tabs.length; index++) {
        if (tabs[index].id === focusedElementId) {
          return index;
        }
      }
      return undefined;
    }
  }

  protected updateCurrentTabIndex(
    currentTabIndex: number,
    tabIndex: number
  ): number {
    return tabIndex !== currentTabIndex ? tabIndex : currentTabIndex;
  }

  protected focusNextTab(currentTabIndex: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const tabs = this.getTabs();
      const tabIndex = this.getFocusedElementTabIndex(tabs);
      currentTabIndex = this.updateCurrentTabIndex(currentTabIndex, tabIndex);

      if (
        currentTabIndex === tabs.length - 1 ||
        (tabIndex !== currentTabIndex && currentTabIndex === tabs.length - 2)
      ) {
        tabs[0].focus();
      } else {
        tabs[currentTabIndex + 1].focus();
      }
    }
  }

  protected focusPreviousTab(currentTabIndex: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const tabs = this.getTabs();
      const tabIndex = this.getFocusedElementTabIndex(tabs);
      currentTabIndex = this.updateCurrentTabIndex(currentTabIndex, tabIndex);

      if (currentTabIndex === 0) {
        tabs[tabs.length - 1].focus();
      } else {
        tabs[currentTabIndex - 1].focus();
      }
    }
  }

  switchTabOnArrowPress(event: KeyboardEvent, currentGroupIndex: number): void {
    if (isPlatformBrowser(this.platformId)) {
      event.preventDefault();
      const pressedKey = event.key;
      if (pressedKey === 'ArrowUp') {
        this.focusPreviousTab(currentGroupIndex);
      } else if (pressedKey == 'ArrowDown') {
        this.focusNextTab(currentGroupIndex);
      }
    }
  }

  protected deactivateTabs(): void {
    if (isPlatformBrowser(this.platformId)) {
      const tabs = this.getTabs();
      for (let t = 0; t < tabs.length; t++) {
        tabs[t].setAttribute('tabindex', '-1');
        tabs[t].setAttribute('aria-selected', 'false');
      }
    }
  }

  activateTab(tab: HTMLElement, elementId?: string): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!tab) {
        tab = document.querySelector(elementId);
      }
      this.deactivateTabs();
      tab.setAttribute('tabindex', '0');
      tab.setAttribute('aria-selected', 'true');
      tab.focus();
    }
  }

  protected deactivateBackButton(): void {
    if (isPlatformBrowser(this.platformId)) {
      const backButton: HTMLElement = document.querySelector(
        'button.back-button'
      );
      backButton?.setAttribute('tabindex', '-1');
      backButton?.setAttribute('aria-selected', 'selected');
      backButton?.focus();
    }
  }
  
  protected focusBackButton(): void {
    if (isPlatformBrowser(this.platformId)) {
      const backButton: HTMLElement = document.querySelector(
        'button.back-button'
      );
      backButton?.setAttribute('tabindex', '0');
      backButton?.setAttribute('aria-selected', 'true');
      backButton?.focus();
    }
  }

  setFocus() {
    if (isPlatformBrowser(this.platformId)) {
      const element: HTMLElement = this.document.querySelector(
        '[aria-selected="true"]'
      );
      element?.focus();
    }
  }

  isBackBtnExist(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return this.getTabs()[0].id === 'back-button';
    }
  }

  isBackBtnFocused(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const tabs = this.getTabs();
      return (
        tabs[0].id === 'back-button' && this.document.activeElement === tabs[0]
      );
    }
  }
}
