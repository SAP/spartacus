import { Component, DebugElement, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CmsNavigationComponent } from '@spartacus/core';
import { of } from 'rxjs';
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
  let element: DebugElement;

  const mockCmsComponentData = <CmsNavigationComponent>{
    styleClass: 'footer-styling',
  };

  const mockNavigationService = {
    getComponentData: createSpy().and.returnValue(of(mockCmsComponentData)),
    createNavigation: createSpy().and.returnValue(of(null)),
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
