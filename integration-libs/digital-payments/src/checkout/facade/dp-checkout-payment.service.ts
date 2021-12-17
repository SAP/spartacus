import { DpPaymentRequest } from '../models/dp-checkout.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PaymentDetails } from '@spartacus/core';
import { Command, CommandService, CommandStrategy } from '@spartacus/core';
import { Query, QueryService } from '@spartacus/core';
import { DigitalPaymentsAdapter } from '../adapters/digital-payments.adapter';
import { switchMap } from 'rxjs/operators';
import { UserIdService } from '@spartacus/core';
@Injectable({
  providedIn: 'root',
})
export class DpCheckoutPaymentService {
  constructor(
    protected dpAdapter: DigitalPaymentsAdapter,
    protected command: CommandService,
    protected query: QueryService,
    protected userIdService: UserIdService
  ) {}

  protected RequestUrlQuery: Query<DpPaymentRequest> = this.query.create(() =>
    this.userIdService
      .takeUserId()
      .pipe(switchMap((userId) => this.dpAdapter.createPaymentRequest(userId)))
  );

  getCardRegistrationDetails(): Observable<DpPaymentRequest | undefined> {
    return this.RequestUrlQuery.get();
  }

  protected createPaymentDetailsCommand: Command<
    {
      sessionId: string;
      signature: string;
    },
    PaymentDetails
  > = this.command.create(
    (payload) =>
      this.userIdService
        .takeUserId()
        .pipe(
          switchMap((userId) =>
            this.dpAdapter.createPaymentDetails(
              payload.sessionId,
              payload.signature,
              userId
            )
          )
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
