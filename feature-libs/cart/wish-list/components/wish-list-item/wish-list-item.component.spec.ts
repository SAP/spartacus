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
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AddToCartComponent } from '@spartacus/cart/base/components/add-to-cart';
import { OrderEntry } from '@spartacus/cart/base/root';
import {
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import {
  AtMessageDirective,
  InnerComponentsHostDirective,
  MediaComponent,
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

@Pipe({ name: 'cxUrl' })
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

@Directive({ selector: '[cxAtMessage]' })
class MockAtMessageDirective {
  @Input() cxAtMessage: string | string[] | undefined;
}

@Directive({
  selector: '[cxInnerComponentsHost]',
})
class MockInnerComponentsHostDirective {}

describe('WishListItemComponent', () => {
  let component: WishListItemComponent;
  let fixture: ComponentFixture<WishListItemComponent>;
  let el: DebugElement;
  let componentInjector: Injector;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        WishListItemComponent,
        RouterModule.forRoot([]),
      ],
    })
      .overrideComponent(WishListItemComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            MediaComponent,
            AddToCartComponent,
            UrlPipe,
            AtMessageDirective,
            InnerComponentsHostDirective,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockPictureComponent,
            MockAddToCartComponent,
            MockUrlPipe,
            MockAtMessageDirective,
            MockInnerComponentsHostDirective,
          ],
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishListItemComponent);
    component = fixture.componentInstance;
    component.cartEntry = mockCartEntry;
    componentInjector = fixture.debugElement.injector;
    el = fixture.debugElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display product name', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-name').textContent?.trim()
    ).toContain(component.cartEntry.product.name);
  });

  it('should display product code', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-code').textContent?.trim()
    ).toContain(component.cartEntry.product.code);
  });

  it('should display product formatted price', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-price').textContent?.trim()
    ).toContain(component.cartEntry.basePrice.formattedValue);
  });

  it('should display product image', () => {
    fixture.detectChanges();
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
    fixture.detectChanges();
    vi.spyOn(component, 'removeEntry');
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
      fixture.detectChanges();
      el.queryAll(By.css('.cx-property')).forEach((element, index) => {
        expect(
          element.query(By.css('.cx-label')).nativeElement.textContent?.trim()
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
      fixture.detectChanges();
      expect(component['productListItemContextSource']).toBeDefined();
    });

    it('should provide ProductListItemContextSource', () => {
      fixture.detectChanges();
      expect(componentInjector.get(ProductListItemContextSource)).toBeTruthy();
    });

    it('should provide ProductListItemContext', () => {
      fixture.detectChanges();
      expect(componentInjector.get(ProductListItemContext)).toBe(
        componentInjector.get(ProductListItemContextSource)
      );
    });

    it('should push changes of input"product" to context', () => {
      fixture.detectChanges();
      const contextSource: ProductListItemContextSource = componentInjector.get(
        ProductListItemContextSource
      );
      vi.spyOn(contextSource.product$, 'next');
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
