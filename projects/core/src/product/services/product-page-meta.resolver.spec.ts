import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import {
  BasePageMetaResolver,
  CanonicalUrlOptions,
  PageRobotsMeta,
} from '../../cms';
import { PageLinkService } from '../../cms/page/routing/page-link.service';
import { I18nTestingModule, TranslationService } from '../../i18n';
import { Product } from '../../model';
import { RoutingService } from '../../routing';
import { ProductService } from '../facade';
import { ProductPageMetaResolver } from './product-page-meta.resolver';

class MockRoutingService implements Partial<RoutingService> {
  getRouterState(): Observable<any> {
    return of({
      state: {
        params: {
          productCode: '1234',
        },
      },
    });
  }
  getFullUrl(): string {
    return '';
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

const MockProductVariant: Product = {
  baseProduct: 'base_1234',
  code: 'variant_1234',
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
  translate(key: string, params: any) {
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

class MockBasePageMetaResolver {
  resolveRobots() {
    return of([PageRobotsMeta.FOLLOW, PageRobotsMeta.INDEX]);
  }
  resolveCanonicalUrl(): Observable<string> {
    return of();
  }
}

class MockPageLinkService implements Partial<PageLinkService> {
  getCanonicalUrl(_options?: CanonicalUrlOptions, url?: string): string {
    return url ?? '';
  }
}

describe('ProductPageMetaResolver', () => {
  let service: ProductPageMetaResolver;
  let productService: ProductService;
  let routingService: RoutingService;
  let pageLinkService: PageLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        ProductPageMetaResolver,
        { provide: ProductService, useClass: MockProductService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: TranslationService, useClass: MockTranslationService },
        {
          provide: BasePageMetaResolver,
          useClass: MockBasePageMetaResolver,
        },
        {
          provide: PageLinkService,
          useClass: MockPageLinkService,
        },
      ],
    });

    service = TestBed.inject(ProductPageMetaResolver);
    productService = TestBed.inject(ProductService);
    routingService = TestBed.inject(RoutingService);
    pageLinkService = TestBed.inject(PageLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should resolve product heading', () => {
    let result!: string;
    service
      .resolveHeading()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual('pageMetaResolver.product.heading:Product title');
  });

  it('should resolve product title', () => {
    let result!: string;
    service
      .resolveTitle()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual(
      'pageMetaResolver.product.title:Product title | one two three | Canon'
    );
  });

  it('should resolve product description', () => {
    let result!: string;
    service
      .resolveDescription()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual(
      'pageMetaResolver.product.description:Product summary'
    );
  });

  it('should resolve product image', () => {
    let result!: string;
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

    let result!: string;
    service
      .resolveImage()
      .subscribe((value) => {
        result = value;
      })
      .unsubscribe();

    expect(result).toBeNull();
  });

  it('should resolve breadcrumbs', () => {
    let result!: any[];
    service
      .resolveBreadcrumbs()
      .subscribe((value) => {
        result = value;
      })
      .unsubscribe();

    expect(result.length).toEqual(2);
  });

  it('should resolve 2nd breadcrumbs with category name', () => {
    let result!: any[];
    service
      .resolveBreadcrumbs()
      .subscribe((value) => {
        result = value;
      })
      .unsubscribe();

    expect(result[1].label).toEqual('one two three');
  });

  it('should resolve robots', () => {
    let result!: any[];
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

  it('should resolve canonical url from the PageLinkService.getCanonicalUrl()', async () => {
    spyOn(routingService, 'getFullUrl').and.returnValue(
      'https://store.com/product/123'
    );

    spyOn(pageLinkService, 'getCanonicalUrl').and.callThrough();
    service.resolveCanonicalUrl().subscribe().unsubscribe();
    expect(pageLinkService.getCanonicalUrl).toHaveBeenCalledWith(
      {},
      'https://store.com/product/123'
    );
  });

  it('should resolve canonical url for product variant', async () => {
    spyOn(productService, 'get').and.returnValues(
      of(MockProductVariant),
      of({
        code: 'base_1234',
      })
    );
    spyOn(routingService, 'getFullUrl').and.returnValue(
      'https://store.com/product/base_1234'
    );

    spyOn(pageLinkService, 'getCanonicalUrl').and.callThrough();
    service.resolveCanonicalUrl().subscribe().unsubscribe();

    expect(routingService.getFullUrl).toHaveBeenCalledWith({
      cxRoute: 'product',
      params: { code: 'base_1234' },
    });
    expect(pageLinkService.getCanonicalUrl).toHaveBeenCalledWith(
      {},
      'https://store.com/product/base_1234'
    );
  });

  it('should resolve canonical url for multi-leveled variant', async () => {
    spyOn(productService, 'get').and.returnValues(
      of(MockProductVariant),
      of({
        code: 'base_1234',
        baseProduct: 'super_base_1234',
      }),
      of({
        code: 'super_base_1234',
      })
    );
    spyOn(routingService, 'getFullUrl').and.returnValue(
      'https://store.com/product/super_base_1234'
    );

    spyOn(pageLinkService, 'getCanonicalUrl').and.callThrough();
    service.resolveCanonicalUrl().subscribe().unsubscribe();

    expect(routingService.getFullUrl).toHaveBeenCalledWith({
      cxRoute: 'product',
      params: { code: 'super_base_1234' },
    });
    expect(pageLinkService.getCanonicalUrl).toHaveBeenCalledWith(
      {},
      'https://store.com/product/super_base_1234'
    );
  });

  it('should not resolve canonical url for undefined product', async () => {
    spyOn(productService, 'get').and.returnValues(of(undefined));
    spyOn(routingService, 'getFullUrl').and.returnValue(
      'https://store.com/product/123'
    );

    spyOn(pageLinkService, 'getCanonicalUrl').and.callThrough();
    service.resolveCanonicalUrl().subscribe().unsubscribe();
    expect(pageLinkService.getCanonicalUrl).not.toHaveBeenCalled();
  });
});
