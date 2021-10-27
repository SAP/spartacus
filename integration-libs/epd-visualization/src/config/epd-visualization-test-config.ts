import { EpdVisualizationConfig } from './epd-visualization-config';

// Not part of the public API. Just used for tests.

export function getValidConfig() {
  return <EpdVisualizationConfig>{
    apis: {
      baseUrl:
        'https://epd-dev-eu20-consumer.epddev.cfapps.eu20.hana.ondemand.com',
    },
    ui5: {
      bootstrapUrl:
        'https://sapui5.hana.ondemand.com/1.95.0/resources/sap-ui-core.js',
    },
    usageIds: {
      folderUsageId: {
        name: 'CommerceCloud-Folder',
        keys: [
          {
            name: 'Function',
            value: 'Online',
          },
        ],
      },
      productUsageId: {
        name: 'CommerceCloud-SparePart',
        source: 'CommerceCloud',
        category: 'SpareParts',
        keyName: 'ProductCode',
      },
    },
    visualPicking: {
      productReferenceType: 'SPAREPART',
    },
  };
}
