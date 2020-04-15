import { Component, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CmsConfig,
  CmsService,
  ContentSlotData,
  DeferLoadingStrategy,
  DynamicAttributeService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { SkipLinkConfig, SkipLinkDirective } from '../../../layout/a11y/index';
import { DeferLoaderService } from '../../../layout/loading/defer-loader.service';
import { OutletDirective } from '../../outlet/index';
import { CmsMappingService } from '../../services/cms-mapping.service';
import { ComponentWrapperDirective } from '../component/component-wrapper.directive';
import { PageSlotComponent } from './page-slot.component';

const slotWithOneComp = {
  components: [
    {
      flexType: 'BannerComponent',
    },
  ],
};

const slotWithTwoComp = {
  components: [
    {
      flexType: 'BannerComponent',
    },
    {
      flexType: 'ParagraphComponent',
    },
  ],
};

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

const MockSkipLinkConfig: SkipLinkConfig = { skipLinks: [] };

@Component({
  template: `
    <cx-page-slot position="section" class="host classes"></cx-page-slot>
  `,
})
class MockHostComponent {}

@Component({
  template: `
    <div cx-page-slot position="section" class="host classes"></div>
  `,
})
class MockHostWithDivComponent {}

class MockDeferLoaderService {
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

const providers = [
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
    provide: SkipLinkConfig,
    useValue: MockSkipLinkConfig,
  },
  {
    provide: DeferLoaderService,
    useClass: MockDeferLoaderService,
  },
  {
    provide: CmsConfig,
    useValue: MockCmsConfig,
  },
];

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
        OutletDirective,
        SkipLinkDirective,
        MockHostComponent,
        MockHostWithDivComponent,
      ],
      providers,
    }).compileComponents();

    fixture = TestBed.createComponent(PageSlotComponent);
    pageSlotComponent = fixture.componentInstance;
    pageSlotComponent.position = 'left';

    cmsService = TestBed.inject(CmsService);
    dynamicAttributeService = TestBed.inject(DynamicAttributeService);
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as any);
  });

  it('should be created', () => {
    expect(pageSlotComponent).toBeTruthy();
    fixture = TestBed.createComponent(PageSlotComponent);
  });

  describe('use as an attribute selector', () => {
    let el: HTMLElement;
    beforeEach(() => {
      const compFixture = TestBed.createComponent(MockHostWithDivComponent);
      compFixture.detectChanges();
      el = compFixture.debugElement.query(By.css('[cx-page-slot]'))
        .nativeElement;
    });
    it('should get a position class', () => {
      expect(el.classList).toContain('host');
    });

    it('should keep existing classes', () => {
      expect(el.classList).toContain('host');
      expect(el.classList).toContain('classes');
      expect(el.classList).toContain('section');
    });
  });

  describe('use as an element selector', () => {
    let el: HTMLElement;
    beforeEach(() => {
      const compFixture = TestBed.createComponent(MockHostComponent);
      compFixture.detectChanges();
      el = compFixture.debugElement.query(By.css('cx-page-slot')).nativeElement;
    });
    it('should get a position class', () => {
      expect(el.classList).toContain('host');
    });
    it('should keep existing classes', () => {
      expect(el.classList).toContain('host');
      expect(el.classList).toContain('classes');
      expect(el.classList).toContain('section');
    });
  });

  describe('slot position class', () => {
    it('should have class for the given slot position', () => {
      pageSlotComponent.position = 'abc';
      fixture.detectChanges();
      expect(
        (<HTMLElement>fixture.debugElement.nativeElement).classList
      ).toContain('abc');
    });

    it('should not remove host class', () => {
      pageSlotComponent.position = 'abc';
      fixture.detectChanges();
      expect(
        (<HTMLElement>fixture.debugElement.nativeElement).classList
      ).toContain('abc');
    });
  });

  describe('is-pending class', () => {
    it('should have isPending set to true initially', () => {
      expect(pageSlotComponent.isPending).toEqual(true);
    });

    it('should not have isPending when there is no slot', () => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(of(null));
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

  describe('page-fold class', () => {
    it('should set isPageFold to false initially', () => {
      expect(pageSlotComponent.isPageFold).toEqual(false);
    });
    it('should set page-fold class when isPageFold is true', () => {
      pageSlotComponent.isPageFold = true;
      fixture.detectChanges();
      expect(
        (<HTMLElement>fixture.debugElement.nativeElement).classList
      ).toContain('page-fold');
    });
  });

  describe('has-components class', () => {
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

  describe('isLoaded', () => {
    it('should not call isLoaded with 0 components', async(() => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(of({}));
      spyOn(pageSlotComponent, 'isLoaded').and.callThrough();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(pageSlotComponent.isLoaded).not.toHaveBeenCalled();
      });
    }));

    it('should call isLoaded output twice', async(() => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(of(slotWithOneComp));
      spyOn(pageSlotComponent, 'isLoaded').and.callThrough();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(pageSlotComponent.isLoaded).toHaveBeenCalledWith(false);
        expect(pageSlotComponent.isLoaded).toHaveBeenCalledWith(true);
        expect(pageSlotComponent.isLoaded).toHaveBeenCalledTimes(2);
      });
    }));

    it('should call isLoaded 4 times', async(() => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(of(slotWithTwoComp));
      spyOn(pageSlotComponent, 'isLoaded').and.callThrough();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(pageSlotComponent.isLoaded).toHaveBeenCalledTimes(4);
      });
    }));
  });

  describe('smart edit', () => {
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
