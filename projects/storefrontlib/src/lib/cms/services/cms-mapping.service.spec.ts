import { TestBed } from '@angular/core/testing';
import { CmsMappingService } from './cms-mapping.service';
import { CmsConfig, ContentSlotComponentData, Page } from '@spartacus/core';
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
          typeCode: 'testCode'
        },
        {
          typeCode: 'exampleMapping1'
        }
      ]
    },
    slot2: {
      components: [
        {
          uid: 'test_uid',
          typeCode: 'CMSFlexComponent',
          flexType: 'exampleMapping2'
        },
        {
          typeCode: 'exampleMapping1'
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

  describe('getComponentMappedType', () => {
    let component: ContentSlotComponentData;

    beforeEach(() => {
      component = { uid: 'testUid' };
    });

    it('should return "uid" of the component when component type is "JspIncludeComponent"', () => {
      component.typeCode = 'JspIncludeComponent';
      expect(service.getMappedType(component)).toBe('testUid');
    });

    it('should return "flexType" of the component when component type is "CMSFlexComponent"', () => {
      component.typeCode = 'CMSFlexComponent';
      component.flexType = 'testComponentMappedType';
      expect(service.getMappedType(component)).toBe('testComponentMappedType');
    });

    it('should return component type when it is NOT "JspIncludeComponent" nor "CMSFlexComponent"', () => {
      component.typeCode = 'testComponentType';
      expect(service.getMappedType(component)).toBe('testComponentType');
    });
  });

  describe('isMappedTypeEnabled', () => {
    it('should return true for disableSrr not set', () => {
      expect(service.isMappedTypeEnabled('exampleMapping1')).toBeTruthy();
    });

    it('should return true for disableSrr set when in browser', () => {
      expect(service.isMappedTypeEnabled('exampleMapping2')).toBeTruthy();
    });
  });

  describe('getMappedTypes', () => {
    it('should return mappedTypes from pageData', () => {
      expect(service.getMappedTypes(mockPageData)).toEqual([
        'testCode',
        'exampleMapping1',
        'exampleMapping2'
      ]);
    });
  });

  describe('getRoutesFromPageData', () => {
    it('should get routes from page data', () => {
      expect(service.getRoutesFromPageData(mockPageData)).toEqual([
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
    expect(service.isMappedTypeEnabled('exampleMapping1')).toBeTruthy();
  });

  it('should return false for disableSrr set', () => {
    expect(service.isMappedTypeEnabled('exampleMapping2')).toBeFalsy();
  });
});
