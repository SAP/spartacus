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
  switchMapTo,
  take,
} from 'rxjs/operators';
import { CartActions } from '../../../../cart/store/actions/';
import { CartModification } from '../../../../model/cart.model';
import { Configurator } from '../../../../model/configurator.model';
import { GenericConfigurator } from '../../../../model/generic-configurator.model';
import { GenericConfigUtilsService } from '../../../generic/utils/config-utils.service';
import { ConfiguratorCommonsConnector } from '../../connectors/configurator-commons.connector';
import { ConfiguratorGroupUtilsService } from '../../facade/configurator-group-utils.service';
import * as ConfiguratorSelectors from '../../store/selectors/configurator.selector';
import { ConfiguratorActions } from '../actions/index';
import { StateWithConfiguration } from '../configuration-state';
import { normalizeHttpError } from './../../../../util/normalize-http-error';

@Injectable()
export class ConfiguratorEffects {
  @Effect()
  createConfiguration$: Observable<
    | ConfiguratorActions.CreateConfigurationSuccess
    | ConfiguratorActions.CreateConfigurationFail
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.CREATE_CONFIGURATION),
    mergeMap((action: ConfiguratorActions.CreateConfiguration) => {
      return this.configuratorCommonsConnector
        .createConfiguration(action.payload.id)
        .pipe(
          switchMap((configuration: Configurator.Configuration) => {
            this.store.dispatch(
              new ConfiguratorActions.UpdatePriceSummary(configuration)
            );

            return [
              new ConfiguratorActions.CreateConfigurationSuccess(configuration),
            ];
          }),
          catchError((error) => [
            new ConfiguratorActions.CreateConfigurationFail({
              ownerKey: action.payload.key,
              error: normalizeHttpError(error),
            }),
          ])
        );
    })
  );

  @Effect()
  readConfiguration$: Observable<
    | ConfiguratorActions.ReadConfigurationSuccess
    | ConfiguratorActions.ReadConfigurationFail
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.READ_CONFIGURATION),

    mergeMap((action: ConfiguratorActions.ReadConfiguration) => {
      return this.configuratorCommonsConnector
        .readConfiguration(
          action.payload.configuration.configId,
          action.payload.groupId,
          action.payload.configuration.owner
        )
        .pipe(
          switchMap((configuration: Configurator.Configuration) => {
            return [
              new ConfiguratorActions.ReadConfigurationSuccess(configuration),
            ];
          }),
          catchError((error) => [
            new ConfiguratorActions.ReadConfigurationFail({
              ownerKey: action.payload.configuration.owner.key,
              error: normalizeHttpError(error),
            }),
          ])
        );
    })
  );

  @Effect()
  updateConfiguration$: Observable<
    | ConfiguratorActions.UpdateConfigurationSuccess
    | ConfiguratorActions.UpdateConfigurationFail
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.UPDATE_CONFIGURATION),
    map((action: ConfiguratorActions.UpdateConfiguration) => action.payload),
    //mergeMap here as we need to process each update
    //(which only sends one changed attribute at a time),
    //so we must not cancel inner emissions
    mergeMap((payload: Configurator.Configuration) => {
      return this.configuratorCommonsConnector
        .updateConfiguration(payload)
        .pipe(
          map((configuration: Configurator.Configuration) => {
            return new ConfiguratorActions.UpdateConfigurationSuccess(
              configuration
            );
          }),
          catchError((error) => {
            const errorPayload = normalizeHttpError(error);
            return [
              new ConfiguratorActions.UpdateConfigurationFail({
                configuration: payload,
                error: errorPayload,
              }),
            ];
          })
        );
    })
  );

  @Effect()
  updatePriceSummary$: Observable<
    | ConfiguratorActions.UpdatePriceSummarySuccess
    | ConfiguratorActions.UpdatePriceSummaryFail
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.UPDATE_PRICE_SUMMARY),
    map(
      (action: { type: string; payload?: Configurator.Configuration }) =>
        action.payload
    ),
    mergeMap((payload) => {
      return this.configuratorCommonsConnector.readPriceSummary(payload).pipe(
        map((configuration: Configurator.Configuration) => {
          return new ConfiguratorActions.UpdatePriceSummarySuccess(
            configuration
          );
        }),
        catchError((error) => {
          const errorPayload = normalizeHttpError(error);
          return [
            new ConfiguratorActions.UpdatePriceSummaryFail({
              ownerKey: payload.owner.key,
              error: errorPayload,
            }),
          ];
        })
      );
    })
  );

  @Effect()
  getOverview$: Observable<
    | ConfiguratorActions.GetConfigurationOverviewSuccess
    | ConfiguratorActions.GetConfigurationOverviewFail
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.GET_CONFIGURATION_OVERVIEW),
    map(
      (action: ConfiguratorActions.GetConfigurationOverview) => action.payload
    ),
    mergeMap((payload) => {
      return this.configuratorCommonsConnector
        .getConfigurationOverview(payload.configId)
        .pipe(
          map((overview: Configurator.Overview) => {
            return new ConfiguratorActions.GetConfigurationOverviewSuccess({
              ownerKey: payload.owner.key,
              overview: overview,
            });
          }),
          catchError((error) => {
            const errorPayload = normalizeHttpError(error);
            return [
              new ConfiguratorActions.GetConfigurationOverviewFail({
                ownerKey: payload.owner.key,
                error: errorPayload,
              }),
            ];
          })
        );
    })
  );

  @Effect()
  updateConfigurationSuccess$: Observable<
    | ConfiguratorActions.UpdateConfigurationFinalizeSuccess
    | ConfiguratorActions.UpdatePriceSummary
    | ConfiguratorActions.ChangeGroup
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.UPDATE_CONFIGURATION_SUCCESS),
    map(
      (action: ConfiguratorActions.UpdateConfigurationSuccess) => action.payload
    ),
    mergeMap((payload: Configurator.Configuration) => {
      return this.store.pipe(
        select(ConfiguratorSelectors.hasPendingChanges(payload.owner.key)),
        take(1),
        filter((hasPendingChanges) => hasPendingChanges === false),
        switchMapTo(
          this.store.pipe(
            select(ConfiguratorSelectors.getCurrentGroup(payload.owner.key)),
            take(1),
            map((currentGroupId) => {
              const groupIdFromPayload = this.getGroupWithAttributes(
                payload.groups
              );
              const parentGroupFromPayload = this.configuratorGroupUtilsService.getParentGroup(
                payload.groups,
                this.configuratorGroupUtilsService.getGroupById(
                  payload.groups,
                  groupIdFromPayload
                ),
                null
              );
              return {
                currentGroupId,
                groupIdFromPayload,
                parentGroupFromPayload,
              };
            }),
            switchMap((container) => {
              //changeGroup because in cases where a queue of updates exists with a group navigation in between,
              //we need to ensure that the last update determines the current group.
              const updateFinalizeSuccessAction = new ConfiguratorActions.UpdateConfigurationFinalizeSuccess(
                payload
              );
              const updatePriceSummaryAction = new ConfiguratorActions.UpdatePriceSummary(
                payload
              );
              return container.currentGroupId === container.groupIdFromPayload
                ? [updateFinalizeSuccessAction, updatePriceSummaryAction]
                : [
                    updateFinalizeSuccessAction,
                    updatePriceSummaryAction,
                    new ConfiguratorActions.ChangeGroup({
                      configuration: payload,
                      groupId: container.groupIdFromPayload,
                      parentGroupId: container.parentGroupFromPayload?.id,
                    }),
                  ];
            })
          )
        )
      );
    })
  );

  @Effect()
  updateConfigurationFail$: Observable<
    ConfiguratorActions.UpdateConfigurationFinalizeFail
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.UPDATE_CONFIGURATION_FAIL),
    map(
      (action: ConfiguratorActions.UpdateConfigurationFail) => action.payload
    ),
    mergeMap((payload) => {
      return this.store.pipe(
        select(
          ConfiguratorSelectors.hasPendingChanges(
            payload.configuration.owner.key
          )
        ),
        take(1),
        filter((hasPendingChanges) => hasPendingChanges === false),
        map(
          () =>
            new ConfiguratorActions.UpdateConfigurationFinalizeFail(
              payload.configuration
            )
        )
      );
    })
  );

  @Effect()
  handleErrorOnUpdate$: Observable<
    ConfiguratorActions.ReadConfiguration
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.UPDATE_CONFIGURATION_FINALIZE_FAIL),
    map(
      (action: ConfiguratorActions.UpdateConfigurationFinalizeFail) =>
        action.payload
    ),
    map(
      (payload) =>
        new ConfiguratorActions.ReadConfiguration({
          configuration: payload,
          groupId: undefined,
        })
    )
  );

  @Effect()
  groupChange$: Observable<
    | ConfiguratorActions.SetCurrentGroup
    | ConfiguratorActions.SetMenuParentGroup
    | ConfiguratorActions.ReadConfigurationFail
    | ConfiguratorActions.ReadConfigurationSuccess
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.CHANGE_GROUP),
    switchMap((action: ConfiguratorActions.ChangeGroup) => {
      return this.store.pipe(
        select(
          ConfiguratorSelectors.hasPendingChanges(
            action.payload.configuration.owner.key
          )
        ),
        take(1),
        filter((hasPendingChanges) => hasPendingChanges === false),
        switchMap(() => {
          return this.configuratorCommonsConnector
            .readConfiguration(
              action.payload.configuration.configId,
              action.payload.groupId,
              action.payload.configuration.owner
            )
            .pipe(
              switchMap((configuration: Configurator.Configuration) => {
                return [
                  new ConfiguratorActions.SetCurrentGroup({
                    entityKey: action.payload.configuration.owner.key,
                    currentGroup: action.payload.groupId,
                  }),
                  new ConfiguratorActions.SetMenuParentGroup({
                    entityKey: action.payload.configuration.owner.key,
                    menuParentGroup: action.payload.parentGroupId,
                  }),
                  new ConfiguratorActions.ReadConfigurationSuccess(
                    configuration
                  ),
                ];
              }),
              catchError((error) => [
                new ConfiguratorActions.ReadConfigurationFail({
                  ownerKey: action.payload.configuration.owner.key,
                  error: normalizeHttpError(error),
                }),
              ])
            );
        })
      );
    })
  );

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

  getGroupWithAttributes(groups: Configurator.Group[]): string {
    const groupWithAttributes: Configurator.Group = groups
      .filter((currentGroup) => currentGroup.attributes.length > 0)
      .pop();
    let id: string;
    if (groupWithAttributes) {
      id = groupWithAttributes.id;
    } else {
      id = groups
        .filter((currentGroup) => currentGroup.subGroups.length > 0)
        .flatMap((currentGroup) =>
          this.getGroupWithAttributes(currentGroup.subGroups)
        )
        .filter((groupId) => groupId) //Filter undefined strings
        .pop();
    }
    return id;
  }

  constructor(
    protected actions$: Actions,
    protected configuratorCommonsConnector: ConfiguratorCommonsConnector,
    protected genericConfigUtilsService: GenericConfigUtilsService,
    protected configuratorGroupUtilsService: ConfiguratorGroupUtilsService,
    protected store: Store<StateWithConfiguration>
  ) {}
}
