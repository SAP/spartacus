import { Directive, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ContentSlotComponentData,
  I18nTestingModule,
  CMSTabParagraphContainer,
  CmsService,
} from '@spartacus/core';
import { TabParagraphContainerComponent } from './tab-paragraph-container.component';
import { OutletDirective } from '../../../cms-structure/outlet/index';
import { CmsComponentData } from '../../../cms-structure/index';
import { of, Observable } from 'rxjs';

@Directive({
  selector: '[cxComponentWrapper]',
})
export class MockComponentWrapperDirective {
  @Input() cxComponentWrapper: ContentSlotComponentData;
}

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
  getComponentData: () => of(mockComponentData),
};

const MockCmsComponentData = <CmsComponentData<CMSTabParagraphContainer>>{
  data$: of(mockComponentData),
};

describe('TabParagraphContainerComponent', () => {
  let component: TabParagraphContainerComponent;
  let fixture: ComponentFixture<TabParagraphContainerComponent>;
  let cmsService: CmsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        TabParagraphContainerComponent,
        MockComponentWrapperDirective,
        OutletDirective,
      ],
      providers: [
        { provide: CmsComponentData, useValue: MockCmsComponentData },
        { provide: CmsService, useValue: MockCmsService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabParagraphContainerComponent);
    component = fixture.componentInstance;
    cmsService = TestBed.get(CmsService);
    fixture.detectChanges();
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
    let childComponents$: Observable<any>[];
    component.components$
      .subscribe(components => (childComponents$ = components))
      .unsubscribe();

    for (let i = 0; i < childComponents$.length; i++) {
      childComponents$[i]
        .subscribe(tab => {
          expect(tab).toEqual({
            flexType: mockComponents[i],
            uid: mockComponents[i],
            title: `productTabs.${mockComponents[i]}`,
          });
        })
        .unsubscribe();
    }
  });
});
