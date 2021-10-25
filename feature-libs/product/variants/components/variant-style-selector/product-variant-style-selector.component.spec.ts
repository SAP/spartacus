import { Pipe, PipeTransform } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  BaseOption,
  I18nTestingModule,
  OccConfig,
  Product,
  ProductService,
  RoutingService,
  UrlCommandRoute,
  VariantOptionQualifier,
  VariantQualifier,
  VariantType,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ProductVariantStyleSelectorComponent } from './product-variant-style-selector.component';

const mockOccBackendUrl = 'https://base.com';
const mockVariant: BaseOption = {
  selected: {
    code: 'test',
    variantOptionQualifiers: [
      {
        value: '123',
        image: {
          url: '/test1-thumbnail.jpg',
        },
      },
    ],
  },
  options: [],
  variantType: VariantType.SIZE,
};
const mockProduct: Product = { name: 'TestName', code: 'test' };
const mockQualifiers = [
  {
    value: 'p1555',
    image: {
      url: 'http://test1-thumbnail.com',
    },
    qualifier: VariantQualifier.SIZE,
  },
  {
    value: '555',
    qualifier: VariantQualifier.STYLE,
  },
];
const mockQualifiers2 = {} as VariantOptionQualifier;

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(options: UrlCommandRoute): string {
    return options.cxRoute;
  }
}

class MockRoutingService {
  getRouterState(): Observable<any> {
    return of({
      nextState: {
        params: {
          productCode: 'test123',
        },
      },
    });
  }
  go() {
    return of();
  }
}
class MockProductService {
  get(): Observable<Product> {
    return of(mockProduct);
  }
}

describe('ProductVariantStyleSelectorComponent', () => {
  let component: ProductVariantStyleSelectorComponent;
  let fixture: ComponentFixture<ProductVariantStyleSelectorComponent>;
  let routingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProductVariantStyleSelectorComponent, MockUrlPipe],
        imports: [RouterTestingModule, I18nTestingModule],
        providers: [
          {
            provide: OccConfig,
            useValue: { backend: { occ: { baseUrl: mockOccBackendUrl } } },
          },
          {
            provide: ProductService,
            useClass: MockProductService,
          },
          { provide: RoutingService, useClass: MockRoutingService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    routingService = TestBed.inject(RoutingService);
    fixture = TestBed.createComponent(ProductVariantStyleSelectorComponent);
    component = fixture.componentInstance;
    component.variants = mockVariant;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get variant url for thumbnail type of qualifier', () => {
    const thumbnailUrl = component.getVariantThumbnailUrl(
      component.variants.selected.variantOptionQualifiers
    );
    expect(thumbnailUrl).toEqual(
      mockOccBackendUrl +
        mockVariant.selected.variantOptionQualifiers[0].image.url
    );
  });

  it('should naviagate to product on changeStyle', () => {
    spyOn(routingService, 'go').and.callThrough();

    component.changeStyle('test123');
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should find variant with proper qualifier', () => {
    const result = component.getVariantOptionValue(mockQualifiers);
    expect(result).toEqual(mockQualifiers[1].value);
  });

  it('should not find variant', () => {
    const result = component.getVariantOptionValue([mockQualifiers2]);
    expect(result).toEqual('');
  });
});
