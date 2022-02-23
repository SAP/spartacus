import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CmsConfig,
  CmsService,
  CMSTabParagraphContainer,
  I18nTestingModule,
  WindowRef,
} from '@spartacus/core';
import { BreakpointService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/index';
import { OutletDirective } from '../../../cms-structure/outlet/index';
import { ComponentWrapperDirective } from '../../../cms-structure/page/component/component-wrapper.directive';
import { LayoutConfig } from '../../../layout/config/layout-config';
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

const mockTabComponentData1 = {
  uid: 'ProductDetailsTabComponent',
  flexType: 'ProductDetailsTabComponent',
};

const mockTabComponentData2 = {
  uid: 'ProductSpecsTabComponent',
  flexType: 'ProductSpecsTabComponent',
};

const mockTabComponentData3 = {
  uid: 'ProductReviewsTabComponent',
  flexType: 'ProductReviewsTabComponent',
};

const MockCmsService = {
  getComponentData: () => of(),
};

const MockCmsComponentData = <CmsComponentData<CMSTabParagraphContainer>>{
  data$: of(mockComponentData),
};

const MockBreakpointService = {
  isDown: () => of(false),
};

describe('TabParagraphContainerComponent', () => {
  let component: TabParagraphContainerComponent;
  let fixture: ComponentFixture<TabParagraphContainerComponent>;
  let cmsService: CmsService;
  let windowRef: WindowRef;
  let breakpointService: BreakpointService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
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
          { provide: BreakpointService, useValue: MockBreakpointService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TabParagraphContainerComponent);
    component = fixture.componentInstance;
    cmsService = TestBed.inject(CmsService);
    windowRef = TestBed.inject(WindowRef);
    breakpointService = TestBed.inject(BreakpointService);

    spyOn(console, 'warn');
  });

  it('should render child components', () => {
    spyOn(cmsService, 'getComponentData').and.returnValues(
      of(mockTabComponentData1),
      of(mockTabComponentData2),
      of(mockTabComponentData3)
    );
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

  it('should be able to get the active tab number', () => {
    windowRef.nativeWindow?.history.pushState(
      {
        activeTab: 1,
      },
      ''
    );
    component.ngOnInit();
    // reset the state
    windowRef.nativeWindow?.history.replaceState(null, '');
    expect(component.activeTabNum).toEqual(1);
  });

  it('active tab number must be -1', () => {
    windowRef.nativeWindow?.history.pushState(
      {
        activeTab: -1,
      },
      ''
    );
    component.ngOnInit();
    // reset the state
    windowRef.nativeWindow?.history.replaceState(null, '');
    expect(component.activeTabNum).toEqual(-1);
  });

  it('should be able to get tab title parameters from children', () => {
    spyOn(cmsService, 'getComponentData').and.returnValues(
      of(mockTabComponentData1),
      of(mockTabComponentData2),
      of(mockTabComponentData3)
    );
    fixture.detectChanges();

    let childCompFixture: ComponentFixture<TestComponent>;
    childCompFixture = TestBed.createComponent(TestComponent);

    component.children.first.cmpRef = childCompFixture.componentRef;
    component.ngAfterViewInit();

    let param = '';
    component.tabTitleParams.forEach((param$) => {
      if (param$ != null) {
        param$.subscribe((value) => (param = value)).unsubscribe();
      }
    });

    expect(param).toEqual('title param');
  });

  it('should be able to get tab title after tab component created', () => {
    let childCompFixture: ComponentFixture<TestComponent>;
    childCompFixture = TestBed.createComponent(TestComponent);

    component.tabCompLoaded(childCompFixture.componentRef);

    let param = '';
    component.tabTitleParams.forEach((param$) => {
      if (param$ != null) {
        param$.subscribe((value) => (param = value)).unsubscribe();
      }
    });

    expect(param).toEqual('title param');
  });

  it('should contain aria-expanded attribute on mobile', () => {
    spyOn(cmsService, 'getComponentData').and.returnValues(
      of(mockTabComponentData1),
      of(mockTabComponentData2),
      of(mockTabComponentData3)
    );
    spyOn(breakpointService, 'isDown').and.returnValue(of(true));

    fixture.detectChanges();

    const tabElements = fixture.debugElement.queryAll(By.css('button'));

    tabElements.forEach((tab) =>
      expect(tab.nativeElement.ariaExpanded).toBeDefined()
    );
  });

  it('should not contain aria-expanded attribute if not mobile', () => {
    spyOn(cmsService, 'getComponentData').and.returnValues(
      of(mockTabComponentData1),
      of(mockTabComponentData2),
      of(mockTabComponentData3)
    );

    spyOn(breakpointService, 'isDown').and.returnValue(of(false));

    fixture.detectChanges();

    const tabs = fixture.debugElement.queryAll(By.css('button'));

    tabs.forEach((tab) => expect(tab.nativeElement.ariaExpanded).toEqual(null));
  });
});
