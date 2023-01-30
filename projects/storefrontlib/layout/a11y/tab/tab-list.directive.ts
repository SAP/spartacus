import {
  AfterContentInit,
  ContentChildren,
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
} from '@angular/core';

import { DirectionMode, DirectionService } from '../../direction';
import { TabDirective } from './tab.directive';

@Directive({
  selector: '[cxTabList]',
})
export class TabListDirective implements AfterContentInit {
  @ContentChildren(TabDirective, { descendants: true })
  tabs: QueryList<TabDirective> | undefined;

  @Input()
  set selectedIndex(selectedIndex: number) {
    this.currentFocusedIndex = selectedIndex;
    this.updateTabs(selectedIndex);
  }

  @Output()
  changeTab: EventEmitter<number> = new EventEmitter();

  protected currentFocusedIndex = 0;

  constructor(protected directionService: DirectionService) {}

  ngAfterContentInit(): void {
    this.updateTabs(this.currentFocusedIndex);
  }

  @HostListener('keydown.arrowleft')
  onArrowLeft(): void {
    let increment = 1;

    if (this.isLTRDirection()) {
      increment *= -1;
    }

    const index = this.increment(increment);

    this.currentFocusedIndex = index;
    this.focusTab(index);
  }

  @HostListener('keydown.arrowright')
  onArrowRight(): void {
    let increment = -1;

    if (this.isLTRDirection()) {
      increment = 1;
    }

    const index = this.increment(increment);

    this.currentFocusedIndex = index;
    this.focusTab(index);
  }

  @HostListener('keydown.home', ['$event'])
  onHome(event: KeyboardEvent): void {
    event.preventDefault();
    this.focusTab((this.currentFocusedIndex = 0));
  }

  @HostListener('keydown.end', ['$event'])
  onEnd(event: KeyboardEvent): void {
    event.preventDefault();
    if (this.tabs) {
      this.focusTab((this.currentFocusedIndex = this.tabs.length - 1));
    }
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  onActivate(event: KeyboardEvent): void {
    event.preventDefault();
    this.changeTab.emit(this.currentFocusedIndex);
  }

  protected isLTRDirection(): boolean {
    return this.directionService.getDirection() === DirectionMode.LTR;
  }

  protected increment(increment: number): number {
    if (!this.tabs) {
      return 0;
    }

    const tabsLength = this.tabs.length ?? 0;

    const selectedIndex = this.currentFocusedIndex + increment;

    if (selectedIndex < 0) {
      return tabsLength - 1;
    } else if (selectedIndex >= tabsLength) {
      return 0;
    } else {
      return selectedIndex;
    }
  }

  protected updateTabs(selectedIndex: number): void {
    this.currentFocusedIndex = selectedIndex;
    this.updateTabState(selectedIndex);
  }

  protected updateTabState(index: number): void {
    if (!this.tabs) {
      return;
    }

    this.tabs.forEach((tab) => {
      tab.ariaSelected = false;
      tab.tabindex = -1;
    });

    const tab = this.tabs.get(index);

    if (tab) {
      tab.ariaSelected = true;
      tab.tabindex = 0;
    }
  }

  protected focusTab(index: number): void {
    const tab = this.tabs?.get(index);

    if (tab) {
      tab.focus();
    }
  }
}
