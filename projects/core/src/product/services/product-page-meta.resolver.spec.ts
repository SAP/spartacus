import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PageMeta } from '../../cms';
import { I18nTestingModule, TranslationService } from '../../i18n';
import { RoutingService } from '../../routing';
import { ProductService } from '../facade';
import { ProductPageMetaResolver } from './product-page-meta.resolver';
import { FeatureConfigService } from '@spartacus/core';

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

class MockProductService {
  get(code: string) {
    return of(<any>{
      code: code,
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
    });
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

class MockFeatureConfigService {
  isLevel = () => true;
}

describe('ProductPageMetaResolver', () => {
  let service: ProductPageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        ProductPageMetaResolver,
        { provide: ProductService, useClass: MockProductService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: TranslationService, useClass: MockTranslationService },
        {
          provide: FeatureConfigService,
          useClass: MockFeatureConfigService,
        },
      ],
    });

    service = TestBed.inject(ProductPageMetaResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('resolvers', () => {
    it('should return product heading for resolveHeading()', () => {
      let result: string;
      service
        .resolveHeading()
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual('pageMetaResolver.product.heading:Product title');
    });

    it('should return product title for resolveTitle()', () => {
      let result: string;
      service
        .resolveTitle()
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(
        'pageMetaResolver.product.title:Product title | one two three | Canon'
      );
    });

    it('should return product description for resolveDescription()', () => {
      let result: string;
      service
        .resolveDescription()
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(
        'pageMetaResolver.product.description:Product summary'
      );
    });

    it('should resolve product image', () => {
      let result: string;
      service
        .resolveImage()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      expect(result).toEqual('https://storefront.com/image');
    });

    it('should resolve 2 breadcrumbs', () => {
      let result: any[];
      service
        .resolveBreadcrumbs()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      expect(result.length).toEqual(2);
    });

    it('should resolve 2nd breadcrumbs with category name', () => {
      let result: any[];
      service
        .resolveBreadcrumbs()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      expect(result[1].label).toEqual('one two three');
    });
  });

  describe('deprecated resolve()', () => {
    it('should resolve product page heading', () => {
      let result: PageMeta;
      service
        .resolve()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();
      expect(result.heading).toEqual(
        'pageMetaResolver.product.heading:Product title'
      );
    });

    it('should resolve product page title', () => {
      let result: PageMeta;
      service
        .resolve()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();
      expect(result.title).toEqual(
        'pageMetaResolver.product.title:Product title | one two three | Canon'
      );
    });

    it('should resolve product description', () => {
      let result: PageMeta;
      service
        .resolve()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      expect(result.description).toEqual(
        'pageMetaResolver.product.description:Product summary'
      );
    });

    it('should resolve product image', () => {
      let result: PageMeta;
      service
        .resolve()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      expect(result.image).toEqual('https://storefront.com/image');
    });

    it('should resolve 2 breadcrumbs', () => {
      let result: PageMeta;
      service
        .resolve()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      expect(result.breadcrumbs.length).toEqual(2);
    });

    it('should resolve 2nd breadcrumbs with category name', () => {
      let result: PageMeta;
      service
        .resolve()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      expect(result.breadcrumbs[1].label).toEqual('one two three');
    });
  });
});
