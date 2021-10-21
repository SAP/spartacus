import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { OrderEntry, RouterState, RoutingService } from '@spartacus/core';
import { CmsComponentData, PageComponentModule } from '@spartacus/storefront';
import {
  ActiveCartImportExportContext,
  CartTypes,
  ImportContext,
  NewSavedCartImportContext,
  ProductData,
  ProductImportInfo,
  ProductImportStatus,
  QuickOrderImportExportContext,
  SavedCartImportExportContext,
} from '@spartacus/cart/import-export/core';
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

class MockImportExportContext implements Partial<ImportContext> {
  getEntries = () => entries$.asObservable();

  addEntries = (_products: ProductData[]) => loadProducts$.asObservable();
}

class MockActiveCartImportExportContext
  extends MockImportExportContext
  implements ImportContext
{
  type: CartTypes.ACTIVE_CART;
}

class MockNewSavedCartImportContext
  extends MockImportExportContext
  implements ImportContext
{
  type: CartTypes.NEW_SAVED_CART;
}
class MockSavedCartImportExportContext
  extends MockImportExportContext
  implements ImportContext
{
  type: CartTypes.SAVED_CART;
}
class MockQuickOrderImportExportContext
  extends MockImportExportContext
  implements ImportContext
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

@Component({
  selector: 'cx-import-entries',
  template: '',
})
export class MockImportEntriesComponent {
  @ViewChild('open') element: ElementRef;

  @Input()
  context: ImportContext;
}

@Component({
  selector: 'cx-export-entries',
  template: '',
})
export class MockExportEntriesComponent {
  @Input()
  entries: OrderEntry[];
}

describe('ImportExportComponent', () => {
  let component: ImportExportComponent;
  let fixture: ComponentFixture<ImportExportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, PageComponentModule],
      providers: [
        { provide: CmsComponentData, useValue: MockCmsImportExportComponent },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: ActiveCartImportExportContext,
          useClass: MockActiveCartImportExportContext,
        },
        {
          provide: NewSavedCartImportContext,
          useClass: MockNewSavedCartImportContext,
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
      declarations: [
        ImportExportComponent,
        MockExportEntriesComponent,
        MockImportEntriesComponent,
      ],
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
