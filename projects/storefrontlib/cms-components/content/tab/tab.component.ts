/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { BreakpointService } from '../../../layout/breakpoint';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tab, TabConfig, TAB_MODE } from './tab.model';
import { wrapIntoBounds } from './tab.utils';

@Component({
  selector: 'cx-tab',
  templateUrl: './tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent implements OnInit {
  @Input() tabs: Tab[] | any;
  @Input() config: TabConfig | any;

  TAB_MODE = TAB_MODE;

  openTabs$: BehaviorSubject<number[]>;
  mode$: Observable<TAB_MODE>;

  @ViewChildren('tabHeader') tabHeaders: QueryList<any>;

  constructor(protected breakpointService: BreakpointService) {}

  ngOnInit(): void {
    this.openTabs$ = new BehaviorSubject<number[]>(this.config?.openTabs ?? []);
    this.mode$ = this.getMode();
  }

  /**
   * Tab selection works differently depending on the given mode.
   *
   * Modes:
   * - Tab: Closes all other tabs and opens the given tab.
   * - Accordian: Toggles the given tab open or closed.
   */
  select(tabNum: number, mode: TAB_MODE): void {
    this.focus(tabNum);

    switch (mode) {
      case TAB_MODE.TAB:
        return this.openTabs$.next([tabNum]);
      case TAB_MODE.ACCORDIAN:
        return this.toggleTab(tabNum);
    }
  }

  /**
   * Focuses the given tab according to the number.
   */
  focus(tabNum: number): void {
    this.tabHeaders.toArray()[tabNum].nativeElement.focus();
  }

  /**
   * Calls select or focus methods depending on the tab mode.
   */
  selectOrFocus(tabNum: number, mode: TAB_MODE, event: KeyboardEvent): void {
    event.preventDefault();

    switch (mode) {
      case TAB_MODE.TAB:
        return this.select(tabNum, mode);
      case TAB_MODE.ACCORDIAN:
        return this.focus(tabNum);
    }
  }

  /**
   * Handles keydown events made on tabs.
   *
   * Keys:
   * - ArrowUp / ArrowLeft: Select or focus the previous tab.
   * - ArrowRight / ArrowDown: Select or focus the next tab.
   * - Home: Select or focus the first tab.
   * - End: Select or focus the last tab.
   */
  handleKeydownEvent(
    tabNum: number,
    tabs: Tab[],
    mode: TAB_MODE,
    event: KeyboardEvent
  ): void {
    const FIRST_TAB = 0;
    const LAST_TAB = tabs.length - 1;
    const PREVIOUS_TAB = wrapIntoBounds(tabNum - 1, LAST_TAB);
    const NEXT_TAB = wrapIntoBounds(tabNum + 1, LAST_TAB);

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        return this.selectOrFocus(PREVIOUS_TAB, mode, event);
      case 'ArrowRight':
      case 'ArrowDown':
        return this.selectOrFocus(NEXT_TAB, mode, event);
      case 'Home':
        return this.selectOrFocus(FIRST_TAB, mode, event);
      case 'End':
        return this.selectOrFocus(LAST_TAB, mode, event);
    }
  }

  /**
   * Indicates whether a tab is open (in the open tabs array).
   */
  isOpen(tabNum: number): boolean {
    return (
      this.getOpenTabs().find((open: number) => open === tabNum) !== undefined
    );
  }

  /**
   * Inverts the state of the given tab between open and closed.
   */
  toggleTab(tabNum: number): void {
    const openTabs = this.getOpenTabs();
    const openTabIndex = openTabs.indexOf(tabNum);

    openTabIndex > -1
      ? openTabs.splice(openTabIndex, 1)
      : openTabs.push(tabNum);

    this.openTabs$.next(openTabs);
  }

  /**
   * Returns index 0 if the tab is already open,
   * no tabs are open and its the first tab (ie. 0),
   * or in 'ACCORDIAN' mode.
   * Otherwise returns -1.
   */
  getTabIndex(tabNum: number, mode: TAB_MODE): number {
    return this.isOpen(tabNum) ||
      (tabNum === 0 && this.getOpenTabs().length === 0) ||
      mode === 'ACCORDIAN'
      ? 0
      : -1;
  }

  protected getOpenTabs(): number[] {
    return this.openTabs$.value;
  }

  /**
   * Returns the mode specified by the config.
   * If unspecified mode, return 'TAB' or 'ACCORDIAN' modes responsively using the specified breakpoint in the config.
   * If unspecified breakpoint, return 'TAB' mode by default.
   */
  protected getMode(): Observable<TAB_MODE> {
    if (this.config.mode) {
      return of<TAB_MODE>(this.config.mode);
    }

    if (this.config.breakpoint) {
      return this.breakpointService
        .isUp(this.config.breakpoint)
        .pipe(
          map((isUp: boolean) => (isUp ? TAB_MODE.TAB : TAB_MODE.ACCORDIAN))
        );
    }

    return of<TAB_MODE>(TAB_MODE.TAB);
  }
}
