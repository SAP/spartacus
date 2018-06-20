import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemCounterComponent } from '../item-counter/item-counter.component';
import { CartItemComponent } from './cart-item.component';

describe('CartItemComponent', () => {
  let cartItemComponent: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [CartItemComponent, ItemCounterComponent],
      providers: [
        {
          provide: ControlContainer
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemComponent);
    cartItemComponent = fixture.componentInstance;
    cartItemComponent.entry = 'mockEntry';

    spyOn(cartItemComponent.remove, 'emit').and.callThrough();
    spyOn(cartItemComponent.update, 'emit').and.callThrough();
  });

  it('should create cart details component', () => {
    expect(cartItemComponent).toBeTruthy();
  });

  it('should call removeEntry()', () => {
    cartItemComponent.removeEntry();

    expect(cartItemComponent.remove.emit).toHaveBeenCalledWith(
      cartItemComponent.entry
    );
  });

  it('should call updateEntry()', () => {
    cartItemComponent.updateEntry();

    expect(cartItemComponent.update.emit).toHaveBeenCalledWith(
      cartItemComponent.entry
    );
  });
});
