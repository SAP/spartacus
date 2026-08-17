/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { LoggerService, tryNormalizeHttpError } from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  map,
  mergeMap,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs/operators';
import { RulebasedConfiguratorConnector } from '../../connectors/rulebased-configurator.connector';
import { ConfiguratorGroupStatusService } from '../../facade/configurator-group-status.service';
import { ConfiguratorUtilsService } from '../../facade/utils/configurator-utils.service';
import { Configurator } from '../../model/configurator.model';
import { ConfiguratorActions } from '../actions/index';
import { StateWithConfigurator } from '../configurator-state';
import { ConfiguratorSelectors } from '../selectors/index';
import { ConfiguratorBasicEffectService } from './configurator-basic-effect.service';

type updateConfigurationSuccessResultType =
  | ConfiguratorActions.UpdateConfigurationFinalizeSuccess
  | ConfiguratorActions.UpdatePriceSummary
  | ConfiguratorActions.SearchVariants
  | ConfiguratorActions.ChangeGroup;

@Injectable()
/**
 * Common configurator effects, used for complex configurators like variant configurator
 * and CPQ
 */
export class ConfiguratorBasicEffects {
  protected logger = inject(LoggerService);

  createConfiguration$: Observable<
    | ConfiguratorActions.CreateConfigurationSuccess
    | ConfiguratorActions.SearchVariants
    | ConfiguratorActions.CreateConfigurationFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfiguratorActions.CREATE_CONFIGURATION),
      mergeMap((action: ConfiguratorActions.CreateConfiguration) => {
        return this.configuratorCommonsConnector
          .createConfiguration(
            action.payload.owner,
            action.payload.configIdTemplate,
            action.payload.forceReset
          )
          .pipe(
            switchMap((configuration: Configurator.Configuration) => {
              const currentGroup =
                this.configuratorBasicEffectService.getFirstGroupWithAttributes(
                  configuration
                );
              this.store.dispatch(
                new ConfiguratorActions.UpdatePriceSummary({
                  ...configuration,
                  interactionState: { currentGroup: currentGroup },
                })
              );

              return [
                new ConfiguratorActions.CreateConfigurationSuccess(
                  configuration
                ),
                new ConfiguratorActions.SearchVariants(configuration),
              ];
            }),
            catchError((error) => [
              new ConfiguratorActions.CreateConfigurationFail({
                ownerKey: action.payload.owner.key,
                error: tryNormalizeHttpError(error, this.logger),
              }),
            ])
          );
      })
    )
  );

  readConfiguration$: Observable<
    | ConfiguratorActions.ReadConfigurationSuccess
    | ConfiguratorActions.ReadConfigurationFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfiguratorActions.READ_CONFIGURATION),

      mergeMap((action: ConfiguratorActions.ReadConfiguration) => {
        return this.readConfiguration(
          action.payload.configuration,
          action.payload.groupId
        ).pipe(
          switchMap((configuration: Configurator.Configuration) => [
            new ConfiguratorActions.ReadConfigurationSuccess(configuration),
          ]),
          catchError((error) => [
            new ConfiguratorActions.ReadConfigurationFail({
              ownerKey: action.payload.configuration.owner.key,
              error: tryNormalizeHttpError(error, this.logger),
            }),
          ])
        );
      })
    )
  );

  readAttributeDomain$: Observable<
    | ConfiguratorActions.ReadConfigurationFail
    | ConfiguratorActions.ReadConfigurationSuccess
    | ConfiguratorActions.UpdatePriceSummary
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfiguratorActions.READ_ATTRIBUTE_DOMAIN),
      mergeMap((action: ConfiguratorActions.ReadAttributeDomain) => {
        return this.configuratorCommonsConnector
          .readConfiguration(
            action.payload.configuration.configId,
            action.payload.groupId,
            action.payload.configuration.owner,
            action.payload.attributeKey
          )
          .pipe(
            switchMap((configuration: Configurator.Configuration) => {
              return [
                new ConfiguratorActions.ReadConfigurationSuccess(configuration),
                new ConfiguratorActions.UpdatePriceSummary({
                  ...configuration,
                  interactionState: {
                    currentGroup: action.payload.groupId,
                  },
                }),
              ];
            }),
            catchError((error) => [
              new ConfiguratorActions.ReadConfigurationFail({
                ownerKey: action.payload.configuration.owner.key,
                error: tryNormalizeHttpError(error, this.logger),
              }),
            ])
          );
      })
    )
  );

  updateConfiguration$: Observable<
    | ConfiguratorActions.UpdateConfigurationSuccess
    | ConfiguratorActions.UpdateConfigurationFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfiguratorActions.UPDATE_CONFIGURATION),
      map((action: ConfiguratorActions.UpdateConfiguration) => action.payload),
      //concatMap (not mergeMap) so that updates are processed strictly one after
      //another: concatMap queues the updates without cancelling in-flight
      //emissions (switchMap would cancel and lose changes; each update only sends
      //one changed attribute at a time).
      concatMap((payload: Configurator.Configuration) => {
        return this.configuratorCommonsConnector
          .updateConfiguration(payload)
          .pipe(
            map((configuration: Configurator.Configuration) => {
              return new ConfiguratorActions.UpdateConfigurationSuccess({
                ...configuration,
                interactionState: {
                  isConflictResolutionMode:
                    payload.interactionState.isConflictResolutionMode,
                },
              });
            }),
            catchError((error) => {
              const errorPayload = tryNormalizeHttpError(error, this.logger);
              return [
                new ConfiguratorActions.UpdateConfigurationFail({
                  configuration: payload,
                  error: errorPayload,
                }),
              ];
            })
          );
      })
    )
  );

  addContainerRow$: Observable<
    | ConfiguratorActions.AddContainerRowSuccess
    | ConfiguratorActions.AddContainerRowFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfiguratorActions.ADD_CONTAINER_ROW),
      map((action: ConfiguratorActions.AddContainerRow) => action.payload),
      concatMap((parameters: Configurator.AddContainerRowParameters) => {
        this.logger.log('[ADD-ROW-TRACE] 1. addContainerRow request', {
          configId: parameters.configId,
          stdAttrCode: parameters.stdAttrCode,
          productSystemId: parameters.productSystemId,
          parentRowId: parameters.parentRowId,
        });
        return this.configuratorCommonsConnector
          .addContainerRow(parameters)
          .pipe(
            map((configuration: Configurator.Configuration) => {
              this.logger.log('[ADD-ROW-TRACE] 2. addContainerRow response', {
                configId: configuration.configId,
                groupIds: configuration.groups.map((group) => group.id),
                flatGroupIds: configuration.flatGroups.map(
                  (group) => group.id
                ),
                groupTree: this.configuratorBasicEffectService.traceGroups(
                  configuration.groups
                ),
              });
              return new ConfiguratorActions.AddContainerRowSuccess({
                ...configuration,
                owner: parameters.owner,
              });
            }),
            catchError((error) => {
              const errorPayload = tryNormalizeHttpError(error, this.logger);
              return [
                new ConfiguratorActions.AddContainerRowFail({
                  parameters,
                  error: errorPayload,
                }),
              ];
            })
          );
      })
    )
  );

  removeContainerRow$: Observable<
    | ConfiguratorActions.RemoveContainerRowSuccess
    | ConfiguratorActions.RemoveContainerRowFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfiguratorActions.REMOVE_CONTAINER_ROW),
      map((action: ConfiguratorActions.RemoveContainerRow) => action.payload),
      concatMap((parameters: Configurator.RemoveContainerRowParameters) => {
        return this.configuratorCommonsConnector
          .removeContainerRow(parameters)
          .pipe(
            map((configuration: Configurator.Configuration) => {
              return new ConfiguratorActions.RemoveContainerRowSuccess({
                ...configuration,
                owner: parameters.owner,
              });
            }),
            catchError((error) => {
              const errorPayload = tryNormalizeHttpError(error, this.logger);
              return [
                new ConfiguratorActions.RemoveContainerRowFail({
                  parameters,
                  error: errorPayload,
                }),
              ];
            })
          );
      })
    )
  );

  updatePriceSummary$: Observable<
    | ConfiguratorActions.UpdatePriceSummarySuccess
    | ConfiguratorActions.UpdatePriceSummaryFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfiguratorActions.UPDATE_PRICE_SUMMARY),
      map(
        (action: { type: string; payload: Configurator.Configuration }) =>
          action.payload
      ),
      filter((configuration) => configuration.pricingEnabled === true),
      mergeMap((payload) => {
        return this.configuratorCommonsConnector.readPriceSummary(payload).pipe(
          map((configuration: Configurator.Configuration) => {
            return new ConfiguratorActions.UpdatePriceSummarySuccess(
              configuration
            );
          }),
          catchError((error) => {
            const errorPayload = tryNormalizeHttpError(error, this.logger);
            return [
              new ConfiguratorActions.UpdatePriceSummaryFail({
                ownerKey: payload.owner.key,
                error: errorPayload,
              }),
            ];
          })
        );
      })
    )
  );

  getOverview$: Observable<
    | ConfiguratorActions.GetConfigurationOverviewSuccess
    | ConfiguratorActions.GetConfigurationOverviewFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfiguratorActions.GET_CONFIGURATION_OVERVIEW),
      map(
        (action: ConfiguratorActions.GetConfigurationOverview) => action.payload
      ),
      mergeMap((payload) => {
        return this.configuratorCommonsConnector
          .getConfigurationOverview(payload)
          .pipe(
            map((overview: Configurator.Overview) => {
              return new ConfiguratorActions.GetConfigurationOverviewSuccess({
                ownerKey: payload.owner.key,
                overview: overview,
              });
            }),
            catchError((error) => {
              const errorPayload = tryNormalizeHttpError(error, this.logger);
              return [
                new ConfiguratorActions.GetConfigurationOverviewFail({
                  ownerKey: payload.owner.key,
                  error: errorPayload,
                }),
              ];
            })
          );
      })
    )
  );

  updateOverview$: Observable<
    | ConfiguratorActions.UpdateConfigurationOverviewSuccess
    | ConfiguratorActions.UpdateConfigurationOverviewFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfiguratorActions.UPDATE_CONFIGURATION_OVERVIEW),
      map(
        (action: ConfiguratorActions.UpdateConfigurationOverview) =>
          action.payload
      ),
      mergeMap((payload) => {
        return this.configuratorCommonsConnector
          .updateConfigurationOverview(payload)
          .pipe(
            map((overview: Configurator.Overview) => {
              return new ConfiguratorActions.UpdateConfigurationOverviewSuccess(
                {
                  ownerKey: payload.owner.key,
                  overview: overview,
                }
              );
            }),
            catchError((error) => {
              const errorPayload = tryNormalizeHttpError(error, this.logger);
              return [
                new ConfiguratorActions.UpdateConfigurationOverviewFail({
                  ownerKey: payload.owner.key,
                  error: errorPayload,
                }),
              ];
            })
          );
      })
    )
  );

  updateConfigurationSuccess$: Observable<updateConfigurationSuccessResultType> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(
          ConfiguratorActions.UPDATE_CONFIGURATION_SUCCESS,
          ConfiguratorActions.ADD_CONTAINER_ROW_SUCCESS,
          ConfiguratorActions.REMOVE_CONTAINER_ROW_SUCCESS
        ),
        mergeMap(
          (
            action:
              | ConfiguratorActions.UpdateConfigurationSuccess
              | ConfiguratorActions.AddContainerRowSuccess
              | ConfiguratorActions.RemoveContainerRowSuccess
          ) => {
            const payload = action.payload;
            return this.store.pipe(
              select(
                ConfiguratorSelectors.hasPendingChanges(payload.owner.key)
              ),
              take(1),
              filter((hasPendingChanges) => !hasPendingChanges),
              switchMap(() =>
                this.store.pipe(
                  select(
                    ConfiguratorSelectors.getCurrentGroup(payload.owner.key)
                  ),
                  take(1),
                  withLatestFrom(
                    this.store.pipe(
                      select(
                        ConfiguratorSelectors.getConfigurationFactory(
                          payload.owner.key
                        )
                      )
                    )
                  ),
                  map(([currentGroupId, previousConfiguration]) => {
                    const applicableCurrentGroupId =
                      currentGroupId &&
                      !currentGroupId.startsWith(Configurator.ConflictIdPrefix)
                        ? currentGroupId
                        : undefined;

                    let groupIdFromPayload =
                      applicableCurrentGroupId ??
                      this.configuratorBasicEffectService.getFirstGroupWithAttributes(
                        payload,
                        payload.interactionState.isConflictResolutionMode
                      );

                    const isAddContainerRow =
                      action.type ===
                      ConfiguratorActions.ADD_CONTAINER_ROW_SUCCESS;

                    this.logger.log(
                      '[ADD-ROW-TRACE] 3a. updateConfigurationSuccess$ entered',
                      {
                        actionType: action.type,
                        isAddContainerRow,
                        currentGroupIdFromStore: currentGroupId,
                        applicableCurrentGroupId,
                        groupIdBeforeOverride: groupIdFromPayload,
                        previousConfigurationPresent: !!previousConfiguration,
                        previousConfigId: previousConfiguration?.configId,
                        previousCurrentGroup:
                          previousConfiguration?.interactionState?.currentGroup,
                      }
                    );

                    if (isAddContainerRow) {
                      const firstTabId =
                        this.configuratorBasicEffectService.getFirstTabIdOfNewlyAddedContainerRow(
                          previousConfiguration,
                          payload
                        );
                      if (firstTabId) {
                        groupIdFromPayload = firstTabId;
                      }
                    }

                    const parentGroupFromPayload =
                      this.configuratorGroupUtilsService.getParentGroup(
                        payload.groups,
                        this.configuratorGroupUtilsService.getGroupById(
                          payload.groups,
                          groupIdFromPayload
                        )
                      );

                    this.logger.log(
                      '[ADD-ROW-TRACE] 5. navigation target decided',
                      {
                        actionType: action.type,
                        applicableCurrentGroupId,
                        groupIdFromPayload,
                        parentGroupId: parentGroupFromPayload?.id,
                        willDispatchChangeGroup:
                          applicableCurrentGroupId !== groupIdFromPayload,
                      }
                    );

                    return {
                      applicableCurrentGroupId,
                      groupIdFromPayload,
                      parentGroupFromPayload,
                    };
                  }),
                  switchMap((container) => {
                    //changeGroup because in cases where a queue of updates exists with a group navigation in between,
                    //we need to ensure that the last update determines the current group.
                    const updateFinalizeSuccessAction =
                      new ConfiguratorActions.UpdateConfigurationFinalizeSuccess(
                        payload
                      );
                    const updatePriceSummaryAction =
                      new ConfiguratorActions.UpdatePriceSummary({
                        ...payload,
                        interactionState: {
                          currentGroup: container.groupIdFromPayload,
                        },
                      });
                    const searchVariantsAction =
                      new ConfiguratorActions.SearchVariants(payload);
                    return container.applicableCurrentGroupId ===
                      container.groupIdFromPayload
                      ? [
                          updateFinalizeSuccessAction,
                          updatePriceSummaryAction,
                          searchVariantsAction,
                        ]
                      : [
                          updateFinalizeSuccessAction,
                          updatePriceSummaryAction,
                          searchVariantsAction,
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
          }
        )
      )
    );

  updateConfigurationFail$: Observable<ConfiguratorActions.UpdateConfigurationFinalizeFail> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(
          ConfiguratorActions.UPDATE_CONFIGURATION_FAIL,
          ConfiguratorActions.ADD_CONTAINER_ROW_FAIL,
          ConfiguratorActions.REMOVE_CONTAINER_ROW_FAIL
        ),
        mergeMap(
          (
            action:
              | ConfiguratorActions.UpdateConfigurationFail
              | ConfiguratorActions.AddContainerRowFail
              | ConfiguratorActions.RemoveContainerRowFail
          ) => {
            const ownerKey =
              action.type === ConfiguratorActions.ADD_CONTAINER_ROW_FAIL ||
              action.type === ConfiguratorActions.REMOVE_CONTAINER_ROW_FAIL
                ? action.payload.parameters.owner.key
                : action.payload.configuration.owner.key;
            const configurationFromAction =
              action.type === ConfiguratorActions.UPDATE_CONFIGURATION_FAIL
                ? of(action.payload.configuration)
                : this.store.pipe(
                    select(
                      ConfiguratorSelectors.getConfigurationFactory(ownerKey)
                    ),
                    take(1)
                  );

            return configurationFromAction.pipe(
              filter((configuration) =>
                this.configuratorGroupUtilsService.isConfigurationCreated(
                  configuration
                )
              ),
              switchMap((configuration) =>
                this.store.pipe(
                  select(ConfiguratorSelectors.hasPendingChanges(ownerKey)),
                  take(1),
                  filter((hasPendingChanges) => !hasPendingChanges),
                  map(
                    () =>
                      new ConfiguratorActions.UpdateConfigurationFinalizeFail(
                        configuration
                      )
                  )
                )
              )
            );
          }
        )
      )
    );

  handleErrorOnUpdate$: Observable<ConfiguratorActions.ReadConfiguration> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(ConfiguratorActions.UPDATE_CONFIGURATION_FINALIZE_FAIL),
        map(
          (action: ConfiguratorActions.UpdateConfigurationFinalizeFail) =>
            action.payload
        ),
        map(
          (payload) =>
            new ConfiguratorActions.ReadConfiguration({
              configuration: payload,
              groupId:
                this.configuratorBasicEffectService.getFirstGroupWithAttributes(
                  payload
                ),
            })
        )
      )
    );

  groupChange$: Observable<
    | ConfiguratorActions.SetCurrentGroup
    | ConfiguratorActions.SetMenuParentGroup
    | ConfiguratorActions.ReadConfigurationFail
    | ConfiguratorActions.ReadConfigurationSuccess
    | ConfiguratorActions.UpdatePriceSummary
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfiguratorActions.CHANGE_GROUP),
      switchMap((action: ConfiguratorActions.ChangeGroup) => {
        this.logger.log('[ADD-ROW-TRACE] 6. groupChange$ received ChangeGroup', {
          groupId: action.payload.groupId,
          parentGroupId: action.payload.parentGroupId,
          configId: action.payload.configuration.configId,
        });
        return this.store.pipe(
          select(
            ConfiguratorSelectors.hasPendingChanges(
              action.payload.configuration.owner.key
            )
          ),
          take(1),
          filter((hasPendingChanges) => {
            this.logger.log('[ADD-ROW-TRACE] 7. groupChange$ pending check', {
              hasPendingChanges,
              proceeds: !hasPendingChanges,
            });
            return !hasPendingChanges;
          }),
          switchMap(() => {
            return this.readConfiguration(
              action.payload.configuration,
              action.payload.groupId
            ).pipe(
              switchMap((configuration: Configurator.Configuration) => {
                this.logger.log(
                  '[ADD-ROW-TRACE] 9. groupChange$ read result',
                  {
                    requestedGroupId: action.payload.groupId,
                    configId: configuration.configId,
                    rootGroupIds: configuration.groups.map((group) => group.id),
                    requestedGroupPresentInResponse:
                      !!this.configuratorGroupUtilsService.getOptionalGroupById(
                        configuration.groups,
                        action.payload.groupId
                      ),
                    groupTree:
                      this.configuratorBasicEffectService.traceGroups(
                        configuration.groups
                      ),
                  }
                );
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
                  new ConfiguratorActions.UpdatePriceSummary({
                    ...configuration,
                    interactionState: {
                      currentGroup: action.payload.groupId,
                    },
                  }),
                ];
              }),
              catchError((error) => [
                new ConfiguratorActions.ReadConfigurationFail({
                  ownerKey: action.payload.configuration.owner.key,
                  error: tryNormalizeHttpError(error, this.logger),
                }),
              ])
            );
          })
        );
      })
    )
  );

  removeProductBoundConfigurations$: Observable<ConfiguratorActions.RemoveConfiguration> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(ConfiguratorActions.REMOVE_PRODUCT_BOUND_CONFIGURATIONS),
        switchMap(() => {
          return this.store.pipe(
            select(ConfiguratorSelectors.getConfigurationsState),
            take(1),
            map((configuratorState) => {
              const entities = configuratorState.configurations.entities;

              const ownerKeysToRemove: string[] = [];
              for (const ownerKey in entities) {
                if (ownerKey.includes(CommonConfigurator.OwnerType.PRODUCT)) {
                  ownerKeysToRemove.push(ownerKey);
                }
              }

              return new ConfiguratorActions.RemoveConfiguration({
                ownerKey: ownerKeysToRemove,
              });
            })
          );
        })
      )
    );

  /**
   * Reads a configuration for the given group (tab). For configurator types
   * that load tabs lazily (currently CPQ), an already loaded tab is served
   * from the store instead of triggering another backend read. All other types
   * always read from the backend.
   *
   * @param configuration - configuration carrying the config ID and owner
   * @param groupId - requested group (tab) ID
   * @returns configuration for the requested group
   */
  protected readConfiguration(
    configuration: Configurator.Configuration,
    groupId: string
  ): Observable<Configurator.Configuration> {
    const owner = configuration.owner;
    return this.store.pipe(
      select(ConfiguratorSelectors.getConfigurationFactory(owner.key)),
      take(1),
      switchMap((configurationInStore) => {
        const configurationFromStore =
          owner.configuratorType === ConfiguratorType.CPQ
            ? this.configuratorBasicEffectService.getConfigurationIfTabAlreadyLoaded(
                configurationInStore,
                configuration.configId,
                groupId,
                owner
              )
            : undefined;

        this.logger.log('[ADD-ROW-TRACE] 8. readConfiguration', {
          requestedGroupId: groupId,
          configuratorType: owner.configuratorType,
          servedFromStore: !!configurationFromStore,
          storeConfigId: configurationInStore?.configId,
          storeRootGroupIds: (configurationInStore?.groups ?? []).map(
            (group) => group.id
          ),
        });

        return configurationFromStore
          ? of(configurationFromStore)
          : this.configuratorCommonsConnector.readConfiguration(
              configuration.configId,
              groupId,
              owner
            );
      })
    );
  }

  constructor(
    protected actions$: Actions,
    protected configuratorCommonsConnector: RulebasedConfiguratorConnector,
    protected commonConfigUtilsService: CommonConfiguratorUtilsService,
    protected configuratorGroupUtilsService: ConfiguratorUtilsService,
    protected configuratorGroupStatusService: ConfiguratorGroupStatusService,
    protected store: Store<StateWithConfigurator>,
    protected configuratorBasicEffectService: ConfiguratorBasicEffectService
  ) {}
}
