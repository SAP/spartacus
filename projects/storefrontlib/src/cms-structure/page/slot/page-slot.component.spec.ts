import { Directive, Input, Output, Renderer2, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CmsConfig,
  CmsService,
  ContentSlotData,
  DeferLoadingStrategy,
  DynamicAttributeService,
} from '@spartacus/core';
import { DeferLoaderService } from 'projects/storefrontlib/src/layout/loading/defer-loader.service';
import { Observable, of } from 'rxjs';
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
    CMSTestComponent: {
      component: PageSlotComponent,
      deferLoading: DeferLoadingStrategy.DEFER,
    },
  },
};

@Directive({
  selector: '[cxOutlet]',
})
export class MockOutletDirective {
  @Input() cxOutlet;
  @Input() cxOutletContext;
  @Input() cxOutletDefer;
  @Output() loaded;
}

describe('PageSlotComponent', () => {
  let pageSlotComponent: PageSlotComponent;
  let fixture: ComponentFixture<PageSlotComponent>;
  let cmsService: CmsService;
  let dynamicAttributeService: DynamicAttributeService;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        PageSlotComponent,
        ComponentWrapperDirective,
        MockOutletDirective,
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

  describe('slot position class', () => {
    it('should have class for the given slot position', () => {
      pageSlotComponent.position = 'abc';
      fixture.detectChanges();
      expect(
        (<HTMLElement>fixture.debugElement.nativeElement).classList
      ).toContain('abc');
    });
  });

  describe('pending state', () => {
    it('should have isPending set to true initially', () => {
      expect(pageSlotComponent.isPending).toEqual(true);
    });

    it('should not have isPending when there is no slot', () => {
      fixture.detectChanges();
      expect(pageSlotComponent.isPending).toEqual(false);
    });

    it('should not have isPending with a slot with no components', () => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(of({}));
      fixture.detectChanges();
      expect(pageSlotComponent.isPending).toEqual(false);
    });

    it('should have isPending set to true with a slot with at least one component', () => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(
        of({ components: [{}] } as ContentSlotData)
      );
      fixture.detectChanges();
      expect(pageSlotComponent.isPending).toEqual(true);
    });

    it('should add an cx-pending class with at least one component', () => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(
        of({ components: [{}] } as ContentSlotData)
      );
      fixture.detectChanges();
      expect(
        (<HTMLElement>fixture.debugElement.nativeElement).classList
      ).toContain('cx-pending');
    });

    it('should not have isPending when one component is loaded', () => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(
        of({ components: [{}] } as ContentSlotData)
      );
      fixture.detectChanges();
      pageSlotComponent.isLoaded(true);
      expect(pageSlotComponent.isPending).toEqual(false);
    });

    it('should still have isPending when only one component is loaded', () => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(
        of({ components: [{}, {}] } as ContentSlotData)
      );
      fixture.detectChanges();
      pageSlotComponent.isLoaded(true);
      expect(pageSlotComponent.isPending).toEqual(true);
    });

    it('should not have isPending when all components are loaded', () => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(
        of({ components: [{}, {}] } as ContentSlotData)
      );
      fixture.detectChanges();
      pageSlotComponent.isLoaded(true);
      pageSlotComponent.isLoaded(true);
      expect(pageSlotComponent.isPending).toEqual(false);
    });
  });

  describe('has-components', () => {
    it('should have has-components class when slot has at least one components', () => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(
        of({ components: [{}] } as ContentSlotData)
      );
      fixture.detectChanges();
      expect(
        (<HTMLElement>fixture.debugElement.nativeElement).classList
      ).toContain('has-components');
    });

    it('should not have has-components class when slot has no components', () => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(
        of({ components: [] } as ContentSlotData)
      );
      fixture.detectChanges();
      expect(
        (<HTMLElement>fixture.debugElement.nativeElement).classList
      ).not.toContain('has-components');
    });
  });

  describe('Component Defer Options', () => {
    it('should DEFER strategy for deferLoading', () => {
      fixture.detectChanges();
      expect(
        pageSlotComponent.getComponentDeferOptions('CMSTestComponent')
          .deferLoading
      ).toEqual(DeferLoadingStrategy.DEFER);
    });
  });

  describe('smart edit', () => {
    it('should add smart edit slot contract if app launch in smart edit', () => {
      spyOn(dynamicAttributeService, 'addDynamicAttributes').and.callThrough();

      pageSlotComponent.ngOnInit();
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
});
