import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  OccConfig,
  Product,
  RoutingService,
  UrlCommandRoute,
} from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ProductVariantSelectorComponent } from './product-variant-selector.component';

const mockProduct: Product = { name: 'mockProduct' };

class MockRoutingService {
  go = jasmine.createSpy('go');
  goByUrl = jasmine.createSpy('goByUrl');
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

describe('ProductVariantSelectorComponent', () => {
  let component: ProductVariantSelectorComponent;
  let fixture: ComponentFixture<ProductVariantSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductVariantSelectorComponent, MockUrlPipe],
      imports: [RouterTestingModule],
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
