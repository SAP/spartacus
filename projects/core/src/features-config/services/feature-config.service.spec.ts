import { TestBed } from '@angular/core/testing';

import { FeatureConfigService } from './feature-config.service';
import { FeaturesConfig } from '@spartacus/core';

describe('FeatureConfigService', () => {
  const mockFeaturesConfig: FeaturesConfig = {
    features: {
      level: '1.3',
      feature1_1: '1.1',
      feature1_5: '1.5',
      featureOn: true,
      featureOff: false,
    },
  };

  let service: FeatureConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: FeaturesConfig, useValue: mockFeaturesConfig }],
    });
    service = TestBed.get(FeatureConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isLevel', () => {
    it('should return true for supported level', () => {
      expect(service.isLevel('1.0')).toBeTruthy();
      expect(service.isLevel('1.3')).toBeTruthy();
    });
    it('should return false for unsupported level', () => {
      expect(service.isLevel('1.5')).toBeFalsy();
      expect(service.isLevel('2.0')).toBeFalsy();
    });
  });

  describe('isEnabled', () => {
    it('should return true for supported feature', () => {
      expect(service.isEnabled('feature1_1')).toBeTruthy();
      expect(service.isEnabled('featureOn')).toBeTruthy();
    });
    it('should return false for unsupported feature', () => {
      expect(service.isEnabled('feature1_5')).toBeFalsy();
      expect(service.isEnabled('featureOff')).toBeFalsy();
    });
  });
});
