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

  protected getGroups(): NodeListOf<HTMLElement> {
    if (isPlatformBrowser(this.platformId)) {
      let selector = ' cx-configurator-group-menu button[role="tab"]';
      if (this.breakpointService?.isUp(BREAKPOINT.lg)) {
        selector = 'main' + selector;
      } else {
        selector = '.navigation' + selector;
      }
      return document.querySelectorAll(selector);
    }
  }

  protected getFocusedGroupIndex(groups): number | undefined {
    if (isPlatformBrowser(this.platformId)) {
      let focusedElement = document.activeElement;
      let focusedElementId = focusedElement.id;
      if (groups) {
        for (let index = 0; index < groups.length; index++) {
          if (groups[index].id === focusedElementId) {
            return index;
          }
        }
      }
      return undefined;
    }
  }

  protected updateCurrentGroupIndex(
    currentGroupIndex: number,
    groupIndex: number
  ): number {
    return groupIndex !== currentGroupIndex ? groupIndex : currentGroupIndex;
  }

  protected focusNextGroup(currentGroupIndex: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const groups = this.getGroups();
      const groupIndex = this.getFocusedGroupIndex(groups);
      currentGroupIndex = this.updateCurrentGroupIndex(
        currentGroupIndex,
        groupIndex
      );

      if (groups) {
        if (
          currentGroupIndex === groups?.length - 1 ||
          (groupIndex &&
            groupIndex !== currentGroupIndex &&
            currentGroupIndex === groups?.length - 2)
        ) {
          groups[0]?.focus();
        } else {
          groups[currentGroupIndex + 1]?.focus();
        }
      }
    }
  }

  protected focusPreviousGroup(currentGroupIndex: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const groups = this.getGroups();
      const groupIndex = this.getFocusedGroupIndex(groups);
      currentGroupIndex = this.updateCurrentGroupIndex(
        currentGroupIndex,
        groupIndex
      );

      if (currentGroupIndex === 0) {
        groups[groups?.length - 1]?.focus();
      } else {
        groups[currentGroupIndex - 1]?.focus();
      }
    }
  }

  switchGroupOnArrowPress(event: KeyboardEvent, groupIndex: number): void {
    if (isPlatformBrowser(this.platformId)) {
      event.preventDefault();
      if (event.code === 'ArrowUp') {
        this.focusPreviousGroup(groupIndex);
      } else if (event.code == 'ArrowDown') {
        this.focusNextGroup(groupIndex);
      }
    }
  }

  isBackBtnFocused(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const groups = this.getGroups();
      return (
        groups[0].id === 'back-button' && document.activeElement === groups[0]
      );
    }
  }
}
