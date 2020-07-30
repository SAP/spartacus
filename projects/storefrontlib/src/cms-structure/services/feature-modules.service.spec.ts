import { TestBed } from '@angular/core/testing';

import { FeatureModulesService } from './feature-modules.service';
import {
  CmsConfig,
  ConfigInitializerService,
  provideDefaultConfig,
} from '@spartacus/core';
import { NgModule } from '@angular/core';

const mockCmsConfig: CmsConfig = {
  featureModules: {
    feature1: {
      cmsComponents: ['component1'],
      module: async () => MockFeature1Module,
    },
  },
};

class MockConfigInitializerService
  implements Partial<ConfigInitializerService> {
  async getStableConfig() {
    return mockCmsConfig;
  }
}

const feature1CmsConfig: CmsConfig = {
  cmsComponents: {
    component1: {
      component: 'component1Class',
    },
  },
};

@NgModule({
  providers: [
    provideDefaultConfig(feature1CmsConfig),
    {
      provide: 'test-provider',
      useValue: 'test-value',
    },
  ],
})
class MockFeature1Module {}

describe('FeatureModulesService', () => {
  let service: FeatureModulesService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConfigInitializerService,
          useClass: MockConfigInitializerService,
        },
      ],
    });
    service = TestBed.inject(FeatureModulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('hasFeatureFor', () => {
    it('should return true for a component included in the feature', () => {
      expect(service.hasFeatureFor('component1')).toBeTruthy();
    });
    it('should return false for components not covered by feature', () => {
      expect(service.hasFeatureFor('unknown')).toBeFalsy();
    });
  });

  describe('getCmsMapping', () => {
    it('should return cms mapping for feature module', (done) => {
      service.getCmsMapping('component1').subscribe((mapping) => {
        expect(mapping).toBeTruthy();
        expect(mapping.component).toEqual('component1Class');
        done();
      });
    });
  });

  describe('getInjectors', () => {
    it('should return undefined for components not covered by features', () => {
      expect(service.getInjectors('unknown')).toBe(undefined);
    });
    it('should return undefined for not initialized features', () => {
      expect(service.getInjectors('component1')).toBe(undefined);
    });
    it('should return module injector', async () => {
      // initialize feature
      await service.getCmsMapping('component1').toPromise();

      const injectors = service.getInjectors('component1');

      expect(injectors).toBeTruthy();
      expect(injectors.length).toBe(1);
    });
  });
});
