import { Directive, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ContentSlotComponentData,
  I18nTestingModule,
  CMSTabParagraphContainer,
} from '@spartacus/core';
import { TabParagraphContainerComponent } from './tab-paragraph-container.component';
import { OutletDirective } from '../../../cms-structure/outlet/index';
import { CmsComponentData } from '../../../cms-structure/index';
import { of } from 'rxjs';

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

const MockCmsComponentData = <CmsComponentData<CMSTabParagraphContainer>>{
  data$: of(mockComponentData),
};

describe('TabParagraphContainerComponent', () => {
  let component: TabParagraphContainerComponent;
  let fixture: ComponentFixture<TabParagraphContainerComponent>;

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
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabParagraphContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render child components', () => {
    let childComponents;
    component.components$.subscribe(
      components => (childComponents = components)
    );

    for (let i = 0; i < childComponents.length; i++) {
      expect(childComponents[i]).toEqual({
        flexType: mockComponents[i],
        typeCode: mockComponents[i],
        uid: mockComponents[i],
      });
    }
  });
});
