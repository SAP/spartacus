import { Component, Directive, Input, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CmsService,
  ContentSlotData,
  DynamicAttributeService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { SkipLinkDirective } from '../../../layout/a11y/index';
import { DeferLoaderService } from '../../../layout/loading/defer-loader.service';
import { OutletDirective } from '../../outlet/index';
import { PageSlotComponent } from './page-slot.component';
import { PageSlotService } from './page-slot.service';

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
  getComponentData(): void {}
}

class MockDynamicAttributeService {
  addAttributesToSlot() {}
}

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

class MockPageSlotService implements Partial<PageSlotService> {
  getComponentDeferOptions = () => undefined;
}
@Directive({
  selector: '[cxComponentWrapper]',
})
class MockComponentWrapperDirective {
  @Input() cxComponentWrapper;
}
const providers = [
  Renderer2,
  {
    provide: CmsService,
    useClass: MockCmsService,
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
    provide: PageSlotService,
    useClass: MockPageSlotService,
  },
];

describe('PageSlotComponent', () => {
  let fixture: ComponentFixture<PageSlotComponent>;
  let pageSlotComponent: PageSlotComponent;
  let cmsService: CmsService;
  let dynamicAttributeService: DynamicAttributeService;
  let renderer: Renderer2;
  let pageSlotService: PageSlotService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PageSlotComponent,
        OutletDirective,
        SkipLinkDirective,
        MockHostComponent,
        MockHostWithDivComponent,
        MockComponentWrapperDirective,
      ],
      providers,
    }).compileComponents();

    cmsService = TestBed.inject(CmsService);
    pageSlotService = TestBed.inject(PageSlotService);
    spyOn(pageSlotService, 'getComponentDeferOptions').and.callThrough();

    fixture = TestBed.createComponent(PageSlotComponent);
    pageSlotComponent = fixture.componentInstance;

    dynamicAttributeService = TestBed.inject(DynamicAttributeService);
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as any);
  });

  it('should be created', () => {
    expect(pageSlotComponent).toBeTruthy();
  });

  describe('position', () => {
    it('should return undefined for position', () => {
      expect(pageSlotComponent.position).toBeUndefined();
    });

    it('should return the given position', () => {
      pageSlotComponent.position = 'Section1';
      expect(pageSlotComponent.position).toEqual('Section1');
    });

    it('should return the updated position', () => {
      pageSlotComponent.position = 'Section1';
      pageSlotComponent.position = 'Section2';
      expect(pageSlotComponent.position).toEqual('Section2');
    });

    it('should have Section1 class', () => {
      pageSlotComponent.position = 'Section1';
      fixture.detectChanges();
      expect(pageSlotComponent.class).toContain('Section1');
    });

    it('should not have Section1 class anymore', () => {
      pageSlotComponent.position = 'Section1';
      fixture.detectChanges();
      expect(pageSlotComponent.class).toContain('Section1');

      pageSlotComponent.position = 'Section2';
      fixture.detectChanges();
      expect(pageSlotComponent.class).not.toContain('Section1');
      expect(pageSlotComponent.class).toContain('Section2');
    });

    it('should keep custom classes next to Section1', () => {
      pageSlotComponent.class = 'custom styles';
      pageSlotComponent.position = 'Section1';
      fixture.detectChanges();
      expect(pageSlotComponent.class).toContain('Section1');
      expect(pageSlotComponent.class).toContain('custom');
      expect(pageSlotComponent.class).toContain('styles');
    });
  });

  describe('cx-pending style class', () => {
    it('should not have cx-pending class when there is no slot data', () => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(of(null));
      fixture.detectChanges();
      expect(pageSlotComponent.class).not.toContain('cx-pending');
      expect(pageSlotComponent.isPending).toEqual(false);
    });

    it('should not have cx-pending class when there is empty slot data', () => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(of({}));
      fixture.detectChanges();
      expect(pageSlotComponent.class).not.toContain('cx-pending');
      expect(pageSlotComponent.isPending).toEqual(false);
    });

    it('should have cx-pending class when there is at least one component', () => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(of(slotWithOneComp));
      fixture.detectChanges();
      expect(pageSlotComponent.isPending).toEqual(true);
    });

    it('should no longer have cx-pending when the components are loaded', () => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(
        of({ components: [{}] } as ContentSlotData)
      );
      fixture.detectChanges();
      // simulate component load
      pageSlotComponent.isLoaded(true);

      fixture.detectChanges();
      expect(pageSlotComponent.isPending).toEqual(false);
    });

    it('should still have cx-pending class when not all components are loaded', () => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(of(slotWithTwoComp));
      fixture.detectChanges();
      // simulate component load
      pageSlotComponent.isLoaded(true);
      fixture.detectChanges();

      expect(pageSlotComponent.isPending).toEqual(true);
    });

    it('should no longer have cx-pending when all components are loaded', () => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(of(slotWithTwoComp));
      fixture.detectChanges();

      expect(pageSlotComponent.isPending).toEqual(true);
      // simulate component load
      pageSlotComponent.isLoaded(true);
      pageSlotComponent.isLoaded(true);
      fixture.detectChanges();

      expect(pageSlotComponent.isPending).toEqual(false);
    });
  });

  describe('components', () => {
    it('should have empty component list if slot is undefined', () => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(of(undefined));
      fixture.detectChanges();
      let results;
      pageSlotComponent.components$
        .subscribe((c) => (results = c))
        .unsubscribe();
      expect(results).toEqual([]);
    });

    it('should have empty component list if slot is empty', () => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(of({}));
      fixture.detectChanges();
      let results;
      pageSlotComponent.components$
        .subscribe((components) => (results = components))
        .unsubscribe();
      expect(results).toEqual([]);
    });

    it('should have one components', () => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(of(slotWithOneComp));
      fixture.detectChanges();
      let results;
      pageSlotComponent.components$
        .subscribe((c) => (results = c))
        .unsubscribe();
      expect(results.length).toEqual(1);
    });

    it('should have two components', () => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(of(slotWithTwoComp));
      fixture.detectChanges();
      let results;
      pageSlotComponent.components$
        .subscribe((components) => (results = components))
        .unsubscribe();
      expect(results.length).toEqual(2);
    });
  });

  describe('page-fold class', () => {
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

      const el = <HTMLElement>fixture.debugElement.nativeElement;
      expect(el.classList).toContain('page-fold');

      pageSlotComponent.isPageFold = false;
      fixture.detectChanges();

      expect(el.classList).not.toContain('page-fold');
    });
  });

  describe('has-components class', () => {
    it('should not add has-components class when slot has no components', () => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(of({}));
      fixture.detectChanges();
      expect(pageSlotComponent.hasComponents).toEqual(false);
    });

    it('should add has-components class when slot has at least one components', () => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(of(slotWithOneComp));
      fixture.detectChanges();
      expect(pageSlotComponent.hasComponents).toEqual(true);
    });

    it('should add has-components class when slot has multiple components', () => {
      spyOn(cmsService, 'getContentSlot').and.returnValue(of(slotWithTwoComp));
      fixture.detectChanges();
      expect(pageSlotComponent.hasComponents).toEqual(true);
    });
  });

  describe('Component Defer Options', () => {
    it('should call pageSlotService.getComponentDeferOptions', () => {
      fixture.detectChanges();
      pageSlotComponent.getComponentDeferOptions('CMSTestComponent');
      expect(pageSlotService.getComponentDeferOptions).toHaveBeenCalledWith(
        undefined,
        'CMSTestComponent'
      );
    });
  });

  describe('SmartEdit integration', () => {
    it('should add page slot contract', () => {
      spyOn(dynamicAttributeService, 'addAttributesToSlot').and.callThrough();

      fixture.detectChanges();

      const native = fixture.debugElement.nativeElement;
      expect(dynamicAttributeService.addAttributesToSlot).toHaveBeenCalledWith(
        native,
        renderer,
        {
          properties: {
            smartedit: {
              test: 'test',
            },
          },
        }
      );
    });
  });

  describe('host the page-slot component', () => {
    let el: HTMLElement;
    let compFixture;

    beforeEach(async () => {
      compFixture = TestBed.createComponent(MockHostComponent);
      compFixture.detectChanges();
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

  describe('host the page-slot attribute directive', () => {
    let el: HTMLElement;
    let compFixture;

    beforeEach(async () => {
      compFixture = TestBed.createComponent(MockHostWithDivComponent);
      compFixture.detectChanges();
      el = compFixture.debugElement.query(By.css('div')).nativeElement;
    });

    it('should get a position class', () => {
      expect(el.classList).toContain('Section2');
    });

    it('should keep existing classes', () => {
      expect(el.classList).toContain('Section2');
      expect(el.classList).toContain('existing-style');
      expect(el.classList).toContain('and-more');
    });
  });
});
