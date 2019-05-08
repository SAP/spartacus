import { inject, TestBed } from '@angular/core/testing';
import {
  CmsProductReferencesComponent,
  ProductReferenceService,
  RoutingService,
  UIProductReference,
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

const list: UIProductReference[] = [
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
  get(): Observable<UIProductReference[]> {
    return of(list);
  }
}

const mockComponentData: CmsProductReferencesComponent = {
  uid: 'MockProductReferencesComponent',
  typeCode: 'ProductReferencesComponent',
  title: 'mockTitle',
  productReferenceTypes: 'referenceType',
};

const MockCmsComponentData = <CmsComponentData<any>>{
  data$: of(mockComponentData),
};

describe('ProductReferencesService', () => {
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

    // productCarouselService = TestBed.get(ProductReferencesService);
  });

  it('should inject ProductReferencesService', inject(
    [ProductReferencesService],
    (service: ProductReferencesService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should getReferenceType()', inject(
    [ProductReferencesService],
    (service: ProductReferencesService) => {
      spyOn(service, 'getReferenceType').and.callThrough();

      service.getReferenceType();
      expect(service.getReferenceType).toHaveBeenCalled();
    }
  ));

  it('should getProductCode()', inject(
    [ProductReferencesService],
    (service: ProductReferencesService) => {
      spyOn(service, 'getProductCode').and.callThrough();

      service.getProductCode();
      expect(service.getProductCode).toHaveBeenCalled();
    }
  ));

  it('should have title', inject(
    [ProductReferencesService],
    (service: ProductReferencesService) => {
      spyOn(service, 'setTitle').and.callThrough();
      spyOn(service, 'getTitle').and.callThrough();

      let title$: string;

      service.setTitle();
      service
        .getTitle()
        .subscribe(data => {
          title$ = data;
        })
        .unsubscribe();

      expect(title$).toBe(title);
    }
  ));

  it('should have product list', inject(
    [ProductReferencesService],
    (service: ProductReferencesService) => {
      spyOn(service, 'setReferenceList').and.callThrough();
      spyOn(service, 'getReferenceList').and.callThrough();

      let list$: UIProductReference[];

      service.setReferenceList();
      service
        .getReferenceList()
        .subscribe(data => {
          list$ = data;
        })
        .unsubscribe();

      expect(list$).toBe(list);
    }
  ));
});
