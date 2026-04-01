import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
class MockComponent {
  isSearchable: boolean = false;
  selected = 1;
}

@Component({
  template: `
    <ng-select
      [searchable]="false"
      [cxNgSelectA11y]="{ ariaLabel: 'Size', ariaControls: 'size-results' }"
      [items]="[]"
      [(ngModel)]="selected"
    >
    </ng-select>
    <div id="size-results"></div>
  `,
  imports: [NgSelectA11yModule, NgSelectModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
class MockNoItemsComponent {
  selected = null;
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
        MockNoItemsComponent,
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

  describe('vocalizeItemCount()', () => {
    it('should create a .cx-ng-select-count span and set its text content', () => {
      fixture.detectChanges();
      const select = getNgSelect().nativeElement;
      const span = select.querySelector('.cx-ng-select-count');
      expect(span).toBeTruthy();
      expect(span.textContent).toBe('of');
    });

    it('should call translate with the correct key and item count', () => {
      const translationService = TestBed.inject(TranslationService);
      spyOn(translationService, 'translate').and.returnValue(of('3 items'));
      fixture.detectChanges();
      // We expect count 3 because of the MockComponent defined at the top contains [items]="[1, 2, 3]"
      expect(translationService.translate).toHaveBeenCalledWith(
        'assistiveMessage.ngSelectDropdownCount',
        { count: 3 }
      );
    });

    it('should use count 0 when items is an empty array', () => {
      const translationService = TestBed.inject(TranslationService);
      spyOn(translationService, 'translate').and.returnValue(of('0 items'));

      const emptyFixture = TestBed.createComponent(MockNoItemsComponent);
      emptyFixture.detectChanges();

      expect(translationService.translate).toHaveBeenCalledWith(
        'assistiveMessage.ngSelectDropdownCount',
        { count: 0 }
      );
    });

    it('should reuse the existing .cx-ng-select-count span instead of creating a new one', () => {
      fixture.detectChanges();
      const select = getNgSelect().nativeElement;
      const spans = select.querySelectorAll('.cx-ng-select-count');
      expect(spans.length).toBe(1);
    });

    it('should apply cx-visually-hidden class and aria-hidden to the span', () => {
      fixture.detectChanges();
      const select = getNgSelect().nativeElement;
      const span = select.querySelector('.cx-ng-select-count');
      expect(span.classList).toContain('cx-visually-hidden');
      expect(span.getAttribute('aria-hidden')).toBe('true');
    });

    it('should not create the span when feature flag a11yVocalizeDropdownItemCount is disabled', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [
          NgSelectA11yModule,
          NgSelectModule,
          MockComponent,
          NgSelectA11yDirective,
        ],
        providers: [
          {
            provide: FeatureConfigService,
            useValue: {
              isEnabled: (flag: string) =>
                flag !== 'a11yVocalizeDropdownItemCount',
            },
          },
          { provide: TranslationService, useClass: MockTranslationService },
        ],
      }).compileComponents();

      const disabledFixture = TestBed.createComponent(MockComponent);
      disabledFixture.detectChanges();
      const select = disabledFixture.debugElement.query(
        By.directive(NgSelectA11yDirective)
      ).nativeElement;
      expect(select.querySelector('.cx-ng-select-count')).toBeNull();
    });
  });
});
