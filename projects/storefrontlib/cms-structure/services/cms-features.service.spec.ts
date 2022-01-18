import { TestBed } from '@angular/core/testing';
import { CmsFeaturesService } from './cms-features.service';
import {
  CmsConfig,
  FeatureModulesService,
  provideConfig,
  provideDefaultConfig,
} from '@spartacus/core';
import { InjectionToken, NgModule } from '@angular/core';

const mockCmsConfig: CmsConfig = {
  featureModules: {
    feature1: {
      cmsComponents: ['component1'],
      module: async () => MockFeature1Module,
    },
    feature2: {
      cmsComponents: ['component2'],
      module: async () => MockFeature1Module,
      dependencies: [async () => MockDependencyModule],
    },
  },
};

const feature1CmsConfig: CmsConfig = {
  cmsComponents: {
    component1: {
      component: 'component1Class',
    },
  },
};

const TEST_TOKEN = new InjectionToken('testTokan');
const TEST_DEP_TOKEN = new InjectionToken('testDepTokan');

@NgModule({
  providers: [
    provideDefaultConfig(feature1CmsConfig),
    {
      provide: TEST_TOKEN,
      useValue: 'test-value',
    },
  ],
})
class MockFeature1Module {}

@NgModule({
  providers: [
    {
      provide: TEST_DEP_TOKEN,
      useValue: 'test-dependency-value',
    },
  ],
})
class MockDependencyModule {}

describe('CmsFeaturesService', () => {
  let service: CmsFeaturesService;
  let featureModules: FeatureModulesService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideConfig(mockCmsConfig)],
    });
    service = TestBed.inject(CmsFeaturesService);
    featureModules = TestBed.inject(FeatureModulesService);
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

    it('should call FeatureModulesService.resolveFeature', (done) => {
      spyOn(featureModules, 'resolveFeature').and.callThrough();
      service.getCmsMapping('component1').subscribe(() => {
        expect(featureModules.resolveFeature).toHaveBeenCalledWith('feature1');
        done();
      });
    });
  });

  describe('getModule', () => {
    it('should return undefined for components not covered by features', () => {
      expect(service.getModule('unknown')).toBe(undefined);
    });

    it('should return undefined for not initialized features', () => {
      expect(service.getModule('component1')).toBe(undefined);
    });

    it('should return feature module', async () => {
      // initialize feature
      await service.getCmsMapping('component1').toPromise();

      const module = service.getModule('component1');

      expect(module).toBeTruthy();

      expect(module.instance).toBeInstanceOf(MockFeature1Module);
    });

    it('should return dependency injectors', async () => {
      // initialize feature
      await service.getCmsMapping('component2').toPromise();

      const module = service.getModule('component2');
      expect(module).toBeTruthy();

      const testProviderValue = module.injector.get(TEST_DEP_TOKEN);
      expect(testProviderValue).toBe('test-dependency-value');
    });
  });
});
