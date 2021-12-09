import { getUrl, isHttpOrHttps } from '../util/url-utils';
import { EpdVisualizationConfig } from './epd-visualization-config';

export function epdVisualizationConfigValidator(
  epdVisualizationConfig: EpdVisualizationConfig
): string | void {
  // -- epdVisualization

  const epdVisualization = epdVisualizationConfig.epdVisualization;
  if (!epdVisualization) {
    return unconfiguredPropertyMessage('epdVisualization');
  }

  // -- apis section

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

  // -- ui5 section

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

  // -- usageIds section

  if (!epdVisualization.usageIds) {
    return unconfiguredPropertyMessage('epdVisualization.usageIds');
  }
  if (!epdVisualization.usageIds.folderUsageId.name) {
    return unconfiguredPropertyMessage(
      'epdVisualization.usageIds.folderUsageId.name'
    );
  }
  if (
    !epdVisualization.usageIds.folderUsageId.keys ||
    !epdVisualization.usageIds.folderUsageId.keys.length
  ) {
    return unconfiguredPropertyMessage(
      'epdVisualization.usageIds.folderUsageId.keys'
    );
  }
  for (
    let i = 0;
    i < epdVisualization.usageIds.folderUsageId.keys.length;
    i++
  ) {
    if (!epdVisualization.usageIds.folderUsageId.keys[i].name) {
      return unconfiguredPropertyMessage(
        `epdVisualization.usageIds.folderUsageId.keys[${i}].name`
      );
    }
    if (!epdVisualization.usageIds.folderUsageId.keys[i].value) {
      return unconfiguredPropertyMessage(
        `epdVisualization.usageIds.folderUsageId.keys[${i}].value`
      );
    }
  }

  if (!epdVisualization.usageIds.productUsageId.source) {
    return unconfiguredPropertyMessage(
      'epdVisualization.usageIds.productUsageId.source'
    );
  }
  if (!epdVisualization.usageIds.productUsageId.category) {
    return unconfiguredPropertyMessage(
      'epdVisualization.usageIds.productUsageId.category'
    );
  }
  if (!epdVisualization.usageIds.productUsageId.keyName) {
    return unconfiguredPropertyMessage(
      'epdVisualization.usageIds.productUsageId.keyName'
    );
  }

  // -- visualPicking section

  if (!epdVisualization.visualPicking) {
    return unconfiguredPropertyMessage('epdVisualization.visualPicking');
  }

  if (!epdVisualization.visualPicking.productReferenceType) {
    return unconfiguredPropertyMessage(
      'epdVisualization.visualPicking.productReferenceType'
    );
  }
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
