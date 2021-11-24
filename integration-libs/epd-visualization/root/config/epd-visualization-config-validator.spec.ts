import { EpdVisualizationConfig } from './epd-visualization-config';
import { epdVisualizationConfigValidator } from './epd-visualization-config-validator';
import { getTestConfig } from './epd-visualization-test-config';

describe('epdVisualizationConfigValidator', () => {
  it('should return undefined for valid config', () => {
    const validConfig = getTestConfig();
    expect(epdVisualizationConfigValidator(validConfig)).toBeUndefined();
  });

  let negativeTest = (modifier: (config: EpdVisualizationConfig) => void) => {
    const config = getTestConfig();
    modifier(config);
    expect(epdVisualizationConfigValidator(config)).toBeTruthy();
  };

  it('should warn about an undefined apis configuration section', () => {
    negativeTest((config) => {
      delete config.apis;
    });
  });

  it('should warn about an undefined ui5 configuration section', () => {
    negativeTest((config) => {
      delete config.ui5;
    });
  });

  it('should warn about an undefined usageIds configuration section', () => {
    negativeTest((config) => {
      delete config.usageIds;
    });
  });

  it('should warn about an empty API base URL', () => {
    negativeTest((config) => {
      if (config.apis) {
        config.apis.baseUrl = '';
      }
    });
  });

  it('should warn about an invalid API base URL', () => {
    negativeTest((config) => {
      if (config.apis) {
        config.apis.baseUrl = 'not a url';
      }
    });
  });

  it('should warn about an invalid protocol in API base URL', () => {
    negativeTest((config) => {
      if (config.apis) {
        config.apis.baseUrl = 'ftp://www.somesite.com/';
      }
    });
  });

  it('should warn about an empty UI5 bootstrap URL', () => {
    negativeTest((config) => {
      if (config.ui5) {
        config.ui5.bootstrapUrl = '';
      }
    });
  });

  it('should warn about an invalid UI5 bootstrap URL', () => {
    negativeTest((config) => {
      if (config.ui5) {
        config.ui5.bootstrapUrl = 'not a url';
      }
    });
  });

  it('should warn about an invalid protocol in UI5 bootstrap URL', () => {
    negativeTest((config) => {
      if (config.ui5) {
        config.ui5.bootstrapUrl = 'ftp://www.somesite.com/';
      }
    });
  });

  it('should warn about an invalid folder UsageId name', () => {
    negativeTest((config) => {
      if (config.usageIds) {
        config.usageIds.folderUsageId.name = '';
      }
    });
  });

  it('should warn about an invalid product UsageId source', () => {
    negativeTest((config) => {
      if (config.usageIds) {
        config.usageIds.productUsageId.source = '';
      }
    });
  });

  it('should warn about an invalid product UsageId category', () => {
    negativeTest((config) => {
      if (config.usageIds) {
        config.usageIds.productUsageId.category = '';
      }
    });
  });

  it('should warn about an invalid product UsageId keyName', () => {
    negativeTest((config) => {
      if (config.usageIds) {
        config.usageIds.productUsageId.keyName = '';
      }
    });
  });

  it('should warn if folder usage has no keys', () => {
    negativeTest((config) => {
      if (config.usageIds) {
        config.usageIds.folderUsageId.keys = [];
      }
    });
  });

  it('should warn if folder usage has invalid key name', () => {
    negativeTest((config) => {
      if (config.usageIds) {
        config.usageIds.folderUsageId.keys[0].name = '';
      }
    });
  });

  it('should warn if folder usage has invalid key value', () => {
    negativeTest((config) => {
      if (config.usageIds) {
        config.usageIds.folderUsageId.keys[0].value = '';
      }
    });
  });

  it('should warn about an undefined visualPicking configuration section', () => {
    negativeTest((config) => {
      if (config.visualPicking) {
        delete config.visualPicking;
      }
    });
  });

  it('should warn if productReferenceType has invalid value', () => {
    negativeTest((config) => {
      if (config.visualPicking) {
        config.visualPicking.productReferenceType = '';
      }
    });
  });
});
