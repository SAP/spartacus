import { TestBed } from '@angular/core/testing';
import { CmsMappingService } from './cms-mapping.service';
import { CmsConfig, Page } from '@spartacus/core';
import { PLATFORM_ID } from '@angular/core';

let service: CmsMappingService;

const mockConfig: CmsConfig = {
  cmsComponents: {
    exampleMapping1: {
      selector: 'selector-1'
    },
    exampleMapping2: {
      selector: 'selector-2',
      disableSSR: true,
      childRoutes: [
        {
          path: 'route1'
        },
        {
          path: 'route2'
        }
      ]
    }
  }
};

const mockPageData: Page = {
  slots: {
    slot1: {
      components: [
        {
          flexType: 'testCode'
        },
        {
          flexType: 'exampleMapping1'
        }
      ]
    },
    slot2: {
      components: [
        {
          flexType: 'exampleMapping2'
        },
        {
          flexType: 'exampleMapping1'
        }
      ]
    }
  }
};

describe('CmsMappingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CmsConfig, useValue: mockConfig }]
    });
    service = TestBed.get(CmsMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isMappedTypeEnabled', () => {
    it('should return true for disableSrr not set', () => {
      expect(service.isFlexTypeEnabled('exampleMapping1')).toBeTruthy();
    });

    it('should return true for disableSrr set when in browser', () => {
      expect(service.isFlexTypeEnabled('exampleMapping2')).toBeTruthy();
    });
  });

  describe('getMappedTypes', () => {
    it('should return mappedTypes from pageData', () => {
      expect(service.getFlexTypesFromPage(mockPageData)).toEqual([
        'testCode',
        'exampleMapping1',
        'exampleMapping2'
      ]);
    });
  });

  describe('getRoutesFromPageData', () => {
    it('should get routes from page data', () => {
      expect(service.getRoutesFromPage(mockPageData)).toEqual([
        {
          path: 'route1'
        },
        {
          path: 'route2'
        }
      ]);
    });
  });
});

describe('with SSR', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CmsConfig, useValue: mockConfig },
        { provide: PLATFORM_ID, useValue: 'server' }
      ]
    });
    service = TestBed.get(CmsMappingService);
  });

  it('should return true for disableSrr not set', () => {
    expect(service.isFlexTypeEnabled('exampleMapping1')).toBeTruthy();
  });

  it('should return false for disableSrr set', () => {
    expect(service.isFlexTypeEnabled('exampleMapping2')).toBeFalsy();
  });
});
