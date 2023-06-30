import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Card, OutletContextData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'cx-order-overview-delivery-date',
  templateUrl: './order-overview-delivery-date.component.html',
})
export class OrderOverviewDeliveryDateComponent implements OnInit, OnDestroy {
  constructor(
    protected translation: TranslationService,
    @Optional() protected orderOutlet?: OutletContextData<any>
  ) {}

  protected subscription = new Subscription();
  order: Order;

  ngOnInit(): void {
    if (this.orderOutlet?.context$) {
      this.subscription.add(
        this.orderOutlet.context$.subscribe(
          (context) => (this.order = context?.item)
        )
      );
    }
  }

  getRequestedDeliveryDateCardContent(
    isoDate: string | null
  ): Observable<Card> {
    return this.translation
      .translate('requestedDeliveryDate.readOnlyTextLabel')
      .pipe(
        filter(() => Boolean(isoDate)),
        map((textTitle) => {
          return {
            title: textTitle,
            text: [isoDate],
          } as Card;
        })
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
