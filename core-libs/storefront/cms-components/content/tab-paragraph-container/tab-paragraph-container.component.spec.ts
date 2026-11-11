import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CmsComponent,
  CmsConfig,
  CmsService,
  CMSTabParagraphContainer,
  MockTranslatePipe,
  MockTranslationService,
  TranslatePipe,
  TranslationService,
  WindowRef,
} from '@spartacus/core';
import { MockFeatureDirective } from '@spartacus/storefront/testing/mock-feature-directive';
import { EMPTY, of } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/index';
import { OutletDirective } from '../../../cms-structure/outlet/index';
import { ComponentWrapperDirective } from '../../../cms-structure/page/component/component-wrapper.directive';
import { LayoutConfig } from '../../../layout/config/layout-config';
import { TabComponent } from '../tab/tab.component';
import { TabParagraphContainerComponent } from './tab-paragraph-container.component';

@Component({
  selector: 'cx-test-cmp',
  template: '',
})
class TestComponent {
  tabTitleParam$ = of('title param');
}

const MockCmsModuleConfig: CmsConfig = {
  cmsComponents: {
    CMSTestComponent: {
      component: TestComponent,
    },
  },
};

const MockLayoutConfig: LayoutConfig = {};

const mockComponents = [
  'ProductDetailsTabComponent',
  'ProductSpecsTabComponent',
  'ProductReviewsTabComponent',
];

const mockComponentData: CMSTabParagraphContainer = {
  components: mockComponents.join(' '),
  container: 'true',
  name: 'Tab container',
  typeCode: 'CMSTabParagraphContainer',
  uid: 'TabPanelContainer',
};

interface MockCmsComponent extends CmsComponent {
  flexType: string;
}

const mockTabComponentData1: MockCmsComponent = {
  uid: 'ProductDetailsTabComponent',
  flexType: 'ProductDetailsTabComponent',
};

const mockTabComponentData2: MockCmsComponent = {
  uid: 'ProductSpecsTabComponent',
  flexType: 'ProductSpecsTabComponent',
};

const mockTabComponentData3: MockCmsComponent = {
  uid: 'ProductReviewsTabComponent',
  flexType: 'ProductReviewsTabComponent',
};

const MockCmsService = {
  getComponentData: () => EMPTY,
};

const MockCmsComponentData = <CmsComponentData<CMSTabParagraphContainer>>{
  data$: of(mockComponentData),
};

describe('TabParagraphContainerComponent', () => {
  let component: TabParagraphContainerComponent;
  let fixture: ComponentFixture<TabParagraphContainerComponent>;
  let cmsService: CmsService;
  let windowRef: WindowRef;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        TestComponent,
        TabParagraphContainerComponent,
        ComponentWrapperDirective,
        OutletDirective,
      ],
      providers: [
        WindowRef,
        { provide: CmsComponentData, useValue: MockCmsComponentData },
        { provide: CmsService, useValue: MockCmsService },
        { provide: CmsConfig, useValue: MockCmsModuleConfig },
        { provide: LayoutConfig, useValue: MockLayoutConfig },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    })
      .overrideComponent(TabParagraphContainerComponent, {
        add: { imports: [MockFeatureDirective] },
      })
      .overrideComponent(TabComponent, {
        remove: { imports: [TranslatePipe] },
        add: { imports: [MockTranslatePipe] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabParagraphContainerComponent);
    component = fixture.componentInstance;
    cmsService = TestBed.inject(CmsService);
    windowRef = TestBed.inject(WindowRef);

    vi.spyOn(console, 'warn');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render child components', () => {
    vi.spyOn(cmsService, 'getComponentData')
      .mockReturnValueOnce(of(mockTabComponentData1))
      .mockReturnValueOnce(of(mockTabComponentData2))
      .mockReturnValueOnce(of(mockTabComponentData3));
    let childComponents: any[] = [];
    component.components$
      .subscribe((components) => (childComponents = components))
      .unsubscribe();

    for (let i = 0; i < childComponents.length; i++) {
      expect(childComponents[i]).toEqual({
        flexType: mockComponents[i],
        uid: mockComponents[i],
        title: `TabPanelContainer.tabs.${mockComponents[i]}`,
      });
    }
  });

  it('should filter out null or undefined components from components$', () => {
    vi.spyOn(cmsService, 'getComponentData')
      .mockReturnValueOnce(of(mockTabComponentData1))
      .mockReturnValueOnce(of(null))
      .mockReturnValueOnce(of(mockTabComponentData3));

    let childComponents: any[] = [];
    component.components$
      .subscribe((components) => (childComponents = components))
      .unsubscribe();

    expect(childComponents.length).toEqual(2);
    expect(childComponents).toEqual([
      {
        flexType: mockTabComponentData1.uid,
        uid: mockTabComponentData1.uid,
        title: `TabPanelContainer.tabs.${mockTabComponentData1.uid}`,
      },
      {
        flexType: mockTabComponentData3.uid,
        uid: mockTabComponentData3.uid,
        title: `TabPanelContainer.tabs.${mockTabComponentData3.uid}`,
      },
    ]);
  });

  it('should resolve title parameters for a component loaded before view initialization', () => {
    vi.spyOn(cmsService, 'getComponentData').mockReturnValue(
      of(mockTabComponentData1)
    );
    const child = TestBed.createComponent(TestComponent);
    component.tabCompLoaded(child.componentRef, mockTabComponentData1.uid);
    fixture.detectChanges();

    let param: unknown;
    component.tabs$
      .subscribe((tabs) => {
        param = tabs[0].headerParams?.param;
      })
      .unsubscribe();

    expect(param).toEqual('title param');
  });

  it('should not throw when a resolved component is undefined', () => {
    // `components$` emits `undefined` for a tab whose CMS data resolves falsy
    // (see the `if (!tab) return undefined;` mapping). The template must render
    // such entries without dereferencing the undefined component, i.e. guard
    // both `[cxOutlet]="component?.flexType"` and `*ngIf="component"` on the
    // component wrapper.
    vi.spyOn(cmsService, 'getComponentData')
      .mockReturnValueOnce(of(mockTabComponentData1))
      .mockReturnValueOnce(of(null))
      .mockReturnValueOnce(of(mockTabComponentData3));

    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
