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
  AddNextOwner,
  AddToCart,
  ADD_NEXT_OWNER,
  ADD_TO_CART,
  ChangeGroup,
  CHANGE_GROUP,
  CreateConfiguration,
  CreateConfigurationFail,
  CreateConfigurationSuccess,
  CREATE_CONFIGURATION,
  GetConfigurationOverview,
  GetConfigurationOverviewFail,
  GetConfigurationOverviewSuccess,
  GET_CONFIGURATION_OVERVIEW,
  ReadConfiguration,
  ReadConfigurationFail,
  ReadConfigurationSuccess,
  READ_CONFIGURATION,
  UpdateConfiguration,
  UpdateConfigurationFail,
  UpdateConfigurationFinalizeFail,
  UpdateConfigurationFinalizeSuccess,
  UpdateConfigurationSuccess,
  UpdatePriceSummary,
  UpdatePriceSummaryFail,
  UpdatePriceSummarySuccess,
  UPDATE_CONFIGURATION,
  UPDATE_CONFIGURATION_FAIL,
  UPDATE_CONFIGURATION_FINALIZE_FAIL,
  UPDATE_CONFIGURATION_SUCCESS,
  UPDATE_PRICE_SUMMARY,
} from '../actions/configurator.action';
import { StateWithConfiguration } from '../configuration-state';

@Injectable()
export class ConfiguratorEffects {
  @Effect()
  createConfiguration$: Observable<
    CreateConfigurationSuccess | CreateConfigurationFail
  > = this.actions$.pipe(
    ofType(CREATE_CONFIGURATION),
    mergeMap((action: CreateConfiguration) => {
      return this.configuratorCommonsConnector
        .createConfiguration(action.productCode)
        .pipe(
          switchMap((configuration: Configurator.Configuration) => {
            this.store.dispatch(new UpdatePriceSummary(configuration));

            return [new CreateConfigurationSuccess(configuration)];
          }),
          catchError(error => [
            new CreateConfigurationFail(
              action.ownerKey,
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

    mergeMap((action: ReadConfiguration) => {
      return this.configuratorCommonsConnector
        .readConfiguration(
          action.configuration.configId,
          action.groupId,
          action.configuration.owner
        )
        .pipe(
          switchMap((configuration: Configurator.Configuration) => {
            return [new ReadConfigurationSuccess(configuration)];
          }),
          catchError(error => [
            new ReadConfigurationFail(
              action.configuration.owner.key,
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
    mergeMap((payload: Configurator.Configuration) => {
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
              new UpdateConfigurationFail(payload.owner.key, errorPayload),
            ];
          })
        );
    })
  );

  @Effect()
  updatePriceSummary$: Observable<
    UpdatePriceSummarySuccess | UpdatePriceSummaryFail
  > = this.actions$.pipe(
    ofType(UPDATE_PRICE_SUMMARY),
    map(
      (action: { type: string; payload?: Configurator.Configuration }) =>
        action.payload
    ),
    mergeMap(payload => {
      return this.configuratorCommonsConnector.readPriceSummary(payload).pipe(
        map((configuration: Configurator.Configuration) => {
          return new UpdatePriceSummarySuccess(configuration);
        }),
        catchError(error => {
          const errorPayload = makeErrorSerializable(error);
          errorPayload.configId = payload.configId;
          return [new UpdatePriceSummaryFail(payload.owner.key, errorPayload)];
        })
      );
    })
  );

  @Effect()
  getOverview$: Observable<
    GetConfigurationOverviewSuccess | GetConfigurationOverviewFail
  > = this.actions$.pipe(
    ofType(GET_CONFIGURATION_OVERVIEW),
    map((action: GetConfigurationOverview) => action.payload),
    mergeMap(payload => {
      return this.configuratorCommonsConnector
        .getConfigurationOverview(payload.configId)
        .pipe(
          map((overview: Configurator.Overview) => {
            return new GetConfigurationOverviewSuccess(
              payload.owner.key,
              overview
            );
          }),
          catchError(error => {
            const errorPayload = makeErrorSerializable(error);
            errorPayload.configId = payload.owner.id;
            return [
              new GetConfigurationOverviewFail(payload.owner.key, errorPayload),
            ];
          })
        );
    })
  );

  @Effect()
  updateConfigurationSuccess$: Observable<
    | UpdateConfigurationFinalizeSuccess
    | UpdatePriceSummary
    | ConfiguratorUiActions.SetCurrentGroup
  > = this.actions$.pipe(
    ofType(UPDATE_CONFIGURATION_SUCCESS),
    map((action: UpdateConfigurationSuccess) => action.payload),
    mergeMap((payload: Configurator.Configuration) => {
      return this.store.pipe(
        select(ConfiguratorSelectors.getPendingChanges),
        take(1),
        filter(pendingChanges => pendingChanges === 0),
        switchMap(() => [
          new UpdateConfigurationFinalizeSuccess(payload),

          //When no changes are pending update prices
          new UpdatePriceSummary(payload),

          //setCurrentGroup because in cases where a queue of updates exists with a group navigation in between,
          //we need to ensure that the last update determines the current group.
          new ConfiguratorUiActions.SetCurrentGroup(
            payload.productCode,
            this.getGroupWithAttributes(payload.groups)
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
    map(payload => new ReadConfiguration(payload, ''))
  );

  @Effect()
  groupChange$: Observable<
    | ConfiguratorUiActions.SetCurrentGroup
    | ReadConfigurationFail
    | ReadConfigurationSuccess
  > = this.actions$.pipe(
    ofType(CHANGE_GROUP),
    switchMap((action: ChangeGroup) => {
      return this.store.pipe(
        select(ConfiguratorSelectors.getPendingChanges),
        take(1),
        filter(pendingChanges => pendingChanges === 0),
        switchMap(() => {
          return this.configuratorCommonsConnector
            .readConfiguration(
              action.configuration.configId,
              action.groupId,
              action.configuration.owner
            )
            .pipe(
              switchMap((configuration: Configurator.Configuration) => {
                return [
                  new ConfiguratorUiActions.SetCurrentGroup(
                    action.configuration.owner.key,
                    action.groupId
                  ),
                  new ReadConfigurationSuccess(configuration),
                ];
              }),
              catchError(error => [
                new ReadConfigurationFail(
                  action.configuration.owner.key,
                  makeErrorSerializable(error)
                ),
              ])
            );
        })
      );
    })
  );

  @Effect()
  addToCartCartProcessIncrement$: Observable<
    CartActions.CartProcessesIncrement
  > = this.actions$.pipe(
    ofType(ADD_TO_CART),
    map((action: AddToCart) => action.payload),
    switchMap((payload: Configurator.AddToCartParameters) => {
      return this.store.pipe(
        select(ConfiguratorSelectors.getPendingChanges),
        take(1),
        filter(pendingChanges => pendingChanges === 0),
        map(() => new CartActions.CartProcessesIncrement(payload.cartId))
      );
    })
  );

  @Effect()
  addToCart$: Observable<
    | ConfiguratorActions.AddNextOwner
    | CartActions.CartAddEntrySuccess
    | CartActions.CartAddEntryFail
  > = this.actions$.pipe(
    ofType(ADD_TO_CART),
    map((action: AddToCart) => action.payload),
    switchMap((payload: Configurator.AddToCartParameters) => {
      return this.store.pipe(
        select(ConfiguratorSelectors.getPendingChanges),
        take(1),
        filter(pendingChanges => pendingChanges === 0),
        switchMap(() => {
          return this.configuratorCommonsConnector.addToCart(payload).pipe(
            switchMap((entry: CartModification) => {
              return [
                new ConfiguratorActions.AddNextOwner(
                  payload.ownerKey,
                  '' + entry.entry.entryNumber
                ),
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
    })
  );

  @Effect()
  addOwner$: Observable<
    ConfiguratorActions.SetNextOwnerCartEntry
  > = this.actions$.pipe(
    ofType(ADD_NEXT_OWNER),
    switchMap((action: AddNextOwner) => {
      return this.store.pipe(
        select(ConfiguratorSelectors.getConfigurationFactory(action.ownerKey)),
        take(1),

        map(
          configuration =>
            new ConfiguratorActions.SetNextOwnerCartEntry(
              configuration,
              action.cartEntryNo
            )
        )
      );
    })
  );

  getGroupWithAttributes(groups: Configurator.Group[]): string {
    const groupWithAttributes: Configurator.Group = groups
      .filter(currentGroup => currentGroup.attributes)
      .pop();
    let id: string;
    if (groupWithAttributes) {
      id = groupWithAttributes.id;
    } else {
      id = groups
        .filter(currentGroup => currentGroup.subGroups)
        .flatMap(currentGroup =>
          this.getGroupWithAttributes(currentGroup.subGroups)
        )
        .pop();
    }
    return id;
  }

  constructor(
    private actions$: Actions,
    private configuratorCommonsConnector: ConfiguratorCommonsConnector,
    private store: Store<StateWithConfiguration>
  ) {}
}
