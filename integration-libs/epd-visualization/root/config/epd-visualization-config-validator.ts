/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { UsageId, UsageIdDefinition } from '../models';
import { getUrl, isHttpOrHttps } from '../util/url-utils';
import {
  EpdVisualizationConfig,
  EpdVisualizationInnerConfig,
  UsageIdConfig,
} from './epd-visualization-config';

type ValidationFunction = (
  epdVisualizationConfig: EpdVisualizationConfig
) => string | null;

export function epdVisualizationConfigValidator(
  epdVisualizationConfig: EpdVisualizationConfig
): string | void {
  const validationFunctions: ValidationFunction[] = [
    validateEpdVisualization,
    validateApis,
    validateUi5,
    validateUsageIds,
    validateFolderUsageId,
    validateProductUsageId,
    validateVisualPicking,
  ];

  for (var validationFunction of validationFunctions) {
    const errorMessage = validationFunction(epdVisualizationConfig);
    if (errorMessage !== null) {
      return errorMessage;
    }
  }
}

function validateEpdVisualization(
  epdVisualizationConfig: EpdVisualizationConfig
): string | null {
  const epdVisualization = epdVisualizationConfig.epdVisualization;
  if (!epdVisualization) {
    return unconfiguredPropertyMessage('epdVisualization');
  }
  return null;
}

function validateApis(
  epdVisualizationConfig: EpdVisualizationConfig
): string | null {
  const epdVisualization =
    epdVisualizationConfig.epdVisualization as EpdVisualizationInnerConfig;
  if (!epdVisualization.apis) {
    return unconfiguredPropertyMessage('epdVisualization.apis');
  }

  const configApisBaseUrlProperty = 'epdVisualization.apis.baseUrl';
  if (!epdVisualization.apis.baseUrl) {
    return unconfiguredPropertyMessage(configApisBaseUrlProperty);
  }

  const apiBaseUrl = getUrl(epdVisualization.apis.baseUrl);
  if (!apiBaseUrl) {
    return invalidUrlMessage(
      configApisBaseUrlProperty,
      epdVisualization.apis.baseUrl
    );
  }
  if (!isHttpOrHttps(apiBaseUrl)) {
    return invalidUrlProtocolMessage(configApisBaseUrlProperty);
  }
  return null;
}

function validateUi5(
  epdVisualizationConfig: EpdVisualizationConfig
): string | null {
  const epdVisualization =
    epdVisualizationConfig.epdVisualization as EpdVisualizationInnerConfig;
  if (!epdVisualization.ui5) {
    return unconfiguredPropertyMessage('epdVisualization.ui5');
  }

  const configUi5BootstrapUrlProperty = 'epdVisualization.ui5.bootstrapUrl';
  if (!epdVisualization.ui5.bootstrapUrl) {
    return unconfiguredPropertyMessage(configUi5BootstrapUrlProperty);
  }

  const ui5BootStrapUrl = getUrl(epdVisualization.ui5.bootstrapUrl);
  if (!ui5BootStrapUrl) {
    return invalidUrlMessage(
      configUi5BootstrapUrlProperty,
      epdVisualization.ui5.bootstrapUrl
    );
  }

  if (!isHttpOrHttps(ui5BootStrapUrl)) {
    return invalidUrlProtocolMessage(configUi5BootstrapUrlProperty);
  }
  return null;
}

function validateFolderUsageId(
  epdVisualizationConfig: EpdVisualizationConfig
): string | null {
  const epdVisualization =
    epdVisualizationConfig.epdVisualization as EpdVisualizationInnerConfig;
  const usageIds: UsageIdConfig = epdVisualization.usageIds as UsageIdConfig;
  const folderUsageId: UsageId = usageIds.folderUsageId;
  if (!folderUsageId.name) {
    return unconfiguredPropertyMessage(
      'epdVisualization.usageIds.folderUsageId.name'
    );
  }
  if (!folderUsageId.keys || !folderUsageId.keys.length) {
    return unconfiguredPropertyMessage(
      'epdVisualization.usageIds.folderUsageId.keys'
    );
  }
  for (let i = 0; i < folderUsageId.keys.length; i++) {
    if (!folderUsageId.keys[i].name) {
      return unconfiguredPropertyMessage(
        `epdVisualization.usageIds.folderUsageId.keys[${i}].name`
      );
    }
    if (!folderUsageId.keys[i].value) {
      return unconfiguredPropertyMessage(
        `epdVisualization.usageIds.folderUsageId.keys[${i}].value`
      );
    }
  }
  return null;
}

function validateProductUsageId(
  epdVisualizationConfig: EpdVisualizationConfig
): string | null {
  const epdVisualization =
    epdVisualizationConfig.epdVisualization as EpdVisualizationInnerConfig;
  const usageIds: UsageIdConfig = epdVisualization.usageIds as UsageIdConfig;
  const productUsageId: UsageIdDefinition = usageIds.productUsageId;
  if (!productUsageId.source) {
    return unconfiguredPropertyMessage(
      'epdVisualization.usageIds.productUsageId.source'
    );
  }
  if (!productUsageId.category) {
    return unconfiguredPropertyMessage(
      'epdVisualization.usageIds.productUsageId.category'
    );
  }
  if (!productUsageId.keyName) {
    return unconfiguredPropertyMessage(
      'epdVisualization.usageIds.productUsageId.keyName'
    );
  }
  return null;
}

function validateUsageIds(
  epdVisualizationConfig: EpdVisualizationConfig
): string | null {
  const epdVisualization =
    epdVisualizationConfig.epdVisualization as EpdVisualizationInnerConfig;
  if (!epdVisualization.usageIds) {
    return unconfiguredPropertyMessage('epdVisualization.usageIds');
  }

  return null;
}

function validateVisualPicking(
  epdVisualizationConfig: EpdVisualizationConfig
): string | null {
  const epdVisualization =
    epdVisualizationConfig.epdVisualization as EpdVisualizationInnerConfig;
  if (!epdVisualization.visualPicking) {
    return unconfiguredPropertyMessage('epdVisualization.visualPicking');
  }

  if (!epdVisualization.visualPicking.productReferenceType) {
    return unconfiguredPropertyMessage(
      'epdVisualization.visualPicking.productReferenceType'
    );
  }
  return null;
}

function unconfiguredPropertyMessage(propertyName: string) {
  return `No value configured for ${propertyName} in the EPD Visualization library configuration.`;
}

function invalidUrlMessage(propertyName: string, url: string) {
  return `URL value '${url}' configured for ${propertyName} in the EPD Visualization library configuration is not valid.`;
}

function invalidUrlProtocolMessage(propertyName: string) {
  return `URL for ${propertyName} must use HTTPS or HTTP protocol.`;
}
