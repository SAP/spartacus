import { getTestConfig } from '../testing/epd-visualization-test-config';
import { EpdVisualizationConfig } from './epd-visualization-config';
import { epdVisualizationConfigValidator } from './epd-visualization-config-validator';
import { getEpdVisualizationDefaultConfig } from './epd-visualization-default-config';

describe('epdVisualizationConfigValidator', () => {
  let validConfig = () => {
    const testConfig = getTestConfig();
    const defaultConfig = getEpdVisualizationDefaultConfig();
    const validConfig: EpdVisualizationConfig = {
      epdVisualization: {
        ...testConfig.epdVisualization,
        ...defaultConfig.epdVisualization,
      },
    };
    return validConfig;
  };

  it('should return undefined for valid config', () => {
    expect(epdVisualizationConfigValidator(validConfig())).toBeUndefined();
  });

  let negativeTest = (modifier: (config: EpdVisualizationConfig) => void) => {
    const config = validConfig();
    modifier(config);
    expect(epdVisualizationConfigValidator(config)).toBeTruthy();
  };

  it('should warn about an undefined epdVisualization property', () => {
    negativeTest((config) => {
      delete config.epdVisualization;
    });
  });

  it('should warn about an undefined apis configuration section', () => {
    negativeTest((config) => {
      delete config.epdVisualization?.apis;
    });
  });

  it('should warn about an undefined ui5 configuration section', () => {
    negativeTest((config) => {
      delete config.epdVisualization?.ui5;
    });
  });

  it('should warn about an undefined usageIds configuration section', () => {
    negativeTest((config) => {
      delete config.epdVisualization?.usageIds;
    });
  });

  it('should warn about an empty API base URL', () => {
    negativeTest((config) => {
      if (config.epdVisualization?.apis) {
        config.epdVisualization.apis.baseUrl = '';
      }
    });
  });

  it('should warn about an invalid API base URL', () => {
    negativeTest((config) => {
      if (config.epdVisualization?.apis) {
        config.epdVisualization.apis.baseUrl = 'not a url';
      }
    });
  });

  it('should warn about an invalid protocol in API base URL', () => {
    negativeTest((config) => {
      if (config.epdVisualization?.apis) {
        config.epdVisualization.apis.baseUrl = 'ftp://www.somesite.com/';
      }
    });
  });

  it('should warn about an empty UI5 bootstrap URL', () => {
    negativeTest((config) => {
      if (config.epdVisualization?.ui5) {
        config.epdVisualization.ui5.bootstrapUrl = '';
      }
    });
  });

  it('should warn about an invalid UI5 bootstrap URL', () => {
    negativeTest((config) => {
      if (config.epdVisualization?.ui5) {
        config.epdVisualization.ui5.bootstrapUrl = 'not a url';
      }
    });
  });

  it('should warn about an invalid protocol in UI5 bootstrap URL', () => {
    negativeTest((config) => {
      if (config.epdVisualization?.ui5) {
        config.epdVisualization.ui5.bootstrapUrl = 'ftp://www.somesite.com/';
      }
    });
  });

  it('should warn about an invalid folder UsageId name', () => {
    negativeTest((config) => {
      if (config.epdVisualization?.usageIds) {
        config.epdVisualization.usageIds.folderUsageId.name = '';
      }
    });
  });

  it('should warn about an invalid product UsageId source', () => {
    negativeTest((config) => {
      if (config.epdVisualization?.usageIds) {
        config.epdVisualization.usageIds.productUsageId.source = '';
      }
    });
  });

  it('should warn about an invalid product UsageId category', () => {
    negativeTest((config) => {
      if (config.epdVisualization?.usageIds) {
        config.epdVisualization.usageIds.productUsageId.category = '';
      }
    });
  });

  it('should warn about an invalid product UsageId keyName', () => {
    negativeTest((config) => {
      if (config.epdVisualization?.usageIds) {
        config.epdVisualization.usageIds.productUsageId.keyName = '';
      }
    });
  });

  it('should warn if folder usage has no keys', () => {
    negativeTest((config) => {
      if (config.epdVisualization?.usageIds) {
        config.epdVisualization.usageIds.folderUsageId.keys = [];
      }
    });
  });

  it('should warn if folder usage has invalid key name', () => {
    negativeTest((config) => {
      if (config.epdVisualization?.usageIds) {
        config.epdVisualization.usageIds.folderUsageId.keys[0].name = '';
      }
    });
  });

  it('should warn if folder usage has invalid key value', () => {
    negativeTest((config) => {
      if (config.epdVisualization?.usageIds) {
        config.epdVisualization.usageIds.folderUsageId.keys[0].value = '';
      }
    });
  });

  it('should warn about an undefined visualPicking configuration section', () => {
    negativeTest((config) => {
      if (config.epdVisualization?.visualPicking) {
        delete config.epdVisualization.visualPicking;
      }
    });
  });

  it('should warn if productReferenceType has invalid value', () => {
    negativeTest((config) => {
      if (config.epdVisualization?.visualPicking) {
        config.epdVisualization.visualPicking.productReferenceType = '';
      }
    });
  });
});
