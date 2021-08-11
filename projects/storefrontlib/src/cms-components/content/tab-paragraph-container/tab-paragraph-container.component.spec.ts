import { Component } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import {
  CmsConfig,
  CmsService,
  CMSTabParagraphContainer,
  EventService,
  I18nTestingModule,
  WindowRef,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
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

class MockEventService implements Partial<EventService> {
  get(): Observable<any> {
    return of();
  }
}

describe('TabParagraphContainerComponent', () => {
  let component: TabParagraphContainerComponent;
  let fixture: ComponentFixture<TabParagraphContainerComponent>;
  let cmsService: CmsService;
  let windowRef: WindowRef;
  let eventService: EventService;

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
          { provide: EventService, useClass: MockEventService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TabParagraphContainerComponent);
    component = fixture.componentInstance;
    cmsService = TestBed.inject(CmsService);
    windowRef = TestBed.inject(WindowRef);
    eventService = TestBed.inject(EventService);

    spyOn(console, 'warn');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render child components', () => {
    spyOn(cmsService, 'getComponentData').and.returnValues(
      of(mockTabComponentData1),
      of(mockTabComponentData2),
      of(mockTabComponentData3)
    );
    let childComponents: any[];
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
    windowRef.nativeWindow.history.pushState(
      {
        activeTab: 1,
      },
      null
    );
    component.ngOnInit();
    // reset the state
    windowRef.nativeWindow.history.replaceState(null, null);
    expect(component.activeTabNum).toEqual(1);
  });

  it('active tab number must be -1', () => {
    windowRef.nativeWindow.history.pushState(
      {
        activeTab: -1,
      },
      null
    );
    component.ngOnInit();
    // reset the state
    windowRef.nativeWindow.history.replaceState(null, null);
    expect(component.activeTabNum).toEqual(-1);
  });

  it('should be able to get tab title parameters from children when children are initialized', () => {
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

  it('should be able to get tab title parameters from children even children are not initialized', fakeAsync(() => {
    spyOn(cmsService, 'getComponentData').and.returnValues(
      of(mockTabComponentData1).pipe(delay(200)),
      of(mockTabComponentData2).pipe(delay(200)),
      of(mockTabComponentData3).pipe(delay(200))
    );
    spyOn(eventService, 'get').and.callFake((_) => {
      if (component.children.length > 0) {
        let childCompFixture: ComponentFixture<TestComponent>;
        childCompFixture = TestBed.createComponent(TestComponent);
        component.children.first.cmpRef = childCompFixture.componentRef;
      }
      return of({ id: mockTabComponentData1.uid }) as any;
    });
    fixture.detectChanges();

    tick(200);
    fixture.detectChanges();

    let param = '';
    component.tabTitleParams.forEach((param$) => {
      if (param$ != null) {
        param$.subscribe((value) => (param = value)).unsubscribe();
      }
    });
    expect(param).toEqual('title param');
  }));
});
