/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
  Optional,
  ViewChild,
  inject,
} from '@angular/core';
import {
  FeatureConfigService,
  RoutingService,
  useFeatureStyles,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import {
  FocusConfig,
  KeyboardFocusService,
} from '../a11y/keyboard-focus/index';
import { SkipLinkComponent } from '../a11y/skip-link/index';
import { HamburgerMenuService } from '../header/hamburger-menu/hamburger-menu.service';
import { StorefrontOutlets } from './storefront-outlets.model';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GlobalMessageComponent } from '../../cms-components/misc/global-message/global-message.component';
import { PageSlotComponent } from '../../cms-structure/page/slot/page-slot.component';
import { PageLayoutComponent } from '../../cms-structure/page/page-layout/page-layout.component';
import { FocusDirective } from '../a11y/keyboard-focus/focus.directive';
import { SkipLinkDirective } from '../a11y/skip-link/directive/skip-link.directive';
import { OutletDirective } from '../../cms-structure/outlet/outlet.directive';
import { PageTemplateDirective } from '../../cms-structure/page/page-layout/page-template.directive';

@Component({
    selector: 'cx-storefront',
    templateUrl: './storefront.component.html',
    standalone: true,
    imports: [
        PageTemplateDirective,
        OutletDirective,
        SkipLinkDirective,
        FocusDirective,
        PageLayoutComponent,
        PageSlotComponent,
        GlobalMessageComponent,
        RouterOutlet,
        AsyncPipe,
    ],
})
export class StorefrontComponent implements OnInit, OnDestroy {
  navigateSubscription: Subscription;
  isExpanded$: Observable<boolean> = this.hamburgerMenuService.isExpanded;

  readonly StorefrontOutlets = StorefrontOutlets;

  @Optional() featureConfigService = inject(FeatureConfigService, {
    optional: true,
  });

  @HostBinding('class.start-navigating') startNavigating: boolean;
  @HostBinding('class.stop-navigating') stopNavigating: boolean;

  // TODO: (CXSPA-7464) - Remove feature flags and following bindings next major release.
  @HostBinding('attr.role') role = this?.featureConfigService?.isEnabled(
    'a11yScreenReaderBloatFix'
  )
    ? null
    : 'presentation';

  // required by esc focus
  @HostBinding('tabindex') tabindex = this?.featureConfigService?.isEnabled(
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
