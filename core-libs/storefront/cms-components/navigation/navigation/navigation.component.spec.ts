import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CmsNavigationComponent } from '@spartacus/core';
import { of } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/index';
import { NavigationNode } from './navigation-node.model';
import { NavigationComponent } from './navigation.component';
import { NavigationService } from './navigation.service';
import { NavigationUIComponent } from './navigation-ui.component';


@Component({
  selector: 'cx-navigation-ui',
  template: '',
})
class MockNavigationUIComponent {
  @Input()
  dropdownMode = 'list';
  @Input()
  node: NavigationNode;
  @Input()
  navAriaLabel: string;
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
    createNavigation: vi.fn().mockReturnValue(of(null)),
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [NavigationComponent],
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
    })
      .overrideComponent(NavigationComponent, {
        remove: { imports: [NavigationUIComponent] },
        add: { imports: [MockNavigationUIComponent] },
      })
      .compileComponents();
  });

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
