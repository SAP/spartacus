import { TestBed } from '@angular/core/testing';
import {
  CmsProductReferencesComponent,
  ProductReference,
  ProductReferenceService,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';
import { ProductReferencesService } from './product-references.component.service';

const productCode = 'productCode';
const product = {
  code: productCode,
  name: 'testProduct',
};

const title = 'mockTitle';
const mockDisplay = true;

const list: ProductReference[] = [
  { referenceType: 'SIMILAR', target: product },
  { referenceType: 'ACCESSORIES', target: product },
];

const router = {
  state: {
    url: '/',
    queryParams: {},
    params: { productCode },
  },
};

class MockRoutingService {
  getRouterState(): Observable<any> {
    return of(router);
  }
}

class MockProductReferenceService {
  get(): Observable<ProductReference[]> {
    return of(list);
  }
}

const mockComponentData: CmsProductReferencesComponent = {
  uid: 'MockProductReferencesComponent',
  typeCode: 'ProductReferencesComponent',
  title: 'mockTitle',
  productReferenceTypes: 'referenceType',
  displayProductTitles: 'true',
  displayProductPrices: 'true',
};

const MockCmsComponentData = <CmsComponentData<any>>{
  data$: of(mockComponentData),
};

describe('ProductReferencesService', () => {
  let productReferenceService: ProductReferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CmsComponentData,
          useValue: MockCmsComponentData,
        },
        {
          provide: ProductReferenceService,
          useClass: MockProductReferenceService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        ProductReferencesService,
      ],
    });

    productReferenceService = TestBed.get(ProductReferencesService);
  });

  it('should inject ProductReferencesService', () => {
    expect(productReferenceService).toBeTruthy();
  });

  it('should getReferenceType()', () => {
    spyOn(productReferenceService, 'getReferenceType').and.callThrough();

    productReferenceService.getReferenceType();
    expect(productReferenceService.getReferenceType).toHaveBeenCalled();
  });

  it('should getProductCode()', () => {
    spyOn(productReferenceService, 'getProductCode').and.callThrough();

    productReferenceService.getProductCode();
    expect(productReferenceService.getProductCode).toHaveBeenCalled();
  });

  it('should have title', () => {
    spyOn(productReferenceService, 'fetchTitle').and.callThrough();
    spyOn(productReferenceService, 'getTitle').and.callThrough();

    let title$: string;

    productReferenceService.fetchTitle();
    productReferenceService
      .getTitle()
      .subscribe(data => (title$ = data))
      .unsubscribe();

    expect(title$).toBe(title);
  });

  it('should have displayTitle', () => {
    spyOn(
      productReferenceService,
      'fetchDisplayProductTitles'
    ).and.callThrough();
    spyOn(productReferenceService, 'getDisplayProductTitles').and.callThrough();

    let displayTitle$: boolean;

    productReferenceService.fetchDisplayProductTitles();
    productReferenceService
      .getDisplayProductTitles()
      .subscribe(data => (displayTitle$ = data))
      .unsubscribe();

    expect(displayTitle$).toBe(mockDisplay);
  });

  it('should have displayPrices', () => {
    spyOn(
      productReferenceService,
      'fetchDisplayProductPrices'
    ).and.callThrough();
    spyOn(productReferenceService, 'getDisplayProductPrices').and.callThrough();

    let displayPrices$: boolean;

    productReferenceService.fetchDisplayProductPrices();
    productReferenceService
      .getDisplayProductPrices()
      .subscribe(data => (displayPrices$ = data))
      .unsubscribe();

    expect(displayPrices$).toBe(mockDisplay);
  });

  it('should have product list', () => {
    spyOn(productReferenceService, 'setReferenceList').and.callThrough();
    spyOn(productReferenceService, 'getReferenceList').and.callThrough();

    let list$: ProductReference[];

    productReferenceService.setReferenceList();
    productReferenceService
      .getReferenceList()
      .subscribe(data => (list$ = data))
      .unsubscribe();

    expect(list$).toBe(list);
  });
});
