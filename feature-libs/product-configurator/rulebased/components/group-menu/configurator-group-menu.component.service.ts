import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BREAKPOINT, BreakpointService } from '@spartacus/storefront';

@Injectable({ providedIn: 'root' })
export class ConfiguratorGroupMenuService {
  constructor(
    @Inject(PLATFORM_ID) protected platformId: any,
    @Inject(DOCUMENT) protected document,
    protected breakpointService?: BreakpointService
  ) {}

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

  switchTabOnArrowPress(event: KeyboardEvent, groupIndex: number): void {
    if (isPlatformBrowser(this.platformId)) {
      event.preventDefault();
      if (event.key === 'ArrowUp') {
        this.focusPreviousTab(groupIndex);
      } else if (event.key == 'ArrowDown') {
        this.focusNextTab(groupIndex);
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

  isBackBtnFocused(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const tabs = this.getTabs();
      return (
        tabs[0].id === 'back-button' && this.document.activeElement === tabs[0]
      );
    }
  }
}
