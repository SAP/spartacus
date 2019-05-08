import { inject, TestBed } from '@angular/core/testing';
import {
  CmsProductCarouselComponent,
  ProductService,
  UIProduct,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';
import { ProductCarouselService } from './product-carousel.component.service';

const title = 'mockTitle';

const mockProduct: UIProduct = {
  code: '111111',
  name: 'Camera',
  price: {
    formattedValue: '$100.00',
  },
};

class MockProductService {
  get(): Observable<UIProduct> {
    return of(mockProduct);
  }
}

const productCodeArray: string[] = ['111111', '222222', '333333', '444444'];

const mockComponentData: CmsProductCarouselComponent = {
  uid: 'MockProductCarouselComponent',
  typeCode: 'ProductCarouselComponent',
  title: 'mockTitle',
  productCodes: productCodeArray.join(' '),
};

const MockCmsComponentData = <CmsComponentData<any>>{
  data$: of(mockComponentData),
};

describe('ProductCarouselService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CmsComponentData,
          useValue: MockCmsComponentData,
        },
        {
          provide: ProductService,
          useClass: MockProductService,
        },
        ProductCarouselService,
      ],
    });
  });

  it('should inject ProductCarouselService', inject(
    [ProductCarouselService],
    (service: ProductCarouselService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should have title', inject(
    [ProductCarouselService],
    (service: ProductCarouselService) => {
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

  it('should have products', inject(
    [ProductCarouselService],
    (service: ProductCarouselService) => {
      spyOn(service, 'setItems').and.callThrough();
      spyOn(service, 'getItems').and.callThrough();

      let products$: Observable<UIProduct>[];

      service.setItems();
      service
        .getItems()
        .subscribe(data => {
          products$ = data;
        })
        .unsubscribe();

      expect(products$.length).toBe(productCodeArray.length);
    }
  ));
});
