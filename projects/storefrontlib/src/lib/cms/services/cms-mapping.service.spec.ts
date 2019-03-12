import { TestBed } from '@angular/core/testing';
import { CmsMappingService } from './cms-mapping.service';

describe('CmsMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: CmsMappingService = TestBed.get(CmsMappingService);
    expect(service).toBeTruthy();
  });

  // describe('getComponentMappedType', () => {
  //   let component: ContentSlotComponentData;
  //
  //   beforeEach(() => {
  //     component = { uid: 'testUid' };
  //   });
  //
  //   it('should return "uid" of the component when component type is "JspIncludeComponent"', () => {
  //     component.typeCode = 'JspIncludeComponent';
  //     expect(dynamicSlotComponent.getComponentMappedType(component)).toBe(
  //       'testUid'
  //     );
  //   });
  //
  //   it('should return "flexType" of the component when component type is "CMSFlexComponent"', () => {
  //     component.typeCode = 'CMSFlexComponent';
  //     component.flexType = 'testComponentMappedType';
  //     expect(dynamicSlotComponent.getComponentMappedType(component)).toBe(
  //       'testComponentMappedType'
  //     );
  //   });
  //
  //   it('should return component type when it is NOT "JspIncludeComponent" nor "CMSFlexComponent"', () => {
  //     component.typeCode = 'testComponentType';
  //     expect(dynamicSlotComponent.getComponentMappedType(component)).toBe(
  //       'testComponentType'
  //     );
  //   });
  // });
});
