import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {
  CartActions,
  CartModification,
  Configurator,
  ConfiguratorCommonsConnector,
  GenericConfigurator,
  GenericConfiguratorUtilsService,
  normalizeHttpError,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { ConfiguratorUtilsService } from '../../facade/utils/configurator-utils.service';
import { ConfiguratorActions } from '../actions/index';
import { StateWithConfigurator } from '../configurator-state';
import { ConfiguratorSelectors } from '../selectors/index';

@Injectable()
/**
 * Common configurator effects related to cart handling
 */
export class ConfiguratorCartEffects {
  @Effect()
  addToCart$: Observable<
    | ConfiguratorActions.AddNextOwner
    | CartActions.CartAddEntrySuccess
    | CartActions.CartAddEntryFail
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.ADD_TO_CART),
    map((action: ConfiguratorActions.AddToCart) => action.payload),
    switchMap((payload: Configurator.AddToCartParameters) => {
      return this.configuratorCommonsConnector.addToCart(payload).pipe(
        switchMap((entry: CartModification) => {
          return [
            new ConfiguratorActions.AddNextOwner({
              ownerKey: payload.ownerKey,
              cartEntryNo: '' + entry.entry.entryNumber,
            }),
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
          of(
            new CartActions.CartAddEntryFail({
              userId: payload.userId,
              cartId: payload.cartId,
              productCode: payload.productCode,
              quantity: payload.quantity,
              error: normalizeHttpError(error),
            })
          )
        )
      );
    })
  );

  @Effect()
  updateCartEntry$: Observable<
    CartActions.CartUpdateEntrySuccess | CartActions.CartUpdateEntryFail
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.UPDATE_CART_ENTRY),
    map((action: ConfiguratorActions.UpdateCartEntry) => action.payload),
    switchMap(
      (payload: Configurator.UpdateConfigurationForCartEntryParameters) => {
        return this.configuratorCommonsConnector
          .updateConfigurationForCartEntry(payload)
          .pipe(
            switchMap((entry: CartModification) => {
              return [
                new CartActions.CartUpdateEntrySuccess({
                  ...entry,
                  userId: payload.userId,
                  cartId: payload.cartId,
                  entryNumber: entry.entry.entryNumber.toString(),
                  quantity: entry.quantity,
                }),
              ];
            }),
            catchError((error) =>
              of(
                new CartActions.CartUpdateEntryFail({
                  userId: payload.userId,
                  cartId: payload.cartId,
                  entryNumber: payload.cartEntryNumber,
                  quantity: 1,
                  error: normalizeHttpError(error),
                })
              )
            )
          );
      }
    )
  );

  @Effect()
  readConfigurationForCartEntry$: Observable<
    | ConfiguratorActions.ReadCartEntryConfigurationSuccess
    | ConfiguratorActions.UpdatePriceSummary
    | ConfiguratorActions.ReadCartEntryConfigurationFail
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.READ_CART_ENTRY_CONFIGURATION),
    switchMap((action: ConfiguratorActions.ReadCartEntryConfiguration) => {
      const parameters: GenericConfigurator.ReadConfigurationFromCartEntryParameters =
        action.payload;
      return this.configuratorCommonsConnector
        .readConfigurationForCartEntry(parameters)
        .pipe(
          switchMap((result: Configurator.Configuration) => [
            new ConfiguratorActions.ReadCartEntryConfigurationSuccess(result),
            new ConfiguratorActions.UpdatePriceSummary(result),
          ]),
          catchError((error) => [
            new ConfiguratorActions.ReadCartEntryConfigurationFail({
              ownerKey: action.payload.owner.key,
              error: normalizeHttpError(error),
            }),
          ])
        );
    })
  );

  @Effect()
  readConfigurationForOrderEntry$: Observable<
    | ConfiguratorActions.ReadOrderEntryConfigurationSuccess
    | ConfiguratorActions.ReadOrderEntryConfigurationFail
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.READ_ORDER_ENTRY_CONFIGURATION),
    switchMap((action: ConfiguratorActions.ReadOrderEntryConfiguration) => {
      const parameters: GenericConfigurator.ReadConfigurationFromOrderEntryParameters =
        action.payload;
      return this.configuratorCommonsConnector
        .readConfigurationForOrderEntry(parameters)
        .pipe(
          switchMap((result: Configurator.Configuration) => [
            new ConfiguratorActions.ReadOrderEntryConfigurationSuccess(result),
          ]),
          catchError((error) => [
            new ConfiguratorActions.ReadOrderEntryConfigurationFail({
              ownerKey: action.payload.owner.key,
              error: normalizeHttpError(error),
            }),
          ])
        );
    })
  );

  @Effect()
  addOwner$: Observable<
    | ConfiguratorActions.SetNextOwnerCartEntry
    | ConfiguratorActions.SetInteractionState
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.ADD_NEXT_OWNER),
    switchMap((action: ConfiguratorActions.AddNextOwner) => {
      return this.store.pipe(
        select(
          ConfiguratorSelectors.getConfigurationFactory(action.payload.ownerKey)
        ),
        take(1),
        switchMap((configuration) => {
          const newOwner: GenericConfigurator.Owner = {
            type: GenericConfigurator.OwnerType.CART_ENTRY,
            id: action.payload.cartEntryNo,
          };
          this.genericConfigUtilsService.setOwnerKey(newOwner);

          return [
            new ConfiguratorActions.SetNextOwnerCartEntry({
              configuration: configuration,
              cartEntryNo: action.payload.cartEntryNo,
            }),
            new ConfiguratorActions.SetInteractionState({
              entityKey: newOwner.key,
              interactionState: configuration.interactionState,
            }),
          ];
        })
      );
    })
  );

  constructor(
    protected actions$: Actions,
    protected configuratorCommonsConnector: ConfiguratorCommonsConnector,
    protected genericConfigUtilsService: GenericConfiguratorUtilsService,
    protected configuratorGroupUtilsService: ConfiguratorUtilsService,
    protected store: Store<StateWithConfigurator>
  ) {}
}
