import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BREAKPOINT, BreakpointService } from '@spartacus/storefront';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ConfiguratorGroupMenuService {
  constructor(
    @Inject(PLATFORM_ID) protected platformId: any,
    @Inject(DOCUMENT) protected document: any,
    protected breakpointService: BreakpointService
  ) {}

  /**
   * Retrieves the list of the group depending on the screen size.
   *
   * @returns {NodeListOf<HTMLElement>} - list of the groups.
   * @protected
   */
  protected getGroups(): NodeListOf<HTMLElement> {
    if (isPlatformBrowser(this.platformId)) {
      let selector = ' cx-configurator-group-menu button[role="tab"]';
      this.breakpointService
        ?.isUp(BREAKPOINT.lg)
        .pipe(take(1))
        .subscribe((isDesktop) => {
          if (isDesktop) {
            selector = 'main' + selector;
          } else {
            selector = '.navigation' + selector;
          }
        });
      return document.querySelectorAll(selector);
    }
  }

  /**
   * Retrieves the focused group index.
   *
   * @param {NodeListOf<HTMLElement>} groups - List of the groups
   * @returns {number | undefined} - focused group index
   * @protected
   */
  protected getFocusedGroupIndex(
    groups: NodeListOf<HTMLElement>
  ): number | undefined {
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

  /**
   * Updates the current group index, if the current group index is not equal focused group index.
   * Otherwise the current group index stays unchanged.
   *
   * @param {number} currentGroupIndex - Current group index
   * @param {number} focusedGroupIndex - Focused group index
   * @returns {number} - updated group index
   * @protected
   */
  protected updateCurrentGroupIndex(
    currentGroupIndex: number,
    focusedGroupIndex: number
  ): number {
    return focusedGroupIndex !== currentGroupIndex
      ? focusedGroupIndex
      : currentGroupIndex;
  }

  /**
   * Focuses the next group.
   *
   * @param {number} currentGroupIndex - Current group index
   * @protected
   */
  protected focusNextGroup(currentGroupIndex: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const groups = this.getGroups();
      const focusedGroupIndex = this.getFocusedGroupIndex(groups);
      currentGroupIndex = this.updateCurrentGroupIndex(
        currentGroupIndex,
        focusedGroupIndex
      );

      if (groups) {
        if (currentGroupIndex === groups?.length - 1) {
          groups[0]?.focus();
        } else {
          groups[currentGroupIndex + 1]?.focus();
        }
      }
    }
  }

  /**
   * Focuses the previous group.
   *
   * @param {number} currentGroupIndex - Current group index
   * @protected
   */
  protected focusPreviousGroup(currentGroupIndex: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const groups = this.getGroups();
      const focusedGroupIndex = this.getFocusedGroupIndex(groups);
      currentGroupIndex = this.updateCurrentGroupIndex(
        currentGroupIndex,
        focusedGroupIndex
      );

      if (groups) {
        if (currentGroupIndex === 0) {
          groups[groups?.length - 1]?.focus();
        } else {
          groups[currentGroupIndex - 1]?.focus();
        }
      }
    }
  }

  /**
   * Switches the group on pressing arrow key.
   *
   * @param {KeyboardEvent} event - keyboard event
   * @param {number} groupIndex - Group index
   */
  switchGroupOnArrowPress(event: KeyboardEvent, groupIndex: number): void {
    if (isPlatformBrowser(this.platformId)) {
      event.preventDefault();
      if (event.code === 'ArrowUp') {
        this.focusPreviousGroup(groupIndex);
      } else if (event.code === 'ArrowDown') {
        this.focusNextGroup(groupIndex);
      }
    }
  }

  /**
   * Verifies whether the first group in the group list is `Back` button.
   *
   * @returns {boolean} - returns `true` if the first group in the group list is `Back` button, otherwise `false`
   */
  isBackBtnFocused(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const groups = this.getGroups();
      return (
        groups[0].classList.value.indexOf('cx-menu-back') !== -1 &&
        document.activeElement === groups[0]
      );
    }
  }
}
