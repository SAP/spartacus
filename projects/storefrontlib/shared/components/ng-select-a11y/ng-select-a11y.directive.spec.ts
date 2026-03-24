import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { FeatureConfigService, TranslationService } from '@spartacus/core';
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
  imports: [NgSelectA11yModule, NgSelectModule],
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
  let directive: NgSelectA11yDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgSelectA11yModule,
        NgSelectModule,
        MockComponent,
        NgSelectA11yDirective,
      ],
      providers: [
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
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

  it('should set the input value from the selected option text', (done) => {
    directive['platformId'] = 'browser';
    fixture.detectChanges();
    const ngSelectInstance = getNgSelect().componentInstance;
    ngSelectInstance.writeValue(component.selected);
    ngSelectInstance.detectChanges();

    // Wait for the mutation observer to update the input value
    setTimeout(() => {
      const select = getNgSelect().nativeElement;
      const inputElement = select.querySelector('input');

      expect(inputElement.value).toContain(`${component.selected}`);
      done();
    });
  });

  it('should update input value when selection changes', (done) => {
    directive['platformId'] = 'browser';
    fixture.detectChanges();
    const ngSelectInstance = getNgSelect().componentInstance;
    ngSelectInstance.writeValue(component.selected);
    ngSelectInstance.detectChanges();

    // Wait for the mutation observer to update the input value
    setTimeout(() => {
      const select = getNgSelect().nativeElement;
      const inputElement = select.querySelector('input');

      expect(inputElement.value).toContain(`${component.selected}`);

      component.selected = 2;
      ngSelectInstance.writeValue(component.selected);
      ngSelectInstance.detectChanges();

      setTimeout(() => {
        expect(inputElement.value).toContain(`${component.selected}`);
        done();
      });
    });
  });
});
