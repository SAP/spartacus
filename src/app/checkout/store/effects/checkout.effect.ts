import { Injectable } from '@angular/core';

import * as fromActions from './../actions';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { map, catchError, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { OccCartService } from '../../../occ/cart/cart.service';
import { OccOrderService } from '../../../occ/order/order.service';

@Injectable()
export class CheckoutEffects {
  @Effect()
  addDeliveryAddress$: Observable<any> = this.actions$
    .ofType(fromActions.ADD_DELIVERY_ADDRESS)
    .pipe(
      map((action: fromActions.AddDeliveryAddress) => action.payload),
      mergeMap(payload =>
        this.occCartService
          .createAddressOnCart(payload.userId, payload.cartId, payload.address)
          .pipe(
            tap(address => {
              return new fromActions.SetDeliveryAddress({
                userId: payload.userId,
                cartId: payload.cartId,
                address: address
              });
            }),
            map(address => {
              address['titleCode'] = payload.address.titleCode;
              return new fromActions.AddDeliveryAddressSuccess(address);
            }),
            catchError(error =>
              of(new fromActions.AddDeliveryAddressFail(error))
            )
          )
      )
    );

  @Effect()
  loadSupportedDeliveryModes$: Observable<any> = this.actions$
    .ofType(fromActions.LOAD_SUPPORTED_DELIVERY_MODES)
    .pipe(
      map((action: any) => action.payload),
      mergeMap(payload => {
        return this.occCartService
          .getSupportedDeliveryModes(payload.userId, payload.cartId)
          .pipe(
            map(
              data => new fromActions.LoadSupportedDeliveryModesSuccess(data)
            ),
            catchError(error =>
              of(new fromActions.LoadSupportedDeliveryModesFail(error))
            )
          );
      })
    );

  @Effect()
  setDeliveryAddress$: Observable<any> = this.actions$
    .ofType(fromActions.SET_DELIVERY_ADDRESS)
    .pipe(
      map((action: any) => action.payload),
      mergeMap(payload => {
        return this.occCartService
          .setDeliveryAddress(
            payload.userId,
            payload.cartId,
            payload.address.id
          )
          .pipe(
            map(
              () => new fromActions.SetDeliveryAddressSuccess(payload.address)
            ),
            catchError(error =>
              of(new fromActions.SetDeliveryAddressFail(error))
            )
          );
      })
    );

  @Effect()
  setDeliveryMode$: Observable<any> = this.actions$
    .ofType(fromActions.SET_DELIVERY_MODE)
    .pipe(
      map((action: any) => action.payload),
      mergeMap(payload => {
        return this.occCartService
          .setDeliveryMode(
            payload.userId,
            payload.cartId,
            payload.selectedModeId
          )
          .pipe(
            map(
              () =>
                new fromActions.SetDeliveryModeSuccess(payload.selectedModeId)
            ),
            catchError(error => of(new fromActions.SetDeliveryModeFail(error)))
          );
      })
    );

  @Effect()
  createPaymentDetails$: Observable<any> = this.actions$
    .ofType(fromActions.CREATE_PAYMENT_DETAILS)
    .pipe(
      map((action: any) => action.payload),
      mergeMap(payload => {
        // get information for creating a subscription directly with payment provider
        return this.occCartService
          .getPaymentProviderSubInfo(payload.userId, payload.cartId)
          .pipe(
            map(data => {
              return {
                url: data.postUrl,
                parameters: this.getParamsForPaymentProvider(
                  payload.paymentDetails
                )
              };
            }),
            mergeMap(sub =>
              // create a subscription directly with payment provider
              this.occCartService
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
                          fromPaymentProvider
                        )
                        .pipe(
                          map(
                            details =>
                              new fromActions.CreatePaymentDetailsSuccess(
                                details
                              )
                          ),
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
                )
            )
          );
      })
    );

  @Effect()
  placeOrder$: Observable<any> = this.actions$
    .ofType(fromActions.PLACE_ORDER)
    .pipe(
      map((action: any) => action.payload),
      mergeMap(payload => {
        return this.occOrderService
          .placeOrder(payload.userId, payload.cartId)
          .pipe(
            map(data => new fromActions.PlaceOrderSuccess(data)),
            catchError(error => of(new fromActions.PlaceOrderFail(error)))
          );
      })
    );

  private domparser: DOMParser;
  private cardTypes = {
    visa: '001',
    master: '002',
    amex: '003',
    discover: '004',
    diners: '005',
    jcb: '007',
    maestro: '024',
    SWITCH: 'switch'
  };

  constructor(
    private actions$: Actions,
    private occCartService: OccCartService,
    private occOrderService: OccOrderService
  ) {
    this.domparser = new DOMParser();
  }

  private getParamsForPaymentProvider(paymentDetails: any) {
    return {
      card_cardType: this.cardTypes[paymentDetails.cardType.code],
      card_accountNumber: paymentDetails.cardNumber,
      card_expirationMonth: paymentDetails.expiryMonth,
      card_expirationYear: paymentDetails.expiryYear,
      card_cvNumber: paymentDetails.cvn,
      billTo_firstName: paymentDetails.billingAddress.firstName,
      billTo_lastName: paymentDetails.billingAddress.lastName,
      billTo_street1: paymentDetails.billingAddress.line1,
      billTo_street2: paymentDetails.billingAddress.line2,
      billTo_city: paymentDetails.billingAddress.town,
      billTo_state: paymentDetails.billingAddress.region.isocode.substr(
        paymentDetails.billingAddress.region.isocode.indexOf('-') + 1
      ),
      billTo_country: paymentDetails.billingAddress.country.isocode,
      billTo_postalCode: paymentDetails.billingAddress.postalCode
    };
  }

  private extractPaymentDetailsFromHtml(html: string): any {
    const domdoc = this.domparser.parseFromString(html, 'text/xml');
    const postFormItems = domdoc.getElementById('postFormItems');
    const inputs = postFormItems.getElementsByTagName('input');

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
}
