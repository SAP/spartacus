import { Component, Input, Pipe, PipeTransform } from '@angular/core';
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
import { ProductVariantsComponent } from './product-variants.component';
import { NavigationExtras } from '@angular/router';

const mockProduct: Product = {
  name: 'mockProduct',
  code: 'code2',
  baseOptions: [
    {
      variantType: VariantType.STYLE,
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
  selector: 'cx-variant-style-selector',
  template: '',
})
class MockCxStyleSelectorComponent {
  @Input() product: Product;
  @Input() variants: BaseOption;
}

@Component({
  selector: 'cx-variant-size-selector',
  template: '',
})
class MockCxSizeSelectorComponent {
  @Input() product: Product;
  @Input() variants: BaseOption;
}

@Component({
  selector: 'cx-variant-color-selector',
  template: '',
})
class MockCxColorSelectorComponent {
  @Input() product: Product;
  @Input() variants: BaseOption;
}

describe('ProductVariantSelectorComponent', () => {
  let component: ProductVariantsComponent;
  let fixture: ComponentFixture<ProductVariantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductVariantsComponent,
        MockUrlPipe,
        MockCxStyleSelectorComponent,
        MockCxSizeSelectorComponent,
        MockCxColorSelectorComponent,
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
    fixture = TestBed.createComponent(ProductVariantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get variant list', () => {
    component.ngOnInit();
    component.product$.subscribe();

    expect(Object.keys(component.variants).length).toEqual(
      mockProduct.baseOptions.length
    );

    expect(Object.keys(component.variants)[0]).toEqual(VariantType.STYLE);
  });
});
