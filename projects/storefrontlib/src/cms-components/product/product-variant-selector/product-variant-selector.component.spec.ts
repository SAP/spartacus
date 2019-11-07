import { Component, Input, Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Product,
  RoutingService,
  UrlCommandRoute,
  UrlCommands,
  VariantType,
  I18nTestingModule,
  BaseOption,
} from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ProductVariantSelectorComponent } from './product-variant-selector.component';
import { NavigationExtras } from '@angular/router';

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
      selected: { code: 'test222' },
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
    return of(mockProduct);
  }
}

@Component({
  selector: 'cx-style-selector',
  template: '',
})
class MockCxStyleSelectorComponent {
  @Input() product: Product;
  @Input() variants: BaseOption;
}

@Component({
  selector: 'cx-size-selector',
  template: '',
})
class MockCxSizeSelectorComponent {
  @Input() product: Product;
  @Input() variants: BaseOption;
}

describe('ProductVariantSelectorComponent', () => {
  let component: ProductVariantSelectorComponent;
  let fixture: ComponentFixture<ProductVariantSelectorComponent>;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductVariantSelectorComponent,
        MockUrlPipe,
        MockCxStyleSelectorComponent,
        MockCxSizeSelectorComponent,
      ],
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
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVariantSelectorComponent);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get variant list', () => {
    component.ngOnInit();
    component.product$.subscribe();

    expect(component.variants.length).toEqual(mockProduct.baseOptions.length);

    expect(component.variants[0].variantType).toEqual(
      VariantType.APPAREL_STYLE
    );
  });

  it('should go to variant if product is not purchasable', () => {
    spyOn(routingService, 'go').and.stub();

    component.ngOnInit();
    component.product$.subscribe();

    expect(routingService.go).toHaveBeenCalledWith(
      ...[
        {
          cxRoute: 'product',
          params: { code: 'mock_code_3' },
        },
        null,
        { replaceUrl: true },
      ]
    );
  });
});
