import {
  Component,
  DebugElement,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ControlContainer,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { CartItemComponent } from './cart-item.component';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Component({
  template: '',
  selector: 'cx-media',
})
class MockMediaComponent {
  @Input() container;
  @Input() format;
}

@Component({
  template: '',
  selector: 'cx-item-counter',
})
class MockItemCounterComponent {
  @Input() control;
  @Input() readonly;
  @Input() max;
  @Input() allowZero;
}

@Component({
  template: '',
  selector: 'cx-promotions',
})
class MockPromotionsComponent {
  @Input() promotions;
}

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, I18nTestingModule],
      declarations: [
        CartItemComponent,
        MockMediaComponent,
        MockItemCounterComponent,
        MockPromotionsComponent,
        MockUrlPipe,
      ],
      providers: [
        {
          provide: ControlContainer,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    component.item = {
      product: {},
      updateable: true,
    };
    component.quantityControl = new FormControl('1');
    component.quantityControl.markAsPristine();
    spyOn(component, 'removeItem').and.callThrough();
    fixture.detectChanges();
  });

  it('should create CartItemComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call removeItem()', () => {
    const button: DebugElement = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    fixture.detectChanges();

    expect(component.removeItem).toHaveBeenCalled();
    expect(component.quantityControl.value).toEqual(0);
  });

  it('should mark control "dirty" after removeItem is called', () => {
    const button: DebugElement = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    fixture.detectChanges();
    expect(component.quantityControl.dirty).toEqual(true);
  });
});
