import { EpdVisualizationConfig } from '../config/epd-visualization-config';

export function getEpdVisualizationDefaultConfig(): EpdVisualizationConfig {
  return {
    epdVisualization: {
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
    },
  };
}
