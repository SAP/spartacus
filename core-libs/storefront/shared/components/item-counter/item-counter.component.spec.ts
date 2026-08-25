import {
  DebugElement,
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  FeatureDirective,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import { FocusDirective } from '../../../layout/a11y/keyboard-focus/focus.directive';
import { ItemCounterComponent } from './item-counter.component';
import { MockKeyboardFocusDirective } from '../../../layout';

let activeToggles: Record<string, boolean> = {};

@Directive({ selector: '[cxFeature]' })
class TestFeatureDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set cxFeature(feature: string) {
    const negated = feature.startsWith('!');
    const key = negated ? feature.slice(1) : feature;
    const enabled = activeToggles[key] ?? true;
    const show = negated ? !enabled : enabled;
    if (show) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}

const form = new UntypedFormGroup({
  quantity: new UntypedFormControl('1'),
});

describe('ItemCounterComponent', () => {
  let component: ItemCounterComponent;
  let fixture: ComponentFixture<ItemCounterComponent>;

  async function configure(
    toggles: Record<string, boolean> = {}
  ): Promise<void> {
    activeToggles = toggles;
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ItemCounterComponent],
    })
      .overrideComponent(ItemCounterComponent, {
        remove: { imports: [TranslatePipe, FocusDirective, FeatureDirective] },
        add: {
          imports: [
            MockTranslatePipe,
            MockKeyboardFocusDirective,
            TestFeatureDirective,
          ],
        },
      })
      .compileComponents();
  }

  beforeEach(async () => {
    await configure();
    fixture = TestBed.createComponent(ItemCounterComponent);
    component = fixture.componentInstance;

    component.control = <UntypedFormControl>form.get('quantity');

    component.control.setValue(1);
    component.control.markAsPristine();
  });

  it('should create ItemCounterComponent', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should update the input value when the control value is changed', () => {
    component.control.setValue(5);
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;
    expect(input.value).toEqual('5');
  });

  it('should update the form control when the input is changed', async () => {
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;

    input.focus();
    input.value = '10';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.control.value).toEqual(10);
  });

  describe('readonly', () => {
    it('should add readonly class', async () => {
      component.readonly = true;
      fixture.detectChanges();
      expect(
        (<HTMLElement>fixture.debugElement.nativeElement).classList
      ).toContain('readonly');
    });

    it('should not add readonly class', async () => {
      component.readonly = false;
      fixture.detectChanges();
      expect(
        (<HTMLElement>fixture.debugElement.nativeElement).classList
      ).not.toContain('readonly');
    });
  });

  describe('validate value', () => {
    it('should set value to max when it is greater than max value', () => {
      component.max = 40;
      component.control.setValue(50);
      fixture.detectChanges();

      expect(component.control.value).toEqual(40);
    });

    it('should set value to min when it is smaller than min value', () => {
      component.min = 3;
      component.control.setValue(2);
      fixture.detectChanges();

      expect(component.control.value).toEqual(3);
    });

    it('should avoid invalid characters in the input to silently fail', async () => {
      component.min = 5;
      fixture.detectChanges();
      const input: HTMLInputElement = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;

      input.value = 'abc';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(input.value).toEqual('5');
    });

    it('should ignore 0 value in case `allowZero` is set to true', () => {
      component.allowZero = true;
      component.control.setValue(0);
      fixture.detectChanges();

      expect(component.control.value).toEqual(0);
    });

    it('should set to min value in case `allowZero` is set to false', () => {
      component.allowZero = false;
      component.control.setValue(0);
      fixture.detectChanges();

      expect(component.control.value).toEqual(component.min);
    });
  });

  describe('increment()', () => {
    it('should increase form control value when plus button is used', () => {
      fixture.detectChanges();
      const button: DebugElement[] = fixture.debugElement.queryAll(
        By.css('button')
      );
      button[1].nativeElement.click();
      fixture.detectChanges();
      expect(component.control.value).toEqual(2);
    });

    it('should mark the control "dirty" when the value increases', () => {
      fixture.detectChanges();
      expect(component.control.dirty).toBe(false);
      const button: DebugElement[] = fixture.debugElement.queryAll(
        By.css('button')
      );
      button[1].nativeElement.click();
      fixture.detectChanges();
      expect(component.control.dirty).toBe(true);
    });

    it('should enable increase button if max number is not reached', () => {
      component.control.setValue(5);
      component.max = 10;
      fixture.detectChanges();
      const button: DebugElement[] = fixture.debugElement.queryAll(
        By.css('button')
      );
      expect(
        (<HTMLButtonElement>button[1].nativeElement).getAttribute(
          'aria-disabled'
        )
      ).toBe('false');
    });

    it('should disable increase button if max number is reached', () => {
      component.control.setValue(5);
      component.max = 5;
      fixture.detectChanges();
      const button: DebugElement[] = fixture.debugElement.queryAll(
        By.css('button')
      );
      expect(
        (<HTMLButtonElement>button[1].nativeElement).getAttribute(
          'aria-disabled'
        )
      ).toBe('true');
    });
  });

  describe('decrement()', () => {
    it('should decrease form control value when minus button is used', () => {
      component.control.setValue(5);
      fixture.detectChanges();
      const button: DebugElement[] = fixture.debugElement.queryAll(
        By.css('button')
      );
      button[0].nativeElement.click();
      fixture.detectChanges();
      expect(component.control.value).toEqual(4);
    });

    it('should mark the control "dirty" when the value decreases', () => {
      component.control.setValue(5);
      fixture.detectChanges();
      expect(component.control.dirty).toBe(false);
      const button: DebugElement[] = fixture.debugElement.queryAll(
        By.css('button')
      );
      button[0].nativeElement.click();
      fixture.detectChanges();
      expect(component.control.dirty).toBe(true);
    });

    it('should enable decrease button if min number is not reached', () => {
      component.control.setValue(5);
      component.min = 3;
      fixture.detectChanges();
      const button: DebugElement[] = fixture.debugElement.queryAll(
        By.css('button')
      );
      expect(
        (<HTMLButtonElement>button[0].nativeElement).getAttribute(
          'aria-disabled'
        )
      ).toBe('false');
    });

    it('should disable decrease button if min number is reached', () => {
      component.control.setValue(5);
      component.min = 5;
      fixture.detectChanges();
      const button: DebugElement[] = fixture.debugElement.queryAll(
        By.css('button')
      );
      expect(
        (<HTMLButtonElement>button[0].nativeElement).getAttribute(
          'aria-disabled'
        )
      ).toBe('true');
    });
  });

  describe('a11y', () => {
    it('should update value on enter', () => {
      fixture.detectChanges();
      const input: HTMLInputElement = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;
      input.focus();
      input.value = '10';
      input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
      fixture.detectChanges();

      expect(component.control.value).toEqual(10);
    });

    it('should not set aria-describedby on any control by default', () => {
      const controls = fixture.debugElement.queryAll(By.css('button, input'));
      controls.forEach((control) =>
        expect(control.nativeElement.hasAttribute('aria-describedby')).toBe(
          false
        )
      );
    });

    it('should describe the input and both buttons when ariaDescribedById is set', () => {
      component.ariaDescribedById = 'hint-id';
      fixture.detectChanges();

      const controls = fixture.debugElement.queryAll(By.css('button, input'));
      expect(controls.length).toBe(3);
      controls.forEach((control) =>
        expect(control.nativeElement.getAttribute('aria-describedby')).toBe(
          'hint-id'
        )
      );
    });

    it('should NOT set aria-valuetext when the toggle is off', async () => {
      await TestBed.resetTestingModule();
      await configure({ a11yItemCounterValueText: false });
      fixture = TestBed.createComponent(ItemCounterComponent);
      component = fixture.componentInstance;
      component.control = <UntypedFormControl>form.get('quantity');
      fixture.detectChanges();
      const input: HTMLInputElement = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;
      expect(input.hasAttribute('aria-valuetext')).toBe(false);
    });

    it('should set aria-valuetext to the literal value when the toggle is on', async () => {
      await TestBed.resetTestingModule();
      await configure({ a11yItemCounterValueText: true });
      fixture = TestBed.createComponent(ItemCounterComponent);
      component = fixture.componentInstance;
      component.control = <UntypedFormControl>form.get('quantity');
      component.control.setValue(2);
      fixture.detectChanges();

      const input: HTMLInputElement = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;
      expect(input.getAttribute('aria-valuetext')).toBe('2');
    });
  });
});
