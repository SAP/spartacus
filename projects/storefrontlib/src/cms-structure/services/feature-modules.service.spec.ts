import { TestBed } from '@angular/core/testing';

import { FeatureModulesService } from './feature-modules.service';
import {
  CmsConfig,
  ConfigInitializerService,
  EventService,
  ModuleInitializedEvent,
  provideDefaultConfig,
} from '@spartacus/core';
import { InjectionToken, NgModule } from '@angular/core';
import { take } from 'rxjs/operators';

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

    it('should emit module initialized event', (done) => {
      const eventService = TestBed.inject(EventService);
      let moduleEvent;
      eventService
        .get(ModuleInitializedEvent)
        .pipe(take(1))
        .subscribe((event) => (moduleEvent = event));

      service.getCmsMapping('component1').subscribe(() => {
        expect(moduleEvent.featureName).toEqual('feature1');
        expect(
          moduleEvent.moduleRef.instance instanceof MockFeature1Module
        ).toBeTruthy();
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

      const testProviderValue = injectors[0].get(TEST_TOKEN);
      expect(testProviderValue).toBe('test-value');
    });

    it('should return dependency injectors', async () => {
      // initialize feature
      await service.getCmsMapping('component2').toPromise();

      const injectors = service.getInjectors('component2');

      expect(injectors).toBeTruthy();
      expect(injectors.length).toBe(2);

      const testProviderValue = injectors[1].get(TEST_DEP_TOKEN);
      expect(testProviderValue).toBe('test-dependency-value');
    });
  });
});
