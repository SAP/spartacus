import {
  ChangeDetectionStrategy,
  Component,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Tab } from './Tab';

@Component({
  selector: 'cx-tab',
  templateUrl: './tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  @Input() tabs$: Observable<Tab[]>;
  @Input() openTabs: number[] = [0];

  @ViewChildren('tabButton')
  tabButtons: QueryList<any>;

  constructor() {}

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
