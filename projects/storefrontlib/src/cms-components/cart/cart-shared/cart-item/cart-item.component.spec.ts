import { By } from '@angular/platform-browser';
import {
  Component,
  Input,
  Pipe,
  PipeTransform,
  DebugElement,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  FeaturesConfigModule,
  FeaturesConfig,
} from '@spartacus/core';
import { CartItemComponent } from './cart-item.component';
import { MockFeatureLevelDirective } from '../../../../shared/test/mock-feature-level-directive';
import { PromotionService } from '../../../../shared/services/promotion/promotion.service';

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
  @Input() step;
  @Input() min;
  @Input() max;
  @Input() cartIsLoading;
  @Input() isValueChangeable;
}

@Component({
  template: '',
  selector: 'cx-promotions',
})
class MockPromotionsComponent {
  @Input() promotions;
}

const mockProduct = {
  baseOptions: [
    {
      selected: {
        variantOptionQualifiers: [
          {
            name: 'Size',
            value: 'XL',
          },
          {
            name: 'Style',
            value: 'Red',
          },
        ],
      },
    },
  ],
  stock: {
    stockLevelStatus: 'outOfStock',
  },
};

class MockPromotionService {
  getOrderPromotions(): void {}
  getOrderPromotionsFromCart(): void {}
  getOrderPromotionsFromCheckout(): void {}
  getOrderPromotionsFromOrder(): void {}
  getProductPromotionForEntry(): void {}
}

describe('CartItemComponent', () => {
  let cartItemComponent: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        I18nTestingModule,
        FeaturesConfigModule,
      ],
      declarations: [
        CartItemComponent,
        MockMediaComponent,
        MockItemCounterComponent,
        MockPromotionsComponent,
        MockUrlPipe,
        MockFeatureLevelDirective,
      ],
      providers: [
        {
          provide: ControlContainer,
        },
        {
          provide: PromotionService,
          useClass: MockPromotionService,
        },
        {
          provide: FeaturesConfig,
          useValue: {
            features: { level: '1.3' },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemComponent);
    cartItemComponent = fixture.componentInstance;
    cartItemComponent.item = {};
    cartItemComponent.item.product = mockProduct;
    el = fixture.debugElement;

    spyOn(cartItemComponent.remove, 'emit').and.callThrough();
    spyOn(cartItemComponent.update, 'emit').and.callThrough();
    spyOn(cartItemComponent.view, 'emit').and.callThrough();
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

  it('should call isProductOutOfStock()', () => {
    cartItemComponent.isProductOutOfStock(cartItemComponent.item.product);

    expect(cartItemComponent.item).toBeDefined();
    expect(cartItemComponent.item.product).toBeDefined();
    expect(cartItemComponent.item.product.stock).toBeDefined();

    expect(
      cartItemComponent.isProductOutOfStock(cartItemComponent.item.product)
    ).toBeTruthy();

    cartItemComponent.item.product.stock.stockLevelStatus = 'InStock';
    expect(
      cartItemComponent.isProductOutOfStock(cartItemComponent.item.product)
    ).toBeFalsy();
  });

  it('should call viewItem()', () => {
    cartItemComponent.viewItem();

    expect(cartItemComponent.view.emit).toHaveBeenCalledWith();
  });

  it('should display variant properties', () => {
    const variants =
      mockProduct.baseOptions[0].selected.variantOptionQualifiers;
    fixture.detectChanges();

    expect(el.queryAll(By.css('.cx-property')).length).toEqual(variants.length);
    variants.forEach(variant => {
      expect(
        el.query(By.css('.cx-info-container')).nativeElement.innerText
      ).toContain(`${variant.name}: ${variant.value}`);
    });
  });
});
