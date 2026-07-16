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
  I18nTestingModule,
  ProductService,
  RoutingService,
  UrlPipe,
} from '@spartacus/core';
import {
  ImageFetchPriority,
  InnerComponentsHostDirective,
  LCP_PRESENCE,
  LcpContextDirectiveModule,
  LcpPresence,
  MediaComponent,
  OutletDirective,
  OutletModule,
  ProductListItemContext,
  ProductListItemContextSource,
} from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { ProductCarouselItemComponent } from './product-carousel-item.component';

@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockRoutingService {}
class MockProductService {}

@Directive({ selector: '[cxOutlet]' })
class MockOutletDirective implements Partial<OutletDirective> {
  @Input() cxOutlet: string;
}

@Component({
  selector: 'cx-media',
  template: '<img>',
  imports: [I18nTestingModule, OutletModule, LcpContextDirectiveModule],
})
class MockMediaComponent {
  @Input() container: any;
  @Input() format: string;
  @Input() alt: string;
  @Input() fetchPriority: ImageFetchPriority | null | undefined;
}

@Directive({ selector: '[cxInnerComponentsHost]' })
class MockInnerComponentsHostDirective {}

describe('ProductCarouselItemComponent in product-carousel', () => {
  let component: ProductCarouselItemComponent;
  let componentInjector: Injector;
  let fixture: ComponentFixture<ProductCarouselItemComponent>;
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
      .overrideComponent(ProductCarouselItemComponent, {
        remove: {
          imports: [
            UrlPipe,
            OutletDirective,
            MediaComponent,
            InnerComponentsHostDirective,
          ],
        },
        add: {
          changeDetection: ChangeDetectionStrategy.Default,
          imports: [
            MockUrlPipe,
            MockOutletDirective,
            MockMediaComponent,
            MockInnerComponentsHostDirective,
          ],
        },
      })
      .compileComponents();
  });

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
    vi.spyOn(contextSource.product$, 'next');
    component.item = mockProduct;
    component.ngOnChanges({
      item: { currentValue: component.item } as SimpleChange,
    });
    expect(contextSource.product$.next).toHaveBeenCalledWith(mockProduct);
  });

  describe('UI test', () => {
    it('should render product name in template', async () => {
      const el = fixture.debugElement.query(By.css('h3'));
      expect(el.nativeElement).toBeTruthy();
      expect(el.nativeElement.innerText).toEqual('Test product');
    });

    it('should render product price in template', async () => {
      const el = fixture.debugElement.query(By.css('.price'));
      expect(el.nativeElement).toBeTruthy();
      expect(el.nativeElement.innerText).toEqual('$100,00');
    });

    it('should render product primary image for the first item', async () => {
      const el = fixture.debugElement.query(By.css('cx-media'));
      expect(el.nativeElement).toBeTruthy();
    });

    it('should render missing product image for the 2nd item as well', async () => {
      const el = fixture.debugElement.query(By.css('cx-media'));
      expect(el.nativeElement).toBeTruthy();
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
});
