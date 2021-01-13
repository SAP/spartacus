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

const mockProduct: Product = {
  code: 'code1',
  name: 'Test1',
  baseProduct: 'baseProduct1',
  categories: [{ code: 'test1' }, { code: 'test2' }, { code: 'test3' }],
  variantMatrix: [
    {
      elements: [
        {
          isLeaf: false,
          variantOption: { code: 'code1' },
          parentVariantCategory: { name: 'Fit' },
          variantValueCategory: { name: 'W' },
          elements: [
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: { name: 'Size' },
              variantOption: { code: 'code1' },
              variantValueCategory: { name: '7' },
            },
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: { name: 'Size' },
              variantOption: { code: 'code11' },
              variantValueCategory: { name: '8' },
            },
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: { name: 'Size' },
              variantOption: { code: 'code12' },
              variantValueCategory: { name: '9' },
            },
          ],
        },
        {
          isLeaf: false,
          variantOption: { code: '26038000_1' },
          parentVariantCategory: { name: 'Fit' },
          variantValueCategory: { name: 'M' },
          elements: [
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: { name: 'Size' },
              variantOption: { code: 'code122' },
              variantValueCategory: { name: '10' },
            },
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: { name: 'Size' },
              variantOption: { code: 'code123' },
              variantValueCategory: { name: '11' },
            },
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: { name: 'Size' },
              variantOption: { code: 'code124' },
              variantValueCategory: { name: '12' },
            },
          ],
        },
      ],
      isLeaf: false,
      parentVariantCategory: { name: 'Color' },
      variantOption: { code: 'code1' },
      variantValueCategory: { name: 'Black' },
    },
    {
      elements: [
        {
          isLeaf: false,
          variantOption: { code: 'code3' },
          parentVariantCategory: { name: 'Fit' },
          variantValueCategory: { name: 'W' },
          elements: [
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: { name: 'Size' },
              variantOption: { code: 'code3' },
              variantValueCategory: { name: '9' },
            },
          ],
        },
        {
          isLeaf: false,
          variantOption: { code: 'code4' },
          parentVariantCategory: { name: 'Fit' },
          variantValueCategory: { name: 'M' },
          elements: [
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: { name: 'Size' },
              variantOption: { code: 'code4' },
              variantValueCategory: { name: '12' },
            },
          ],
        },
      ],
      isLeaf: false,
      parentVariantCategory: { name: 'Color' },
      variantOption: { code: 'code3' },
      variantValueCategory: { name: 'Yellow' },
    },
  ],
};

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
        imports: [RouterTestingModule, I18nTestingModule],
        providers: [
          { provide: RoutingService, useClass: MockRoutingService },
          {
            provide: ProductService,
            useClass: MockProductService,
          },
        ],
      }).compileComponents();

      productService = TestBed.inject(ProductService);
      routingService = TestBed.inject(RoutingService);
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

    component.changeVariant('code1');

    expect(component.changeVariant).toHaveBeenCalled();
    expect(productService.get).toHaveBeenCalledWith('code1', 'variants');
  });

  it('should process product variant matrix and set variants for display', () => {
    component.changeVariant('code1');
    fixture.detectChanges();

    expect(component.variants.length).toEqual(mockProduct.categories.length);
  });

  it('should render proper count of select based on provided variantsMatrix in product', () => {
    const selectElements = fixture.debugElement.nativeElement.querySelectorAll(
      '.variant-selector select'
    );

    expect(selectElements.length).toEqual(mockProduct.categories.length);
  });

  it('should go to PDP when new variant selected', () => {
    spyOn(routingService, 'go').and.callThrough();
    const selectElements = fixture.debugElement.nativeElement.querySelectorAll(
      '.variant-selector select'
    );
    const selectEl = selectElements[0];
    const selectedOptionValue = selectEl.options[1].value;

    selectEl.value = selectedOptionValue;
    selectEl.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.product.code).toEqual(
      mockProduct.variantMatrix[1].variantOption.code
    );
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'product',
      params: { ...mockProduct, code: selectedOptionValue },
    });
  });
});
