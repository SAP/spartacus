/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  DestroyRef,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import {
  FeatureConfigService,
  RoutingService,
  useFeatureStyles,
} from '@spartacus/core';
import { Observable, Subscription, tap } from 'rxjs';
import {
  FocusConfig,
  SkipFocusConfig,
  KeyboardFocusService,
} from '../a11y/keyboard-focus/index';
import { SkipLinkComponent, SkipLinkService } from '../a11y/skip-link/index';
import { HamburgerMenuService } from '../header/hamburger-menu/hamburger-menu.service';
import { StorefrontOutlets } from './storefront-outlets.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'cx-storefront',
  templateUrl: './storefront.component.html',
  standalone: false,
})
export class StorefrontComponent implements OnInit, OnDestroy {
  navigateSubscription: Subscription;
  focusConfig: FocusConfig = { disableMouseFocus: true, trap: false };
  skipFocusConfig: SkipFocusConfig = {
    isEnabled: false,
    activeElementSelectors: ['button.cx-hamburger'],
  };
  isExpanded$: Observable<boolean> = this.hamburgerMenuService.isExpanded;

  readonly StorefrontOutlets = StorefrontOutlets;

  private featureConfigService = inject(FeatureConfigService);
  protected destroyRef = inject(DestroyRef);
  @Optional() protected document = inject(DOCUMENT, {
    optional: true,
  });
  @Optional() protected skipLinkService = inject(SkipLinkService, {
    optional: true,
  });

  @HostBinding('class.start-navigating') startNavigating: boolean;
  @HostBinding('class.stop-navigating') stopNavigating: boolean;

  // TODO: (CXSPA-7464) - Remove feature flags and following bindings next major release.
  @HostBinding('attr.role') role = this?.featureConfigService.isEnabled(
    'a11yScreenReaderBloatFix'
  )
    ? null
    : 'presentation';

  // required by esc focus
  @HostBinding('tabindex') tabindex = this?.featureConfigService.isEnabled(
    'a11yScreenReaderBloatFix'
  )
    ? '-1'
    : '0';

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
    useFeatureStyles('a11yImproveContrast');
    useFeatureStyles('cmsBottomHeaderSlotUsingFlexStyles');
    useFeatureStyles('headerLayoutForSmallerViewports');
    useFeatureStyles('a11yPdpGridArrangement');
    useFeatureStyles('a11yKeyboardFocusInSearchBox');
  }

  ngOnInit(): void {
    this.navigateSubscription = this.routingService
      .isNavigating()
      .subscribe((val) => this.onNavigation(val));
    if (
      this.featureConfigService.isEnabled(
        'a11yMobileFocusOnFirstNavigationItem'
      )
    ) {
      this.isExpanded$ = this.hamburgerMenuService.isExpanded.pipe(
        tap((isExpanded) => {
          if (isExpanded) {
            this.focusOnFirstNavigationItem();
          }
        })
      );
    }

    if (this.featureConfigService.isEnabled('a11yHamburgerMenuTrapFocus')) {
      this.trapFocusOnMenuIfExpanded();
    }
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

  protected trapFocusOnMenuIfExpanded(): void {
    this.isExpanded$
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((isExpanded) => {
        this.focusConfig = { ...this.focusConfig, trap: isExpanded };
        this.skipFocusConfig = {
          ...this.skipFocusConfig,
          isEnabled: isExpanded,
        };
      });
  }

  protected focusOnFirstNavigationItem() {
    const closestNavigationUi = this.elementRef.nativeElement.querySelector(
      'header cx-navigation-ui'
    );
    const focusable = closestNavigationUi?.querySelector<HTMLElement>(
      'li:not(.back) button, [tabindex="0"]'
    );
    if (focusable) {
      setTimeout(() => focusable.focus());
    }
  }

  ngOnDestroy(): void {
    if (this.navigateSubscription) {
      this.navigateSubscription.unsubscribe();
    }
  }

  protected onNavigation(isNavigating: boolean): void {
    this.startNavigating = isNavigating === true;
    this.stopNavigating = isNavigating === false;

    // After clicking a link the focus should move to the first available item in the main content area.
    if (
      this.featureConfigService.isEnabled('a11yResetFocusAfterNavigating') &&
      this.stopNavigating &&
      this.document?.activeElement !== this.document?.body
    ) {
      this.skipLinkService?.scrollToTarget('cx-main');
    }
  }
}
