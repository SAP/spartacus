/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { BreakpointService } from '../../../layout/breakpoint';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Tab, TabConfig, TAB_MODE } from './tab.model';
import { wrapIntoBounds } from './tab.utils';
import {
  TranslationService,
  useFeatureStyles,
  FeatureConfigService,
} from '@spartacus/core';

@Component({
  selector: 'cx-tab',
  templateUrl: './tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * If you have nested templates that are subject to complex changes,
   * it can be better to use this property instead with an Observable
   * to set Tabs.
   *
   * Note: You should NOT set the `tabs` property if using this.
   */
  @Input() tabs$: Observable<Tab[] | any>;
  @Input() tabs: Tab[] | any;
  @Input() config: TabConfig | any;
  @Input() disabled: boolean = false;

  readonly TAB_MODE = TAB_MODE;

  protected breakpointService = inject(BreakpointService);
  protected translationService = inject(TranslationService);
  protected cd = inject(ChangeDetectorRef);
  private featureConfigService = inject(FeatureConfigService, {
    optional: true,
  });

  @ViewChildren('tabHeader') tabHeaders: QueryList<any>;

  openTabs$: BehaviorSubject<number[]>;
  mode$: Observable<TAB_MODE>;
  protected subscriptions = new Subscription();

  constructor() {
    useFeatureStyles('a11yCroppedFocusRing');
  }

  ngOnInit(): void {
    this.openTabs$ = new BehaviorSubject<number[]>(this.config?.openTabs ?? []);
    this.mode$ = this.getMode();
  }

  ngAfterViewInit(): void {
    /**
     * We subscribe to the tabs observable if added and use this to set
     * the `tabs` property. The input `tabs` property should not be
     * initialized. It will be overwritten by this otherwise.
     */
    this.subscriptions.add(
      this.tabs$?.subscribe((tabs) => {
        this.tabs = tabs;
        this.cd.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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

    if (this.featureConfigService?.isEnabled('a11yTabsManualActivation')) {
      switch (mode) {
        case TAB_MODE.TAB:
        case TAB_MODE.ACCORDIAN:
          return this.focus(tabNum);
      }
    } else {
      switch (mode) {
        case TAB_MODE.TAB:
          return this.select(tabNum, mode);
        case TAB_MODE.ACCORDIAN:
          return this.focus(tabNum);
      }
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

    // Disable some keys is `restrictDirectionKeys` is enabled.
    if (
      this.config.restrictDirectionKeys &&
      this.shouldRestrictKeys(mode, event)
    ) {
      return;
    }

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

  protected shouldRestrictKeys(mode: TAB_MODE, event: KeyboardEvent): boolean {
    if (mode === TAB_MODE.TAB && ['ArrowUp', 'ArrowDown'].includes(event.key)) {
      return true;
    }

    if (
      mode === TAB_MODE.ACCORDIAN &&
      ['ArrowLeft', 'ArrowRight'].includes(event.key)
    ) {
      return true;
    }

    return false;
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

  getTitle(mode: TAB_MODE, index: number) {
    const tab = this.tabs[index];

    // Not required in Tab mode.
    if (mode === TAB_MODE.TAB) {
      return null;
    }

    let header = tab.header;
    if (tab.headerKey) {
      this.translationService
        .translate(tab.headerKey)
        .pipe(take(1))
        .subscribe((val) => {
          header = val;
        });
    }

    return (
      // Show expanded or collapsed.
      (this.isOpen(index) ? 'Collapse' : 'Expand') + ' ' + header
    );
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
