import { TestBed } from '@angular/core/testing';
import { FeatureModulesService } from './feature-modules.service';
import { CmsConfig, provideConfig } from '@spartacus/core';
import { InjectionToken, NgModule } from '@angular/core';

const mockCmsConfig: CmsConfig = {
  featureModules: {
    feature1: {
      module: async () => MockFeature1Module,
    },
    feature2: {
      module: async () => MockFeature1Module,
      dependencies: [async () => MockDependencyModule],
    },
    feature3: {},
    feature4: {
      module: async () => MockFeature4Module,
      dependencies: ['feature2'],
    },
    feature5: 'feature1',
    feature6: 'feature3',
    feature7: 'feature5',
  },
};

const TEST_TOKEN = new InjectionToken('testToken');
const TEST_DEP_TOKEN = new InjectionToken('testDepToken');

@NgModule({
  providers: [
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

@NgModule({})
class MockFeature4Module {}

describe('FeatureModulesService', () => {
  let service: FeatureModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideConfig(mockCmsConfig)],
    });
    service = TestBed.inject(FeatureModulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isConfigured', () => {
    it('should return true for configured features', () => {
      expect(service.isConfigured('feature1')).toBeTrue();
      expect(service.isConfigured('feature2')).toBeTrue();
    });

    it('should return false for not configured features', () => {
      expect(service.isConfigured('feature3')).toBeFalse();
      expect(service.isConfigured('feature-unknown')).toBeFalse();
    });

    it('should return true for configured feature alias', () => {
      expect(service.isConfigured('feature5')).toBeTrue();
    });

    it('should return false for not configured feature alias', () => {
      expect(service.isConfigured('feature6')).toBeFalse();
    });

    it('should return true for configured feature not direct alias', () => {
      expect(service.isConfigured('feature7')).toBeTrue();
    });
  });

  describe('resolveFeature', () => {
    it('should return feature module', (done) => {
      service.resolveFeature('feature1').subscribe((moduleRef) => {
        expect(moduleRef).toBeTruthy();
        expect(moduleRef.instance).toBeInstanceOf(MockFeature1Module);
        done();
      });
    });

    it('should throw error if feature is not configured', (done) => {
      service.resolveFeature('feature3').subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
          done();
        },
      });
    });

    it('should resolve module dependencies', (done) => {
      service.resolveFeature('feature2').subscribe((moduleRef) => {
        expect(moduleRef).toBeTruthy();
        const testProviderValue = moduleRef.injector.get(TEST_DEP_TOKEN);
        expect(testProviderValue).toBe('test-dependency-value');
        done();
      });
    });

    it('should resolve feature dependencies', (done) => {
      service.resolveFeature('feature4').subscribe((moduleRef) => {
        expect(moduleRef).toBeTruthy();

        const testProviderValue1 = moduleRef.injector.get(TEST_TOKEN);
        expect(testProviderValue1).toBe('test-value');
        done();
      });
    });

    it('should resolve transient feature dependencies', (done) => {
      service.resolveFeature('feature4').subscribe((moduleRef) => {
        expect(moduleRef).toBeTruthy();

        const testProviderValue2 = moduleRef.injector.get(TEST_DEP_TOKEN);
        expect(testProviderValue2).toBe('test-dependency-value');
        done();
      });
    });

    it('should return feature module with alias mapping', (done) => {
      service.resolveFeature('feature5').subscribe((moduleRef) => {
        expect(moduleRef).toBeTruthy();
        expect(moduleRef.instance).toBeInstanceOf(MockFeature1Module);
        done();
      });
    });
  });
});
