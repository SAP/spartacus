import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CmsNavigationComponent } from '@spartacus/core';
import {
  CmsComponentData,
  NavigationNode,
  NavigationService,
} from '@spartacus/storefront';
import { of } from 'rxjs';
import { MyAccountV2NavigationComponent } from './my-account-v2-navigation.component';
import { NavigationUIComponent } from '../../../navigation/navigation/navigation-ui.component';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-navigation-ui',
  template: '',
})
class MockNavigationUIComponent {
  @Input()
  node: NavigationNode;
  @Input()
  navAriaLabel: string;
}
const mockCmsComponentData = <CmsNavigationComponent>{
  styleClass: 'footer-styling',
};

const MockCmsNavigationComponent = <CmsComponentData<any>>{
  data$: of(mockCmsComponentData),
};

describe('MyAccountV2NavigationComponent', () => {
  let component: MyAccountV2NavigationComponent;
  let fixture: ComponentFixture<MyAccountV2NavigationComponent>;

  const mockNavigationService = {
    createNavigation: createSpy().and.returnValue(of(null)),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MyAccountV2NavigationComponent],
      providers: [
        {
          provide: NavigationService,
          useValue: mockNavigationService,
        },
        {
          provide: CmsComponentData,
          useValue: MockCmsNavigationComponent,
        },
      ],
    })
      .overrideComponent(MyAccountV2NavigationComponent, {
        remove: { imports: [NavigationUIComponent] },
        add: { imports: [MockNavigationUIComponent] },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountV2NavigationComponent);
    component = fixture.componentInstance;
    component.styleClass$ = of(mockCmsComponentData.styleClass);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
