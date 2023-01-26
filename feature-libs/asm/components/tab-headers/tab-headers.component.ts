/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { DirectionMode, DirectionService } from '@spartacus/storefront';
import { TabHeader } from './tab-headers.model';

@Component({
  selector: 'cx-tab-headers',
  templateUrl: './tab-headers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabHeadersComponent implements AfterViewInit {
  @ViewChildren('tabHeaderItem') tabHeaderItems: QueryList<ElementRef<HTMLElement>>;
  @Input() activeTabIndex = 0;
  @Input() ariaControls = '';
  @Input() tabHeaders: Array<TabHeader> = [];
  @Output() selectTab = new EventEmitter<number>();

  constructor(protected directionService: DirectionService,) {}

  ngAfterViewInit(): void {
    this.updateTabIndex(this.activeTabIndex);
   }

  onSelectTab(selectedIndex: number): void {
    this.activeTabIndex = selectedIndex;
    this.updateTabIndex(selectedIndex);
    this.selectTab.emit(selectedIndex);
  }
  switchTabOnKeyPress(event: KeyboardEvent, selectedIndex: number): void {
    const maxTab = this.tabHeaderItems.length - 1;
    let flag = false;

    if (this.isBackNavigation(event)) {
      flag = true;
      selectedIndex--;
      if (selectedIndex < 0) {
        selectedIndex = maxTab;
      }
    } else if (this.isForwardsNavigation(event)) {
      flag = true;
      selectedIndex++;
      if (selectedIndex > maxTab) {
        selectedIndex = 0;
      }
    }
    if (flag) {
      this.onSelectTab(selectedIndex);
      event.stopPropagation();
      event.preventDefault();
    }
  }
  /**
   * Update tabIndex for each tab: select tab becomes 0 and other tabs will be -1
   * this is for prevent tabbing within tabs
   * @param {number} selectedIndex - selected tab index
   */
  protected updateTabIndex(selectedIndex: number): void {
    this.tabHeaderItems.toArray().forEach( (tabHeaderItem, index) => {
      if (index === selectedIndex) {
        tabHeaderItem.nativeElement.tabIndex = 0;
        tabHeaderItem.nativeElement.focus();
      }else {
        tabHeaderItem.nativeElement.tabIndex = -1;
      }
    });
  };

  /**
   * Verifies whether the user navigates into a subgroup of the main group menu.
   *
   * @param {KeyboardEvent} event - Keyboard event
   * @returns {boolean} -'true' if the user navigates into the subgroup, otherwise 'false'.
   * @protected
   */
  protected isForwardsNavigation(event: KeyboardEvent): boolean {
    return (
      (event.code === 'ArrowRight' && this.isLTRDirection()) ||
      (event.code === 'ArrowLeft' && this.isRTLDirection())
    );
  }

  /**
   * Verifies whether the user navigates from a subgroup back to the main group menu.
   *
   * @param {KeyboardEvent} event - Keyboard event
   * @returns {boolean} -'true' if the user navigates back into the main group menu, otherwise 'false'.
   * @protected
   */
  protected isBackNavigation(event: KeyboardEvent): boolean {
    return (
      (event.code === 'ArrowLeft' && this.isLTRDirection()) ||
      (event.code === 'ArrowRight' && this.isRTLDirection())
    );
  }
  protected isLTRDirection(): boolean {
    return this.directionService.getDirection() === DirectionMode.LTR;
  }

  protected isRTLDirection(): boolean {
    return this.directionService.getDirection() === DirectionMode.RTL;
  }
}
