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
import {
  FeaturesConfigModule,
  I18nTestingModule,
  OrderEntryStatus,
} from '@spartacus/core';
import { PromotionService } from '../../../../shared/services/promotion/promotion.service';
import { MockFeatureLevelDirective } from '../../../../shared/test/mock-feature-level-directive';
import { GenericConfiguratorModule } from '../../../configurator/generic/generic-configurator.module';
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

  const featureConfig = jasmine.createSpyObj('FeatureConfigService', [
    'isEnabled',
    'isLevel',
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        GenericConfiguratorModule,
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
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemComponent);
    cartItemComponent = fixture.componentInstance;
    cartItemComponent.item = {
      product: mockProduct,
      updateable: true,
      statusSummaryList: [],
    };
    cartItemComponent.quantityControl = new FormControl('1');
    cartItemComponent.quantityControl.markAsPristine();
    spyOn(cartItemComponent, 'removeItem').and.callThrough();
    fixture.detectChanges();
    el = fixture.debugElement;
    spyOn(cartItemComponent.view, 'emit').and.callThrough();
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

  it('should call viewItem()', () => {
    cartItemComponent.viewItem();
    expect(cartItemComponent.view.emit).toHaveBeenCalledWith();
  });

  it('should display variant properties', () => {
    const variants =
      mockProduct.baseOptions[0].selected.variantOptionQualifiers;
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

  describe('Depicting configurable products in the cart', () => {
    it('should not display resolve errors message if array of statusSummary is empty', () => {
      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-error-container').length).toBe(
        0,
        "expected resolve errors message identified by selector '.cx-error-container' not to be present, but it is! innerHtml: " +
          htmlElem.innerHTML
      );
    });

    it('should not display resolve errors message if number of issues is 0', () => {
      cartItemComponent.item.statusSummaryList = [{ numberOfIssues: 0 }];
      fixture.detectChanges();
      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-error-container').length).toBe(
        0,
        "expected resolve errors message identified by selector '.cx-error-container' not to be present, but it is! innerHtml: " +
          htmlElem.innerHTML
      );
    });

    it('should not display resolve errors message if number of issues is greater than 0 and readOnly is true', () => {
      cartItemComponent.item.statusSummaryList = [
        { numberOfIssues: 1, status: OrderEntryStatus.Error },
      ];
      cartItemComponent.readonly = true;
      fixture.detectChanges();
      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-error-container').length).toBe(
        0,
        "expected resolve errors message identified by selector '.cx-error-container' not to be present, but it is! innerHtml: " +
          htmlElem.innerHTML
      );
    });

    it('should display resolve errors message if number of issues is greater than 0 and read only is false', () => {
      cartItemComponent.item.statusSummaryList = [
        { numberOfIssues: 1, status: OrderEntryStatus.Error },
      ];
      cartItemComponent.readonly = false;
      fixture.detectChanges();
      const htmlElem = fixture.nativeElement;
      expect(
        htmlElem.querySelectorAll('.cx-error-container').length
      ).toBeGreaterThan(
        0,
        "expected resolve errors message identified by selector '.cx-error-container' to be present, but it is NOT! innerHtml: " +
          htmlElem.innerHTML
      );
    });

    it('should not display configuration info if array of configurationInfo is empty', () => {
      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-configuration-info').length).toBe(
        0,
        "expected configuration info identified by selector '.cx-configuration-info' not to be present, but it is! innerHtml: " +
          htmlElem.innerHTML
      );
    });

    it('should display configuration info if array of configurationInfo is not empty', () => {
      const configurationInfo = {
        configurationLabel: 'Color',
        configurationValue: 'Blue',
        configuratorType: 'CPQCONFIGURATOR',
        status: 'SUCCESS',
      };
      cartItemComponent.item.configurationInfos = [configurationInfo];
      fixture.detectChanges();
      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-configuration-info').length).toBe(
        1,
        "expected configuration info identified by selector '.cx-configuration-info' to be present, but it is! innerHtml: " +
          htmlElem.innerHTML
      );
      expect(
        htmlElem.querySelectorAll('.cx-configuration-info-error').length
      ).toBe(
        0,
        "expected configuration info identified by selector '.cx-configuration-info-error' not to be present, but it is! innerHtml: " +
          htmlElem.innerHTML
      );
    });

    it('should return false if first entry of configuration infos does not have NONE status', () => {
      cartItemComponent.item.configurationInfos = [{ status: 'ERROR' }];
      expect(cartItemComponent.hasStatus()).toBe(true);
    });

    it('should return true if first entry of configuration infos does not have NONE status', () => {
      cartItemComponent.item.configurationInfos = [{ status: 'NONE' }];
      expect(cartItemComponent.hasStatus()).toBe(false);
    });
  });
});
