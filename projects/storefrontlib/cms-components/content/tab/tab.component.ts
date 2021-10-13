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
import { filter, map, take } from 'rxjs/operators';
import { Tab, TabConfig, TAB_TYPE } from './Tab';

@Component({
  selector: 'cx-tab',
  templateUrl: './tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent implements OnInit {
  @Input() tabs$: Observable<Tab[]>;
  @Input() config: TabConfig;

  openTabs$: BehaviorSubject<number[]>;

  mode$: Observable<TAB_TYPE>;

  @ViewChildren('tabHeader')
  tabHeaders: QueryList<any>;

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
  select(tabNum: number, mode: TAB_TYPE): void {
    this.focus(tabNum);

    switch (mode) {
      case TAB_TYPE.TAB:
        this.openTabs$.next([tabNum]);
        return;
      case TAB_TYPE.ACCORDIAN:
        this.toggleTab(tabNum);
        return;
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
  selectOrFocus(tabNum: number, mode: TAB_TYPE, event: KeyboardEvent): void {
    event.preventDefault();

    switch (mode) {
      case TAB_TYPE.TAB:
        return this.select(tabNum, mode);
      case TAB_TYPE.ACCORDIAN:
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
    mode: TAB_TYPE,
    event: KeyboardEvent
  ): void {
    const key = event.key;
    const FIRST_TAB = 0;
    const LAST_TAB = tabs.length - 1;
    const PREVIOUS_TAB = this.keepTabNumInBounds(tabNum - 1);
    const NEXT_TAB = this.keepTabNumInBounds(tabNum + 1);

    switch (key) {
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

  protected getOpenTabs(): number[] {
    return this.openTabs$.value;
  }

  /**
   * Either returns the first tab position if the tab number is beyond the number of available tabs
   * or returns the last tab position if the tab number is less than zero.
   */
  protected keepTabNumInBounds(tabNum: number): number {
    this.tabs$
      .pipe(
        filter((tabs) => !!tabs),
        take(1)
      )
      .subscribe((tabs) => {
        tabNum =
          tabNum < 0
            ? tabs.length - 1
            : tabNum > tabs.length - 1
            ? (tabNum = 0)
            : tabNum;
      });
    return tabNum;
  }

  protected getMode(): Observable<TAB_TYPE> {
    return this.config.mode
      ? of<TAB_TYPE>(this.config.mode)
      : this.config.breakpoint
      ? this.breakpointService
          .isUp(this.config.breakpoint)
          .pipe(
            map((isUp: boolean) => (isUp ? TAB_TYPE.TAB : TAB_TYPE.ACCORDIAN))
          )
      : of<TAB_TYPE>(TAB_TYPE.TAB);
  }
}
