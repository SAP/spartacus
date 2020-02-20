import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaymentTypeAdapter } from '../../../checkout/connectors/payment-type/payment-type.adapter';
import { PAYMENT_TYPE_NORMALIZER } from '../../../checkout/connectors/payment-type/converters';
import { PaymentType } from '../../../model/cart.model';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

const ENDPOINT_PAYMENT_TYPES = 'paymenttypes';

@Injectable()
export class OccCheckoutPaymentTypeAdapter implements PaymentTypeAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  loadPaymentTypes(): Observable<PaymentType[]> {
    return this.http
      .get<Occ.PaymentTypeList>(
        this.occEndpoints.getEndpoint(ENDPOINT_PAYMENT_TYPES)
      )
      .pipe(
        map(paymentTypeList => paymentTypeList.paymentTypes),
        this.converter.pipeableMany(PAYMENT_TYPE_NORMALIZER)
      );
  }
}
