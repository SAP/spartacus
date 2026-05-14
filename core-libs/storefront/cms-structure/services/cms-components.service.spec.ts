import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  CmsConfig,
  ConfigInitializerService,
  DeferLoadingStrategy,
} from '@spartacus/core';
import { of, Subject } from 'rxjs';
import { CmsComponentsService } from './cms-components.service';
import { CmsFeaturesService } from '@spartacus/storefront';
import createSpy = jasmine.createSpy;

let service: CmsComponentsService;

const mockConfig: CmsConfig = {
  cmsComponents: {
    testCode: {},
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
    exampleMapping3: {
      component: 'selector-3',
      childRoutes: {
        parent: { data: { test: 'parent data' } },
        children: [{ path: 'route1' }, { path: 'route2' }],
      },
    },
    staticComponent: {
      data: {
        foo: 'bar',
      } as any,
    },
  },
};

const mockComponents: string[] = [
  'testCode',
  'exampleMapping1',
  'exampleMapping2',
];

class MockCmsFeaturesService implements Partial<CmsFeaturesService> {
  private testResovler = new Subject();

  hasFeatureFor = createSpy().and.callFake((type) => type === 'feature');
  getModule = createSpy();

  getCmsMapping() {
    return this.testResovler;
  }

  resolveMappingsForTest() {
    this.testResovler.next({});
    this.testResovler.complete();
  }
}

class MockConfigInitializerService
  implements Partial<ConfigInitializerService>
{
  getStable = () => of(mockConfig);
}

describe('CmsComponentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CmsConfig, useValue: mockConfig },
        { provide: CmsFeaturesService, useClass: MockCmsFeaturesService },
        {
          provide: ConfigInitializerService,
          useClass: MockConfigInitializerService,
        },
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
      const cmsFeaturesService = TestBed.inject<MockCmsFeaturesService>(
        CmsFeaturesService as any
      );
      const testTypes = ['feature'];
      let isDone = false;
      service.determineMappings(testTypes).subscribe(() => {
        isDone = true;
      });
      expect(isDone).toBeFalsy();
      cmsFeaturesService.resolveMappingsForTest();
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

  describe('getStaticData', () => {
    it('should not return static data', () => {
      expect(service.getStaticData('exampleMapping1')).toBeUndefined();
    });

    it('should return static data', () => {
      expect(service.getStaticData<any>('staticComponent').foo).toEqual('bar');
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
    it('should get child routes from page data', () => {
      expect(service.getChildRoutes(mockComponents)).toEqual({
        children: [{ path: 'route1' }, { path: 'route2' }],
      });
    });

    it('should get parent and child routes from page data', () => {
      expect(service.getChildRoutes(['exampleMapping3'])).toEqual({
        parent: { data: { test: 'parent data' } },
        children: [{ path: 'route1' }, { path: 'route2' }],
      });
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

  describe('getModule', () => {
    it('should call CmsFeaturesService', () => {
      const cmsFeaturesService = TestBed.inject(CmsFeaturesService);
      service.getModule('feature');
      expect(cmsFeaturesService.getModule).toHaveBeenCalledWith('feature');
    });
    it('should not call CmsFeaturesService if there is no such a feature', () => {
      const cmsFeaturesService = TestBed.inject(CmsFeaturesService);
      service.getModule('unknownType');
      expect(cmsFeaturesService.getModule).not.toHaveBeenCalled();
    });
  });

  describe('cms mapping configuration', () => {
    it('should not be prone to changes caused by lazy-loaded modules augmenting it', () => {
      const cmsConfig = TestBed.inject(CmsConfig);
      expect(cmsConfig.cmsComponents.addedMapping).toBeFalsy();
      expect(service.getMapping('addedMapping')).toBeFalsy();
      Object.assign(cmsConfig.cmsComponents, {
        addedMapping: {
          component: 'added-component',
        },
      });
      expect(cmsConfig.cmsComponents.addedMapping).toBeTruthy();
      expect(service.getMapping('addedMapping')).toBeFalsy();
    });
  });
});

describe('with SSR', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CmsConfig, useValue: mockConfig },
        { provide: PLATFORM_ID, useValue: 'server' },
        {
          provide: ConfigInitializerService,
          useClass: MockConfigInitializerService,
        },
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
