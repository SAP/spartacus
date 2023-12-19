import {
  Component,
  Directive,
  Injector,
  Input,
  Pipe,
  PipeTransform,
  SimpleChange,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import {
  OutletDirective,
  OutletModule,
  ProductListItemContext,
  ProductListItemContextSource,
} from '@spartacus/storefront';
import { ProductCarouselItemComponent } from './product-carousel-item.component';
import { By } from '@angular/platform-browser';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockRoutingService {}
class MockProductService {}

@Directive({
  selector: '[cxOutlet]',
})
class MockOutletDirective implements Partial<OutletDirective> {
  @Input() cxOutlet: string;
}

@Component({
  selector: 'cx-media',
  template: '<img>',
})
class MockMediaComponent {
  @Input() container: any;
  @Input() format: string;
  @Input() alt: string;
}

describe('ProductCarouselItemComponent in product-carousel', () => {
  let component: ProductCarouselItemComponent;
  let componentInjector: Injector;
  let fixture: ComponentFixture<ProductCarouselItemComponent>;

  const mockProduct = {
    name: 'Test product',
    nameHtml: 'Test product',
    summary: 'Test summary',
    code: '1',
    averageRating: 4.5,
    stock: {
      stockLevelStatus: 'inStock',
    },
    price: {
      formattedValue: '$100,00',
    },
    images: {
      PRIMARY: {},
    },
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule, OutletModule],
        declarations: [
          ProductCarouselItemComponent,
          MockUrlPipe,
          MockOutletDirective,
          MockMediaComponent,
        ],
        providers: [
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: ProductService,
            useClass: MockProductService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCarouselItemComponent);
    component = fixture.componentInstance;
    componentInjector = fixture.debugElement.injector;

    component.item = mockProduct;

    component.ngOnChanges({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product name', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-product-name')
        .textContent
    ).toContain(component.item.name);
  });

  it('should display product formatted price', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('.price').textContent
    ).toContain(component.item.price.formattedValue);
  });

  it('should display product image', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('cx-media')
    ).not.toBeNull();
  });

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
    component.item = mockProduct;
    component.ngOnChanges({
      item: { currentValue: component.item } as SimpleChange,
    });
    expect(contextSource.product$.next).toHaveBeenCalledWith(mockProduct);
  });

  describe('UI test', () => {
    it(
      'should render product name in template',
      waitForAsync(() => {
        const el = fixture.debugElement.query(By.css('h3'));
        expect(el.nativeElement).toBeTruthy();
        expect(el.nativeElement.innerText).toEqual('Test product');
      })
    );

    it(
      'should render product price in template',
      waitForAsync(() => {
        const el = fixture.debugElement.query(By.css('.price'));
        expect(el.nativeElement).toBeTruthy();
        expect(el.nativeElement.innerText).toEqual('$100,00');
      })
    );

    it(
      'should render product primary image for the first item',
      waitForAsync(() => {
        const el = fixture.debugElement.query(By.css('cx-media'));
        expect(el.nativeElement).toBeTruthy();
      })
    );

    it(
      'should render missing product image for the 2nd item as well',
      waitForAsync(() => {
        const el = fixture.debugElement.query(By.css('cx-media'));
        expect(el.nativeElement).toBeTruthy();
      })
    );
  });
});
