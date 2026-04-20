/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  DOCUMENT,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import {
  FeatureConfigService,
  RoutingService,
  useFeatureStyles,
} from '@spartacus/core';
import { Observable, Subscription, tap } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { GlobalMessageComponent } from '../../cms-components/misc/global-message/global-message.component';
import { OutletDirective } from '../../cms-structure/outlet/outlet.directive';
import { PageLayoutComponent } from '../../cms-structure/page/page-layout/page-layout.component';
import { PageTemplateDirective } from '../../cms-structure/page/page-layout/page-template.directive';
import { PageSlotComponent } from '../../cms-structure/page/slot/page-slot.component';
import {
  FocusConfig,
  FocusDirective,
  KeyboardFocusService,
  SkipFocusConfig,
  SkipFocusDirective,
} from '../a11y/keyboard-focus/index';
import {
  SkipLinkComponent,
  SkipLinkDirective,
  SkipLinkService,
} from '../a11y/skip-link/index';
import { HamburgerMenuService } from '../header/hamburger-menu/hamburger-menu.service';
import { StorefrontOutlets } from './storefront-outlets.model';

@Component({
  selector: 'cx-storefront',
  templateUrl: './storefront.component.html',
  imports: [
    RouterModule,
    PageLayoutComponent,
    PageSlotComponent,
    FocusDirective,
    SkipFocusDirective,
    SkipLinkDirective,
    GlobalMessageComponent,
    AsyncPipe,
    OutletDirective,
    PageTemplateDirective,
  ],
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

  protected destroyRef = inject(DestroyRef);
  @Optional() protected document = inject(DOCUMENT, {
    optional: true,
  });
  @Optional() protected skipLinkService = inject(SkipLinkService, {
    optional: true,
  });

  @HostBinding('class.start-navigating') startNavigating: boolean;
  @HostBinding('class.stop-navigating') stopNavigating: boolean;

  // required by esc focus
  @HostBinding('tabindex') tabindex = '-1';

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
    protected keyboardFocusService: KeyboardFocusService,
    protected featureConfig: FeatureConfigService
  ) {
    useFeatureStyles('topProgressBarUseTransformAnimation');
    useFeatureStyles('unifiedDefaultHeaderSlotsAcrossBreakpoints');
    useFeatureStyles('a11yBlockWindowsHighContrastOverride');

    if (featureConfig.isEnabled('a11yBlockWindowsHighContrastOverride')) {
      this.document?.documentElement.classList.add(
        'cxFeat_a11yBlockWindowsHighContrastOverride'
      );
    }
  }

  ngOnInit(): void {
    this.navigateSubscription = this.routingService
      .isNavigating()
      .subscribe((val) => this.onNavigation(val));

    this.isExpanded$ = this.hamburgerMenuService.isExpanded.pipe(
      tap((isExpanded) => {
        if (isExpanded) {
          this.focusOnFirstNavigationItem();
        }
      })
    );

    this.trapFocusOnMenuIfExpanded();
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
      this.stopNavigating &&
      this.document?.activeElement !== this.document?.body
    ) {
      this.skipLinkService?.scrollToTarget('cx-main');
    }
  }
}
