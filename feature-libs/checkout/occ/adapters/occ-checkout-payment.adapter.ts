import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CARD_TYPE_NORMALIZER,
  CheckoutPaymentAdapter,
  PAYMENT_DETAILS_SERIALIZER,
} from '@spartacus/checkout/core';
import {
  CardType,
  ConverterService,
  HttpParamsURIEncoder,
  Occ,
  OccEndpointsService,
  PaymentDetails,
  PAYMENT_DETAILS_NORMALIZER,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

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

  protected getSetPaymentDetailsEndpoint(
    userId: string,
    cartId: string,
    paymentDetailsId: string
  ): string {
    return this.occEndpoints.buildUrl('setCartPaymentDetails', {
      urlParams: { userId, cartId },
      queryParams: { paymentDetailsId },
    });
  }

  protected getPaymentProviderSubInfoEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpoints.buildUrl('paymentProviderSubInfo', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }

  protected getCreatePaymentDetailsEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpoints.buildUrl('createPaymentDetails', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }

  protected getCardTypesEndpoint(): string {
    return this.occEndpoints.buildUrl('cardTypes');
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
        const labelsMap = this.convertToMap(data.mappingLabels.entry) as {
          [key: string]: string;
        };
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
              paymentDetails.defaultPayment ?? false;
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
      this.getSetPaymentDetailsEndpoint(userId, cartId, paymentDetailsId),
      {}
    );
  }

  loadCardTypes(): Observable<CardType[]> {
    return this.http.get<Occ.CardTypeList>(this.getCardTypesEndpoint()).pipe(
      map((cardTypeList) => cardTypeList.cardTypes ?? []),
      this.converter.pipeableMany(CARD_TYPE_NORMALIZER)
    );
  }

  protected getProviderSubInfo(
    userId: string,
    cartId: string
  ): Observable<any> {
    return this.http.get(
      this.getPaymentProviderSubInfoEndpoint(userId, cartId)
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
      this.getCreatePaymentDetailsEndpoint(userId, cartId),
      httpParams,
      { headers }
    );
  }

  private getParamsForPaymentProvider(
    paymentDetails: PaymentDetails,
    parameters: { key: string; value: string }[],
    mappingLabels: { [key: string]: string }
  ) {
    const params = this.convertToMap(parameters);
    params[mappingLabels['hybris_account_holder_name']] =
      paymentDetails.accountHolderName;
    params[mappingLabels['hybris_card_type']] = paymentDetails.cardType?.code;
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
      paymentDetails.billingAddress?.country?.isocode;
    params[mappingLabels['hybris_billTo_firstname']] =
      paymentDetails.billingAddress?.firstName;
    params[mappingLabels['hybris_billTo_lastname']] =
      paymentDetails.billingAddress?.lastName;
    params[mappingLabels['hybris_billTo_street1']] =
      paymentDetails.billingAddress?.line1 +
      ' ' +
      paymentDetails.billingAddress?.line2;
    params[mappingLabels['hybris_billTo_city']] =
      paymentDetails.billingAddress?.town;
    if (paymentDetails.billingAddress?.region) {
      params[mappingLabels['hybris_billTo_region']] =
        paymentDetails.billingAddress.region.isocodeShort;
    } else {
      params[mappingLabels['hybris_billTo_region']] = '';
    }
    params[mappingLabels['hybris_billTo_postalcode']] =
      paymentDetails.billingAddress?.postalCode;
    return params;
  }

  private extractPaymentDetailsFromHtml(html: string): {
    [key: string]: string | boolean;
  } {
    const domdoc = this.domparser.parseFromString(html, 'text/xml');
    const responseForm = domdoc.getElementsByTagName('form')[0];
    const inputs = responseForm.getElementsByTagName('input');

    const values: { [key: string]: string | boolean } = {};
    for (let i = 0; inputs[i]; i++) {
      const input = inputs[i];
      const name = input.getAttribute('name');
      const value = input.getAttribute('value');
      if (name && name !== '{}' && value && value !== '') {
        values[name] = value;
      }
    }

    return values;
  }

  private convertToMap(paramList: { key: string; value: string }[]): {
    [key: string]: string | undefined;
  } {
    return paramList.reduce(function (
      result: { [key: string]: string | undefined },
      item
    ) {
      const key = item.key;
      result[key] = item.value;
      return result;
    },
    {});
  }
}
