import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of, BehaviorSubject } from 'rxjs';
import createSpy = jasmine.createSpy;

import { NavigationComponent } from './navigation.component';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'cx-navigation-ui',
  template: ''
})
class MockNavigationUIComponent {
  @Input()
  dropdownMode = 'list';
  @Input()
  node;
}

describe('CmsNavigationComponent in CmsLib', () => {
  let navigationComponent: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  const componentData = {
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
              itemType: 'CMSLinkComponent'
            }
          ]
        },
        {
          uid: 'MockChildNode002',
          entries: [
            {
              itemId: 'MockLink002',
              itemSuperType: 'AbstractCMSComponent',
              itemType: 'CMSLinkComponent'
            }
          ]
        }
      ]
    }
  };

  const componentData$ = new BehaviorSubject(componentData);

  const mockCmsComponentData = {
    data$: componentData$.asObservable()
  };

  const mockNavigationService = {
    getNodes: createSpy().and.returnValue(of(mockCmsComponentData)),
    getComponentData: createSpy().and.returnValue(of(null))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NavigationService, useValue: mockNavigationService }
      ],
      declarations: [NavigationComponent, MockNavigationUIComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    navigationComponent = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(navigationComponent).toBeTruthy();
  });

  it('should get component data from service', () => {
    navigationComponent.getComponentData();
    expect(mockNavigationService.getComponentData).toHaveBeenCalled();
  });

  it('should render navigation-ui component', () => {
    const getNav = () => fixture.debugElement.query(By.css('cx-navigation-ui'));
    navigationComponent.node = {};
    navigationComponent.dropdownMode = 'column';
    fixture.detectChanges();
    const nav = getNav().nativeElement;
    expect(nav).toBeTruthy();
  });
});
