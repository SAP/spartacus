import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { OnlyNumberDirectiveModule } from '../../directives/only-number/only-number.directive.module';
import { ItemCounterComponent } from './item-counter.component';

const form = new FormGroup({
  quantity: new FormControl('1'),
});

describe('ItemCounterComponent', () => {
  let component: ItemCounterComponent;
  let fixture: ComponentFixture<ItemCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        OnlyNumberDirectiveModule,
      ],
      declarations: [ItemCounterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCounterComponent);
    component = fixture.componentInstance;

    component.control = <FormControl>form.get('quantity');

    component.control.setValue(1);
    fixture.detectChanges();
  });

  it('should create ItemCounterComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should update the input value when the control value is changed', () => {
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input'))
      .nativeElement;
    component.control.setValue(5);
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

    expect(component.control.value).toEqual(10);
  }));

  it('should avoid invalid characters in the input to silently fail', async(() => {
    component.min = 5;
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input'))
      .nativeElement;

    input.value = 'abc';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.value).toEqual('5');
  }));

  describe('increment()', () => {
    it('should increase form control value when plus button is used', () => {
      const button: DebugElement[] = fixture.debugElement.queryAll(
        By.css('button')
      );
      button[1].nativeElement.click();
      fixture.detectChanges();
      expect(component.control.value).toEqual(2);
    });

    it('should set value to max when it is greater than max value', () => {
      component.max = 40;
      component.control.setValue(50);
      fixture.detectChanges();

      expect(component.control.value).toEqual(40);
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
  });

  describe('disable buttons', () => {
    it('should enable decrease button if min number is not reached', () => {
      component.control.setValue(5);
      component.min = 3;
      fixture.detectChanges();
      const button: DebugElement[] = fixture.debugElement.queryAll(
        By.css('button')
      );
      expect((<HTMLButtonElement>button[0].nativeElement).disabled).toBeFalsy();
    });

    it('should disable decrease button if min number is reached', () => {
      component.control.setValue(5);
      component.min = 5;
      fixture.detectChanges();
      const button: DebugElement[] = fixture.debugElement.queryAll(
        By.css('button')
      );
      expect(
        (<HTMLButtonElement>button[0].nativeElement).disabled
      ).toBeTruthy();
    });

    it('should enable decrease button if max number is reached', () => {
      component.control.setValue(5);
      component.max = 10;
      fixture.detectChanges();
      const button: DebugElement[] = fixture.debugElement.queryAll(
        By.css('button')
      );
      expect((<HTMLButtonElement>button[1].nativeElement).disabled).toBeFalsy();
    });

    it('should disable increase button if max number is reached', () => {
      component.control.setValue(5);
      component.max = 5;
      fixture.detectChanges();
      const button: DebugElement[] = fixture.debugElement.queryAll(
        By.css('button')
      );
      expect(
        (<HTMLButtonElement>button[1].nativeElement).disabled
      ).toBeTruthy();
    });
  });
});
