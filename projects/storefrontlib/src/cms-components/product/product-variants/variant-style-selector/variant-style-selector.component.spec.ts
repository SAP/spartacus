import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  BaseOption,
  I18nTestingModule,
  OccConfig,
  Product,
  ProductService,
  RoutingService,
  UrlCommandRoute,
  VariantType,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { VariantStyleSelectorComponent } from './variant-style-selector.component';

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
          useValue: { backend: { occ: { baseUrl: mockOccBackendUrl } } },
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
