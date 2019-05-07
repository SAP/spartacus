import { Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CmsService,
  ContentSlotData,
  DynamicAttributeService,
} from '@spartacus/core';
import { CmsMappingService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { OutletDirective } from '../../outlet';
import { ComponentWrapperDirective } from '../component/component-wrapper.directive';
import { PageSlotComponent } from './page-slot.component';

class MockCmsService {
  getContentSlot(): Observable<ContentSlotData> {
    return of({
      properties: {
        smartedit: {
          test: 'test',
        },
      },
    });
  }
  isLaunchInSmartEdit(): boolean {
    return true;
  }
}

class MockDynamicAttributeService {
  addDynamicAttributes() {}
}

class MockCmsMappingService {}

describe('PageSlotComponent', () => {
  let pageSlotComponent: PageSlotComponent;
  let fixture: ComponentFixture<PageSlotComponent>;
  let cmsService: CmsService;
  let dynamicAttributeService: DynamicAttributeService;
  let renderer: Renderer2;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        PageSlotComponent,
        ComponentWrapperDirective,
        OutletDirective,
      ],
      providers: [
        Renderer2,
        {
          provide: CmsService,
          useClass: MockCmsService,
        },
        {
          provide: CmsMappingService,
          useClass: MockCmsMappingService,
        },
        {
          provide: DynamicAttributeService,
          useClass: MockDynamicAttributeService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSlotComponent);
    pageSlotComponent = fixture.componentInstance;
    pageSlotComponent.position = 'left';

    cmsService = TestBed.get(CmsService);
    dynamicAttributeService = TestBed.get(DynamicAttributeService);
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as any);
  });

  it('should be created', () => {
    expect(pageSlotComponent).toBeTruthy();
  });

  it('should add smart edit slot contract if app launch in smart edit', () => {
    spyOn(dynamicAttributeService, 'addDynamicAttributes').and.callThrough();

    fixture.detectChanges();
    const native = fixture.debugElement.nativeElement;
    expect(dynamicAttributeService.addDynamicAttributes).toHaveBeenCalledWith(
      {
        smartedit: {
          test: 'test',
        },
      },
      native,
      renderer
    );
  });

  it('should not add smart edit slot contract if app not launch in smart edit', () => {
    spyOn(dynamicAttributeService, 'addDynamicAttributes').and.callThrough();
    spyOn(cmsService, 'isLaunchInSmartEdit').and.returnValue(false);

    fixture.detectChanges();
    const native = fixture.debugElement.nativeElement;
    expect(
      dynamicAttributeService.addDynamicAttributes
    ).not.toHaveBeenCalledWith(
      {
        smartedit: {
          test: 'test',
        },
      },
      native,
      renderer
    );
  });
});
