import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductMultiDimensionalSelectorComponent } from './product-multi-dimensional-selector.component';
import {
  ProductMultiDimensionalSelectorService,
  VariantCategoryGroup,
  VariantCategoryOption,
} from '@spartacus/product-multi-dimensional/selector/core';
import {
  I18nTestingModule,
  Product,
  ProductService,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { ActivatedRoute } from '@angular/router';
import { CurrentProductService } from '@spartacus/storefront';

describe('ProductMultiDimensionalSelectorComponent', () => {
  let component: ProductMultiDimensionalSelectorComponent;
  let fixture: ComponentFixture<ProductMultiDimensionalSelectorComponent>;

  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockRoutingService: jasmine.SpyObj<RoutingService>;
  let mockMultiDimensionalService: jasmine.SpyObj<ProductMultiDimensionalSelectorService>;
  let mockTranslationService: jasmine.SpyObj<TranslationService>;
  let mockCurrentProductService: jasmine.SpyObj<CurrentProductService>;

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', ['get']);
    mockRoutingService = jasmine.createSpyObj('RoutingService', ['go']);
    mockMultiDimensionalService = jasmine.createSpyObj(
      'ProductMultiDimensionalSelectorService',
      ['getVariants']
    );
    mockTranslationService = jasmine.createSpyObj('TranslationService', [
      'translate',
    ]);
    mockCurrentProductService = jasmine.createSpyObj('CurrentProductService', [
      'getProduct',
    ]);

    mockCurrentProductService.getProduct.and.returnValue(
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
    }).compileComponents();

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
      mockCurrentProductService.getProduct.and.returnValue(of(product));
      mockMultiDimensionalService.getVariants.and.returnValue(variants);

      fixture.detectChanges();

      expect(component.categories).toEqual(variants);
      expect(component.selectedProductCode).toBe(product.code);
    });
  });

  describe('changeVariant', () => {
    it('should call routingService.go with the new product', () => {
      const newProduct = { code: 'newProductCode' } as Product;
      mockProductService.get.and.returnValue(of(newProduct));

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
      spyOn(component, 'getSelectedValue').and.returnValue('selectedValue');

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
      spyOn(component, 'getSelectedValue').and.returnValue('');

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
      expect(result).toBeTrue();
    });

    it('should return false if the code does not match selectedProductCode', () => {
      component.selectedProductCode = 'option1';
      const result = component['isSelected']('option2');
      expect(result).toBeFalse();
    });
  });

  describe('onAriaLabel', () => {
    it('should return the aria label for selected option', () => {
      spyOn(component as any, 'isSelected').and.returnValue(true);
      mockTranslationService.translate.and.returnValue(of('Selected'));

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
      spyOn(component as any, 'isSelected').and.returnValue(false);
      mockTranslationService.translate.and.returnValue(of('Variant'));

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
