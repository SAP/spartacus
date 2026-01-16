import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Injector,
  Input,
  Pipe,
  PipeTransform,
  SimpleChange,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  FeatureDirective,
  I18nTestingModule,
  MockTranslatePipe,
  ProductService,
  RoutingService,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import {
  IconComponent,
  ImageFetchPriority,
  InnerComponentsHostDirective,
  LCP_PRESENCE,
  LcpContextDirectiveModule,
  LcpPresence,
  MediaComponent,
  OutletModule,
  StarRatingComponent,
} from '@spartacus/storefront';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { BehaviorSubject } from 'rxjs';
import { ProductListItemContextSource } from '../model/product-list-item-context-source.model';
import { ProductListItemContext } from '../model/product-list-item-context.model';
import { ProductListItemComponent } from './product-list-item.component';
@Component({
  selector: 'cx-add-to-cart',
  template: '<button>add to cart</button>',
  imports: [I18nTestingModule, OutletModule, LcpContextDirectiveModule],
})
@Component({
  selector: 'cx-star-rating',
  template: '*****',
  imports: [I18nTestingModule, OutletModule, LcpContextDirectiveModule],
})
class MockStarRatingComponent {
  @Input() rating;
  @Input() disabled;
}

@Component({
  selector: 'cx-media',
  template: 'mock picture component',
  imports: [I18nTestingModule, OutletModule, LcpContextDirectiveModule],
})
class MockMediaComponent {
  @Input() container;
  @Input() alt;
  @Input() fetchPriority: ImageFetchPriority | null | undefined;
}

@Component({
  selector: 'cx-icon',
  template: '',
  imports: [I18nTestingModule, OutletModule, LcpContextDirectiveModule],
})
class MockCxIconComponent {
  @Input() type;
}

@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockRoutingService {}
class MockProductService {}

@Directive({ selector: '[cxInnerComponentsHost]' })
class MockInnerComponentsHostDirective {}

describe('ProductListItemComponent in product-list', () => {
  let component: ProductListItemComponent;
  let componentInjector: Injector;
  let fixture: ComponentFixture<ProductListItemComponent>;
  let mockLcpPresence$: BehaviorSubject<LcpPresence>;

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

  beforeEach(waitForAsync(() => {
    mockLcpPresence$ = new BehaviorSubject<LcpPresence>(LcpPresence.NO_LCP);

    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [
        {
          provide: LCP_PRESENCE,
          useValue: mockLcpPresence$,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: ProductService,
          useClass: MockProductService,
        },
      ],
    })
      .overrideComponent(ProductListItemComponent, {
        add: {
          changeDetection: ChangeDetectionStrategy.Default,
          imports: [
            MockMediaComponent,
            MockStarRatingComponent,
            MockUrlPipe,
            MockCxIconComponent,
            MockFeatureDirective,
            MockTranslatePipe,
            MockInnerComponentsHostDirective,
          ],
        },
        remove: {
          imports: [
            MediaComponent,
            StarRatingComponent,
            UrlPipe,
            IconComponent,
            FeatureDirective,
            TranslatePipe,
            InnerComponentsHostDirective,
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListItemComponent);
    component = fixture.componentInstance;
    componentInjector = fixture.debugElement.injector;

    component.product = mockProduct;

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
    ).toContain(component.product.name);
  });

  it('should display product summary', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-product-summary')
        .textContent
    ).toContain(component.product.summary);
  });

  it('should display product formatted price', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-product-price')
        .textContent
    ).toContain(component.product.price.formattedValue);
  });

  it('should display product image', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('cx-media')
    ).not.toBeNull();
  });

  it('should display raiting component', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('cx-star-rating')
    ).not.toBeNull();
  });

  it('should not display rating component when rating is unavailable', () => {
    component.product.averageRating = undefined;
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('cx-star-rating')
    ).toBeNull();
  });

  it('should display noReviews when rating is unavailable', () => {
    component.product.averageRating = undefined;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerText).toContain(
      'productDetails.noReviews'
    );
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
    component.product = mockProduct;
    component.ngOnChanges({
      product: { currentValue: component.product } as SimpleChange,
    });
    expect(contextSource.product$.next).toHaveBeenCalledWith(mockProduct);
  });
  describe('LCP context handling', () => {
    describe('when contains LCP element', () => {
      beforeEach(() => {
        mockLcpPresence$.next(LcpPresence.HAS_LCP);
      });

      it('should prioritize downloading the image of the FIRST carousel item', () => {
        fixture.componentInstance.itemIndex = 0;
        fixture.detectChanges();
        const mediaComponents = fixture.debugElement.queryAll(
          By.directive(MockMediaComponent)
        );
        expect(mediaComponents[0].componentInstance.fetchPriority).toBe(
          ImageFetchPriority.HIGH
        );
      });

      it('should NOT prioritize downloading the image of the carousel items other than the first', () => {
        fixture.componentInstance.itemIndex = 1;
        fixture.detectChanges();
        const mediaComponents = fixture.debugElement.queryAll(
          By.directive(MockMediaComponent)
        );
        expect(mediaComponents[0].componentInstance.fetchPriority).toBe(
          undefined
        );
      });
    });

    describe('when does NOT contain LCP element', () => {
      beforeEach(() => {
        mockLcpPresence$.next(LcpPresence.NO_LCP);
      });

      it('should NOT prioritize downloading the image', () => {
        fixture.detectChanges();
        const mediaComponents = fixture.debugElement.queryAll(
          By.directive(MockMediaComponent)
        );
        expect(mediaComponents[0].componentInstance.fetchPriority).toBe(
          undefined
        );
      });
    });
  });
});
