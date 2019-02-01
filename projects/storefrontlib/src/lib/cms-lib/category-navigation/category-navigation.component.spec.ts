import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement, Component, Input } from '@angular/core';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

import { Component as SpaComponent } from '@spartacus/core';
import { NavigationService } from '../navigation/navigation.service';
import { CategoryNavigationComponent } from './category-navigation.component';
import { CmsComponentData } from '../../cms/components/cms-component-data';
import { NavigationNode } from '../navigation/navigation-node.model';

@Component({
  template: '',
  selector: 'cx-navigation-ui'
})
class MockNavigationComponent {
  @Input()
  node: NavigationNode;
  @Input()
  dropdownMode: string;
}

describe('CategoryNavigationComponent', () => {
  let component: CategoryNavigationComponent;
  let fixture: ComponentFixture<CategoryNavigationComponent>;
  let nav: DebugElement;

  const componentData: NavigationNode = {
    title: 'test',
    children: [
      {
        title: 'Root 1',
        url: '/',
        children: []
      },
      {
        title: 'Root 2',
        url: '/test',
        children: []
      }
    ]
  };

  const mockCmsComponentData = <CmsComponentData<SpaComponent>>{
    data$: of(componentData)
  };

  const mockNavigationService = {
    getNodes: createSpy().and.returnValue(of(mockCmsComponentData)),
    getComponentData: createSpy().and.returnValue(of(null))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CategoryNavigationComponent, MockNavigationComponent],
      providers: [
        { provide: NavigationService, useValue: mockNavigationService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryNavigationComponent);
    component = fixture.componentInstance;
    component.node$ = of(componentData);
    fixture.detectChanges();
  });

  it('should create category navigation component in CmsLib', () => {
    expect(component).toBeTruthy();
  });

  describe('UI tests', () => {
    beforeAll(() => {
      nav = fixture.debugElement;
    });

    it('should use semantic nav element', () => {
      const navElem: HTMLElement = nav.nativeElement;
      expect(navElem.firstElementChild.tagName).toBe('NAV');
    });

    it('should display correct number of submenus', () => {
      const navElem: HTMLElement = nav.nativeElement;
      expect(navElem.firstElementChild.childElementCount).toBe(2);
    });
  });
});
