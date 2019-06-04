import { Component, DebugElement, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CmsNavigationComponent } from '@spartacus/core';
import { of } from 'rxjs';
import { NavigationNode } from '../navigation/navigation-node.model';
import { NavigationComponentService } from '../navigation/navigation.component.service';
import { CategoryNavigationComponent } from './category-navigation.component';
import createSpy = jasmine.createSpy;

@Component({
  template: '',
  selector: 'cx-navigation-ui',
})
class MockNavigationComponent {
  @Input() node: NavigationNode;
}

describe('CategoryNavigationComponent', () => {
  let component: CategoryNavigationComponent;
  let fixture: ComponentFixture<CategoryNavigationComponent>;
  let element: DebugElement;

  const componentData: NavigationNode = {
    title: 'test',
    children: [
      {
        title: 'Root 1',
        url: '/',
        children: [],
      },
      {
        title: 'Root 2',
        url: '/test',
        children: [],
      },
    ],
  };

  const mockCmsComponentData = <CmsNavigationComponent>{
    styleClass: 'footer-styling',
  };

  const mockNavigationService = {
    getNavigationNode: createSpy().and.returnValue(of(null)),
    getComponentData: createSpy().and.returnValue(of(mockCmsComponentData)),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CategoryNavigationComponent, MockNavigationComponent],
      providers: [
        {
          provide: NavigationComponentService,
          useValue: mockNavigationService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryNavigationComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    component.node$ = of(componentData);
    fixture.detectChanges();
  });

  it('should create CategoryNavigationComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should create CategoryNavigationComponent', () => {
    let result: NavigationNode;
    component.node$.subscribe(node => (result = node));
    expect(result).toEqual(componentData);
  });

  it('should add the component styleClass', () => {
    const navigationUI = element.query(By.css('cx-navigation-ui'));
    expect(navigationUI.nativeElement.classList).toContain('footer-styling');
  });
});
