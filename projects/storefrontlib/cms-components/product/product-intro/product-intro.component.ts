import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
} from '@angular/core';
import { Product, TranslationService, WindowRef } from '@spartacus/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { CurrentProductService } from '../current-product.service';

@Component({
  selector: 'cx-product-intro',
  templateUrl: './product-intro.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductIntroComponent implements AfterContentChecked, OnDestroy {
  product$: Observable<Product | null> =
    this.currentProductService.getProduct();
  isReviewsTabAvailable$ = new BehaviorSubject<boolean>(false);
  unsubscribe$ = new Subject();

  observer: MutationObserver;

  private reviewsTranslationKey =
    'TabPanelContainer.tabs.ProductReviewsTabComponent';

  constructor(
    protected currentProductService: CurrentProductService,
    private translationService: TranslationService,
    protected winRef: WindowRef
  ) {}

  ngAfterContentChecked(): void {
    if (this.winRef.isBrowser()) {
      const tabsComponent = this.getTabsComponent();
      if (tabsComponent && !this.observer) {
        this.observer = this.observeOnTabsMutation(tabsComponent);
      }
    } else {
      !this.isReviewsTabAvailable$.value &&
        this.isReviewsTabAvailable$.next(true);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // Scroll to views component on page and click "Reviews" tab
  showReviews() {
    // Use translated label for Reviews tab reference
    this.translationService
      .translate(this.reviewsTranslationKey)
      .pipe(take(1))
      .subscribe((reviewsTabLabel) => {
        const tabsComponent = this.getTabsComponent();
        const reviewsTab =
          tabsComponent && this.getTabByLabel(reviewsTabLabel, tabsComponent);

        if (reviewsTab) {
          this.clickTabIfInactive(reviewsTab);
          setTimeout(() => {
            reviewsTab.scrollIntoView({ behavior: 'smooth' });
            reviewsTab.focus({ preventScroll: true });
          }, 0);
        }
      });
  }

  // Create a mutation observer to observe if reviews component has been rendered
  protected observeOnTabsMutation(target: HTMLElement): MutationObserver {
    const config: MutationObserverInit = {
      childList: true,
      characterData: true,
    };
    const observer = new MutationObserver((mutations) => {
      this.translationService
        .translate(this.reviewsTranslationKey)
        .pipe(
          map(
            (reviewsTabLabel) =>
              !!mutations
                .map((mutation) => {
                  // element is not filtered by name because reviews component and its selector can be customized
                  return this.getTabByLabel(
                    reviewsTabLabel,
                    mutation.target as HTMLElement
                  );
                })
                .find((tab) => !!tab)
                ?.nextSibling?.hasChildNodes()
          ),
          takeUntil(this.unsubscribe$)
        )
        .subscribe(this.isReviewsTabAvailable$);
    });
    observer.observe(target, config);
    return observer;
  }

  // Get Tabs Component if exists on page
  private getTabsComponent(): HTMLElement | null {
    return this.winRef.document.querySelector('cx-tab-paragraph-container');
  }

  // Click to activate tab if not already active
  private clickTabIfInactive(tab: HTMLElement): void {
    if (
      !tab.classList.contains('active') ||
      tab.classList.contains('toggled')
    ) {
      tab.click();
    }
  }

  // Get Tab by label if exists on page
  private getTabByLabel(
    label: string,
    tabsComponent: HTMLElement
  ): HTMLElement | undefined {
    // NOTE: Reads through button tags to click on correct tab
    // There may be a better way of doing this now/after refactor
    const tabElements: HTMLCollectionOf<HTMLElement> =
      tabsComponent.getElementsByTagName('button');

    // Look through button tab elements until finding tab with label
    return Array.from(tabElements).find((buttonElement) =>
      buttonElement.innerHTML.includes(label)
    );
  }
}
