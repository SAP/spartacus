import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  RoutingService,
  UrlCommands,
  Product,
  ProductService,
  VariantQualifier,
} from '@spartacus/core';
import { VariantSizeSelectorComponent } from './variant-size-selector.component';
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
describe('VariantSizeSelectorComponent', () => {
  let component: VariantSizeSelectorComponent;
  let fixture: ComponentFixture<VariantSizeSelectorComponent>;
  let routingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VariantSizeSelectorComponent],
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
    fixture = TestBed.createComponent(VariantSizeSelectorComponent);
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
});
