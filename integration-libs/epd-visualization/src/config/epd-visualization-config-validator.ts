import { getUrl, isHttpOrHttps } from '../util/url-utils';
import { EpdVisualizationConfig } from './epd-visualization-config';

export function epdVisualizationConfigValidator(
  config: EpdVisualizationConfig
): string | void {
  // -- apis section

  if (!config.apis) {
    return unconfiguredPropertyMessage('config.apis');
  }

  const configApisBaseUrlProperty = 'config.apis.baseUrl';
  if (!config.apis.baseUrl) {
    return unconfiguredPropertyMessage(configApisBaseUrlProperty);
  }

  const apiBaseUrl = getUrl(config.apis.baseUrl);
  if (!apiBaseUrl) {
    return invalidUrlMessage(configApisBaseUrlProperty, config.apis.baseUrl);
  }
  if (!isHttpOrHttps(apiBaseUrl)) {
    return invalidUrlProtocolMessage(configApisBaseUrlProperty);
  }

  // -- ui5 section

  if (!config.ui5) {
    return unconfiguredPropertyMessage('config.ui5');
  }

  const configUi5BootstrapUrlProperty = 'config.ui5.bootstrapUrl';
  if (!config.ui5.bootstrapUrl) {
    return unconfiguredPropertyMessage(configUi5BootstrapUrlProperty);
  }

  const ui5BootStrapUrl = getUrl(config.ui5.bootstrapUrl);
  if (!ui5BootStrapUrl) {
    return invalidUrlMessage(
      configUi5BootstrapUrlProperty,
      config.ui5.bootstrapUrl
    );
  }

  if (!isHttpOrHttps(ui5BootStrapUrl)) {
    return invalidUrlProtocolMessage(configUi5BootstrapUrlProperty);
  }

  // -- usageIds section

  if (!config.usageIds) {
    return unconfiguredPropertyMessage('config.usageIds');
  }
  if (!config.usageIds.folderUsageId) {
    return unconfiguredPropertyMessage('config.usageIds.folderUsageId');
  }
  if (!config.usageIds.folderUsageId.name) {
    return unconfiguredPropertyMessage('config.usageIds.folderUsageId.name');
  }
  if (
    !config.usageIds.folderUsageId.keys ||
    !config.usageIds.folderUsageId.keys.length
  ) {
    return unconfiguredPropertyMessage('config.usageIds.folderUsageId.keys');
  }
  for (let i = 0; i < config.usageIds.folderUsageId.keys.length; i++) {
    if (!config.usageIds.folderUsageId.keys[i].name) {
      return unconfiguredPropertyMessage(
        `config.usageIds.folderUsageId.keys[${i}].name`
      );
    }
    if (!config.usageIds.folderUsageId.keys[i].value) {
      return unconfiguredPropertyMessage(
        `config.usageIds.folderUsageId.keys[${i}].value`
      );
    }
  }

  if (!config.usageIds.sparePartUsageId) {
    return unconfiguredPropertyMessage('config.usageIds.folderUsageId');
  }
  if (!config.usageIds.sparePartUsageId.source) {
    return unconfiguredPropertyMessage(
      'config.usageIds.sparePartUsageId.source'
    );
  }
  if (!config.usageIds.sparePartUsageId.category) {
    return unconfiguredPropertyMessage(
      'config.usageIds.sparePartUsageId.category'
    );
  }
  if (!config.usageIds.sparePartUsageId.keyName) {
    return unconfiguredPropertyMessage(
      'config.usageIds.sparePartUsageId.keyName'
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
