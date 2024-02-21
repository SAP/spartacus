/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  CmsScrollToTopComponent,
  ScrollBehavior,
  WindowRef,
} from '@spartacus/core';
import { take } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { SelectFocusUtility } from '../../../layout/a11y/index';
import { ICON_TYPE } from '../../misc/icon/icon.model';

enum ClickEventSource {
  Key = 0,
  Mouse = 1,
}

@Component({
  selector: 'cx-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollToTopComponent implements OnInit {
  iconTypes = ICON_TYPE;

  @HostBinding('class.display')
  display: boolean | undefined;

  protected window: Window | undefined = this.winRef.nativeWindow;
  protected scrollBehavior: ScrollBehavior = ScrollBehavior.SMOOTH;
  protected displayThreshold: number = (this.window?.innerHeight ?? 400) / 2;
  protected clickEventSource: ClickEventSource | undefined;
  protected wasClicked = false;

  @ViewChild('button')
  button: ElementRef;

  constructor(
    protected winRef: WindowRef,
    protected componentData: CmsComponentData<CmsScrollToTopComponent>,
    protected selectFocusUtility: SelectFocusUtility
  ) {}

  ngOnInit(): void {
    this.setConfig();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.switchDisplay();
  }

  /**
   * Scroll back to the top of the page and set focus on top most focusable element.
   */
  scrollToTop(event: MouseEvent): void {
    this.window?.scrollTo({
      top: 0,
      behavior: this.scrollBehavior,
    });

    this.clickEventSource = event.detail;
    this.wasClicked = true;
  }

  focusOut(): void {
    if (this.display) {
      this.switchDisplay();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (
      document.activeElement === this.button.nativeElement &&
      this.wasClicked &&
      event.key === 'Tab' &&
      !event.shiftKey
    ) {
      event.preventDefault();

      // Focus first focusable element within the html body
      this.selectFocusUtility
        .findFirstFocusable(this.winRef.document.body, { autofocus: '' })
        ?.focus();
    }
  }

  protected setConfig(): void {
    this.componentData.data$.pipe(take(1)).subscribe((data) => {
      this.scrollBehavior = data.scrollBehavior ?? this.scrollBehavior;
      this.displayThreshold = data.displayThreshold ?? this.displayThreshold;
    });
  }

  private switchDisplay(): void {
    this.display =
      (this.window && this.window.scrollY > this.displayThreshold) ||
      (!this.clickEventSource &&
        this.button.nativeElement === document.activeElement);

    if (!this.display) {
      this.wasClicked = false;
    }
  }
}
