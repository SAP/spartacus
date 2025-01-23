import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { FeatureConfigService, TranslationService } from '@spartacus/core';
import { BreakpointService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { NgSelectA11yDirective } from './ng-select-a11y.directive';
import { NgSelectA11yModule } from './ng-select-a11y.module';

@Component({
  template: `
    <ng-select
      [searchable]="isSearchable"
      [cxNgSelectA11y]="{ ariaLabel: 'Size', ariaControls: 'size-results' }"
      [items]="[1, 2, 3]"
      [(ngModel)]="selected"
    >
    </ng-select>
    <div id="size-results"></div>
  `,
  standalone: false,
})
class MockComponent {
  isSearchable: boolean = false;
  selected = 1;
}

class MockFeatureConfigService {
  isEnabled() {
    return true;
  }
}

class MockTranslationService {
  translate() {
    return of('of');
  }
}

describe('NgSelectA11yDirective', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;
  let breakpointService: BreakpointService;
  let directive: NgSelectA11yDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgSelectA11yModule, NgSelectModule],
      declarations: [MockComponent, NgSelectA11yDirective],
      providers: [
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    breakpointService = TestBed.inject(BreakpointService);
    const directiveEl = fixture.debugElement.query(
      By.directive(NgSelectA11yDirective)
    );
    directive = directiveEl.injector.get(NgSelectA11yDirective);
  });

  function getNgSelect(): DebugElement {
    return fixture.debugElement.query(By.directive(NgSelectA11yDirective));
  }

  it('should create ng-select and bind aria attributes', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();

    const select = getNgSelect().nativeElement;
    const innerDiv = select.querySelector("[role='combobox']");

    expect(innerDiv).toBeTruthy();
    expect(innerDiv.getAttribute('aria-controls')).toEqual('size-results');
    expect(innerDiv.getAttribute('aria-label')).toEqual('Size');
  });

  it('should append aria-label to options', (done) => {
    fixture.detectChanges();
    const select = getNgSelect().nativeElement;
    const ngSelectInstance = getNgSelect().componentInstance;
    ngSelectInstance.open();

    // Wait for the mutation observer to update the options
    setTimeout(() => {
      const options = select.querySelectorAll('.ng-option');
      expect(options.length).toBe(3);
      options.forEach((option: HTMLElement, index: number) => {
        expect(option.getAttribute('aria-label')).toEqual(
          `${index + 1}, ${index + 1} of ${options.length}`
        );
      });
      done();
    });
  });

  it('should append value to aria-label and hide the value element from screen reader on mobile', (done) => {
    const isDownSpy = spyOn(breakpointService, 'isDown').and.returnValue(
      of(true)
    );
    directive['platformId'] = 'browser';
    fixture.detectChanges();
    const ngSelectInstance = getNgSelect().componentInstance;
    ngSelectInstance.writeValue(component.selected);
    ngSelectInstance.detectChanges();

    // Wait for the mutation observer to update the aria-label
    setTimeout(() => {
      const select = getNgSelect().nativeElement;
      const valueElement = select.querySelector('.ng-value');
      const divCombobox = select.querySelector("[role='combobox']");

      expect(valueElement.getAttribute('aria-hidden')).toEqual('true');
      expect(divCombobox.getAttribute('aria-label')).toContain(
        `, ${component.selected}`
      );
      isDownSpy.and.callThrough();
      done();
    });
  });
});
