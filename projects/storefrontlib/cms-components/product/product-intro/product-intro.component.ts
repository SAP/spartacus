import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { Product, TranslationService, WindowRef } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, takeWhile, withLatestFrom } from 'rxjs/operators';
import { CurrentProductService } from '../current-product.service';

@Component({
  selector: 'cx-product-intro',
  templateUrl: './product-intro.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductIntroComponent implements AfterContentChecked {
  product$: Observable<Product | null> =
    this.currentProductService.getProduct();
  tabComponent$ = new BehaviorSubject<HTMLElement | null>(null);

  areReviewsAvailable$: Observable<boolean>;

  private reviewsTranslationKey =
    'TabPanelContainer.tabs.ProductReviewsTabComponent';

  constructor(
    protected currentProductService: CurrentProductService,
    private translationService: TranslationService,
    protected winRef: WindowRef
  ) {
    this.areReviewsAvailable$ = this.verifyReviewsComponent();
  }

  ngAfterContentChecked(): void {
    this.tabComponent$.next(this.getTabsComponent());
  }

  /**
   * Scroll to views component on page and click "Reviews" tab
   */
  showReviews() {
    // Use translated label for Reviews tab reference
    this.translationService
      .translate(this.reviewsTranslationKey)
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
      })
      .unsubscribe();
  }

  /**
   * Create stream to observe whether reviews component is available.
   */
  protected verifyReviewsComponent(): Observable<boolean> {
    return this.tabComponent$.pipe(
      withLatestFrom(
        this.translationService.translate(this.reviewsTranslationKey)
      ),
      map(([tabs, label]) => {
        if (!tabs) {
          return false;
        }
        // find reviews tab
        const reviewsTab = this.getTabByLabel(label, tabs);
        // check whether next sibling (reviews container) of tab button contains reviews component
        // look for sibling as cx-product-reviews selector can be customized
        return !!reviewsTab?.nextSibling?.hasChildNodes();
      }),
      takeWhile((isReviewsComponentVisible) => !isReviewsComponentVisible, true)
    );
  }

  /**
   * Get Tabs Component if exists on page
   */
  private getTabsComponent(): HTMLElement | null {
    return this.winRef.document.querySelector('cx-tab-paragraph-container');
  }

  /**
   * Click to activate tab if not already active
   *
   * @param tab tab to click if needed
   */
  private clickTabIfInactive(tab: HTMLElement): void {
    if (
      !tab.classList.contains('active') ||
      tab.classList.contains('toggled')
    ) {
      tab.click();
    }
  }

  /**
   * Get Tab by label if exists on page
   *
   * @param label label of searched tab
   * @param tabsComponent component containing tabs
   */
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
