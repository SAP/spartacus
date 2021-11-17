import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CartActions, normalizeHttpError } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ConfiguratorTextfieldConnector } from '../../connectors/configurator-textfield.connector';
import { ConfiguratorTextfield } from '../../model/configurator-textfield.model';
import { ConfiguratorTextfieldActions } from '../actions/index';
@Injectable()
export class ConfiguratorTextfieldEffects {
  @Effect()
  createConfiguration$: Observable<
    | ConfiguratorTextfieldActions.CreateConfigurationSuccess
    | ConfiguratorTextfieldActions.CreateConfigurationFail
  > = this.actions$.pipe(
    ofType(ConfiguratorTextfieldActions.CREATE_CONFIGURATION),
    map(
      (action: ConfiguratorTextfieldActions.CreateConfiguration) =>
        action.payload
    ),
    switchMap((payload) => {
      return this.configuratorTextfieldConnector
        .createConfiguration(payload.productCode, payload.owner)
        .pipe(
          switchMap((configuration: ConfiguratorTextfield.Configuration) => {
            return [
              new ConfiguratorTextfieldActions.CreateConfigurationSuccess(
                configuration
              ),
            ];
          }),
          catchError((error) =>
            of(
              new ConfiguratorTextfieldActions.CreateConfigurationFail(
                normalizeHttpError(error)
              )
            )
          )
        );
    })
  );

  @Effect()
  addToCart$: Observable<
    | ConfiguratorTextfieldActions.RemoveConfiguration
    | ConfiguratorTextfieldActions.AddToCartFail
    | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(ConfiguratorTextfieldActions.ADD_TO_CART),
    map((action: ConfiguratorTextfieldActions.AddToCart) => action.payload),
    switchMap((payload) => {
      return this.configuratorTextfieldConnector.addToCart(payload).pipe(
        switchMap(() => {
          return [
            new ConfiguratorTextfieldActions.RemoveConfiguration(),
            new CartActions.LoadCart({
              cartId: payload.cartId,
              userId: payload.userId,
            }),
          ];
        }),
        catchError((error) =>
          of(
            new ConfiguratorTextfieldActions.AddToCartFail(
              normalizeHttpError(error)
            )
          )
        )
      );
    })
  );

  @Effect()
  updateCartEntry$: Observable<
    | ConfiguratorTextfieldActions.RemoveConfiguration
    | ConfiguratorTextfieldActions.UpdateCartEntryConfigurationFail
    | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(ConfiguratorTextfieldActions.UPDATE_CART_ENTRY_CONFIGURATION),
    map(
      (action: ConfiguratorTextfieldActions.UpdateCartEntryConfiguration) =>
        action.payload
    ),
    switchMap((payload) => {
      return this.configuratorTextfieldConnector
        .updateConfigurationForCartEntry(payload)
        .pipe(
          switchMap(() => {
            return [
              new ConfiguratorTextfieldActions.RemoveConfiguration(),
              new CartActions.LoadCart({
                cartId: payload.cartId,
                userId: payload.userId,
              }),
            ];
          }),
          catchError((error) =>
            of(
              new ConfiguratorTextfieldActions.UpdateCartEntryConfigurationFail(
                normalizeHttpError(error)
              )
            )
          )
        );
    })
  );

  @Effect()
  readConfigurationForCartEntry$: Observable<
    | ConfiguratorTextfieldActions.ReadCartEntryConfigurationSuccess
    | ConfiguratorTextfieldActions.ReadCartEntryConfigurationFail
  > = this.actions$.pipe(
    ofType(ConfiguratorTextfieldActions.READ_CART_ENTRY_CONFIGURATION),
    switchMap(
      (action: ConfiguratorTextfieldActions.ReadCartEntryConfiguration) => {
        const parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters =
          action.payload;

        return this.configuratorTextfieldConnector
          .readConfigurationForCartEntry(parameters)
          .pipe(
            switchMap((result: ConfiguratorTextfield.Configuration) => [
              new ConfiguratorTextfieldActions.ReadCartEntryConfigurationSuccess(
                result
              ),
            ]),
            catchError((error) => [
              new ConfiguratorTextfieldActions.ReadCartEntryConfigurationFail(
                normalizeHttpError(error)
              ),
            ])
          );
      }
    )
  );

  @Effect()
  readConfigurationForOrderEntry$: Observable<
    | ConfiguratorTextfieldActions.ReadOrderEntryConfigurationSuccess
    | ConfiguratorTextfieldActions.ReadOrderEntryConfigurationFail
  > = this.actions$.pipe(
    ofType(ConfiguratorTextfieldActions.READ_ORDER_ENTRY_CONFIGURATION),
    switchMap(
      (action: ConfiguratorTextfieldActions.ReadOrderEntryConfiguration) => {
        const parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters =
          action.payload;

        return this.configuratorTextfieldConnector
          .readConfigurationForOrderEntry(parameters)
          .pipe(
            switchMap((result: ConfiguratorTextfield.Configuration) => [
              new ConfiguratorTextfieldActions.ReadOrderEntryConfigurationSuccess(
                result
              ),
            ]),
            catchError((error) => [
              new ConfiguratorTextfieldActions.ReadOrderEntryConfigurationFail(
                normalizeHttpError(error)
              ),
            ])
          );
      }
    )
  );

  constructor(
    private actions$: Actions,
    private configuratorTextfieldConnector: ConfiguratorTextfieldConnector
  ) {}
}
