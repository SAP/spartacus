import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PageRobotsMeta } from '../../cms';
import { I18nTestingModule, TranslationService } from '../../i18n';
import { Product } from '../../model';
import { RoutingService } from '../../routing';
import { ProductService } from '../facade';
import { ProductPageMetaResolver } from './product-page-meta.resolver';

class MockRoutingService {
  getRouterState() {
    return of({
      state: {
        params: {
          productCode: '1234',
        },
      },
    });
  }
}

const MockProduct: Product = {
  code: '1234',
  name: 'Product title',
  summary: 'Product summary',
  categories: [
    {
      code: '123',
      name: 'one two three',
    },
  ],
  images: {
    PRIMARY: {
      zoom: {
        url: 'https://storefront.com/image',
      },
    },
  },
  manufacturer: 'Canon',
};

const MockProductWithoutImages: Product = {
  code: '1234',
};

class MockProductService {
  get(_code: string) {
    return of(MockProduct);
  }
}

class MockTranslationService {
  translate(key, params: any) {
    if (!params) {
      return of(key);
    }
    if (params.title) {
      return of(key + ':' + params.title);
    }
    if (params.heading) {
      return of(key + ':' + params.heading);
    }
    if (params.description) {
      return of(key + ':' + params.description);
    }
  }
}

describe('ProductPageMetaResolver', () => {
  let service: ProductPageMetaResolver;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        ProductPageMetaResolver,
        { provide: ProductService, useClass: MockProductService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    });

    service = TestBed.inject(ProductPageMetaResolver);
    productService = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should resolve product heading', () => {
    let result: string;
    service
      .resolveHeading()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual('pageMetaResolver.product.heading:Product title');
  });

  it('should resolve product title', () => {
    let result: string;
    service
      .resolveTitle()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual(
      'pageMetaResolver.product.title:Product title | one two three | Canon'
    );
  });

  it('should resolve product description', () => {
    let result: string;
    service
      .resolveDescription()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual(
      'pageMetaResolver.product.description:Product summary'
    );
  });

  it('should resolve product image', () => {
    let result: string;
    service
      .resolveImage()
      .subscribe((value) => {
        result = value;
      })
      .unsubscribe();

    expect(result).toEqual('https://storefront.com/image');
  });

  it('should gracefully return null for product without images', () => {
    spyOn(productService, 'get').and.returnValue(of(MockProductWithoutImages));

    let result: string;
    service
      .resolveImage()
      .subscribe((value) => {
        result = value;
      })
      .unsubscribe();

    expect(result).toBeNull();
  });

  it('should resolve breadcrumbs', () => {
    let result: any[];
    service
      .resolveBreadcrumbs()
      .subscribe((value) => {
        result = value;
      })
      .unsubscribe();

    expect(result.length).toEqual(2);
  });

  it('should resolve 2nd breadcrumbs with category name', () => {
    let result: any[];
    service
      .resolveBreadcrumbs()
      .subscribe((value) => {
        result = value;
      })
      .unsubscribe();

    expect(result[1].label).toEqual('one two three');
  });

  it('should resolve robots', () => {
    let result: any[];
    service
      .resolveRobots()
      .subscribe((value) => {
        result = value;
      })
      .unsubscribe();

    expect(result).toContain(PageRobotsMeta.FOLLOW);
    expect(result).toContain(PageRobotsMeta.INDEX);
    expect(result).not.toContain(PageRobotsMeta.NOINDEX);
    expect(result).not.toContain(PageRobotsMeta.NOFOLLOW);
  });
});
