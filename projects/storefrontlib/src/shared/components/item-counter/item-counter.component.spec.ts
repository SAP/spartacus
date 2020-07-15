import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemCounterComponent } from './item-counter.component';

const NUM_2 = 2;
const NUM_3 = 3;
const NUM_4 = 4;
const NUM_5 = 5;
const NUM_10 = 10;
const NUM_40 = 40;
const NUM_50 = 50;

const form = new FormGroup({
  quantity: new FormControl('1'),
});

describe('ItemCounterComponent', () => {
  let component: ItemCounterComponent;
  let fixture: ComponentFixture<ItemCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [ItemCounterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCounterComponent);
    component = fixture.componentInstance;

    component.control = <FormControl>form.get('quantity');

    component.control.setValue(1);
    component.control.markAsPristine();
    fixture.detectChanges();
  });

  it('should create ItemCounterComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should update the input value when the control value is changed', () => {
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input'))
      .nativeElement;
    component.control.setValue(NUM_5);
    fixture.detectChanges();
    expect(input.value).toEqual('5');
  });

  it('should update the form control when the input is changed', async(() => {
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input'))
      .nativeElement;

    input.focus();
    input.value = '10';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.control.value).toEqual(NUM_10);
  }));

  describe('readonly', () => {
    it('should add readonly class', async(() => {
      component.readonly = true;
      fixture.detectChanges();
      expect(
        (<HTMLElement>fixture.debugElement.nativeElement).classList
      ).toContain('readonly');
    }));

    it('should not add readonly class', async(() => {
      component.readonly = false;
      fixture.detectChanges();
      expect(
        (<HTMLElement>fixture.debugElement.nativeElement).classList
      ).not.toContain('readonly');
    }));
  });

  describe('validate value', () => {
    it('should set value to max when it is greater than max value', () => {
      component.max = NUM_40;
      component.control.setValue(NUM_50);
      fixture.detectChanges();

      expect(component.control.value).toEqual(NUM_40);
    });

    it('should set value to min when it is smaller than min value', () => {
      component.min = NUM_3;
      component.control.setValue(NUM_2);
      fixture.detectChanges();

      expect(component.control.value).toEqual(NUM_3);
    });

    it('should avoid invalid characters in the input to silently fail', async(() => {
      component.min = NUM_5;
      const input: HTMLInputElement = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;

      input.value = 'abc';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(input.value).toEqual('5');
    }));

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
      const button: DebugElement[] = fixture.debugElement.queryAll(
        By.css('button')
      );
      button[1].nativeElement.click();
      fixture.detectChanges();
      expect(component.control.value).toEqual(NUM_2);
    });

    it('should mark the control "dirty" when the value increases', () => {
      expect(component.control.dirty).toBe(false);
      const button: DebugElement[] = fixture.debugElement.queryAll(
        By.css('button')
      );
      button[1].nativeElement.click();
      fixture.detectChanges();
      expect(component.control.dirty).toBe(true);
    });

    it('should enable increase button if max number is not reached', () => {
      component.control.setValue(NUM_5);
      component.max = NUM_10;
      fixture.detectChanges();
      const button: DebugElement[] = fixture.debugElement.queryAll(
        By.css('button')
      );
      expect((<HTMLButtonElement>button[1].nativeElement).disabled).toBeFalsy();
    });

    it('should disable increase button if max number is reached', () => {
      component.control.setValue(NUM_5);
      component.max = NUM_5;
      fixture.detectChanges();
      const button: DebugElement[] = fixture.debugElement.queryAll(
        By.css('button')
      );
      expect(
        (<HTMLButtonElement>button[1].nativeElement).disabled
      ).toBeTruthy();
    });
  });

  describe('decrement()', () => {
    it('should decrease form control value when minus button is used', () => {
      component.control.setValue(NUM_5);
      fixture.detectChanges();
      const button: DebugElement[] = fixture.debugElement.queryAll(
        By.css('button')
      );
      button[0].nativeElement.click();
      fixture.detectChanges();
      expect(component.control.value).toEqual(NUM_4);
    });

    it('should mark the control "dirty" when the value decreases', () => {
      expect(component.control.dirty).toBe(false);
      component.control.setValue(NUM_5);
      fixture.detectChanges();
      const button: DebugElement[] = fixture.debugElement.queryAll(
        By.css('button')
      );
      button[0].nativeElement.click();
      fixture.detectChanges();
      expect(component.control.dirty).toBe(true);
    });

    it('should enable decrease button if min number is not reached', () => {
      component.control.setValue(NUM_5);
      component.min = NUM_3;
      fixture.detectChanges();
      const button: DebugElement[] = fixture.debugElement.queryAll(
        By.css('button')
      );
      expect((<HTMLButtonElement>button[0].nativeElement).disabled).toBeFalsy();
    });

    it('should disable decrease button if min number is reached', () => {
      component.control.setValue(NUM_5);
      component.min = NUM_5;
      fixture.detectChanges();
      const button: DebugElement[] = fixture.debugElement.queryAll(
        By.css('button')
      );
      expect(
        (<HTMLButtonElement>button[0].nativeElement).disabled
      ).toBeTruthy();
    });
  });
});
