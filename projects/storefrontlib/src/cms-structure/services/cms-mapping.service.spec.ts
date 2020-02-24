import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CmsConfig } from '@spartacus/core';
import { CmsMappingService } from './cms-mapping.service';

let service: CmsMappingService;

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
    },
  },
};

const mockComponents: string[] = [
  'testCode',
  'exampleMapping1',
  'exampleMapping2',
];

describe('CmsMappingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CmsConfig, useValue: mockConfig }],
    });

    service = TestBed.inject(CmsMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isComponentEnabled', () => {
    it('should return true for disableSrr not set', () => {
      expect(service.isComponentEnabled('exampleMapping1')).toBeTruthy();
    });

    it('should return true for disableSrr set when in browser', () => {
      expect(service.isComponentEnabled('exampleMapping2')).toBeTruthy();
    });
  });

  describe('getRoutesForComponents', () => {
    it('should get routes from page data', () => {
      expect(service.getRoutesForComponents(mockComponents)).toEqual([
        { path: 'route1' },
        { path: 'route2' },
      ]);
    });
  });

  describe('getGuardsForComponents', () => {
    it('should get routes from page data', () => {
      expect(service.getGuardsForComponents(mockComponents)).toEqual([
        'guard1',
        'guard2',
      ]);
    });
  });

  describe('getI18nKeysForComponents', () => {
    it('should get i18n keys from page data', () => {
      expect(service.getI18nKeysForComponents(mockComponents)).toEqual([
        'key-1',
        'key-2',
      ]);
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

    service = TestBed.inject(CmsMappingService);
  });

  it('should return true for disableSrr not set', () => {
    expect(service.isComponentEnabled('exampleMapping1')).toBeTruthy();
  });

  it('should return false for disableSrr set', () => {
    expect(service.isComponentEnabled('exampleMapping2')).toBeFalsy();
  });
});
