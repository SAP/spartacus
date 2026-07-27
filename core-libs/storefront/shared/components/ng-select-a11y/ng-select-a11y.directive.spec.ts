import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { FeatureToggles, TranslationService } from '@spartacus/core';
import { provideMockFeatureToggles } from 'core-libs/core/src/features-config/feature-toggles/testing';
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

const mockFeatureToggles: FeatureToggles = {
  a11yRestoreFocusOnNgSelect: true,
  a11yVocalizeDropdownItemCount: true,
  a11yNgSelectReadonlyInputValue: true,
};

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
        provideMockFeatureToggles({ ...mockFeatureToggles }),
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

  it('should set aria-hidden on .ng-arrow-wrapper to prevent screen readers announcing the caret icon', () => {
    fixture.detectChanges();
    const select = getNgSelect().nativeElement;
    const arrowWrapper = select.querySelector('.ng-arrow-wrapper');
    expect(arrowWrapper.getAttribute('aria-hidden')).toBe('true');
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
        'assistiveMessage.dropdownItemCount',
        { count: 3 }
      );
    });

    it('should use count 0 when items is an empty array', () => {
      const translationService = TestBed.inject(TranslationService);
      spyOn(translationService, 'translate').and.returnValue(of('0 items'));

      const emptyFixture = TestBed.createComponent(MockNoItemsComponent);
      emptyFixture.detectChanges();

      expect(translationService.translate).toHaveBeenCalledWith(
        'assistiveMessage.dropdownItemCount',
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
            provide: FeatureToggles,
            useValue: {
              ...mockFeatureToggles,
              a11yVocalizeDropdownItemCount: false,
            } satisfies FeatureToggles,
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

  describe('onKeyDown()', () => {
    it('should remove "mouse-focus" class from the closest ancestor when toggle is enabled', async () => {
      fixture.detectChanges();
      const ngSelectEl = getNgSelect().nativeElement;
      const ancestor = ngSelectEl.closest('div') as HTMLElement;
      ancestor.classList.add('mouse-focus');

      ngSelectEl.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true }));
      await Promise.resolve();

      expect(ancestor.classList).not.toContain('mouse-focus');
    });

    it('should NOT remove "mouse-focus" class when toggle is disabled', async () => {
      const featureToggles = TestBed.inject(FeatureToggles);
      featureToggles.a11yRestoreFocusOnNgSelect = false;

      fixture.detectChanges();
      const ngSelectEl = getNgSelect().nativeElement;
      const ancestor = ngSelectEl.closest('div') as HTMLElement;
      ancestor.classList.add('mouse-focus');

      ngSelectEl.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true }));
      await Promise.resolve();

      expect(ancestor.classList).toContain('mouse-focus');
    });

    it('should be a no-op when no ancestor has the "mouse-focus" class', async () => {
      fixture.detectChanges();
      const ngSelectEl = getNgSelect().nativeElement;

      expect(() => {
        ngSelectEl.dispatchEvent(
          new KeyboardEvent('keydown', { bubbles: true })
        );
      }).not.toThrow();
      await Promise.resolve();
    });
  });

  describe('a11yNavigationSpaceKeyOnKeyUp toggle', () => {
    let directiveWithToggle: NgSelectA11yDirective;

    beforeEach(() => {
      // Re-configure with a11yNavigationSpaceKeyOnKeyUp enabled
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [
          NgSelectA11yModule,
          NgSelectModule,
          MockComponent,
          NgSelectA11yDirective,
        ],
        providers: [
          provideMockFeatureToggles({
            ...mockFeatureToggles,
            a11yNavigationSpaceKeyOnKeyUp: true,
          }),
          { provide: TranslationService, useClass: MockTranslationService },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(MockComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      const directiveEl = fixture.debugElement.query(
        By.directive(NgSelectA11yDirective)
      );
      directiveWithToggle = directiveEl.injector.get(NgSelectA11yDirective);
    });

    describe('interceptEnterKeyDown()', () => {
      it('should wrap NgSelectComponent.handleKeyDown so Enter keydown when open sets wasOpenOnEnterKeydown and calls preventDefault', () => {
        // Open the dropdown so isOpen() returns true
        directiveWithToggle['selectComponent'].open();
        fixture.detectChanges();

        const enterEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          bubbles: true,
          cancelable: true,
        });
        spyOn(enterEvent, 'preventDefault');

        // Call the wrapped handleKeyDown directly (bypasses HostListener order)
        directiveWithToggle['selectComponent'].handleKeyDown(enterEvent);

        expect(enterEvent.preventDefault).toHaveBeenCalled();
        expect(directiveWithToggle['wasOpenOnEnterKeydown']).toBeTrue();
      });

      it('should NOT intercept Enter keydown when dropdown is closed — delegates to original handler', () => {
        // Dropdown is closed by default
        const enterEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          bubbles: true,
          cancelable: true,
        });
        spyOn(enterEvent, 'preventDefault');

        directiveWithToggle['selectComponent'].handleKeyDown(enterEvent);

        // Our intercept does not block it — preventDefault not called by us
        expect(directiveWithToggle['wasOpenOnEnterKeydown']).toBeFalse();
      });

      it('should NOT intercept non-Enter keys when dropdown is open', () => {
        directiveWithToggle['selectComponent'].open();
        fixture.detectChanges();

        const arrowEvent = new KeyboardEvent('keydown', {
          key: 'ArrowDown',
          bubbles: true,
          cancelable: true,
        });
        spyOn(arrowEvent, 'preventDefault');

        directiveWithToggle['selectComponent'].handleKeyDown(arrowEvent);

        expect(directiveWithToggle['wasOpenOnEnterKeydown']).toBeFalse();
      });
    });

    describe('onKeyUp() — Enter selection on key release (WCAG 2.5.2)', () => {
      it('should call toggleItem on keyup-Enter when wasOpenOnEnterKeydown is set, then reset the flag', () => {
        // Simulate that Enter was pressed while dropdown was open
        directiveWithToggle['wasOpenOnEnterKeydown'] = true;
        spyOn(
          directiveWithToggle['selectComponent'],
          'toggleItem'
        ).and.callThrough();

        const keyupEvent = new KeyboardEvent('keyup', {
          key: 'Enter',
          bubbles: true,
        });
        getNgSelect().nativeElement.dispatchEvent(keyupEvent);

        expect(
          directiveWithToggle['selectComponent'].toggleItem
        ).toHaveBeenCalled();
        // Flag is reset so repeated keyup does not re-fire
        expect(directiveWithToggle['wasOpenOnEnterKeydown']).toBeFalse();
      });

      it('should NOT call toggleItem on keyup-Enter when wasOpenOnEnterKeydown is false', () => {
        directiveWithToggle['wasOpenOnEnterKeydown'] = false;
        spyOn(
          directiveWithToggle['selectComponent'],
          'toggleItem'
        ).and.callThrough();

        const keyupEvent = new KeyboardEvent('keyup', {
          key: 'Enter',
          bubbles: true,
        });
        getNgSelect().nativeElement.dispatchEvent(keyupEvent);

        expect(
          directiveWithToggle['selectComponent'].toggleItem
        ).not.toHaveBeenCalled();
      });
    });

    describe('onKeyDown() — Space scroll prevention', () => {
      it('should call preventDefault on Space keydown when dropdown is open to prevent page scroll', () => {
        directiveWithToggle['selectComponent'].open();
        fixture.detectChanges();

        const spaceEvent = new KeyboardEvent('keydown', {
          key: ' ',
          code: 'Space',
          bubbles: true,
          cancelable: true,
        });
        spyOn(spaceEvent, 'preventDefault');

        getNgSelect().nativeElement.dispatchEvent(spaceEvent);

        expect(spaceEvent.preventDefault).toHaveBeenCalled();
      });

      it('should NOT prevent page scroll (no extra preventDefault) on Space keydown when dropdown is closed — ng-select opens normally', () => {
        // When the dropdown is closed, Space should open it (ng-select default behaviour).
        // Our directive only calls preventDefault when the dropdown is already open.
        // Verify the dropdown opens normally rather than asserting on preventDefault,
        // because ng-select itself calls preventDefault as part of its open logic.
        const spaceEvent = new KeyboardEvent('keydown', {
          key: ' ',
          code: 'Space',
          bubbles: true,
          cancelable: true,
        });

        getNgSelect().nativeElement.dispatchEvent(spaceEvent);
        fixture.detectChanges();

        // ng-select should have opened — our code did not block it
        expect(directiveWithToggle['selectComponent'].isOpen()).toBeTrue();
      });
    });
  });
});
