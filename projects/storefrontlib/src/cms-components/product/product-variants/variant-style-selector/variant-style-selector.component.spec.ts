import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  OccConfig,
  UrlCommandRoute,
  BaseOption,
  VariantType,
  ProductService,
  Product,
  RoutingService,
} from '@spartacus/core';
import { VariantStyleSelectorComponent } from './variant-style-selector.component';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';

const mockOccBackendUrl = 'abc';
const mockVariant: BaseOption = {
  selected: {
    code: 'test',
    variantOptionQualifiers: [
      {
        value: '123',
        image: {
          url: 'http://test1-thumbnail.com',
        },
      },
    ],
  },
  options: [],
  variantType: VariantType.SIZE,
};

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
    return of();
  }
}

describe('VariantStyleSelectorComponent', () => {
  let component: VariantStyleSelectorComponent;
  let fixture: ComponentFixture<VariantStyleSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VariantStyleSelectorComponent, MockUrlPipe],
      imports: [RouterTestingModule, I18nTestingModule],
      providers: [
        {
          provide: OccConfig,
          useValue: { backend: { occ: { baseUrl: 'abc' } } },
        },
        {
          provide: ProductService,
          useClass: MockProductService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantStyleSelectorComponent);
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
});
