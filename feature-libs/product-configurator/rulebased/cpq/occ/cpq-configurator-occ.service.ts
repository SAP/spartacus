/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CART_MODIFICATION_NORMALIZER,
  CartModification,
} from '@spartacus/cart/base/root';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CPQ_CONFIGURATOR_NORMALIZER,
  CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER,
  CPQ_CONFIGURATOR_QUANTITY_SERIALIZER,
  CPQ_CONFIGURATOR_SERIALIZER,
} from '../common/converters/cpq-configurator.converters';
import { Cpq } from '../common/cpq.models';
import {
  CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER,
  CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER,
} from './converters/cpq-configurator-occ.converters';

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
   * @param productSystemId - Product system ID
   * @returns Created configuration
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
   * @param configId - Configuration ID
   * @param tabId - Tab ID
   * @returns Retrieved configuration
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
   * @param configId - Configuration ID
   * @returns Retrieved overview
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
   * @param configuration - Configuration
   * @returns Updated configuration
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
   * @param configuration - Configuration
   * @returns Updated configuration
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
   * Adds a new container row to the CPQ configuration and returns the resulting configuration.
   *
   * @param parameters - Add container row parameters
   * @returns Updated configuration
   */
  addContainerRow(
    parameters: Configurator.AddContainerRowParameters
  ): Observable<Configurator.Configuration> {
    return this.callAddContainerRow(parameters).pipe(
      this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER)
    );
  }

  /**
   * Copies a container row of the CPQ configuration and returns the resulting configuration.
   *
   * @param parameters - Copy container row parameters
   * @returns - Updated configuration
   */
  copyContainerRow(
    parameters: Configurator.CopyContainerRowParameters
  ): Observable<Configurator.Configuration> {
    return this.callCopyContainerRow(parameters).pipe(
      this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER)
    );
  }

  /**
   * Deletes a container row from the CPQ configuration and returns the resulting configuration.
   *
   * @param parameters - Remove container row parameters
   * @returns Updated configuration
   */
  removeContainerRow(
    parameters: Configurator.RemoveContainerRowParameters
  ): Observable<Configurator.Configuration> {
    return this.callRemoveContainerRow(parameters).pipe(
      this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER)
    );
  }

  /**
   * Retrieves a configuration assigned to a cart entry.
   *
   * @param parameters - Cart entry parameters
   * @returns Retrieved configuration
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
   * @param parameters - Order entry parameters
   * @returns Retrieved configuration
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
      queryParams: {
        tabId: updateAttribute.tabId,
        ...(updateAttribute.rowId ? { rowId: updateAttribute.rowId } : {}),
      },
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
        queryParams: {
          tabId: updateValue.tabId,
          ...(updateValue.rowId ? { rowId: updateValue.rowId } : {}),
        },
      }
    );
    return this.http.patch<Cpq.Configuration>(url, {
      quantity: updateValue.quantity,
    });
  }

  protected callAddContainerRow(
    parameters: Configurator.AddContainerRowParameters
  ): Observable<Cpq.Configuration> {
    const url = this.occEndpointsService.buildUrl('createCpqContainerRow', {
      urlParams: {
        configurationId: parameters.configId,
      },
    });
    const body: Cpq.AddContainerRowInput = {
      stdAttrCode: parameters.stdAttrCode,
      productSystemId: parameters.productSystemId,
    };
    if (parameters.parentRowId) {
      body.parentRowId = parameters.parentRowId;
    }
    return this.http.post<Cpq.Configuration>(url, body);
  }

  protected callCopyContainerRow(
    parameters: Configurator.CopyContainerRowParameters
  ): Observable<Cpq.Configuration> {
    const url = this.occEndpointsService.buildUrl('copyCpqContainerRow', {
      urlParams: {
        configurationId: parameters.configId,
        rowId: parameters.rowId,
      },
    });
    return this.http.post<Cpq.Configuration>(url, null);
  }

  protected callRemoveContainerRow(
    parameters: Configurator.RemoveContainerRowParameters
  ): Observable<Cpq.Configuration> {
    const url = this.occEndpointsService.buildUrl('removeCpqContainerRow', {
      urlParams: {
        configurationId: parameters.configId,
        rowId: parameters.rowId,
      },
    });
    return this.http.delete<Cpq.Configuration>(url);
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
    let url;
    const ownerType = parameters.owner.type;
    if (ownerType === CommonConfigurator.OwnerType.ORDER_ENTRY) {
      url = this.occEndpointsService.buildUrl(
        'readCpqConfigurationForOrderEntryFull',
        {
          urlParams: {
            userId: parameters.userId,
            orderId: parameters.orderId,
            orderEntryNumber: parameters.orderEntryNumber,
          },
        }
      );
    } else if (ownerType === CommonConfigurator.OwnerType.QUOTE_ENTRY) {
      url = this.occEndpointsService.buildUrl(
        'readCpqConfigurationForQuoteEntryFull',
        {
          urlParams: {
            userId: parameters.userId,
            quoteId: parameters.orderId,
            quoteEntryNumber: parameters.orderEntryNumber,
          },
        }
      );
    } else {
      url = this.occEndpointsService.buildUrl(
        'readCpqConfigurationForSavedCartEntryFull',
        {
          urlParams: {
            userId: parameters.userId,
            savedCartId: parameters.orderId,
            entryNumber: parameters.orderEntryNumber,
          },
        }
      );
    }
    return this.http.get<Cpq.Configuration>(url);
  }
}
