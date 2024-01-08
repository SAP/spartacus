/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CartModification,
  CART_MODIFICATION_NORMALIZER,
} from '@spartacus/cart/base/root';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER,
  CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER,
} from './converters/cpq-configurator-occ.converters';
import {
  CPQ_CONFIGURATOR_NORMALIZER,
  CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER,
  CPQ_CONFIGURATOR_QUANTITY_SERIALIZER,
  CPQ_CONFIGURATOR_SERIALIZER,
} from '../common/converters/cpq-configurator.converters';
import { Cpq } from '../common/cpq.models';

@Injectable({ providedIn: 'root' })
export class CpqConfiguratorOccService {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  addToCart(
    parameters: Configurator.AddToCartParameters
  ): Observable<CartModification> {
    const url = this.occEndpointsService.buildUrl('addCpqConfigurationToCart', {
      urlParams: {
        userId: parameters.userId,
        cartId: parameters.cartId,
      },
    });

    const occAddToCartParameters = this.converterService.convert(
      parameters,
      CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER
    );

    return this.http
      .post<CartModification>(url, occAddToCartParameters)
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  updateCartEntry(
    parameters: Configurator.UpdateConfigurationForCartEntryParameters
  ): Observable<CartModification> {
    const url = this.occEndpointsService.buildUrl(
      'updateCpqConfigurationForCartEntry',
      {
        urlParams: {
          userId: parameters.userId,
          cartId: parameters.cartId,
          cartEntryNumber: parameters.cartEntryNumber,
        },
      }
    );

    const occUpdateCartEntryParameters = this.converterService.convert(
      parameters,
      CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER
    );

    return this.http
      .put<CartModification>(url, occUpdateCartEntryParameters)
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  getConfigIdForCartEntry(
    parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters
  ): Observable<string> {
    const url = this.occEndpointsService.buildUrl(
      'readCpqConfigurationForCartEntry',
      {
        urlParams: {
          userId: parameters.userId,
          cartId: parameters.cartId,
          cartEntryNumber: parameters.cartEntryNumber,
        },
      }
    );

    return this.http.get<{ configId: string }>(url).pipe(
      map((response) => {
        return response.configId;
      })
    );
  }

  getConfigIdForOrderEntry(
    parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters
  ): Observable<string> {
    const url = this.occEndpointsService.buildUrl(
      'readCpqConfigurationForOrderEntry',
      {
        urlParams: {
          userId: parameters.userId,
          orderId: parameters.orderId,
          orderEntryNumber: parameters.orderEntryNumber,
        },
      }
    );

    return this.http.get<{ configId: string }>(url).pipe(
      map((response) => {
        return response.configId;
      })
    );
  }

  /**
   * Creates a new default runtime configuration for the given product id
   * and read it from the CPQ system over OCC.
   *
   * @param {string} productSystemId - Product system ID
   * @returns {Observable<Configurator.Configuration>} - Created configuration
   */
  createConfiguration(
    productSystemId: string
  ): Observable<Configurator.Configuration> {
    return this.callCreateConfiguration(productSystemId).pipe(
      this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER)
    );
  }

  /**
   * Retrieves a configuration from the CPQ system over OCC by its configuration ID and for a certain tab.
   *
   * @param {string} configId - Configuration ID
   * @param {string} tabId - Tab ID
   * @returns {Observable<Configurator.Configuration>} - Retrieved configuration
   */
  readConfiguration(
    configId: string,
    tabId?: string
  ): Observable<Configurator.Configuration> {
    return this.callReadConfiguration(configId, tabId).pipe(
      this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER)
    );
  }

  /**
   * Retrieves a configuration overview from the CPQ system over OCC by its configuration ID.
   *
   * @param {string} configId - Configuration ID
   * @returns {Observable<Configurator.Overview>} - Retrieved overview
   */
  readConfigurationOverview(
    configId: string
  ): Observable<Configurator.Overview> {
    return this.callReadConfigurationOverview(configId).pipe(
      this.converterService.pipeable(CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER)
    );
  }

  /**
   * Updates an attribute of the runtime configuration for the given configuration id and attribute code
   * and read the desired configuration tab from the CPQ system over OCC.
   *
   * @param {Configurator.Configuration} configuration - Configuration
   * @returns {Observable<Configurator.Configuration>} - Updated configuration
   */
  updateAttribute(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    const updateAttribute: Cpq.UpdateAttribute = this.converterService.convert(
      configuration,
      CPQ_CONFIGURATOR_SERIALIZER
    );
    return this.callUpdateAttribute(updateAttribute).pipe(
      this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER)
    );
  }

  /**
   * Updates a quantity for an attribute of the runtime configuration for the given configuration id and attribute code
   * and read the desired configuration tab from the CPQ system over OCC.
   *
   * @param {Configurator.Configuration} configuration - Configuration
   * @returns {Observable<Configurator.Configuration>} - Updated configuration
   */
  updateValueQuantity(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    const updateValue: Cpq.UpdateValue = this.converterService.convert(
      configuration,
      CPQ_CONFIGURATOR_QUANTITY_SERIALIZER
    );
    return this.callUpdateValue(updateValue).pipe(
      this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER)
    );
  }

  /**
   * Retrieves a configuration assigned to a cart entry.
   *
   * @param {CommonConfigurator.ReadConfigurationFromCartEntryParameters} parameters - Cart entry parameters
   * @returns {Observable<Configurator.Configuration>} - Retrieved configuration
   */
  readConfigurationForCartEntry(
    parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters
  ): Observable<Configurator.Configuration> {
    return this.callReadConfigurationForCartEntry(parameters).pipe(
      this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER)
    );
  }

  /**
   * Retrieves a configuration assigned to an order entry.
   *
   * @param {CommonConfigurator.ReadConfigurationFromOrderEntryParameters} parameters - Order entry parameters
   * @returns {Observable<Configurator.Configuration>} - Retrieved configuration
   */
  readConfigurationForOrderEntry(
    parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters
  ): Observable<Configurator.Configuration> {
    return this.callReadConfigurationForOrderEntry(parameters).pipe(
      this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER)
    );
  }

  protected callCreateConfiguration(
    productSystemId: string
  ): Observable<Cpq.Configuration> {
    const url = this.occEndpointsService.buildUrl('createCpqConfiguration', {
      urlParams: {
        productCode: productSystemId,
      },
    });
    return this.http.get<Cpq.Configuration>(url);
  }

  protected callReadConfiguration(
    configId: string,
    tabId?: string
  ): Observable<Cpq.Configuration> {
    const url = this.occEndpointsService.buildUrl('readCpqConfiguration', {
      urlParams: {
        configurationId: configId,
      },
      queryParams: tabId ? { tabId: tabId } : undefined,
    });
    return this.http.get<Cpq.Configuration>(url);
  }

  protected callReadConfigurationOverview(
    configId: string
  ): Observable<Cpq.Configuration> {
    const url = this.occEndpointsService.buildUrl(
      'readCpqConfigurationOverview',
      {
        urlParams: {
          configurationId: configId,
        },
      }
    );
    return this.http.get<Cpq.Configuration>(url);
  }

  protected callUpdateAttribute(
    updateAttribute: Cpq.UpdateAttribute
  ): Observable<Cpq.Configuration> {
    const url = this.occEndpointsService.buildUrl('updateCpqAttribute', {
      urlParams: {
        configurationId: updateAttribute.configurationId,
        attributeCode: updateAttribute.standardAttributeCode,
      },
      queryParams: { tabId: updateAttribute.tabId },
    });
    return this.http.patch<Cpq.Configuration>(
      url,
      updateAttribute.changeAttributeValue
    );
  }

  protected callUpdateValue(
    updateValue: Cpq.UpdateValue
  ): Observable<Cpq.Configuration> {
    const url = this.occEndpointsService.buildUrl(
      'updateCpqAttributeValueQuantity',
      {
        urlParams: {
          configurationId: updateValue.configurationId,
          attributeCode: updateValue.standardAttributeCode,
          attributeValueId: updateValue.attributeValueId,
        },
        queryParams: { tabId: updateValue.tabId },
      }
    );
    return this.http.patch<Cpq.Configuration>(url, {
      quantity: updateValue.quantity,
    });
  }

  protected callReadConfigurationForCartEntry(
    parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters
  ): Observable<Cpq.Configuration> {
    const url = this.occEndpointsService.buildUrl(
      'readCpqConfigurationForCartEntryFull',
      {
        urlParams: {
          userId: parameters.userId,
          cartId: parameters.cartId,
          cartEntryNumber: parameters.cartEntryNumber,
        },
      }
    );
    return this.http.get<Cpq.Configuration>(url);
  }

  protected callReadConfigurationForOrderEntry(
    parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters
  ): Observable<Cpq.Configuration> {
    const url = this.occEndpointsService.buildUrl(
      'readCpqConfigurationForOrderEntryFull',
      {
        urlParams: {
          userId: parameters.userId,
          orderId: parameters.orderId,
          orderEntryNumber: parameters.orderEntryNumber,
        },
      }
    );
    return this.http.get<Cpq.Configuration>(url);
  }
}
