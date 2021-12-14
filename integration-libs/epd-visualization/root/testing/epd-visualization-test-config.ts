import { EpdVisualizationConfig } from '../config/epd-visualization-config';

export function getTestConfig(): EpdVisualizationConfig {
  return {
    epdVisualization: {
      apis: {
        baseUrl:
          'https://epd-acc-eu20-consumer.epdacc.cfapps.eu20.hana.ondemand.com',
      },
      ui5: {
        bootstrapUrl:
          'https://sapui5.hana.ondemand.com/1.97.0/resources/sap-ui-core.js',
      },
    },
  };
}
