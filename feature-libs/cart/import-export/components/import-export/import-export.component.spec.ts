import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { StoreModule } from '@ngrx/store';
import {
  ActiveCartImportExportContext,
  CartTypes,
  ImportExportContext,
  NewSavedCartImportExportContext,
  ProductData,
  ProductImportInfo,
  ProductImportStatus,
  QuickOrderImportExportContext,
  SavedCartImportExportContext,
} from '@spartacus/cart/import-export/core';
import { OrderEntry, RouterState, RoutingService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
// import { PageComponentModule } from '@spartacus/storefront';
import { BehaviorSubject, of } from 'rxjs';
import { ImportExportComponent } from './import-export.component';
import createSpy = jasmine.createSpy;

const mockLoadProduct: ProductImportInfo = {
  productCode: '123456',
  statusCode: ProductImportStatus.SUCCESS,
};

const loadProducts$: BehaviorSubject<ProductImportInfo> = new BehaviorSubject(
  mockLoadProduct
);

const mockEntries: OrderEntry[] = [
  {
    quantity: 1,
    product: { name: 'mockProduct', code: 'mockCode' },
  },
];

const entries$ = new BehaviorSubject<OrderEntry[]>(mockEntries);

const routerStateSubject = new BehaviorSubject<RouterState>({
  state: {
    semanticRoute: 'savedCarts',
  },
} as RouterState);

class MockRoutingService implements Partial<RoutingService> {
  getRouterState = createSpy().and.returnValue(
    routerStateSubject.asObservable()
  );
}

class MockImportExportContext implements Partial<ImportExportContext> {
  getEntries = () => entries$.asObservable();

  addEntries = (_products: ProductData[]) => loadProducts$.asObservable();
}

class MockActiveCartImportExportContext
  extends MockImportExportContext
  implements ImportExportContext
{
  type: CartTypes.ACTIVE_CART;
}

class MockNewSavedCartImportExportContext
  extends MockImportExportContext
  implements ImportExportContext
{
  type: CartTypes.NEW_SAVED_CART;
}
class MockSavedCartImportExportContext
  extends MockImportExportContext
  implements ImportExportContext
{
  type: CartTypes.SAVED_CART;
}
class MockQuickOrderImportExportContext
  extends MockImportExportContext
  implements ImportExportContext
{
  type: CartTypes.QUICK_ORDER;
}

const mockCmsComponentData = {
  importButtonDisplayRoutes: [
    'cart',
    'savedCarts',
    'savedCartsDetails',
    'quickOrder',
  ],
  exportButtonDisplayRoutes: [
    'savedCartsDetails',
    'cart',
    'checkoutReviewOrder',
    'quickOrder',
  ],
};

const MockCmsImportExportComponent = <CmsComponentData<any>>{
  data$: of(mockCmsComponentData),
};

describe('ImportExportComponent', () => {
  let component: ImportExportComponent;
  let fixture: ComponentFixture<ImportExportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: CmsComponentData, useValue: MockCmsImportExportComponent },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: ActiveCartImportExportContext,
          useClass: MockActiveCartImportExportContext,
        },
        {
          provide: NewSavedCartImportExportContext,
          useClass: MockNewSavedCartImportExportContext,
        },
        {
          provide: SavedCartImportExportContext,
          useClass: MockSavedCartImportExportContext,
        },
        {
          provide: QuickOrderImportExportContext,
          useClass: MockQuickOrderImportExportContext,
        },
      ],
      declarations: [ImportExportComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
