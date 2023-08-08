/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { LoggerService, RoutingService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import {
  FocusConfig,
  KeyboardFocusService,
} from '../a11y/keyboard-focus/index';
import { SkipLinkComponent } from '../a11y/skip-link/index';
import { HamburgerMenuService } from '../header/hamburger-menu/hamburger-menu.service';
import { StorefrontOutlets } from './storefront-outlets.model';

@Component({
  selector: 'cx-storefront',
  templateUrl: './storefront.component.html',
})
export class StorefrontComponent implements OnInit, OnDestroy {
  navigateSubscription: Subscription;
  isExpanded$: Observable<boolean> = this.hamburgerMenuService.isExpanded;

  readonly StorefrontOutlets = StorefrontOutlets;

  @HostBinding('class.start-navigating') startNavigating: boolean;
  @HostBinding('class.stop-navigating') stopNavigating: boolean;
  @HostBinding('attr.role') role = 'presentation';

  // required by esc focus
  @HostBinding('tabindex') tabindex = '0';

  @ViewChild(SkipLinkComponent) child: SkipLinkComponent;

  private keyboardFocusConfig: FocusConfig = {
    focusOnEscape: true,
    focusOnDoubleEscape: true,
  };

  @HostListener('keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent): void {
    this.keyboardFocusService.handleEscape(
      this.elementRef.nativeElement,
      this.keyboardFocusConfig,
      event
    );
  }

  constructor(
    private hamburgerMenuService: HamburgerMenuService,
    private routingService: RoutingService,
    protected elementRef: ElementRef<HTMLElement>,
    protected keyboardFocusService: KeyboardFocusService
  ) {
    const logger = inject(LoggerService);

    logger.log('This is a test log message');
    setTimeout(() => logger.warn('This is a test warning message'), 1000);
    setTimeout(() => logger.error('This is a test error message'), 2000);
  }

  ngOnInit(): void {
    this.navigateSubscription = this.routingService
      .isNavigating()
      .subscribe((val) => {
        this.startNavigating = val === true;
        this.stopNavigating = val === false;
      });
  }

  collapseMenuIfClickOutside(event: any): void {
    const element = event.target;
    if (
      element.nodeName.toLowerCase() === 'header' &&
      element.className.includes('is-expanded')
    ) {
      this.collapseMenu();
    }
  }

  collapseMenu(): void {
    this.hamburgerMenuService.toggle(true);
  }

  ngOnDestroy(): void {
    if (this.navigateSubscription) {
      this.navigateSubscription.unsubscribe();
    }
  }
}
