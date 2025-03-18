import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Card, ICON_TYPE } from '@spartacus/storefront';
import { map, filter } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';
import { TranslationService } from '@spartacus/core';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { CheckoutStepType } from '@spartacus/checkout/base/root';

@Component({
  selector: 'cx-opf-b2b-checkout-purchase-order-number',
  templateUrl: './opf-b2b-checkout-purchase-order-number.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OpfB2bCheckoutPurchaseOrderNumberComponent {
  protected checkoutPaymentTypeFacade = inject(CheckoutPaymentTypeFacade);
  protected translationService = inject(TranslationService);
  protected checkoutStepService = inject(CheckoutStepService);

  checkoutStepTypePaymentType = CheckoutStepType.PAYMENT_TYPE;
  iconTypes = ICON_TYPE;

  get poNumber$(): Observable<string | undefined> {
    return this.checkoutPaymentTypeFacade.getPurchaseOrderNumberState().pipe(
      filter((state) => !state.loading && !state.error),
      map((state) => state.data)
    );
  }

  getPoNumberCard(poNumber?: string | null): Observable<Card> {
    return combineLatest([
      this.translationService.translate('checkoutB2B.review.poNumber'),
      this.translationService.translate('checkoutB2B.noPoNumber'),
    ]).pipe(
      map(([textTitle, noneTextTitle]) => {
        return {
          title: textTitle,
          textBold: poNumber ? poNumber : noneTextTitle,
        };
      })
    );
  }

  getCheckoutStepUrl(stepType: CheckoutStepType | string): string | undefined {
    const step = this.checkoutStepService.getCheckoutStep(
      stepType as CheckoutStepType
    );
    return step?.routeName;
  }
}
