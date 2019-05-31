import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CmsComponent } from '@spartacus/core';
import { of } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { NavigationNode } from '../navigation/navigation-node.model';
import { NavigationComponent } from '../navigation/navigation.component';
import { NavigationComponentService } from '../navigation/navigation.component.service';
import { FooterNavigationComponent } from './footer-navigation.component';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-navigation-ui',
  template: '',
})
class MockNavigationUIComponent {
  @Input() flyout = true;
  @Input() node: NavigationNode;
}

@Component({
  selector: 'cx-generic-link',
  template: '<ng-content></ng-content>',
})
class MockGenericLinkComponent {
  @Input() url: string | any[];
  @Input() target: string;
}

describe('FooterNavigationComponent', () => {
  let component: FooterNavigationComponent;
  let fixture: ComponentFixture<FooterNavigationComponent>;

  const mockLinks: NavigationNode[] = [
    {
      title: 'Test child 1',
      url: '/test1',
      target: true,
    },
    {
      title: 'Test child 2',
      url: '/',
      target: false,
    },
  ];

  const mockCmsComponentData = <CmsComponentData<CmsComponent>>{
    data$: of(),
  };

  const mockNavigationService = {
    getNavigationNode: createSpy().and.returnValue(of(mockCmsComponentData)),
    getComponentData: createSpy().and.returnValue(of(null)),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        FooterNavigationComponent,
        NavigationComponent,
        MockNavigationUIComponent,
        MockGenericLinkComponent,
      ],
      providers: [
        {
          provide: NavigationComponentService,
          useValue: mockNavigationService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterNavigationComponent);
    component = fixture.componentInstance;

    component.node$ = of({
      children: [
        {
          title: 'Test 1',
          url: '/',
          children: mockLinks,
        },
      ],
    });

    fixture.detectChanges();
  });

  it('should create FooterNavigationComponent', () => {
    expect(component).toBeTruthy();
  });
});
