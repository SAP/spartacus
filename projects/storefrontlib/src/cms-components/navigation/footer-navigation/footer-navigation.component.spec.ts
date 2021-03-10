import { Component, DebugElement, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AnonymousConsentsConfig,
  CmsNavigationComponent,
  I18nTestingModule,
} from '@spartacus/core';
import { of } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { NavigationNode } from '../navigation/navigation-node.model';
import { NavigationComponent } from '../navigation/navigation.component';
import { NavigationService } from '../navigation/navigation.service';
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

const mockAnonymousConsentsConfig = {
  features: {
    anonymousConsents: false,
  },
};

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
  let element: DebugElement;

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

  const mockCmsComponentData = <CmsNavigationComponent>{
    styleClass: 'footer-styling',
  };

  const MockCmsNavigationComponent = <CmsComponentData<any>>{
    data$: of(mockCmsComponentData),
  };

  const mockNavigationService = {
    getNavigationNode: createSpy().and.returnValue(of(null)),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule],
        declarations: [
          FooterNavigationComponent,
          NavigationComponent,
          MockNavigationUIComponent,
          MockGenericLinkComponent,
        ],
        providers: [
          {
            provide: NavigationService,
            useValue: mockNavigationService,
          },
          {
            provide: CmsComponentData,
            useValue: MockCmsNavigationComponent,
          },
          {
            provide: AnonymousConsentsConfig,
            useValue: mockAnonymousConsentsConfig,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterNavigationComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;

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

  it('should add the component styleClass', () => {
    const navigationUI = element.query(By.css('cx-navigation-ui'));
    expect(navigationUI.nativeElement.classList).toContain('footer-styling');
  });
});
