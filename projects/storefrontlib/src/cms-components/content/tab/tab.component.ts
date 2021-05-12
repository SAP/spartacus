import {
  ChangeDetectionStrategy,
  Component,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { BREAKPOINT } from 'projects/storefrontlib/src/layout';
import { BreakpointService } from 'projects/storefrontlib/src/layout/breakpoint/breakpoint.service';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { Tab, TabConfig } from './Tab';

export enum TAB_TYPE {
  TAB = 'TAB',
  ACCORDIAN = 'ACCORDIAN',
}

@Component({
  selector: 'cx-tab',
  templateUrl: './tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  @Input() tabs$: Observable<Tab[]>;
  @Input() openTabs: number[] = [0];
  @Input() classes: string = '';
  @Input() config: TabConfig;

  mode$: Observable<TAB_TYPE> = this.breakpointService
    .isUp(BREAKPOINT.md)
    .pipe(map((isUp: boolean) => (isUp ? TAB_TYPE.TAB : TAB_TYPE.ACCORDIAN)));

  @ViewChildren('tabButton')
  tabButtons: QueryList<any>;

  constructor(protected breakpointService: BreakpointService) {}

  select(tabNum: number, event?: MouseEvent | KeyboardEvent): void {
    event?.preventDefault();

    tabNum = this.keepTabNumInBounds(tabNum);
    this.openTabs = [tabNum];
    this.tabButtons.toArray()[tabNum].nativeElement.focus();
  }

  isOpen(tabNum: number): boolean {
    return this.openTabs.find((open: number) => open === tabNum) !== undefined;
  }

  private keepTabNumInBounds(tabNum: number) {
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
}
