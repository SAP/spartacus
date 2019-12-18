import { Renderer2, Type } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import {
  CmsConfig,
  CmsService,
  ContentSlotData,
  DynamicAttributeService,
} from '@spartacus/core';
import { DeferLoaderService } from 'projects/storefrontlib/src/layout/loading/defer-loader.service';
import { Observable, of } from 'rxjs';
import { OutletDirective } from '../../outlet';
import { CmsMappingService } from '../../services/cms-mapping.service';
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

export class MockDeferLoaderService {
  load(_element: HTMLElement, _options?: any) {
    return of(true);
  }
}

const MockCmsConfig: CmsConfig = {
  cmsComponents: {
    CMSTestComponent: { component: PageSlotComponent },
  },
};

fdescribe('PageSlotComponent', () => {
  let pageSlotComponent: PageSlotComponent;
  let fixture: ComponentFixture<PageSlotComponent>;
  let cmsService: CmsService;
  let dynamicAttributeService: DynamicAttributeService;
  let renderer: Renderer2;

  beforeEach(fakeAsync(() => {
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
        {
          provide: DeferLoaderService,
          useClass: MockDeferLoaderService,
        },
        {
          provide: CmsConfig,
          useValue: MockCmsConfig,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSlotComponent);
    pageSlotComponent = fixture.componentInstance;
    pageSlotComponent.position = 'left';

    cmsService = TestBed.get(CmsService as Type<CmsService>);
    dynamicAttributeService = TestBed.get(DynamicAttributeService as Type<
      DynamicAttributeService
    >);
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as any);
  });

  it('should be created', () => {
    expect(pageSlotComponent).toBeTruthy();
  });

  it('should add smart edit slot contract if app launch in smart edit', fakeAsync(() => {
    spyOn(dynamicAttributeService, 'addDynamicAttributes').and.callThrough();

    // flushMicrotasks();

    // pageSlotComponent.ngOnInit();

    // flushMicrotasks();
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
  }));

  xit('should not add smart edit slot contract if app not launch in smart edit', () => {
    spyOn(dynamicAttributeService, 'addDynamicAttributes').and.callThrough();
    spyOn(cmsService, 'isLaunchInSmartEdit').and.returnValue(false);

    // flushMicrotasks();
    // fixture.detectChanges();

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
