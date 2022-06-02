import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CmsComponentWithChildren, CmsService, Product } from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';
import { CurrentProductService } from '../../current-product.service';
import { ProductDetailsTabComponent } from './product-details-tab.component';

const mockProduct: Product = { name: 'mockProduct' };
const mockCmsComponentWithChildren: CmsComponentWithChildren = {
  name: 'Product Details Tab',
  typeCode: 'CMSFlexComponent',
  uid: 'testUid',
  children: 'TestPDFComponent',
};

const mockCmsComponentWithNoChildren: CmsComponentWithChildren = {
  name: 'Product Details Tab',
  typeCode: 'CMSFlexComponent',
  uid: 'testUid',
};

const mockPDFComponent = {
  ui: 'TestPDFComponent',
  uuid: 'PDFComponent',
  typeCode: 'PDFDocumentComponent',
  name: 'TestPDFName',
  container: false,
  pdfFile: {
    code: 'test-pdf',
    mime: 'application/pdf',
    url: '/medias/test.pdf?context=bWFzdGVyfGl',
  },
  synchronizationBlocked: false,
  title: 'ProductDetails',
  parents: 'ProductDetailsTabComponent',
  height: '200',
  modifiedTime: '2022-05-20T13:07:22.277Z',
};

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of(mockProduct);
  }
}

const data$: BehaviorSubject<CmsComponentWithChildren> = new BehaviorSubject(
  mockCmsComponentWithChildren
);

class MockCmsComponentData {
  get data$(): Observable<CmsComponentWithChildren> {
    return data$.asObservable();
  }
}

class MockCmsService {
  getComponentData(component: string): Observable<any | null> {
    if (component === 'TestPDFComponent') {
      return of(mockPDFComponent);
    }
    return of(null);
  }
}

describe('ProductDetailsTabComponent', () => {
  let productDetailsTabComponent: ProductDetailsTabComponent;
  let fixture: ComponentFixture<ProductDetailsTabComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProductDetailsTabComponent],
        providers: [
          {
            provide: CurrentProductService,
            useClass: MockCurrentProductService,
          },
          {
            provide: CmsComponentData,
            useClass: MockCmsComponentData,
          },
          {
            provide: CmsService,
            useClass: MockCmsService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsTabComponent);
    productDetailsTabComponent = fixture.componentInstance;
  });

  it('should create', () => {
    expect(productDetailsTabComponent).toBeTruthy();
  });

  it('should get product', () => {
    productDetailsTabComponent.ngOnInit();
    let result: Product | null | undefined;
    productDetailsTabComponent.product$.subscribe(
      (product) => (result = product)
    );
    expect(result).toEqual(mockProduct);
  });

  it('should get undefined children when child cmsComponents are unknown', () => {
    let result: any[] | undefined;
    data$.next({
      ...mockCmsComponentWithChildren,
      children: 'testCpntOne testCpntTwo',
    });

    productDetailsTabComponent.children$
      .subscribe((children) => (result = children))
      .unsubscribe();
    expect(result).toEqual([undefined, undefined]);
  });

  it('should get children containing cms PDFComponent', () => {
    let result: any[] | undefined;
    data$.next({ ...mockCmsComponentWithChildren });
    productDetailsTabComponent.children$
      .subscribe((children) => (result = children))
      .unsubscribe();

    expect(result).toContain({
      ...mockPDFComponent,
      flexType: mockPDFComponent.typeCode,
    });
  });

  it('should get undefined children when cmsComponent has no children property', () => {
    data$.next({
      ...mockCmsComponentWithNoChildren,
    });
    let result: any[] | undefined;
    productDetailsTabComponent.children$
      .subscribe((children) => (result = children))
      .unsubscribe();
    expect(result).toEqual([undefined]);
  });
});
