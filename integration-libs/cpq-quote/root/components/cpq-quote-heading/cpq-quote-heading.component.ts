import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Inject,
} from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { TranslationService } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-cpq-quote-heading',
  templateUrl: './cpq-quote-heading.component.html',
})
export class CpqQuoteHeadingComponent implements OnInit, OnDestroy {
  @Input()
  quoteDiscountData: OrderEntry;
  protected subscription = new Subscription();
  discountLabel: string;

  constructor(
    // Inject OutletContextData dependency
    @Optional()
    @Inject(OutletContextData)
    protected outlet: OutletContextData,
    protected translationService: TranslationService
  ) {}

  // discountLabel: string = 'Discount Percentage';
  dataAvailable: boolean = false;

  ngOnInit(): void {
    this.subscription.add(
      this.translationService
        .translate('cpqQuoteHeading')
        .subscribe((translation: string) => {
          this.discountLabel = translation;
        })
    );

    if (this.outlet?.context$) {
      this.subscription.add(
        this.outlet.context$.subscribe((context) => {
          if (context && context.length > 0) {
            this.dataAvailable = context.some(
              (item: { cpqDiscounts: string | any[] }) =>
                item.cpqDiscounts && item.cpqDiscounts.length > 0
            );
          } else {
            this.dataAvailable = false;
          }
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
