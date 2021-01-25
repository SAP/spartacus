import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, Product, ProductService } from '@spartacus/core';
import { ItemCounterComponent, MediaModule } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { Configurator } from '../../../core/model/configurator.model';
import { ConfiguratorShowMoreComponent } from '../../show-more/configurator-show-more.component';
import { ConfiguratorAttributeProductCardComponent } from './configurator-attribute-product-card.component';
import { Observable, of } from 'rxjs';

interface ProductExtended extends Product {
  noLink?: boolean;
}

const product: ProductExtended = {
  name: 'Product Name',
  code: 'PRODUCT_CODE',
  images: {
    PRIMARY: {
      thumbnail: {
        url: 'url',
        altText: 'alt',
      },
    },
  },
  price: {
    formattedValue: '$1.500',
  },
  priceRange: {
    maxPrice: {
      formattedValue: '$1.500',
    },
    minPrice: {
      formattedValue: '$1.000',
    },
  },
};

const productTarnsformed: ProductExtended = {
  code: '1111-2222',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  images: {},
  name: 'Lorem Ipsum Dolor',
  noLink: true,
};

class MockProductService {
  get(): Observable<Product> {
    return of(product);
  }
}

describe('ConfiguratorAttributeProductCardComponent', () => {
  let component: ConfiguratorAttributeProductCardComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeProductCardComponent>;

  const createImage = (url: string, altText: string): Configurator.Image => {
    const image: Configurator.Image = {
      url: url,
      altText: altText,
    };
    return image;
  };

  const createValue = (
    description: string,
    images: Configurator.Image[],
    quantity: number,
    selected: boolean,
    valueCode: string,
    valueDisplay: string
  ): Configurator.Value => {
    const value: Configurator.Value = {
      description,
      images,
      quantity,
      selected,
      valueCode,
      valueDisplay,
    };
    return value;
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          I18nTestingModule,
          ReactiveFormsModule,
          RouterTestingModule,
          UrlTestingModule,
          MediaModule,
        ],
        declarations: [
          ConfiguratorAttributeProductCardComponent,
          ConfiguratorShowMoreComponent,
          ItemCounterComponent,
        ],
        providers: [
          {
            provide: ProductService,
            useClass: MockProductService,
          },
        ],
      })
        .overrideComponent(ConfiguratorAttributeProductCardComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorAttributeProductCardComponent
    );
    component = fixture.componentInstance;
    component.multiSelect = false;
    component.product = createValue(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      [createImage('url', 'alt')],
      1,
      false,
      '1111-2222',
      'Lorem Ipsum Dolor'
    );

    spyOn(component, 'onHandleDeselect').and.callThrough();
    spyOn(component, 'onHandleQuantity').and.callThrough();
    spyOn(component, 'onHandleSelect').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should button be enabled when card actions are disabled and card is no selected', () => {
    const button = fixture.debugElement.query(By.css('button.btn'))
      .nativeElement;
    expect(button.disabled).toBe(false);
  });

  it('should button be enabled when card actions are disabled and card is selected', () => {
    component.product.selected = true;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button.btn'))
      .nativeElement;
    expect(button.disabled).toBe(false);
  });

  it('should button be called with proper select method', () => {
    const button = fixture.debugElement.query(By.css('button.btn'))
      .nativeElement;
    button.click();

    fixture.detectChanges();

    expect(component.onHandleSelect).toHaveBeenCalled();
  });

  it('should button be called with proper deselect action', () => {
    component.product.selected = true;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button.btn'))
      .nativeElement;

    button.click();

    fixture.detectChanges();

    expect(component.onHandleDeselect).toHaveBeenCalled();
  });

  it('should button have select text when card type is no multi select and card is no selected', () => {
    const button = fixture.debugElement.query(By.css('button.btn'))
      .nativeElement;

    expect(button.innerText).toContain('configurator.button.select');
  });

  it('should button have deselect text when card type is no multi select and card is selected', () => {
    component.product.selected = true;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button.btn'))
      .nativeElement;

    expect(button.innerText).toContain('configurator.button.remove');
  });

  it('should button have add text when card type is multi select and card is no selected', () => {
    component.multiSelect = true;
    component.product.selected = false;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button.btn'))
      .nativeElement;

    expect(button.innerText).toContain('configurator.button.add');
  });

  it('should button have remove text when card type is multi selectand card is selected', () => {
    component.multiSelect = true;
    component.product.selected = true;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button.btn'))
      .nativeElement;

    expect(button.innerText).toContain('configurator.button.remove');
  });

  it('should quantity be hidden when card type is no multielect', () => {
    component.multiSelect = false;

    fixture.detectChanges();

    const quantityContainer = fixture.debugElement.query(
      By.css('.cx-configurator-attribute-product-card-quantity')
    );

    expect(quantityContainer).toBeNull();
  });

  it('should quantity be visible when card type is multi select', () => {
    component.multiSelect = true;

    fixture.detectChanges();

    const quantityContainer = fixture.debugElement.query(
      By.css('.cx-configurator-attribute-product-card-quantity')
    );

    expect(quantityContainer).toBeDefined();
  });

  it('should call handleQuantity on event onHandleQuantity', () => {
    spyOn(component.handleQuantity, 'emit').and.callThrough();

    component.onHandleQuantity(1);

    expect(component.handleQuantity.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        quantity: 1,
        valueCode: component.product.valueCode,
      })
    );
  });

  it('should call onHandleDeselect of event onChangeQuantity', () => {
    const quantity = { quantity: 0 };

    component.onChangeQuantity(quantity);

    expect(component.onHandleDeselect).toHaveBeenCalled();
  });

  it('should call onHandleQuantity of event onChangeQuantity', () => {
    const quantity = { quantity: 2 };

    component.onChangeQuantity(quantity);

    expect(component.onHandleQuantity).toHaveBeenCalled();
  });

  it('should transformToProductType return Product', () => {
    expect(component.transformToProductType(component.product)).toEqual(
      productTarnsformed
    );
  });
});
