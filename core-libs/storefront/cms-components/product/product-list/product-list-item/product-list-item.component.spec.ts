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
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  FeaturesConfig,
  FeaturesConfigModule,
  Image,
  ImageGroup,
  MockTranslatePipe,
  ProductService,
  RoutingService,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import {
  ImageFetchPriority,
  InnerComponentsHostDirective,
  LCP_PRESENCE,
  LcpPresence,
  MediaComponent,
  MediaContainer,
  StarRatingComponent,
} from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { ProductListItemContextSource } from '../model/product-list-item-context-source.model';
import { ProductListItemContext } from '../model/product-list-item-context.model';
import { ProductListItemComponent } from './product-list-item.component';

@Component({
  selector: 'cx-star-rating',
  template: '*****',
})
class MockStarRatingComponent {
  @Input() rating: number;
  @Input() disabled: boolean;
}

@Component({
  selector: 'cx-media',
  template: 'mock picture component',
})
class MockMediaComponent {
  @Input() container:
    | MediaContainer
    | Image
    | ImageGroup
    | ImageGroup[]
    | undefined;
  @Input() alt: string;
  @Input() fetchPriority: ImageFetchPriority | null | undefined;
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

  beforeEach(async () => {
    mockLcpPresence$ = new BehaviorSubject<LcpPresence>(LcpPresence.NO_LCP);

    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), FeaturesConfigModule],
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
        {
          provide: FeaturesConfig,
          useValue: {
            features: {
              productListItemSummaryReadMore: false,
              a11yProductListItemNameMargin: true,
            },
          },
        },
      ],
    })
      .overrideComponent(ProductListItemComponent, {
        add: {
          changeDetection: ChangeDetectionStrategy.Eager,
          imports: [
            MockMediaComponent,
            MockStarRatingComponent,
            MockUrlPipe,
            MockTranslatePipe,
            MockInnerComponentsHostDirective,
          ],
        },
        remove: {
          imports: [
            MediaComponent,
            StarRatingComponent,
            UrlPipe,
            TranslatePipe,
            InnerComponentsHostDirective,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListItemComponent);
    component = fixture.componentInstance;
    componentInjector = fixture.debugElement.injector;

    component.product = { ...mockProduct };

    component.ngOnChanges({});
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display product name', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-product-name')
        .textContent
    ).toContain(component.product.name);
  });

  it('should display product summary with a paragraph', () => {
    fixture.detectChanges();
    const el = fixture.debugElement.nativeElement.querySelector(
      '.cx-product-summary'
    );
    expect(el.tagName).toBe('P');
    expect(el.textContent).toContain(component.product.summary);
  });

  it('should display product formatted price', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-product-price')
        .textContent
    ).toContain(component.product.price.formattedValue);
  });

  it('should display product image', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('cx-media')
    ).not.toBeNull();
  });

  it('should display raiting component', () => {
    fixture.detectChanges();
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
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      'productDetails.noReviews'
    );
  });

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
    component.product = mockProduct;
    component.ngOnChanges({
      product: { currentValue: component.product } as SimpleChange,
    });
    expect(contextSource.product$.next).toHaveBeenCalledWith(mockProduct);
  });

  describe('when productListItemSummaryReadMore is enabled', () => {
    beforeEach(() => {
      const featuresConfig = TestBed.inject(FeaturesConfig);
      featuresConfig.features!['productListItemSummaryReadMore'] = true;
      fixture = TestBed.createComponent(ProductListItemComponent);
      component = fixture.componentInstance;
      component.product = { ...mockProduct };
      component.ngOnChanges({
        product: { currentValue: mockProduct } as SimpleChange,
      });
      fixture.detectChanges();
    });
    afterEach(() => {
      const featuresConfig = TestBed.inject(FeaturesConfig);
      featuresConfig.features!['productListItemSummaryReadMore'] = false;
    });
    it('should display product summary with a cx-read-more', () => {
      const readMoreEl = fixture.debugElement.query(By.css('cx-read-more'));
      expect(readMoreEl).not.toBeNull();
      expect(readMoreEl.componentInstance.text).toBe(component.product.summary);
    });
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
