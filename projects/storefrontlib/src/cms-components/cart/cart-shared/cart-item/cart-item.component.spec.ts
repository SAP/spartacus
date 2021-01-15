import {
  Component,
  DebugElement,
  Directive,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ControlContainer,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  FeaturesConfigModule,
  I18nTestingModule,
  Product,
} from '@spartacus/core';
import { ModalDirective } from 'projects/storefrontlib/src/shared/components/modal/modal.directive';
import { PromotionService } from '../../../../shared/services/promotion/promotion.service';
import { MockFeatureLevelDirective } from '../../../../shared/test/mock-feature-level-directive';
import { CartItemComponent } from './cart-item.component';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Directive({
  selector: '[cxModal]',
})
class MockModalDirective implements Partial<ModalDirective> {
  @Input() cxModal;
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

const mockBasicProduct: Product = {
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

const mockVariantProduct: Product = {
  baseProduct: 'baseProduct1',
  categories: [{ code: 'test1' }, { code: 'test2' }, { code: 'test3' }],
  code: 'code_1',
  multidimensional: true,
  name: 'Test1',
  purchasable: true,
  variantMatrix: [
    {
      elements: [
        {
          elements: [
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_1',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7',
              },
            },
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_2',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7.5',
              },
            },
          ],
          isLeaf: false,
          parentVariantCategory: {
            hasImage: false,
            name: 'Fit',
          },
          variantOption: {
            code: 'code_1',
            variantOptionQualifiers: [],
          },
          variantValueCategory: {
            name: 'M',
          },
        },
        {
          elements: [
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_3',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7',
              },
            },
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_4',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7.5',
              },
            },
          ],
          isLeaf: false,
          parentVariantCategory: {
            hasImage: false,
            name: 'Fit',
          },
          variantOption: {
            code: 'code_3',
            variantOptionQualifiers: [],
          },
          variantValueCategory: {
            name: 'W',
          },
        },
      ],
      isLeaf: false,
      parentVariantCategory: {
        hasImage: true,
        name: 'Color',
      },
      variantOption: {
        code: 'code_1',
        variantOptionQualifiers: [{ image: {} }],
      },
      variantValueCategory: {
        name: 'Black',
      },
    },
    {
      elements: [
        {
          elements: [
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_5',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7',
              },
            },
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_6',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7.5',
              },
            },
          ],
          isLeaf: false,
          parentVariantCategory: {
            hasImage: false,
            name: 'Fit',
          },
          variantOption: {
            code: 'code_5',
            variantOptionQualifiers: [],
          },
          variantValueCategory: {
            name: 'M',
          },
        },
        {
          elements: [
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_7',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7',
              },
            },
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_8',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7.5',
              },
            },
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_9',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '12.5',
              },
            },
          ],
          isLeaf: false,
          parentVariantCategory: {
            hasImage: false,
            name: 'Fit',
          },
          variantOption: {
            code: 'code_7',
            variantOptionQualifiers: [],
          },
          variantValueCategory: {
            name: 'W',
          },
        },
      ],
      isLeaf: false,
      parentVariantCategory: {
        hasImage: false,
        name: 'Color',
      },
      variantOption: {
        code: 'code_5',
        variantOptionQualifiers: [],
      },
      variantValueCategory: {
        name: 'Brown',
      },
    },
  ],
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

  const featureConfig = jasmine.createSpyObj('FeatureConfigService', [
    'isEnabled',
    'isLevel',
  ]);

  beforeEach(
    waitForAsync(() => {
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
          MockModalDirective,
        ],
        providers: [
          {
            provide: ControlContainer,
          },
          {
            provide: PromotionService,
            useClass: MockPromotionService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemComponent);
    cartItemComponent = fixture.componentInstance;
    cartItemComponent.item = {
      product: mockBasicProduct,
      updateable: true,
    };
    cartItemComponent.quantityControl = new FormControl('1');
    cartItemComponent.quantityControl.markAsPristine();
    spyOn(cartItemComponent, 'removeItem').and.callThrough();
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create CartItemComponent', () => {
    expect(cartItemComponent).toBeTruthy();
  });

  it('should create cart details component', () => {
    featureConfig.isEnabled.and.returnValue(true);
    expect(cartItemComponent).toBeTruthy();

    fixture.detectChanges();

    featureConfig.isEnabled.and.returnValue(false);
    expect(cartItemComponent).toBeTruthy();
  });

  it('should call removeItem()', () => {
    const button: DebugElement = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    fixture.detectChanges();

    expect(cartItemComponent.removeItem).toHaveBeenCalled();
    expect(cartItemComponent.quantityControl.value).toEqual(0);
  });

  it('should mark control "dirty" after removeItem is called', () => {
    const button: DebugElement = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    fixture.detectChanges();
    expect(cartItemComponent.quantityControl.dirty).toEqual(true);
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

  it('should display variant properties', () => {
    const variants =
      mockBasicProduct.baseOptions[0].selected.variantOptionQualifiers;
    fixture.detectChanges();

    expect(el.queryAll(By.css('.cx-property')).length).toEqual(variants.length);
    variants.forEach((variant) => {
      const infoContainer: HTMLElement = el.query(By.css('.cx-info-container'))
        .nativeElement;
      expect(infoContainer.innerText).toContain(
        `${variant.name}: ${variant.value}`
      );
    });
  });

  it('should check if product is multi-d variant', () => {
    cartItemComponent.ngOnInit();
    fixture.detectChanges();

    expect(cartItemComponent.isMultiDVariantsProduct).toHaveBeenCalledWith(
      mockVariantProduct
    );
  });

  describe('is multi-d variant product', () => {
    describe('when multidimensional does not exist', () => {
      it('should return false', () => {
        const result = cartItemComponent.isMultiDVariantsProduct(
          mockBasicProduct
        );

        expect(result).toEqual(false);
      });

      it('should leave variants as empty array', () => {
        cartItemComponent.ngOnInit();
        fixture.detectChanges();

        expect(cartItemComponent.variants.length).toEqual(0);
      });
    });

    describe('when multidimensional is false', () => {
      it('should return false', () => {
        mockBasicProduct.multidimensional = false;
        const result = cartItemComponent.isMultiDVariantsProduct(
          mockBasicProduct
        );

        expect(result).toEqual(false);
      });

      it('should leave variants as empty array', () => {
        cartItemComponent.ngOnInit();
        fixture.detectChanges();

        expect(cartItemComponent.variants.length).toEqual(0);
      });
    });

    describe('when multidimensional is true', () => {
      it('should return true', () => {
        const result = cartItemComponent.isMultiDVariantsProduct(
          mockVariantProduct
        );

        expect(result).toEqual(true);
      });

      it('should set variants', () => {
        cartItemComponent.ngOnInit();
        fixture.detectChanges();

        const multiDElements = fixture.debugElement.nativeElement.querySelectorAll(
          '.multid-variant'
        );

        expect(cartItemComponent.variants.length).toEqual(3);
        expect(multiDElements.length).toEqual(3);
      });
    });
  });
});
