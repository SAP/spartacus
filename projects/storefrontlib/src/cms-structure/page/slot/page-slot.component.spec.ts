import { Component, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CmsConfig,
  CmsService,
  ContentSlotData,
  DeferLoadingStrategy,
  DynamicAttributeService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { SkipLinkDirective } from '../../../layout/a11y/index';
import { DeferLoaderService } from '../../../layout/loading/defer-loader.service';
import { OutletDirective } from '../../outlet/index';
import { CmsMappingService } from '../../services/cms-mapping.service';
import { PageSlotComponent } from './page-slot.component';

// const slotWithOneComp = {
//   components: [
//     {
//       flexType: 'BannerComponent',
//     },
//   ],
// };

// const slotWithTwoComp = {
//   components: [
//     {
//       flexType: 'BannerComponent',
//     },
//     {
//       flexType: 'ParagraphComponent',
//     },
//   ],
// };

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
    provide: DeferLoaderService,
    useClass: MockDeferLoaderService,
  },
  {
    provide: CmsConfig,
    useValue: MockCmsConfig,
  },
];

fdescribe('PageSlotComponent', () => {
  let fixture: ComponentFixture<PageSlotComponent>;
  let pageSlotComponent: PageSlotComponent;
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
    spyOn(cmsService, 'getContentSlot').and.returnValue(of(null));

    fixture = TestBed.createComponent(PageSlotComponent);
    pageSlotComponent = fixture.componentInstance;
    // dynamicAttributeService = TestBed.inject(DynamicAttributeService);
    // renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as any);
  });

  it('should be created', () => {
    expect(pageSlotComponent).toBeTruthy();
  });

  describe('cx-pending class', () => {
    it('should not have cx-pending class when there is no slot data', () => {
      fixture.detectChanges();
      expect(pageSlotComponent.class).not.toContain('cx-pending');
      expect(pageSlotComponent.isPending).toEqual(false);
    });
  });
});
