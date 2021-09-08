import { Component, DebugElement, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CmsNavigationComponent } from '@spartacus/core';
import { of } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { NavigationNode } from '../navigation/navigation-node.model';
import { NavigationService } from '../navigation/navigation.service';
import { CategoryNavigationComponent } from './category-navigation.component';

@Component({
  template: '',
  selector: 'cx-navigation-ui',
})
class MockNavigationComponent {
  @Input() node: NavigationNode;
  @Input() wrapAfter: number;
  @Input() allowAlignToRight: number;
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
    wrapAfter: '10',
  };

  const MockCmsNavigationComponent = <CmsComponentData<any>>{
    data$: of(mockCmsComponentData),
  };

  const mockNavigationService = {
    getNavigationNode() {
      return of(componentData);
    },
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [CategoryNavigationComponent, MockNavigationComponent],
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
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryNavigationComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create CategoryNavigationComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should create CategoryNavigationComponent', () => {
    let result: NavigationNode;
    component.node$.subscribe((node) => (result = node));
    expect(result).toEqual(componentData);
  });

  it('should add the component styleClass', () => {
    const navigationUI = element.query(By.css('cx-navigation-ui'));
    expect(navigationUI.nativeElement.classList).toContain('footer-styling');
  });

  it('should have wrapAfter property', () => {
    let result: CmsNavigationComponent;
    component.data$.subscribe((node) => (result = node));
    expect(result.wrapAfter).toEqual('10');
  });
});
