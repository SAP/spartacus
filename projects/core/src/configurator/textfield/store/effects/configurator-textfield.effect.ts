import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ConfiguratorTextfield } from '../../../../model/configurator-textfield.model';
import { GenericConfigurator } from '../../../../model/generic-configurator.model';
import { makeErrorSerializable } from '../../../../util/serialization-utils';
import { ConfiguratorTextfieldConnector } from '../../connectors/configurator-textfield.connector';
import {
  AddToCart,
  AddToCartFail,
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
  UpdateCartEntryConfigurationFail,
  UPDATE_CART_ENTRY_CONFIGURATION,
} from '../actions/configurator-textfield.action';
import { CartActions } from './../../../../cart/store/actions';

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
  addToCart$: Observable<
    RemoveConfiguration | AddToCartFail | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(ADD_TO_CART),
    map((action: AddToCart) => action.payload),
    mergeMap((payload) => {
      return this.configuratorTextfieldConnector.addToCart(payload).pipe(
        switchMap(() => {
          return [
            new RemoveConfiguration(payload),
            new CartActions.LoadCart({
              cartId: payload.cartId,
              userId: payload.userId,
            }),
          ];
        }),
        catchError((error) =>
          of(new AddToCartFail(makeErrorSerializable(error)))
        )
      );
    })
  );

  @Effect()
  updateCartEntry$: Observable<
    | RemoveConfiguration
    | UpdateCartEntryConfigurationFail
    | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(UPDATE_CART_ENTRY_CONFIGURATION),
    map((action: UpdateCartEntryConfiguration) => action.payload),
    mergeMap((payload) => {
      return this.configuratorTextfieldConnector
        .updateConfigurationForCartEntry(payload)
        .pipe(
          switchMap(() => {
            return [
              new RemoveConfiguration(payload),
              new CartActions.LoadCart({
                cartId: payload.cartId,
                userId: payload.userId,
              }),
            ];
          }),
          catchError((error) =>
            of(
              new UpdateCartEntryConfigurationFail(makeErrorSerializable(error))
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
