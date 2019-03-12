import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import {
  CmsService,
  ContentSlotData,
  ContentSlotComponentData
} from '@spartacus/core';
import { of, Observable } from 'rxjs';

import { DynamicSlotComponent } from './dynamic-slot.component';
import { ComponentWrapperDirective } from './component-wrapper.directive';
import { OutletDirective } from '../../../outlet';

class MockCmsService {
  getContentSlot(): Observable<ContentSlotData> {
    return of({
      uid: 'slot_uid',
      catalogUuid: 'slot_catalogUuid',
      uuid: 'slot_uuid'
    });
  }
  isLaunchInSmartEdit(): boolean {
    return true;
  }
}

describe('DynamicSlotComponent', () => {
  let dynamicSlotComponent: DynamicSlotComponent;
  let fixture: ComponentFixture<DynamicSlotComponent>;
  let cmsService: CmsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        DynamicSlotComponent,
        ComponentWrapperDirective,
        OutletDirective
      ],
      providers: [
        {
          provide: CmsService,
          useClass: MockCmsService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicSlotComponent);
    dynamicSlotComponent = fixture.componentInstance;
    dynamicSlotComponent.position = 'left';
    fixture.detectChanges();

    cmsService = TestBed.get(CmsService);
  });

  it('should be created', () => {
    expect(dynamicSlotComponent).toBeTruthy();
  });

  it('should add smart edit slot contract if app launch in smart edit', () => {
    const native = fixture.debugElement.nativeElement;
    expect(native.getAttribute('data-smartedit-component-type')).toEqual(
      'ContentSlot'
    );
    expect(native.getAttribute('data-smartedit-component-id')).toEqual(
      'slot_uid'
    );
    expect(native.getAttribute('data-smartedit-catalog-version-uuid')).toEqual(
      'slot_catalogUuid'
    );
    expect(native.getAttribute('data-smartedit-component-uuid')).toEqual(
      'slot_uuid'
    );
    expect(native.classList.contains('smartEditComponent')).toBeTruthy();
  });

  it('should not add smart edit slot contract if app not launch in smart edit', () => {
    spyOn(cmsService, 'isLaunchInSmartEdit').and.returnValue(false);

    fixture = TestBed.createComponent(DynamicSlotComponent);
    dynamicSlotComponent = fixture.componentInstance;
    dynamicSlotComponent.position = 'left';
    fixture.detectChanges();

    const native = fixture.debugElement.nativeElement;
    expect(native.classList.contains('smartEditComponent')).toBeFalsy();
    expect(native.getAttribute('data-smartedit-component-id')).toEqual(null);
  });

  describe('getComponentMappedType', () => {
    let component: ContentSlotComponentData;

    beforeEach(() => {
      component = { uid: 'testUid' };
    });

    it('should return "uid" of the component when component type is "JspIncludeComponent"', () => {
      component.typeCode = 'JspIncludeComponent';
      expect(dynamicSlotComponent.getComponentMappedType(component)).toBe(
        'testUid'
      );
    });

    it('should return "flexType" of the component when component type is "CMSFlexComponent"', () => {
      component.typeCode = 'CMSFlexComponent';
      component.flexType = 'testComponentMappedType';
      expect(dynamicSlotComponent.getComponentMappedType(component)).toBe(
        'testComponentMappedType'
      );
    });

    it('should return component type when it is NOT "JspIncludeComponent" nor "CMSFlexComponent"', () => {
      component.typeCode = 'testComponentType';
      expect(dynamicSlotComponent.getComponentMappedType(component)).toBe(
        'testComponentType'
      );
    });
  });
});
