import { Component, DebugElement, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Component as SpaComponent } from '@spartacus/core';
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
  @Input()
  dropdownMode = 'list';
  @Input()
  node: NavigationNode;
}

@Component({
  selector: 'cx-generic-link',
  template: '<ng-content></ng-content>',
})
class MockGenericLinkComponent {
  @Input()
  url: string | any[];
  @Input()
  target: string;
}

describe('FooterNavigationComponent', () => {
  let component: FooterNavigationComponent;
  let fixture: ComponentFixture<FooterNavigationComponent>;
  let footer: DebugElement;
  let column: DebugElement;

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

  const mockCmsComponentData = <CmsComponentData<SpaComponent>>{
    data$: of(),
  };

  const mockNavigationService = {
    getNodes: createSpy().and.returnValue(of(mockCmsComponentData)),
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

  it('should create FooterNavigationComponent in CmsLib', () => {
    expect(component).toBeTruthy();
  });

  describe('UI tests', () => {
    beforeAll(() => {
      footer = fixture.debugElement;
      column = footer.query(By.css('.container'));
    });

    it('should display the column title', () => {
      const titleElement: HTMLElement = column.query(By.css('h5'))
        .nativeElement;

      expect(titleElement.textContent).toEqual('Test 1');
    });

    it('should display the correct number of links', () => {
      const list: HTMLElement = column.query(By.css('ul')).nativeElement;

      expect(list.childElementCount).toBe(2);
    });

    it('should display link title with correct url', () => {
      const link = column.query(By.css('cx-generic-link'));

      expect(link.nativeElement.innerHTML).toContain(mockLinks[0].title);
      expect(link.componentInstance.url).toEqual(mockLinks[0].url);
    });

    it('should have the correct target', () => {
      const links = column.queryAll(By.css('cx-generic-link'));

      expect(links[0].componentInstance.target).toEqual('blank');
      expect(links[1].componentInstance.target).toEqual('self');
    });
  });
});
