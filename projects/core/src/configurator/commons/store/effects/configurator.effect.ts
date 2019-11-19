import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  take,
} from 'rxjs/operators';
import { CartActions } from '../../../../cart/store/actions/';
import { CartModification } from '../../../../model/cart.model';
import { Configurator } from '../../../../model/configurator.model';
import { makeErrorSerializable } from '../../../../util/serialization-utils';
import { ConfiguratorCommonsConnector } from '../../connectors/configurator-commons.connector';
import * as ConfiguratorSelectors from '../../store/selectors/configurator.selector';
import { ConfiguratorActions, ConfiguratorUiActions } from '../actions';
import {
  AddToCartFinalize,
  ADD_TO_CART,
  ADD_TO_CART_FINALIZE,
  ChangeGroup,
  ChangeGroupFinalize,
  CHANGE_GROUP,
  CHANGE_GROUP_FINALIZE,
  CreateConfiguration,
  CreateConfigurationFail,
  CreateConfigurationSuccess,
  CREATE_CONFIGURATION,
  ReadConfiguration,
  ReadConfigurationFail,
  ReadConfigurationSuccess,
  READ_CONFIGURATION,
  UpdateConfiguration,
  UpdateConfigurationFail,
  UpdateConfigurationFinalizeFail,
  UpdateConfigurationFinalizeSuccess,
  UpdateConfigurationPrice,
  UpdateConfigurationPriceFail,
  UpdateConfigurationPriceSuccess,
  UpdateConfigurationSuccess,
  UPDATE_CONFIGURATION,
  UPDATE_CONFIGURATION_FAIL,
  UPDATE_CONFIGURATION_FINALIZE_FAIL,
  UPDATE_CONFIGURATION_PRICE,
  UPDATE_CONFIGURATION_SUCCESS,
} from '../actions/configurator.action';
import { StateWithConfiguration } from '../configuration-state';

@Injectable()
export class ConfiguratorEffects {
  @Effect()
  createConfiguration$: Observable<
    CreateConfigurationSuccess | CreateConfigurationFail
  > = this.actions$.pipe(
    ofType(CREATE_CONFIGURATION),
    map((action: CreateConfiguration) => action.productCode),
    mergeMap(productCode => {
      return this.configuratorCommonsConnector
        .createConfiguration(productCode)
        .pipe(
          switchMap((configuration: Configurator.Configuration) => {
            this.store.dispatch(new UpdateConfigurationPrice(configuration));

            return [new CreateConfigurationSuccess(configuration)];
          }),
          catchError(error => [
            new CreateConfigurationFail(
              productCode,
              makeErrorSerializable(error)
            ),
          ])
        );
    })
  );

  @Effect()
  readConfiguration$: Observable<
    ReadConfigurationSuccess | ReadConfigurationFail
  > = this.actions$.pipe(
    ofType(READ_CONFIGURATION),
    map((action: ReadConfiguration) => action.payload),
    mergeMap(payload => {
      return this.configuratorCommonsConnector
        .readConfiguration(payload.configId, payload.groupId)
        .pipe(
          switchMap((configuration: Configurator.Configuration) => {
            return [new ReadConfigurationSuccess(configuration)];
          }),
          catchError(error => [
            new ReadConfigurationFail(
              payload.productCode,
              makeErrorSerializable(error)
            ),
          ])
        );
    })
  );

  @Effect()
  updateConfiguration$: Observable<
    UpdateConfigurationSuccess | UpdateConfigurationFail
  > = this.actions$.pipe(
    ofType(UPDATE_CONFIGURATION),
    map((action: UpdateConfiguration) => action.payload),
    //mergeMap here as we need to process each update
    //(which only sends one changed attribute at a time),
    //so we must not cancel inner emissions
    mergeMap(payload => {
      return this.configuratorCommonsConnector
        .updateConfiguration(payload)
        .pipe(
          map((configuration: Configurator.Configuration) => {
            return new UpdateConfigurationSuccess(configuration);
          }),
          catchError(error => {
            const errorPayload = makeErrorSerializable(error);
            errorPayload.configId = payload.configId;
            return [
              new UpdateConfigurationFail(payload.productCode, errorPayload),
            ];
          })
        );
    })
  );

  @Effect()
  updateConfigurationPrice$: Observable<
    UpdateConfigurationPriceSuccess | UpdateConfigurationPriceFail
  > = this.actions$.pipe(
    ofType(UPDATE_CONFIGURATION_PRICE),
    map(
      (action: { type: string; payload?: Configurator.Configuration }) =>
        action.payload
    ),
    mergeMap(payload => {
      return this.configuratorCommonsConnector
        .readConfigurationPrice(payload.configId)
        .pipe(
          map((configuration: Configurator.Configuration) => {
            return new UpdateConfigurationPriceSuccess(configuration);
          }),
          catchError(error => {
            const errorPayload = makeErrorSerializable(error);
            errorPayload.configId = payload.configId;
            return [
              new UpdateConfigurationPriceFail(
                payload.productCode,
                errorPayload
              ),
            ];
          })
        );
    })
  );

  @Effect()
  updateConfigurationSuccess$: Observable<
    | UpdateConfigurationFinalizeSuccess
    | UpdateConfigurationPrice
    | ConfiguratorUiActions.SetCurrentGroup
  > = this.actions$.pipe(
    ofType(UPDATE_CONFIGURATION_SUCCESS),
    map((action: UpdateConfigurationSuccess) => action.payload),
    mergeMap(payload => {
      return this.store.pipe(
        select(ConfiguratorSelectors.getPendingChanges),
        take(1),
        filter(pendingChanges => pendingChanges === 0),
        switchMap(() => [
          new UpdateConfigurationFinalizeSuccess(payload),

          //When no changes are pending update prices
          new UpdateConfigurationPrice(payload),

          //setCurrentGroup because in cases where a queue of updates exists with a group navigation in between,
          //we need to ensure that the last update determines the current group.
          new ConfiguratorUiActions.SetCurrentGroup(
            payload.productCode,
            payload.groups.filter(group => group.attributes.length > 0)[0].id
          ),
        ])
      );
    })
  );

  @Effect()
  updateConfigurationFail$: Observable<
    UpdateConfigurationFinalizeFail
  > = this.actions$.pipe(
    ofType(UPDATE_CONFIGURATION_FAIL),
    map((action: UpdateConfigurationFail) => action.payload),
    mergeMap(payload => {
      return this.store.pipe(
        select(ConfiguratorSelectors.getPendingChanges),
        take(1),
        filter(pendingChanges => pendingChanges === 0),
        map(() => new UpdateConfigurationFinalizeFail(payload))
      );
    })
  );

  @Effect()
  handleErrorOnUpdate$: Observable<ReadConfiguration> = this.actions$.pipe(
    ofType(UPDATE_CONFIGURATION_FINALIZE_FAIL),
    map((action: UpdateConfigurationFinalizeFail) => action.payload),
    map(payload => new ReadConfiguration({ configId: payload.configId }))
  );

  @Effect()
  groupChange$: Observable<ChangeGroupFinalize> = this.actions$.pipe(
    ofType(CHANGE_GROUP),
    map((action: ChangeGroup) => action.payload),
    switchMap(payload => {
      return this.store.pipe(
        select(ConfiguratorSelectors.getPendingChanges),
        take(1),
        filter(pendingChanges => pendingChanges === 0),
        map(() => new ChangeGroupFinalize(payload))
      );
    })
  );

  @Effect()
  groupChangeFinalize$: Observable<
    | ConfiguratorUiActions.SetCurrentGroup
    | ReadConfigurationFail
    | ReadConfigurationSuccess
  > = this.actions$.pipe(
    ofType(CHANGE_GROUP_FINALIZE),
    map((action: ChangeGroupFinalize) => action.payload),
    switchMap(payload => {
      return this.configuratorCommonsConnector
        .readConfiguration(payload.configId, payload.groupId)
        .pipe(
          switchMap((configuration: Configurator.Configuration) => {
            return [
              new ConfiguratorUiActions.SetCurrentGroup(
                payload.productCode,
                payload.groupId
              ),
              new ReadConfigurationSuccess(configuration),
            ];
          }),
          catchError(error => [
            new ReadConfigurationFail(
              payload.productCode,
              makeErrorSerializable(error)
            ),
          ])
        );
    })
  );

  @Effect()
  addToCart$: Observable<AddToCartFinalize> = this.actions$.pipe(
    ofType(ADD_TO_CART),
    map((action: { type: string; payload?: any }) => action.payload),
    switchMap(payload => {
      return this.store.pipe(
        select(ConfiguratorSelectors.getPendingChanges),
        take(1),
        filter(pendingChanges => pendingChanges === 0),
        map(() => new AddToCartFinalize(payload))
      );
    })
  );

  @Effect()
  addToCartFinalize$: Observable<
    | ConfiguratorUiActions.RemoveUiState
    | ConfiguratorActions.RemoveConfiguration
    | CartActions.CartAddEntrySuccess
    | CartActions.CartAddEntryFail
  > = this.actions$.pipe(
    ofType(ADD_TO_CART_FINALIZE),
    map(
      (action: {
        type: string;
        payload?: {
          userId: string;
          cartId: string;
          productCode: string;
          quantity: number;
          configId: string;
        };
      }) => action.payload
    ),
    switchMap(payload => {
      return this.configuratorCommonsConnector
        .addToCart(
          payload.userId,
          payload.cartId,
          payload.productCode,
          payload.quantity,
          payload.configId
        )
        .pipe(
          switchMap((entry: CartModification) => {
            return [
              new ConfiguratorUiActions.RemoveUiState(payload.productCode),
              new ConfiguratorActions.RemoveConfiguration(payload.productCode),
              new CartActions.CartAddEntrySuccess({
                ...entry,
                userId: payload.userId,
                cartId: payload.cartId,
              }),
            ];
          }),
          catchError(error =>
            of(new CartActions.CartAddEntryFail(makeErrorSerializable(error)))
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private configuratorCommonsConnector: ConfiguratorCommonsConnector,
    private store: Store<StateWithConfiguration>
  ) {}
}
