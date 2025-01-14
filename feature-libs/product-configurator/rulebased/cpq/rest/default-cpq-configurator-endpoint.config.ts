/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CpqConfiguratorEndpointConfig } from './cpq-configurator-endpoint.config';
/**
 * @deprecated since 2211.25. Not needed for commerce based CPQ orchestration (which is the default communication flavour).
 * Refer to configuration setting ConfiguratorCoreConfig.productConfigurator.cpqOverOcc = true.
 * The other flavour (performing direct calls from composable storefront to CPQ) is technically no longer supported.
 */
export const defaultCpqConfiguratorEndpointConfig: CpqConfiguratorEndpointConfig =
  {
    backend: {
      cpq: {
        endpoints: {
          configurationInit: 'configurations',
          configurationDisplay: 'configurations/${configId}/display',
          attributeUpdate:
            'configurations/${configId}/attributes/${attributeCode}',
          valueUpdate:
            'configurations/${configId}/attributes/${attributeCode}/attributeValues/${valueCode}',
        },
        prefix: '/api/configuration/v1/',
      },
    },
  };
