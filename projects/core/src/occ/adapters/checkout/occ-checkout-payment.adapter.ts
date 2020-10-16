import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { CheckoutPaymentAdapter } from '../../../checkout/connectors/payment/checkout-payment.adapter';
import {
  CARD_TYPE_NORMALIZER,
  PAYMENT_DETAILS_NORMALIZER,
  PAYMENT_DETAILS_SERIALIZER,
} from '../../../checkout/connectors/payment/converters';
import { CardType, PaymentDetails } from '../../../model/cart.model';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { HttpParamsURIEncoder } from '../../../util/http-params-uri.encoder';

const ENDPOINT_CARD_TYPES = 'cardtypes';

@Injectable()
export class OccCheckoutPaymentAdapter implements CheckoutPaymentAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
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
      PAYMENT_DETAILS_SERIALIZER
    );
    return this.getProviderSubInfo(userId, cartId).pipe(
      map((data) => {
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
      mergeMap((sub) => {
        // create a subscription directly with payment provider
        return this.createSubWithProvider(sub.url, sub.parameters).pipe(
          map((response) => this.extractPaymentDetailsFromHtml(response)),
          mergeMap((fromPaymentProvider) => {
            fromPaymentProvider['defaultPayment'] =
              paymentDetails.defaultPayment;
            fromPaymentProvider['savePaymentInfo'] = true;
            return this.createDetailsWithParameters(
              userId,
              cartId,
              fromPaymentProvider
            ).pipe(this.converter.pipeable(PAYMENT_DETAILS_NORMALIZER));
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
    return this.http.put(
      this.getCartEndpoint(userId) + cartId + '/paymentdetails',
      {},
      {
        params: { paymentDetailsId: paymentDetailsId },
      }
    );
  }

  loadCardTypes(): Observable<CardType[]> {
    return this.http
      .get<Occ.CardTypeList>(this.occEndpoints.getEndpoint(ENDPOINT_CARD_TYPES))
      .pipe(
        map((cardTypeList) => cardTypeList.cardTypes),
        this.converter.pipeableMany(CARD_TYPE_NORMALIZER)
      );
  }

  protected getProviderSubInfo(
    userId: string,
    cartId: string
  ): Observable<any> {
    return this.http.get(
      this.getCartEndpoint(userId) +
        cartId +
        '/payment/sop/request?responseUrl=sampleUrl'
    );
  }

  protected createSubWithProvider(
    postUrl: string,
    parameters: any
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'text/html',
    });
    let httpParams = new HttpParams({ encoder: new HttpParamsURIEncoder() });
    Object.keys(parameters).forEach((key) => {
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
    let httpParams = new HttpParams({ encoder: new HttpParamsURIEncoder() });
    Object.keys(parameters).forEach((key) => {
      httpParams = httpParams.append(key, parameters[key]);
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<PaymentDetails>(
      this.getCartEndpoint(userId) + cartId + '/payment/sop/response',
      httpParams,
      { headers }
    );
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
    if (paymentDetails.billingAddress.region) {
      params[mappingLabels['hybris_billTo_region']] =
        paymentDetails.billingAddress.region.isocodeShort;
    } else {
      params[mappingLabels['hybris_billTo_region']] = '';
    }
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

    return values;
  }

  private convertToMap(paramList: { key; value }[]) {
    return paramList.reduce(function (result, item) {
      const key = item.key;
      result[key] = item.value;
      return result;
    }, {});
  }
}
