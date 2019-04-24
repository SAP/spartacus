import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { PromotionsModule } from '../../../../../lib/checkout/components/promotions/promotions.module';
import { ComponentsModule } from '../../../../../lib/ui/components/components.module';
import { CartItemComponent } from './cart-item.component';

@Pipe({
  name: 'cxTranslateUrl',
})
class MockTranslateUrlPipe implements PipeTransform {
  transform() {}
}

describe('CartItemComponent', () => {
  let cartItemComponent: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        ComponentsModule,
        PromotionsModule,
        I18nTestingModule,
      ],
      declarations: [CartItemComponent, MockTranslateUrlPipe],
      providers: [
        {
          provide: ControlContainer,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemComponent);
    cartItemComponent = fixture.componentInstance;
    cartItemComponent.item = {};

    spyOn(cartItemComponent.remove, 'emit').and.callThrough();
    spyOn(cartItemComponent.update, 'emit').and.callThrough();
  });

  it('should create cart details component', () => {
    expect(cartItemComponent).toBeTruthy();
  });

  it('should call removeItem()', () => {
    cartItemComponent.removeItem();

    expect(cartItemComponent.remove.emit).toHaveBeenCalledWith(
      cartItemComponent.item
    );
  });

  it('should call updateItem()', () => {
    cartItemComponent.updateItem(2);

    expect(cartItemComponent.update.emit).toHaveBeenCalledWith({
      item: cartItemComponent.item,
      updatedQuantity: 2,
    });
  });
});
