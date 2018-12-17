import { Injectable } from '@angular/core';

import * as fromActions from './../actions';
import * as fromUserActions from '@spartacus/core';

import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';

import { OccCartService } from '../../../occ/cart/cart.service';
import {
  ProductImageConverterService,
  OccOrderService,
  OrderEntry,
  PaymentDetails,
  GlobalMessageType,
  AddMessage
} from '@spartacus/core';

@Injectable()
export class CheckoutEffects {
  @Effect()
  addDeliveryAddress$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.ADD_DELIVERY_ADDRESS),
    map((action: fromActions.AddDeliveryAddress) => action.payload),
    mergeMap(payload =>
      this.occCartService
        .createAddressOnCart(payload.userId, payload.cartId, payload.address)
        .pipe(
          mergeMap(address => {
            address['titleCode'] = payload.address.titleCode;
            return [
              new fromUserActions.LoadUserAddresses(payload.userId),
              new fromActions.SetDeliveryAddress({
                userId: payload.userId,
                cartId: payload.cartId,
                address: address
              })
            ];
          }),
          catchError(error => of(new fromActions.AddDeliveryAddressFail(error)))
        )
    )
  );

  @Effect()
  setDeliveryAddress$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.SET_DELIVERY_ADDRESS),
    map((action: any) => action.payload),
    mergeMap(payload => {
      return this.occCartService
        .setDeliveryAddress(payload.userId, payload.cartId, payload.address.id)
        .pipe(
          map(() => new fromActions.SetDeliveryAddressSuccess(payload.address)),
          catchError(error => of(new fromActions.SetDeliveryAddressFail(error)))
        );
    })
  );

  @Effect()
  loadSupportedDeliveryModes$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_SUPPORTED_DELIVERY_MODES),
    map((action: any) => action.payload),
    mergeMap(payload => {
      return this.occCartService
        .getSupportedDeliveryModes(payload.userId, payload.cartId)
        .pipe(
          map(data => {
            return new fromActions.LoadSupportedDeliveryModesSuccess(data);
          }),
          catchError(error =>
            of(new fromActions.LoadSupportedDeliveryModesFail(error))
          )
        );
    })
  );

  @Effect()
  setDeliveryMode$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.SET_DELIVERY_MODE),
    map((action: any) => action.payload),
    mergeMap(payload => {
      return this.occCartService
        .setDeliveryMode(payload.userId, payload.cartId, payload.selectedModeId)
        .pipe(
          map(
            () => new fromActions.SetDeliveryModeSuccess(payload.selectedModeId)
          ),
          catchError(error => of(new fromActions.SetDeliveryModeFail(error)))
        );
    })
  );

  @Effect()
  createPaymentDetails$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.CREATE_PAYMENT_DETAILS),
    map((action: any) => action.payload),
    mergeMap(payload => {
      // get information for creating a subscription directly with payment provider
      return this.occCartService
        .getPaymentProviderSubInfo(payload.userId, payload.cartId)
        .pipe(
          map(data => {
            const labelsMap = this.convertToMap(data.mappingLabels.entry);
            return {
              url: data.postUrl,
              parameters: this.getParamsForPaymentProvider(
                payload.paymentDetails,
                data.parameters.entry,
                labelsMap
              ),
              mappingLabels: labelsMap
            };
          }),
          mergeMap(sub => {
            // create a subscription directly with payment provider
            return this.occCartService
              .createSubWithPaymentProvider(sub.url, sub.parameters)
              .pipe(
                map(response => this.extractPaymentDetailsFromHtml(response)),
                mergeMap(fromPaymentProvider => {
                  if (!fromPaymentProvider['hasError']) {
                    // consume response from payment provider and creates payment details

                    return this.occCartService
                      .createPaymentDetails(
                        payload.userId,
                        payload.cartId,
                        this.getPaymentSopResponseParams(
                          payload.paymentDetails,
                          fromPaymentProvider,
                          sub.mappingLabels
                        )
                      )
                      .pipe(
                        mergeMap(details => {
                          return [
                            new fromUserActions.LoadUserPaymentMethods(
                              payload.userId
                            ),
                            new fromActions.CreatePaymentDetailsSuccess(details)
                          ];
                        }),
                        catchError(error =>
                          of(new fromActions.CreatePaymentDetailsFail(error))
                        )
                      );
                  } else {
                    return of(
                      new fromActions.CreatePaymentDetailsFail(
                        fromPaymentProvider
                      )
                    );
                  }
                })
              );
          })
        );
    })
  );

  @Effect()
  setPaymentDetails$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.SET_PAYMENT_DETAILS),
    map((action: any) => action.payload),
    mergeMap(payload => {
      return this.occCartService
        .setPaymentDetails(
          payload.userId,
          payload.cartId,
          payload.paymentDetails.id
        )
        .pipe(
          map(
            () =>
              new fromActions.SetPaymentDetailsSuccess(payload.paymentDetails)
          ),
          catchError(error => of(new fromActions.SetPaymentDetailsFail(error)))
        );
    })
  );

  @Effect()
  placeOrder$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.PLACE_ORDER),
    map((action: any) => action.payload),
    mergeMap(payload => {
      return this.occOrderService
        .placeOrder(payload.userId, payload.cartId)
        .pipe(
          map(data => {
            for (const entry of data.entries as OrderEntry[]) {
              this.productImageConverter.convertProduct(entry.product);
            }
            return data;
          }),
          switchMap(data => [
            new fromActions.PlaceOrderSuccess(data),
            new AddMessage({
              text: 'Order placed successfully',
              type: GlobalMessageType.MSG_TYPE_CONFIRMATION
            })
          ]),
          catchError(error => of(new fromActions.PlaceOrderFail(error)))
        );
    })
  );

  private domparser: DOMParser;

  constructor(
    private actions$: Actions,
    private occCartService: OccCartService,
    private occOrderService: OccOrderService,
    private productImageConverter: ProductImageConverterService
  ) {
    this.domparser = new DOMParser();
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
      // tslint:disable-next-line:max-line-length
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
