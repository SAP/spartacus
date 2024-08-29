import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { of } from 'rxjs';
import { Product, ProductService, SemanticPathService } from '@spartacus/core';
import { ProductMultiDimensionalSelectorGuard } from './product-multi-dimensional-selector.guard';

describe('ProductMultiDimensionalSelectorGuard', () => {
  let guard: ProductMultiDimensionalSelectorGuard;
  let productService: jasmine.SpyObj<ProductService>;
  let semanticPathService: jasmine.SpyObj<SemanticPathService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['get']);
    const semanticPathServiceSpy = jasmine.createSpyObj('SemanticPathService', [
      'transform',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        ProductMultiDimensionalSelectorGuard,
        { provide: ProductService, useValue: productServiceSpy },
        { provide: SemanticPathService, useValue: semanticPathServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(ProductMultiDimensionalSelectorGuard);
    productService = TestBed.inject(
      ProductService
    ) as jasmine.SpyObj<ProductService>;
    semanticPathService = TestBed.inject(
      SemanticPathService
    ) as jasmine.SpyObj<SemanticPathService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  describe('canActivate', () => {
    it('should return false if no product code is provided', () => {
      const route = new ActivatedRouteSnapshot();
      route.params = {};

      guard.canActivate(route).subscribe((result) => {
        expect(result).toBe(false);
      });
    });

    it('should return true if product is purchasable', () => {
      const route = new ActivatedRouteSnapshot();
      route.params = { productCode: 'testProductCode' };
      const product: Product = { code: 'testProductCode', purchasable: true };
      productService.get.and.returnValue(of(product));

      guard.canActivate(route).subscribe((result) => {
        expect(result).toBe(true);
      });
    });

    it('should return UrlTree if product is not purchasable and has variant options', () => {
      const route = new ActivatedRouteSnapshot();
      route.params = { productCode: 'testProductCode' };
      const product: Product = {
        code: 'testProductCode',
        purchasable: false,
        variantOptions: [{ code: 'variantCode', stock: { stockLevel: 10 } }],
      };
      productService.get.and.returnValue(of(product));
      const urlTree = new UrlTree();
      router.createUrlTree.and.returnValue(urlTree);

      guard.canActivate(route).subscribe((result) => {
        expect(result).toBe(urlTree);
      });
    });

    it('should return false if product is not purchasable and has no variant options', () => {
      const route = new ActivatedRouteSnapshot();
      route.params = { productCode: 'testProductCode' };
      const product: Product = {
        code: 'testProductCode',
        purchasable: false,
        variantOptions: [],
      };
      productService.get.and.returnValue(of(product));

      guard.canActivate(route).subscribe((result) => {
        expect(result).toBe(false);
      });
    });
  });

  describe('findValidProductCodeAndReturnUrlTree', () => {
    it('should return UrlTree for a valid variant product', () => {
      const product: Product = {
        code: 'testProductCode',
        variantOptions: [{ code: 'variantCode', stock: { stockLevel: 10 } }],
      };
      const variantProduct: Product = { code: 'variantCode' };
      productService.get.and.returnValue(of(variantProduct));
      const urlTree = new UrlTree();
      router.createUrlTree.and.returnValue(urlTree);
      semanticPathService.transform.and.returnValue([
        '/product',
        'variantCode',
      ]);

      guard['findValidProductCodeAndReturnUrlTree'](product).subscribe(
        (result) => {
          expect(result).toBe(urlTree);
          expect(router.createUrlTree).toHaveBeenCalledWith([
            '/product',
            'variantCode',
          ]);
        }
      );
    });

    it('should return UrlTree if no valid variant product is found but variants exist', () => {
      const product: Product = {
        code: 'testProductCode',
        variantOptions: [{ code: 'variantCode', stock: { stockLevel: 0 } }],
      };
      const variantProduct: Product = { code: 'variantCode' };
      productService.get.and.returnValue(of(variantProduct));
      const urlTree = new UrlTree();
      router.createUrlTree.and.returnValue(urlTree);
      semanticPathService.transform.and.returnValue([
        '/product',
        'variantCode',
      ]);

      guard['findValidProductCodeAndReturnUrlTree'](product).subscribe(
        (result) => {
          expect(result).toBe(urlTree);
          expect(router.createUrlTree).toHaveBeenCalledWith([
            '/product',
            'variantCode',
          ]);
        }
      );
    });

    it('should return false if no variant options are available', () => {
      const product: Product = {
        code: 'testProductCode',
        variantOptions: [],
      };

      guard['findValidProductCodeAndReturnUrlTree'](product).subscribe(
        (result) => {
          expect(result).toBe(false);
        }
      );
    });
  });
});
