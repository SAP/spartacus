/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders, HttpContext } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import {
  CartModification,
  CART_MODIFICATION_NORMALIZER,
} from '@spartacus/cart/base/root';
import {
  ConverterService,
  OccEndpointsService,
  OCC_HTTP_TOKEN,
} from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { RulebasedConfiguratorAdapter } from '../../core/connectors/rulebased-configurator.adapter';
import { Configurator } from '../../core/model/configurator.model';
import {
  VARIANT_CONFIGURATOR_ADD_TO_CART_SERIALIZER,
  VARIANT_CONFIGURATOR_NORMALIZER,
  VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER,
  VARIANT_CONFIGURATOR_OVERVIEW_SERIALIZER,
  VARIANT_CONFIGURATOR_PRICE_NORMALIZER,
  VARIANT_CONFIGURATOR_SERIALIZER,
  VARIANT_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER,
} from './variant-configurator-occ.converters';
import { OccConfigurator } from './variant-configurator-occ.models';
import { ConfiguratorExpertModeService } from '../../core/services/configurator-expert-mode.service';

@Injectable()
export class VariantConfiguratorOccAdapter
  implements RulebasedConfiguratorAdapter
{
  //TODO(CXSPA-1014): make ConfiguratorExpertModeService a required dependency
  constructor(
    http: HttpClient,
    occEndpointsService: OccEndpointsService,
    converterService: ConverterService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    configExpertModeService: ConfiguratorExpertModeService
  );

  /**
   * @deprecated since 5.1
   */
  constructor(
    http: HttpClient,
    occEndpointsService: OccEndpointsService,
    converterService: ConverterService
  );

  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService,
    @Optional()
    protected configExpertModeService?: ConfiguratorExpertModeService
  ) {}

  getConfiguratorType(): string {
    return ConfiguratorType.VARIANT;
  }

  protected getExpModeRequested(): boolean {
    let expMode = false;
    this.configExpertModeService
      ?.getExpModeRequested()
      .pipe(take(1))
      .subscribe((mode) => (expMode = mode));
    return expMode;
  }

  protected setExpModeActive(expMode: boolean) {
    this.configExpertModeService?.setExpModeActive(expMode);
  }

  createConfiguration(
    owner: CommonConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    const productCode = owner.id;
    const expMode = this.getExpModeRequested();
    return this.http
      .get<OccConfigurator.Configuration>(
        this.occEndpointsService.buildUrl('createVariantConfiguration', {
          urlParams: { productCode },
          queryParams: { expMode },
        }),
        { context: this.indicateSendUserForAsm() }
      )
      .pipe(
        this.converterService.pipeable(VARIANT_CONFIGURATOR_NORMALIZER),
        tap((resultConfiguration) => {
          this.setExpModeActive(resultConfiguration.kbKey !== undefined);
        }),
        map((resultConfiguration) => {
          return {
            ...resultConfiguration,
            owner: owner,
          };
        })
      );
  }

  readConfiguration(
    configId: string,
    groupId: string,
    configurationOwner: CommonConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    const expMode = this.getExpModeRequested();
    return this.http
      .get<OccConfigurator.Configuration>(
        this.occEndpointsService.buildUrl('readVariantConfiguration', {
          urlParams: { configId },
          queryParams: { groupId, expMode },
        }),
        { context: this.indicateSendUserForAsm() }
      )
      .pipe(
        this.converterService.pipeable(VARIANT_CONFIGURATOR_NORMALIZER),
        tap((resultConfiguration) => {
          this.setExpModeActive(resultConfiguration.kbKey !== undefined);
        }),
        map((resultConfiguration) => {
          return {
            ...resultConfiguration,
            owner: configurationOwner,
          };
        })
      );
  }

  updateConfiguration(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    const configId = configuration.configId;
    const expMode = this.getExpModeRequested();
    const url = this.occEndpointsService.buildUrl(
      'updateVariantConfiguration',
      {
        urlParams: { configId },
        queryParams: { expMode },
      }
    );
    const occConfiguration = this.converterService.convert(
      configuration,
      VARIANT_CONFIGURATOR_SERIALIZER
    );

    return this.http
      .patch<OccConfigurator.Configuration>(url, occConfiguration, {
        context: this.indicateSendUserForAsm(),
      })
      .pipe(
        this.converterService.pipeable(VARIANT_CONFIGURATOR_NORMALIZER),
        tap((resultConfiguration) => {
          this.setExpModeActive(resultConfiguration.kbKey !== undefined);
        }),
        map((resultConfiguration) => {
          return {
            ...resultConfiguration,
            owner: configuration.owner,
          };
        })
      );
  }

  addToCart(
    parameters: Configurator.AddToCartParameters
  ): Observable<CartModification> {
    const url = this.occEndpointsService.buildUrl(
      'addVariantConfigurationToCart',
      { urlParams: { userId: parameters.userId, cartId: parameters.cartId } }
    );

    const occAddToCartParameters = this.converterService.convert(
      parameters,
      VARIANT_CONFIGURATOR_ADD_TO_CART_SERIALIZER
    );

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<CartModification>(url, occAddToCartParameters, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  readConfigurationForCartEntry(
    parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters
  ): Observable<Configurator.Configuration> {
    const expMode = this.getExpModeRequested();
    const url = this.occEndpointsService.buildUrl(
      'readVariantConfigurationForCartEntry',
      {
        urlParams: {
          userId: parameters.userId,
          cartId: parameters.cartId,
          cartEntryNumber: parameters.cartEntryNumber,
        },
        queryParams: { expMode },
      }
    );

    return this.http.get<OccConfigurator.Configuration>(url).pipe(
      this.converterService.pipeable(VARIANT_CONFIGURATOR_NORMALIZER),
      tap((resultConfiguration) => {
        this.setExpModeActive(resultConfiguration.kbKey !== undefined);
      }),
      map((resultConfiguration) => {
        return {
          ...resultConfiguration,
          owner: parameters.owner,
        };
      })
    );
  }

  updateConfigurationForCartEntry(
    parameters: Configurator.UpdateConfigurationForCartEntryParameters
  ): Observable<CartModification> {
    const url = this.occEndpointsService.buildUrl(
      'updateVariantConfigurationForCartEntry',
      {
        urlParams: {
          userId: parameters.userId,
          cartId: parameters.cartId,
          cartEntryNumber: parameters.cartEntryNumber,
        },
      }
    );

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const occUpdateCartEntryParameters = this.converterService.convert(
      parameters,
      VARIANT_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER
    );

    return this.http
      .put<CartModification>(url, occUpdateCartEntryParameters, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  readConfigurationForOrderEntry(
    parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters
  ): Observable<Configurator.Configuration> {
    const url = this.occEndpointsService.buildUrl(
      'readVariantConfigurationOverviewForOrderEntry',
      {
        urlParams: {
          userId: parameters.userId,
          orderId: parameters.orderId,
          orderEntryNumber: parameters.orderEntryNumber,
        },
      }
    );

    return this.http.get<OccConfigurator.Overview>(url).pipe(
      this.converterService.pipeable(VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER),
      map((overview) => {
        const configuration: Configurator.Configuration = {
          configId: overview.configId,
          productCode: overview.productCode,
          groups: [],
          flatGroups: [],
          interactionState: {},
          overview: overview,
          owner: ConfiguratorModelUtils.createInitialOwner(),
        };
        return configuration;
      }),
      map((resultConfiguration) => {
        return {
          ...resultConfiguration,
          owner: parameters.owner,
        };
      })
    );
  }

  readPriceSummary(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    const url = this.occEndpointsService.buildUrl(
      'readVariantConfigurationPriceSummary',
      {
        urlParams: {
          configId: configuration.configId,
        },
        queryParams: { groupId: configuration.interactionState.currentGroup },
      }
    );

    return this.http.get(url, { context: this.indicateSendUserForAsm() }).pipe(
      this.converterService.pipeable(VARIANT_CONFIGURATOR_PRICE_NORMALIZER),
      map((configResult) => {
        const result: Configurator.Configuration = {
          ...configuration,
          priceSummary: configResult.priceSummary,
          priceSupplements: configResult.priceSupplements,
        };
        return result;
      })
    );
  }

  getConfigurationOverview(
    configId: string
  ): Observable<Configurator.Overview> {
    const url = this.occEndpointsService.buildUrl(
      'getVariantConfigurationOverview',
      { urlParams: { configId } }
    );

    return this.http
      .get<OccConfigurator.Overview>(url, {
        context: this.indicateSendUserForAsm(),
      })
      .pipe(
        this.converterService.pipeable(VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER)
      );
  }

  updateConfigurationOverview(
    ovInput: Configurator.Overview
  ): Observable<Configurator.Overview> {
    const url = this.occEndpointsService.buildUrl(
      'getVariantConfigurationOverview',
      { urlParams: { configId: ovInput.configId } }
    );

    const occOverview = this.converterService.convert(
      ovInput,
      VARIANT_CONFIGURATOR_OVERVIEW_SERIALIZER
    );

    return this.http
      .patch<OccConfigurator.Overview>(url, occOverview, {
        context: this.indicateSendUserForAsm(),
      })
      .pipe(
        this.converterService.pipeable(
          VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER
        ),
        map((overview) => ({
          ...overview,
          attributeFilters: ovInput.attributeFilters,
          groupFilters: ovInput.groupFilters,
          possibleGroups: ovInput.possibleGroups,
        }))
      );
  }

  searchVariants(configId: string): Observable<Configurator.Variant[]> {
    const url = this.occEndpointsService.buildUrl(
      'searchConfiguratorVariants',
      { urlParams: { configId } }
    );
    //no need to work with a converter here, as Configurator.Variant is a projection of the OCC
    //variant representation
    return this.http.get<Configurator.Variant[]>(url, {
      context: this.indicateSendUserForAsm(),
    });
  }

  /**
   * Prepares http context indicating that emulated user has to be added to the request in ASM mode
   *
   * The actual calls to the commerce backend will only be changed if the ASM setting
   * userIdHttpHeader:{
   *  enable:true
   * },
   * is active
   * @returns http context indicating that emulated user has to be added to the request in ASM mode
   */
  protected indicateSendUserForAsm(): HttpContext {
    return new HttpContext().set(OCC_HTTP_TOKEN, {
      sendUserIdAsHeader: true,
    });
  }
}
