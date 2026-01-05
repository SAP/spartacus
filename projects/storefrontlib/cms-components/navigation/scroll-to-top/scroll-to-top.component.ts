/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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

@Component({
  selector: 'cx-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ScrollToTopComponent implements OnInit {
  iconTypes = ICON_TYPE;

  @HostBinding('class.display')
  display: boolean | undefined;

  protected window: Window | undefined = this.winRef.nativeWindow;
  protected scrollBehavior: ScrollBehavior = ScrollBehavior.SMOOTH;
  protected displayThreshold: number = (this.window?.innerHeight ?? 400) / 2;
  protected triggedByKeypress: boolean = false;

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
   * Scroll back to the top of the page, and recognize if triggerd by keyboard.
   */
  scrollToTop(event?: MouseEvent): void {
    this.window?.scrollTo({
      top: 0,
      behavior: this.scrollBehavior,
    });
    this.triggedByKeypress = event?.detail === 0;
  }

  onFocusOut(): void {
    if (this.display) {
      this.switchDisplay();
    }
  }

  /**
   * After scrolling to top, pressing Tab should focus first focusable element within body.
   */
  protected onTab(event: Event): void {
    const tabEvent = event as KeyboardEvent;
    const scrollToTopHasFocus =
      document.activeElement === this.button.nativeElement;
    const isAtTopOfPage = this.window?.scrollY === 0;

    if (
      scrollToTopHasFocus &&
      isAtTopOfPage &&
      tabEvent.key === 'Tab' &&
      !tabEvent.shiftKey
    ) {
      event.preventDefault();
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

  /**
   * This methods decides when the ScrollToTop button should be displayed.
   */
  protected switchDisplay(): void {
    const isPastThreshold =
      this.window && this.window.scrollY > this.displayThreshold;
    const buttonHasFocus = this.button.nativeElement === document.activeElement;

    this.display =
      isPastThreshold || (this.triggedByKeypress && buttonHasFocus);

    if (!this.display) {
      this.triggedByKeypress = false;
    }
  }
}
