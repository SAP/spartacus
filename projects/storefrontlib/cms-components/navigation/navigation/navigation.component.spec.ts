import { Component, DebugElement, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CmsNavigationComponent } from '@spartacus/core';
import { of } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/index';
import { NavigationNode } from './navigation-node.model';
import { NavigationComponent } from './navigation.component';
import { NavigationService } from './navigation.service';

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

const mockCmsComponentData = <CmsNavigationComponent>{
  styleClass: 'footer-styling',
};

const MockCmsNavigationComponent = <CmsComponentData<any>>{
  data$: of(mockCmsComponentData),
};

describe('CmsNavigationComponent', () => {
  let navigationComponent: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let element: DebugElement;

  const mockNavigationService = {
    createNavigation: createSpy().and.returnValue(of(null)),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
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
        declarations: [NavigationComponent, MockNavigationUIComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    navigationComponent = fixture.componentInstance;
    element = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(navigationComponent).toBeTruthy();
  });

  it('should add the component styleClass', () => {
    const navigationUI = element.query(By.css('cx-navigation-ui'));
    expect(navigationUI.nativeElement.classList).toContain('footer-styling');
  });
});
