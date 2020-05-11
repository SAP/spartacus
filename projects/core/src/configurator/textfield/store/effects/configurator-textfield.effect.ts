import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { CartActions } from '../../../../cart/store/actions/';
import { CartModification } from '../../../../model/cart.model';
import { ConfiguratorTextfield } from '../../../../model/configurator-textfield.model';
import { GenericConfigurator } from '../../../../model/generic-configurator.model';
import { makeErrorSerializable } from '../../../../util/serialization-utils';
import { ConfiguratorTextfieldConnector } from '../../connectors/configurator-textfield.connector';
import {
  AddToCart,
  ADD_TO_CART,
  CreateConfiguration,
  CreateConfigurationFail,
  CreateConfigurationSuccess,
  CREATE_CONFIGURATION,
  ReadCartEntryConfiguration,
  ReadCartEntryConfigurationFail,
  ReadCartEntryConfigurationSuccess,
  READ_CART_ENTRY_CONFIGURATION,
  RemoveConfiguration,
  UpdateCartEntryConfiguration,
  UPDATE_CART_ENTRY_CONFIGURATION,
} from '../actions/configurator-textfield.action';

@Injectable()
export class ConfiguratorTextfieldEffects {
  @Effect()
  createConfiguration$: Observable<
    CreateConfiguration | CreateConfigurationSuccess | CreateConfigurationFail
  > = this.actions$.pipe(
    ofType(CREATE_CONFIGURATION),
    map((action: CreateConfiguration) => action.payload),
    mergeMap((payload) => {
      return this.configuratorTextfieldConnector
        .createConfiguration(payload.productCode, payload.owner)
        .pipe(
          switchMap((configuration: ConfiguratorTextfield.Configuration) => {
            return [new CreateConfigurationSuccess(configuration)];
          }),
          catchError((error) =>
            of(new CreateConfigurationFail(makeErrorSerializable(error)))
          )
        );
    })
  );

  @Effect()
  addToCartCartProcessIncrement$: Observable<
    CartActions.CartProcessesIncrement
  > = this.actions$.pipe(
    ofType(ADD_TO_CART),
    map((action: AddToCart) => action.payload),
    map(
      (payload: ConfiguratorTextfield.AddToCartParameters) =>
        new CartActions.CartProcessesIncrement(payload.cartId)
    )
  );

  @Effect()
  addToCart$: Observable<
    | RemoveConfiguration
    | CartActions.CartAddEntrySuccess
    | CartActions.CartAddEntryFail
  > = this.actions$.pipe(
    ofType(ADD_TO_CART),
    map((action: AddToCart) => action.payload),
    mergeMap((payload) => {
      return this.configuratorTextfieldConnector.addToCart(payload).pipe(
        switchMap((entry: CartModification) => {
          return [
            new RemoveConfiguration(payload),
            new CartActions.CartAddEntrySuccess({
              ...entry,
              userId: payload.userId,
              cartId: payload.cartId,
              productCode: payload.productCode,
              quantity: entry.quantity,
              deliveryModeChanged: entry.deliveryModeChanged,
              entry: entry.entry,
              quantityAdded: entry.quantityAdded,
              statusCode: entry.statusCode,
              statusMessage: entry.statusMessage,
            }),
          ];
        }),
        catchError((error) =>
          of(new CartActions.CartAddEntryFail(makeErrorSerializable(error)))
        )
      );
    })
  );

  @Effect()
  updateCartEntry$: Observable<
    | RemoveConfiguration
    | CartActions.CartUpdateEntrySuccess
    | CartActions.CartUpdateEntryFail
  > = this.actions$.pipe(
    ofType(UPDATE_CART_ENTRY_CONFIGURATION),
    map((action: UpdateCartEntryConfiguration) => action.payload),
    mergeMap((payload) => {
      return this.configuratorTextfieldConnector
        .updateConfigurationForCartEntry(payload)
        .pipe(
          switchMap((entry: CartModification) => {
            return [
              new RemoveConfiguration(payload),
              new CartActions.CartUpdateEntrySuccess({
                ...entry,
                userId: payload.userId,
                cartId: payload.cartId,
                entryNumber: payload.cartEntryNumber,
                quantity: entry.quantity,
              }),
            ];
          }),
          catchError((error) =>
            of(
              new CartActions.CartUpdateEntryFail(makeErrorSerializable(error))
            )
          )
        );
    })
  );

  @Effect()
  readConfigurationForCartEntry$: Observable<
    ReadCartEntryConfigurationSuccess | ReadCartEntryConfigurationFail
  > = this.actions$.pipe(
    ofType(READ_CART_ENTRY_CONFIGURATION),
    switchMap((action: ReadCartEntryConfiguration) => {
      const parameters: GenericConfigurator.ReadConfigurationFromCartEntryParameters =
        action.payload;

      return this.configuratorTextfieldConnector
        .readConfigurationForCartEntry(parameters)
        .pipe(
          switchMap((result: ConfiguratorTextfield.Configuration) => [
            new ReadCartEntryConfigurationSuccess(result),
          ]),
          catchError((error) => [
            new ReadCartEntryConfigurationFail(makeErrorSerializable(error)),
          ])
        );
    })
  );

  constructor(
    private actions$: Actions,
    private configuratorTextfieldConnector: ConfiguratorTextfieldConnector
  ) {}
}
