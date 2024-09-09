import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
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
import { ProductVariantsContainerComponent } from './product-variants-container.component';
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
    standalone: true,
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
    selector: 'cx-product-variant-style-selector',
    template: '',
    standalone: true,
    imports: [RouterTestingModule, I18nTestingModule],
})
class MockCxProductStyleSelectorComponent {
  @Input() product: Product;
  @Input() variants: BaseOption;
}

@Component({
    selector: 'cx-product-variant-size-selector',
    template: '',
    standalone: true,
    imports: [RouterTestingModule, I18nTestingModule],
})
class MockCxProductSizeSelectorComponent {
  @Input() product: Product;
  @Input() variants: BaseOption;
}

@Component({
    selector: 'cx-product-variant-color-selector',
    template: '',
    standalone: true,
    imports: [RouterTestingModule, I18nTestingModule],
})
class MockCxProductColorSelectorComponent {
  @Input() product: Product;
  @Input() variants: BaseOption;
}

describe('ProductVariantsContainerComponent', () => {
  let component: ProductVariantsContainerComponent;
  let fixture: ComponentFixture<ProductVariantsContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule, I18nTestingModule, ProductVariantsContainerComponent,
        MockUrlPipe,
        MockCxProductStyleSelectorComponent,
        MockCxProductSizeSelectorComponent,
        MockCxProductColorSelectorComponent],
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
    fixture = TestBed.createComponent(ProductVariantsContainerComponent);
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
