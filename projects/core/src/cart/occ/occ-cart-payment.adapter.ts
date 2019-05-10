import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CustomEncoder } from './custom.encoder';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { CartPaymentAdapter } from '../connectors/payment/cart-payment.adapter';
import { ConverterService } from '../../util/converter.service';
import {
  CART_PAYMENT_DETAILS_NORMALIZER,
  CART_PAYMENT_DETAILS_SERIALIZER,
} from '../connectors/payment/converters';
import { PaymentDetails } from '../../model/cart.model';

@Injectable()
export class OccCartPaymentAdapter implements CartPaymentAdapter {
  constructor(
    protected http: HttpClient,
    private occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {
    if (typeof DOMParser !== 'undefined') {
      this.domparser = new DOMParser();
    }
  }

  private domparser: DOMParser;

  protected getCartEndpoint(userId: string): string {
    const cartEndpoint = 'users/' + userId + '/carts/';
    return this.occEndpoints.getEndpoint(cartEndpoint);
  }

  public create(
    userId: string,
    cartId: string,
    paymentDetails: PaymentDetails
  ): Observable<PaymentDetails> {
    paymentDetails = this.converter.convert(
      paymentDetails,
      CART_PAYMENT_DETAILS_SERIALIZER
    );
    return this.getProviderSubInfo(userId, cartId).pipe(
      map(data => {
        const labelsMap = this.convertToMap(data.mappingLabels.entry);
        return {
          url: data.postUrl,
          parameters: this.getParamsForPaymentProvider(
            paymentDetails,
            data.parameters.entry,
            labelsMap
          ),
          mappingLabels: labelsMap,
        };
      }),
      mergeMap(sub => {
        // create a subscription directly with payment provider
        return this.createSubWithProvider(sub.url, sub.parameters).pipe(
          map(response => this.extractPaymentDetailsFromHtml(response)),
          mergeMap(fromPaymentProvider => {
            if (!fromPaymentProvider['hasError']) {
              // consume response from payment provider and creates payment details

              return this.createDetailsWithParameters(
                userId,
                cartId,
                this.getPaymentSopResponseParams(
                  paymentDetails,
                  fromPaymentProvider,
                  sub.mappingLabels
                )
              ).pipe(this.converter.pipeable(CART_PAYMENT_DETAILS_NORMALIZER));
            } else {
              return throwError(fromPaymentProvider);
            }
          })
        );
      })
    );
  }

  public set(
    userId: string,
    cartId: string,
    paymentDetailsId: string
  ): Observable<any> {
    return this.http
      .put(
        this.getCartEndpoint(userId) + cartId + '/paymentdetails',
        {},
        {
          params: { paymentDetailsId: paymentDetailsId },
        }
      )
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected getProviderSubInfo(
    userId: string,
    cartId: string
  ): Observable<any> {
    return this.http
      .get(
        this.getCartEndpoint(userId) +
          cartId +
          '/payment/sop/request?responseUrl=sampleUrl'
      )
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  private createSubWithProvider(
    postUrl: string,
    parameters: any
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'text/html',
    });
    let httpParams = new HttpParams({ encoder: new CustomEncoder() });
    Object.keys(parameters).forEach(key => {
      httpParams = httpParams.append(key, parameters[key]);
    });

    return this.http.post(postUrl, httpParams, {
      headers,
      responseType: 'text',
    });
  }

  protected createDetailsWithParameters(
    userId: string,
    cartId: string,
    parameters: any
  ): Observable<PaymentDetails> {
    let httpParams = new HttpParams({ encoder: new CustomEncoder() });
    Object.keys(parameters).forEach(key => {
      httpParams = httpParams.append(key, parameters[key]);
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post<PaymentDetails>(
        this.getCartEndpoint(userId) + cartId + '/payment/sop/response',
        httpParams,
        { headers }
      )
      .pipe(catchError((error: any) => throwError(error)));
  }

  private getPaymentSopResponseParams(
    paymentDetails: any,
    fromPaymentProvider: any,
    mappingLabels: any
  ) {
    const sopResponseParams = {};

    sopResponseParams['decision'] =
      fromPaymentProvider[mappingLabels['hybris_sop_decision']];
    sopResponseParams['amount'] =
      fromPaymentProvider[mappingLabels['hybris_sop_amount']];
    sopResponseParams['currency'] =
      fromPaymentProvider[mappingLabels['hybris_sop_currency']];

    sopResponseParams['billTo_country'] =
      fromPaymentProvider[mappingLabels['hybris_billTo_country']];
    sopResponseParams['billTo_firstName'] =
      fromPaymentProvider[mappingLabels['hybris_billTo_firstname']];
    sopResponseParams['billTo_lastName'] =
      fromPaymentProvider[mappingLabels['hybris_billTo_lastname']];
    sopResponseParams['billTo_street1'] =
      fromPaymentProvider[mappingLabels['hybris_billTo_street1']];
    sopResponseParams['billTo_city'] =
      fromPaymentProvider[mappingLabels['hybris_billTo_city']];
    sopResponseParams['billTo_postalCode'] =
      fromPaymentProvider[mappingLabels['hybris_billTo_postalcode']];

    sopResponseParams['card_cardType'] = paymentDetails.cardType.code;
    sopResponseParams['card_accountNumber'] =
      fromPaymentProvider[mappingLabels['hybris_sop_card_number']];
    sopResponseParams['card_expirationMonth'] = paymentDetails.expiryMonth;
    sopResponseParams['card_expirationYear'] = paymentDetails.expiryYear;
    sopResponseParams['card_nameOnCard'] = paymentDetails.accountHolderName;
    sopResponseParams['defaultPayment'] = paymentDetails.defaultPayment;
    sopResponseParams['savePaymentInfo'] = true;

    sopResponseParams['reasonCode'] =
      fromPaymentProvider[mappingLabels['hybris_sop_reason_code']];
    sopResponseParams['paySubscriptionCreateReply_subscriptionID'] =
      fromPaymentProvider[mappingLabels['hybris_sop_subscriptionID']];

    if (mappingLabels['hybris_sop_uses_public_signature'] === 'true') {
      sopResponseParams[
        'paySubscriptionCreateReply_subscriptionIDPublicSignature'
      ] = fromPaymentProvider[mappingLabels['hybris_sop_public_signature']];
    }

    return sopResponseParams;
  }

  private getParamsForPaymentProvider(
    paymentDetails: PaymentDetails,
    parameters: { key; value }[],
    mappingLabels: any
  ) {
    const params = this.convertToMap(parameters);
    params[mappingLabels['hybris_account_holder_name']] =
      paymentDetails.accountHolderName;
    params[mappingLabels['hybris_card_type']] = paymentDetails.cardType.code;
    params[mappingLabels['hybris_card_number']] = paymentDetails.cardNumber;
    if (mappingLabels['hybris_combined_expiry_date'] === 'true') {
      params[mappingLabels['hybris_card_expiry_date']] =
        paymentDetails.expiryMonth +
        mappingLabels['hybris_separator_expiry_date'] +
        paymentDetails.expiryYear;
    } else {
      params[mappingLabels['hybris_card_expiration_month']] =
        paymentDetails.expiryMonth;
      params[mappingLabels['hybris_card_expiration_year']] =
        paymentDetails.expiryYear;
    }
    params[mappingLabels['hybris_card_cvn']] = paymentDetails.cvn;

    // billing address
    params[mappingLabels['hybris_billTo_country']] =
      paymentDetails.billingAddress.country.isocode;
    params[mappingLabels['hybris_billTo_firstname']] =
      paymentDetails.billingAddress.firstName;
    params[mappingLabels['hybris_billTo_lastname']] =
      paymentDetails.billingAddress.lastName;
    params[mappingLabels['hybris_billTo_street1']] =
      paymentDetails.billingAddress.line1 +
      ' ' +
      paymentDetails.billingAddress.line2;
    params[mappingLabels['hybris_billTo_city']] =
      paymentDetails.billingAddress.town;
    params[mappingLabels['hybris_billTo_postalcode']] =
      paymentDetails.billingAddress.postalCode;
    return params;
  }

  private extractPaymentDetailsFromHtml(html: string): any {
    const domdoc = this.domparser.parseFromString(html, 'text/xml');
    const responseForm = domdoc.getElementsByTagName('form')[0];
    const inputs = responseForm.getElementsByTagName('input');

    const values = {};
    for (let i = 0; inputs[i]; i++) {
      const input = inputs[i];
      if (
        input.getAttribute('name') !== '{}' &&
        input.getAttribute('value') !== ''
      ) {
        values[input.getAttribute('name')] = input.getAttribute('value');
      }
    }

    // rejected for some reason
    if (values['decision'] !== 'ACCEPT') {
      const reason = { hasError: true };
      Object.keys(values).forEach(name => {
        if (name === 'reasonCode' || name.startsWith('InvalidField')) {
          reason[name] = values[name];
        }
      });
      return reason;
    }

    return values;
  }

  private convertToMap(paramList: { key; value }[]) {
    return paramList.reduce(function(result, item) {
      const key = item.key;
      result[key] = item.value;
      return result;
    }, {});
  }
}
