import {
  FeaturesConfig,
  isFeatureEnabled,
  isFeatureLevel,
} from '@spartacus/core';

describe('Feature Config Utils', () => {
  describe('isFeatureLevel', () => {
    it('should return correct value if feature level is defined', () => {
      const config: FeaturesConfig = {
        features: {
          level: '1.1',
        },
      };
      expect(isFeatureLevel(config, '1.0')).toBeTruthy();
      expect(isFeatureLevel(config, '1.1')).toBeTruthy();
      expect(isFeatureLevel(config, '1.2')).toBeFalsy();
      expect(isFeatureLevel(config, '2.0')).toBeFalsy();
    });
    it('should return correct value if feature level is set to next', () => {
      const config: FeaturesConfig = {
        features: {
          level: 'next',
        },
      };
      expect(isFeatureLevel(config, '1.2')).toBeTruthy();
      expect(isFeatureLevel(config, '2.0')).toBeTruthy();
    });
  });

  describe('isFeatureEnabled', () => {
    it('should return correct value if feature is enabled for level', () => {
      const config: FeaturesConfig = {
        features: {
          level: '1.0',
          testFeature: '1.0',
        },
      };
      expect(isFeatureEnabled(config, 'testFeature')).toBeTruthy();
    });
    it('should return false if feature is disabled for level', () => {
      const config: FeaturesConfig = {
        features: {
          level: '1.0',
          testFeature: '1.2',
        },
      };
      expect(isFeatureEnabled(config, 'testFeature')).toBeFalsy();
    });
    it('should return true if feature is enabled explicitly', () => {
      const config: FeaturesConfig = {
        features: {
          testFeature: true,
        },
      };
      expect(isFeatureEnabled(config, 'testFeature')).toBeTruthy();
    });
    it('should return false if feature is disabled explicitly', () => {
      const config: FeaturesConfig = {
        features: {
          testFeature: false,
        },
      };
      expect(isFeatureEnabled(config, 'testFeature')).toBeFalsy();
    });
  });
});
