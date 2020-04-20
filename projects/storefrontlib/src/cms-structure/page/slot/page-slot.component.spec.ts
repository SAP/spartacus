import { Component, Renderer2 } from '@angular/core';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
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
  getComponentData() {}
}

class MockDynamicAttributeService {
  addDynamicAttributes() {}
}

class MockCmsMappingService {}

const MockSkipLinkConfig: SkipLinkConfig = { skipLinks: [] };

@Component({
  template: `
    <cx-page-slot
      position="Section1"
      class="existing-style and-more"
    ></cx-page-slot>
  `,
})
class MockHostComponent {}

@Component({
  template: `
    <div cx-page-slot position="Section2" class="existing-style and-more"></div>
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

  { provide: ComponentFixtureAutoDetect, useValue: true },
];

fdescribe('PageSlotComponent', () => {
  let cmsService: CmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PageSlotComponent,
        OutletDirective,
        SkipLinkDirective,
        MockHostComponent,
        MockHostWithDivComponent,
      ],
      providers,
    }).compileComponents();

    cmsService = TestBed.inject(CmsService);
    // fixture = TestBed.createComponent(PageSlotComponent);
    // pageSlotComponent = fixture.componentInstance;
    // dynamicAttributeService = TestBed.inject(DynamicAttributeService);
    // renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as any);
  });

  describe('page slot', () => {
    let fixture: ComponentFixture<PageSlotComponent>;
    let pageSlotComponent: PageSlotComponent;
    let dynamicAttributeService: DynamicAttributeService;
    let renderer: Renderer2;

    beforeEach(async () => {
      fixture = TestBed.createComponent(PageSlotComponent);
      pageSlotComponent = fixture.componentInstance;

      fixture.detectChanges();
      await fixture.whenStable();

      dynamicAttributeService = TestBed.inject(DynamicAttributeService);
      renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as any);
    });

    it('should be created', () => {
      expect(pageSlotComponent).toBeTruthy();
    });

    describe('cx-pending class', () => {
      // let componentFixture: ComponentFixture<PageSlotComponent>;
      // let component: PageSlotComponent;

      // beforeEach(async () => {
      //   componentFixture = TestBed.createComponent(PageSlotComponent);
      //   component = fixture.componentInstance;
      //   componentFixture.detectChanges();
      //   await componentFixture.whenStable();
      // });

      it('should have cx-pending class with isPending = true', () => {
        pageSlotComponent.isPending = true;
        fixture.detectChanges();
        const el = <HTMLElement>fixture.debugElement.nativeElement;
        expect(el.classList).toContain('cx-pending');
      });

      it('should not have cx-pending class with isPending = false', () => {
        pageSlotComponent.isPending = false;
        fixture.detectChanges();
        const el = <HTMLElement>fixture.debugElement.nativeElement;
        expect(el.classList).not.toContain('cx-pending');
      });

      it('should not have cx-pending class when there is no slot data', fakeAsync(() => {
        spyOn(cmsService, 'getContentSlot').and.returnValue(of(null));
        fixture.detectChanges();
        tick();
        expect(pageSlotComponent.class).not.toContain('cx-pending');
        expect(pageSlotComponent.isPending).toEqual(false);
      }));

      it('should not have cx-pending class when there is empty slot data', fakeAsync(() => {
        spyOn(cmsService, 'getContentSlot').and.returnValue(of({}));
        fixture.detectChanges();
        tick();
        expect(pageSlotComponent.class).not.toContain('cx-pending');
        expect(pageSlotComponent.isPending).toEqual(false);
      }));

      describe('page slot with one component', () => {
        let fixture2: ComponentFixture<PageSlotComponent>;
        let component: PageSlotComponent;

        beforeEach(async () => {
          spyOn(cmsService, 'getContentSlot').and.returnValue(
            of(slotWithOneComp)
          );

          fixture2 = TestBed.createComponent(PageSlotComponent);
          component = fixture2.componentInstance;

          fixture2.detectChanges();
          await fixture2.whenStable();
        });

        fit('should have cx-pending class when there is at least one component', () => {
          // fixture.detectChanges();
          // tick();
          expect(component.isPending).toEqual(true);
        });
      });

      it('should no longer have cx-pending when the components are loaded', fakeAsync(() => {
        spyOn(cmsService, 'getContentSlot').and.returnValue(
          of({ components: [{}] } as ContentSlotData)
        );
        fixture.detectChanges();
        tick();
        // simulate component load
        pageSlotComponent.isLoaded(true);
        expect(pageSlotComponent.isPending).toEqual(false);
      }));

      it('should still have cx-pending class when not all components are loaded', fakeAsync(() => {
        spyOn(cmsService, 'getContentSlot').and.returnValue(
          of(slotWithTwoComp)
        );
        fixture.detectChanges();
        tick();
        // simulate component load
        pageSlotComponent.isLoaded(true);
        expect(pageSlotComponent.isPending).toEqual(true);
      }));

      it('should no longer have cx-pending when all components are loaded', fakeAsync(() => {
        spyOn(cmsService, 'getContentSlot').and.returnValue(
          of(slotWithTwoComp)
        );
        fixture.detectChanges();
        tick();
        expect(pageSlotComponent.isPending).toEqual(true);
        // simulate component load
        pageSlotComponent.isLoaded(true);
        pageSlotComponent.isLoaded(true);
        expect(pageSlotComponent.isPending).toEqual(false);
      }));
    });

    describe('components$', () => {
      it('should have empty component list if slot is falsy', () => {
        spyOn(cmsService, 'getContentSlot').and.returnValue(of(undefined));
        // pageSlotComponent.position = 'Section1';
        let results;
        pageSlotComponent.components$
          .subscribe((c) => (results = c))
          .unsubscribe();
        expect(results).toEqual([]);
      });

      it('should have empty component list if slot is empty', () => {
        spyOn(cmsService, 'getContentSlot').and.returnValue(of({}));
        // pageSlotComponent.position = 'Section2';
        let results;
        pageSlotComponent.components$
          .subscribe((components) => (results = components))
          .unsubscribe();
        expect(results).toEqual([]);
      });

      it('should have one components', () => {
        spyOn(cmsService, 'getContentSlot').and.returnValue(
          of(slotWithOneComp)
        );
        // pageSlotComponent.position = 'Section1';
        let results;
        pageSlotComponent.components$
          .subscribe((c) => (results = c))
          .unsubscribe();
        expect(results.length).toEqual(1);
      });

      it('should have two components', () => {
        spyOn(cmsService, 'getContentSlot').and.returnValue(
          of(slotWithTwoComp)
        );
        pageSlotComponent.position = 'Section4';
        let results;
        pageSlotComponent.components$
          .subscribe((components) => (results = components))
          .unsubscribe();
        expect(results.length).toEqual(2);
      });

      // describe('decorate()', () => {
      //   it('should decorate once', () => {
      //     spyOn(pageSlotComponent as any, 'decorate');
      //     pageSlotComponent.position = 'Section5';

      //     pageSlotComponent.components$.subscribe().unsubscribe();
      //     pageSlotComponent.components$.subscribe().unsubscribe();

      //     expect((pageSlotComponent as any).decorate).toHaveBeenCalledTimes(1);
      //   });
      // });
    });

    xdescribe('slot position style class', () => {
      let componentFixture: ComponentFixture<PageSlotComponent>;
      let component: PageSlotComponent;
      let el: HTMLElement;

      beforeEach(async () => {
        spyOn(cmsService, 'getContentSlot').and.callThrough();
        componentFixture = TestBed.createComponent(PageSlotComponent);
        component = fixture.componentInstance;

        componentFixture.detectChanges();
        await componentFixture.whenStable();

        el = <HTMLElement>fixture.debugElement.nativeElement;
      });

      // beforeEach(async () => {
      //   fixture.detectChanges();
      //   await fixture.whenStable();
      // });

      it('should call cmsService.getContentSlot with undefined', () => {
        expect(cmsService.getContentSlot).toHaveBeenCalledWith(undefined);
      });

      it('should not add style classes if there is no position given', () => {
        expect(el.classList.toString()).toEqual('');
      });

      it('should add position as a style class to the host element', fakeAsync(() => {
        component.position = 'Section1';
        fixture.detectChanges();
        tick();
        expect(el.classList).toContain('Section1');
      }));

      it('should not remove host class (if any)', fakeAsync(() => {
        component.class = 'outer-style and-more';
        component.position = 'Section1';
        fixture.detectChanges();
        tick();
        expect(el.classList).toContain('outer-style');
        expect(el.classList).toContain('and-more');
        expect(el.classList).toContain('Section1');
      }));
    });

    xdescribe('page-fold class', () => {
      it('should not have page-fold class by default', () => {
        fixture.detectChanges();
        const el = <HTMLElement>fixture.debugElement.nativeElement;
        expect(el.classList).not.toContain('page-fold');
      });

      it('should add page-fold class when isPageFold=true', () => {
        pageSlotComponent.isPageFold = true;
        fixture.detectChanges();
        const el = <HTMLElement>fixture.debugElement.nativeElement;
        expect(el.classList).toContain('page-fold');
      });

      it('should remove page-fold class when isPageFold=true', () => {
        pageSlotComponent.isPageFold = true;
        fixture.detectChanges();
        pageSlotComponent.isPageFold = false;
        fixture.detectChanges();
        const el = <HTMLElement>fixture.debugElement.nativeElement;
        expect(el.classList).not.toContain('page-fold');
      });

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

    xdescribe('has-components class', () => {
      beforeEach(() => {
        pageSlotComponent.position = 'Section1';
      });

      it('should add has-components class when slot has at least one components', fakeAsync(() => {
        spyOn(cmsService, 'getContentSlot').and.returnValue(
          of(slotWithOneComp)
        );
        fixture.detectChanges();
        tick();
        expect(pageSlotComponent.class).toContain('has-components');
      }));

      it('should add has-components class when slot has multiple components', fakeAsync(() => {
        spyOn(cmsService, 'getContentSlot').and.returnValue(
          of(slotWithTwoComp)
        );
        fixture.detectChanges();
        tick();
        expect(pageSlotComponent.class).toContain('has-components');
      }));

      it('should not add has-components class when slot has no components', fakeAsync(() => {
        spyOn(cmsService, 'getContentSlot').and.returnValue(
          of({ components: [] } as ContentSlotData)
        );
        fixture.detectChanges();
        tick();
        expect(pageSlotComponent.class).not.toContain('has-components');
      }));
    });

    xdescribe('Component Defer Options', () => {
      it('should return DEFER strategy for component', () => {
        fixture.detectChanges();
        expect(
          pageSlotComponent.getComponentDeferOptions('CMSTestComponent')
            .deferLoading
        ).toEqual(DeferLoadingStrategy.DEFER);
      });

      it('should return no strategy for deferLoading for unknown component', () => {
        fixture.detectChanges();
        expect(
          pageSlotComponent.getComponentDeferOptions('UnknownComponent')
            .deferLoading
        ).toBeUndefined();
      });
    });

    xdescribe('SmartEdit integration', () => {
      it('should add page slot contract', fakeAsync(() => {
        pageSlotComponent.position = 'Section1';
        spyOn(
          dynamicAttributeService,
          'addDynamicAttributes'
        ).and.callThrough();
        spyOn(cmsService, 'isLaunchInSmartEdit').and.returnValue(true);

        fixture.detectChanges();
        tick();

        fixture.detectChanges();

        const native = fixture.debugElement.nativeElement;
        expect(
          dynamicAttributeService.addDynamicAttributes
        ).toHaveBeenCalledWith(
          {
            smartedit: {
              test: 'test',
            },
          },
          native,
          renderer
        );
      }));

      it('should not add page slot contract', fakeAsync(() => {
        pageSlotComponent.position = 'Section1';
        spyOn(
          dynamicAttributeService,
          'addDynamicAttributes'
        ).and.callThrough();
        spyOn(cmsService, 'isLaunchInSmartEdit').and.returnValue(false);

        fixture.detectChanges();
        tick();

        fixture.detectChanges();
        expect(
          dynamicAttributeService.addDynamicAttributes
        ).not.toHaveBeenCalled();
      }));
    });
  });

  xdescribe('host the page-slot component', () => {
    let el: HTMLElement;
    let compFixture;

    beforeEach(async () => {
      compFixture = TestBed.createComponent(MockHostComponent);
      compFixture.detectChanges();
      await compFixture.whenStable();
      el = compFixture.debugElement.query(By.css('cx-page-slot')).nativeElement;
    });

    it('should add position as a style class', () => {
      expect(el.classList).toContain('Section1');
    });

    it('should keep existin host classes', () => {
      expect(el.classList).toContain('Section1');
      expect(el.classList).toContain('existing-style');
      expect(el.classList).toContain('and-more');
    });
  });

  xdescribe('host the page-slot attribute directive', () => {
    let el: HTMLElement;
    let compFixture;

    beforeEach(async () => {
      compFixture = TestBed.createComponent(MockHostWithDivComponent);
      compFixture.detectChanges();
      await compFixture.whenStable();
      el = compFixture.debugElement.query(By.css('div')).nativeElement;
    });

    it('should get a position class', fakeAsync(() => {
      expect(el.classList).toContain('Section2');
    }));

    it('should keep existing classes', () => {
      expect(el.classList).toContain('Section2');
      expect(el.classList).toContain('existing-style');
      expect(el.classList).toContain('and-more');
    });
  });
});
