import { UserIdService } from '@spartacus/core';
import { QuoteConnector } from '../connectors';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap, take } from 'rxjs';
import { Quote } from '@spartacus/quote/root';

@Injectable()
export class CartAssociatedQuotePurchaseOrderNumberService {
  private userIdService: UserIdService = inject(UserIdService);
  private quoteConnector: QuoteConnector = inject(QuoteConnector);

  isPurchaseOrderNumberNonEditable(quoteCode: string): Observable<boolean> {
    return this.userIdService.takeUserId().pipe(
      take(1),
      switchMap((userId) =>
        this.quoteConnector
          .getQuote(userId, quoteCode)
          .pipe(map((quote: Quote) => !!quote.sapPurchaseOrderNumber))
      )
    );
  }
}
