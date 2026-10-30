/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgStyle } from '@angular/common';
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
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import {
  FeatureToggles,
  PageTemplateService,
  PageType,
  RoutingService,
  SectionItem,
  useFeatureStyles,
} from '@spartacus/core';
import { Observable, of, Subscription, tap } from 'rxjs';
import { distinctUntilChanged, switchMap, take } from 'rxjs/operators';
import { GlobalMessageComponent } from '../../cms-components/misc/global-message/global-message.component';
import { OutletDirective } from '../../cms-structure/outlet/outlet.directive';
import { PageLayoutComponent } from '../../cms-structure/page/page-layout/page-layout.component';
import { PageLayoutService } from '../../cms-structure/page/page-layout/page-layout.service';
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
    NgStyle,
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

  private readonly pageLayoutService = inject(PageLayoutService);
  private readonly pageTemplateService = inject(PageTemplateService);

  readonly isCustomTemplate = toSignal(this.pageLayoutService.isCustomTemplate$);

  readonly pageTemplateSections = toSignal(
    this.pageLayoutService.page$.pipe(
      switchMap((page) =>
        page?.templateId
          ? this.pageTemplateService.getPageTemplateSections(page.templateId)
          : of([])
      )
    ),
    { initialValue: [] }
  );


  @HostBinding('class.start-navigating') startNavigating: boolean;
  @HostBinding('class.stop-navigating') stopNavigating: boolean;

  // required by esc focus
  @HostBinding('tabindex') tabindex = '-1';

  @ViewChild(SkipLinkComponent) child: SkipLinkComponent;

  private readonly keyboardFocusConfig: FocusConfig = {
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

  readonly featureToggles = inject(FeatureToggles);

  protected categoryPageFocusSelector = 'cx-breadcrumb nav a';

  constructor(
    private readonly hamburgerMenuService: HamburgerMenuService,
    private readonly routingService: RoutingService,
    protected elementRef: ElementRef<HTMLElement>,
    protected keyboardFocusService: KeyboardFocusService
  ) {
    useFeatureStyles('a11yPreventWindowsHighContrastOverride');
    useFeatureStyles('alignNavigationMenuWithHeader');
    useFeatureStyles('cdsBottomHeaderSlotAdjustPosition');
    useFeatureStyles('a11yFocusIndicatorContrast');
    useFeatureStyles('a11yDisabledButtonContrast');
    useFeatureStyles('a11yPrimaryColorContrast');
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

    // TODO: Required to use feature flag with root styles.
    //       Remove this entire block once the a11yPreventWindowsHighContrastOverride feature flag is removed
    if (this.featureToggles.a11yPreventWindowsHighContrastOverride) {
      this.document?.documentElement.classList.add(
        'cxFeat_a11yPreventWindowsHighContrastOverride'
      );
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

  isInCustomTemplate(): boolean {
    return !!(this.featureToggles.enableCustomPageTemplate && this.isCustomTemplate());
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
      if (this.featureToggles.a11yFocusBreadcrumbOnNavigation) {
        this.routingService
          .getPageContext()
          .pipe(take(1))
          .subscribe((pageContext) => {
            if (pageContext.type === PageType.CATEGORY_PAGE) {
              setTimeout(() => {
                const breadcrumbLink =
                  this.document?.querySelector<HTMLElement>(
                    this.categoryPageFocusSelector
                  );
                if (breadcrumbLink) {
                  breadcrumbLink.focus();
                  return;
                }
                this.skipLinkService?.scrollToTarget('cx-main');
              });
            } else {
              this.skipLinkService?.scrollToTarget('cx-main');
            }
          });
      } else {
        this.skipLinkService?.scrollToTarget('cx-main');
      }
    }
  }

  convertToStyle(item: SectionItem): { [key: string]: string | number } {
    if (!item || !this.isValidGridItem(item)) {
      return {};
    }
    return {
      'grid-row-start': item.rowStart,
      'grid-column-start': item.colStart,
      'grid-row-end': `span ${item.rowSpan}`,
      'grid-column-end': `span ${item.colSpan}`,
    };
  }

  private isValidGridItem(item: SectionItem): boolean {
    const hasValidNumbers =
      typeof item.rowStart === 'number' &&
      typeof item.colStart === 'number' &&
      typeof item.rowSpan === 'number' &&
      typeof item.colSpan === 'number';
    if (!hasValidNumbers) {
      return false;
    }
    return (
      item.rowSpan > 0 &&
      item.colSpan > 0 &&
      !Number.isNaN(item.rowStart) &&
      !Number.isNaN(item.colStart)
    );
  }
}
