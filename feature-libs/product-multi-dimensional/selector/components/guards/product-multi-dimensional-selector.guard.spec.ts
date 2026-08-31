import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { of } from 'rxjs';
import { Product, ProductService, SemanticPathService } from '@spartacus/core';
import { ProductMultiDimensionalSelectorGuard } from './product-multi-dimensional-selector.guard';
import { vi } from 'vitest';

describe('ProductMultiDimensionalSelectorGuard', () => {
  let guard: ProductMultiDimensionalSelectorGuard;
  let productService: any;
  let semanticPathService: any;
  let router: any;

  beforeEach(() => {
    const productServiceSpy = { get: vi.fn() };
    const semanticPathServiceSpy = { transform: vi.fn() };
    const routerSpy = { createUrlTree: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        ProductMultiDimensionalSelectorGuard,
        { provide: ProductService, useValue: productServiceSpy },
        { provide: SemanticPathService, useValue: semanticPathServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(ProductMultiDimensionalSelectorGuard);
    productService = TestBed.inject(ProductService) as any;
    semanticPathService = TestBed.inject(SemanticPathService) as any;
    router = TestBed.inject(Router) as any;
  });

  describe('canActivate', () => {
    it('should return false if no product code is provided and queryParams are empty', () => {
      const route = new ActivatedRouteSnapshot();
      route.params = {};
      route.queryParams = {};

      guard.canActivate(route).subscribe((result) => {
        expect(result).toBe(false);
      });
    });

    it('should return true if no product code is provided and is in SmartEdit', () => {
      const route = new ActivatedRouteSnapshot();
      route.params = {};
      route.queryParams = { cmsTicketId: '123' };

      guard.canActivate(route).subscribe((result) => {
        expect(result).toBe(true);
      });
    });

    it('should return true if product is purchasable', () => {
      const route = new ActivatedRouteSnapshot();
      route.params = { productCode: 'testProductCode' };
      const product: Product = { code: 'testProductCode', purchasable: true };
      productService.get.mockReturnValue(of(product));

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
      productService.get.mockReturnValue(of(product));
      const urlTree = new UrlTree();
      router.createUrlTree.mockReturnValue(urlTree);

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
      productService.get.mockReturnValue(of(product));

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
      productService.get.mockReturnValue(of(variantProduct));
      const urlTree = new UrlTree();
      router.createUrlTree.mockReturnValue(urlTree);
      semanticPathService.transform.mockReturnValue([
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
      productService.get.mockReturnValue(of(variantProduct));
      const urlTree = new UrlTree();
      router.createUrlTree.mockReturnValue(urlTree);
      semanticPathService.transform.mockReturnValue([
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
