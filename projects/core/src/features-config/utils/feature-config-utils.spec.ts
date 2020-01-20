import {
  FeaturesConfig,
  isFeatureEnabled,
  isFeatureLevel,
} from '@spartacus/core';

describe('Feature Config Utils', () => {
  describe('isFeatureLevel', () => {
    describe('when feature level is defined', () => {
      const config: FeaturesConfig = {
        features: {
          level: '1.3',
        },
      };
      it('should return true for lower levels', () => {
        expect(isFeatureLevel(config, '1.0')).toBeTruthy();
        expect(isFeatureLevel(config, '1.02')).toBeTruthy();
        expect(isFeatureLevel(config, '1.2.9')).toBeTruthy();
      });
      it('should return true for equal levels', () => {
        expect(isFeatureLevel(config, '1.3')).toBeTruthy();
        expect(isFeatureLevel(config, '1.3.0')).toBeTruthy();
      });
      it('should return false for higher levels', () => {
        expect(isFeatureLevel(config, '1.5')).toBeFalsy();
        expect(isFeatureLevel(config, '2.0')).toBeFalsy();
        expect(isFeatureLevel(config, '1.3.1')).toBeFalsy();
        expect(isFeatureLevel(config, '1.20')).toBeFalsy();
      });
      it('should return false for negate values', () => {
        expect(isFeatureLevel(config, '!1.2')).toBeFalsy();
        expect(isFeatureLevel(config, '!1.3')).toBeFalsy();
        expect(isFeatureLevel(config, '!1.5')).toBeTruthy();
      });
    });
    it('should return correct value if feature level is set to * (latest)', () => {
      const config: FeaturesConfig = {
        features: {
          level: '*',
        },
      };
      expect(isFeatureLevel(config, '1.2')).toBeTruthy();
      expect(isFeatureLevel(config, '2.0')).toBeTruthy();
    });
  });

  describe('isFeatureEnabled', () => {
    describe('feature enabled for level', () => {
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

      it('should return false if feature is disabled for level with negation', () => {
        const config: FeaturesConfig = {
          features: {
            level: '1.3',
            testFeature: '1.2',
          },
        };
        expect(isFeatureEnabled(config, '!testFeature')).toBeFalsy();
      });

      it('should return true if feature is disabled for level with negation', () => {
        const config: FeaturesConfig = {
          features: {
            level: '1.0',
            testFeature: '1.2',
          },
        };

        expect(isFeatureEnabled(config, '!testFeature')).toBeTruthy();
      });
    });

    describe('feature enabled explicitly', () => {
      it('should return true if feature is enabled', () => {
        const config: FeaturesConfig = {
          features: {
            testFeature: true,
          },
        };
        expect(isFeatureEnabled(config, 'testFeature')).toBeTruthy();
      });
      it('should return false if feature is disabled', () => {
        const config: FeaturesConfig = {
          features: {
            testFeature: false,
          },
        };
        expect(isFeatureEnabled(config, 'testFeature')).toBeFalsy();
      });
      it('should return false if feature is enabled but negation is used', () => {
        const config: FeaturesConfig = {
          features: {
            testFeature: true,
          },
        };
        expect(isFeatureEnabled(config, '!testFeature')).toBeFalsy();
      });
      it('should return true if feature is disabled but negation is used', () => {
        const config: FeaturesConfig = {
          features: {
            testFeature: false,
          },
        };
        expect(isFeatureEnabled(config, '!testFeature')).toBeTruthy();
      });
    });
  });
});
