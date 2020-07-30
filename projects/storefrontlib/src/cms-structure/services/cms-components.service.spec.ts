import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CmsConfig, DeferLoadingStrategy } from '@spartacus/core';
import { CmsComponentsService } from './cms-components.service';
import { Subject } from 'rxjs';
import { FeatureModulesService } from './feature-modules.service';
import createSpy = jasmine.createSpy;

let service: CmsComponentsService;

const mockConfig: CmsConfig = {
  cmsComponents: {
    exampleMapping1: {
      component: 'selector-1',
      i18nKeys: ['key-1'],
      guards: ['guard1', 'guard2'],
    },
    exampleMapping2: {
      component: 'selector-2',
      disableSSR: true,
      childRoutes: [{ path: 'route1' }, { path: 'route2' }],
      i18nKeys: ['key-1', 'key-2'],
      guards: ['guard1'],
      deferLoading: DeferLoadingStrategy.INSTANT,
    },
  },
};

const mockComponents: string[] = [
  'testCode',
  'exampleMapping1',
  'exampleMapping2',
];

class MockFeatureModulesService implements Partial<FeatureModulesService> {
  private testResovler = new Subject();

  hasFeatureFor = createSpy().and.callFake((type) => type === 'feature');
  getInjectors = createSpy();

  getCmsMapping() {
    return this.testResovler;
  }

  resolveMappingsForTest() {
    this.testResovler.next({});
    this.testResovler.complete();
  }
}

describe('CmsComponentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CmsConfig, useValue: mockConfig },
        { provide: FeatureModulesService, useClass: MockFeatureModulesService },
      ],
    });

    service = TestBed.inject(CmsComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('determineMappings', () => {
    it('should return observable and pass component types', (done) => {
      const testTypes = ['a', 'b'];
      service.determineMappings(testTypes).subscribe((types) => {
        expect(types).toBe(testTypes);
        done();
      });
    });
    it('should resolve features before emitting values', () => {
      const featureModulesService = TestBed.inject<MockFeatureModulesService>(
        FeatureModulesService as any
      );
      const testTypes = ['feature'];
      let isDone = false;
      service.determineMappings(testTypes).subscribe(() => {
        isDone = true;
      });
      expect(isDone).toBeFalsy();
      featureModulesService.resolveMappingsForTest();
      expect(isDone).toBeTruthy();
    });
  });

  describe('getMapping', () => {
    it('should return component mapping', () => {
      expect(service.getMapping('exampleMapping1')).toBe(
        mockConfig.cmsComponents.exampleMapping1
      );
    });
  });

  describe('shouldRender', () => {
    it('should return true for disableSrr not set', () => {
      expect(service.shouldRender('exampleMapping1')).toBeTruthy();
    });

    it('should return true for disableSrr set when in browser', () => {
      expect(service.shouldRender('exampleMapping2')).toBeTruthy();
    });
  });

  describe('getDeferLoadingStrategy', () => {
    it('should return DeferLoadingStrategy for component', () => {
      expect(service.getDeferLoadingStrategy('exampleMapping2')).toBe(
        DeferLoadingStrategy.INSTANT
      );
    });
  });

  describe('getChildRoutes', () => {
    it('should get routes from page data', () => {
      expect(service.getChildRoutes(mockComponents)).toEqual([
        { path: 'route1' },
        { path: 'route2' },
      ]);
    });
  });

  describe('getGuards', () => {
    it('should get routes from page data', () => {
      expect(service.getGuards(mockComponents)).toEqual(['guard1', 'guard2']);
    });
  });

  describe('getI18nKeys', () => {
    it('should get i18n keys from page data', () => {
      expect(service.getI18nKeys(mockComponents)).toEqual(['key-1', 'key-2']);
    });
  });

  describe('getInjectors', () => {
    it('should call FeatureModulesService', () => {
      const featureModulesService = TestBed.inject(FeatureModulesService);
      service.getInjectors('feature');
      expect(featureModulesService.getInjectors).toHaveBeenCalledWith(
        'feature'
      );
    });
    it('should not call FeatureModulesService if there is no such a feature', () => {
      const featureModulesService = TestBed.inject(FeatureModulesService);
      service.getInjectors('unknownType');
      expect(featureModulesService.getInjectors).not.toHaveBeenCalled();
    });
  });
});

describe('with SSR', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CmsConfig, useValue: mockConfig },
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    });

    service = TestBed.inject(CmsComponentsService);
  });

  it('should return true for disableSrr not set', () => {
    expect(service.shouldRender('exampleMapping1')).toBeTruthy();
  });

  it('should return false for disableSrr set', () => {
    expect(service.shouldRender('exampleMapping2')).toBeFalsy();
  });
});
