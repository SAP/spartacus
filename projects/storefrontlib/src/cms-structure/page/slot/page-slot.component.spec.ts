import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CmsService, ContentSlotData } from '@spartacus/core';
import { of, Observable } from 'rxjs';

import { PageSlotComponent } from './page-slot.component';
import { ComponentWrapperDirective } from '../component/component-wrapper.directive';
import { OutletDirective } from '../../../lib/outlet';

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

describe('PageSlotComponent', () => {
  let pageSlotComponent: PageSlotComponent;
  let fixture: ComponentFixture<PageSlotComponent>;
  let cmsService: CmsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        PageSlotComponent,
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
    fixture = TestBed.createComponent(PageSlotComponent);
    pageSlotComponent = fixture.componentInstance;
    pageSlotComponent.position = 'left';
    fixture.detectChanges();

    cmsService = TestBed.get(CmsService);
  });

  it('should be created', () => {
    expect(pageSlotComponent).toBeTruthy();
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

    fixture = TestBed.createComponent(PageSlotComponent);
    pageSlotComponent = fixture.componentInstance;
    pageSlotComponent.position = 'left';
    fixture.detectChanges();

    const native = fixture.debugElement.nativeElement;
    expect(native.classList.contains('smartEditComponent')).toBeFalsy();
    expect(native.getAttribute('data-smartedit-component-id')).toEqual(null);
  });
});
