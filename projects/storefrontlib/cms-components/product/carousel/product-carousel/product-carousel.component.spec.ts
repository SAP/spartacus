import {
  Component,
  Input,
  Pipe,
  PipeTransform,
  TemplateRef,
} from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CmsProductCarouselComponent,
  I18nTestingModule,
  FeatureConfigService,
  Product,
  ProductScope,
  ProductService,
  ProductSearchByCodeService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';
import { ProductCarouselComponent } from './product-carousel.component';

@Component({
  selector: 'cx-carousel',
  template: `
    <ng-container *ngFor="let item$ of items">
      <ng-container
        *ngTemplateOutlet="template; context: { item: item$ | async }"
      ></ng-container>
    </ng-container>
  `,
})
class MockCarouselComponent {
  @Input() title: string;
  @Input() template: TemplateRef<any>;
  @Input() items: any[];
}

@Component({ selector: 'cx-product-carousel-item', template: '' })
class MockProductCarouselItemComponent {
  @Input() item: any;
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

@Component({
  selector: 'cx-media',
  template: '',
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
class MockFeatureConfigService {
  isEnabled(feature: string): boolean {
    return feature === 'useProductCarouselBatchApi';
  }
}

class MockProductSearchByCodeService
  implements Partial<ProductSearchByCodeService>
{
  get({ code, scope }: { code: string; scope: string }) {
    return of(mockProductsFromSearchByCodes[code][scope]);
  }
}

describe('ProductCarouselComponent', () => {
  let component: ProductCarouselComponent;
  let fixture: ComponentFixture<ProductCarouselComponent>;
  let featureConfigService: MockFeatureConfigService;
  let productSearchByCodeService: MockProductSearchByCodeService;

  const testBedDefaults = {
    imports: [RouterTestingModule, I18nTestingModule],
    declarations: [
      ProductCarouselComponent,
      MockProductCarouselItemComponent,
      MockCarouselComponent,
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
    ],
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule(testBedDefaults).compileComponents();
  }));

  beforeEach(() => {
    console.log('Starting ProductCarouselComponent test');
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

  it('should be created', waitForAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should have 2 items', (done) => {
    const productService = TestBed.inject(ProductService);
    spyOn(featureConfigService, 'isEnabled').and.returnValue(false);
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
    spyOn(featureConfigService, 'isEnabled').and.returnValue(false);
    let items: Observable<Product | undefined>[] = [];
    component.items$.subscribe((i) => (items = i));
    let product: Product | undefined;
    items[0].subscribe((p) => (product = p));

    expect(product).toBe(mockProducts[1]);
  }));

  it('FeatureToggleEnable: Should use batch API with carouselMinimal scope when componentMappingExist is false', (done) => {
    spyOn(featureConfigService, 'isEnabled').and.returnValue(true);
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
      const el = fixture.debugElement.queryAll(
        By.css('cx-product-carousel-item')
      );
      expect(el.length).toEqual(2);
    }));
  });

  describe('Carousel with inner component mapping', () => {
    beforeEach(() => {
    console.log('Starting ProductCarouselComponent test');
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
      spyOn(featureConfigService, 'isEnabled').and.returnValue(true);
      spyOn(productSearchByCodeService, 'get').and.callThrough();

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
});
