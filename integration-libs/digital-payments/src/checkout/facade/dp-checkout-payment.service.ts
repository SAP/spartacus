import { map } from 'rxjs/operators';
import { DpPaymentRequest } from '../models/dp-checkout.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PaymentDetails } from '@spartacus/core';
import { Command, CommandService, CommandStrategy } from '@spartacus/core';
import { Query, QueryService } from '@spartacus/core';
import { DigitalPaymentsAdapter } from '../adapters/digital-payments.adapter';

@Injectable({
  providedIn: 'root',
})
export class DpCheckoutPaymentService {
  constructor(
    protected dpAdapter: DigitalPaymentsAdapter,
    protected command: CommandService,
    protected query: QueryService
  ) {}

  protected RequestUrlQuery: Query<DpPaymentRequest> = this.query.create(() =>
    this.dpAdapter.createPaymentRequest().pipe(
      map((payload: DpPaymentRequest) => {
        return payload;
      })
    )
  );

  getCardRegistrationDetails(): Observable<DpPaymentRequest | undefined> {
    var req = this.RequestUrlQuery.get();
    return req;
  }

  protected createPaymentDetailsCommand: Command<
    {
      sessionId: string;
      signature: string;
    },
    PaymentDetails
  > = this.command.create(
    (payload) =>
      this.dpAdapter
        .createPaymentDetails(payload.sessionId, payload.signature)
        .pipe(
          map((payload: PaymentDetails) => {
            return payload;
          })
        ),
    {
      strategy: CommandStrategy.Queue,
    }
  );
  createPaymentDetails(
    sessionId: string,
    signature: string
  ): Observable<PaymentDetails> {
    return this.createPaymentDetailsCommand.execute({ sessionId, signature });
  }
}
