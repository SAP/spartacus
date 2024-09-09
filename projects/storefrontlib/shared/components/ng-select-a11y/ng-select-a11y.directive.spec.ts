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
    >
      <ng-option *ngFor="let val of [1, 2, 3]" [value]="val">{{
        val
      }}</ng-option>
    </ng-select>
    <div id="size-results"></div>
  `,
    standalone: true,
    imports: [NgSelectA11yModule, NgSelectModule],
})
class MockComponent {
  isSearchable: boolean = false;
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

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [NgSelectA11yModule, NgSelectModule, MockComponent, NgSelectA11yDirective],
    providers: [
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
        { provide: TranslationService, useClass: MockTranslationService },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(MockComponent);

    component = fixture.componentInstance;
  });

  function getNgSelect(): DebugElement {
    return fixture.debugElement.query(By.directive(NgSelectA11yDirective));
  }

  it('should create ng-select and bind aria attributes', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();

    const select = getNgSelect().nativeElement;
    const innerDiv = select.querySelector("[role='combobox']");
    const inputElement = select.querySelector('input');

    expect(innerDiv).toBeTruthy();
    expect(innerDiv.getAttribute('aria-controls')).toEqual('size-results');
    expect(innerDiv.getAttribute('aria-label')).toEqual('Size');
    expect(inputElement.getAttribute('aria-hidden')).toEqual('true');
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
});
