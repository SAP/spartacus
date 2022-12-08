/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { normalizeHttpError } from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
} from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  switchMapTo,
  take,
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
  createConfiguration$: Observable<
    | ConfiguratorActions.CreateConfigurationSuccess
    | ConfiguratorActions.SearchVariants
    | ConfiguratorActions.CreateConfigurationFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfiguratorActions.CREATE_CONFIGURATION),
      mergeMap((action: ConfiguratorActions.CreateConfiguration) => {
        return this.configuratorCommonsConnector
          .createConfiguration(action.payload)
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
                ownerKey: action.payload.key,
                error: normalizeHttpError(error),
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
        return this.configuratorCommonsConnector
          .readConfiguration(
            action.payload.configuration.configId,
            action.payload.groupId,
            action.payload.configuration.owner
          )
          .pipe(
            switchMap((configuration: Configurator.Configuration) => [
              new ConfiguratorActions.ReadConfigurationSuccess(configuration),
            ]),
            catchError((error) => [
              new ConfiguratorActions.ReadConfigurationFail({
                ownerKey: action.payload.configuration.owner.key,
                error: normalizeHttpError(error),
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
              const errorPayload = normalizeHttpError(error);
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
        ofType(ConfiguratorActions.UPDATE_CONFIGURATION_SUCCESS),
        map(
          (action: ConfiguratorActions.UpdateConfigurationSuccess) =>
            action.payload
        ),
        mergeMap((payload: Configurator.Configuration) => {
          return this.store.pipe(
            select(ConfiguratorSelectors.hasPendingChanges(payload.owner.key)),
            take(1),
            filter((hasPendingChanges) => hasPendingChanges === false),
            switchMapTo(
              this.store.pipe(
                select(
                  ConfiguratorSelectors.getCurrentGroup(payload.owner.key)
                ),
                take(1),
                map((currentGroupId) => {
                  const groupIdFromPayload =
                    this.configuratorBasicEffectService.getFirstGroupWithAttributes(
                      payload
                    );
                  const parentGroupFromPayload =
                    this.configuratorGroupUtilsService.getParentGroup(
                      payload.groups,
                      this.configuratorGroupUtilsService.getGroupById(
                        payload.groups,
                        groupIdFromPayload
                      ),
                      undefined
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
                  return container.currentGroupId ===
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
        })
      )
    );

  updateConfigurationFail$: Observable<ConfiguratorActions.UpdateConfigurationFinalizeFail> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(ConfiguratorActions.UPDATE_CONFIGURATION_FAIL),
        map(
          (action: ConfiguratorActions.UpdateConfigurationFail) =>
            action.payload
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
                    error: normalizeHttpError(error),
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
