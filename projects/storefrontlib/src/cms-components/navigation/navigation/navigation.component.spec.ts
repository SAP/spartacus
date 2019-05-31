import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CmsComponent, CmsNavigationComponent } from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { NavigationNode } from './navigation-node.model';
import { NavigationComponent } from './navigation.component';
import { NavigationComponentService } from './navigation.component.service';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-navigation-ui',
  template: '',
})
class MockNavigationUIComponent {
  @Input()
  dropdownMode = 'list';
  @Input()
  node: NavigationNode;
}

describe('CmsNavigationComponent', () => {
  let navigationComponent: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  const componentData: CmsNavigationComponent = {
    uid: 'MockNavigationComponent',
    typeCode: 'NavigationComponent',
    navigationNode: {
      uid: 'MockNavigationNode001',
      children: [
        {
          uid: 'MockChildNode001',
          entries: [
            {
              itemId: 'MockLink001',
              itemSuperType: 'AbstractCMSComponent',
              itemType: 'CMSLinkComponent',
            },
          ],
        },
        {
          uid: 'MockChildNode002',
          entries: [
            {
              itemId: 'MockLink002',
              itemSuperType: 'AbstractCMSComponent',
              itemType: 'CMSLinkComponent',
            },
          ],
        },
      ],
    },
  };

  const componentData$ = new BehaviorSubject(componentData);

  const mockCmsComponentData = <CmsComponentData<CmsComponent>>{
    data$: componentData$.asObservable(),
  };

  const mockNavigationService = {
    getComponentData: createSpy().and.returnValue(of(null)),
    createNavigation: createSpy().and.returnValue(of(mockCmsComponentData)),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: NavigationComponentService,
          useValue: mockNavigationService,
        },
      ],
      declarations: [NavigationComponent, MockNavigationUIComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    navigationComponent = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(navigationComponent).toBeTruthy();
  });

  it('should render navigation-ui component', () => {
    const getNav = () => fixture.debugElement.query(By.css('cx-navigation-ui'));
    navigationComponent.node$ = of({});
    fixture.detectChanges();
    const nav = getNav().nativeElement;
    expect(nav).toBeTruthy();
  });
});
