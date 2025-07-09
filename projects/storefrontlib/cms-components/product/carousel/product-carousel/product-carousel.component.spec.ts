import {
  Component,
  Input,
  Pipe,
  PipeTransform,
  TemplateRef,
  TrackByFunction,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CmsProductCarouselComponent,
  FeatureConfigService,
  FeaturesConfigModule,
  FeatureToggles,
  I18nTestingModule,
  Product,
  ProductScope,
  ProductSearchByCategoryService,
  ProductSearchByCodeService,
  ProductService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';
import { ProductCarouselComponent } from './product-carousel.component';

@Component({
  selector: 'cx-carousel',
  template: `
    cx-carousel
    <ng-container *ngFor="let item$ of items; let i = index">
      <ng-container
        *ngTemplateOutlet="
          template;
          context: { item: item$ | async, itemIndex: i }
        "
      ></ng-container>
    </ng-container>
  `,
  standalone: false,
})
class MockCarouselComponent {
  @Input() title: string;
  @Input() template: TemplateRef<any>;
  @Input() items: any[];
  @Input() trackByFn: TrackByFunction<any>;
}

@Component({
  selector: 'cx-carousel-scrolling',
  template: `
    cx-carousel-scrolling
    <ng-container *ngFor="let item$ of items; let i = index">
      <ng-container
        *ngTemplateOutlet="
          template;
          context: { item: item$ | async, itemIndex: i }
        "
      ></ng-container>
    </ng-container>
  `,
  standalone: false,
})
class MockCarouselScrollingComponent {
  @Input() title: string;
  @Input() template: TemplateRef<any>;
  @Input() items: any[];
  @Input() trackByFn: TrackByFunction<any>;
}

@Component({
  selector: 'cx-product-carousel-item',
  template: '',
  standalone: false,
})
class MockProductCarouselItemComponent {
  @Input() item: any;
  @Input() itemIndex: number;
}

@Pipe({
  name: 'cxUrl',
  standalone: false,
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

@Component({
  selector: 'cx-media',
  template: '',
  standalone: false,
})
class MockMediaComponent {
  @Input() container: any;
  @Input() format: string;
}

const productCodeArray: string[] = ['1', '2'];

const mockProducts: Record<string, Product> = {
  1: {
    code: '1',
    name: 'product 1',
    price: {
      formattedValue: '$100.00',
    },
    images: {
      PRIMARY: {
        image: {
          url: 'whatever.jpg',
        },
      },
    },
  },
  2: {
    code: '2',
    name: 'product 2',
    price: {
      formattedValue: '$200.00',
    },
  },
};

const mockProductsFromSearchByCodes: Record<string, Record<string, Product>> = {
  1: {
    carousel: {
      code: '1',
      name: 'product 1',
      price: {
        formattedValue: '$90.00',
      },
    },
    carouselMinimal: {
      code: '1',
      name: 'product 1',
    },
  },
  2: {
    carousel: {
      code: '2',
      name: 'product 2',
      price: {
        formattedValue: '$200.00',
      },
    },
    carouselMinimal: {
      code: '2',
      name: 'product 2',
    },
  },
};
const mockProductsFromSearchByCategory: Record<
  string,
  Record<string, Product[]>
> = {
  electronics: {
    code: [{ code: 'prod3' }, { code: 'prod4' }, { code: 'prod5' }],
  },
};

const mockComponentData: CmsProductCarouselComponent = {
  uid: '001',
  typeCode: 'ProductCarouselComponent',
  modifiedTime: new Date('2017-12-21T18:15:15+0000'),
  popup: 'false',
  productCodes: productCodeArray.join(' '),
  scroll: 'ALLVISIBLE',
  title: 'Mock Title',
  name: 'Mock Product Carousel',
  container: 'false',
  categoryCodes: 'electronics ',
};
const mockComponentWithAddCartData: CmsProductCarouselComponent = {
  ...mockComponentData,
  composition: { inner: ['ProductAddToCartComponent'] },
};

const MockCmsProductCarouselComponent = <CmsComponentData<any>>{
  data$: of(mockComponentData),
};
const MockCmsProductCarouselComponentAddToCart = <CmsComponentData<any>>{
  data$: of(mockComponentWithAddCartData),
};

class MockProductService implements Partial<ProductService> {
  get(productCode: string): Observable<Product> {
    return of(mockProducts[productCode]);
  }
}

class MockProductSearchByCodeService
  implements Partial<ProductSearchByCodeService>
{
  get({ code, scope }: { code: string; scope: string }) {
    return of(mockProductsFromSearchByCodes[code][scope]);
  }
}

class MockProductSearchByCategoryService
  implements Partial<ProductSearchByCategoryService>
{
  get({ categoryCode, scope }: { categoryCode: string; scope?: string }) {
    const products =
      mockProductsFromSearchByCategory[categoryCode]?.[scope ?? ''] || [];
    return of(products);
  }
}

describe('ProductCarouselComponent', () => {
  let component: ProductCarouselComponent;
  let fixture: ComponentFixture<ProductCarouselComponent>;
  let featureConfigService: MockFeatureConfigService;
  let productSearchByCodeService: MockProductSearchByCodeService;
  let productSearchByCategoryService: MockProductSearchByCategoryService;
  let mockFeatureToggles: FeatureToggles;

  class MockFeatureConfigService {
    isEnabled(
      feature: keyof FeatureToggles | `!${keyof FeatureToggles}`
    ): boolean {
      const hasNegation = feature.startsWith('!');
      const featureName = (
        hasNegation ? feature.slice(1) : feature
      ) as keyof FeatureToggles;

      return hasNegation
        ? !mockFeatureToggles[featureName]
        : !!mockFeatureToggles[featureName];
    }
  }

  const testBedDefaults = {
    imports: [I18nTestingModule, FeaturesConfigModule],
    declarations: [
      ProductCarouselComponent,
      MockProductCarouselItemComponent,
      MockCarouselComponent,
      MockCarouselScrollingComponent,
      MockMediaComponent,
      MockUrlPipe,
    ],
    providers: [
      {
        provide: CmsComponentData,
        useValue: MockCmsProductCarouselComponent,
      },
      {
        provide: ProductService,
        useClass: MockProductService,
      },
      {
        provide: FeatureConfigService,
        useClass: MockFeatureConfigService,
      },
      {
        provide: ProductSearchByCodeService,
        useClass: MockProductSearchByCodeService,
      },
      {
        provide: ProductSearchByCategoryService,
        useClass: MockProductSearchByCategoryService,
      },
    ],
  };

  beforeEach(waitForAsync(() => {
    mockFeatureToggles = {
      useProductCarouselBatchApi: true,
      enableCarouselCategoryProducts: false,
      productCarouselScrolling: true,
    };
    TestBed.configureTestingModule(testBedDefaults).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCarouselComponent);
    component = fixture.componentInstance;
    featureConfigService = TestBed.inject(
      FeatureConfigService
    ) as MockFeatureConfigService;
    productSearchByCodeService = TestBed.inject(
      ProductSearchByCodeService
    ) as MockProductSearchByCodeService;
    productSearchByCategoryService = TestBed.inject(
      ProductSearchByCategoryService
    ) as MockProductSearchByCategoryService;
  });

  it('should be created', waitForAsync(() => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  describe('when feature toggle "productCarouselScrolling" is enabled', () => {
    beforeEach(() => {
      mockFeatureToggles.productCarouselScrolling = true;
    });

    it('should render cx-carousel-scrolling component', () => {
      fixture.detectChanges();
      const carouselScrollingComponent = fixture.debugElement.query(
        By.css('cx-carousel-scrolling')
      );
      expect(carouselScrollingComponent).toBeTruthy();
    });
  });
  describe('when feature toggle "productCarouselScrolling" is disabled', () => {
    beforeEach(() => {
      mockFeatureToggles.productCarouselScrolling = false;
    });

    it('should render cx-carousel component', () => {
      fixture.detectChanges();
      const carouselComponent = fixture.debugElement.query(
        By.css('cx-carousel')
      );
      expect(carouselComponent).toBeTruthy();
    });
  });

  it('should have 2 items', (done) => {
    const productService = TestBed.inject(ProductService);
    mockFeatureToggles.useProductCarouselBatchApi = false;
    mockFeatureToggles.enableCarouselCategoryProducts = false;
    spyOn(featureConfigService, 'isEnabled').and.callThrough();
    spyOn(productService, 'get').and.callThrough();

    const scopes = [ProductScope.LIST_ITEM];

    component.items$.subscribe((items) => {
      expect(productService.get).toHaveBeenCalledTimes(2);
      expect(productService.get).toHaveBeenCalledWith('1', scopes);
      expect(productService.get).toHaveBeenCalledWith('2', scopes);
      expect(items?.length).toBe(2);

      done();
    });
  });

  it('should have product code 111 in first product', waitForAsync(() => {
    mockFeatureToggles.useProductCarouselBatchApi = false;
    mockFeatureToggles.enableCarouselCategoryProducts = false;
    spyOn(featureConfigService, 'isEnabled').and.callThrough();
    fixture.detectChanges();

    let items: Observable<Product | undefined>[] = [];
    component.items$.subscribe((i) => (items = i));
    let product: Product | undefined;
    items[0].subscribe((p) => (product = p));

    expect(product).toBe(mockProducts[1]);
  }));

  it('FeatureToggleEnable: Should use batch API with carouselMinimal scope when componentMappingExist is false', (done) => {
    mockFeatureToggles.useProductCarouselBatchApi = true;
    mockFeatureToggles.enableCarouselCategoryProducts = false;
    spyOn(featureConfigService, 'isEnabled').and.callThrough();
    fixture.detectChanges();

    spyOn(productSearchByCodeService, 'get').and.callThrough();

    component.items$.subscribe((items) => {
      expect(featureConfigService.isEnabled).toHaveBeenCalledWith(
        'useProductCarouselBatchApi'
      );
      expect(productSearchByCodeService.get).toHaveBeenCalledWith({
        code: '1',
        scope: 'carouselMinimal',
      });
      expect(productSearchByCodeService.get).toHaveBeenCalledWith({
        code: '2',
        scope: 'carouselMinimal',
      });
      expect(items?.length).toBe(2);
      done();
    });
  });

  describe('UI test', () => {
    it('should have 2 rendered templates', waitForAsync(() => {
      fixture.detectChanges();
      const el = fixture.debugElement.queryAll(
        By.css('cx-product-carousel-item')
      );
      expect(el.length).toEqual(2);
    }));

    it('should pass `itemIndex` input to child components', waitForAsync(() => {
      fixture.detectChanges();
      const el = fixture.debugElement.queryAll(
        By.css('cx-product-carousel-item')
      );
      expect(el[0].componentInstance.itemIndex).toEqual(0);
      expect(el[1].componentInstance.itemIndex).toEqual(1);
    }));
  });

  describe('Carousel with inner component mapping', () => {
    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule(testBedDefaults);

      TestBed.overrideProvider(CmsComponentData, {
        useValue: MockCmsProductCarouselComponentAddToCart,
      });
      TestBed.compileComponents();
      fixture = TestBed.createComponent(ProductCarouselComponent);
      component = fixture.componentInstance;
      featureConfigService = TestBed.inject(
        FeatureConfigService
      ) as MockFeatureConfigService;
      productSearchByCodeService = TestBed.inject(
        ProductSearchByCodeService
      ) as MockProductSearchByCodeService;
      fixture.detectChanges();
    });

    it('should invoke the productService with the correct scope.', (done) => {
      fixture.detectChanges();
      const productService = TestBed.inject(ProductService);
      spyOn(featureConfigService, 'isEnabled').and.returnValue(false);
      spyOn(productService, 'get').and.callThrough();

      const scopes = [ProductScope.LIST, ProductScope.STOCK];

      component.items$.subscribe((items) => {
        expect(productService.get).toHaveBeenCalledTimes(2);
        expect(productService.get).toHaveBeenCalledWith('1', scopes);
        expect(productService.get).toHaveBeenCalledWith('2', scopes);
        expect(items?.length).toBe(2);

        done();
      });
    });

    it('FeatureToggleEnable: Should use batch API with carousel scope when componentMappingExist is true', (done) => {
      mockFeatureToggles.useProductCarouselBatchApi = true;
      mockFeatureToggles.enableCarouselCategoryProducts = false;
      spyOn(featureConfigService, 'isEnabled').and.callThrough();
      spyOn(productSearchByCodeService, 'get').and.callThrough();
      fixture.detectChanges();

      component.items$.subscribe((items) => {
        expect(featureConfigService.isEnabled).toHaveBeenCalledWith(
          'useProductCarouselBatchApi'
        );
        expect(productSearchByCodeService.get).toHaveBeenCalledWith({
          code: '1',
          scope: 'carousel',
        });
        expect(productSearchByCodeService.get).toHaveBeenCalledWith({
          code: '2',
          scope: 'carousel',
        });
        expect(items?.length).toBe(2);
        done();
      });
    });
  });
  describe('Carousel with category products', () => {
    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule(testBedDefaults);

      TestBed.overrideProvider(CmsComponentData, {
        useValue: MockCmsProductCarouselComponentAddToCart,
      });
      TestBed.compileComponents();
      fixture = TestBed.createComponent(ProductCarouselComponent);
      component = fixture.componentInstance;
      featureConfigService = TestBed.inject(
        FeatureConfigService
      ) as MockFeatureConfigService;
      productSearchByCategoryService = TestBed.inject(
        ProductSearchByCategoryService
      ) as MockProductSearchByCategoryService;
      fixture.detectChanges();
    });

    it('should retrieve products by category', (done) => {
      mockFeatureToggles.useProductCarouselBatchApi = false;
      mockFeatureToggles.enableCarouselCategoryProducts = true;
      spyOn(featureConfigService, 'isEnabled').and.callThrough();

      spyOn(productSearchByCategoryService, 'get').and.callThrough();

      component.items$.subscribe((items) => {
        expect(items?.length).toBe(5);

        expect(productSearchByCategoryService.get).toHaveBeenCalledTimes(2);

        done();
      });
    });
  });

  it('should pass trackByFn to the carousel and return product.code', () => {
    fixture.detectChanges();
    const carouselComponent = fixture.debugElement.query(
      By.directive(MockCarouselScrollingComponent)
    ).componentInstance;
    expect(carouselComponent.trackByFn).toBeDefined();

    const mockProduct = { code: 'test123', name: 'Test Product' };
    const result = carouselComponent.trackByFn(999, mockProduct);
    expect(result).toBe('test123');
  });
});
