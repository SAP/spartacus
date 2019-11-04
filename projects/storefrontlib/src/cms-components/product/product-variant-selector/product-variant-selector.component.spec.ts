import {Pipe, PipeTransform, Type} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {
  I18nTestingModule,
  OccConfig,
  Product,
  RoutingService,
  UrlCommandRoute,
  UrlCommands,
  VariantType,
} from '@spartacus/core';
import {CurrentProductService} from '@spartacus/storefront';
import {Observable, of} from 'rxjs';
import {ProductVariantSelectorComponent} from './product-variant-selector.component';
import {NavigationExtras} from '@angular/router';

const mockVariantProduct: Product = {
  name: 'mockVariantProduct',
  code: 'code1',
  variantType: VariantType.APPAREL_STYLE,
  baseOptions: [],
  variantOptions: [{ code: 'mock_code_1' }, { code: 'mock_code_2' }],
};

const mockProduct: Product = {
  name: 'mockProduct',
  code: 'code2',
  baseOptions: [
    {
      variantType: VariantType.APPAREL_STYLE,
      options: [
        {
          code: 'mock_code_3',
          variantOptionQualifiers: [{ value: 'test111' }],
        },
        { code: 'code2', variantOptionQualifiers: [{ value: 'test222' }] },
      ],
    },
  ],
  variantOptions: [{ code: 'mock_code_3' }, { code: 'mock_code_4' }],
};

class MockRoutingService {
  go(
    _commands: any[] | UrlCommands,
    _query?: object,
    _extras?: NavigationExtras
  ): void {}
}
@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(options: UrlCommandRoute): string {
    return options.cxRoute;
  }
}
class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of();
  }
}

describe('ProductVariantSelectorComponent', () => {
  let component: ProductVariantSelectorComponent;
  let fixture: ComponentFixture<ProductVariantSelectorComponent>;
  let currentProductService: CurrentProductService;
  let routingService: RoutingService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductVariantSelectorComponent, MockUrlPipe],
      imports: [RouterTestingModule, I18nTestingModule],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
        {
          provide: OccConfig,
          useValue: { backend: { occ: { baseUrl: 'abc' } } },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVariantSelectorComponent);
    currentProductService = TestBed.get(CurrentProductService as Type<
      CurrentProductService
    >);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get style variant list based on product variant type property', () => {
    spyOn(currentProductService, 'getProduct').and.returnValue(
      of(mockVariantProduct)
    );
    component.ngOnInit();
    component.product$.subscribe();

    expect(component.styleVariants.length).toEqual(
      mockVariantProduct.variantOptions.length
    );
    expect(component.styleVariants[0].code).toEqual(
      mockVariantProduct.variantOptions[0].code
    );
  });

  it('should get size variant list based on base option variant type property', () => {
    spyOn(currentProductService, 'getProduct').and.returnValue(of(mockProduct));
    component.ngOnInit();
    component.product$.subscribe();

    expect(component.styleVariants.length).toEqual(
      mockProduct.baseOptions[0].options.length
    );
    expect(component.sizeVariants.length).toEqual(
      mockProduct.variantOptions.length
    );
    expect(component.styleVariants[0].code).toEqual(
      mockProduct.baseOptions[0].options[0].code
    );
  });

  it('should get selected style variant based on product code', () => {
    spyOn(currentProductService, 'getProduct').and.returnValue(of(mockProduct));
    component.ngOnInit();
    component.product$.subscribe();

    expect(component.styleVariants.length).toEqual(
      mockProduct.baseOptions[0].options.length
    );
    expect(component.selectedStyle).toBeTruthy();
    expect(component.selectedStyle).toEqual('test222');
  });

  it('should go to specified variant when routing is called', () => {
    spyOn(routingService, 'go').and.stub();
    component.routeToVariant('test123');

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'product',
      params: { code: 'test123' },
    });
  });
});
