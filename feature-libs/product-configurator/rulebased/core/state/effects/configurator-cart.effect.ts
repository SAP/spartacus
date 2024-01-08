/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { CartActions } from '@spartacus/cart/base/core';
import { CartModification } from '@spartacus/cart/base/root';
import { LoggerService, normalizeHttpError } from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
  ConfiguratorModelUtils,
} from '@spartacus/product-configurator/common';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { RulebasedConfiguratorConnector } from '../../connectors/rulebased-configurator.connector';
import { ConfiguratorUtilsService } from '../../facade/utils/configurator-utils.service';
import { Configurator } from '../../model/configurator.model';
import { ConfiguratorActions } from '../actions/index';
import { StateWithConfigurator } from '../configurator-state';
import { ConfiguratorSelectors } from '../selectors/index';
import { ConfiguratorBasicEffectService } from './configurator-basic-effect.service';

type readConfigurationForCartEntryResultType =
  | ConfiguratorActions.ReadCartEntryConfigurationSuccess
  | ConfiguratorActions.UpdatePriceSummary
  | ConfiguratorActions.SearchVariants
  | ConfiguratorActions.ReadCartEntryConfigurationFail;

export const ERROR_MESSAGE_NO_ENTRY_NUMBER_FOUND =
  'Entry number is required in addToCart response';
@Injectable()
/**
 * Common configurator effects related to cart handling
 */
export class ConfiguratorCartEffects {
  protected logger = inject(LoggerService);

  addToCart$: Observable<
    | ConfiguratorActions.AddNextOwner
    | CartActions.CartAddEntrySuccess
    | CartActions.CartAddEntryFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfiguratorActions.ADD_TO_CART),
      map((action: ConfiguratorActions.AddToCart) => action.payload),
      switchMap((payload: Configurator.AddToCartParameters) => {
        return this.configuratorCommonsConnector.addToCart(payload).pipe(
          switchMap((entry: CartModification) => {
            const entryNumber = entry.entry?.entryNumber;
            if (entryNumber === undefined) {
              throw Error(ERROR_MESSAGE_NO_ENTRY_NUMBER_FOUND);
            } else {
              return [
                new ConfiguratorActions.AddNextOwner({
                  ownerKey: payload.owner.key,
                  cartEntryNo: entryNumber.toString(),
                }),

                new CartActions.CartAddEntrySuccess({
                  ...entry,
                  userId: payload.userId,
                  cartId: payload.cartId,
                  productCode: payload.productCode,
                  quantity: payload.quantity,
                  deliveryModeChanged: entry.deliveryModeChanged,
                  entry: entry.entry,
                  quantityAdded: entry.quantityAdded,
                  statusCode: entry.statusCode,
                  statusMessage: entry.statusMessage,
                }),
              ];
            }
          }),
          catchError((error) =>
            of(
              new CartActions.CartAddEntryFail({
                userId: payload.userId,
                cartId: payload.cartId,
                productCode: payload.productCode,
                quantity: payload.quantity,
                error:
                  error instanceof HttpErrorResponse
                    ? normalizeHttpError(error, this.logger)
                    : error,
              })
            )
          )
        );
      })
    )
  );

  updateCartEntry$: Observable<
    CartActions.CartUpdateEntrySuccess | CartActions.CartUpdateEntryFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfiguratorActions.UPDATE_CART_ENTRY),
      map((action: ConfiguratorActions.UpdateCartEntry) => action.payload),
      switchMap(
        (payload: Configurator.UpdateConfigurationForCartEntryParameters) => {
          return this.configuratorCommonsConnector
            .updateConfigurationForCartEntry(payload)
            .pipe(
              switchMap((cartModification: CartModification) => {
                return [
                  new CartActions.CartUpdateEntrySuccess({
                    userId: payload.userId,
                    cartId: payload.cartId,
                    entryNumber: payload.cartEntryNumber,
                    quantity: cartModification.quantity,
                  }),
                ];
              }),
              catchError((error) =>
                of(
                  new CartActions.CartUpdateEntryFail({
                    userId: payload.userId,
                    cartId: payload.cartId,
                    entryNumber: payload.cartEntryNumber,
                    error: normalizeHttpError(error, this.logger),
                  })
                )
              )
            );
        }
      )
    )
  );

  readConfigurationForCartEntry$: Observable<readConfigurationForCartEntryResultType> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(ConfiguratorActions.READ_CART_ENTRY_CONFIGURATION),
        switchMap((action: ConfiguratorActions.ReadCartEntryConfiguration) => {
          const parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters =
            action.payload;
          return this.configuratorCommonsConnector
            .readConfigurationForCartEntry(parameters)
            .pipe(
              switchMap((result: Configurator.Configuration) => {
                const updatePriceSummaryAction =
                  new ConfiguratorActions.UpdatePriceSummary({
                    ...result,
                    interactionState: {
                      currentGroup:
                        this.configuratorBasicEffectService.getFirstGroupWithAttributes(
                          result,
                          !result.immediateConflictResolution
                        ),
                    },
                  });
                return [
                  new ConfiguratorActions.ReadCartEntryConfigurationSuccess(
                    result
                  ),
                  updatePriceSummaryAction,
                  new ConfiguratorActions.SearchVariants(result),
                ];
              }),
              catchError((error) => [
                new ConfiguratorActions.ReadCartEntryConfigurationFail({
                  ownerKey: action.payload.owner.key,
                  error: normalizeHttpError(error, this.logger),
                }),
              ])
            );
        })
      )
    );

  readConfigurationForOrderEntry$: Observable<
    | ConfiguratorActions.ReadOrderEntryConfigurationSuccess
    | ConfiguratorActions.ReadOrderEntryConfigurationFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfiguratorActions.READ_ORDER_ENTRY_CONFIGURATION),
      switchMap((action: ConfiguratorActions.ReadOrderEntryConfiguration) => {
        const parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters =
          action.payload;
        return this.configuratorCommonsConnector
          .readConfigurationForOrderEntry(parameters)
          .pipe(
            switchMap((result: Configurator.Configuration) => [
              new ConfiguratorActions.ReadOrderEntryConfigurationSuccess(
                result
              ),
            ]),
            catchError((error) => [
              new ConfiguratorActions.ReadOrderEntryConfigurationFail({
                ownerKey: action.payload.owner.key,
                error: normalizeHttpError(error, this.logger),
              }),
            ])
          );
      })
    )
  );

  removeCartBoundConfigurations$: Observable<ConfiguratorActions.RemoveConfiguration> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(ConfiguratorActions.REMOVE_CART_BOUND_CONFIGURATIONS),
        switchMap(() => {
          return this.store.pipe(
            select(ConfiguratorSelectors.getConfigurationsState),
            take(1),
            map((configuratorState) => {
              const entities = configuratorState.configurations.entities;

              const ownerKeysToRemove: string[] = [];
              const ownerKeysProductBound: string[] = [];
              for (const ownerKey in entities) {
                if (
                  ownerKey.includes(CommonConfigurator.OwnerType.CART_ENTRY)
                ) {
                  ownerKeysToRemove.push(ownerKey);
                } else if (
                  ownerKey.includes(CommonConfigurator.OwnerType.PRODUCT)
                ) {
                  ownerKeysProductBound.push(ownerKey);
                }
              }

              ownerKeysProductBound.forEach((ownerKey) => {
                const configuration = entities[ownerKey];
                if (configuration.value?.nextOwner !== undefined) {
                  ownerKeysToRemove.push(ownerKey);
                }
              });
              return new ConfiguratorActions.RemoveConfiguration({
                ownerKey: ownerKeysToRemove,
              });
            })
          );
        })
      )
    );

  addOwner$: Observable<
    | ConfiguratorActions.SetNextOwnerCartEntry
    | ConfiguratorActions.SetInteractionState
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfiguratorActions.ADD_NEXT_OWNER),
      switchMap((action: ConfiguratorActions.AddNextOwner) => {
        return this.store.pipe(
          select(
            ConfiguratorSelectors.getConfigurationFactory(
              action.payload.ownerKey
            )
          ),
          take(1),
          switchMap((configuration) => {
            const newOwner = ConfiguratorModelUtils.createOwner(
              CommonConfigurator.OwnerType.CART_ENTRY,
              action.payload.cartEntryNo
            );
            this.commonConfigUtilsService.setOwnerKey(newOwner);

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
    )
  );

  constructor(
    protected actions$: Actions,
    protected configuratorCommonsConnector: RulebasedConfiguratorConnector,
    protected commonConfigUtilsService: CommonConfiguratorUtilsService,
    protected configuratorGroupUtilsService: ConfiguratorUtilsService,
    protected store: Store<StateWithConfigurator>,
    protected configuratorBasicEffectService: ConfiguratorBasicEffectService
  ) {}
}
