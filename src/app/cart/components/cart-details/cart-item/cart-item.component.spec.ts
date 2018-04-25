import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CartItemComponent } from './cart-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemCounterComponent } from '../item-counter/item-counter.component';

describe('CartItemComponent', () => {
  let cartItemComponent: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [CartItemComponent, ItemCounterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemComponent);
    cartItemComponent = fixture.componentInstance;
    cartItemComponent.entry = 'mockEntry';
    cartItemComponent.formGroupName = 'mockName';

    spyOn(cartItemComponent.remove, 'emit').and.callThrough();
    spyOn(cartItemComponent.update, 'emit').and.callThrough();
  });

  it('should create cart details component', () => {
    expect(cartItemComponent).toBeTruthy();
  });

  it('should call removeEntry()', () => {
    cartItemComponent.removeEntry();

    expect(cartItemComponent.remove.emit).toHaveBeenCalledWith({
      entry: cartItemComponent.entry,
      index: cartItemComponent.formGroupName
    });
  });

  it('should call updateEntry()', () => {
    cartItemComponent.updateEntry();

    expect(cartItemComponent.update.emit).toHaveBeenCalledWith({
      entry: cartItemComponent.entry,
      index: +cartItemComponent.formGroupName
    });
  });
});
