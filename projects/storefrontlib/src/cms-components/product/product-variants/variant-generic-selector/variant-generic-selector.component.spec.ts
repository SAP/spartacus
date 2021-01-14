import { VariantGenericSelectorComponent } from '@spartacus/storefront';
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
        variantOptionQualifiers: [],
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

// const mockProduct: Product = {
//   code: 'code1',
//   name: 'Test1',
//   baseProduct: 'baseProduct1',
//   categories: [{ code: 'test1' }, { code: 'test2' }, { code: 'test3' }],
//   variantMatrix: [
//     {
//       elements: [
//         {
//           isLeaf: false,
//           variantOption: { code: 'code1', variantOptionQualifiers: [] },
//           parentVariantCategory: { name: 'Fit' },
//           variantValueCategory: { name: 'W' },
//           elements: [
//             {
//               elements: [],
//               isLeaf: true,
//               parentVariantCategory: { name: 'Size' },
//               variantOption: { code: 'code1', variantOptionQualifiers: [] },
//               variantValueCategory: { name: '7' },
//             },
//             {
//               elements: [],
//               isLeaf: true,
//               parentVariantCategory: { name: 'Size' },
//               variantOption: { code: 'code2', variantOptionQualifiers: [] },
//               variantValueCategory: { name: '8' },
//             },
//             {
//               elements: [],
//               isLeaf: true,
//               parentVariantCategory: { name: 'Size' },
//               variantOption: { code: 'code3', variantOptionQualifiers: [] },
//               variantValueCategory: { name: '9' },
//             },
//           ],
//         },
//         {
//           isLeaf: false,
//           variantOption: { code: 'code4', variantOptionQualifiers: [] },
//           parentVariantCategory: { name: 'Fit' },
//           variantValueCategory: { name: 'M' },
//           elements: [
//             {
//               elements: [],
//               isLeaf: true,
//               parentVariantCategory: { name: 'Size' },
//               variantOption: { code: 'code4', variantOptionQualifiers: [] },
//               variantValueCategory: { name: '10' },
//             },
//             {
//               elements: [],
//               isLeaf: true,
//               parentVariantCategory: { name: 'Size' },
//               variantOption: { code: 'code5', variantOptionQualifiers: [] },
//               variantValueCategory: { name: '11' },
//             },
//             {
//               elements: [],
//               isLeaf: true,
//               parentVariantCategory: { name: 'Size' },
//               variantOption: { code: 'code6', variantOptionQualifiers: [] },
//               variantValueCategory: { name: '12' },
//             },
//           ],
//         },
//       ],
//       isLeaf: false,
//       parentVariantCategory: { name: 'Color', hasImage: true },
//       variantOption: { code: 'code1', variantOptionQualifiers: [] },
//       variantValueCategory: { name: 'Black' },
//     },
//     {
//       elements: [
//         {
//           isLeaf: false,
//           variantOption: { code: 'code7', variantOptionQualifiers: [] },
//           parentVariantCategory: { name: 'Fit' },
//           variantValueCategory: { name: 'W' },
//           elements: [
//             {
//               elements: [],
//               isLeaf: true,
//               parentVariantCategory: { name: 'Size' },
//               variantOption: { code: 'code7', variantOptionQualifiers: [] },
//               variantValueCategory: { name: '9' },
//             },
//           ],
//         },
//         {
//           isLeaf: false,
//           variantOption: { code: 'code8', variantOptionQualifiers: [] },
//           parentVariantCategory: { name: 'Fit' },
//           variantValueCategory: { name: 'M' },
//           elements: [
//             {
//               elements: [],
//               isLeaf: true,
//               parentVariantCategory: { name: 'Size' },
//               variantOption: { code: 'code8', variantOptionQualifiers: [] },
//               variantValueCategory: { name: '12' },
//             },
//           ],
//         },
//       ],
//       isLeaf: false,
//       parentVariantCategory: { name: 'Color' },
//       variantOption: { code: 'code7', variantOptionQualifiers: [] },
//       variantValueCategory: { name: 'Yellow' },
//     },
//   ],
// };

class MockRoutingService implements Partial<RoutingService> {
  go(
    _commands: any[] | UrlCommands,
    _query?: object,
    _extras?: NavigationExtras
  ): void {}
}

class MockProductService implements Partial<ProductService> {
  get(code: string): Observable<Product> {
    return of({ ...mockProduct, code });
  }
}

// TODO: remove fdescribe when work is done for this component
fdescribe('VariantGenericSelectorComponent', () => {
  let component: VariantGenericSelectorComponent;
  let fixture: ComponentFixture<VariantGenericSelectorComponent>;
  let productService: ProductService;
  let routingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VariantGenericSelectorComponent],
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
    fixture = TestBed.createComponent(VariantGenericSelectorComponent);
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
    expect(productService.get).toHaveBeenCalledWith('code_1', 'variants');
  });

  it('should process product variant matrix and set variants for display', () => {
    component.changeVariant('code_1');
    fixture.detectChanges();
    console.log('component.variants', component.variants);
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
    console.log('selectElements', selectElements);

    const selectEl = selectElements[0];
    const selectedOptionValue = selectEl.options[1].value;

    console.log('selectedOptionValue', selectedOptionValue);
    console.log('mockProduct.variantMatrix', mockProduct.variantMatrix);
    console.log('component.product.code', component.product.code);

    selectEl.value = selectedOptionValue;
    selectEl.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'product',
      params: { ...mockProduct, code: selectedOptionValue },
    });
  });

  describe('when variant array', () => {
    it('contain hasImage flag it should return true', () => {
      console.log('1', component.variants[0]);
      expect(component.variantHasImages(component.variants[0])).toEqual(true);
    });

    it('does not contain hasImage flag it should return false', () => {
      console.log('2', component.variants[1]);
      expect(component.variantHasImages(component.variants[1])).toEqual(false);
    });
  });
});
