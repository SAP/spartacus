import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  PageType,
  Product,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { YotpoConfig } from '../yotpoconfig/yotpo-config';
import { YotpoService } from './yotpo.service';

class MockYotpoConfig extends YotpoConfig {
  vendor = {
    yotpo: {
      appToken: 'abc',
    },
  };
}
const productCode = '123456';
const mockProduct: Product = { code: productCode };

class MockProductService {
  get(): Observable<Product> {
    return of(mockProduct);
  }
}

const router = {
  state: {
    url: '/',
    queryParams: {},
    params: { productCode: productCode },
    context: { id: '1', type: PageType.PRODUCT_PAGE },
    cmsRequired: false,
  },
};

class MockRoutingService {
  getRouterState() {
    return of(router);
  }
}

class NativeElementMock {
  appendChild() {}
}

const nativeElement: NativeElementMock = new NativeElementMock();
const elementRef: ElementRef = { nativeElement: nativeElement };

describe('YotpoService', () => {
  let service: YotpoService;
  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        YotpoService,
        { provide: YotpoConfig, useClass: MockYotpoConfig },
        {
          provide: ProductService,
          useClass: MockProductService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    });

    service = bed.inject(YotpoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch product data', () => {
    let result: Product;
    service.getProduct().subscribe((product) => (result = product));
    expect(result).toEqual(mockProduct);
  });

  it('should add Yotpo init widgets script', () => {
    const yotpoScriptTester = {
      asymmetricMatch: function (actual) {
        return (
          actual.type === 'text/javascript' &&
          actual.text.includes('yotpo.initWidgets()')
        );
      },
    };

    spyOn(nativeElement, 'appendChild');
    service.addYotpoInitWidgetsScript(elementRef);
    expect(nativeElement.appendChild).toHaveBeenCalledWith(yotpoScriptTester);
  });
});
