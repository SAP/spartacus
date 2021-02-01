import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  Product,
  ProductService,
  RoutingService,
  UrlCommands,
} from '@spartacus/core';
import { NavigationExtras } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MediaModule } from 'projects/storefrontlib/src/shared';
import { VariantsMultiDimensionalSelectorComponent } from './variants-multi-dimensional-selector.component';
import { ProductScope } from '@spartacus/product/multi-d/core';

const mockProduct: Product = {
  baseProduct: 'baseProduct1',
  categories: [{ code: 'test1' }, { code: 'test2' }, { code: 'test3' }],
  code: 'code_1',
  multidimensional: true,
  name: 'Test1',
  purchasable: true,
  variantMatrix: [
    {
      elements: [
        {
          elements: [
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_1',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7',
              },
            },
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_2',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7.5',
              },
            },
          ],
          isLeaf: false,
          parentVariantCategory: {
            hasImage: false,
            name: 'Fit',
          },
          variantOption: {
            code: 'code_1',
            variantOptionQualifiers: [],
          },
          variantValueCategory: {
            name: 'M',
          },
        },
        {
          elements: [
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_3',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7',
              },
            },
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_4',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7.5',
              },
            },
          ],
          isLeaf: false,
          parentVariantCategory: {
            hasImage: false,
            name: 'Fit',
          },
          variantOption: {
            code: 'code_3',
            variantOptionQualifiers: [],
          },
          variantValueCategory: {
            name: 'W',
          },
        },
      ],
      isLeaf: false,
      parentVariantCategory: {
        hasImage: true,
        name: 'Color',
      },
      variantOption: {
        code: 'code_1',
        variantOptionQualifiers: [{ image: {} }],
      },
      variantValueCategory: {
        name: 'Black',
      },
    },
    {
      elements: [
        {
          elements: [
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_5',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7',
              },
            },
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_6',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7.5',
              },
            },
          ],
          isLeaf: false,
          parentVariantCategory: {
            hasImage: false,
            name: 'Fit',
          },
          variantOption: {
            code: 'code_5',
            variantOptionQualifiers: [],
          },
          variantValueCategory: {
            name: 'M',
          },
        },
        {
          elements: [
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_7',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7',
              },
            },
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_8',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7.5',
              },
            },
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_9',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '12.5',
              },
            },
          ],
          isLeaf: false,
          parentVariantCategory: {
            hasImage: false,
            name: 'Fit',
          },
          variantOption: {
            code: 'code_7',
            variantOptionQualifiers: [],
          },
          variantValueCategory: {
            name: 'W',
          },
        },
      ],
      isLeaf: false,
      parentVariantCategory: {
        hasImage: false,
        name: 'Color',
      },
      variantOption: {
        code: 'code_5',
        variantOptionQualifiers: [],
      },
      variantValueCategory: {
        name: 'Brown',
      },
    },
  ],
};
function prepareMockProductBasedOnCode(code: string) {
  const newProduct = JSON.parse(JSON.stringify(mockProduct));
  newProduct.code = code;
  newProduct.variantMatrix[0].variantOption.code = code;
  return newProduct;
}
class MockRoutingService implements Partial<RoutingService> {
  go(
    _commands: any[] | UrlCommands,
    _query?: object,
    _extras?: NavigationExtras
  ): void {}
}
class MockProductService implements Partial<ProductService> {
  get(code: string): Observable<Product> {
    return of(prepareMockProductBasedOnCode(code));
  }
}

describe('VariantMultiDimensionalSelectorComponent', () => {
  let component: VariantsMultiDimensionalSelectorComponent;
  let fixture: ComponentFixture<VariantsMultiDimensionalSelectorComponent>;
  let productService: ProductService;
  let routingService: RoutingService;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VariantsMultiDimensionalSelectorComponent],
        imports: [RouterTestingModule, I18nTestingModule, MediaModule],
        providers: [
          { provide: RoutingService, useClass: MockRoutingService },
          {
            provide: ProductService,
            useClass: MockProductService,
          },
        ],
      }).compileComponents();
      routingService = TestBed.inject(RoutingService);
      productService = TestBed.inject(ProductService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      VariantsMultiDimensionalSelectorComponent
    );
    component = fixture.componentInstance;
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get product based on passed product code', () => {
    spyOn(productService, 'get').and.callThrough();
    spyOn(component, 'changeVariant').and.callThrough();
    component.changeVariant('code_1');
    expect(component.changeVariant).toHaveBeenCalled();
    expect(productService.get).toHaveBeenCalledWith(
      'code_1',
      ProductScope.VARIANTS_MULTIDIMENSIONAL
    );
  });

  it('should process product variant matrix and set variants for display', () => {
    component.changeVariant('code_1');
    fixture.detectChanges();
    expect(component.variants.length).toEqual(mockProduct.categories.length);
  });

  it('should render proper count of media variant based on provided variantsMatrix in product', () => {
    const selectElements = fixture.debugElement.nativeElement.querySelectorAll(
      '.variant-generic-selector .image-variant-container'
    );
    expect(selectElements.length).toEqual(1);
  });

  it('should render proper count of select based on provided variantsMatrix in product', () => {
    const selectElements = fixture.debugElement.nativeElement.querySelectorAll(
      '.select-variant-container select'
    );
    expect(selectElements.length).toEqual(2);
  });

  it('should go to PDP when new variant selected', () => {
    spyOn(routingService, 'go').and.callThrough();
    const selectElements = fixture.debugElement.nativeElement.querySelectorAll(
      '.select-variant-container select'
    );
    const selectEl = selectElements[0];
    const selectedOptionValue = selectEl.options[1].value;
    selectEl.value = selectedOptionValue;
    selectEl.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'product',
      params: prepareMockProductBasedOnCode(selectedOptionValue),
    });
  });

  describe('when variant array', () => {
    it('contain hasImage flag it should return true', () => {
      expect(component.variantHasImages(component.variants[0])).toEqual(true);
    });
    it('does not contain hasImage flag it should return false', () => {
      expect(component.variantHasImages(component.variants[1])).toEqual(false);
    });
  });
});
