import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  RoutingService,
  UrlCommands,
  Product,
  ProductService,
  VariantQualifier,
  VariantOptionQualifier,
} from '@spartacus/core';
import { ProductVariantSizeSelectorComponent } from './product-variant-size-selector.component';
import { NavigationExtras } from '@angular/router';
import { Observable, of } from 'rxjs';

const mockProduct = {
  code: 'p1',
  name: 'product 1',
};

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

class MockRoutingService {
  go(
    _commands: any[] | UrlCommands,
    _query?: object,
    _extras?: NavigationExtras
  ): void {}
}

class MockProductService {
  get(): Observable<Product> {
    return of(mockProduct);
  }
}
describe('ProductVariantSizeSelectorComponent', () => {
  let component: ProductVariantSizeSelectorComponent;
  let fixture: ComponentFixture<ProductVariantSizeSelectorComponent>;
  let routingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProductVariantSizeSelectorComponent],
        imports: [RouterTestingModule, I18nTestingModule],
        providers: [
          { provide: RoutingService, useClass: MockRoutingService },
          {
            provide: ProductService,
            useClass: MockProductService,
          },
        ],
      }).compileComponents();
      routingService = TestBed.inject(RoutingService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVariantSizeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send emit', () => {
    spyOn(component, 'changeSize').and.stub();

    component.changeSize('code');

    expect(component.changeSize).toHaveBeenCalledWith('code');
  });

  it('should go to product given code', () => {
    spyOn(routingService, 'go').and.callThrough();
    component.changeSize('p1');
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'product',
      params: mockProduct,
    });
  });

  it('should find variant with proper qualifier', () => {
    const result = component.getVariantOptionValue(mockQualifiers);
    expect(result).toEqual(mockQualifiers[0].value);
  });

  it('should not find variant', () => {
    const result = component.getVariantOptionValue([mockQualifiers2]);
    expect(result).toEqual('');
  });
});
