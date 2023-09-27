/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export function defaultOccCpqConfiguratorConfigFactory(): OccConfig {
  return {
    backend: {
      occ: {
        endpoints: {
          getCpqAccessData: 'users/${userId}/access/cpqconfigurator',
          addCpqConfigurationToCart:
            'users/${userId}/carts/${cartId}/entries/cpqconfigurator',
          readCpqConfigurationForCartEntry:
            'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/cpqconfigurator',
          readCpqConfigurationForOrderEntry:
            'users/${userId}/orders/${orderId}/entries/${orderEntryNumber}/cpqconfigurator',
          updateCpqConfigurationForCartEntry:
            'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/cpqconfigurator',
          createCpqConfiguration:
            'products/${productCode}/configurators/cpqconfigurator',
          readCpqConfiguration:
            'cpqconfigurator/${configurationId}/configuration?tabId=${tabId}',
          readCpqConfigurationOverview:
            'cpqconfigurator/${configurationId}/configurationOverview',
          updateCpqAttribute:
            'cpqconfigurator/${configurationId}/attributes/${attributeCode}?tabId=${tabId}',
          updateCpqAttributeValueQuantity:
            'cpqconfigurator/${configurationId}/attributes/${attributeCode}/values/${attributeValueId}?tabId=${tabId}',
          readCpqConfigurationForCartEntryFull:
            'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/cpqconfigurator/configuration',
          readCpqConfigurationForOrderEntryFull:
            'users/${userId}/orders/${orderId}/entries/${orderEntryNumber}/cpqconfigurator/configuration',
        },
      },
    },
  };
}
