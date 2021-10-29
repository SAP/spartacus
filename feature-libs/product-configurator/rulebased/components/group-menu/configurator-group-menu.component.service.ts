import { ElementRef, Injectable, QueryList } from '@angular/core';
import { WindowRef } from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class ConfiguratorGroupMenuService {
  constructor(protected windowRef: WindowRef) {}

  /**
   * Retrieves the focused group index.
   *
   * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
   * @returns {number | undefined} - focused group index
   * @protected
   */
  protected getFocusedGroupIndex(
    groups: QueryList<ElementRef<HTMLElement>>
  ): number | undefined {
    if (groups) {
      const group = groups.find(
        (group) =>
          group.nativeElement?.id ===
          this.windowRef?.document?.activeElement?.id
      );
      if (group) {
        return groups.toArray().indexOf(group);
      }
    }
    return undefined;
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
    focusedGroupIndex?: number
  ): number {
    if (focusedGroupIndex) {
      return focusedGroupIndex !== currentGroupIndex
        ? focusedGroupIndex
        : currentGroupIndex;
    }
    return currentGroupIndex;
  }

  /**
   * Focuses the next group.
   *
   * @param {number} currentGroupIndex - Current group index
   * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
   * @protected
   */
  protected focusNextGroup(
    currentGroupIndex: number,
    groups: QueryList<ElementRef<HTMLElement>>
  ): void {
    const focusedGroupIndex = this.getFocusedGroupIndex(groups);
    currentGroupIndex = this.updateCurrentGroupIndex(
      currentGroupIndex,
      focusedGroupIndex
    );

    if (groups) {
      if (currentGroupIndex === groups.length - 1) {
        groups.first?.nativeElement?.focus();
      } else {
        groups.toArray()[currentGroupIndex + 1]?.nativeElement.focus();
      }
    }
  }

  /**
   * Focuses the previous group.
   *
   * @param {number} currentGroupIndex - Current group index
   * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
   * @protected
   */
  protected focusPreviousGroup(
    currentGroupIndex: number,
    groups: QueryList<ElementRef<HTMLElement>>
  ): void {
    const focusedGroupIndex = this.getFocusedGroupIndex(groups);
    currentGroupIndex = this.updateCurrentGroupIndex(
      currentGroupIndex,
      focusedGroupIndex
    );

    if (groups) {
      if (currentGroupIndex === 0) {
        groups.last?.nativeElement?.focus();
      } else {
        groups.toArray()[currentGroupIndex - 1]?.nativeElement?.focus();
      }
    }
  }

  /**
   * Switches the group on pressing an arrow key.
   *
   * @param {KeyboardEvent} event - keyboard event
   * @param {number} groupIndex - Group index
   * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
   */
  switchGroupOnArrowPress(
    event: KeyboardEvent,
    groupIndex: number,
    groups: QueryList<ElementRef<HTMLElement>>
  ): void {
    event.preventDefault();
    if (event.code === 'ArrowUp') {
      this.focusPreviousGroup(groupIndex, groups);
    } else if (event.code === 'ArrowDown') {
      this.focusNextGroup(groupIndex, groups);
    }
  }

  /**
   * Verifies whether the first group in the group list is `Back` button.
   *
   * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
   * @returns {boolean} - returns `true` if the first group in the group list is `Back` button, otherwise `false`
   */
  isBackBtnFocused(
    groups: QueryList<ElementRef<HTMLElement>>
  ): boolean | undefined {
    if (groups) {
      return (
        groups.first?.nativeElement?.classList?.value?.indexOf(
          'cx-menu-back'
        ) !== -1 &&
        this.windowRef?.document?.activeElement === groups.first?.nativeElement
      );
    }
    return undefined;
  }
}
