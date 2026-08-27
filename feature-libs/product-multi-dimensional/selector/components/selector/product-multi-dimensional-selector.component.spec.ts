import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  Product,
  ProductService,
  RoutingService,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import {
  ProductMultiDimensionalSelectorService,
  VariantCategoryGroup,
  VariantCategoryOption,
} from '@spartacus/product-multi-dimensional/selector/core';
import { CurrentProductService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { ProductMultiDimensionalSelectorComponent } from './product-multi-dimensional-selector.component';

describe('ProductMultiDimensionalSelectorComponent', () => {
  let component: ProductMultiDimensionalSelectorComponent;
  let fixture: ComponentFixture<ProductMultiDimensionalSelectorComponent>;

  let mockProductService: any;
  let mockRoutingService: any;
  let mockMultiDimensionalService: any;
  let mockTranslationService: any;
  let mockCurrentProductService: any;

  beforeEach(async () => {
    mockProductService = { get: vi.fn() };
    mockRoutingService = { go: vi.fn() };
    mockMultiDimensionalService = { getVariants: vi.fn() };
    mockTranslationService = { translate: vi.fn() };
    mockTranslationService.translate.mockReturnValue(of('test translation'));

    mockCurrentProductService = { getProduct: vi.fn() };
    mockCurrentProductService.getProduct.mockReturnValue(
      of({
        code: 'productCode',
        multidimensional: true,
      } as Product)
    );

    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, ProductMultiDimensionalSelectorComponent],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: RoutingService, useValue: mockRoutingService },
        {
          provide: ProductMultiDimensionalSelectorService,
          useValue: mockMultiDimensionalService,
        },
        { provide: TranslationService, useValue: mockTranslationService },
        { provide: CurrentProductService, useValue: mockCurrentProductService },
        { provide: ActivatedRoute, useValue: {} },
      ],
    })
      .overrideComponent(ProductMultiDimensionalSelectorComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ProductMultiDimensionalSelectorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Init', () => {
    it('should initialize categories and selectedProductCode from product$', () => {
      const product = {
        code: 'productCode',
        multidimensional: true,
      } as Product;
      const variants: VariantCategoryGroup[] = [
        { name: 'category1', hasImages: false, variantOptions: [] },
      ];
      mockCurrentProductService.getProduct.mockReturnValue(of(product));
      mockMultiDimensionalService.getVariants.mockReturnValue(variants);

      fixture.detectChanges();

      expect(component.categories).toEqual(variants);
      expect(component.selectedProductCode).toBe(product.code);
    });
  });

  describe('changeVariant', () => {
    it('should call routingService.go with the new product', () => {
      const newProduct = { code: 'newProductCode' } as Product;
      mockProductService.get.mockReturnValue(of(newProduct));

      component.changeVariant('newProductCode');

      expect(mockRoutingService.go).toHaveBeenCalledWith({
        cxRoute: 'product',
        params: newProduct,
      });
    });

    it('should not call routingService.go if code is undefined', () => {
      component.changeVariant(undefined);
      expect(mockRoutingService.go).not.toHaveBeenCalled();
    });
  });

  describe('getSelectedValue', () => {
    it('should return the selected option value from the correct category', () => {
      component.categories = [
        {
          name: 'category1',
          hasImages: false,
          variantOptions: [{ code: 'option1', value: 'value1' }],
        },
      ];
      component.selectedProductCode = 'option1';

      const result = component.getSelectedValue('category1');
      expect(result).toBe('value1');
    });

    it('should return an empty string if the selected option is not found', () => {
      component.categories = [
        {
          name: 'category1',
          hasImages: false,
          variantOptions: [{ code: 'option2', value: 'value2' }],
        },
      ];
      component.selectedProductCode = 'option1';

      const result = component.getSelectedValue('category1');
      expect(result).toBe('');
    });

    it('should return an empty string if the category is not found', () => {
      component.categories = [];
      const result = component.getSelectedValue('category1');
      expect(result).toBe('');
    });
  });

  describe('getCategoryName', () => {
    it('should return category name with selected value if hasImages is true', () => {
      vi.spyOn(component, 'getSelectedValue').mockReturnValue('selectedValue');

      const category: VariantCategoryGroup = {
        name: 'CategoryName',
        hasImages: true,
        variantOptions: [],
      };
      const result = component.getCategoryName(category);

      expect(result).toBe('CategoryName: selectedValue');
    });

    it('should return only category name if hasImages is false', () => {
      const category: VariantCategoryGroup = {
        name: 'CategoryName',
        hasImages: false,
        variantOptions: [],
      };
      const result = component.getCategoryName(category);

      expect(result).toBe('CategoryName: ');
    });

    it('should return only category name if selected value is empty', () => {
      vi.spyOn(component, 'getSelectedValue').mockReturnValue('');

      const category: VariantCategoryGroup = {
        name: 'CategoryName',
        hasImages: true,
        variantOptions: [],
      };
      const result = component.getCategoryName(category);

      expect(result).toBe('CategoryName: ');
    });
  });

  describe('isSelected', () => {
    it('should return true if the code matches selectedProductCode', () => {
      component.selectedProductCode = 'option1';
      const result = component['isSelected']('option1');
      expect(result).toBe(true);
    });

    it('should return false if the code does not match selectedProductCode', () => {
      component.selectedProductCode = 'option1';
      const result = component['isSelected']('option2');
      expect(result).toBe(false);
    });
  });

  describe('onAriaLabel', () => {
    it('should return the aria label for selected option', () => {
      vi.spyOn(component as any, 'isSelected').mockReturnValue(true);
      mockTranslationService.translate.mockReturnValue(of('Selected'));

      const option = {
        code: 'option1',
        value: 'Value1',
      } as VariantCategoryOption;
      const result$ = component.onAriaLabel(option, 'category1');

      result$.subscribe((result) => {
        expect(result).toBe('Selected, Value1 category1');
      });
    });

    it('should return the aria label for unselected option', () => {
      vi.spyOn(component as any, 'isSelected').mockReturnValue(false);
      mockTranslationService.translate.mockReturnValue(of('Variant'));

      const option = {
        code: 'option1',
        value: 'Value1',
      } as VariantCategoryOption;
      const result$ = component.onAriaLabel(option, 'category1');

      result$.subscribe((result) => {
        expect(result).toBe('Variant');
      });
    });
  });
});
