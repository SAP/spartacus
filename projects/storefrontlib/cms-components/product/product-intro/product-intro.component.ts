import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product, TranslationService, WindowRef } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../current-product.service';

@Component({
  selector: 'cx-product-intro',
  templateUrl: './product-intro.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductIntroComponent {
  product$: Observable<Product> = this.currentProductService.getProduct();

  constructor(
    protected currentProductService: CurrentProductService,
    private translationService: TranslationService,
    protected winRef: WindowRef
  ) {}

  // Scroll to views component on page and click "Reviews" tab
  showReviews() {
    // Use translated label for Reviews tab reference
    this.translationService
      .translate('TabPanelContainer.tabs.ProductReviewsTabComponent')
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
