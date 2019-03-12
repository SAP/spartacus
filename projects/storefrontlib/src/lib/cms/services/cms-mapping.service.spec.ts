import { TestBed } from '@angular/core/testing';
import { CmsMappingService } from './cms-mapping.service';
import { CmsConfig, ContentSlotComponentData } from '@spartacus/core';

describe('CmsMappingService', () => {
  let service: CmsMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CmsConfig, useValue: {} }]
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
});
