import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Directive,
  Injector,
  Input,
  Pipe,
  PipeTransform,
  SimpleChange,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderEntry } from '@spartacus/cart/base/root';
import { I18nTestingModule } from '@spartacus/core';
import {
  ProductListItemContext,
  ProductListItemContextSource,
} from '@spartacus/storefront';
import { WishListItemComponent } from './wish-list-item.component';

@Component({
  selector: 'cx-add-to-cart',
  template: '<button>add to cart</button>',
})
class MockAddToCartComponent {
  @Input() product;
  @Input() showQuantity;
}

@Component({
  selector: 'cx-media',
  template: 'mock picture component',
})
class MockPictureComponent {
  @Input() container;
  @Input() alt;
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

const mockCartEntry: OrderEntry = {
  basePrice: {
    formattedValue: '$546.20',
  },
  product: {
    name: 'Test product',
    code: '1',
    averageRating: 4.5,
    stock: {
      stockLevelStatus: 'inStock',
    },
    images: {
      PRIMARY: {},
    },
    baseOptions: [
      {
        selected: {
          variantOptionQualifiers: [
            { name: 'Color', value: 'Red' },
            { name: 'Size', value: 'L' },
          ],
        },
      },
    ],
  },
};

@Directive({
  selector: '[cxAtMessage]',
})
class MockAtMessageDirective {
  @Input() cxAtMessage: string | string[] | undefined;
}

describe('WishListItemComponent', () => {
  let component: WishListItemComponent;
  let fixture: ComponentFixture<WishListItemComponent>;
  let el: DebugElement;
  let componentInjector: Injector;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule],
        declarations: [
          WishListItemComponent,
          MockPictureComponent,
          MockAddToCartComponent,
          MockUrlPipe,
          MockAtMessageDirective,
        ],
      })
        .overrideComponent(WishListItemComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WishListItemComponent);
    component = fixture.componentInstance;
    component.cartEntry = mockCartEntry;
    componentInjector = fixture.debugElement.injector;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product name', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-name').textContent
    ).toContain(component.cartEntry.product.name);
  });

  it('should display product code', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-code').textContent
    ).toContain(component.cartEntry.product.code);
  });

  it('should display product formatted price', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-price').textContent
    ).toContain(component.cartEntry.basePrice.formattedValue);
  });

  it('should display product image', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('cx-media')
    ).not.toBeNull();
  });

  it('should not display actions when entry is not updateable', () => {
    component.cartEntry.updateable = false;
    fixture.detectChanges();

    expect(el.query(By.css('button.cx-remove-btn'))).toBeNull();
    component.cartEntry.updateable = true;
  });

  it('should call remove', () => {
    spyOn(component, 'removeEntry');
    el.query(By.css('button.cx-remove-btn')).nativeElement.click();
    expect(component.removeEntry).toHaveBeenCalledWith(mockCartEntry);
  });

  it('should disable remove link when loading', () => {
    component.isLoading = true;
    fixture.detectChanges();

    expect(
      el.query(By.css('button.cx-remove-btn')).nativeElement.disabled
    ).toBeTruthy();
  });

  describe('variants', () => {
    it('should display variants', () => {
      el.queryAll(By.css('.cx-property')).forEach((element, index) => {
        expect(
          element.query(By.css('.cx-label')).nativeElement.innerText
        ).toEqual(
          `${mockCartEntry.product.baseOptions[0].selected.variantOptionQualifiers[index].name}: ${mockCartEntry.product.baseOptions[0].selected.variantOptionQualifiers[index].value}`
        );
      });
    });
    it('should NOT display variants when they DO NOT exist', () => {
      component.cartEntry.product.baseOptions = [];
      fixture.detectChanges();

      expect(el.query(By.css('.cx-property'))).toBeNull();
    });
  });

  describe('ProductListItemContext', () => {
    it('should have defined instance of list item context', () => {
      expect(component['productListItemContextSource']).toBeDefined();
    });

    it('should provide ProductListItemContextSource', () => {
      expect(componentInjector.get(ProductListItemContextSource)).toBeTruthy();
    });

    it('should provide ProductListItemContext', () => {
      expect(componentInjector.get(ProductListItemContext)).toBe(
        componentInjector.get(ProductListItemContextSource)
      );
    });

    it('should push changes of input"product" to context', () => {
      const contextSource: ProductListItemContextSource = componentInjector.get(
        ProductListItemContextSource
      );
      spyOn(contextSource.product$, 'next');
      component.cartEntry = { product: { code: 'testProduct' } };
      component.ngOnChanges({
        cartEntry: { currentValue: component.cartEntry } as SimpleChange,
      });
      expect(contextSource.product$.next).toHaveBeenCalledWith({
        code: 'testProduct',
      });
    });
  });
});
