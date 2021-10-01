import { EpdVisualizationConfig } from './epd-visualization-config';
import { epdVisualizationConfigValidator } from './epd-visualization-config-validator';
import { getValidConfig } from './epd-visualization-test-config';

describe('epdVisualizationConfigValidator', () => {
  it('should return undefined for valid config', () => {
    const validConfig = getValidConfig();
    expect(epdVisualizationConfigValidator(validConfig)).toBeUndefined();
  });

  let negativeTest = (modifier: (config: EpdVisualizationConfig) => void) => {
    const config = getValidConfig();
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

  it('should warn about an invalid folder usage name', () => {
    negativeTest((config) => {
      if (config.usageIds) {
        config.usageIds.folderUsageId.name = '';
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
});
