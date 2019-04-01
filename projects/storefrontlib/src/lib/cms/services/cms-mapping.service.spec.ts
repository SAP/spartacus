import { TestBed } from '@angular/core/testing';
import { CmsMappingService } from './cms-mapping.service';
import { CmsConfig } from '@spartacus/core';
import { PLATFORM_ID } from '@angular/core';

let service: CmsMappingService;

const mockConfig: CmsConfig = {
  cmsComponents: {
    exampleMapping1: {
      selector: 'selector-1',
      i18nNamespaces: ['namespace-1'],
      guards: ['guard1', 'guard2'],
    },
    exampleMapping2: {
      selector: 'selector-2',
      disableSSR: true,
      childRoutes: [{ path: 'route1' }, { path: 'route2' }],
      i18nNamespaces: ['namespace-1', 'namespace-2'],
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
    service = TestBed.get(CmsMappingService);
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

  describe('getI18nNamespacesForComponents', () => {
    it('should i18n namespaces from page data', () => {
      expect(service.getI18nNamespacesForComponents(mockComponents)).toEqual([
        'namespace-1',
        'namespace-2',
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
    service = TestBed.get(CmsMappingService);
  });

  it('should return true for disableSrr not set', () => {
    expect(service.isComponentEnabled('exampleMapping1')).toBeTruthy();
  });

  it('should return false for disableSrr set', () => {
    expect(service.isComponentEnabled('exampleMapping2')).toBeFalsy();
  });
});
